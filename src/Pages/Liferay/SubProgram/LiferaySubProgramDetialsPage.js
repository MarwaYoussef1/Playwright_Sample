const { LiferayUploadImage  } = require("../../SharedPages/LiferayUploadImage");
import { Utils } from '../../../Utils/utils.js';


export class LiferaySubProgramDetialsPage {
  //marwa
  constructor(page) {
    this.page = page;
    this.uploadImage = new LiferayUploadImage(this.page);

    // Selectors for SubProgram Data
    this.dropInput ='//div[contains(@class,"dropzone")]//input[@type="file"]';
    this.addBtn = '//button[normalize-space()="New"]';
    this.startDateInput= 'input[id*="programApplicationDateFrom"][type="text"]'
    this.toDateInput= 'input[id*="programApplicationDateTo"][type="text"]'
    this.applicationChannel = '//div[@data-field-reference="serviceChannels"]//input[@type="text"]'
    this.faq = '//div[@data-field-reference="fAQ"]//input[@type="text"]';
    this.phoneNumber = '//div[@data-field-reference="phoneNumber"]//input[@type="text"]';
    this.email = '//div[@data-field-reference="email"]//input[@type="text"]';
    this.faqLabel = '//div[@data-field-reference="faqLabel"]//input[@type="text"]';
    this.subProgDescription = '//div[@data-field-reference="programDescription"]//textarea'
    this.risks = 'div[aria-label="Risks"] iframe'
    this.targetSegmant = 'div[aria-label="Target Segment"] iframe'
    this.conditionsOfFormingAssistanceUnit = 'div[aria-label="Conditions of Forming an Assistance Unit"] iframe'
    this.geographicalTargeting = 'div[aria-label="Geographical Targeting"] iframe'
    this.entitledSegments = 'div[aria-label="Entitled Segments"] iframe'
    this.governance = 'div[aria-label="Governance"] iframe'
    this.assistanceUnit = '//div[@data-field-reference="assistanceUnit"]//input[@type="text"]'
    this.description = '//div[@data-field-reference="description"]//textarea'
    this.uploadLogoBtn = '//div[@data-field-reference="logo"]//button[normalize-space()="Select File"]';
    this.uploadCoverBtn = '//div[@data-field-reference="coverMedia"]//button[normalize-space()="Select File"]';
    this.saveBtn = '//span[normalize-space()="Save"]';
    this.toast = '//div[contains(@class, "alert-success") and contains(., "successfully")]';
  }    

  async completeSubProgramData(subProgramData) {
  
      // Fill liferay subProgram fields

      var iconImage = global.testConfig.Liferay.iconImage;
      var coverImage = global.testConfig.Liferay.coverImage;
      
      await this.fillDateInputWithToday(this.startDateInput);
      await this.fillDateInputWithToday(this.toDateInput);
      await this.page.waitForTimeout(1000);
      var addIcon = await this.uploadImage.uploadImageViaDropzone(iconImage, this.uploadLogoBtn);
      await this.page.waitForTimeout(2000);
      var addCover = await this.uploadImage.uploadImageViaDropzone(coverImage, this.uploadCoverBtn);
      await this.page.waitForTimeout(1000);
      await this.page.fill(this.applicationChannel,subProgramData.getApplicationChannel());             
      await this.page.fill(this.faq,subProgramData.getFAQ());
      await this.page.fill(this.phoneNumber,subProgramData.getPhoneNumber());
      await this.page.fill(this.email,subProgramData.getEmail());
      await this.page.fill(this.faqLabel, subProgramData.getFaqLabel());
      await this.page.fill(this.subProgDescription,subProgramData.getSubDescription());            
      await this.page.fill(this.assistanceUnit,subProgramData.getAssistanceUnit());                  
      await this.page.waitForTimeout(2000);
      await this.page.waitForSelector(this.risks, {state: "visible" });
      await this.setIframeContent(this.risks, subProgramData.getRisks());         
      await this.setIframeContent (this.targetSegmant, subProgramData.getTargetSegmant());         
      await this.setIframeContent(this.conditionsOfFormingAssistanceUnit, subProgramData.getConditionsOfFormingAssistanceUnit());         
      await this.setIframeContent(this.geographicalTargeting, subProgramData.getGeographicalTargeting());        
      await this.setIframeContent(this.entitledSegments, subProgramData.getEntitledSegments());
      await this.page.waitForSelector(this.governance, {state: "visible" });   
      await this.setIframeContent(this.governance, subProgramData.getGovernance());         
      console.log(`Frame updated Successfully.`);
      await this.page.fill(this.description,subProgramData.getDescription());            
      
      // Save the subProgram form
      await this.page.waitForSelector(this.saveBtn, {state: "visible"});
      await this.page.click(this.saveBtn); 
      var toast = this.page.locator(this.toast);
      await toast.waitFor({ state: 'visible', timeout: 5000 });
      var verifySave = (await toast.textContent()).includes('successfully');
      await this.page.waitForTimeout(10000);   

      if (verifySave ) {
        return true;
      }
      return false;  
    }

  async setIframeContent(iframeLocator, content) {
      var iframeHandle = await this.page.waitForSelector(iframeLocator, { timeout: 10000 });
      var frame = await iframeHandle.contentFrame();
      await frame.waitForSelector('body.cke_editable', { timeout: 5000 });
      await frame.click('body.cke_editable');
      //await frame.click('body.cke_editable', { clickCount: 3 });
      //await frame.press('body.cke_editable', 'Backspace');
      await frame.type('body.cke_editable', content, { delay: 10 });
      await this.page.keyboard.press("Tab");
      await frame.evaluate(() => document.activeElement.blur());
      await frame.waitForTimeout(500);
      console.log("Filling:", content)
  }

  async fillDateInputWithToday(inputLocator, format = 'MM/dd/yyyy', dateObj = new Date()) {
      var dateStr = Utils.getFormattedDate(format,dateObj);
      await this.page.fill(inputLocator, dateStr);
  }

  }
  
module.exports = { LiferaySubProgramDetialsPage };