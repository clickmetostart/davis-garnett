const fs = require('fs');
const files = [
  'src/app/davis/page.tsx',
  'src/app/garnett/page.tsx',
  'src/app/scope/page.tsx',
  'src/app/features/page.tsx',
  'src/app/clickme/page.tsx'
];
files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the badly injected openGraph
  // It looks like:
  // description: "Start of string,
  //   openGraph: {
  //     images: ["/image.png"],
  //   }, end of string.",
  // We want to just find the openGraph block and the newline before it, and replace it with a space or nothing
  // Let's use a simpler replace strategy:
  content = content.replace(/\r?\n  openGraph: \{\r?\n    images: \["[^"]+"\](?:,\r?\n|\r?\n)  \}, /g, ' ');
  
  // Now we need to append it correctly at the end of the description line
  const image = file.includes('davis') ? '/mark-davis-headshot.png' :
                file.includes('garnett') ? '/rachael-garnett-headshot.png' :
                '/davis-garnett-real-combo.png';
                
  content = content.replace(/(description: "[^"]+",)/, `$1\n  openGraph: {\n    images: ["${image}"],\n  },`);
  
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
});
