const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib/components.ts');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace undefined with defineCustomElements in the defineContainer call
  content = content.replace(
    /defineContainer<[^>]+>\('my-component', undefined,/g,
    "defineContainer<JSX.MyComponent>('my-component', defineCustomElements,"
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Fixed undefined in Vue components.ts');
} catch (error) {
  console.error('❌ Error fixing Vue components.ts:', error.message);
}
