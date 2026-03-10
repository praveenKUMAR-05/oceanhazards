const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllJsxFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllJsxFiles(file));
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            results.push(file);
        }
    });
    return results;
}

const files = getAllJsxFiles(srcDir);
const regex = /t\(['"]([^'"]+)['"]\s*,\s*['"](.*?)['"]\)/g;

const extractedKeys = {};

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = regex.exec(content)) !== null) {
        extractedKeys[match[1]] = match[2];
    }
});

fs.writeFileSync(path.join(__dirname, 'extracted_keys.json'), JSON.stringify(extractedKeys, null, 2), 'utf8');
console.log('Extraction complete');
