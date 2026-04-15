import sys
import os
try:
    from PyPDF2 import PdfReader
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    from PyPDF2 import PdfReader

def extract_text(filename, output_name):
    print(f"Extracting {filename}...")
    reader = PdfReader(filename)
    text = ""
    for i, page in enumerate(reader.pages):
        text += f"\n--- Page {i+1} ---\n"
        text += page.extract_text()
    
    with open(output_name, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Extracted {len(reader.pages)} pages to {output_name}")

extract_text("CV-park.pdf", "cv_park_text.txt")
extract_text("CV-choi.pdf", "cv_choi_text.txt")
