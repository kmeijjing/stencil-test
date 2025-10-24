const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib/components/components.ts');

try {
  if (!fs.existsSync(filePath)) {
    console.log('⚠️ React components.ts not found, skipping fix');
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the problematic import path with the correct one
  content = content.replace(
    /@stencil-test\/stencil\/dist\/components\/my-component\.js/g,
    "@stencil-test/stencil/dist/components/my-component.js"
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Fixed React component import path');
} catch (error) {
  console.error('❌ Error fixing React component path:', error.message);
}
