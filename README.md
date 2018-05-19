# adjust-image-orientation

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Dependency Status](https://img.shields.io/david/m31271n/adjust-image-orientation.svg)](#)
[![DevDependency Status](https://img.shields.io/david/m31271n/adjust-image-orientation.svg)](#)
[![Travis Build Status](https://img.shields.io/travis/m31271n/adjust-image-orientation.svg)](#)
[![NPM Downloads](https://img.shields.io/npm/dm/adjust-image-orientation.svg)](#)

> Adjust image's orientation according EXIF information.

## Install

```
$ npm install adjust-image-orientation
```

## Usage

```html
<input
  id="image-selector"
  type="file"
  accept="image/*" />
```

```javascript
import 'adjustImageOrientation' from 'adjust-image-orientation';

const handleImage = event => {
  const image = event.target.files[0];

  if (image) {
    adjustImageOrientation(image)
      .then(blob => {
        // operate on blob
      })
      .catch(error => {
        console.error(error);
      });
  }
};

const imageSelector = document.getElementById('image-selector');
imageSelector.addEventListener('change', handleImage);
```

## Inspiration

* https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images/40867559#40867559
* [iphone_photo_rotation_adjust](https://github.com/gonnavis/iphone_photo_rotation_adjust)
* [JavaScript-Load-Image](https://github.com/blueimp/JavaScript-Load-Image/blob/master/js/load-image-orientation.js)
