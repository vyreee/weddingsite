const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicon() {
  const inputPath = path.join(__dirname, 'public', 'imgs', 'for white bg not expanded logo.png');
  const outputPath = path.join(__dirname, 'src', 'app', 'favicon.ico');
  
  try {
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(outputPath);
    
    console.log('Favicon created successfully!');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
