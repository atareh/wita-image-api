import { Canvas } from 'skia-canvas';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { headline, subtext, verdict } = req.body;

  const canvas = new Canvas(1080, 1350);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fefae0';
  ctx.fillRect(0, 0, 1080, 1350);

  ctx.fillStyle = '#001f2b';
  ctx.font = 'bold 60px sans-serif';
  ctx.fillText(headline?.toUpperCase() || '', 60, 140);

  ctx.fillStyle = '#333';
  ctx.font = '32px sans-serif';
  ctx.fillText(subtext || '', 60, 260);

  ctx.fillStyle = '#db0001';
  ctx.fillRect(0, 1110, 1080, 240);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 48px sans-serif';
  ctx.fillText(verdict || '', 60, 1230);

  ctx.font = '28px sans-serif';
  ctx.fillStyle = '#444';
  ctx.fillText('Analyzed by WITA.app | Who is the A-hole', 60, 1320);

  const buffer = await canvas.png;
  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
}
