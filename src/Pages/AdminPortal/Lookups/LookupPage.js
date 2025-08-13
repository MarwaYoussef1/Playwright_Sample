const { PopUpPage } = require('../../SharedPages/PopUpPage');
const { SearchPage } = require('../../SharedPages/SearchPage');
const { FormIoPage } = require("../../SharedPages/FormIoPage.js");
import Constants from '../../../Utils/Constants.js';

export class LookupPage {
  constructor(page) {
    this.page = page;
    this.createdLookUpArName = null;
    this.createdLookUpEnName = null;
    this.popUpMsg = new PopUpPage(this.page);
    this.search = new SearchPage(this.page);
    this.formIo = new FormIoPage(this.page);
    //locators
    this.successPopupTitle = '//span[@data-testid="modal-title"]';
    //Lookup Definition - first tab
    this.lookupArabicName = '//input[@name="data[nameAr]"]';
    this.lookupEnglishName = '//input[@name="data[nameEn]"]';
    this.componentDdl = '(//div[@class="form-control ui fluid selection dropdown"])[1]';
    this.ComponentsFirstOption = '(//div[@class="form-control ui fluid selection dropdown"])[1]/..//div[@data-id="1"]';
    this.lookupCategory = '(//div[@class="form-control ui fluid selection dropdown"])[2]';
    this.lookupCategoryFirstOption = '(//div[@class="form-control ui fluid selection dropdown"])[2]/..//div[@data-id="1"]';
    this.parentLookup = '(//div[@class="form-control ui fluid selection dropdown"])[3]';
    this.parentLookupFirstOption = '(//div[@class="form-control ui fluid selection dropdown"])[3]/..//div[@data-id="1"]';
    this.lookupDescriptionArabicName = '//textarea[@name="data[descriptionAr]"]';
    this.lookupDescriptionEnglishName = '//textarea[@name="data[descriptionEn]"]';
    this.defineLookupButton = '//button[@data-testid="next-button"]';

    //Lookup Design - second tab
    this.nameInArabic = '//input[@name="data[nameAr]"]';
    this.nameInEnglish = '//input[@name="data[nameEn]"]';
    this.code = '//input[@name="data[code]"]';
    this.createLookupButton = '//button[@data-testid="next-button"]';
    this.popUpDismissButton = '//button[@data-testid="modal-primary-button"]';

    //form io locators
    this.textField = '(//span[@class="btn btn-primary btn-sm btn-block formcomponent drag-copy"])[1]';
    this.dropItemLocation = '//div[@class="formio builder row formbuilder"]';

    //Lookup Item management - third tab
    this.nameArabic = '//input[@name="data[nameAr]"]';
    this.nameEnglish = '//input[@name="data[nameEn]"]';
    this.codeLookup = '//input[@name="data[code]"]';
    this.mainList = '//div[@class="choices form-group formio-choices"]';
    this.mainListFirstOption = '//div[@class="form-control ui fluid selection dropdown"]/..//div[@data-id="1"]';
    this.visibleToggle = '//label[@class="form-check-label"]';
    this.addItemToLookupButton = '//button[@data-testid="add-element-to-lookup"]';
    this.makeLookupButton = '//button[@data-testid="next-button"]';
    this.viewLookUpItemButton = '(//*[@data-testid="table-actions"])[1]//button';
    this.lookupDetailsPageCloseButton = '//h2//button[contains(@class,"MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium")]';

    //view lookup
    this.headlinePage = '//span[contains(text(),"المعلومات الرئيسية")]';
    this.lookupArNameValue = '//div[@class="form-group has-feedback formio-component formio-component-textfield formio-component-nameAr  required"]//div[@ref="value"]';
    this.lookupEnNameValue = '//div[@class="form-group has-feedback formio-component formio-component-textfield formio-component-nameEn en required"]//div[@ref="value"]';
    this.lookupArDescriptionValue = '//div[@class="form-group has-feedback formio-component formio-component-textarea formio-component-descriptionAr"]//div[@ref="value"]';
    this.lookupEnDescriptionValue = '//div[@class="form-group has-feedback formio-component formio-component-textarea formio-component-descriptionEn en"]//div[@ref="value"]';
    this.lookupStatusValue = '//div[@class="form-group has-feedback formio-component formio-component-checkbox formio-component-active mt-4 status"]//div[@ref="value"]';
  }

