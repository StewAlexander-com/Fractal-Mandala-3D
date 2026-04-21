// Smoke test: launches the site, enters the mandala, verifies critical invariants.
// Fails loudly on visual/functional regression. Run locally with:
//   node tests/smoke.mjs
// Or in CI via .github/workflows/smoke.yml

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const TARGET_URL = process.env.SMOKE_URL || 'http://127.0.0.1:5000/';
const OUT = new URL('./output/', import.meta.url).pathname;

await mkdir(OUT, { recursive: true });

const failures = [];
function check(cond, msg) {
  if (!cond) failures.push(msg);
  else console.log('  ✓', msg);
}

const browser = await chromium.launch({ headless: true });

// Desktop pass
{
  console.log('Desktop (1440x900)');
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pg = await ctx.newPage();
  const jsErrors = [];
  pg.on('pageerror', e => jsErrors.push(e.message));

  await pg.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await pg.waitForTimeout(1500);

  const title = await pg.title();
  check(title.toLowerCase().includes('mandala'), `title contains "mandala" — got: "${title}"`);

  const enterBtn = await pg.$('text=enter the mandala');
  check(enterBtn !== null, 'enter button present');

  await pg.screenshot({ path: join(OUT, 'desktop-welcome.jpg'), quality: 80, type: 'jpeg' });

  if (enterBtn) {
    await enterBtn.click();
    await pg.waitForTimeout(5500);
    await pg.screenshot({ path: join(OUT, 'desktop-layer1.jpg'), quality: 80, type: 'jpeg' });

    // Canvas should exist and be visible
    const canvasExists = await pg.evaluate(() => {
      const c = document.querySelector('canvas');
      return c && c.width > 0 && c.height > 0;
    });
    check(canvasExists, 'WebGL canvas rendered');

    // Teaching panel should eventually reveal content
    const hasContent = await pg.evaluate(() => {
      const panel = document.getElementById('teachingInner');
      return panel && panel.textContent.trim().length > 50;
    });
    check(hasContent, 'teaching panel has content');

    // Nav slider should show current layer
    const layerCtx = await pg.evaluate(() => {
      const el = document.querySelector('.layer-context');
      return el ? el.textContent.trim() : null;
    });
    check(layerCtx && layerCtx.length > 0, `nav shows layer label — got: "${layerCtx}"`);
  }

  check(jsErrors.length === 0, `no JS errors (found ${jsErrors.length}): ${jsErrors.join('; ')}`);
  await ctx.close();
}

// Mobile pass
{
  console.log('\nMobile (393x852 iPhone 14 Pro)');
  const ctx = await browser.newContext({ viewport: { width: 393, height: 852 } });
  const pg = await ctx.newPage();
  const jsErrors = [];
  pg.on('pageerror', e => jsErrors.push(e.message));

  await pg.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await pg.waitForTimeout(1500);

  await pg.screenshot({ path: join(OUT, 'mobile-welcome.jpg'), quality: 80, type: 'jpeg' });

  const enterBtn = await pg.$('text=enter the mandala');
  if (enterBtn) await enterBtn.click();
  await pg.waitForTimeout(5500);
  await pg.screenshot({ path: join(OUT, 'mobile-scene.jpg'), quality: 80, type: 'jpeg' });

  // Viewport overflow check — no element should extend past viewport
  const overflow = await pg.evaluate(() => {
    const vw = window.innerWidth;
    const ids = ['teachingWrap', 'navControls', 'teachingPanelToggle'];
    const issues = [];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.right > vw + 4) issues.push(`${id} overflows right by ${Math.round(r.right - vw)}px`);
      if (r.left < -4) issues.push(`${id} overflows left by ${Math.round(-r.left)}px`);
    }
    return issues;
  });
  check(overflow.length === 0, `no mobile layout overflow${overflow.length ? ': ' + overflow.join('; ') : ''}`);

  check(jsErrors.length === 0, `no mobile JS errors (found ${jsErrors.length})`);
  await ctx.close();
}

await browser.close();

console.log('\n---');
if (failures.length > 0) {
  console.error(`❌ ${failures.length} FAILURE(S):`);
  for (const f of failures) console.error('  ✗', f);
  process.exit(1);
}
console.log('✓ All smoke checks passed');
