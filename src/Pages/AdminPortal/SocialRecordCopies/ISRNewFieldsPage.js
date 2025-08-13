const { PopUpPage } = require('../../SharedPages/PopUpPage');
const { SocialRecordCopiesPage } = require("../SocialRecordCopies/SocialRecordCopiesPage");
const { SearchPage } = require('../../SharedPages/SearchPage');

export class ISRNewFieldsPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);
        this.socialRecordCopiesPage = new SocialRecordCopiesPage(this.page);
        this.searchPage = new SearchPage(this.page);

        this.fieldListOption = '(//input[@type="radio"])';
        this.fieldArName = '//tbody[@data-testid="table-body"]//tr[last()]//td[2]//span';
        this.proceedButton = '//button[@data-testid="next-button"]';
        this.lastPageButton = '(//nav[@data-testid="pagination"]//li)';
        this.searchInput = '//input[@data-testid="search-input-base"]';
        this.restrictedRadioBtn = '//input[@value="RESTRICTED"]';

        //popup
        this.popUpOkButton = '//button[@data-testid="modal-primary-button"]';
    }


    async getFieldArNameText(socialRecordCopiesData) {
        var fieldArNameText = await this.page.$eval(this.fieldArName, element => element.textContent);
        socialRecordCopiesData.setFieldArName(fieldArNameText);
    }
    async addNewRegistryFields(socialRecordCopiesData, fieldEnglishName) {
        console.log("start Adding New Registry Fields");
        await this.socialRecordCopiesPage.clickAddNewRegistryFieldsButton();
        await this.searchPage.searchOnUniqueRow(this.searchInput, fieldEnglishName);
        await this.page.click(this.fieldListOption);
        await this.getFieldArNameText(socialRecordCopiesData);
        await this.page.waitForSelector(this.proceedButton, { state: "visible", timeout: 60000 });
        await this.page.click(this.proceedButton);
        await this.page.waitForSelector(this.restrictedRadioBtn, { state: "visible", timeout: 60000 });
        await this.page.click(this.restrictedRadioBtn);
        await this.socialRecordCopiesPage.clickOnPersonalizationSettings();
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(this.proceedButton, { state: "visible", timeout: 60000 });
        await this.page.click(this.proceedButton);
       // await this.socialRecordCopiesPage.validatePersonaizeSettingsFields();
        
        await this.page.waitForSelector(this.proceedButton, { state: "visible", timeout: 60000 });
        await this.page.click(this.proceedButton);
        var popupResult = await this.popUpMsg.popUpMessage(this.popUpOkButton, global.testConfig.SocialRecordCopies.ISRaddNewFieldSuccessMsg);
        console.log("Add New Registry Fields completed");
        return popupResult;
    }




}
module.exports = { ISRNewFieldsPage };