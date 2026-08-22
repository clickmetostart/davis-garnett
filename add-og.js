const fs = require('fs');
const files = [
  'src/app/layout.tsx',
  'src/app/davis/page.tsx',
  'src/app/garnett/page.tsx',
  'src/app/scope/page.tsx',
  'src/app/features/page.tsx',
  'src/app/clickme/page.tsx',
  'src/app/agreement/layout.tsx',
  'src/app/coming-soon/layout.tsx'
];
files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('openGraph: {')) return;
  
  const image = file.includes('davis') ? '/mark-davis-headshot.png' :
                file.includes('garnett') ? '/rachael-garnett-headshot.png' :
                '/davis-garnett-real-combo.png';
                
  content = content.replace(/(description: [^,]+,)/, `$1\n  openGraph: {\n    images: ["${image}"],\n  },`);
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
