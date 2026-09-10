const fs = require('fs');
let code = fs.readFileSync('src/app/clickme/listings/add/page.tsx', 'utf8');

// 1. Imports
code = code.replace(
  "import React, { useState } from 'react';", 
  "import React, { useState, useEffect } from 'react';"
);

// 2. Component signature
code = code.replace(
  "export default function AddListingWizard() {", 
  "export default function EditListingWizard({ params }: { params: { id: string } }) {"
);

// 3. State overrides
code = code.replace(
  "  const [formData, setFormData] = useState<Partial<Listing>>({", 
  "  const [isLoadingData, setIsLoadingData] = useState(true);\n  const [formData, setFormData] = useState<Partial<Listing>>({"
);

// 4. Inject useEffect
const effectCode = `
  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(data => {
        const listing = data.find((l: any) => l.id === params.id);
        if (listing) {
          setCategory(listing.category || 'Commercial');
          setFormData(listing);
        }
        setIsLoadingData(false);
      });
  }, [params.id]);
`;

code = code.replace(
  "  const [isGenerating, setIsGenerating] = useState(false);",
  effectCode + "\n  const [isGenerating, setIsGenerating] = useState(false);"
);

// 5. Update handlePublish
const oldPublish = `  const handlePublish = async () => {
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, ...formData })
      });
      if (response.ok) {
        router.push('/clickme/listings');
      } else {
        console.error('Failed to save listing');
      }
    } catch (e) {
      console.error(e);
    }
  };`;

const newPublish = `  const handlePublish = async () => {
    try {
      const response = await fetch(\`/api/listings/\${params.id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, ...formData })
      });
      if (response.ok) {
        router.push('/clickme/listings');
      } else {
        console.error('Failed to save listing');
      }
    } catch (e) {
      console.error(e);
    }
  };`;

code = code.replace(oldPublish, newPublish);

// 6. Loading check
code = code.replace(
  "  return (\n    <div className=\"flex-1", 
  "  if (isLoadingData) return <div className=\"p-8\">Loading listing data...</div>;\n\n  return (\n    <div className=\"flex-1"
);

fs.writeFileSync('src/app/clickme/listings/edit/[id]/page.tsx', code);
console.log('Fixed edit page');
