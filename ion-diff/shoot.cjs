// node shoot.cjs <base> <label> <widths> <modes>
const { chromium } = require('/workspace/pr144/node_modules/playwright');
const [base, label, widthsArg, modes] = process.argv.slice(2);
const out = `/workspace/bergarter-ion-diff-bilder/${label}`;
require('fs').mkdirSync(out, { recursive: true });
const widths = (widthsArg || '390,1280').split(',').map(Number);
const rmModes = (modes || 'reduce').split(',');
const FIG = [['Magmatisk differensiering', 'diff'], ['Ioner byttes i fast berg', 'ion']];
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/box/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell' });
  const report = [];
  for (const rm of rmModes) for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 1000 }, deviceScaleFactor: 2, reducedMotion: rm === 'reduce' ? 'reduce' : 'no-preference' });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + String(e).slice(0, 200)));
    await page.goto(base + '/geofag-1/bergarter', { waitUntil: 'networkidle', timeout: 120000 });
    for (let y = 0; y < 40; y++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(120); }
    await page.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const p = getComputedStyle(el).position; if (p === 'sticky' || p === 'fixed') el.style.visibility = 'hidden'; } });
    const tag = `${w}-${rm === 'reduce' ? 'redusert' : 'bevegelse'}`;
    for (const [head, kort] of FIG) {
      const fig = page.locator('figure', { hasText: head }).first();
      await fig.waitFor({ timeout: 60000 });
      await fig.scrollIntoViewIfNeeded(); await page.waitForTimeout(800);
      const toggleLabel = await fig.locator('button[aria-label*="animasjon"]').first().getAttribute('aria-label');
      await fig.screenshot({ path: `${out}/${tag}-${kort}-start.png` });
      const steps = fig.locator('[role=group]').first().locator('button');
      const n = await steps.count();
      let min = 99; const small = [];
      for (let k = 0; k < n; k++) {
        await steps.nth(k).click(); await page.waitForTimeout(rm === 'reduce' ? 700 : 900);
        await fig.screenshot({ path: `${out}/${tag}-${kort}-steg${k + 1}.png` });
        const f = await fig.evaluate((el) => { let m = 99; const l = []; for (const t of el.querySelectorAll('svg text')) { const r = t.getBoundingClientRect(); if (r.width < 1) continue; const fs = parseFloat(getComputedStyle(t).fontSize); const c = t.getScreenCTM(); const px = fs * (c ? c.a : 1); if (px < m) m = px; if (px < 12) l.push([t.textContent.slice(0, 30), px.toFixed(1)]); } return { m, l }; });
        min = Math.min(min, f.m); small.push(...f.l);
      }
      const groups = fig.locator('[role=group]');
      if (await groups.count() > 1 && label !== 'for') {
        await groups.nth(1).locator('button').nth(1).click(); await page.waitForTimeout(600);
        await fig.screenshot({ path: `${out}/${tag}-${kort}-steg${n}-uten.png` });
        await groups.nth(1).locator('button').nth(0).click();
      }
      report.push({ tag, fig: kort, toggleLabel, minFont: +min.toFixed(1), small: small.slice(0, 4) });
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    report.push({ tag, errors, overflow });
    await page.close();
  }
  require('fs').writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 1));
  console.log(JSON.stringify(report));
  await browser.close();
})();
