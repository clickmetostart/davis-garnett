const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('src/app', (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content
      .replace(/\s*<span className="w-px h-5 bg-white\/20 block"><\/span>\s*<span className="label-caps text-\[0\.6rem\] text-white\/50 mt-0\.5">Powered by ClickMe<\/span>/g, '')
      .replace(/\s*<span className="label-caps text-\[0\.6rem\] tracking-\[0\.2em\] text-\[#555\]">Powered by ClickMe<\/span>/g, '')
      .replace(/\s*<p className="text-white\/20 text-\[0\.6rem\] uppercase tracking-widest">Powered by ClickMe<\/p>/g, '');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Updated ' + filePath);
    }
  }
});