  /**
   * Fills the lookup definition information on the Lookup Page - first tab.
   * @param {Object} lookupData - The data object containing lookup information.
   * @returns {Promise<void>} A promise that resolves when the lookup definition information has been filled.
   */
  async fillLookupDefinitionInformation(lookupData) {
    console.log("Start filling Definition information");
    await this.page.waitForTimeout(1000);
    this.createdLookUpArName = lookupData.getLookupArabicName();
    this.createdLookUpEnName = lookupData.getLookupEnglishName();
    this.createdLookUpDescripionArName = lookupData.getLookupDescriptionArabicName();
    this.createdLookUpDescripionEnName = lookupData.getLookupDescriptionEnglishName();
    await this.page.fill(this.lookupArabicName, this.createdLookUpArName);
    await this.page.fill(this.lookupEnglishName, this.createdLookUpEnName);
    await this.page.click(this.componentDdl);
    await this.page.waitForSelector(this.ComponentsFirstOption, { visible: true });
    await this.page.click(this.ComponentsFirstOption);
    await this.page.click(this.lookupCategory);
    await this.page.waitForSelector(this.lookupCategoryFirstOption, { visible: true });
    await this.page.click(this.lookupCategoryFirstOption);
    //await this.page.click(this.parentLookup);
    //await this.page.waitForSelector(this.parentLookupFirstOption, { visible: true });
    //await this.page.click(this.parentLookupFirstOption);
    await this.page.fill(this.lookupDescriptionArabicName, this.createdLookUpDescripionArName);
    await this.page.fill(this.lookupDescriptionEnglishName, this.createdLookUpDescripionEnName);
    await this.page.waitForTimeout(1000);
    await this.page.click(this.defineLookupButton);
    lookupData.setLookupArabicName(this.createdLookUpArName);
    lookupData.setLookupEnglishName(this.createdLookUpEnName);
    lookupData.setLookupDescriptionArabicName(this.createdLookUpDescripionArName);
    lookupData.setLookupDescriptionEnglishName(this.createdLookUpDescripionEnName);
    console.log("End filling Definition information");
  }

  /**
   * Fills the lookup design information form with the provided data - second tab.
   * @param {Object} lookupData - The data to fill in the form.
   * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating the success of the operation.
   */
  async fillLookupDesignInformation(lookupData, formIO) {
    console.log("Start filling Design information");
      await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(this.code, { visible: true });
    await this.page.fill(this.nameInArabic, lookupData.getNameInArabic());
    await this.page.fill(this.nameInEnglish, lookupData.getNameInEnglish());
    await this.page.fill(this.code, lookupData.getCode());
    if (formIO) {
      await this.formIo.createFormIoTextField([Constants.FORMIO_DISPLAY], 'label Dummy Auto', '', this.dropItemLocation);
      await this.formIo.fillCreatedFormIoTextField('Dummy Input');
    }
    await this.page.waitForTimeout(3000);
    await this.page.click(this.createLookupButton);
    await this.page.waitForTimeout(3000);
    var result = await this.popUpMsg.popUpMessage(this.popUpDismissButton, global.testConfig.lookUps.successMsgTabTwo);
    console.log("End filling Design information");
    return result;
  }

  /**
   * Fills the lookup item management information form with the provided data - third tab.
   * @param {Object} lookupData - The data to fill in the form.
   * @returns {Promise<string>} - The result message from the popup.
   */
  async fillLookupItemManagementInformation(lookupData) {
    console.log("Start filling items information");
    await this.page.waitForSelector(this.addItemToLookupButton, { visible: true });
    await this.page.fill(this.nameArabic, lookupData.getNameArabic());
    await this.page.fill(this.nameEnglish, lookupData.getNameEnglish());
    await this.page.fill(this.codeLookup, lookupData.getCodeLookup());
    //await this.page.click(this.mainList);
    //await this.page.waitForSelector(this.mainListFirstOption, { visible: true });
    // await this.page.click(this.mainListFirstOption);
    await this.page.click(this.visibleToggle);
    await this.page.click(this.addItemToLookupButton);
    var result = await this.popUpMsg.popUpMessage(this.popUpDismissButton, global.testConfig.lookUps.successMsgTabThree);
    await this.page.waitForTimeout(2000);
    await this.page.click(this.makeLookupButton);
    await this.page.click(this.popUpDismissButton);
    console.log("End filling items information");
    return result;
  }

  /**
   * Creates a new lookup entry by filling in the necessary information.
   * @param {Object} lookupData - The data required to create the lookup.
   * @returns {Promise<boolean>} - Returns true if the lookup design and item creation were successful, otherwise false.
   */
  async createNewLookup(lookupData, formIO) {
    var lookupDesignDone;
    var lookupitemCreated;
    await this.fillLookupDefinitionInformation(lookupData);
    lookupDesignDone = await this.fillLookupDesignInformation(lookupData, formIO);
    if (lookupDesignDone) {
      lookupitemCreated = await this.fillLookupItemManagementInformation(lookupData);
    }
    await this.page.waitForTimeout(3000);
    return lookupDesignDone && lookupitemCreated;
  }

