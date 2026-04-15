const fs = require('fs');

const filesToUpdate = ['research.html', 'plan.html', 'collaboration.html', 'team.html'];
let generateScript = fs.readFileSync('generate_pages.js', 'utf8');

for (const file of filesToUpdate) {
    const html = fs.readFileSync(`website/${file}`, 'utf8');
    
    // Extract everything from <section to <footer
    let match = html.match(/(<section[\s\S]*?)<footer/i);
    if (!match) continue;
    
    let content = match[1].trim();
    // Escape backticks and standard escape characters
    content = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    
    // In generate_pages.js, replace the content property for this file
    const regex = new RegExp(`('${file}':\\s*\\{[\\s\\S]*?content:\\s*\`)([\\s\\S]*?)(\`\\s*\\n\\s*\\}(,|\\n\\s*\\};))`, 'g');
    
    generateScript = generateScript.replace(regex, `$1${content}$3`);
}

fs.writeFileSync('generate_pages.js', generateScript, 'utf8');
console.log('Fixed generate_pages.js');
