export class GlossaryPage {
    //Page Construtor
    constructor(page) {
      this.page = page;
      this.Name = '[id="axon_appbundle_catitemcategorytype_PrimaryName"]';
      this.Definition ='[id="axon_appbundle_catitemcategorytype_Description"]';
      this.arabicFieldName ='//textarea[@placeholder="Enter Arabic Field Name (Text)"]';
      this.parentNameLocator ='[id="axon_appbundle_catitemcategorytype_Parent_button"]';
      this.parentSearch= '//td[contains(@class,"filter") and @role="columnheader"]//input[@type="text"]';
      this.arabicFieldDescription ='//textarea[@placeholder="Enter Arabic Field Description (Text)"]';
      this.glossaryRequired ='[id="axon_appbundle_catitemcategorytype_8"]';
      this.glossaryMultipleField ='[id="axon_appbundle_catitemcategorytype_10"]';
      this.glossaryServiceName = '[id="axon_appbundle_catitemcategorytype_12"]';

      this.classificationsTypeMenu ='[id="select2-axon_appbundle_catitemcategorytype_Type-container"]';
      this.classificationsType ='//li[text()="Term"]';

      this.saveAndCloseBtn ='[id="save_close"]';
  }
  
  async verifyGlossaryNavigation() {
    await this.page.waitForSelector(this.Name, { state: "visible",timeout: 5000});
    return await this.page.locator(this.Name).isVisible();
  }

 /**
    * fill Field Data Definition using the provided data.
    * @param {object} fieldData - The data object containing field data defination tab.
    * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
    */
   async fillNewGlossaryData(fieldData) {
  
     // Fill Glossry Data Definition
     await this.page.fill(this.Name, fieldData.getEnglishFieldName());
     await this.selectParentName(this.parentNameLocator);
     await this.page.fill(this.Definition, fieldData.getEnglishFieldDescription());
     await this.page.fill(this.arabicFieldName, fieldData.getArabicFieldName());
     await this.page.fill(this.arabicFieldDescription , fieldData.getArabicFieldDescription());
     await this.page.fill(this.glossaryServiceName , fieldData.getGlossaryServiceName() );
     await this.page.click(this.glossaryRequired );
     await this.page.click(this.glossaryMultipleField);

    // Fill Glossry Classifications
    await this.selectClassificationsType();

    // Click Save and Close
    await this.page.click(this.saveAndCloseBtn);
    await this.page.waitForTimeout(5000);
    console.log("Filling Glossary Data Definition Ending ")
}

 /**
 * Selects an option from a dropdown menu based on the provided index.
 * @param {string} dropdownLocator - The selector for the dropdown element.
 * @param {number} menuOptionsIndex - The index of the option to select (1-based).
 * @returns {Promise<void>} - Completes the dropdown selection.
 */
 async selectClassificationsType() {
    await this.page.click(this.classificationsTypeMenu);
    await this.page.waitForTimeout(1000); 
    await this.page.click(this.classificationsType);
    await this.page.waitForTimeout(1000);
}

  /**
   * Selects the value of Parent Name.
   * @param {string} parentLocator - The selector for the parent option element.
   * @returns {Promise<void>} - Completes the dropdown selection.
   */
  async selectParentName(parentLocatorField) {
    await this.page.click(parentLocatorField); 
    await this.page.waitForTimeout(2000);
    await this.page.fill(this.parentSearch, global.testConfig.createField.glossaryParentBeforeApprove);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1000);
    await this.page.locator('(//*[@id="nodeval"])[3]').click(); 
  }

 

}

module.exports = {  GlossaryPage };
