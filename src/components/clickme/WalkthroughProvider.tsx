"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import styles from './Walkthrough.module.css';

export type WalkthroughStep = {
  targetId?: string; // HTML id of the element to highlight. If omitted, tooltip centers.
  title: string;
  content: string;
  actionRequired?: boolean; // If true, hides "Next" button. The user must perform the action (which triggers nextStep via code).
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
};

type WalkthroughContextType = {
  startWalkthrough: (moduleName: string, steps: WalkthroughStep[], onComplete?: () => void) => void;
  nextStep: () => void;
  prevStep: () => void;
  endWalkthrough: (completed?: boolean) => void;
  isActive: boolean;
};

const WalkthroughContext = createContext<WalkthroughContextType | undefined>(undefined);

export const useWalkthrough = () => {
  const context = useContext(WalkthroughContext);
  if (!context) throw new Error('useWalkthrough must be used within a WalkthroughProvider');
  return context;
};

import { usePathname } from 'next/navigation';

export const WalkthroughProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [steps, setSteps] = useState<WalkthroughStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [moduleName, setModuleName] = useState('');
  const [onCompleteCallback, setOnCompleteCallback] = useState<(() => void) | null>(null);

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) {
      endWalkthrough(false);
    }
  }, [pathname]);

  const currentStep = steps[currentStepIndex];

  // Robustly track the target element
  useEffect(() => {
    if (!isActive || !currentStep) return;

    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    let animationFrameId: number;

    const updateRect = () => {
      if (currentStep.targetId) {
        const el = document.getElementById(currentStep.targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Only update if it actually changed to avoid infinite re-renders
          setTargetRect((prev) => {
            if (!prev || prev.x !== rect.x || prev.y !== rect.y || prev.width !== rect.width || prev.height !== rect.height) {
              return rect;
            }
            return prev;
          });
        } else {
          setTargetRect(null);
        }
      } else {
        setTargetRect(null);
      }
      animationFrameId = requestAnimationFrame(updateRect);
    };

    updateRect();

    // Try to scroll the element into view once when step changes
    if (currentStep.targetId) {
      setTimeout(() => {
        const el = document.getElementById(currentStep.targetId as string);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
      }, 100);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive, currentStep]);

  const startWalkthrough = (module: string, newSteps: WalkthroughStep[], onComplete?: () => void) => {
    setModuleName(module);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    if (onComplete) setOnCompleteCallback(() => onComplete);
    setIsActive(true);
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      endWalkthrough(true);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const endWalkthrough = async (completed = false) => {
    setIsActive(false);
    setTargetRect(null);
    setSteps([]);
    
    if (completed) {
      // Mark as completed in backend
      try {
        await fetch('/api/onboarding/submit-step', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleName,
            payload: { [moduleName]: true }
          })
        });
        if (onCompleteCallback) onCompleteCallback();
      } catch (err) {
        console.error('Failed to submit onboarding step', err);
      }
    }
  };

  // Calculate Tooltip Position
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate Tooltip Position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect || !currentStep?.targetId) {
      // Center screen
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const PADDING = 20;
    const TOOLTIP_WIDTH = Math.min(320, window.innerWidth - 40);
    const TOOLTIP_HEIGHT = tooltipRef.current ? tooltipRef.current.offsetHeight : 200;
    
    let top = 0;
    let left = 0;

    const pos = currentStep.position || 'bottom';

    if (pos === 'bottom') {
      top = targetRect.bottom + PADDING;
      left = targetRect.left + (targetRect.width / 2) - (TOOLTIP_WIDTH / 2);
    } else if (pos === 'top') {
      top = targetRect.top - PADDING - TOOLTIP_HEIGHT;
      left = targetRect.left + (targetRect.width / 2) - (TOOLTIP_WIDTH / 2);
    } else if (pos === 'right') {
      top = targetRect.top + (targetRect.height / 2) - (TOOLTIP_HEIGHT / 2);
      left = targetRect.right + PADDING;
    } else if (pos === 'left') {
      top = targetRect.top + (targetRect.height / 2) - (TOOLTIP_HEIGHT / 2);
      left = targetRect.left - TOOLTIP_WIDTH - PADDING;
    }

    // Keep within viewport bounds
    left = Math.max(PADDING, Math.min(left, window.innerWidth - TOOLTIP_WIDTH - PADDING));
    
    // Clamp vertically to prevent overlapping button and clipping
    if (top < PADDING) {
      top = targetRect.bottom + PADDING; // force below
    } else if (top + TOOLTIP_HEIGHT > window.innerHeight - PADDING) {
      top = targetRect.top - PADDING - TOOLTIP_HEIGHT; // force above
    }

    return { top: `${top}px`, left: `${left}px`, width: `${TOOLTIP_WIDTH}px` };
  };

  return (
    <WalkthroughContext.Provider value={{ startWalkthrough, nextStep, prevStep, endWalkthrough, isActive }}>
      {children}
      
      {isActive && currentStep && (
        <div className={styles.overlayContainer}>
          {/* Removed full grey overlay to allow full visibility of the dashboard */}
          {/* Soft guide approach: we only rely on the pulsing ring to draw attention. */}

          {/* Pulsing ring around target */}
          {targetRect && (
            <div className={styles.pulsingRing} style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
            }} />
          )}

          {/* Tooltip */}
          <div ref={tooltipRef} className={styles.tooltipCard} style={getTooltipStyle()}>
            <div className={styles.tooltipHeader}>
              <span className={styles.stepBadge}>Step {currentStepIndex + 1} of {steps.length}</span>
              {currentStep.actionRequired && <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700, marginLeft: 'auto' }}>Action Required</span>}
            </div>
            <h3 className={styles.title}>{currentStep.title}</h3>
            <p className={styles.content}>{currentStep.content}</p>
            
            <div className={styles.footer} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button 
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  style={{ 
                    background: currentStepIndex === 0 ? '#f3f4f6' : '#e5e7eb', 
                    color: currentStepIndex === 0 ? '#d1d5db' : '#4b5563', 
                    border: 'none', padding: '0.5rem 0.8rem', borderRadius: '8px', cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600, fontSize: '0.85rem'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  Back
                </button>

                {!currentStep.actionRequired ? (
                  <button 
                    className={styles.nextButton} 
                    onClick={nextStep}
                    style={{ padding: '0.5rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700, fontSize: '0.85rem' }}
                  >
                    {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
                    {currentStepIndex !== steps.length - 1 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>}
                  </button>
                ) : (
                  <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontStyle: 'italic', fontWeight: 600, padding: '0 0.5rem' }}>
                    Action required
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </WalkthroughContext.Provider>
  );
};
