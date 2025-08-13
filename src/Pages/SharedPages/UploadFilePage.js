import Constants from "../../Utils/Constants";

/**
 * Manages search-related actions for tables, including searching for rows by value or text,
 * retrieving row details, and performing actions on specific rows.
 * @class
 */
export class UploadFilePage {
  constructor(page) {
    this.page = page;
    this.tableSelector = "//table//tbody";
    this.uploaderLocator = '//input[@type="file"]';
    this.downloadLocator = '[data-testid="download-btn"]';
  }

  async uploadFile(fileName, uploadButton = null, verifyFileUploaded = null) {
    // console.log("path" , global.testConfig.UPLOAD_PATH + fileName);
    const filePath = global.testConfig.UPLOAD_PATH + fileName;
    await this.page.setInputFiles(this.uploaderLocator, filePath);
    await this.page.waitForTimeout(5000);

    if (uploadButton) {
      await this.page.waitForSelector(uploadButton, { visible: true });
      await this.page.click(uploadButton);

      if (verifyFileUploaded) {
        const expectedFileName = `//*[contains(text(), "${fileName}")]`;
        await this.page.waitForSelector(expectedFileName, { state: 'visible', timeout: 10000 });
      }
    }
  }

  async downloadFile() {
    await Promise.all([
      this.page.waitForEvent('download'), // wait for download to start
      this.page.locator(this.downloadLocator).click() // trigger download
    ]);
  }
}
module.exports = { UploadFilePage };
