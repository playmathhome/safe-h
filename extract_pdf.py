import sys
import os
try:
    from PyPDF2 import PdfReader
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    from PyPDF2 import PdfReader

filename = "Statistical AI for Forensic Explainability in Handwriting (SAFE-H).pdf"
reader = PdfReader(filename)
text = ""
for i, page in enumerate(reader.pages):
    text += f"\n--- Page {i+1} ---\n"
    text += page.extract_text()

with open("pdf_content.txt", "w", encoding="utf-8") as f:
    f.write(text)

print(f"Extracted {len(reader.pages)} pages to pdf_content.txt")