  /**
   * Validates that the Lookup Page is opened by checking the visibility of the headline element.
   * @returns {Promise<void>} - Resolves when the headline element is visible.
   */
  async validateLookupDetails(lookupData) {
    await this.page.waitForSelector(this.headlinePage, { visible: true });

    const lookupArabicNameFieldText = await this.page.innerText(this.lookupArNameValue);
    const lookupEnglishNameFieldText = await this.page.innerText(this.lookupEnNameValue);
    const lookupDescriptionArabicNameFieldText = await this.page.innerText(this.lookupArDescriptionValue);
    const lookupDescriptionEnglishNameFieldText = await this.page.innerText(this.lookupEnDescriptionValue);
    const lookupStatusFieldText = await this.page.innerText(this.lookupStatusValue);

    // Collect all validation checks into an array of booleans
    const validations = [
      lookupArabicNameFieldText === lookupData.getLookupArabicName(),
      lookupEnglishNameFieldText === lookupData.getLookupEnglishName(),
      lookupDescriptionArabicNameFieldText === lookupData.getLookupDescriptionArabicName(),
      lookupDescriptionEnglishNameFieldText === lookupData.getLookupDescriptionEnglishName(),
      lookupStatusFieldText === global.testConfig.lookUps.listStatus
    ];


    // Check if all validations are true
    const allValid = validations.every(Boolean);

    return allValid;

  }

  /**
   * Add new lookup item for edit test case
   * @returns {Promise<void>} A promise that resolves when the lookup item has been added.
   */
  async addNewLookupItem() {
    await this.page.fill(this.nameArabic, global.testConfig.lookUps.arabicName);
    await this.page.fill(this.nameEnglish, global.testConfig.lookUps.englishName);
    await this.page.fill(this.codeLookup, global.testConfig.lookUps.code);
    // await this.page.click(this.mainList);
    // await this.page.click(this.mainListFirstOption);
    await this.page.click(this.visibleToggle);
    var newLookupitemCreated = await this.page.click(this.addItemToLookupButton);
    return !newLookupitemCreated;
  }

  /**
   * Validates if a new lookup item has been added by comparing the values in the first row of the lookup table
   * with the expected values from the global test configuration.
   * @returns {Promise<boolean>} A promise that resolves to true if the new lookup item matches the expected values, otherwise false.
   */
  async validateNewLookupItemAdded() {
    let lookUpCodeValue;
    let lookupArNameValue;
    let lookupEnNameValue;
    let lookupStatusValue;
    let lookupNewItemRow = [];
    lookupNewItemRow = await this.search.getFirstRow();
    var lookUpCodeLocator = "td:nth-of-type(2) >> span";
    var lookupArNameLocator = "td:nth-of-type(3) >> span";
    var lookupEnNameLocator = "td:nth-of-type(4) >> span";
    var lookupStatusLocator = "td:nth-of-type(7) >> span";
    lookUpCodeValue = await this.page.innerText(lookUpCodeLocator);
    lookupArNameValue = await this.page.innerText(lookupArNameLocator);
    lookupEnNameValue = await this.page.innerText(lookupEnNameLocator);
    lookupStatusValue = await this.page.innerText(lookupStatusLocator);

    console.log("Lookup Code Value: ", lookUpCodeValue);
    console.log("Lookup Arabic Name Value: ", lookupArNameValue);
    console.log("Lookup English Name Value: ", lookupEnNameValue);
    console.log("Lookup Status Value: ", lookupStatusValue);

    if (lookUpCodeValue === global.testConfig.lookUps.code &&
      lookupArNameValue === global.testConfig.lookUps.arabicName &&
      lookupEnNameValue === global.testConfig.lookUps.englishName &&
      lookupStatusValue === global.testConfig.lookUps.newLookupItemAddedStatus) {
      return true;
    }
    return false;
  }

  /**
   * Views the details of a new lookup item.
   * This function clicks on the view lookup button, waits for the lookup details page to be visible
   * @returns {Promise<boolean>} - Returns true if the lookup details page close button was clicked successfully, otherwise false.
   */
  async viewNewLookupItemDetails() {
    var validateNewLookupItemDetails = await this.validateNewLookupItemAdded();
    await this.page.click(this.viewLookUpItemButton);
    await this.page.waitForTimeout(2000);
    await this.page.click(this.lookupDetailsPageCloseButton);
    return validateNewLookupItemDetails;
  }


}
module.exports = { LookupPage };
