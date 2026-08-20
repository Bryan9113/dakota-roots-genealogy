const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function normalizeBase64(raw) {
  let clean = String(raw || '')
    .replace(/\s+/g, '')
    .replace(/[^A-Za-z0-9+/=]/g, '')
    .replace(/=+$/g, '');
  const mod = clean.length % 4;
  if (mod) clean += '='.repeat(4 - mod);
  return clean;
}

function longestOverlap(a, b) {
  const max = Math.min(a.length, b.length);
  for (let n = max; n > 0; n--) {
    if (a.slice(-n) === b.slice(0, n)) return n;
  }
  return 0;
}

function stitch(parts) {
  let out = String(parts[0] || '').trim();
  for (let i = 1; i < parts.length; i++) {
    const next = String(parts[i] || '').trim();
    const overlap = longestOverlap(out, next);
    out += next.slice(overlap);
  }
  return out;
}

function decodeGzipBase64(raw) {
  const clean = normalizeBase64(raw);
  const compressed = Buffer.from(clean, 'base64');
  return zlib.gunzipSync(compressed).toString('utf8');
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  try {
    const root = process.cwd();
    const singlePath = path.join(root, 'rootline-app', 'payload', 'master-tree.ged.gz.b64');
    const raw = fs.readFileSync(singlePath, 'utf8');
    try {
      const ged = decodeGzipBase64(raw);
      res.setHeader('X-Rootline-Tree-Source', 'master-tree-single');
      return res.status(200).send(ged);
    } catch (singleError) {
      const parts = [0,1,2].map(i => fs.readFileSync(path.join(root, 'rootline-app', 'payload', 'ged', String(i).padStart(2,'0') + '.txt'), 'utf8'));
      const joined = stitch(parts);
      const ged = decodeGzipBase64(joined);
      res.setHeader('X-Rootline-Tree-Source', 'master-tree-chunks');
      return res.status(200).send(ged);
    }
  } catch (error) {
    res.status(500).send('Rootline tree server decode failed: ' + (error && error.message ? error.message : String(error)));
  }
};