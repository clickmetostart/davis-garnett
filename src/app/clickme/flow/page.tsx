"use client";

import React, { useState, useEffect, Suspense } from 'react';

// Define multiple flow templates
const MOCK_FLOWS = [
  {
    id: 'f1',
    name: 'Residential Buyers',
    columns: [
      { id: 'pre_qualified', title: 'Pre-Qualified' },
      { id: 'searching', title: 'Active Search' },
      { id: 'under_contract', title: 'Under Contract' },
      { id: 'inspection', title: 'Inspection/Appraisal' },
      { id: 'clear_to_close', title: 'Clear to Close' },
      { id: 'closed', title: 'Closed' }
    ]
  },
  {
    id: 'f2',
    name: 'Residential Sellers (Listings)',
    columns: [
      { id: 'listing_prep', title: 'Listing Prep' },
      { id: 'active_market', title: 'Active on Market' },
      { id: 'under_contract_seller', title: 'Under Contract' },
      { id: 'closing_seller', title: 'Closing Process' },
      { id: 'sold', title: 'Sold' }
    ]
  },
  {
    id: 'f3',
    name: 'Commercial Leases',
    columns: [
      { id: 'prospect', title: 'Prospect' },
      { id: 'touring', title: 'Touring' },
      { id: 'loi', title: 'LOI Negotiations' },
      { id: 'lease_exec', title: 'Lease Execution' },
      { id: 'tenant_buildout', title: 'Tenant Buildout' }
    ]
  }
];

interface ClientCard {
  id: string;
  name: string;
  budget: string;
  stage: string;
  flowId: string;
}

