import sys
import os
import subprocess

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Installing PyMuPDF...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyMuPDF"])
    import fitz

pdf_path = "Statistical AI for Forensic Explainability in Handwriting (SAFE-H)_part1.pdf"
output_dir = "website/images/plan"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(pdf_path)
image_count = 0

for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    
    for image_index, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        image_count += 1
        image_filename = f"plan_image_{image_count}.{image_ext}"
        image_filepath = os.path.join(output_dir, image_filename)
        
        with open(image_filepath, "wb") as f:
            f.write(image_bytes)
            
        print(f"Extracted: {image_filepath}")

print(f"Extraction complete. Total {image_count} images extracted.")
