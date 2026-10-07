// Screenshot all pages and compile into PDF
// Usage: npx playwright test --config=playwright.config.mjs screenshot-pages.mjs
// Or simply: node screenshot-pages.mjs

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3000';

// All static routes discovered from the app directory (skipping dynamic [id] routes)
const PAGES = [
  { route: '/', name: '01_Home' },
  // Accounting
  { route: '/accounting', name: '02_Accounting_Dashboard' },
  { route: '/accounting/overview', name: '03_Accounting_Overview' },
  { route: '/accounting/chart-of-accounts', name: '04_Accounting_Chart_of_Accounts' },
  { route: '/accounting/cost-centers', name: '05_Accounting_Cost_Centers' },
  { route: '/accounting/new', name: '06_Accounting_New' },
  // Agriculture
  { route: '/agriculture', name: '07_Agriculture_Dashboard' },
  { route: '/agriculture/cycle-planner', name: '08_Agriculture_Cycle_Planner' },
  { route: '/agriculture/reports', name: '09_Agriculture_Reports' },
  // Legal
  { route: '/legal', name: '10_Legal_Dashboard' },
  { route: '/legal/cases', name: '11_Legal_Cases' },
  { route: '/legal/clients', name: '12_Legal_Clients' },
  { route: '/legal/sessions', name: '13_Legal_Sessions' },
  { route: '/legal/new', name: '14_Legal_New' },
  // Real Estate
  { route: '/realestate', name: '15_RealEstate_Dashboard' },
  { route: '/realestate/overview', name: '16_RealEstate_Overview' },
  { route: '/realestate/contracts', name: '17_RealEstate_Contracts' },
  { route: '/realestate/projects', name: '18_RealEstate_Projects' },
  { route: '/realestate/new', name: '19_RealEstate_New' },
];

async function main() {
  const outputDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  const screenshotPaths = [];

  for (const { route, name } of PAGES) {
    const url = `${BASE_URL}${route}`;
    console.log(`📸 Capturing: ${name} -> ${url}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Give extra time for any animations / lazy content
      await page.waitForTimeout(1500);

      const screenshotPath = path.join(outputDir, `${name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
      });
      screenshotPaths.push({ name, path: screenshotPath });
      console.log(`   ✅ Saved: ${screenshotPath}`);
    } catch (err) {
      console.error(`   ❌ Failed to capture ${name}: ${err.message}`);
    }
  }

  // Generate PDF with all screenshots
  console.log('\n📄 Generating PDF...');

  const pdfPage = await context.newPage();

  // Build an HTML document with all screenshots embedded as base64 images
  const imagesHtml = screenshotPaths
    .map(({ name, path: imgPath }) => {
      const imgData = fs.readFileSync(imgPath);
      const base64 = imgData.toString('base64');
      const label = name.replace(/^\d+_/, '').replace(/_/g, ' ');
      return `
        <div class="page-section">
          <h2>${label}</h2>
          <img src="data:image/png;base64,${base64}" />
        </div>
      `;
    })
    .join('\n');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @page {
          size: A4 landscape;
          margin: 10mm;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #fff;
        }
        .cover {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          page-break-after: always;
          text-align: center;
        }
        .cover h1 {
          font-size: 48px;
          color: #1a1a2e;
          margin-bottom: 16px;
        }
        .cover p {
          font-size: 20px;
          color: #666;
        }
        .cover .date {
          margin-top: 32px;
          font-size: 16px;
          color: #999;
        }
        .page-section {
          page-break-before: always;
          padding: 10px;
        }
        .page-section h2 {
          font-size: 22px;
          color: #1a1a2e;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e0e0e0;
        }
        .page-section img {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      </style>
    </head>
    <body>
      <div class="cover">
        <h1>MKANY ERP</h1>
        <p>Application Pages Screenshot Report</p>
        <p class="date">Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p class="date">${screenshotPaths.length} pages captured</p>
      </div>
      ${imagesHtml}
    </body>
    </html>
  `;

  await pdfPage.setContent(html, { waitUntil: 'networkidle' });

  const pdfPath = path.join(__dirname, 'MKANY_ERP_Screenshots.pdf');
  await pdfPage.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
  });

  console.log(`\n✅ PDF saved to: ${pdfPath}`);
  console.log(`📊 Total pages captured: ${screenshotPaths.length}`);

  await browser.close();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
