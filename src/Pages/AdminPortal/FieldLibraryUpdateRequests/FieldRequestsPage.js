import Constants from '../../../Utils/Constants.js';
const { FieldPage } = require("./FieldPage");
const { SearchPage } = require("../../SharedPages/SearchPage.js");
const { PopUpPage } = require("../../SharedPages/PopUpPage.js");
const { UploadFilePage } = require('../../SharedPages/UploadFilePage.js');


export class FieldRequestsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.uploadFilePage = new UploadFilePage(page);
        this.fieldPage = new FieldPage(this.page);

        this.defineNewFieldButton = '//button[contains(text(),"تعريف حقل جديد")]';
        
        // Define locators for different field types
        this.integrationFieldBtn = '//ul[contains(@class,"MuiMenu-list")]//li[1]';
        this.inputFieldBtn = '//ul[contains(@class,"MuiMenu-list")]//li[2]';
        this.calculationFieldBtn = '//ul[contains(@class,"MuiMenu-list")]//li[3]';
        this.complexFieldBtn = '//ul[contains(@class,"MuiMenu-list")]//li[4]';
        this.groupFieldBtn = '//ul[contains(@class,"MuiMenu-list")]//li[5]';    
        this.searchInput ='//form[@data-testid="search-input"]//input';
        this.justification='//div[@class="form-control ui fluid selection dropdown"]';
        this.justificationList ='(//*[@role="listbox"]//*[contains(@id,"item-choice-1")])'
        this.sendRequestBtn = `//button[contains(text(),"${global.testConfig.createField.sendRequestBtnTxt}")]`;
        this.fullFinalMegLocator = '//span[@data-testid="modal-title"]';
        this.confirmSendMeg = '//button[@data-testid="confirmation-modal-primary-button"]';

        //addinng field Inside 
        this.tableActions='table-actions';

        this.uploadBtnXPath = '//div[@data-testid="dropzone"]';
    }
    async navigateToFieldPage(fieldData) {
        // Get the field type
        let fieldType = fieldData.getFieldType();

        // Get Specific Locator
        let fieldLocator; 
        switch (fieldType) {
            case Constants.INTEGRATION_FIELD:
                fieldLocator = this.integrationFieldBtn;
                break;
            case Constants.INPUT_FIELD:
                fieldLocator = this.inputFieldBtn;
                break;
            case Constants.INPUT_LOOKUP_FIELD:
                fieldLocator = this.inputFieldBtn;
                break;
            case Constants.CALCULATION_FIELD:
                fieldLocator = this.calculationFieldBtn;
                break;
            case Constants.COMPLEX_FIELD:
                fieldLocator = this.complexFieldBtn;
                break;
            case Constants.GROUP_FIELD:
                fieldLocator = this.groupFieldBtn ;
                break;
        }
       // await this.page.waitForTimeout(10000);
        // Click on the field Btn
        await this.page.waitForSelector(this.defineNewFieldButton, {state: "visible",timeout: 5000});
        await this.page.click(this.defineNewFieldButton);
        await this.page.waitForSelector(fieldLocator, { state: "visible", timeout: 5000 });
        await this.page.click(fieldLocator);
        console.log(`Clicked on ${fieldType} field.`);
    }

    async createField(fieldData ) {
        let fieldType = fieldData.getFieldType();
        await this.page.waitForTimeout(2000);
        await this.navigateToFieldPage(fieldData);
        
        if ([Constants.GROUP_FIELD,Constants.INPUT_FIELD, Constants.COMPLEX_FIELD,Constants.INPUT_LOOKUP_FIELD].includes(fieldType)) {
            var result = await this.fieldPage.creationField(fieldData, fieldType);
            return result ;
        } 
        else if ([Constants.CALCULATION_FIELD].includes(fieldType)) {
            var result = await this.fieldPage.calculationField(fieldData, fieldType);
            return result ;
        }   
        else if ([Constants.INTEGRATION_FIELD].includes(fieldType)) { 
            var result = await this.fieldPage.integrationField(fieldData, fieldType);
            return result ;
        }  
    }

    

    /**
     * Verifies the details of a specific field, ensuring the Arabic and English names match the expected values.
     * @param {object} fieldData - The field data object containing expected names and details.
     * @returns {Promise<boolean>} - Returns true if the field details match the expected values; otherwise, false.
     */
    async checkFieldRowDetails(fieldData) {
        // Search for the specific field using its Arabic name
        let fieldRow = [];
        let fieldName = fieldData.getArabicFieldName()
        //await this.page.waitForTimeout(5000); 
        fieldRow = await this.search.searchOnUniqueRow( this.searchInput, fieldName);

        // Extract Arabic and English names
        let actualArabicName = await fieldRow[1].tdLocator.locator("span").textContent();
        let actualEnglishName = await fieldRow[2].tdLocator.locator("span").textContent();

        // Compare extracted values with expected values
        if (
            actualArabicName.trim() === fieldData.getArabicFieldName().trim() &&
            actualEnglishName.trim() === fieldData.getEnglishFieldName().trim()
        ) {
            console.log("Field names matched successfully.");
            // Store the created field ID
            let fieldId = await fieldRow[0].tdLocator.textContent();
            fieldData.setCreatedFieldId(fieldId.trim());
            console.log(`Created Field ID set in FieldData: ${fieldId.trim()}`);
            return fieldId;
        }
        console.log("Field name verification failed.");
        return false;
    }

    async sendRequestToApproval(fieldData) {

        let fieldType = fieldData.getFieldType();
        if ([Constants.CALCULATION_FIELD].includes(fieldType)) {
            var fileName = 'test.pdf';
            await this.uploadFilePage.uploadFile(fileName, null , Constants.VERIFY_FILE_UPLOADED);
            console.log('File upload competed');
        }           
        await this.page.waitForTimeout(2000);
        await this.page.click(this.justification);
        console.log('justification list displayed');
        await this.page.waitForTimeout(2000);
         await this.page.waitForSelector(this.justificationList, { visible: true,timeout:50000 });
        var optionsLocator = this.page.locator(this.justificationList);
        await optionsLocator.first().waitFor({ state: "visible", timeout: 5000 });
        await optionsLocator.first().click({ force: true });
        await this.page.keyboard.press("Tab");
        await this.page.click(this.sendRequestBtn);
        var getRequestNumber = await this.getRequestNumber(this.fullFinalMegLocator);
        var popUpMsg = new PopUpPage(this.page);
        if (getRequestNumber)
            {await popUpMsg.popUpMessage( this.confirmSendMeg,global.testConfig.createField.sendFieldMsg); 
            return getRequestNumber}
        else return false;
    }

/**
 * Extracts the full request number from a given message locator.
 * @param {string} messageLocator - The XPath or selector of the message containing the request number.
 * @returns {Promise<string|null>} - Returns the full extracted request number (e.g., "ISR_Freq_000001015") or null if not found.
 */
async getRequestNumber(messageLocator) {
    const messageText = await this.page.locator(messageLocator).textContent();
    if (messageText) {
        // Extract the full request number using regex
        const match = messageText.match(/ISR_Freq_\d{9}/); 
        if (match) {
            console.log(`Extracted Request Number: ${match[0]}`);
            return match[0]; // Return the request number
        }
    }
}

async addFieldFromInside(fieldID ) {
    let taskRow = [];
    taskRow = await this.search.getRowInTableWithSpecificText(fieldID);
    var actionlocator = "button:nth-of-type(2)";
    await this.search.clickRowAction(taskRow,this.tableActions, actionlocator);
    console.log(`Add button (+) clicked sucessfully` );
}

}
module.exports = {  FieldRequestsPage };

