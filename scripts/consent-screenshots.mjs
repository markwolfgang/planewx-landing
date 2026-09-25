import { chromium } from 'playwright';
import fs from 'fs';

const outDir = '/opt/cursor/artifacts/screenshots';
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
});

async function shot({ width, height, name, colorScheme = 'dark', clearStorage = true }) {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme,
    // Force strict region via cookie set by middleware; also set directly
  });
  // Pre-set consent region cookie so banner is in strict mode
  await context.addCookies([
    {
      name: 'pw_consent_region',
      value: 'strict',
      domain: '127.0.0.1',
      path: '/',
    },
  ]);
  const page = await context.newPage();
  if (clearStorage) {
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
  } else {
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  }
  // Wait for banner
  await page.waitForSelector('[data-testid="cookie-consent-banner"]', { timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/${name}`, fullPage: false });
  await context.close();
  console.log('saved', name);
}

await shot({ width: 1280, height: 800, name: 'cookie-banner-strict-dark-1280.png' });
await shot({ width: 390, height: 844, name: 'cookie-banner-strict-dark-390.png' });

// Footer Cookie settings: accept first then reopen via footer
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: 'dark',
  });
  await context.addCookies([
    { name: 'pw_consent_region', value: 'strict', domain: '127.0.0.1', path: '/' },
  ]);
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="cookie-consent-banner"]');
  await page.getByRole('button', { name: 'Essential only' }).click();
  await page.waitForSelector('[data-testid="cookie-consent-banner"]', { state: 'detached' });
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  const footerLink = page.getByTestId('cookie-settings-link').first();
  await footerLink.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${outDir}/cookie-settings-footer-link-1280.png`, fullPage: false });
  await footerLink.click();
  await page.waitForSelector('[data-testid="cookie-consent-banner"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outDir}/cookie-settings-reopened-1280.png`, fullPage: false });
  await context.close();
  console.log('saved footer shots');
}

// Network check: strict mode, no analytics before consent
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    colorScheme: 'dark',
  });
  await context.addCookies([
    { name: 'pw_consent_region', value: 'strict', domain: '127.0.0.1', path: '/' },
  ]);
  const page = await context.newPage();
  const blockedHits = [];
  page.on('request', (req) => {
    const u = req.url();
    if (
      /googletagmanager|google-analytics|googleads|doubleclick|facebook\.net|fbevents|redditstatic|reddit\.com\/\.+\.pixel|_vercel\/insights|va\.vercel-scripts/i.test(
        u,
      )
    ) {
      blockedHits.push(u);
    }
  });
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="cookie-consent-banner"]');
  await page.waitForTimeout(1500);
  console.log('STRICT_PRE_CONSENT_TRACKING_REQUESTS', blockedHits.length);
  for (const u of blockedHits.slice(0, 20)) console.log(' HIT', u);
  await context.close();
}

await browser.close();
