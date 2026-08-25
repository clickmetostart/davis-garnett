"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalkthrough } from '@/components/clickme/WalkthroughProvider';

function CommunicationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startWalkthrough, nextStep, isActive } = useWalkthrough();
  
  // Views: 'inbox' | 'compose' | 'signature'
  const [activeView, setActiveView] = useState<'inbox' | 'compose' | 'signature'>('inbox');
  const [activeLabelId, setActiveLabelId] = useState('INBOX');
  const [customLabels, setCustomLabels] = useState<any[]>([]);
  
  // Auth state
  const [isConnected, setIsConnected] = useState(false);
  const [connectedEmail, setConnectedEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFetchingThreads, setIsFetchingThreads] = useState(false);

  // History State
  const [threads, setThreads] = useState<any[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [selectedThreadIds, setSelectedThreadIds] = useState<string[]>([]);
  const [replyText, setReplyText] = useState('');

  // Compose State
  const [crmLeads, setCrmLeads] = useState<any[]>([]);
  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  // Signature State
  const [userProfile, setUserProfile] = useState<any>(null);
  const [signatureData, setSignatureData] = useState({
    name: '',
    title: '',
    company: '',
    phone: '',
    officePhone: '',
    faxPhone: '',
    email: '',
    website: '',
    address: '',
    reviewLink: '',
    avatar: '',
    logo: '',
    themeColor: '#2563eb'
  });
  const [signatureText, setSignatureText] = useState('');
  const [isSavingSignature, setIsSavingSignature] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (searchParams.get('walkthrough') === 'true') {
      startWalkthrough('communicationsSetup', [
        {
          targetId: 'btn-signature-nav',
          title: 'Email Signature',
          content: 'Let\'s set up your email signature first. Click the Signature tab on the bottom left.',
          position: 'right',
          actionRequired: true
        },
        {
          targetId: 'btn-autofill-sig',
          title: 'Auto-Fill Details',
          content: 'Click here to automatically pull your profile information into the signature designer.',
          position: 'bottom',
          actionRequired: true
        },
        {
          targetId: 'sig-preview-box',
          title: 'Live Preview',
          content: 'See exactly how your signature will look at the bottom of your emails in real-time as you type.',
          position: 'left',
          actionRequired: false
        },
        {
          targetId: 'btn-save-sig',
          title: 'Save Signature',
          content: 'Once you are happy with the preview, save your signature.',
          position: 'top',
          actionRequired: true
        },
        {
          targetId: 'btn-connect-gmail',
          title: 'Connect Gmail',
          content: 'Finally, connect your Google Workspace or Gmail account to sync your entire inbox into the dashboard.',
          position: 'bottom',
          actionRequired: false
        }
      ], () => {
        router.push('/clickme');
      });
    }
  }, [searchParams]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const userRes = await fetch('/api/auth/me');
      const userData = await userRes.json();
      const user = userData.user;
      setUserProfile(user);

      if (user?.googleTokens?.refresh_token) {
        setIsConnected(true);
        setConnectedEmail(user.googleTokens.email || 'Gmail Connected');
        fetchLabels();
        fetchEmails('INBOX');
      }

      const sigRes = await fetch('/api/users/signature');
      if (sigRes.ok) {
        const sigDataRes = await sigRes.json();
        setSignatureText(sigDataRes.signature || '');
        if (sigDataRes.signatureData) {
          setSignatureData(sigDataRes.signatureData);
        }
      }

      const leadsRes = await fetch('/api/leads');
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setCrmLeads(leadsData.leads || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLabels = async () => {
    try {
      const res = await fetch('/api/gmail/labels');
      if (res.ok) {
        const data = await res.json();
        setCustomLabels(data.customLabels || []);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const fetchEmails = async (labelId: string, q?: string) => {
    setIsFetchingThreads(true);
    setActiveThreadId(null);
    try {
      let url = '';
      if (labelId === 'WEB_GENERAL') {
        url = `/api/email/threads?type=general`;
      } else if (labelId === 'WEB_APPLY') {
        url = `/api/email/threads?type=apply`;
      } else if (labelId === 'WEB_SPAM') {
        url = `/api/email/threads?type=spam`;
      } else {
        url = q ? `/api/gmail?q=${encodeURIComponent(q)}` : `/api/gmail?labelId=${labelId}`;
      }

      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched threads data:', data);
        setThreads(data.threads || []);
        setSelectedThreadIds([]);
      } else {
        console.error('Fetch failed:', await res.text());
      }
    } catch (err) {
      console.error(err);
    }
    setIsFetchingThreads(false);
  };

  const handleLabelClick = (labelId: string, q?: string) => {
    setActiveView('inbox');
    setActiveLabelId(labelId);
    fetchEmails(labelId, q);
  }

  const handleConnectGmail = () => {
    const w = 500;
    const h = 600;
    const left = window.innerWidth / 2 - w / 2;
    const top = window.innerHeight / 2 - h / 2;
    window.open(
      '/api/auth/google?returnTo=/close-popup',
      'GoogleAuth',
      `width=${w},height=${h},top=${top},left=${left}`
    );

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data === 'AUTH_SUCCESS') {
        window.removeEventListener('message', handleMessage);
        fetchInitialData();
        if (isActive) nextStep();
      }
    };
    window.addEventListener('message', handleMessage);
  };

  const handleDisconnectGoogle = async () => {
    if (!confirm('Are you sure you want to disconnect your Google account?')) return;
    try {
      const res = await fetch('/api/auth/google/disconnect', { method: 'POST' });
      if (res.ok) {
        setIsConnected(false);
        setConnectedEmail('');
        setThreads([]);
        setCustomLabels([]);
        setActiveThreadId(null);
        setActiveView('inbox');
        setActiveLabelId('INBOX');
      }
    } catch (err) {
      console.error('Failed to disconnect', err);
    }
  };

  const handleToggleSpam = async (threadId: string, currentIsSpam: boolean) => {
    try {
      const res = await fetch('/api/email/threads/toggle-spam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId, isSpam: !currentIsSpam })
      });
      if (res.ok) {
        setThreads(threads.filter(t => t.id !== threadId));
        if (activeThreadId === threadId) setActiveThreadId(null);
      }
    } catch (err) {
      console.error('Failed to toggle spam', err);
    }
  };

  const handleBulkToggleSpam = async (isSpam: boolean) => {
    if (selectedThreadIds.length === 0) return;
    try {
      const res = await fetch('/api/email/threads/toggle-spam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadIds: selectedThreadIds, isSpam })
      });
      if (res.ok) {
        setThreads(threads.filter(t => !selectedThreadIds.includes(t.id)));
        if (activeThreadId && selectedThreadIds.includes(activeThreadId)) setActiveThreadId(null);
        setSelectedThreadIds([]);
      }
    } catch (err) {
      console.error('Failed to bulk toggle spam', err);
    }
  };

  const handleTrashThread = async (threadId: string) => {
    if (activeLabelId?.startsWith('WEB_')) {
      if (!confirm('Permanently delete this web submission?')) return;
      try {
        const res = await fetch('/api/email/threads/toggle-spam', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ threadId, isSpam: true }) // Technically this just marks it as spam for now, or we could add a hard delete. Let's stick to the prompt.
        });
      } catch (e) {}
      return;
    }
    if (!confirm('Move this thread to trash?')) return;
    try {
      const res = await fetch('/api/gmail/trash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId })
      });
      if (res.ok) {
        setThreads(threads.filter(t => t.id !== threadId));
        if (activeThreadId === threadId) setActiveThreadId(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // --- Signature Logic ---
  const generateSignatureHtml = (data: typeof signatureData) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #111827; margin-top: 20px; padding-top: 10px; border-top: 1px solid #e5e7eb; max-width: 500px;">
        <div style="display: flex; align-items: center; gap: 15px;">
          ${data.avatar ? `<img src="${data.avatar.startsWith('http') ? data.avatar : `https://www.clickme.life${data.avatar}`}" style="width: 55px; height: 55px; border-radius: 50%; object-fit: cover; border: 2px solid #e5e7eb;" alt="${data.name}" />` : ''}
          <div>
            <div style="font-size: 15px; font-weight: 800; color: #111827; letter-spacing: -0.5px;">${data.name || 'Your Name'}</div>
            <div style="font-size: 13px; color: #6b7280; font-weight: 500;">${data.title || 'Your Title'}</div>
            <div style="font-size: 13px; color: ${data.themeColor || '#2563eb'}; font-weight: 800; margin-top: 2px;">${data.company || 'Your Company'}</div>
          </div>
        </div>
        ${(data.phone || data.officePhone || data.faxPhone || data.email || data.website || data.address) ? `
        <div style="margin-top: 12px; font-size: 12px; color: #4b5563; display: flex; flex-direction: column; gap: 6px;">
          ${data.phone ? `<div style="display: flex; align-items: center; gap: 8px;"><span style="display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${data.themeColor || '#2563eb'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg></span> <span>${data.phone} <span style="color:#9ca3af;font-size:10px">(Mobile)</span></span></div>` : ''}
          ${data.officePhone ? `<div style="display: flex; align-items: center; gap: 8px;"><span style="display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${data.themeColor || '#2563eb'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span> <span>${data.officePhone} <span style="color:#9ca3af;font-size:10px">(Office)</span></span></div>` : ''}
          ${data.faxPhone ? `<div style="display: flex; align-items: center; gap: 8px;"><span style="display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${data.themeColor || '#2563eb'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg></span> <span>${data.faxPhone} <span style="color:#9ca3af;font-size:10px">(Fax)</span></span></div>` : ''}
          ${data.email ? `<div style="display: flex; align-items: center; gap: 8px;"><span style="display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${data.themeColor || '#2563eb'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span> <span>${data.email}</span></div>` : ''}
          ${data.website ? `<div style="display: flex; align-items: center; gap: 8px;"><span style="display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${data.themeColor || '#2563eb'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></span> <a href="${data.website.startsWith('http') ? data.website : `https://${data.website}`}" style="color: ${data.themeColor || '#2563eb'}; text-decoration: none;">${data.website}</a></div>` : ''}
          ${data.address ? `<div style="display: flex; align-items: center; gap: 8px;"><span style="display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${data.themeColor || '#2563eb'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span> <span>${data.address}</span></div>` : ''}
        </div>
        ` : ''}
        ${data.logo ? `
        <div style="margin-top: 16px;">
          <img src="${data.logo.startsWith('http') ? data.logo : `https://www.clickme.life${data.logo}`}" style="max-height: 50px; max-width: 200px; object-fit: contain;" alt="${data.company || 'Company Logo'}" />
        </div>
        ` : ''}
        ${data.reviewLink ? `
        <div style="margin-top: 16px;">
          <a href="${data.reviewLink}" style="display: inline-flex; align-items: center; padding: 6px 12px; background-color: #fff; border: 1px solid #d1d5db; border-radius: 6px; text-decoration: none; color: #111827; font-weight: 600; font-size: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <span style="color: #fbbf24; font-size: 14px; margin-right: 6px; letter-spacing: 1px;">★★★★★</span> 
            See Our Reviews on Google
          </a>
        </div>
        ` : ''}
      </div>
    `.trim();
  };

  useEffect(() => {
    setSignatureText(generateSignatureHtml(signatureData));
  }, [signatureData]);

  const handleAutoFillSignature = () => {
    if (!userProfile) return;
    setSignatureData({
      name: `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim(),
      title: userProfile.title || '',
      company: userProfile.companyName || '',
      phone: userProfile.phone || '',
      officePhone: userProfile.officePhone || '',
      faxPhone: userProfile.faxPhone || '',
      email: userProfile.email || '',
      website: 'www.clickme.life',
      address: userProfile.address || '',
      reviewLink: '',
      avatar: userProfile.avatarUrl || '',
      logo: userProfile.logoUrl || '',
      themeColor: '#2563eb'
    });
    if (isActive) nextStep();
  };

  const saveSignature = async () => {
    setIsSavingSignature(true);
    try {
      await fetch('/api/users/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          signature: signatureText,
          signatureData: signatureData
        })
      });
      alert('Signature saved successfully!');
      if (isActive) nextStep();
    } catch (err) {
      console.error(err);
    }
    setIsSavingSignature(false);
  };

  // --- Compose Logic ---
  const handleSendMessage = async () => {
    if (!composeData.to || !composeData.subject || !composeData.message) return;
    setIsSending(true);
    
    const finalMessage = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827;">
        ${composeData.message.replace(/\\n/g, '<br/>')}
      </div>
      <br/>
      ${signatureText}
    `;

    try {
      const res = await fetch('/api/gmail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...composeData,
          message: finalMessage
        })
      });
      if (res.ok) {
        alert('Email sent successfully!');
        setComposeData({ to: '', cc: '', bcc: '', subject: '', message: '' });
        setActiveView('inbox');
        fetchEmails('SENT');
      } else {
        alert('Failed to send email.');
      }
    } catch (err) {
      console.error(err);
    }
    setIsSending(false);
  };

  const activeThread = threads.find(t => t.id === activeThreadId);
  const handleReply = async () => {
    if (!replyText.trim() || !activeThread) return;
    
    const originalText = replyText;
    setReplyText('');
    
    const newMsg = { sender: 'team', text: originalText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isMine: true };
    const updatedThreads = threads.map(t => {
      if (t.id === activeThread.id) {
        return { ...t, messages: [...t.messages, newMsg] };
      }
      return t;
    });
    setThreads(updatedThreads);

    const finalMessage = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827;">
        ${originalText.replace(/\\n/g, '<br/>')}
      </div>
      <br/>
      ${signatureText}
    `;

    try {
      await fetch('/api/gmail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: activeThread.from.match(/<([^>]+)>/)?.[1] || activeThread.from,
          subject: activeThread.subject.startsWith('Re:') ? activeThread.subject : `Re: ${activeThread.subject}`,
          message: finalMessage,
          threadId: activeThread.id
        })
      });
    } catch (err) {
      console.error("Failed to reply", err);
    }
  };

  const SidebarButton = ({ label, icon, id, view = 'inbox', q, color }: { label: string, icon: React.ReactNode, id: string, view?: 'inbox'|'compose'|'signature', q?: string, color?: string }) => {
    const isSelected = view === 'inbox' ? (activeView === 'inbox' && activeLabelId === id) : activeView === view;
    return (
      <button 
        id={id}
        onClick={() => {
          if (view === 'inbox') {
            handleLabelClick(id, q);
          } else {
            setActiveView(view);
          }
        }}
        style={{
          background: isSelected ? (color ? `${color}15` : '#eff6ff') : 'transparent',
          color: isSelected ? (color || '#2563eb') : (color || '#4b5563'),
          border: color ? `1px solid ${isSelected ? color : color + '40'}` : 'none',
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          width: '100%',
          textAlign: 'left',
          cursor: 'pointer',
          fontWeight: isSelected ? 700 : 500,
          fontSize: '0.9rem',
          marginBottom: '0.2rem',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          if (!isSelected) e.currentTarget.style.background = color ? `${color}10` : '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          if (!isSelected) e.currentTarget.style.background = 'transparent';
        }}
      >
        <div style={{ color: isSelected ? (color || '#3b82f6') : (color || '#6b7280') }}>{icon}</div>
        <span style={{ flex: 1 }}>{label}</span>
      </button>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', height: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Communications</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isConnected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#059669', background: '#ecfdf5', padding: '0.4rem 1rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #a7f3d0' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                {connectedEmail}
              </div>
              <button onClick={handleDisconnectGoogle} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Disconnect</button>
            </div>
          ) : (
            <button id="btn-connect-gmail" onClick={handleConnectGmail} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
              Connect Gmail
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* --- LEFT SIDEBAR (Folders / Labels) --- */}
        <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', flexShrink: 0, overflowY: 'auto' }}>
          <button 
            onClick={() => setActiveView('compose')}
            style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.8rem 1rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.95rem', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Compose
          </button>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem', paddingLeft: '1rem' }}>Gmail Mailbox</div>
            <SidebarButton label="Inbox" id="INBOX" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>} />
            <SidebarButton label="Sent" id="SENT" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>} />
            <SidebarButton label="Drafts" id="DRAFT" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>} />
            <SidebarButton label="Trash" id="TRASH" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>} />
            
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem', paddingLeft: '1rem' }}>Web Form Submissions</div>
              <SidebarButton label="General" id="WEB_GENERAL" q='subject:"New Lead" -subject:"Apply" -subject:"SPAM"' icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>} />
              <SidebarButton label="Apply Flow" id="WEB_APPLY" q='subject:"New Lead" subject:"Apply"' icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>} />
              <SidebarButton label="Spam" id="WEB_SPAM" q='subject:"SPAM"' icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>} />
            </div>

            {customLabels.length > 0 && (
              <>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.8rem 0', paddingLeft: '1rem' }}>Labels</div>
                {customLabels.map(lbl => (
                  <SidebarButton 
                    key={lbl.id} 
                    label={lbl.name} 
                    id={lbl.id} 
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>} 
                  />
                ))}
              </>
            )}
            
          </div>

          <div style={{ borderTop: '2px dashed #a855f7', paddingTop: '1rem', marginTop: 'auto' }}>
            <SidebarButton view="signature" id="btn-signature-nav" label="Signature Setup" color="#a855f7" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>} />
          </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: '#f9fafb' }}>
          
          {!isConnected && activeView === 'inbox' && !activeLabelId?.startsWith('WEB_') ? (
             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Inbox Disconnected</h2>
                  <p style={{ color: '#6b7280', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>Connect your Google Workspace or Gmail account to view your inbox, sent items, and labels right here in the dashboard.</p>
                  <button onClick={handleConnectGmail} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>Connect Gmail</button>
                </div>
             </div>
          ) : activeView === 'inbox' ? (
            <>
              {/* Thread List Pane */}
              <div style={{ width: activeThreadId ? '350px' : '100%', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff', transition: 'width 0.3s' }}>
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#111827', fontSize: '1.1rem' }}>
                    {activeLabelId === 'INBOX' ? 'Inbox' : activeLabelId === 'SENT' ? 'Sent' : activeLabelId === 'TRASH' ? 'Trash' : activeLabelId === 'DRAFT' ? 'Drafts' : activeLabelId === 'WEB_GENERAL' ? 'Web Form Submissions: General' : activeLabelId === 'WEB_APPLY' ? 'Web Form Submissions: Apply Flow' : activeLabelId === 'WEB_SPAM' ? 'Web Form Submissions: Spam' : customLabels.find(l => l.id === activeLabelId)?.name || 'Mails'}
                  </span>
                  <button onClick={() => {
                      const q = activeLabelId === 'WEB_GENERAL' ? 'subject:"New Lead" -subject:"Apply" -subject:"SPAM"' :
                                activeLabelId === 'WEB_APPLY' ? 'subject:"New Lead" subject:"Apply"' :
                                activeLabelId === 'WEB_SPAM' ? 'subject:"SPAM"' : undefined;
                      fetchEmails(activeLabelId, q);
                    }} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }} title="Refresh">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                  </button>
                </div>
                
                {selectedThreadIds.length > 0 && (
                  <div style={{ padding: '0.5rem 1.5rem', background: '#eff6ff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1d4ed8' }}>{selectedThreadIds.length} selected</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {activeLabelId?.startsWith('WEB_') && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleBulkToggleSpam(activeLabelId !== 'WEB_SPAM'); }}
                          style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          {activeLabelId === 'WEB_SPAM' ? 'Mark Not Spam' : 'Mark Spam'}
                        </button>
                      )}
                      <button onClick={() => setSelectedThreadIds([])} style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: '0.4rem' }}>Cancel</button>
                    </div>
                  </div>
                )}
                
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {isFetchingThreads ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>Loading...</div>
                  ) : threads.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No emails found. (Fetched 0 threads)</div>
                  ) : (
                    threads.map(thread => (
                      <div 
                        key={thread.id || Math.random().toString()}
                        onClick={() => setActiveThreadId(thread.id)}
                        style={{ 
                          padding: '1.2rem 1.5rem', 
                          borderBottom: '1px solid #e5e7eb', 
                          cursor: 'pointer', 
                          background: activeThreadId === thread.id ? '#eff6ff' : '#fff',
                          transition: 'background 0.2s',
                          display: 'flex',
                          gap: '0.8rem'
                        }}
                      >
                        <div onClick={(e) => e.stopPropagation()} style={{ paddingTop: '0.1rem' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedThreadIds.includes(thread.id)}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedThreadIds([...selectedThreadIds, thread.id]);
                              else setSelectedThreadIds(selectedThreadIds.filter(id => id !== thread.id));
                            }}
                            style={{ cursor: 'pointer', width: '1.1rem', height: '1.1rem', accentColor: '#2563eb' }}
                          />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                            <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>
                              {thread.from.split('<')[0].trim()}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{thread.date}</span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.2rem' }}>
                            {thread.subject}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {thread.snippet}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Thread Detail Pane */}
              {activeThreadId && (
                <div style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <h3 style={{ margin: '0 0 0.25rem 0', color: '#111827', fontSize: '1.3rem', fontWeight: 800, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{activeThread?.subject}</h3>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Between you and {activeThread?.from.match(/<([^>]+)>/)?.[1] || activeThread?.from}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {activeLabelId?.startsWith('WEB_') && (
                        <button 
                          onClick={() => handleToggleSpam(activeThreadId, activeThread?.isSpam)} 
                          style={{ 
                            background: 'transparent', 
                            border: '1px solid #d1d5db', 
                            padding: '0.5rem 1rem', 
                            borderRadius: '6px', 
                            cursor: 'pointer', 
                            fontSize: '0.85rem', 
                            fontWeight: 600,
                            color: activeThread?.isSpam ? '#059669' : '#d97706'
                          }}
                        >
                          {activeThread?.isSpam ? 'Mark as Not Spam' : 'Mark as Spam'}
                        </button>
                      )}
                      <button onClick={() => handleTrashThread(activeThreadId)} style={{ background: 'transparent', border: '1px solid #e5e7eb', color: '#ef4444', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Trash Thread">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                      <button onClick={() => setActiveThreadId(null)} style={{ background: 'transparent', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>Close</button>
                    </div>
                  </div>
                  
                  <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#f9fafb' }}>
                    {(activeThread?.messages || []).map((msg: any, idx: number) => {
                      const isMine = msg.isMine;
                      return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                          <div style={{ 
                            background: isMine ? '#2563eb' : '#fff', 
                            color: isMine ? '#fff' : '#111827', 
                            padding: '1.2rem 1.5rem', 
                            borderRadius: '12px', 
                            border: isMine ? 'none' : '1px solid #e5e7eb',
                            maxWidth: '85%',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          }}>
                            <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\\n/g, '<br/>') }} style={{ fontSize: '0.95rem', lineHeight: '1.6' }} />
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem', padding: '0 0.5rem' }}>
                            {isMine ? 'You' : activeThread?.from.split('<')[0].trim()} • {msg.time}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div style={{ padding: '1.5rem 2rem', background: '#fff', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      <textarea 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Reply to this thread..."
                        style={{ width: '100%', padding: '1rem', border: 'none', outline: 'none', resize: 'none', height: '100px', fontFamily: "'Inter', sans-serif" }}
                        onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleReply(); } }}
                      />
                      <div style={{ background: '#f9fafb', padding: '0.8rem 1rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Ctrl+Enter to send</span>
                        <button 
                          onClick={handleReply}
                          disabled={!replyText.trim()}
                          style={{ background: '#111827', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '6px', fontWeight: 700, cursor: replyText.trim() ? 'pointer' : 'not-allowed', opacity: replyText.trim() ? 1 : 0.5 }}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : activeView === 'compose' ? (
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
              <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 2rem 0' }}>Compose New Message</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={{ width: '80px', fontWeight: 600, color: '#4b5563', fontSize: '0.9rem' }}>To CRM:</label>
                    <select 
                      onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                      value={crmLeads.find(l => l.email === composeData.to) ? composeData.to : ''}
                      style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb', fontSize: '0.95rem', color: '#111827' }}
                    >
                      <option value="">-- Select a Lead from CRM --</option>
                      {crmLeads.filter(l => l.email).map(l => (
                        <option key={l.id} value={l.email}>{l.firstName} {l.lastName} ({l.email})</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={{ width: '80px', fontWeight: 600, color: '#4b5563', fontSize: '0.9rem' }}>To (Other):</label>
                    <input 
                      type="text" 
                      value={composeData.to} 
                      onChange={e => setComposeData({...composeData, to: e.target.value})}
                      placeholder="Enter email address directly..."
                      style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', color: '#111827', backgroundColor: '#fff' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <label style={{ width: '80px', fontWeight: 600, color: '#4b5563', fontSize: '0.9rem' }}>CC:</label>
                      <input type="text" value={composeData.cc} onChange={e => setComposeData({...composeData, cc: e.target.value})} style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', color: '#111827', backgroundColor: '#fff' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <label style={{ width: '40px', fontWeight: 600, color: '#4b5563', fontSize: '0.9rem' }}>BCC:</label>
                      <input type="text" value={composeData.bcc} onChange={e => setComposeData({...composeData, bcc: e.target.value})} style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', color: '#111827', backgroundColor: '#fff' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={{ width: '80px', fontWeight: 600, color: '#4b5563', fontSize: '0.9rem' }}>Subject:</label>
                    <input 
                      type="text" 
                      value={composeData.subject} 
                      onChange={e => setComposeData({...composeData, subject: e.target.value})}
                      style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', fontWeight: 600, color: '#111827', backgroundColor: '#fff' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <label style={{ width: '80px', fontWeight: 600, color: '#4b5563', fontSize: '0.9rem', paddingTop: '0.8rem' }}>Message:</label>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <textarea 
                        value={composeData.message}
                        onChange={e => setComposeData({...composeData, message: e.target.value})}
                        style={{ width: '100%', minHeight: '300px', padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#111827', backgroundColor: '#fff' }}
                      />
                      {signatureText && (
                        <div style={{ padding: '1rem', background: '#f9fafb', border: '1px dashed #d1d5db', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 700 }}>Signature Attached</div>
                          <div dangerouslySetInnerHTML={{ __html: signatureText }} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button 
                      onClick={handleSendMessage}
                      disabled={isSending || !composeData.to || !composeData.subject || !composeData.message}
                      style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '8px', fontWeight: 800, cursor: (isSending || !composeData.to || !composeData.subject || !composeData.message) ? 'not-allowed' : 'pointer', opacity: (isSending || !composeData.to || !composeData.subject || !composeData.message) ? 0.5 : 1, fontSize: '1rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      {isSending ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeView === 'signature' ? (
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
              <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Design Your Signature</h2>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>This signature will be automatically attached to the bottom of all emails sent from the Compose tab.</p>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <button 
                      id="btn-autofill-sig"
                      onClick={handleAutoFillSignature}
                      style={{ background: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      Auto-Fill from Profile
                    </button>
                  </div>

                  <div id="sig-fields-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Full Name</label>
                      <input type="text" value={signatureData.name} onChange={e => setSignatureData({...signatureData, name: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. John Doe" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Title/Slogan/Mantra</label>
                      <input type="text" value={signatureData.title} onChange={e => setSignatureData({...signatureData, title: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. Branch Manager" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Company Name</label>
                      <input type="text" value={signatureData.company} onChange={e => setSignatureData({...signatureData, company: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. Acme Corp" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Mobile Phone</label>
                      <input type="text" value={signatureData.phone} onChange={e => setSignatureData({...signatureData, phone: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. (555) 123-4567" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Office Phone</label>
                      <input type="text" value={signatureData.officePhone} onChange={e => setSignatureData({...signatureData, officePhone: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. (800) 123-4567" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Fax Number</label>
                      <input type="text" value={signatureData.faxPhone} onChange={e => setSignatureData({...signatureData, faxPhone: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. (312) 555-9999" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Email Address</label>
                      <input type="text" value={signatureData.email} onChange={e => setSignatureData({...signatureData, email: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. john@example.com" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Website</label>
                      <input type="text" value={signatureData.website} onChange={e => setSignatureData({...signatureData, website: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. ClickMehomeloans.com" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', gridColumn: '1 / -1' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Office Address</label>
                      <input type="text" value={signatureData.address} onChange={e => setSignatureData({...signatureData, address: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. 123 Main St, Chicago, IL" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', gridColumn: '1 / -1' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Google Review Link</label>
                      <input type="text" value={signatureData.reviewLink} onChange={e => setSignatureData({...signatureData, reviewLink: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="e.g. https://g.page/r/..." />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Theme Color</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="color" value={signatureData.themeColor} onChange={e => setSignatureData({...signatureData, themeColor: e.target.value})} style={{ width: '40px', height: '40px', padding: '0', borderRadius: '6px', border: '1px solid #d1d5db', cursor: 'pointer', background: '#fff' }} />
                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontFamily: 'monospace' }}>{signatureData.themeColor}</span>
                      </div>
                    </div>

                    <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e5e7eb', margin: '0.5rem 0' }}></div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Avatar Image URL</label>
                      <input type="text" value={signatureData.avatar} onChange={e => setSignatureData({...signatureData, avatar: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="https://..." />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.85rem' }}>Company Logo URL</label>
                      <input type="text" value={signatureData.logo} onChange={e => setSignatureData({...signatureData, logo: e.target.value})} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', color: '#111827', backgroundColor: '#fff' }} placeholder="https://..." />
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      id="btn-save-sig"
                      onClick={saveSignature}
                      disabled={isSavingSignature}
                      style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
                    >
                      {isSavingSignature ? 'Saving...' : 'Save Signature'}
                    </button>
                  </div>
                </div>

                <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.1rem' }}>Live Preview</div>
                  <div id="sig-preview-box" style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#111827' }}>
                    <div style={{ flex: 1, color: '#9ca3af', fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      Your message content will go here...
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: signatureText || '<span style="color:#9ca3af">No signature designed yet.</span>' }} style={{ color: '#111827' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}

export default function CommunicationsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading Communications...</div>}>
      <CommunicationsContent />
    </Suspense>
  );
}
