const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('Statistical AI for Forensic Explainability in Handwriting (SAFE-H).pdf');

let parser = typeof pdf === 'function' ? pdf : (typeof pdf.default === 'function' ? pdf.default : null);
if (!parser && pdf.PDFParse) {
    console.log("Using pdf.PDFParse object/function. Type:", typeof pdf.PDFParse);
    // if it's a class we might need to instantiate it, but let's try calling it
    try {
      parser = pdf.PDFParse;
    } catch(e) {}
}

if(parser) {
  try {
     let result = parser(dataBuffer);
     if (result && result.then) {
         result.then(data => {
            fs.writeFileSync('pdf_content.txt', data.text);
            console.log('Successfully extracted PDF text.');
         }).catch(console.error);
     } else if (result && result.text) {
         fs.writeFileSync('pdf_content.txt', result.text);
         console.log('Successfully extracted PDF text.');
     }
  } catch (e) { console.error('Error invoking parser:', e); }
} else {
  console.log("No parser found in module exports:", Object.keys(pdf));
}
