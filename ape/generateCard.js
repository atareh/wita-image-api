import { Resvg } from '@resvg/resvg-js';

export default async function handler(req, res) {
  const { headline = '', subtext = '', verdict = '' } = req.body || {};

  const svg = `
  <svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
    <style>
      .bg { fill: #fefae0; }
      .headline { fill: #001f2b; font-size: 60px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
      .subtext { fill: #333; font-size: 32px; font-family: Arial, Helvetica, sans-serif; }
      .verdict-bar { fill: #db0001; }
      .verdict { fill: #fff; font-size: 48px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
      .footer { fill: #444; font-size: 28px; font-family: Arial, Helvetica, sans-serif; }
    </style>
    <rect class="bg" width="100%" height="100%" />
    <text class="headline" x="60" y="140">${headline.toUpperCase()}</text>
    <text class="subtext" x="60" y="260">${subtext}</text>
    <rect class="verdict-bar" x="0" y="1110" width="1080" height="240" />
    <text class="verdict" x="60" y="1230">${verdict}</text>
    <text class="footer" x="60" y="1320">Analyzed by WITA.app | Who is the A-hole</text>
  </svg>
  `;

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } });
  const png = resvg.render().asPng();

  res.setHeader('Content-Type', 'image/png');
  res.send(png);
}
