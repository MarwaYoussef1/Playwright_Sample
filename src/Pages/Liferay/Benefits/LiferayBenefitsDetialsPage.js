export class LiferayBenefitDetialsPage {
  
  constructor(page) {
    this.page = page;

    // Selectors for Benefit Data
    this.dropInput = '//div[contains(@class,"dropzone")]//input[@type="file"]';
    this.addBtn = '//button[normalize-space()="Add"]';

    this.uploadIconBtn = '//div[@data-field-reference="programIcon"]//button[normalize-space()="Select File"]';
    this.uploadCoverBtn = '//div[@data-field-reference="programCoverMedia"]//button[normalize-space()="Select File"]';
    this.uploadResponsibleIconBtn = '//div[@data-field-reference="responsibleIcon"]//button[normalize-space()="Select File"]';

    this.faqLabel = '//div[@data-field-reference="faqLabel"]//input[@type="text"]';
    this.serviceChannels = '//div[@data-field-reference="serviceChannels"]//input[@type="text"]';
    this.faq = '//div[@data-field-reference="fAQ"]//input[@type="text"]';
    this.phoneNumber = '//div[@data-field-reference="phoneNumber"]//input[@type="text"]';
    this.email = '//div[@data-field-reference="email"]//input[@type="text"]';
    this.cmsDescription = '//div[@data-field-reference="cmsDescription"]//textarea';
    this.risks = '//div[@data-field-reference="risks"]//input[@role="textbox"]';

    this.saveBtn = '//span[normalize-space()="Save"]';
    this.toast = '//div[contains(@class, "alert-success") and contains(., "successfully")]';
  }    

  async completeBenefitData(benefitData) {
    await this.page.fill(this.faq, benefitData.getFAQ());
    await this.page.fill(this.phoneNumber, benefitData.getPhoneNumber());
    await this.page.fill(this.email, benefitData.getEmail());

    // If the risk field is inside an iframe, uncomment the following lines:
    // var riskframe = await this.page.waitForSelector('iframe', { timeout: 10000 });
    // var frame = await riskframe.contentFrame();
    // await frame.fill(this.risks, benefitData.getRisks());

    await this.page.fill(this.cmsDescription, benefitData.getCmsDescription());
    await this.page.fill(this.faqLabel, benefitData.getFaqLabel());

    await this.page.waitForSelector(this.saveBtn, { state: "visible" });
    await this.page.click(this.saveBtn);

    var toast = this.page.locator(this.toast);
    await toast.waitFor({ state: 'visible', timeout: 5000 });

    var verifySave = (await toast.textContent()).includes('successfully');
    return verifySave;
  }

  // async uploadImageViaDropzone(fileName, uploadButtonLocator) {
  //   await this.page.waitForTimeout(2000);
  //   await this.page.locator(uploadButtonLocator).click();
  //   var frameElement = await this.page.waitForSelector('iframe', { timeout: 10000 });
  //   var frame = await frameElement.contentFrame();
  //   var dropZoneInput = frame.locator(this.dropInput);
  //   const filePath = global.testConfig.LIFERAY_UPLOAD_PATH + fileName;
  //   await dropZoneInput.setInputFiles(filePath);
  //   await frame.waitForTimeout(3000);
  //   var addBtn = frame.locator(this.addBtn);
  //   await addBtn.waitFor({ state: 'visible', timeout: 10000 });
  //   await addBtn.click();
  //   var baseFileName = fileName.split('.')[0];
  //   var uploadedFileIndicator = this.page.locator(`//button[contains(text(), "${baseFileName}")]`);    
  //   await uploadedFileIndicator.waitFor({ state: "visible", timeout: 10000 });
  //   console.log(`File "${fileName}" uploaded successfully.`);
  //   return true;
  // }
}

module.exports = { LiferayBenefitDetialsPage };
