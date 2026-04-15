const fs = require('fs');
const pdf = require('pdf-parse');

async function extractText(filename) {
    const dataBuffer = fs.readFileSync(filename);
    try {
        let parser = typeof pdf === 'function' ? pdf : (typeof pdf.default === 'function' ? pdf.default : null);
        if (!parser && pdf.PDFParse) parser = pdf.PDFParse;
        
        const data = await parser(dataBuffer);
        return data.text;
    } catch (error) {
        console.error(`Error parsing ${filename}:`, error);
        return null;
    }
}

async function main() {
    const parkText = await extractText('CV-park.pdf');
    const choiText = await extractText('CV-choi.pdf');

    if (parkText) fs.writeFileSync('cv_park_text.txt', parkText);
    if (choiText) fs.writeFileSync('cv_choi_text.txt', choiText);

    console.log('Extracted text to cv_park_text.txt and cv_choi_text.txt');
}

main();
