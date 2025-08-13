const { expect } = require('@playwright/test');
const { SearchPage } = require("../../SharedPages/SearchPage");
const { LookupPage } = require("../../AdminPortal/Lookups/LookupPage");
const { UploadLookupItemsPage } = require("../../AdminPortal/Lookups/UploadLookupItemsPage");
const { UploadFilePage } = require('../../SharedPages/UploadFilePage.js');

export class LookupsManagmentPage {
    constructor(page) {
        this.page = page;
        this.lookupPage = new LookupPage(this.page);
        this.search = new SearchPage(this.page);
        this.uploadLookupItemsPage = new UploadLookupItemsPage(this.page);
        this.uploadFilePage = new UploadFilePage(this.page);

        this.addButton = '//button[@data-testid="add-new-lookup"]';
        this.addLookupItemTab = '//button[@id="simple-tab-0"]';
        this.lookupItemsUploadTab = '//button[@id="simple-tab-1"]';
        this.attachButton = '//button[@data-testid="tooltip-button"]';
        this.invalidUploadErrorMsg = '//span[contains(text(),"تحميل ملف الأخطاء")]';
        this.validUploadSuccessMsg = '//span[contains(text(),"تم اضافه عنصر ")]';
        this.existFieldsTable = '//tbody[@data-testid="table-body"]';


    }

    /**
     * Creates a new lookup entry by filling in the necessary information.
     * @param {Object} lookupData - The data required to create the lookup.
     * @returns {Promise<void>} - Resolves when the lookup creation process is complete.
     */
    async createNewLookup(lookupData, formIO) {
        await this.clickAddButton();
        return await this.lookupPage.createNewLookup(lookupData, formIO);
    }

    /**
     * Edits an existing lookup entry by interacting with the UI elements.
     * @param {Object} lookupData - The data required to identify and edit the lookup.
     * @returns {Promise<void>} - Returns a promise that resolves when the lookup has been edited and verified.
     */
    async editLookup(lookupData) {
        var lookupEdited = false;
        await this.clickEditLookupButton(lookupData);
        console.log('Edit Lookup Button Clicked');
        if (await this.lookupPage.addNewLookupItem()) {
            console.log('New Lookup Item Added');
            lookupEdited = await this.lookupPage.viewNewLookupItemDetails();
            console.log('New Lookup Item Details Viewed');
        }
        return lookupEdited;

    }

    /**
     * Validates that the View Lookup page is opened.
     * @param {Object} lookupData - The data required to identify the lookup.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async viewLookupDetails(lookupData) {
        await this.clickViewLookUpButton(lookupData);
        console.log('View Lookup Data Button Clicked');
        return await this.lookupPage.validateLookupDetails(lookupData);
    }

    /**
     * Clicks the "Add" button on the Lookups Management Page
     * @returns {Promise<void>} - A promise that resolves when the button has been clicked.
     */
    async clickAddButton() {
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(this.addButton, { visible: true });
        await this.page.click(this.addButton);
    }

    /**
     * Clicks the "View" button for a specific lookup entry in the lookup table.
     * @param {Object} lookupData - The data object containing information about the lookup entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async clickViewLookUpButton(lookupData) {
        let lookupRow = [];
        lookupRow = await this.search.getRowInTableWithSpecificText(lookupData.getCreatedLookupId());
        var actionlocator = "view-lookup";
        await this.search.clickRowAction(lookupRow, actionlocator, null);
    }

    /**
     * Clicks the edit button for a specific lookup entry in the lookup table.
     * @param {Object} lookupData - The data object containing information about the lookup entry.
     * @returns {Promise<void>} - A promise that resolves when the edit button has been clicked.
     */
    async clickEditLookupButton(lookupData) {
        let lookupRow = [];
        lookupRow = await this.search.getRowInTableWithSpecificText(lookupData.getCreatedLookupId());
        var actionlocator = "edit-lookup";
        await this.search.clickRowAction(lookupRow, actionlocator, null);
    }

