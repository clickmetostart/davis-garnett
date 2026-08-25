"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';

function MarketingEngineContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'campaigns' | 'audiences' | 'templates'>('campaigns');
  
  // CRM Leads for Audience Mockup
  const [crmLeads, setCrmLeads] = useState<any[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showCrmModal, setShowCrmModal] = useState(false);

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (data.leads) setCrmLeads(data.leads);
      })
      .catch(console.error);
  }, []);

  const handleSelectLead = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(l => l !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const TabButton = ({ id, label, icon }: { id: typeof activeTab, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.8rem 1.5rem',
        background: activeTab === id ? '#eff6ff' : 'transparent',
        color: activeTab === id ? '#2563eb' : '#6b7280',
        border: 'none',
        borderBottom: `2px solid ${activeTab === id ? '#2563eb' : 'transparent'}`,
        fontWeight: activeTab === id ? 700 : 500,
        cursor: 'pointer',
        fontSize: '0.95rem',
        transition: 'all 0.2s'
      }}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', height: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Marketing Engine</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>Automated Drip Campaigns & Lead Nurturing</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 2rem', background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <TabButton id="campaigns" label="Drip Campaigns" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>} />
        <TabButton id="audiences" label="Audience Lists" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>} />
        <TabButton id="templates" label="Email Builder" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        
        {/* --- CAMPAIGNS VIEW --- */}
        {activeTab === 'campaigns' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>Active Campaigns</h2>
              <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>+ Create Campaign</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
              {/* Campaign List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#fff', border: '2px solid #2563eb', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.1)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>Commercial Investors (Tampa)</h3>
                    <span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>Running</span>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.85rem' }}>Audience: High Net-Worth List</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#4b5563' }}>
                    <span>Open Rate: 42%</span>
                    <span>Clicks: 18%</span>
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>First-Time Buyers Drip</h3>
                    <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>Paused</span>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.85rem' }}>Audience: New Web Leads</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#4b5563' }}>
                    <span>Open Rate: 28%</span>
                    <span>Clicks: 5%</span>
                  </div>
                </div>
              </div>

              {/* Campaign Workflow Visualizer */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: '#111827' }}>Workflow: Commercial Investors</h3>
                
                <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                  {/* Vertical Line */}
                  <div style={{ position: 'absolute', left: '7px', top: '20px', bottom: '20px', width: '2px', background: '#e5e7eb', zIndex: 1 }}></div>
                  
                  {/* Step 1 */}
                  <div style={{ position: 'relative', marginBottom: '2rem', zIndex: 2 }}>
                    <div style={{ position: 'absolute', left: '-2rem', width: '16px', height: '16px', borderRadius: '50%', background: '#2563eb', border: '3px solid #eff6ff', top: '5px' }}></div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Day 1: Trigger</div>
                    <div style={{ background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827' }}>Email: Intro & Market Report</div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Template: "Tampa Q3 Commercial Insights"</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div style={{ position: 'relative', marginBottom: '2rem', zIndex: 2 }}>
                    <div style={{ position: 'absolute', left: '-2rem', width: '16px', height: '16px', borderRadius: '50%', background: '#10b981', border: '3px solid #ecfdf5', top: '5px' }}></div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Day 3: Follow Up</div>
                    <div style={{ background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827' }}>SMS Text Message</div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>"Hi [Name], Mark Davis here..."</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ position: 'absolute', left: '-2rem', width: '16px', height: '16px', borderRadius: '50%', background: '#f59e0b', border: '3px solid #fffbeb', top: '5px' }}></div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Day 7: Value Add</div>
                    <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <button style={{ background: 'transparent', border: 'none', color: '#6b7280', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Next Action
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- AUDIENCES VIEW --- */}
        {activeTab === 'audiences' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>Audience Lists</h2>
              <button 
                onClick={() => setShowCrmModal(true)}
                style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                Import from CRM
              </button>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f3f4f6' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>List Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Subscribers</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Open Rate</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#111827' }}>High Net-Worth Commercial</td>
                    <td style={{ padding: '1rem', color: '#4b5563' }}>412</td>
                    <td style={{ padding: '1rem', color: '#4b5563' }}>38.5%</td>
                    <td style={{ padding: '1rem' }}><span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>Active</span></td>
                  </tr>
                  <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#111827' }}>Website Leads (Bayshore)</td>
                    <td style={{ padding: '1rem', color: '#4b5563' }}>89</td>
                    <td style={{ padding: '1rem', color: '#4b5563' }}>22.1%</td>
                    <td style={{ padding: '1rem' }}><span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>Active</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TEMPLATES VIEW --- */}
        {activeTab === 'templates' && (
          <div style={{ height: '100%', display: 'flex', gap: '2rem' }}>
            {/* Sidebar Blocks */}
            <div style={{ width: '250px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#111827' }}>Content Blocks</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>Drag and drop elements.</p>
              
              <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#4b5563', cursor: 'grab' }}>Heading</div>
              <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#4b5563', cursor: 'grab' }}>Text Paragraph</div>
              <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#4b5563', cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> Image
              </div>
              <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#4b5563', cursor: 'grab' }}>Call to Action Button</div>
              <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#4b5563', cursor: 'grab' }}>Divider</div>
            </div>

            {/* Email Canvas Mockup */}
            <div style={{ flex: 1, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
              <div style={{ width: '100%', maxWidth: '600px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                {/* Email Header */}
                <div style={{ background: '#111827', padding: '2rem', textAlign: 'center' }}>
                  <img src="/clickme-life-logo-medium.png" alt="Logo" style={{ height: '30px', filter: 'brightness(0) invert(1)' }} />
                </div>
                {/* Email Body */}
                <div style={{ padding: '3rem 2rem' }}>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginTop: 0, marginBottom: '1rem' }}>Tampa Bay Commercial Real Estate Update</h1>
                  <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563' }}>Hi {'{{first_name}}'},</p>
                  <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563' }}>I wanted to share our latest Q3 insights regarding the waterfront zoning changes happening in downtown St. Pete. There are a few off-market opportunities you might be interested in.</p>
                  
                  <div style={{ width: '100%', height: '200px', background: '#e5e7eb', borderRadius: '8px', margin: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                    [ Image Block ]
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '6px', fontWeight: 700, fontSize: '1rem' }}>View the Report</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CRM Import Modal Overlay */}
      {showCrmModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '700px', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
            <button onClick={() => setShowCrmModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Import Contacts from CRM</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Select the leads you want to add to your audience list.</p>

            <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f9fafb', position: 'sticky', top: 0 }}>
                  <tr>
                    <th style={{ padding: '1rem', width: '40px' }}>
                      <input type="checkbox" onChange={(e) => setSelectedLeads(e.target.checked ? crmLeads.map(l => l.id) : [])} checked={selectedLeads.length === crmLeads.length && crmLeads.length > 0} />
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280' }}>NAME</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280' }}>EMAIL</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280' }}>STAGE</th>
                  </tr>
                </thead>
                <tbody>
                  {crmLeads.map((lead) => (
                    <tr key={lead.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <input type="checkbox" checked={selectedLeads.includes(lead.id)} onChange={() => handleSelectLead(lead.id)} />
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: '#111827' }}>{lead.firstName} {lead.lastName}</td>
                      <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>{lead.email}</td>
                      <td style={{ padding: '1rem' }}><span style={{ background: '#f3f4f6', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{lead.pipelineStage}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={() => setShowCrmModal(false)} style={{ background: 'transparent', border: '1px solid #d1d5db', color: '#4b5563', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => { alert(`Imported ${selectedLeads.length} leads!`); setShowCrmModal(false); }} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 700 }}>
                Import {selectedLeads.length} Leads
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function MarketingEngine() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Marketing Engine...</div>}>
      <MarketingEngineContent />
    </Suspense>
  );
}
