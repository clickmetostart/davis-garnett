"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalkthrough } from '@/components/clickme/WalkthroughProvider';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  joined: string;
  avatarUrl?: string;
};

function TeamAccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startWalkthrough, nextStep, isActive } = useWalkthrough();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const [editPassword, setEditPassword] = useState('');
  
  // Form State
  const [inviteData, setInviteData] = useState({ firstName: '', lastName: '', email: '', role: 'Content Writer' });

  const fetchData = async () => {
    try {
      // Fetch both current user and all team members
      const [meRes, usersRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/users')
      ]);

      if (meRes.ok) {
        const meData = await meRes.json();
        setCurrentUser(meData.user);
      }
      
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setMembers(usersData.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch team data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchParams.get('walkthrough') === 'true') {
      startWalkthrough('teamSetupWalkthrough', [
        {
          targetId: 'btn-invite-member',
          title: 'Invite Your Team',
          content: 'Click here to invite a Loan Officer, Content Writer, or Admin to your dashboard.',
          position: 'bottom',
          actionRequired: true
        },
        {
          targetId: 'input-first-name',
          title: 'First Name',
          content: 'Enter the first name of the team member.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'input-last-name',
          title: 'Last Name',
          content: 'Enter the last name.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'input-invite-email',
          title: 'Email Address',
          content: 'Type their email address. They will receive an invitation link with a temporary password.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'select-access-role',
          title: 'Access Role',
          content: 'Choose their role. For example, a Content Writer can only access the Content module.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'btn-send-invitation',
          title: 'Send Invite',
          content: 'Click Send to complete the invitation. This concludes the Team Setup walkthrough.',
          position: 'bottom',
          actionRequired: false
        }
      ], () => {
        router.push('/clickme');
      });
    }
  }, [searchParams]);

  const isAdmin = currentUser?.role === 'Super Admin' || currentUser?.role === 'System Admin';

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    
    setSaving(true);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...inviteData,
          status: 'Pending',
          password: Math.random().toString(36).slice(-8)
        })
      });
      
      if (!res.ok) {
        alert('Failed to invite member. Only Admins have permission.');
        return;
      }
      
      const newUser = await res.json();
      setMembers([...members, newUser]);
      setIsInviteModalOpen(false);
      setInviteData({ firstName: '', lastName: '', email: '', role: 'Content Writer' });

      fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onboarding: { teamInvited: true } })
      }).catch(e => console.error(e));

      if (isActive) nextStep();

    } catch (err) {
      console.error('Failed to invite member', err);
    } finally {
      setSaving(false);
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    if (!isAdmin) {
      alert('Only Admins can change roles.');
      return;
    }

    setSaving(true);
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole } : m));

    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { role: newRole } })
      });
      if (!res.ok) throw new Error('Role change failed');
    } catch (err) {
      console.error('Failed to update role', err);
      fetchData();
    } finally {
      setSaving(false);
    }
  };

  const handleRevokeAccess = async (id: string) => {
    if (!isAdmin) {
      alert('Only Admins can revoke access.');
      return;
    }

    if (!confirm('Are you sure you want to revoke this user\'s access?')) return;
    
    setSaving(true);
    setMembers(prev => prev.filter(m => m.id !== id));

    try {
      const res = await fetch(`/api/users?id=${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Delete failed');
    } catch (err) {
      console.error('Failed to revoke access', err);
      fetchData();
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !editingMember) return;
    
    setSaving(true);
    
    const updates: any = { ...editingMember };
    if (editPassword) {
      updates.password = editPassword;
    }
    
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingMember.id, updates })
      });
      
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server returned ${res.status}: ${errText.substring(0, 100)}...`);
      }
      
      setEditingMember(null);
      setEditPassword('');
      fetchData();
    } catch (err: any) {
      console.error('Failed to update member', err);
      alert('Update failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280', fontWeight: 600 }}>Loading User Database...</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <div style={{ padding: '3rem 4rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Team Access Control</h1>
            <p style={{ color: '#4b5563', margin: 0 }}>Manage Role-Based Access Control (RBAC) permissions.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {saving && <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>Syncing Database...</span>}
            
            {isAdmin && (
              <button 
                id="btn-invite-member"
                onClick={() => {
                  setIsInviteModalOpen(true);
                  if (isActive) nextStep();
                }}
                disabled={saving}
                style={{ background: '#4fd1c5', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgba(79, 209, 197, 0.3)', transition: 'all 0.2s', opacity: saving ? 0.7 : 1 }}
                onMouseEnter={(e) => { if(!saving) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 10px -2px rgba(79, 209, 197, 0.4)'; } }}
                onMouseLeave={(e) => { if(!saving) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(79, 209, 197, 0.3)'; } }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Invite Member
              </button>
            )}
          </div>
        </header>

        {isInviteModalOpen && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #4fd1c5', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', marginBottom: '3rem', position: 'relative' }}>
            <button 
              onClick={() => setIsInviteModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Invite Team Member</h3>
            <p style={{ color: '#4b5563', margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>Send an email invitation to collaborate on this dashboard.</p>
            
            <form onSubmit={handleInviteMember} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>First Name</label>
                  <input id="input-first-name" required value={inviteData.firstName} onChange={e => setInviteData({...inviteData, firstName: e.target.value})} type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Last Name</label>
                  <input id="input-last-name" required value={inviteData.lastName} onChange={e => setInviteData({...inviteData, lastName: e.target.value})} type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Email Address</label>
                <input id="input-invite-email" required value={inviteData.email} onChange={e => setInviteData({...inviteData, email: e.target.value})} type="email" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Access Role</label>
                <select id="select-access-role" value={inviteData.role} onChange={e => setInviteData({...inviteData, role: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#fff' }}>
                  <option>System Admin</option>
                  <option>Loan Officer</option>
                  <option>Agent Partner</option>
                  <option>Content Writer</option>
                  <option>Sales Rep</option>
                  <option>Review Manager</option>
                </select>
              </div>
              
              <button 
                id="btn-send-invitation"
                type="submit"
                disabled={saving}
                style={{ marginTop: '0.5rem', width: '100%', background: '#111827', color: '#ffffff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontSize: '1rem', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', opacity: saving ? 0.7 : 1 }}
              >
                Send Invitation
              </button>
            </form>
          </div>
        )}

        {editingMember && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #4fd1c5', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', marginBottom: '3rem', position: 'relative' }}>
            <button 
              onClick={() => { setEditingMember(null); setEditPassword(''); }}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Edit Team Member</h3>
            <p style={{ color: '#4b5563', margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>Update details or set a new password for this user.</p>
            
            <form onSubmit={handleUpdateMember} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>First Name</label>
                  <input required value={editingMember.firstName} onChange={e => setEditingMember({...editingMember, firstName: e.target.value})} type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Last Name</label>
                  <input required value={editingMember.lastName} onChange={e => setEditingMember({...editingMember, lastName: e.target.value})} type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Email Address</label>
                  <input required value={editingMember.email} onChange={e => setEditingMember({...editingMember, email: e.target.value})} type="email" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Status</label>
                  <select value={editingMember.status} onChange={e => setEditingMember({...editingMember, status: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#fff' }}>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Access Role</label>
                <select value={editingMember.role} onChange={e => setEditingMember({...editingMember, role: e.target.value})} disabled={editingMember.role === 'Super Admin'} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: editingMember.role === 'Super Admin' ? '#f3f4f6' : '#fff' }}>
                  {editingMember.role === 'Super Admin' && <option>Super Admin</option>}
                  <option>System Admin</option>
                  <option>Loan Officer</option>
                  <option>Agent Partner</option>
                  <option>Content Writer</option>
                  <option>Sales Rep</option>
                  <option>Review Manager</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>New Password (leave blank to keep current)</label>
                <input value={editPassword} onChange={e => setEditPassword(e.target.value)} type="text" placeholder="Enter new password..." style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
              </div>
              
              <button 
                type="submit"
                disabled={saving}
                style={{ marginTop: '0.5rem', width: '100%', background: '#111827', color: '#ffffff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontSize: '1rem', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', opacity: saving ? 0.7 : 1 }}
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>Member</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>Access Role</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>Joined</th>
                <th style={{ padding: '1rem 1.5rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e6fffa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#319795', border: '1px solid #4fd1c5', overflow: 'hidden' }}>
                        {m.avatarUrl ? (
                           <img src={m.avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          `${m.firstName?.[0] || ''}${m.lastName?.[0] || ''}`
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827' }}>
                          {m.firstName} {m.lastName} {currentUser?.id === m.id && <span style={{ fontSize: '0.75rem', color: '#319795', fontWeight: 600, marginLeft: '0.5rem' }}>(You)</span>}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <select 
                      value={m.role}
                      onChange={(e) => handleRoleChange(m.id, e.target.value)}
                      disabled={!isAdmin || m.role === 'Super Admin'}
                      style={{ 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '6px', 
                        border: '1px solid #d1d5db', 
                        background: (!isAdmin || m.role === 'Super Admin') ? '#f3f4f6' : '#ffffff', 
                        color: '#111827', 
                        fontSize: '0.85rem', 
                        fontWeight: 600,
                        cursor: (!isAdmin || m.role === 'Super Admin') ? 'not-allowed' : 'pointer',
                        appearance: isAdmin ? 'auto' : 'none'
                      }}
                    >
                      {m.role === 'Super Admin' && <option>Super Admin</option>}
                      <option>System Admin</option>
                      <option>Loan Officer</option>
                      <option>Agent Partner</option>
                      <option>Content Writer</option>
                      <option>Sales Rep</option>
                      <option>Review Manager</option>
                    </select>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                      background: m.status === 'Active' ? '#e6fffa' : '#fffbeb',
                      color: m.status === 'Active' ? '#319795' : '#f59e0b',
                      border: `1px solid ${m.status === 'Active' ? '#4fd1c5' : '#fcd34d'}`
                    }}>
                      {m.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', color: '#4b5563', fontSize: '0.9rem' }}>{m.joined}</td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    {isAdmin && (
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button onClick={() => { setEditingMember(m); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>Edit</button>
                        {m.role !== 'Super Admin' && (
                          <button onClick={() => handleRevokeAccess(m.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>Revoke</button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>



    </div>
  );
}

export default function TeamAccess() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Team Database...</div>}>
      <TeamAccessContent />
    </Suspense>
  );
}
