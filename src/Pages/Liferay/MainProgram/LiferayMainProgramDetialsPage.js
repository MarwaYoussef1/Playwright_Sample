const { LiferayUploadImage  } = require("../../SharedPages/LiferayUploadImage");

export class LiferayMainProgramDetialsPage {
  
  constructor(page) {
    this.page = page;
    this.uploadImage = new LiferayUploadImage(this.page);

    // Selectors for MainProgram Data
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
    this.programGoals = '//body[role="textbox"]';

    this.saveBtn = '//span[normalize-space()="Save"]';
    this.toast = '//div[contains(@class, "alert-success") and contains(., "successfully")]';
  }    

  async completeMainProgramData(mainProgramData) {
  
      // Fill liferay mainProgram fields

      var iconImage = global.testConfig.Liferay.iconImage;
      var coverImage = global.testConfig.Liferay.coverImage;
      var resposibleImage = global.testConfig.Liferay.resposibleImage;

      await this.page.waitForTimeout(5000);
      var addIcon = await this.uploadImage.uploadImageViaDropzone(iconImage, this.uploadIconBtn);
      await this.page.waitForTimeout(2000);
      // var addCover = await this.uploadImage.uploadImageViaDropzone(coverImage, this.uploadCoverBtn);
      // await this.page.waitForTimeout(2000);
       var addResponsible = await this.uploadImage.uploadImageViaDropzone(resposibleImage, this.uploadResponsibleIconBtn);
      await this.page.waitForTimeout(4000);

      await this.page.fill(this.faq,mainProgramData.getFAQ());
      await this.page.fill(this.phoneNumber,mainProgramData.getPhoneNumber());
      await this.page.fill(this.email,mainProgramData.getEmail());

      await this.page.fill(this.cmsDescription,mainProgramData.getCmsDescription());
      await this.page.fill(this.faqLabel, mainProgramData.getFaqLabel());

  await this.page.waitForSelector('div[aria-label="Program Goals"] iframe', { timeout: 10000 });
  const goalsFrame = this.page.frameLocator('div[aria-label="Program Goals"] iframe');  
  const isBodyVisible = await goalsFrame.locator('body').isVisible();
  // console.log("Body inside Program Goals iframe visible:", isBodyVisible);

  await goalsFrame.locator('body').evaluate((el, value) => {
    el.innerHTML = value;
  }, mainProgramData.getArabicMainProgramGoal());

      // Save the mainProgram form
      await this.page.waitForSelector(this.saveBtn, {state: "visible"});
      await this.page.click(this.saveBtn); 

      var toast = this.page.locator(this.toast);
      await toast.waitFor({ state: 'visible', timeout: 8000 });

      var verifySave = (await toast.textContent()).includes('successfully');
      if (verifySave && addIcon  && addResponsible) {
      // if (verifySave && addIcon && addCover && addResponsible) {
        return true;
      }
      return false;  
    }
    
  }
module.exports = { LiferayMainProgramDetialsPage };
