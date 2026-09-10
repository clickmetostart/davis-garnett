const fs = require('fs');

const filePath = 'src/app/clickme/crm/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add states for Email Composer and Listing Categories
if (!content.includes('isEmailComposerOpen')) {
  content = content.replace(
    /const \[submitState, setSubmitState\] = useState[^\n]+;\n/,
    `$&
  // Email Composer Modal State
  const [isEmailComposerOpen, setIsEmailComposerOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [isAiAssisting, setIsAiAssisting] = useState(false);
  
  // Listing Attach Modal State
  const [activeListingList, setActiveListingList] = useState<'listingsShown' | 'listingsToShow' | 'watchlist' | 'emailComposer'>('listingsShown');
`
  );
}

// 2. Modify "Slide-out Drawer" to "Massive Modal Overlay"
content = content.replace(
  /<div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '450px', background: '#ffffff', borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 40px rgba\(0,0,0,0\.05\)', zIndex: 100000 }}>/,
  `<div style={{ position: 'fixed', inset: 0, background: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000 }}>
          <div style={{ width: '90vw', height: '90vh', background: '#ffffff', borderRadius: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}>`
);

// We need to close this new modal structure at the end of the drawer.
// The drawer originally ends with:
/*
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
*/
// Because of the two divs, it just replaces the inner one.

// Let's create the 2-column flex layout right after the header:
content = content.replace(
  /<div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1\.5rem' }}>\s*{\/\* Standard Fields Section \*\//,
  `<div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Left Column - Details */}
            <div style={{ width: '450px', borderRight: '1px solid #e5e7eb', overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#f9fafb' }}>
              {/* Standard Fields Section */}`
);

// Close Left Column and Open Right Column before Communications History
// In original code, Communications History starts with: `{/* Communications History */}`
// But wait, what if we also move Attached Listings to Right Column?
// Let's move Attached Listings to the right column, so the Left Column ends right after Documents Section.

