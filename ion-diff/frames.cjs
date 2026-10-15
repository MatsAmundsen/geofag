// Bilde-for-bilde-opptak via tidslinjeskyveren (deterministisk, med pause ved slutten av hvert steg).
const { chromium } = require('/workspace/pr144/node_modules/playwright');
const fs = require('fs');
const JOBBER = [
  ['Magmatisk differensiering', 5, 'differensiering', null],
  ['Ioner byttes i fast berg', 5, 'ionbytte', null],
  ['Ioner byttes i fast berg', 5, 'ionbytte-uten-vaeske', 'Uten væske'],
];
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/box/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell' });
  for (const [HEAD, N, navn, bryter] of JOBBER) {
    const dir = `/tmp/id/frames-${navn}`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 1100 }, reducedMotion: 'reduce' });
    await page.goto(process.argv[2] + '/geofag-1/bergarter', { waitUntil: 'networkidle', timeout: 120000 });
    await page.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const p = getComputedStyle(el).position; if (p === 'sticky' || p === 'fixed') el.style.visibility = 'hidden'; } });
    const fig = page.locator('figure', { hasText: HEAD }).first();
    await fig.scrollIntoViewIfNeeded();
    if (bryter) { await fig.locator('[role=group][aria-label^="Væske"] button', { hasText: bryter }).click(); await page.waitForTimeout(300); }
    const input = fig.locator('input[type=range]');
    const ps = [];
    for (let k = 0; k < N; k++) { for (let j = 0; j < 24; j++) ps.push(k + j / 24); for (let h = 0; h < 10; h++) ps.push(k + 1); }
    let i = 0;
    for (const p of ps) {
      await input.evaluate((el, v) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(el, String(v)); el.dispatchEvent(new Event('input', { bubbles: true })); }, p);
      await page.waitForTimeout(40);
      await fig.screenshot({ path: `${dir}/f${String(i++).padStart(4, '0')}.png` });
    }
    console.log(navn, i, 'bilder');
    await page.close();
  }
  await browser.close();
})();
