const fs = require('fs');
const PDFParser = require("pdf2json");

function extractText(filename, outputName) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(null, 1);

        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            const text = pdfParser.getRawTextContent();
            fs.writeFileSync(outputName, text, 'utf-8');
            console.log(`Extracted text to ${outputName}`);
            resolve(text);
        });

        pdfParser.loadPDF(filename);
    });
}

async function main() {
    try {
        await extractText("CV-park.pdf", "cv_park_text.txt");
        await extractText("CV-choi.pdf", "cv_choi_text.txt");
    } catch (error) {
        console.error("Extraction failed:", error);
    }
}

main();
