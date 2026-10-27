import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = path.resolve('docs/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getCulpritIndexForCase(title) {
  if (title.includes('Train') || title.includes('Blackwood')) return 0; // Thomas Rigby (s1)
  if (title.includes('Curtain')) return 2; // Vincent Sterling (s3)
  if (title.includes('Toast') || title.includes('Dunmore')) return 3; // Harold Fitch (s4)
  if (title.includes('Broadcast')) return 1;
  return 0;
}

async function capture() {
  console.log('Launching Edge browser...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  console.log('1. Capturing 01_start_screen.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_start_screen.png') });

  // Start "The Last Train to Blackwood"
  console.log('2. Clicking "Play Selected Seed Now"...');
  await page.waitForSelector('.btn-start-secondary');
  await page.click('.btn-start-secondary');
  await new Promise(r => setTimeout(r, 1500));

  console.log('Capturing 02_case_dossier.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02_case_dossier.png') });

  const activeTitle = await page.evaluate(() => {
    return document.querySelector('.modal-case-title')?.innerText || '';
  });
  console.log('Active Case Title:', activeTitle);
  const culpritIdx = getCulpritIndexForCase(activeTitle);
  const innocentIdx = (culpritIdx + 1) % 4;

  // Close dossier to enter main game stage
  console.log('3. Closing dossier to enter crime stage...');
  await page.waitForSelector('.btn-modal-primary');
  await page.click('.btn-modal-primary');
  await new Promise(r => setTimeout(r, 1500));

  console.log('Capturing 03_game_stage_lineup.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_game_stage_lineup.png') });

  // Suspect 1 inquiry
  console.log('4. Interrogating Suspect 1...');
  await page.waitForSelector('.prompt-chip-btn');
  const chips1 = await page.$$('.prompt-chip-btn');
  if (chips1.length > 0) {
    await chips1[0].click();
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('Capturing 04_interrogation_active.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_interrogation_active.png') });

  // Interrogate remaining suspects to populate evidence board
  const rosterCards = await page.$$('.roster-suspect-card');
  for (let i = 1; i < rosterCards.length; i++) {
    console.log(`Interrogating Suspect ${i + 1}...`);
    await rosterCards[i].click();
    await new Promise(r => setTimeout(r, 1000));
    const chips = await page.$$('.prompt-chip-btn');
    if (chips.length > i) {
      await chips[i].click();
      await new Promise(r => setTimeout(r, 2800));
    }
  }

  console.log('5. Capturing 05_evidence_docket.png (populated evidence board)...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_evidence_docket.png') });

  // Open Accusation Modal
  console.log('6. Opening Accusation Modal...');
  await page.waitForSelector('.btn-accuse-trigger');
  await page.click('.btn-accuse-trigger');
  await new Promise(r => setTimeout(r, 1200));

  console.log('Capturing 06_accusation_modal.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06_accusation_modal.png') });

  // 7. Accuse the TRUE CULPRIT for Victory State
  console.log(`7. Selecting True Culprit (Card #${culpritIdx + 1}) for Case Solved Epilogue...`);
  const cards = await page.$$('.accuse-choice-card');
  if (cards.length > culpritIdx) {
    await cards[culpritIdx].click();
    await new Promise(r => setTimeout(r, 600));
  }

  await page.waitForSelector('.btn-modal-accuse');
  await page.click('.btn-modal-accuse');
  await new Promise(r => setTimeout(r, 2500));

  console.log('Capturing 07_epilogue_case_solved.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07_epilogue_case_solved.png') });

  // 8. Test Wrongful Conviction Outcome
  console.log('8. Returning to menu for wrongful conviction outcome...');
  const restartBtn = await page.$('.btn-modal-restart');
  if (restartBtn) {
    await restartBtn.click();
    await new Promise(r => setTimeout(r, 1200));

    // Start seed again
    await page.waitForSelector('.btn-start-secondary');
    await page.click('.btn-start-secondary');
    await new Promise(r => setTimeout(r, 1200));

    const title2 = await page.evaluate(() => document.querySelector('.modal-case-title')?.innerText || '');
    const cIdx2 = getCulpritIndexForCase(title2);
    const innoIdx2 = (cIdx2 + 1) % 4;

    // Close dossier
    await page.waitForSelector('.btn-modal-primary');
    await page.click('.btn-modal-primary');
    await new Promise(r => setTimeout(r, 1200));

    // Directly open accusation
    await page.waitForSelector('.btn-accuse-trigger');
    await page.click('.btn-accuse-trigger');
    await new Promise(r => setTimeout(r, 1200));

    // Select Innocent Suspect
    const choiceCards2 = await page.$$('.accuse-choice-card');
    if (choiceCards2.length > innoIdx2) {
      await choiceCards2[innoIdx2].click();
      await new Promise(r => setTimeout(r, 600));
    }

    await page.waitForSelector('.btn-modal-accuse');
    await page.click('.btn-modal-accuse');
    await new Promise(r => setTimeout(r, 2500));

    console.log('Capturing 08_epilogue_wrongful_conviction.png...');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '08_epilogue_wrongful_conviction.png') });
  }

  console.log('All screenshots captured with 100% precision in:', OUTPUT_DIR);
  await browser.close();
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
