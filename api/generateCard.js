// api/generateCard.js
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { headline = '', subtext = '', verdict = '' } = req.body || {};

  // adjust this path to your exact filename
  const fontPath = path.join(process.cwd(), 'api', 'fonts', 'OpenSans-VariableFont_wdth,wght.ttf');
  let fontData;
  try {
    fontData = fs.readFileSync(fontPath).toString('base64');
  } catch (err) {
    console.error('font load', err);
    return res.status(500).send('Font load failed');
  }

  const svg = `
  <svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
    <style>
      @font-face {
        font-family: 'OpenSans';
        src: url("data:font/ttf;base64,${fontData}") format("truetype");
        font-weight: normal;
        font-style: normal;
      }
      .bg          { fill: #fefae0; }
      .headline    { fill: #001f2b; font-size: 60px; font-weight: bold; font-family: 'OpenSans'; }
      .subtext     { fill: #333;   font-size: 32px;                 font-family: 'OpenSans'; }
      .verdict-bar { fill: #db0001; }
      .verdict     { fill: #fff;   font-size: 48px; font-weight: bold; font-family: 'OpenSans'; }
      .footer      { fill: #444;   font-size: 28px;                 font-family: 'OpenSans'; }
    </style>
    <rect class="bg" width="100%" height="100%" />
    <text class="headline"    x="60"  y="140">${headline.toUpperCase()}</text>
    <text class="subtext"     x="60"  y="260">${subtext}</text>
    <rect class="verdict-bar" x="0"   y="1110" width="1080" height="240" />
    <text class="verdict"     x="60"  y="1230">${verdict}</text>
    <text class="footer"      x="60"  y="1320">Analyzed by WITA.app | Who is the A-hole</text>
  </svg>`;

  let png;
  try {
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } });
    png = resvg.render().asPng();
  } catch (err) {
    console.error('render error', err);
    return res.status(500).send('Render failed');
  }

  res.setHeader('Content-Type','image/png');
  res.send(png);
}