const documentsSectionEndRegex = /({\/\* Attached Listings Section \*\/[\s\S]*?){\/\* Communications History \*\/}/;
const match = content.match(documentsSectionEndRegex);
if (match) {
  content = content.replace(
    /{\/\* Attached Listings Section \*\//,
    `            </div>
            
            {/* Right Column - Activity & Properties */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', background: '#ffffff' }}>
              {/* Attached Listings Section */}`
  );
}

// Then we need to close the Right column before the save button footer.
// The original code has:
/*
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Internal Notes</label>
              ...
            </div>
          </div>

          <div style={{ padding: '2rem', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
*/
// The '</div>' before `<div style={{ padding: '2rem'` is the end of the scrolling container. We need to add an extra '</div>' to close the flex wrapper.
content = content.replace(
  /<\/div>\s*<div style={{ padding: '2rem', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>/,
  `</div>
          </div>

          <div style={{ padding: '2rem', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>`
);

// Now, replace the Attached Listings logic with the 3 categories.
const oldAttachedListings = `            {/* Attached Listings Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827' }}>Attached Listings</div>
                <button 
                  type="button"
                  onClick={() => setIsAttachListingModalOpen(true)}
                  style={{ background: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Attach Listing
                </button>
              </div>

              {(!editData.attachedListings || editData.attachedListings.length === 0) ? (
                <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', padding: '1rem', border: '1px dashed #e5e7eb', borderRadius: '8px' }}>
                  No listings attached to this contact.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {editData.attachedListings.map((listingId: string, idx: number) => {
                    const listing = allListings.find(l => l.id === listingId);
                    if (!listing) return null;
                    return (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '0.8rem', borderRadius: '6px', border: '1px solid #e5e7eb', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', overflow: 'hidden' }}>
                          <div style={{ width: '40px', height: '40px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                            {listing.images && listing.images[0] && (
                              <img src={listing.images[0].url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                          </div>
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{listing.streetAddress || listing.title}</div>
                            <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{listing.askingPrice || listing.askingRent} &bull; {listing.status}</div>
                          </div>
                        </div>
                        <button onClick={() => {
                          const newListings = [...editData.attachedListings];
                          newListings.splice(idx, 1);
                          setEditData({...editData, attachedListings: newListings});
                        }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}>
                          &times;
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>`;

const renderListingCategory = (title, dataKey) => \`
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827' }}>\${title}</div>
                <button 
                  type="button"
                  onClick={() => { setActiveListingList('\${dataKey}'); setIsAttachListingModalOpen(true); }}
                  style={{ background: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Add Property
                </button>
              </div>

              {(!editData.\${dataKey} || editData.\${dataKey}.length === 0) ? (
                <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', padding: '1rem', border: '1px dashed #e5e7eb', borderRadius: '8px' }}>
                  No listings here yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {editData.\${dataKey}.map((listingId: string, idx: number) => {
                    const listing = allListings.find(l => l.id === listingId);
                    if (!listing) return null;
                    return (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '0.8rem', borderRadius: '6px', border: '1px solid #e5e7eb', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', overflow: 'hidden' }}>
                          <div style={{ width: '40px', height: '40px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                            {listing.images && listing.images[0] && (
                              <img src={listing.images[0].url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                          </div>
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{listing.streetAddress || listing.title}</div>
                            <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{listing.askingPrice || listing.askingRent} &bull; {listing.status}</div>
                          </div>
                        </div>
                        <button onClick={() => {
                          const newListings = [...editData.\${dataKey}];
                          newListings.splice(idx, 1);
                          setEditData({...editData, [\`\${dataKey}\`]: newListings});
                        }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}>
                          &times;
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
\`;

const newListingsSection = \`{/* Property Categories Section */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
\${renderListingCategory('Listings To Show (Upcoming)', 'listingsToShow')}
\${renderListingCategory('Listings Shown (Past)', 'listingsShown')}
</div>
\${renderListingCategory('Client Watchlist', 'watchlist')}
\`;

content = content.replace(oldAttachedListings, newListingsSection);


// Update Attach Listing logic to use the activeListingList
const attachLogicOld = \`setEditData({ ...editData, attachedListings: [...(editData.attachedListings || []), listing.id] });\`;
const attachLogicNew = \`if (activeListingList === 'emailComposer') {
                            setEmailBody(prev => prev + \`\\n\\nProperty Highlight:\\n\${listing.streetAddress || listing.title}\\n\${listing.city}, \${listing.state}\\nPrice: \${listing.askingPrice || listing.askingRent}\\nLink: https://example.com/listing/\${listing.id}\\n\`);
                          } else {
                            setEditData({ ...editData, [activeListingList]: [...(editData[activeListingList] || []), listing.id] });
                          }\`;
content = content.replace(attachLogicOld, attachLogicNew);

const attachedCheckOld = \`const isAlreadyAttached = (editData.attachedListings || []).includes(listing.id);\`;
const attachedCheckNew = \`const isAlreadyAttached = activeListingList !== 'emailComposer' && (editData[activeListingList as keyof typeof editData] as string[] || []).includes(listing.id);\`;
content = content.replace(attachedCheckOld, attachedCheckNew);


// Finally, add the Email Composer Modal before the last </div>
const emailComposerJSX = \`
      {/* Email Composer Modal */}
      {isEmailComposerOpen && selectedLead && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '700px', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
            <button onClick={() => {
              setIsEmailComposerOpen(false);
              setEmailSubject('');
              setEmailBody('');
            }} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Compose Email</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>To: <strong>{selectedLead.email}</strong></p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Subject</label>
                <input 
                  type="text" 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Subject line..."
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem' }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Message Body</label>
                  <button 
                    onClick={() => { setActiveListingList('emailComposer'); setIsAttachListingModalOpen(true); }}
                    style={{ background: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Insert Listing
                  </button>
                </div>
                <textarea 
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Type your message here..."
                  style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', minHeight: '200px', resize: 'vertical', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <button 
                  onClick={() => {
                    setIsAiAssisting(true);
                    setTimeout(() => {
                      setEmailSubject(\`Checking in on your property search\`);
                      setEmailBody(\`Hi \${selectedLead.firstName || selectedLead.name},\\n\\nI noticed you're currently marked as "\${selectedLead.status || 'New'}" in our system. I wanted to reach out and see if you have any questions or if there's anything I can help you with regarding your search in \${selectedLead.customFields?.location || 'our area'}.\\n\\nLet me know if you'd like to schedule a quick call!\\n\\nBest,\\nMark & Rachael\`);
                      setIsAiAssisting(false);
                    }, 1500);
                  }}
                  disabled={isAiAssisting}
                  style={{ background: isAiAssisting ? '#f3f4f6' : '#ecfdf5', color: isAiAssisting ? '#9ca3af' : '#059669', border: isAiAssisting ? '1px solid #e5e7eb' : '1px solid #34d399', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 700, cursor: isAiAssisting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                >
                  {isAiAssisting ? '🧠 Thinking...' : '✨ AI Assist Writer'}
                </button>
                <button 
                  onClick={() => {
                    const updatedLead = { ...selectedLead };
                    updatedLead.communications = [
                      {
                        type: 'email',
                        direction: 'outbound',
                        subject: emailSubject,
                        body: emailBody,
                        timestamp: new Date().toISOString()
                      },
                      ...(updatedLead.communications || [])
                    ];
                    fetch('/api/leads', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedLead) }).then(fetchLeads);
                    setSelectedLead(updatedLead);
                    setIsEmailComposerOpen(false);
                    setEmailSubject('');
                    setEmailBody('');
                  }}
                  disabled={!emailSubject.trim() || !emailBody.trim()}
                  style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: (!emailSubject.trim() || !emailBody.trim()) ? 'not-allowed' : 'pointer', opacity: (!emailSubject.trim() || !emailBody.trim()) ? 0.5 : 1 }}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
\`;

if (!content.includes('Email Composer Modal')) {
  // Insert right before the last closing tags:
  /*
      )}
    </div>
  );
}
  */
  content = content.replace(
    /      \)}\s*<\/div>\s*\);\s*}\s*export default function NetworkCRM/g,
    \`      )}\n\${emailComposerJSX}\n    </div>\n  );\n}\n\nexport default function NetworkCRM\`
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('CRM updated successfully!');
