const fs = require('fs');

const filePath = 'C:\\Users\\vbnm9\\source\\service\\data\\columns.json';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Remove all git conflict markers
content = content.replace(/<<<<<<< HEAD\r?\n?/g, '');
content = content.replace(/=======\r?\n?/g, '');
content = content.replace(/>>>>>>> [a-f0-9]+\r?\n?/g, '');

// 2. Extract title and date based on JSON structure. It's safer to just split by "id" or title
// Let's find all objects using a more relaxed regex mapping
const regex = /\{\s*"id":\s*(\d+),\s*"title":\s*"(.*?)",\s*"content":\s*"(.*?)",\s*"date":\s*"(.*?)"\s*\}/gs;

let matches;
const uniqueCols = new Map();

while ((matches = regex.exec(content)) !== null) {
    const col = {
        title: matches[2],
        content: matches[3],
        date: matches[4]
    };
    if (!uniqueCols.has(col.title)) {
        uniqueCols.set(col.title, col);
    }
}

// Ensure IDs are unique and continuous
let counter = uniqueCols.size;
const finalCols = [];
for (let [title, col] of uniqueCols) {
    // Unescape the content replacing \n with actual newlines in string representation
    // Because regex matches string including literal \n, we preserve them
    col.id = counter--;
    finalCols.push(col);
}

finalCols.sort((a,b) => b.id - a.id);

fs.writeFileSync(filePath, JSON.stringify(finalCols, null, 2), 'utf-8');
console.log(`Successfully merged ${finalCols.length} columns.`);