function ClientFlowContent() {
  const [flows, setFlows] = useState(MOCK_FLOWS);
  const [activeFlowId, setActiveFlowId] = useState('f1');
  
  const [cards, setCards] = useState<ClientCard[]>([
    { id: 'c1', name: 'James & Sarah Smith', budget: '$650k', stage: 'pre_qualified', flowId: 'f1' },
    { id: 'c2', name: 'Michael Chen', budget: '$1.2M', stage: 'searching', flowId: 'f1' },
    { id: 'c3', name: 'Emily Roberts', budget: '$450k', stage: 'under_contract', flowId: 'f1' },
    { id: 'c4', name: 'The Johnson Family', budget: '$850k', stage: 'inspection', flowId: 'f1' },
    { id: 'c5', name: 'David Lee', budget: '$920k List', stage: 'active_market', flowId: 'f2' },
    { id: 'c6', name: 'TechStartup LLC', budget: '5,000 sqft', stage: 'loi', flowId: 'f3' }
  ]);

  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddFlowModal, setShowAddFlowModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showAddStageModal, setShowAddStageModal] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState('');
  const [newCardName, setNewCardName] = useState('');
  const [newCardBudget, setNewCardBudget] = useState('');
  const [newStageTitle, setNewStageTitle] = useState('');
  const [draggedColumnId, setDraggedColumnId] = useState<string | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [wrapColumns, setWrapColumns] = useState(false);
  const [crmLeads, setCrmLeads] = useState<any[]>([]);

  useEffect(() => {
    // Fetch mock leads from CRM API
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (data.leads) setCrmLeads(data.leads);
      })
      .catch(console.error);
  }, []);

  const activeFlow = flows.find(f => f.id === activeFlowId) || flows[0];

  const moveCard = (cardId: string, nextStageId: string) => {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, stage: nextStageId } : c));
  };

  const handleAddClient = (lead: any) => {
    const newCard: ClientCard = {
      id: `c_${Date.now()}`,
      name: `${lead.firstName} ${lead.lastName}`,
      budget: 'TBD',
      stage: activeFlow.columns[0].id,
      flowId: activeFlow.id
    };
    setCards([...cards, newCard]);
    setShowAddClientModal(false);
  };

  const handleAddManualCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: ClientCard = {
      id: `c_${Date.now()}`,
      name: newCardName,
      budget: newCardBudget,
      stage: selectedColumnId,
      flowId: activeFlow.id
    };
    setCards([...cards, newCard]);
    setShowAddCardModal(false);
    setNewCardName('');
    setNewCardBudget('');
  };

  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    const newStage = {
      id: `stage_${Date.now()}`,
      title: newStageTitle
    };
    setFlows(prevFlows => prevFlows.map(f => {
      if (f.id === activeFlow.id) {
        return { ...f, columns: [...f.columns, newStage] };
      }
      return f;
    }));
    setShowAddStageModal(false);
    setNewStageTitle('');
  };

  const handleDeleteStage = (stageId: string) => {
    const hasCards = cards.some(c => c.stage === stageId && c.flowId === activeFlow.id);
    if (hasCards) {
      alert("Cannot remove a stage that contains clients. Please move them first.");
      return;
    }
    
    setFlows(prevFlows => prevFlows.map(f => {
      if (f.id === activeFlow.id) {
        return { ...f, columns: f.columns.filter(c => c.id !== stageId) };
      }
      return f;
    }));
  };

  const handleColumnDragStart = (e: React.DragEvent, colId: string) => {
    setDraggedColumnId(colId);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.opacity = '0.5';
      }
    }, 0);
  };

  const handleColumnDragEnd = (e: React.DragEvent) => {
    setDraggedColumnId(null);
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = '1';
    }
  };

  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleColumnDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault();
    if (!draggedColumnId || draggedColumnId === targetColId) return;

    setFlows(prevFlows => prevFlows.map(f => {
      if (f.id === activeFlow.id) {
        const newCols = [...f.columns];
        const draggedIdx = newCols.findIndex(c => c.id === draggedColumnId);
        const targetIdx = newCols.findIndex(c => c.id === targetColId);
        
        const [draggedCol] = newCols.splice(draggedIdx, 1);
        newCols.splice(targetIdx, 0, draggedCol);
        
        return { ...f, columns: newCols };
      }
      return f;
    }));
  };

  const handleCardDragStart = (e: React.DragEvent, cardId: string) => {
    e.stopPropagation();
    setDraggedCardId(cardId);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.opacity = '0.5';
      }
    }, 0);
  };

  const handleCardDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedCardId(null);
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = '1';
    }
  };

  const handleCardDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedCardId) {
      moveCard(draggedCardId, targetColId);
    }
    setDraggedCardId(null);
  };

  const handleCreateFlow = (e: React.FormEvent) => {
    e.preventDefault();
    const newFlow = {
      id: `f_${Date.now()}`,
      name: 'New Custom Pipeline',
      columns: [
        { id: 'step_1', title: 'Step 1: Lead' },
        { id: 'step_2', title: 'Step 2: Working' },
        { id: 'step_3', title: 'Step 3: Done' }
      ]
    };
    setFlows([...flows, newFlow]);
    setActiveFlowId(newFlow.id);
    setShowAddFlowModal(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6', height: '100vh', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Pipeline Flows</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>Track clients across various transaction pipelines.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* View Toggle */}
          <button 
            onClick={() => setWrapColumns(!wrapColumns)}
            style={{ background: wrapColumns ? '#e5e7eb' : 'transparent', color: '#4b5563', border: '1px solid #d1d5db', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            title="Toggle column wrapping"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3v18"></path><path d="M10 18l-3 3-3-3"></path><path d="M7 21V3"></path><path d="M14 6l3-3 3 3"></path></svg>
            Wrap View
          </button>

          <div style={{ width: '1px', height: '30px', background: '#e5e7eb' }}></div>

          {/* Flow Selector */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '8px', padding: '0.25rem' }}>
            <select 
              value={activeFlowId}
              onChange={(e) => setActiveFlowId(e.target.value)}
              style={{ background: 'transparent', border: 'none', padding: '0.4rem 1rem', fontSize: '0.9rem', fontWeight: 700, color: '#111827', outline: 'none', cursor: 'pointer' }}
            >
              {flows.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
            <button 
              onClick={() => setShowAddFlowModal(true)}
              style={{ background: '#e5e7eb', color: '#4b5563', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              title="Create new pipeline flow"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              New Flow
            </button>
          </div>

          <div style={{ width: '1px', height: '30px', background: '#e5e7eb' }}></div>

          <button 
            onClick={() => setShowAddClientModal(true)}
            style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Client
          </button>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div style={{ flex: 1, overflowX: wrapColumns ? 'hidden' : 'auto', overflowY: wrapColumns ? 'auto' : 'hidden', padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', height: wrapColumns ? 'auto' : '100%', alignItems: 'flex-start', flexWrap: wrapColumns ? 'wrap' : 'nowrap' }}>
          
          {activeFlow.columns.map((col, colIndex) => {
            const columnCards = cards.filter(c => c.stage === col.id && c.flowId === activeFlow.id);
            const nextCol = activeFlow.columns[colIndex + 1];

            return (
              <div 
                key={col.id} 
                draggable
                onDragStart={(e) => handleColumnDragStart(e, col.id)}
                onDragEnd={handleColumnDragEnd}
                onDragOver={handleColumnDragOver}
                onDrop={(e) => handleColumnDrop(e, col.id)}
                style={{ 
                  minWidth: '320px', 
                  maxWidth: '320px', 
                  background: draggedColumnId === col.id ? '#f3f4f6' : '#e5e7eb', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  maxHeight: '100%',
                  cursor: 'grab',
                  transition: 'background 0.2s'
                }}
              >
                
                {/* Column Header */}
                <div style={{ padding: '1rem', borderBottom: '2px solid #d1d5db', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {col.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ background: '#d1d5db', color: '#4b5563', padding: '0.1rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>
                      {columnCards.length}
                    </span>
                    <button 
                      onClick={() => handleDeleteStage(col.id)}
                      style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '0.2rem', fontSize: '1.2rem', lineHeight: 1 }}
                      title="Remove Stage"
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {/* Cards Container */}
                <div 
                  onDragOver={(e) => {
                    if (draggedCardId) {
                      e.preventDefault();
                      e.stopPropagation();
                      e.dataTransfer.dropEffect = 'move';
                    }
                  }}
                  onDrop={(e) => {
                    if (draggedCardId) {
                      handleCardDrop(e, col.id);
                    }
                  }}
                  style={{ padding: '1rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  {columnCards.map(card => (
                    <div 
                      key={card.id} 
                      draggable
                      onDragStart={(e) => handleCardDragStart(e, card.id)}
                      onDragEnd={handleCardDragEnd}
                      style={{ background: '#fff', borderRadius: '8px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'grab' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>{card.name}</h4>
                      </div>
                      
                      <div style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        Value: {card.budget}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '0.75rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af' }}>ID: {card.id}</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {colIndex > 0 && (
                            <button 
                              onClick={() => moveCard(card.id, activeFlow.columns[colIndex - 1].id)}
                              style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                              title={`Move back to ${activeFlow.columns[colIndex - 1].title}`}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                              Back
                            </button>
                          )}
                          {nextCol && (
                            <button 
                              onClick={() => moveCard(card.id, nextCol.id)}
                              style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                              title={`Move to ${nextCol.title}`}
                            >
                              Advance
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                          )}
                          {!nextCol && (
                            <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>Closed 🎉</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {columnCards.length === 0 && (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem', border: '2px dashed #d1d5db', borderRadius: '8px' }}>
                      No clients in this stage
                    </div>
                  )}

                  <button 
                    onClick={() => { setSelectedColumnId(col.id); setShowAddCardModal(true); }}
                    style={{ background: 'transparent', border: '2px dashed #d1d5db', color: '#6b7280', padding: '0.8rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#9ca3af'; e.currentTarget.style.color = '#4b5563'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#6b7280'; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Card
                  </button>
                </div>

              </div>
            );
          })}
          
          {/* Add Stage Column Placeholder */}
          <div style={{ minWidth: '320px', maxWidth: '320px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <button 
              onClick={() => setShowAddStageModal(true)}
              style={{ background: 'transparent', border: '2px dashed #d1d5db', color: '#6b7280', padding: '1.5rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#9ca3af'; e.currentTarget.style.color = '#4b5563'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#6b7280'; }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Custom Stage
            </button>
          </div>
          
        </div>
      </div>

      {/* Add Client CRM Modal */}
      {showAddClientModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '600px', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
            <button onClick={() => setShowAddClientModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Add Client to {activeFlow.name}</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Select a lead from your CRM to start their transaction pipeline.</p>

            <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              {crmLeads.map((lead) => (
                <div key={lead.id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{lead.firstName} {lead.lastName}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{lead.email}</div>
                  </div>
                  <button 
                    onClick={() => handleAddClient(lead)}
                    style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.4rem 1rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Select
                  </button>
                </div>
              ))}
              {crmLeads.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Loading CRM Leads...</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create New Flow Modal */}
      {showAddFlowModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '500px', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
            <button onClick={() => setShowAddFlowModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Create New Pipeline</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Define a custom pipeline to track different types of deals.</p>

            <form onSubmit={handleCreateFlow}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Pipeline Name</label>
                <input type="text" placeholder="e.g. Out-of-State Buyers" style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }} required />
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Stages (Columns)</label>
                <div style={{ border: '1px dashed #d1d5db', padding: '1rem', borderRadius: '8px', background: '#f9fafb', fontSize: '0.85rem', color: '#6b7280', textAlign: 'center' }}>
                  In a real app, you would dynamically add/remove custom stages here.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setShowAddFlowModal(false)} style={{ background: 'transparent', border: '1px solid #d1d5db', color: '#4b5563', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 700 }}>
                  Create Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Card Modal */}
      {showAddCardModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
            <button onClick={() => setShowAddCardModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Add New Card</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Manually add a deal to this column.</p>

            <form onSubmit={handleAddManualCard}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Client or Deal Name</label>
                <input type="text" value={newCardName} onChange={(e) => setNewCardName(e.target.value)} placeholder="e.g. John Doe" style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }} required />
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Value / Budget</label>
                <input type="text" value={newCardBudget} onChange={(e) => setNewCardBudget(e.target.value)} placeholder="e.g. $500k" style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setShowAddCardModal(false)} style={{ background: 'transparent', border: '1px solid #d1d5db', color: '#4b5563', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 700 }}>
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Stage Modal */}
      {showAddStageModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
            <button onClick={() => setShowAddStageModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Add Custom Stage</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Create a new column for this pipeline.</p>

            <form onSubmit={handleAddStage}>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Stage Title</label>
                <input type="text" value={newStageTitle} onChange={(e) => setNewStageTitle(e.target.value)} placeholder="e.g. Needs Review" style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setShowAddStageModal(false)} style={{ background: 'transparent', border: '1px solid #d1d5db', color: '#4b5563', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 700 }}>
                  Add Stage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ClientFlow() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Pipeline Flows...</div>}>
      <ClientFlowContent />
    </Suspense>
  );
}
