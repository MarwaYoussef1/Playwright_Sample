import Constants from '../../../Utils/Constants.js';

const { SearchPage } = require("../../SharedPages/SearchPage.js");
const { PopUpPage } = require("../../SharedPages/PopUpPage.js");
const { DropDownMenuPage } = require('../../SharedPages/DropDownMenuPage.js');

/**
 * Represents the Field page and manages the creation of new Field,
 * including filling out metadata, targeting data, and feature details.
 * @class
 */
export class FieldPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.dropDownMenu = new DropDownMenuPage(page);


    //Selectors for List of available fields section
    this.searchInput ='//input[@data-testid="search-input-base"]';
   
    // Selectors for field data defination section
    this.arabicFieldName = '//input[@name="data[arabicFieldName]"]';
    this.englishFieldName = '//input[@name="data[englishFieldName]"]';
    this.MenuLocators = "//*[@role='listbox']//*[contains(@id,'item-choice-1')]";

    this.dataMenuOptionsLocator='.choices__list.is-active .choices__item.choices__item--selectable';
    this.fieldTypeMenu ='//select[@name="data[fieldType]"]/parent::div';
    // this.fieldTypeDropMenu ='//select[@name="data[fieldType]"]//parent::div//following::div[contains(@class,"choices__item--selectable")]';
    this.fieldTypeDropMenu ='//select[@name="data[fieldType]"]/parent::div/following::div[contains(@class,"choices__item--selectable")]';
    this.parentLocator ='//input[@data-testid="assigned-domain"]';
    this.fieldNature ='//select[@name="data[fieldNature]"]/parent::div';
    this.fieldDropNature ='//select[@name="data[fieldNature]"]//parent::div//following::*[contains(@class,"--dropdown")]';
   
    this.lookupNameMenu = '//select[@data-testid="lookup_name"]/parent::div';
    this.lookupNameDropMenu='//select[@data-testid="lookup_name"]//parent::div//following::*[contains(@class,"--dropdown")][1]';

    this.arabicFieldDescription = '//textarea[@name="data[arabicFieldDescription]"]';
    this.englishFieldDescription = '//textarea[@name="data[englishFieldDescription]"]';
    this.fieldDataDefinitionBtn ='//button[@data-testid="next-button"]';
    // Selectors for field settings  
    this.classification ="//select[@name='data[classification]']//parent::div";
    this.classificationDropMenu ='//select[@name="data[classification]"]//parent::div//following::div[contains(@class,"--dropdown")][1]';

    this.MenuOptionsLocator = '.choices__list[role="listbox"] .choices__item.choices__item--selectable[role="option"]';
    this.requierdOptionBtn ='//input[@value="mandatory"]';
    this.multipleFieldBtn ='//input[contains(@name,"data[multipleField]") and @value="yes"]';  
    this.periodicDataUpdate = "//select[@name='data[periodicDataUpdate]']//parent::div";
    this.periodicDataUpdateDropMenu ='//select[@name="data[periodicDataUpdate]"]//parent::div//following::div[contains(@class,"--dropdown")][1]';

    this.privacy ='//select[@name="data[privacy]"]//parent::div';
    this.privacyDropMenu ='//select[@name="data[privacy]"]//parent::div//following::div[contains(@class,"--dropdown")][1]';

    this.impactDegree = '//select[@name="data[impactDegree]"]//parent::div'
    this.impactDegreeDropMenu ='//select[@name="data[impactDegree]"]//parent::div//following::div[contains(@class,"--dropdown")][1]';

    this.DataMenuesettingsSeverity  ='//select[@name="data[severity]"]//parent::div';
    this.DataMenuesettingsSeverityDropMenu ='//select[@name="data[severity]"]//parent::div//following::div[contains(@class,"--dropdown")][1]';

    this.fieldSettingDefinationBtn='//button[@data-testid="next-button"]';
    this.descriptionCalculatedField ='//input[@name="data[calculationProcessDescription]"]';

    // Selectors for field Display
    this.fieldDisplyBtn ='//button[@data-testid="next-button"]';

    this.addAnotherField ='//button[@data-testid="confirmation-modal-primary-button"]';
    this.backToFieldRequestPage ='//button[@data-testid="confirmation-modal-secondary-button"]';
    this.doneButton = '//button[@data-testid="modal-primary-button"]';
  }

 
  async fillFieldDataDefinition(fieldData) {

    // Retrieve Field names from the provided data
    var createdFieldArName = fieldData.getArabicFieldName();
    var createdFieldEnName = fieldData.getEnglishFieldName();
    var fieldType = fieldData.getFieldType();

    // Fill Field Data Definition section
    if (![Constants.INTEGRATION_FIELD].includes(fieldType)) {
      await this.page.fill(this.arabicFieldName, createdFieldArName);
      await this.page.fill(this.englishFieldName, createdFieldEnName);}

    if ([Constants.INPUT_LOOKUP_FIELD].includes(fieldType)) {
      var fieldTypeValue = global.testConfig.createField.lookupFieldTypeValue;
      await this.dropDownMenu.selectDropdownValue(this.fieldTypeMenu, fieldTypeValue , this.fieldTypeDropMenu);
      await this.dropDownMenu.selectDropdownValue(this.lookupNameMenu ,null, this.lookupNameDropMenu);
      await this.dropDownMenu.selectDropdownValue(this.fieldNature ,null, this.fieldDropNature);
    }
      else {
          if (![Constants.COMPLEX_FIELD, Constants.GROUP_FIELD].includes(fieldType)) {
            await this.dropDownMenu.selectDropdownValue(this.fieldTypeMenu ,null, this.fieldTypeDropMenu);
          }
        await this.dropDownMenu.selectDropdownValue(this.fieldNature,null, this.fieldDropNature );
      }

    if (![Constants.INPUT_FIELD].includes(fieldType)) {
      await this.selectParentOption(this.parentLocator);
    }
      await this.page.fill(this.arabicFieldDescription, fieldData.getArabicFieldDescription());
      await this.page.fill(this.englishFieldDescription, fieldData.getEnglishFieldDescription());
      await this.page.click(this.fieldDataDefinitionBtn);
      await this.page.waitForTimeout(1000);

      fieldData.setArabicFieldName(createdFieldArName);
      fieldData.setEnglishFieldName(createdFieldEnName);

      fieldData.setGlossaryParentName(global.testConfig.createField.glossaryParentAfterApprove);
      fieldData.setGlossaryFieldNature(global.testConfig.createField.glossaryFieldNature); 
      fieldData.setGlossaryFieldSource(global.testConfig.createField.glossaryFieldSource);
      fieldData.setGlossaryAxonStatus(global.testConfig.createField.glossaryFieldAxsonStatus);

      console.log("Filling Data Definition Ending ")
  }


  /**
   * fill Field Settings using the provided data.
   * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
   */
  async fillFieldSettings(fieldData) {

    var fieldType = fieldData.getFieldType();

    // Fill Field Data Definition section
    await this.dropDownMenu.selectDropdownValue(this.classification,null, this.classificationDropMenu );
    if (![Constants.INTEGRATION_FIELD].includes(fieldType)) {
        await this.page.click(this.requierdOptionBtn);
        await this.page.click(this.multipleFieldBtn);
      }
    await this.dropDownMenu.selectDropdownValue(this.periodicDataUpdate,null, this.periodicDataUpdateDropMenu );
    if (![Constants.INTEGRATION_FIELD].includes(fieldType)) {
      await this.dropDownMenu.selectDropdownValue(this.privacy ,null, this.privacyDropMenu );
      await this.dropDownMenu.selectDropdownValue(this.impactDegree ,null, this.impactDegreeDropMenu  );
    }
    await this.dropDownMenu.selectDropdownValue(this.DataMenuesettingsSeverity ,null, this.DataMenuesettingsSeverityDropMenu);
    if ([Constants.CALCULATION_FIELD].includes(fieldType)) {
      await this.page.fill(this.descriptionCalculatedField, global.testConfig.createField.descriptionCalculatedField);
    }
    await this.page.click(this.fieldSettingDefinationBtn);
    console.log("Filling Field Settings Ending ");
  }
  
  /**
   * fill Field Settings using the provided data.
   * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
   */
  async fieldDisplay(fieldData) {
    let fieldType = fieldData.getFieldType();

    await this.page.waitForTimeout(2000); 
    await this.page.click(this.fieldDisplyBtn);
    console.log("Field Display Ending ");
    await this.page.waitForTimeout(2000); 
    var popUpMsg = new PopUpPage(this.page);

    if ([Constants.COMPLEX_FIELD].includes(fieldType)) {
      var result = await popUpMsg.popUpMessage( this.addAnotherField , global.testConfig.createField.createAnotherFieldMsg);  }
    else  
    if ([Constants.GROUP_FIELD].includes(fieldType)) {
      var result = await popUpMsg.popUpMessage( this.backToFieldRequestPage , global.testConfig.createField.createAnotherFieldMsg);  }
    else 
      if ([Constants.INPUT_FIELD ,Constants.CALCULATION_FIELD,Constants.INTEGRATION_FIELD,Constants.INPUT_LOOKUP_FIELD].includes(fieldType)) {
    var result = await popUpMsg.popUpMessage(this.doneButton , global.testConfig.createField.confirmaCreateFieldMsg);}
    return result;
  }
  



  // async selectLookupOption(dropdownLocator) {
  //   await this.page.click(dropdownLocator);
  //   await this.page.waitForTimeout(2000); 
  //   var lookupOption = this.page.locator(`//*[@role='listbox']//*[@data-value='Lookup']`);
  //   await lookupOption.waitFor({ state: 'visible', timeout: 5000 });
  //   await lookupOption.click();  
  //   await this.page.waitForTimeout(1000);
  //   var lookupNameMenu = '//div[contains(@class, "ui fluid selection dropdown")][.//select[@data-testid="lookup_name"]]';
  //   await this.page.waitForTimeout(5000); 
  //   await this.selectDropdownOption(lookupNameMenu,2);
  // }

  /**
   * Selects the value option from a fields tree.
   * @param {string} parentLocator - The selector for the parent option element.
   * @returns {Promise<void>} - Completes the dropdown selection.
   */
  async selectParentOption(parentLocatorField) {
    await this.page.click(parentLocatorField);
    await this.page.waitForTimeout(1000);
    const socialRecordItem = this.page.locator(`//span[contains(text(), "${global.testConfig.createField.firstParent}")]`);
    await socialRecordItem.waitFor({ state: 'visible', timeout: 5000 });
    await socialRecordItem.click();    
    await this.page.waitForTimeout(1000);
    const personalDataItem = this.page.locator(`//span[contains(text(), "${global.testConfig.createField.secoundParent}")]`);
    await personalDataItem.waitFor({ state: 'visible', timeout: 5000 });
    await personalDataItem.click();
    await this.page.waitForTimeout(1000);
    await this.page.locator('//div[contains(@class,"MuiDialogAction")]//button[1]').click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Creates a new lookup entry by filling in the necessary information.
   * @param {Object} lookupData - The data required to create the lookup.
   * @returns {Promise<boolean>} - Returns true if the lookup design and item creation were successful, otherwise false.
   */
  async creationField(fieldData) {
    var fieldDataDefinition, fieldSettings, fieldDisplay;
    // Common steps for all applicable field types
        fieldDataDefinition = await this.fillFieldDataDefinition(fieldData);
        await this.page.waitForTimeout(2000); 
        fieldSettings = await this.fillFieldSettings(fieldData);
        fieldDisplay = await this.fieldDisplay(fieldData );
        return fieldDisplay; 
    }

  async listOfAvailableFields () {
    const fields = [
      global.testConfig.createField.availableField1,
      global.testConfig.createField.availableField2 ];
    for (const field of fields) {
        await this.search.searchOnUniqueRow(this.searchInput ,field);
        var checkbox = await this.page.locator('//input[@type="checkbox"]');
        await checkbox.click();
      }
      var selectField = await this.page.locator('//button[@data-testid="next-button"]').click();
      return selectField; 
    }

    /**
       * Creates a new calculation Field by filling in the necessary information.
       */
    async calculationField(fieldData, fieldType) {
      // Common steps for all applicable field types
        await this.listOfAvailableFields();
        var fieldCreated =await this.creationField(fieldData, fieldType); 
        return fieldCreated ; 
    }

  async integrationDataList (axsonFieldName) {  

    var allPageButtons = this.page.locator('button[data-testid="paginationItem"]:not([aria-label*="next"])');
    var lastPageButton = allPageButtons.last();
    await lastPageButton.click(); 

    var row = await this.search.getRowInTableWithSpecificText(axsonFieldName);
    var firstTd  = row[0].tdLocator;
    const radioBtn = firstTd.locator('div>>input');
    await radioBtn.click(); 
      var selectIntegrationField = await this.page.locator('//button[@data-testid="next-button"]').click();
      return selectIntegrationField; 
  }

  /**
  * Creates a new Integration Field by filling in the necessary information.
  */
  async integrationField(fieldData,fieldType) {
      let fieldArName = fieldData.getArabicFieldName();
      await this.integrationDataList(fieldArName);
      var fieldCreated =await this.creationField(fieldData, fieldType); 
      return fieldCreated ; 
  }

}
