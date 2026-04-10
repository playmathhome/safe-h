import sys, subprocess, os

try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow'])
    from PIL import Image

def process():
    print('Processing logo.png...')
    img = Image.open('logo.png').convert('RGBA')
    if img.width > 1200:
        ratio = 1200 / img.width
        img = img.resize((1200, int(img.height * ratio)), Image.LANCZOS)
    pixels = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = pixels[x, y]
            gray = (r + g + b) / 3
            if gray > 240:
                pixels[x, y] = (255, 255, 255, 0)
            elif gray > 200:
                alpha = int(255 * (240 - gray) / 40)
                pixels[x, y] = (r, g, b, alpha)
    out_path = os.path.join('website', 'images', 'logo_transparent.png')
    img.save(out_path, 'PNG')
    print('Finished writing transparent logo!')

process()
