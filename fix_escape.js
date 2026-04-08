const fs = require('fs');

const path = 'C:\\Users\\vbnm9\\source\\service\\data\\columns.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.forEach(col => {
    if (col.content) {
        // Replace literal string '\n' (which is written as "\\n" in JSON text) with actual newline character '\n'
        col.content = col.content.replace(/\\n/g, '\n');
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Fixed escape characters in columns.json');
