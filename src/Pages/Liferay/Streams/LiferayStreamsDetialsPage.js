import Constants from '../../../Utils/Constants';
const { LiferayUploadImage  } = require("../../SharedPages/LiferayUploadImage");


export class LiferayStreamsDetialsPage {
  
  constructor(page) {
    this.page = page;
    this.uploadImage = new LiferayUploadImage(this.page);
    // Selectors for Stream Data
    this.dropInput ='//div[contains(@class,"dropzone")]//input[@type="file"]';
    this.addBtn = '//button[normalize-space()="Add"]';

    this.uploadIconBtn = '//div[@data-field-name="streamLogo"]//button[normalize-space()="Select File"]';
    this.uploadCoverBtn = '//div[@data-field-name="streamCoverMedia"]//button[normalize-space()="Select File"]';


    this.faqLabel = '//div[@data-field-reference="faqLabel"]//input[@type="text"]';
    this.serviceChannels= '//div[@data-field-reference="serviceChannels"]//input[@type="text"]';
    this.faq = '//div[@data-field-reference="fAQ"]//input[@type="text"]';
    this.phoneNumber = '//div[@data-field-reference="phoneNumber"]//input[@type="text"]';
    this.email = '//div[@data-field-reference="email"]//input[@type="text"]';
    this.cmsDescription = '//div[@data-field-reference="cmsDescription"]//textarea';

    this.saveBtn = '//span[normalize-space()="Save"]';
    this.toast = '//div[contains(@class, "alert-success") and contains(., "successfully")]';

  }    

  async completeStreamData(streamData) {
  
      // Fill liferay stream fields
      await this.page.fill(this.faqLabel, streamData.getFaqLabel());
      await this.page.waitForTimeout(5000);
      var iconImage = global.testConfig.Liferay.iconImage;
      var coverImage = global.testConfig.Liferay.coverImage;
      var addIcon = await this.uploadImage.uploadImageViaDropzone(iconImage, this.uploadIconBtn);
      await this.page.waitForTimeout(2000);
      var addCover = await this.uploadImage.uploadImageViaDropzone(coverImage, this.uploadCoverBtn);

      await this.page.waitForTimeout(1000);

      await this.page.fill(this.serviceChannels, streamData.getServiceChannels());
      await this.page.fill(this.faq,streamData.getFAQ());
      await this.page.fill(this.phoneNumber,streamData.getPhoneNumber());
      await this.page.fill(this.email,streamData.getEmail());
      await this.page.fill(this.cmsDescription,streamData.getCmsDescription());
  
      // Save the stream form
      await this.page.waitForSelector(this.saveBtn, {state: "visible"});
      await this.page.click(this.saveBtn); 

      var toast = this.page.locator(this.toast);
      await this.page.waitForSelector(this.toast, {state: "visible",timeout: 50000});
     // await toast.waitFor({ state: 'visible', timeout: 5000 });

      var verifySave = (await toast.textContent()).includes('successfully');
      if (verifySave && addIcon && addCover) {
        return true;
      }
      return false;  
    }



  }
module.exports = { LiferayStreamsDetialsPage };
