const { Jimp } = require('jimp');

Jimp.read('logo.png')
  .then(image => {
    

    
    // Make white background transparent
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      var r = this.bitmap.data[idx + 0];
      var g = this.bitmap.data[idx + 1];
      var b = this.bitmap.data[idx + 2];
      
      var gray = (r + g + b) / 3;
      if (gray > 240) {
        this.bitmap.data[idx + 3] = 0; // transparent
      } else if (gray > 180) {
        // smooth anti-aliased edge
        var alpha = Math.floor(255 * (240 - gray) / 60);
        this.bitmap.data[idx + 3] = alpha;
      }
    });

    image.write('website/images/logo_transparent.png');
    console.log("Logo transparency applied and saved.");
  })
  .catch(err => {
    console.error(err);
  });
