const { PopUpPage } = require('./PopUpPage');
const { SearchPage } = require('./SearchPage');
import Constants from '../../Utils/Constants.js';

export class FormIoPage {
  constructor(page) {
    this.page = page;
    this.popUpMsg = new PopUpPage(this.page);
    this.search = new SearchPage(this.page);

    //locators

    //form io locators
    this.addNewPageButton = '//li[@class="wizard-add-page"]';
    this.goToNewPageButton = '//span[@ref="gotoPage"]';
    this.textField = '(//span[@class="btn btn-primary btn-sm btn-block formcomponent drag-copy"])[1]';
    //this.dropItemArea = '(//div[@ref="dragComponent"])[4]/following::div[1]';
    //this.dropItemArea = '//div[@class="builder-components drag-container formio-builder-form"]';
    //this.dropItemArea = '//div[@class="row formio-component formio-component-columns formio-component-formActionBar  formio-component-label-hidden"]';
    //this.dropItemArea = '(//div[@class="card-body"])[3]';
    //this.dropItemArea = '//div[@class="formio-form"]';
    this.dropItemArea = '//div[@class="builder-components drag-container formio-builder-form"]';
    //this.dropItemArea = '//div[@class="formio builder row formbuilder"]';
    this.apiTab = '//a[contains(text(), "API")]';

    //display locators
    this.displayLabel = '//input[@name="data[label]"]';

    //API tab locators
    this.propertyName = '//input[@name="data[key]"]';

    this.saveButton = '//button[@ref="saveButton"]';

    this.textFieldCreatedLocator = '//input[@name="data[dummyPropertyName]"]';


  }

  async fillInfoTabDisplay(labelName) {
    console.log("Start filling Display Tab Info");
    await this.page.waitForSelector(this.displayLabel, { state: 'visible' }, { timeout: 5000 });
    await this.page.fill(this.displayLabel, labelName);
    console.log("End filling Display Tab Info");
  }

  async fillInfoTabAPI(propertyName) {
    console.log("Start filling API Tab Info");
    await this.page.click(this.apiTab);
    await this.page.waitForSelector(this.propertyName, { state: 'visible' }, { timeout: 5000 });
    await this.page.fill(this.propertyName, propertyName);
    console.log("End filling API Tab Info");
  }

  /**
   * Fills the lookup design information form with the provided data - second tab.
   * @param {Object} lookupData - The data to fill in the form.
   * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating the success of the operation.
   */
  async createFormIoTextField(neededTabs = [], labelName, propertyName, dropLocator) {
    console.log("Start filling Form IO Text Field");

    //await this.page.pause(); // Debug pause

    await this.page.dragAndDrop(this.textField, dropLocator);

    if (neededTabs.includes(Constants.FORMIO_DISPLAY) && labelName) {
      await this.fillInfoTabDisplay(labelName);
    }
    if (neededTabs.includes(Constants.FORMIO_API) && propertyName) {
      await this.fillInfoTabAPI(propertyName);
      this.propertyNameValue = propertyName; // Store propertyName in the class instance
    } else {
      this.propertyNameValue = 'textField'; // Default value if propertyName is not provided
    }

    //await this.page.waitForTimeout(2000);
    await this.page.click(this.saveButton);
    var textFieldCreatedLocator = '//input[@name="data[' + this.propertyNameValue + ']"]';
    let fieldExist = await this.page.waitForSelector(textFieldCreatedLocator, { state: 'attached', timeout: 5000 });
    console.log("End filling Form IO Text Field");
    return fieldExist;
  }

  async fillCreatedFormIoTextField(fieldInputValue) {
    console.log("Start filling Created Form IO Items");
    var textFieldCreatedLocator = '//input[@name="data[' + this.propertyNameValue + ']"]';
    await this.page.fill(textFieldCreatedLocator, fieldInputValue);
    console.log("End filling Created Form IO Items");
  }
}
module.exports = { FormIoPage };
