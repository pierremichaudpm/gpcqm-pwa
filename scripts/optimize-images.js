// Simple image optimizer for heavy assets (safe: generates new files only)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projectRoot = path.join(__dirname, '..');
const imagesDir = path.join(projectRoot, 'images');

// Candidates (prioritized by size/usage)
const targets = [
  '225318gpcmtlparcours.png',
  '225318gpcmtlparcours_en.png',
  'meilleurs_endroits_mtl_fr.png',
  'meilleurs_endroits_mtl_en.png',
  'GPC-11938-CarteGPC-2025_MTL-FR_VF_13août.png',
  'GPC-11938-CarteGPC-2025_MTL-EN_VF_13août.png',
  'fond_liste.jpg',
  'matthews.jpg',
  'encan_FR.png',
  'encan_EN.png',
  'concoursedika__1500x500 - fr.png',
  // Concours (Edika 300x250, EN/FR)
  'concoursedika__300x250-fr.png',
  'concoursedika__300x250-en.png',
  // Concours (EKOI EN/FR)
  'concours_ekoi_fr.jpg',
  'concours_ekoi_en.jpg',
];

async function toWebp(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const img = sharp(inputPath);
  // Don't resize; only convert/compress. Use near-lossless for PNG-like assets.
  const isPngLike = ext === '.png';
  const quality = isPngLike ? 90 : 82; // balanced defaults
  await img.webp({ quality }).toFile(outputPath);
}

async function run() {
  for (const rel of targets) {
    const src = path.join(imagesDir, rel);
    if (!fs.existsSync(src)) {
      console.warn('Skip (missing):', rel);
      continue;
    }
    const out = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    try {
      await toWebp(src, out);
      const orig = fs.statSync(src).size;
      const webp = fs.statSync(out).size;
      const saved = (((orig - webp) / orig) * 100).toFixed(1);
      console.log(`OK  ${rel} → ${path.basename(out)}  (${(orig/1024).toFixed(0)}KB → ${(webp/1024).toFixed(0)}KB, -${saved}%)`);
    } catch (e) {
      console.error('Fail', rel, e.message);
    }
  }
}

run();


