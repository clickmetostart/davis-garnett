"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalkthrough } from '@/components/clickme/WalkthroughProvider';

const COLOR_PRESETS = [
  '#059669', '#2563eb', '#8b5cf6', '#d97706', '#db2777', 
  '#4b5563', '#ef4444', '#14b8a6', '#f43f5e', '#84cc16'
];

function NetworkCRMContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startWalkthrough, nextStep, isActive } = useWalkthrough();
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const [leads, setLeads] = useState<any[]>([]);
  const [labelsData, setLabelsData] = useState<any[]>([]);
  
  const [activeLabel, setActiveLabel] = useState('All Contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'my_crm' | 'team_crm'>('my_crm');

  useEffect(() => {
    const v = searchParams.get('view');
    if (v === 'team') setViewMode('team_crm');
    else if (v === 'my') setViewMode('my_crm');
  }, [searchParams]);
  
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);
  const [leadEmails, setLeadEmails] = useState<any[]>([]);
  const [loadingEmails, setLoadingEmails] = useState(false);
  
  // Drawer Edit State
  const [isEditingLead, setIsEditingLead] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [newCustomFieldKey, setNewCustomFieldKey] = useState('');
  const [newCustomFieldValue, setNewCustomFieldValue] = useState('');
  const [editStatus, setEditStatus] = useState('New');
  const [editNotes, setEditNotes] = useState('');
  const [editLabels, setEditLabels] = useState<string[]>([]);
  const [isLabelsDropdownOpen, setIsLabelsDropdownOpen] = useState(false);
  
  // New Lead State
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLeadFirstName, setNewLeadFirstName] = useState('');
  const [newLeadLastName, setNewLeadLastName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');

  // Create Label Modal State
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState(COLOR_PRESETS[0]);

  // Form Routing State
  const [isRoutingMenuOpen, setIsRoutingMenuOpen] = useState(false);
  const [formRouting, setFormRouting] = useState<Record<string, string[]>>({});

  // Bulk Label Menu State
  const [showBulkLabelMenu, setShowBulkLabelMenu] = useState(false);
  const bulkMenuRef = useRef<HTMLDivElement>(null);

  // Submit state machine for onboarding
  const [submitState, setSubmitState] = useState<'idle' | 'ready' | 'confirming' | 'submitting' | 'completed' | 'hidden'>('hidden');

  // Fetch Data
  const fetchLeads = () => {
    fetch('/api/leads').then(res => res.json()).then(data => {
      if (data.leads) setLeads(data.leads);
    }).catch(err => console.error(err));
  };

  const fetchLabels = () => {
    fetch('/api/labels').then(res => res.json()).then(data => {
      if (data.labels) setLabelsData(data.labels);
    }).catch(err => console.error(err));
  };

  useEffect(() => {
    fetchLeads();
    fetchLabels();
    document.body.style.overflow = 'hidden';
    
    // Fetch User for RBAC
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        setUser(data?.user || null);
        setLoadingUser(false);
      })
      .catch(() => setLoadingUser(false));
    
    // Check onboarding
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.onboarding) {
          if (data.onboarding.crmImported === 'Submitted') {
            setSubmitState('completed');
          } else if (data.onboarding.crmImported === false || data.onboarding.crmImported === undefined) {
            setSubmitState('idle');
          } else {
            setSubmitState('hidden');
          }
        }
        if (data?.formRouting) {
          setFormRouting(data.formRouting);
        }
      });

    const handleClickOutside = (event: MouseEvent) => {
      if (bulkMenuRef.current && !bulkMenuRef.current.contains(event.target as Node)) {
        setShowBulkLabelMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (submitState === 'completed' || submitState === 'confirming' || submitState === 'submitting' || submitState === 'hidden') return;
    if (leads.length > 0) setSubmitState('ready');
    else setSubmitState('idle');
  }, [leads, submitState]);

  useEffect(() => {
    if (selectedLead && !isAddingLead && selectedLead.email) {
      setLoadingEmails(true);
      fetch(`/api/gmail?email=${selectedLead.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.threads) {
            setLeadEmails(data.threads);
          } else {
            setLeadEmails([]);
          }
          setLoadingEmails(false);
        })
        .catch(() => setLoadingEmails(false));
    } else {
      setLeadEmails([]);
    }
  }, [selectedLead, isAddingLead]);

  useEffect(() => {
    if (searchParams.get('walkthrough') === 'true') {
      // Start the interactive walkthrough
      startWalkthrough('dummyClientEntered', [
        {
          targetId: 'btn-add-lead',
          title: 'Inject a Mock Lead',
          content: 'Let\'s learn how to add a lead to your CRM. Click the "Add Lead" button to begin.',
          position: 'bottom',
          actionRequired: true
        },
        {
          targetId: 'drawer-first-name',
          title: 'Enter Contact Details',
          content: 'Type in a dummy First Name. For example: "John". You can click anywhere else to continue editing.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'drawer-labels',
          title: 'Assign a Marketing List',
          content: 'Labels dictate which automated campaigns this lead receives. Let\'s assign them to "First-Time Homebuyers".',
          position: 'left',
          actionRequired: false
        },
        {
          targetId: 'btn-save-lead',
          title: 'Save Your Lead',
          content: 'Click Save to inject the lead into the database.',
          position: 'bottom',
          actionRequired: true
        }
      ], () => {
        router.push('/clickme');
      });
    }
  }, [searchParams]);

  const handleSubmitModule = async () => {
    setSubmitState('submitting');
    try {
      await fetch('/api/onboarding/submit-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleName: 'CRM Import',
          payload: { crmImported: 'Submitted', totalLeads: leads.length }
        })
      });
      setSubmitState('completed');
      setTimeout(() => router.push('/clickme'), 1500);
    } catch (err) {
      console.error(err);
      setSubmitState('ready');
    }
  };

  const createLabel = async () => {
    if (!newLabelName.trim()) return;
    try {
      await fetch('/api/labels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newLabelName, color: newLabelColor })
      });
      fetchLabels();
      setIsCreatingLabel(false);
      setNewLabelName('');
    } catch (err) {
      console.error(err);
    }
  };

  const saveFormRouting = async () => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formRouting })
      });
      setIsRoutingMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const openDrawer = (lead: any) => {
    setIsAddingLead(false);
    setIsEditingLead(false);
    setSelectedLead(lead);
    const mergedCustomFields = { ...lead.customFields };
    const standardFields = ['propertyType', 'timeline', 'budget', 'location'];
    standardFields.forEach(f => {
      if (!(f in mergedCustomFields)) mergedCustomFields[f] = '';
    });

    setEditData({
      firstName: lead.firstName || '',
      lastName: lead.lastName || '',
      name: lead.name || '',
      email: lead.email || '',
      phone: lead.phone || '',
      method: lead.method || 'N/A',
      source: lead.source || 'N/A',
      companyWebsite: lead.companyWebsite || '',
      street: lead.street || '',
      street2: lead.street2 || '',
      city: lead.city || '',
      state: lead.state || '',
      zip: lead.zip || '',
      customLinks: lead.customLinks || [],
      documents: lead.documents || [],
      customFields: mergedCustomFields
    });
    setNewCustomFieldKey('');
    setNewCustomFieldValue('');
    setEditStatus(lead.status || 'New');
    setEditNotes(lead.notes || '');
    setEditLabels(lead.labels || lead.lists || []);
    setIsLabelsDropdownOpen(false);
  };
  
  const openAddLeadDrawer = () => {
    setSelectedLead(null);
    setIsAddingLead(true);
    setNewLeadFirstName('');
    setNewLeadLastName('');
    setNewLeadEmail('');
    setNewLeadPhone('');
    setEditStatus('New');
    setEditNotes('');
    setEditLabels(['Contact Form: General']);
    setIsLabelsDropdownOpen(false);
    setEditData({
      customFields: {
        propertyType: '', timeline: '', budget: '', location: ''
      },
      companyWebsite: '',
      street: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      customLinks: [],
      documents: []
    });
    if (isActive) nextStep();
  };

  const closeDrawer = () => {
    setSelectedLead(null);
    setIsAddingLead(false);
  };

  const saveLead = async () => {
    const cleanCustomFields = { ...editData.customFields };
    for (const key in cleanCustomFields) {
      if (!cleanCustomFields[key] || String(cleanCustomFields[key]).trim() === '') {
        delete cleanCustomFields[key];
      }
    }

    if (isAddingLead) {
      const newLead = {
        name: `${newLeadFirstName} ${newLeadLastName}`.trim(),
        firstName: newLeadFirstName,
        lastName: newLeadLastName,
        email: newLeadEmail,
        phone: newLeadPhone,
        status: editStatus,
        notes: editNotes,
        labels: editLabels,
        customFields: cleanCustomFields,
        companyWebsite: editData.companyWebsite,
        street: editData.street,
        street2: editData.street2,
        city: editData.city,
        state: editData.state,
        zip: editData.zip,
        customLinks: editData.customLinks,
        documents: editData.documents,
        isShared: editData.isShared || false,
        ownerId: editData.ownerId || user?.id,
        isSpam: false,
        isTrashed: false,
      };
      await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newLead) });
      fetchLeads();
      closeDrawer();
    } else if (selectedLead) {
      await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: editStatus, 
          notes: editNotes, 
          labels: editLabels,
          name: `${editData.firstName} ${editData.lastName}`.trim(),
          firstName: editData.firstName,
          lastName: editData.lastName,
          email: editData.email,
          phone: editData.phone,
          method: editData.method,
          source: editData.source,
          companyWebsite: editData.companyWebsite,
          street: editData.street,
          street2: editData.street2,
          city: editData.city,
          state: editData.state,
          zip: editData.zip,
          customLinks: editData.customLinks,
          documents: editData.documents,
          customFields: cleanCustomFields,
          isShared: editData.isShared || false,
          ownerId: editData.ownerId || user?.id
        })
      });
      fetchLeads();
      setIsEditingLead(false);
      // Fetch fresh data for selectedLead
      const updatedList = await fetch('/api/leads').then(res => res.json());
      if (updatedList.leads) {
        const freshLead = updatedList.leads.find((l:any) => l.id === selectedLead.id);
        if (freshLead) setSelectedLead(freshLead);
      }
    }
    
    if (isActive) nextStep();
  };

  const deleteLead = async (id: number) => {
    if (!confirm('Permanently delete this lead?')) return;
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    fetchLeads();
    if (selectedLead?.id === id) closeDrawer();
  };

  const trashSelected = async () => {
    for (const id of selectedLeadIds) {
      await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isTrashed: true })
      });
    }
    fetchLeads();
    setSelectedLeadIds([]);
  };

  const deleteSelectedPermanently = async () => {
    if (!confirm(`Permanently delete ${selectedLeadIds.length} leads?`)) return;
    for (const id of selectedLeadIds) {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    }
    fetchLeads();
    setSelectedLeadIds([]);
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      if (!text) return;
      
      const rows = text.split('\n');
      if (rows.length < 2) return alert('No data found in CSV');
      
      const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
      const nameIdx = headers.findIndex(h => h.includes('name'));
      const emailIdx = headers.findIndex(h => h.includes('email'));
      const phoneIdx = headers.findIndex(h => h.includes('phone') || h.includes('mobile'));

      const newLeads = [];
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue;
        const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
        
        const name = nameIdx !== -1 && cols[nameIdx] ? cols[nameIdx] : 'Unknown';
        const email = emailIdx !== -1 && cols[emailIdx] ? cols[emailIdx] : '';
        const phone = phoneIdx !== -1 && cols[phoneIdx] ? cols[phoneIdx] : '';
        
        if (name !== 'Unknown' || email) {
          newLeads.push({
            name, email, phone,
            interest: 'CSV Import',
            status: 'New',
            labels: ['General Contacts', 'Recently Imported'],
            isSpam: false,
            isTrashed: false,
          });
        }
      }
      
      if (newLeads.length > 0) {
        await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ leads: newLeads }) });
        fetchLeads();
        alert(`Successfully imported ${newLeads.length} leads.`);
      } else {
        alert('Could not find valid rows to import. Ensure your CSV has Name, Email, or Phone columns.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const toggleLeadSelection = (id: number) => {
    if (selectedLeadIds.includes(id)) setSelectedLeadIds(selectedLeadIds.filter(lid => lid !== id));
    else setSelectedLeadIds([...selectedLeadIds, id]);
  };
  
  const toggleSelectAll = (filteredList: any[]) => {
    if (selectedLeadIds.length === filteredList.length) setSelectedLeadIds([]);
    else setSelectedLeadIds(filteredList.map(l => l.id));
  };

  const toggleLabel = (labelName: string) => {
    if (editLabels.includes(labelName)) setEditLabels(editLabels.filter(l => l !== labelName));
    else setEditLabels([...editLabels, labelName]);
  };

  const handleBulkToggleLabel = async (labelName: string) => {
    if (selectedLeadIds.length === 0) return;
    // Check if ALL selected leads have the label. If so, remove from all. Otherwise add to all.
    const allHaveLabel = selectedLeadIds.every(id => {
      const lead = leads.find(l => l.id === id);
      return lead && (lead.labels || lead.lists || []).includes(labelName);
    });

    for (const id of selectedLeadIds) {
      const lead = leads.find(l => l.id === id);
      if (lead) {
        let currentLabels = lead.labels || lead.lists || [];
        if (allHaveLabel) {
          currentLabels = currentLabels.filter((l: string) => l !== labelName);
        } else {
          if (!currentLabels.includes(labelName)) currentLabels.push(labelName);
        }
        await fetch(`/api/leads/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ labels: currentLabels })
        });
      }
    }
    fetchLeads();
  };

  // Utility to get hex to rgb for transparent backgrounds
  const hexToRgbA = (hex: string, alpha: number) => {
    let c: any;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    return `rgba(0,0,0,${alpha})`;
  };

  // Filtering Logic
  let displayLeads = leads;

  const isSuperOrOwner = user?.role === 'Super Admin' || user?.role === 'Primary Owner' || user?.role === 'System Admin';

  if (viewMode === 'team_crm') {
    displayLeads = displayLeads.filter(l => l.isShared === true);
  } else {
    // My CRM
    if (!isSuperOrOwner) {
      displayLeads = displayLeads.filter(l => l.ownerId === user?.id || !l.ownerId);
    }
  }
  if (activeLabel === 'Trash') {
    displayLeads = leads.filter(l => l.isTrashed);
  } else {
    displayLeads = leads.filter(l => !l.isTrashed);
    if (activeLabel !== 'All Contacts') {
      displayLeads = displayLeads.filter(l => {
        const lbls = l.labels || l.lists || [];
        return lbls.includes(activeLabel);
      });
    }
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayLeads = displayLeads.filter(l => 
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.phone && l.phone.toLowerCase().includes(q))
    );
  }

  const handleExportCsv = () => {
    if (displayLeads.length === 0) return alert('No leads to export in this view.');
    const headers = ['Name', 'Email', 'Phone', 'Status', 'Interest/Source', 'Date', 'Labels'];
    const rows = displayLeads.map(lead => {
      const dateStr = new Date(lead.date || Date.now()).toLocaleDateString('en-US');
      const labelsStr = (lead.labels || lead.lists || []).join('; ');
      return [
        `"${lead.name || ''}"`,
        `"${lead.email || ''}"`,
        `"${lead.phone || ''}"`,
        `"${lead.status || 'New'}"`,
        `"${lead.interest || ''}"`,
        `"${dateStr}"`,
        `"${labelsStr}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_export_${activeLabel.replace(/\s+/g, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // RBAC Checks
  if (loadingUser) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Verifying Access...</div>;
  }
  
  const hasAccess = isSuperOrOwner || user?.role === 'Loan Officer' || user?.role === 'Agent Partner' || user?.role === 'Sales Rep' || user?.hasCrmAccess === true;

  if (!hasAccess) {
    return (
      <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '16px', border: '1px solid #fca5a5', textAlign: 'center', maxWidth: '500px', boxShadow: '0 10px 25px rgba(239, 68, 68, 0.1)' }}>
          <div style={{ width: '64px', height: '64px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h1 style={{ margin: '0 0 1rem 0', color: '#111827', fontSize: '1.5rem', fontWeight: 800 }}>Access Denied</h1>
          <p style={{ color: '#4b5563', lineHeight: 1.6, margin: '0 0 2rem 0' }}>You do not have permission to access the Network CRM. Please contact your Primary Owner to request access.</p>
          <button onClick={() => router.push('/clickme')} style={{ background: '#111827', color: '#ffffff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Return to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif", height: '100vh' }}>
      
      {/* Create Label Modal */}
      {isCreatingLabel && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem', width: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 800 }}>Create New Label</h3>
            
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Label Name</label>
            <input type="text" value={newLabelName} onChange={e => setNewLabelName(e.target.value)} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', outline: 'none', marginBottom: '1.5rem', fontSize: '1rem' }} placeholder="e.g. VIP Client" autoFocus />
            
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Color Swatch</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {COLOR_PRESETS.map(color => (
                <button 
                  key={color} 
                  onClick={() => setNewLabelColor(color)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: color, border: newLabelColor === color ? '3px solid #111827' : 'none', cursor: 'pointer', outline: newLabelColor === color ? '2px solid #ffffff' : 'none', outlineOffset: '-2px' }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsCreatingLabel(false)} style={{ background: 'transparent', border: 'none', color: '#6b7280', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={createLabel} disabled={!newLabelName.trim()} style={{ background: '#111827', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 700, cursor: newLabelName.trim() ? 'pointer' : 'not-allowed', opacity: newLabelName.trim() ? 1 : 0.5 }}>Create Label</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Routing Modal */}
      {isRoutingMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem', width: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 800 }}>Form Routing Engine</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Map the different website forms (by Subject/Interest) to the CRM labels you want them automatically added to when submitted.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {['Purchase', 'Refinance', 'Pre-Approval', 'Coaching', 'Strategic Partnership', 'Question', 'Apply Now Flow'].map(formType => {
                const currentLabels = formRouting[formType] || [];
                return (
                  <div key={formType} style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#111827' }}>Form: {formType}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {labelsData.filter((l: any) => l.name !== 'Trash').map((lbl: any) => (
                        <label key={lbl.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', background: '#ffffff', padding: '0.3rem 0.6rem', borderRadius: '20px', border: '1px solid #d1d5db', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={currentLabels.includes(lbl.name)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFormRouting(prev => ({
                                ...prev,
                                [formType]: checked ? [...currentLabels, lbl.name] : currentLabels.filter(l => l !== lbl.name)
                              }));
                            }}
                          />
                          {lbl.name}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsRoutingMenuOpen(false)} style={{ background: 'transparent', border: 'none', color: '#6b7280', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={saveFormRouting} style={{ background: '#111827', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>Save Routing</button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR - LABELS */}
      <div style={{ width: '250px', background: '#ffffff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', paddingTop: '2rem' }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>CRM</h2>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.85rem' }}>Lead Management</p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <button onClick={() => { setActiveLabel('All Contacts'); setSelectedLeadIds([]); }} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', border: 'none', background: activeLabel === 'All Contacts' ? '#f3f4f6' : 'transparent', color: activeLabel === 'All Contacts' ? '#111827' : '#4b5563', fontWeight: activeLabel === 'All Contacts' ? 700 : 500, cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect></svg>
              All Contacts
            </button>
            
            <div style={{ margin: '1.5rem 0 0.5rem 1rem', fontSize: '0.75rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Labels</div>
            
            {labelsData.map((lbl: any) => (
              <button key={lbl.name} onClick={() => { setActiveLabel(lbl.name); setSelectedLeadIds([]); }} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem', borderRadius: '8px', border: 'none', background: activeLabel === lbl.name ? hexToRgbA(lbl.color, 0.1) : 'transparent', color: activeLabel === lbl.name ? lbl.color : '#4b5563', fontWeight: activeLabel === lbl.name ? 700 : 500, cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={lbl.color} style={{ opacity: activeLabel === lbl.name ? 1 : 0.6 }}><circle cx="12" cy="12" r="10"></circle></svg>
                {lbl.name}
              </button>
            ))}

            <button onClick={() => setIsCreatingLabel(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px dashed #d1d5db', background: 'transparent', color: '#6b7280', fontWeight: 600, cursor: 'pointer', textAlign: 'left', marginTop: '0.5rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create Label
            </button>

            {isSuperOrOwner && (
              <button onClick={() => setIsRoutingMenuOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem', borderRadius: '8px', border: 'none', background: '#f3f4f6', color: '#111827', fontWeight: 600, cursor: 'pointer', textAlign: 'left', marginTop: '1rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                Form Routing Config
              </button>
            )}

            <div style={{ margin: '1.5rem 0 0.5rem 1rem', fontSize: '0.75rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>System</div>
            <button onClick={() => { setActiveLabel('Trash'); setSelectedLeadIds([]); }} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem', borderRadius: '8px', border: 'none', background: activeLabel === 'Trash' ? '#fef2f2' : 'transparent', color: activeLabel === 'Trash' ? '#ef4444' : '#4b5563', fontWeight: activeLabel === 'Trash' ? 700 : 500, cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              Trash
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 3rem', display: 'flex', flexDirection: 'column' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          
          <div style={{ position: 'relative', width: '400px' }}>
            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder={`Search in ${activeLabel}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '30px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', background: '#ffffff', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {isSuperOrOwner && (
              <button 
                onClick={handleExportCsv}
                style={{ background: '#ffffff', color: '#4b5563', border: '1px solid #d1d5db', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Export List
              </button>
            )}

            <div style={{ position: 'relative' }}>
              <label htmlFor="csv-upload" style={{ background: '#ffffff', color: '#4b5563', border: '1px solid #d1d5db', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                Import CSV
              </label>
              <input id="csv-upload" type="file" accept=".csv" style={{ display: 'none' }} onChange={handleCsvUpload} />
            </div>
            <button 
              id="btn-add-lead"
              onClick={openAddLeadDrawer}
              style={{ background: '#111827', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Lead
            </button>
          </div>
        </header>

        {/* Toolbar Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', height: '40px' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>{activeLabel}</h2>
          
          {selectedLeadIds.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#f3f4f6', padding: '0.3rem 1rem', borderRadius: '30px', border: '1px solid #d1d5db' }}>
              <span style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 700, marginRight: '0.5rem' }}>{selectedLeadIds.length} Selected</span>
              
              {activeLabel !== 'Trash' && (
                <>
                  <div style={{ position: 'relative' }} ref={bulkMenuRef}>
                    <button onClick={() => setShowBulkLabelMenu(!showBulkLabelMenu)} style={{ background: '#ffffff', border: '1px solid #d1d5db', color: '#4b5563', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                      Label As...
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    
                    {showBulkLabelMenu && (
                      <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.5rem', width: '220px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', zIndex: 100 }}>
                        <div style={{ padding: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Apply Labels</div>
                        {labelsData.map((lbl: any) => {
                          const allHaveLabel = selectedLeadIds.every(id => {
                            const lead = leads.find(l => l.id === id);
                            return lead && (lead.labels || lead.lists || []).includes(lbl.name);
                          });
                          const someHaveLabel = !allHaveLabel && selectedLeadIds.some(id => {
                            const lead = leads.find(l => l.id === id);
                            return lead && (lead.labels || lead.lists || []).includes(lbl.name);
                          });

                          return (
                            <label key={lbl.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                              <input 
                                type="checkbox" 
                                checked={allHaveLabel || someHaveLabel} 
                                ref={input => { if (input) input.indeterminate = someHaveLabel; }}
                                onChange={() => handleBulkToggleLabel(lbl.name)}
                                style={{ accentColor: lbl.color, cursor: 'pointer' }}
                              />
                              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: lbl.color }}></div>
                              <span style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>{lbl.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <button onClick={trashSelected} style={{ background: '#ffffff', border: '1px solid #fca5a5', color: '#dc2626', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> 
                    Trash
                  </button>
                </>
              )}
              {activeLabel === 'Trash' && (
                <button onClick={deleteSelectedPermanently} style={{ background: '#dc2626', border: 'none', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 700 }}>
                  Empty Trash
                </button>
              )}
            </div>
          )}
        </div>

        {/* Data Table */}
        <div style={{ flex: 1, background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflowY: 'auto', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <table 
            style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', userSelect: isSuperOrOwner ? 'auto' : 'none', WebkitUserSelect: isSuperOrOwner ? 'auto' : 'none' }}
            onCopy={(e) => { if (!isSuperOrOwner) e.preventDefault(); }}
          >
            <thead style={{ position: 'sticky', top: 0, background: '#f9fafb', zIndex: 10 }}>
              <tr style={{ color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '1.25rem 1rem', width: '40px' }}>
                  <input type="checkbox" onChange={() => toggleSelectAll(displayLeads)} checked={selectedLeadIds.length === displayLeads.length && displayLeads.length > 0} style={{ cursor: 'pointer', accentColor: '#4b5563' }} />
                </th>
                <th style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>Lead Details</th>
                <th style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>Contact Info</th>
                <th style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>Labels</th>
                <th style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '6rem', color: '#9ca3af' }}>
                    <svg style={{ margin: '0 auto 1rem auto', color: '#d1d5db' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.5rem' }}>No leads found</div>
                    <div>{searchQuery ? 'Try adjusting your search.' : `Your ${activeLabel} list is empty.`}</div>
                  </td>
                </tr>
              ) : displayLeads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.2s', background: selectedLead?.id === lead.id ? '#f3f4f6' : 'transparent' }} onMouseEnter={(e) => { if(selectedLead?.id !== lead.id) e.currentTarget.style.background = '#f9fafb' }} onMouseLeave={(e) => { if(selectedLead?.id !== lead.id) e.currentTarget.style.background = 'transparent' }}>
                  <td style={{ padding: '1.5rem 1rem' }}>
                    <input type="checkbox" checked={selectedLeadIds.includes(lead.id)} onChange={() => toggleLeadSelection(lead.id)} style={{ cursor: 'pointer', accentColor: '#4b5563' }} />
                  </td>
                  <td style={{ padding: '1.5rem 1rem', cursor: 'pointer' }} onClick={() => openDrawer(lead)}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#111827' }}>{lead.firstName || lead.lastName ? `${lead.firstName || ''} ${lead.lastName || ''}`.trim() : lead.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{new Date(lead.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </td>
                  <td style={{ padding: '1.5rem 1rem', cursor: 'pointer' }} onClick={() => openDrawer(lead)}>
                    <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: '#4b5563' }}>{lead.email}</div>
                    <div style={{ fontSize: '0.9rem', color: '#111827', fontWeight: 600 }}>{lead.phone}</div>
                  </td>
                  <td style={{ padding: '1.5rem 1rem', cursor: 'pointer' }} onClick={() => openDrawer(lead)}>
                    {(() => {
                      const lables = lead.labels || lead.lists || [];
                      if (lables.length === 0) return <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>--</span>;
                      return (
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          {lables.map((lbl: string, idx: number) => {
                            const labelObj = labelsData.find(l => l.name === lbl);
                            const color = labelObj ? labelObj.color : '#6b7280';
                            return (
                              <span key={idx} style={{ fontSize: '0.75rem', color: color, background: hexToRgbA(color, 0.1), border: `1px solid ${hexToRgbA(color, 0.3)}`, padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
                                {lbl}
                              </span>
                            );
                          })}
                        </div>
                      )
                    })()}
                  </td>
                  <td style={{ padding: '1.5rem 1rem', cursor: 'pointer' }} onClick={() => openDrawer(lead)}>
                    <span style={{ 
                      background: lead.status === 'Approved' ? '#ecfdf5' : lead.status === 'In Progress' ? '#eff6ff' : lead.status === 'Recently Corresponded' ? '#f5f3ff' : lead.status === 'Rejected' ? '#fef2f2' : '#f9fafb',
                      color: lead.status === 'Approved' ? '#059669' : lead.status === 'In Progress' ? '#2563eb' : lead.status === 'Recently Corresponded' ? '#7c3aed' : lead.status === 'Rejected' ? '#ef4444' : '#4b5563',
                      border: `1px solid ${lead.status === 'Approved' ? '#34d399' : lead.status === 'In Progress' ? '#93c5fd' : lead.status === 'Recently Corresponded' ? '#c4b5fd' : lead.status === 'Rejected' ? '#fca5a5' : '#d1d5db'}`,
                      padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700
                    }}>
                      {lead.status || 'New'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Module Submit Footer */}
        {submitState !== 'hidden' && (
          <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
            {submitState === 'idle' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: 600 }}>Please add at least 1 lead to continue.</span>
                <button disabled style={{ background: '#e5e7eb', color: '#9ca3af', border: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'not-allowed' }}>
                  Submit Module
                </button>
              </div>
            )}

            {submitState === 'ready' && (
              <button 
                onClick={() => setSubmitState('confirming')} 
                style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
              >
                Submit Module
              </button>
            )}

            {submitState === 'confirming' && (
              <div style={{ position: 'absolute', bottom: '0', right: '0', background: '#ffffff', border: '1px solid #d1d5db', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', zIndex: 10 }}>
                <p style={{ margin: '0 0 1.5rem 0', fontWeight: 700, color: '#111827' }}>Are you ready to submit this module?</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => setSubmitState('ready')} style={{ background: 'transparent', border: 'none', color: '#6b7280', fontWeight: 600, cursor: 'pointer' }}>Go Back</button>
                  <button onClick={handleSubmitModule} style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>Yes, Submit</button>
                </div>
              </div>
            )}

            {submitState === 'submitting' && (
              <button disabled style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 800, fontSize: '1rem', cursor: 'wait' }}>
                Submitting...
              </button>
            )}

            {submitState === 'completed' && (
              <button disabled style={{ background: '#f3f4f6', color: '#10b981', border: '1px solid #10b981', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 800, fontSize: '1rem', cursor: 'default', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Completed
              </button>
            )}
          </div>
        )}
      </div>

      {/* Slide-out Drawer */}
      {(selectedLead || isAddingLead) && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '450px', background: '#ffffff', borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 40px rgba(0,0,0,0.05)', zIndex: 100000 }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>
              {isAddingLead ? 'Add New Lead' : (isEditingLead ? 'Edit Lead' : selectedLead.name)}
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {!isAddingLead && !isEditingLead && selectedLead?.ownerId !== user?.id && viewMode === 'team_crm' && (
                <button onClick={() => {
                  const updatedLead = { ...selectedLead, ownerId: user?.id, isShared: true };
                  fetch('/api/leads', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedLead) }).then(fetchLeads);
                  setSelectedLead(updatedLead);
                }} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                  Add to My CRM
                </button>
              )}
              {!isAddingLead && !isEditingLead && (
                <button onClick={() => setIsEditingLead(true)} style={{ background: '#e5e7eb', color: '#374151', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                  Edit
                </button>
              )}
              {!isAddingLead && isEditingLead && (
                <button onClick={() => setIsEditingLead(false)} style={{ background: 'transparent', border: '1px solid #d1d5db', borderRadius: '6px', color: '#4b5563', padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                  Cancel
                </button>
              )}
              {!isAddingLead && (
                <button onClick={() => deleteLead(selectedLead.id)} style={{ background: 'transparent', border: '1px solid #fca5a5', borderRadius: '6px', color: '#dc2626', padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Permanently Delete">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
                </button>
              )}
              <button onClick={closeDrawer} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '0.4rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Standard Fields Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827' }}>Standard Fields</div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: editData.isShared ? '#2563eb' : '#6b7280' }}>
                  <input type="checkbox" checked={editData.isShared || false} onChange={(e) => setEditData({...editData, isShared: e.target.checked})} style={{ accentColor: '#2563eb', cursor: 'pointer', width: '16px', height: '16px' }} />
                  {editData.isShared ? 'Shared in D&G CRM' : 'Share with D&G Team'}
                </label>
              </div>
              
              {isAddingLead || isEditingLead ? (
                <>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>First Name</label>
                      <input id="drawer-first-name" type="text" value={isAddingLead ? newLeadFirstName : editData.firstName} onChange={(e) => isAddingLead ? setNewLeadFirstName(e.target.value) : setEditData({...editData, firstName: e.target.value})} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Last Name</label>
                      <input type="text" value={isAddingLead ? newLeadLastName : editData.lastName} onChange={(e) => isAddingLead ? setNewLeadLastName(e.target.value) : setEditData({...editData, lastName: e.target.value})} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Email</label>
                    <input type="email" value={isAddingLead ? newLeadEmail : editData.email} onChange={(e) => isAddingLead ? setNewLeadEmail(e.target.value) : setEditData({...editData, email: e.target.value})} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Phone</label>
                    <input type="text" value={isAddingLead ? newLeadPhone : editData.phone} onChange={(e) => isAddingLead ? setNewLeadPhone(e.target.value) : setEditData({...editData, phone: e.target.value})} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Company Website</label>
                    <input type="url" value={editData.companyWebsite || ''} onChange={(e) => setEditData({...editData, companyWebsite: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Address</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <input type="text" value={editData.street || ''} onChange={(e) => setEditData({...editData, street: e.target.value})} placeholder="Street Address" style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                      <input type="text" value={editData.street2 || ''} onChange={(e) => setEditData({...editData, street2: e.target.value})} placeholder="Apt, Suite, Bldg (Optional)" style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.5rem' }}>
                        <input type="text" value={editData.city || ''} onChange={(e) => setEditData({...editData, city: e.target.value})} placeholder="City" style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                        <input type="text" value={editData.state || ''} onChange={(e) => setEditData({...editData, state: e.target.value})} placeholder="State" style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                        <input type="text" value={editData.zip || ''} onChange={(e) => setEditData({...editData, zip: e.target.value})} placeholder="ZIP" style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                      </div>
                    </div>
                  </div>
                  {!isAddingLead && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Preferred Contact Method</label>
                        <input type="text" value={editData.method} onChange={(e) => setEditData({...editData, method: e.target.value})} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>How Did You Find Us?</label>
                        <input type="text" value={editData.source} onChange={(e) => setEditData({...editData, source: e.target.value})} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem' }} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>First Name</label>
                      <div style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111827', fontSize: '0.95rem', minHeight: '40px' }}>{selectedLead.firstName || '--'}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Last Name</label>
                      <div style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111827', fontSize: '0.95rem', minHeight: '40px' }}>{selectedLead.lastName || '--'}</div>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Email</label>
                    <div style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111827', fontSize: '0.95rem', minHeight: '40px' }}>{selectedLead.email || '--'}</div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Phone</label>
                    <div style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111827', fontSize: '0.95rem', minHeight: '40px' }}>{selectedLead.phone || '--'}</div>
                  </div>
                  {selectedLead.companyWebsite && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Company Website</label>
                      <div style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111827', fontSize: '0.95rem', minHeight: '40px' }}>
                        <a href={selectedLead.companyWebsite} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>{selectedLead.companyWebsite}</a>
                      </div>
                    </div>
                  )}
                  {(selectedLead.street || selectedLead.city || selectedLead.state) && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Address</label>
                      <div style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111827', fontSize: '0.95rem', minHeight: '40px' }}>
                        {selectedLead.street && <div>{selectedLead.street}{selectedLead.street2 ? `, ${selectedLead.street2}` : ''}</div>}
                        {(selectedLead.city || selectedLead.state || selectedLead.zip) && <div>{selectedLead.city ? `${selectedLead.city}, ` : ''}{selectedLead.state} {selectedLead.zip}</div>}
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Preferred Contact Method</label>
                      <div style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111827', fontSize: '0.95rem', minHeight: '40px' }}>{selectedLead.method || 'N/A'}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>How Did You Find Us?</label>
                      <div style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#111827', fontSize: '0.95rem', minHeight: '40px' }}>{selectedLead.source || 'N/A'}</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Original Form Message */}
            {!isAddingLead && selectedLead.message && (
              <div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '0.5rem' }}>Initial Message</div>
                <div style={{ background: '#fef3c7', color: '#92400e', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid #fde68a', whiteSpace: 'pre-wrap' }}>
                  {selectedLead.message}
                </div>
              </div>
            )}

            {/* Custom Fields Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Custom Fields</div>
              
              {Object.keys(editData.customFields || {}).length === 0 && !isEditingLead && !isAddingLead && (
                <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic' }}>No custom fields added.</div>
              )}
              
              {Object.keys(editData.customFields || {}).length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {Object.entries(editData.customFields).map(([key, value]) => {
                    const overrides: Record<string, string> = {
                      propertyType: "Property Type",
                      timeline: "Buying/Selling Timeline",
                      budget: "Estimated Budget",
                      location: "Target Location"
                    };
                    const formattedKey = overrides[key] || key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
                    
                    return (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '0.8rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                      <span style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 600 }}>{formattedKey}</span>
                      {isEditingLead || isAddingLead ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input 
                            type="text" 
                            value={Array.isArray(value) ? value.join(', ') : String(value)} 
                            onChange={(e) => {
                              const newVal = e.target.value;
                              setEditData((prev: any) => ({
                                ...prev, 
                                customFields: { ...prev.customFields, [key]: newVal }
                              }));
                            }}
                            style={{ width: '150px', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '0.85rem' }}
                          />
                          <button onClick={() => {
                            const newCustomFields = { ...editData.customFields };
                            delete newCustomFields[key];
                            setEditData({ ...editData, customFields: newCustomFields });
                          }} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#ef4444', borderRadius: '4px', cursor: 'pointer', padding: '0 0.4rem' }}>
                            &times;
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 700, textAlign: 'right' }}>
                          {value === '' ? '--' : (Array.isArray(value) ? value.join(', ') : String(value))}
                        </span>
                      )}
                    </div>
                    );
                  })}
                </div>
              )}
              
              {(isEditingLead || isAddingLead) && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input type="text" placeholder="New Field Name" value={newCustomFieldKey} onChange={(e) => setNewCustomFieldKey(e.target.value)} style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem' }} />
                  <input type="text" placeholder="Value" value={newCustomFieldValue} onChange={(e) => setNewCustomFieldValue(e.target.value)} style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem' }} />
                  <button 
                    onClick={() => {
                      if (newCustomFieldKey) {
                        setEditData({
                          ...editData,
                          customFields: { ...editData.customFields, [newCustomFieldKey]: newCustomFieldValue }
                        });
                        setNewCustomFieldKey('');
                        setNewCustomFieldValue('');
                      }
                    }}
                    style={{ background: '#111827', color: '#fff', border: 'none', padding: '0 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Social & Custom Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827' }}>Social & Custom Links</div>
                {(isEditingLead || isAddingLead) && (
                  <button 
                    type="button"
                    onClick={() => setEditData({...editData, customLinks: [...(editData.customLinks || []), { platform: '', url: '' }]})}
                    style={{ background: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Link
                  </button>
                )}
              </div>
              
              {(!editData.customLinks || editData.customLinks.length === 0) && !isEditingLead && !isAddingLead && (
                <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic' }}>No custom links added.</div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(editData.customLinks || []).map((link: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '0.8rem', borderRadius: '6px', border: '1px solid #e5e7eb', gap: '1rem' }}>
                    {isEditingLead || isAddingLead ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '0.5rem', width: '100%' }}>
                        <input 
                          type="text" 
                          placeholder="Platform" 
                          value={link.platform} 
                          onChange={(e) => {
                            const newLinks = [...editData.customLinks];
                            newLinks[idx].platform = e.target.value;
                            setEditData({...editData, customLinks: newLinks});
                          }}
                          style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '0.85rem' }} 
                        />
                        <input 
                          type="url" 
                          placeholder="URL" 
                          value={link.url} 
                          onChange={(e) => {
                            const newLinks = [...editData.customLinks];
                            newLinks[idx].url = e.target.value;
                            setEditData({...editData, customLinks: newLinks});
                          }}
                          style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '0.85rem' }} 
                        />
                        <button onClick={() => {
                          const newLinks = [...editData.customLinks];
                          newLinks.splice(idx, 1);
                          setEditData({...editData, customLinks: newLinks});
                        }} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#ef4444', borderRadius: '4px', cursor: 'pointer', padding: '0 0.4rem' }}>
                          &times;
                        </button>
                      </div>
                    ) : (
                      <>
                        <span style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 600 }}>{link.platform || 'Link'}</span>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 700, textDecoration: 'underline', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px', textAlign: 'right' }}>
                          {link.url}
                        </a>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827' }}>Client Documents</div>
                <div style={{ position: 'relative' }}>
                  <label style={{ background: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    Upload File
                    <input type="file" style={{ display: 'none' }} onChange={(e) => {
                      if(e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const newDoc = {
                          name: file.name,
                          size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
                          type: file.name.endsWith('.pdf') ? 'pdf' : (file.name.endsWith('.zip') ? 'archive' : (file.type.includes('image') ? 'image' : 'doc')),
                          date: new Date().toLocaleDateString('en-US')
                        };
                        setEditData({...editData, documents: [...(editData.documents || []), newDoc]});
                      }
                    }} />
                  </label>
                </div>
              </div>

              {(!editData.documents || editData.documents.length === 0) ? (
                <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', padding: '1rem', border: '1px dashed #e5e7eb', borderRadius: '8px' }}>
                  No documents attached to this client.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {editData.documents.map((doc: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '0.8rem', borderRadius: '6px', border: '1px solid #e5e7eb', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', overflow: 'hidden' }}>
                        <div style={{ padding: '0.2rem', color: doc.type === 'pdf' ? '#ef4444' : doc.type === 'image' ? '#10b981' : doc.type === 'archive' ? '#eab308' : '#3b82f6' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{doc.name}</div>
                          <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{doc.size} &bull; {doc.date}</div>
                        </div>
                      </div>
                      <button onClick={() => {
                        const newDocs = [...editData.documents];
                        newDocs.splice(idx, 1);
                        setEditData({...editData, documents: newDocs});
                      }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}>
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Communications History */}
            {!isAddingLead && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827' }}>Communication History</div>
                  <button onClick={() => router.push('/clickme/communications')} style={{ background: 'transparent', color: '#2563eb', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>
                    Open Inbox &rarr;
                  </button>
                </div>

                {loadingEmails ? (
                  <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>Syncing emails...</div>
                ) : leadEmails.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {leadEmails.slice(0, 5).map((thread: any, idx: number) => (
                      <div key={idx} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>
                            {thread.subject}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{thread.date}</div>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#4b5563', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {thread.snippet}
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>
                          {thread.messages?.length || 1} message(s) in thread
                        </div>
                      </div>
                    ))}
                    {leadEmails.length > 5 && (
                      <button onClick={() => router.push('/clickme/communications')} style={{ background: '#f3f4f6', color: '#4b5563', border: '1px solid #d1d5db', padding: '0.6rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        View all {leadEmails.length} threads in Inbox
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', fontSize: '1rem' }}>No Synced Emails</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#3b82f6' }}>Any emails sent to or received from <b>{selectedLead?.email || 'this lead'}</b> will automatically appear here once your Gmail is connected.</p>
                    </div>
                    <button onClick={() => router.push('/clickme/communications')} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                      Connect Gmail &rarr;
                    </button>
                  </div>
                )}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Lead Status</label>
              <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem', cursor: 'pointer' }}>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Recently Corresponded">Recently Corresponded</option>
                <option value="Answered">Answered</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Labels</label>
              <div 
                id="drawer-labels"
                onClick={() => setIsLabelsDropdownOpen(!isLabelsDropdownOpen)}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {editLabels.length === 0 ? <span style={{ color: '#9ca3af' }}>Select labels...</span> : editLabels.map(l => <span key={l} style={{ background: '#e5e7eb', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>{l}</span>)}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isLabelsDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              
              {isLabelsDropdownOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '0.5rem', background: '#fff', border: '1px solid #d1d5db', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 50, maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                  {labelsData.map((lbl: any) => {
                    const isChecked = editLabels.includes(lbl.name);
                    return (
                      <div 
                        key={lbl.name} 
                        onClick={(e) => { e.stopPropagation(); toggleLabel(lbl.name); }}
                        style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', background: isChecked ? '#f3f4f6' : '#fff', borderBottom: '1px solid #f3f4f6' }}
                      >
                        <input type="checkbox" checked={isChecked} readOnly style={{ cursor: 'pointer', accentColor: '#111827' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: lbl.color, flexShrink: 0 }}></div>
                        <span style={{ fontSize: '0.9rem', color: '#111827', fontWeight: isChecked ? 600 : 400 }}>{lbl.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Internal Notes</label>
              <textarea 
                value={editNotes} 
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Add notes about this lead..."
                style={{ width: '100%', height: '120px', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', resize: 'vertical', fontSize: '1rem', fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

          <div style={{ padding: '2rem', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <button 
              id="btn-save-lead"
              onClick={saveLead}
              style={{ width: '100%', background: '#111827', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.2s' }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NetworkCRM() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Command Center...</div>}>
      <NetworkCRMContent />
    </Suspense>
  );
}