    /**
     * Checks if a new lookup has been added successfully by verifying the Arabic name, English name, and status.
     * @param {Object} lookupData - The data of the lookup to be checked.
     * @returns {Promise<boolean>} - Returns true if the lookup names and status match the expected values, otherwise false.
     */
    async checkNewLookupAdded(lookupData) {
        let arabicTd;
        let englishTd;
        let statusTd;
        let lookupArabicName;
        let lookupEnglishName;
        let lookupStatus;
        let lookupRow = [];
        lookupRow = await this.search.getRowInTableWithSpecificText(lookupData.getLookupEnglishName());

        if (lookupRow && lookupRow.length > 0) {
            arabicTd = lookupRow[1].tdLocator;
            lookupArabicName = arabicTd.locator("span");
            await lookupArabicName.waitFor({ state: "visible" });
            var actualLookupArabicName = await lookupArabicName.textContent();

            console.log("Actual Arabic Name: ", actualLookupArabicName);
            console.log("Expected Arabic Name: ", lookupData.getLookupArabicName());

            englishTd = lookupRow[2].tdLocator;
            lookupEnglishName = englishTd.locator("span");
            await lookupEnglishName.waitFor({ state: "visible" });
            var actualLookupEnglishName = await lookupEnglishName.textContent();

            console.log("Actual English Name: ", actualLookupEnglishName);
            console.log("Expected English Name: ", lookupData.getLookupEnglishName());

            statusTd = lookupRow[9].tdLocator;
            lookupStatus = statusTd.locator("span");
            await lookupStatus.waitFor({ state: "visible" });
            var actualLookupStatus = await lookupStatus.textContent();

            console.log("Actual Status: ", actualLookupStatus);
            console.log("Expected Status: ", global.testConfig.lookUps.lookUpStatusActive);
        }

        if (
            actualLookupArabicName === lookupData.getLookupArabicName() &&
            actualLookupEnglishName === lookupData.getLookupEnglishName() &&
            actualLookupStatus === global.testConfig.lookUps.lookUpStatusActive
        ) {
            console.log("Lookup names matched successfully.");
            let lookupId = await lookupRow[0].tdLocator.textContent();
            lookupData.setCreatedLookupId(lookupId);
            console.log("Created Lookup ID set in LookupData: " + lookupData.getCreatedLookupId());
            return true;
        }
        return false;
    }

    async uploadInvalidLookUpItems(lookupData) {
        await this.clickEditLookupButton(lookupData);
        await this.page.waitForTimeout(2000);
        let result= await this.uploadLookupItemsPage.uploadInvalidLookUpItems();
        await this.page.click(this.addLookupItemTab);
        await this.page.click(this.lookupItemsUploadTab);
        return result;
    }

    async uploadValidLookUpItems(lookupData) {
        //await this.clickEditLookupButton(lookupData);
        await this.page.waitForTimeout(2000);
        return await this.uploadLookupItemsPage.uploadValidLookUpItems();
    }

    async uploadLookUpItems(lookupData) {
        await this.clickEditLookupButton(lookupData);
        await this.page.waitForTimeout(2000);
        await this.page.click(this.lookupItemsUploadTab)
        if (await this.page.waitForSelector(this.attachButton, { state: "visible", timeout: 20000 })) {
            const rowsCountBeforeUpload = await this.page.locator(`${this.existFieldsTable}//tr`).count();
            await this.uploadFilePage.uploadFile(global.testConfig.lookUps.invalidLookupItemsCSV, this.attachButton);
            await this.page.waitForSelector(this.invalidUploadErrorMsg, { state: "visible", timeout: 20000 });
            console.log('Invalid Lookup Items error message shown');
            await this.page.click(this.addLookupItemTab);
            await this.page.click(this.lookupItemsUploadTab);
            await this.page.waitForSelector(this.attachButton, { state: "visible", timeout: 20000 });
            await this.uploadFilePage.uploadFile(global.testConfig.lookUps.validLookupItemsCSV, this.attachButton);
            await this.page.waitForSelector(this.validUploadSuccessMsg, { state: "visible", timeout: 20000 });
            console.log('valid Lookup Items success message shown');
            await this.page.waitForTimeout(2000);
            const rowsCountAfterUpload = await this.page.locator(`${this.existFieldsTable}//tr`).count();
            console.log(`Lookup Items before upload: ${rowsCountBeforeUpload}`);
            console.log(`Lookup Items after upload: ${rowsCountAfterUpload}`);
            if (rowsCountAfterUpload > rowsCountBeforeUpload) {
                return true;
            }
        }
        return false;
    }
}
module.exports = { LookupsManagmentPage };
