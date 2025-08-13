import Constants from "../../Utils/Constants";

const fs = require('fs');
const path = require('path');

/**
 * Manages search-related actions for tables, including searching for rows by value or text,
 * retrieving row details, and performing actions on specific rows.
 * @class
 */
export class LiferayUploadImage {
  constructor(page) {
    this.page = page;
   this.dropInput =' //*[contains(@class,"dropzone-wrapper")]//*[@class="dropzone"]//input';
    this.addBtn = '//button[normalize-space()="Add"]';

    this.uploadIconBtn = '//div[@data-field-name="streamLogo"]//button[normalize-space()="Select File"]';
    this.uploadCoverBtn = '//div[@data-field-name="streamCoverMedia"]//button[normalize-space()="Select File"]';

    this.uploaderLocator = '//input[@type="file"]';

  }

  async uploadImageViaDropzone(fileName, uploadButtonLocator) {
  await this.page.waitForTimeout(2000);
  await this.page.locator(uploadButtonLocator).click();

  // Wait for the upload frame
  const frameElement = await this.page.waitForSelector('iframe[title="Select File"]', { timeout: 10000 });
  const frame = await frameElement.contentFrame();

  const dropZoneInput = frame.locator(this.dropInput);

  // Build unique file name using timestamp
  const originalPath = path.resolve(global.testConfig.LIFERAY_UPLOAD_PATH + fileName);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '_'); // Safe file name
  const ext = path.extname(fileName);
  const baseName = path.basename(fileName, ext);
  const uniqueName = `${baseName}_${timestamp}${ext}`; // Example: Icon_2025-05-18T18_14_05_000Z.jpg

  // Upload using buffer and virtual name
  await dropZoneInput.waitFor({ state: 'attached', timeout: 40000 });
  await dropZoneInput.setInputFiles({
    name: uniqueName,
    mimeType: 'image/jpeg',
    buffer: fs.readFileSync(originalPath),
  });

  await frame.waitForTimeout(10000);

  const addBtn = frame.locator(this.addBtn);
  await addBtn.waitFor({ state: 'visible', timeout: 10000 });
  await addBtn.click();

  // Confirm upload
  const uploadedIndicator = this.page.locator(`//button[contains(text(), "${uniqueName.split('.')[0]}")]`);
  await uploadedIndicator.waitFor({ state: "visible", timeout: 10000 });

  console.log(` File "${fileName}" uploaded successfully as "${uniqueName}"`);
  return true;
  }


}
module.exports = {  LiferayUploadImage };
