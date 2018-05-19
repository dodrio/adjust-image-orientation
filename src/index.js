// polyfill HTMLCanvasElement.toBlob
import 'blueimp-canvas-to-blob';

import EXIF from 'exif-js';

export default function adjustImageOrientation(file, mimeType = 'image/png') {
  return new Promise(function(resolve, reject) {
    EXIF.getData(file, function() {
      const orientation = EXIF.getTag(this, 'Orientation');

      const url = URL.createObjectURL(file);
      const img = new Image();

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      function rotate() {
        const width = img.width;
        const height = img.height;

        if (orientation <= 4) {
          canvas.width = width;
          canvas.height = height;
        } else {
          canvas.width = height;
          canvas.height = width;
        }

        // http://sylvana.net/jpegcrop/exif_orientation.html
        // https://stackoverflow.com/a/40867559
        switch (orientation) {
          case 2:
            ctx.transform(-1, 0, 0, 1, width, 0);
            break;
          case 3:
            ctx.transform(-1, 0, 0, -1, width, height);
            break;
          case 4:
            ctx.transform(1, 0, 0, -1, 0, height);
            break;
          case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
          case 6:
            ctx.transform(0, 1, -1, 0, height, 0);
            break;
          case 7:
            ctx.transform(0, -1, -1, 0, height, width);
            break;
          case 8:
            ctx.transform(0, -1, 1, 0, 0, width);
            break;
          default:
            // ctx.transform(1, 0, 0, 1, 0, 0);
            break;
        }

        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function(blob) {
          resolve(blob);
        }, mimeType);
      }

      img.addEventListener('load', rotate);
      img.addEventListener('error', reject);
      img.src = url;
    });
  });
}
