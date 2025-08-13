import { test as base, expect as baseExpect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export const test = base.extend({
  context: async ({ browser }, use, testInfo) => {
    const isHeadless = testInfo.project.use.headless;
    console.log(`Running in ${isHeadless ? 'Headless' : 'Headed'} mode`);

    const videoDir = path.join(testInfo.outputDir, 'videos');
    fs.mkdirSync(videoDir, { recursive: true });

    const context = await browser.newContext({
      recordVideo: {
        dir: videoDir,
        size: { width: 1920, height: 1080 },
      },
      //deviceScaleFactor: 0.9,
     
      
    });

    const page = await context.newPage();

    // Viewport log (optional)
    const screenSize = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
    console.log(`Viewport size: ${screenSize.width}x${screenSize.height}`);

    await use(context);

    const video = page.video();
    await page.close();
    await context.close();

    if (video) {
      try {
        const videoPath = await video.path();
        if (fs.existsSync(videoPath)) {
          await testInfo.attach('Full Test Video', {
            path: videoPath,
            contentType: 'video/webm',
          });
        }
      } catch (err) {
        console.warn('⚠️ Video attachment failed:', err);
      }
    }
  },

  page: async ({ context }, use) => {
    const [page] = context.pages();
    await use(page);
  },
});

export const expect = baseExpect;
