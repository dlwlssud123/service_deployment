const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const DATA_PATH = path.join(__dirname, '../data/columns.json');

async function generateColumn() {
  if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
  }

  // Read existing
  let currentColumns = [];
  try {
    currentColumns = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch (e) {
    console.log("No existing columns found, starting fresh.");
  }

  const existingTitles = currentColumns.map(c => c.title).join(', ');
  const sysPrompt = "너는 유명한 음식 칼럼니스트이자 영양학, 심리학 전문가야. 사용자가 흥미로워할 식문화, 영양, 심리와 얽힌 칼럼을 구글 블로그 SEO 양식에 맞게 600자 가량으로 전문성 있게 써줘. JSON 포맷으로 { title, content } 를 리턴해.";
  const userPrompt = `현대인의 식사 습관, 특정 식재료의 효능, 혹은 제철 음식에 대한 흥미로운 주제를 하나 선정해서 칼럼을 써줘. 
기존에 다룬 주제들(${existingTitles})과 겹치지 않는 완전히 새로운 주제여야 해.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    console.log("Connecting to Gemini API...");
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: sysPrompt + "\n\n" + userPrompt }] }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }
    const result = await response.json();
    let rawText = result.candidates[0].content.parts[0].text;

    // Clean up markdown if AI includes it
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(rawText);

    // Add new
    const newColumn = {
      id: currentColumns.length + 1,
      title: data.title,
      content: data.content,
      date: new Date().toISOString().split('T')[0]
    };

    currentColumns.unshift(newColumn);

    // Write back
    fs.writeFileSync(DATA_PATH, JSON.stringify(currentColumns, null, 2));
    console.log(`Successfully generated and saved: ${data.title}`);

  } catch (error) {
    console.error("Generation failed:", error);
    process.exit(1);
  }
}

generateColumn();
