import Constants from '../../../Utils/Constants';

const { SearchPage } = require("../../SharedPages/SearchPage");
const { FieldLibraryPage } = require("../FieldLibrary/FieldLibraryPage");


export class FieldLibraryManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.fieldLibraryPage = new FieldLibraryPage(this.page);
        this.tableActions = 'table-actions';
        this.searchInputSelector = '//form[@data-testid="search-input"]//input';

        this.allFieldsTab = '//button[@data-testid="tab-1"]';
        this.approvedFieldsTab = '//button[@data-testid="tab-2"]';
        this.rejectedFieldsTab = '//button[@data-testid="tab-4"]';
        this.searchInput = '//input[@data-testid="search-input-base"]';
        this.threeDotsMenu = '//div[@data-testid="three-dots-menu"]';
        this.activate_deactivate_Button = '//li[@data-testid="three-dots-menu-option-0"]';
        this.fieldEnablementStatus = '//div[@data-testid="tag"]';
    }

    async verifyUserCanManageFieldLibrary() {
        if (await this.page.locator(this.threeDotsMenu).first().isVisible()) {
            return true;
        }
        return false;
    }

    async navigateToApprovedFieldsTab() {
        await this.page.click(this.approvedFieldsTab);
    }

    async navigateToRejectedFieldsTab() {
        await this.page.click(this.rejectedFieldsTab);
    }

    async navigateToAllFieldsTab() {
        await this.page.click(this.allFieldsTab);
    }

        /**
    * Toggles the activation status of a field library entry.
    * @param {string} fieldName - The name of the field to toggle.
    * @param {boolean} isLocked - Whether the field is locked or not.
    * @returns {Promise<void>} - A promise that resolves when the action is completed.
    */
    async toggleFieldLibraryEntry(fieldName, isLocked) {
        let fieldLibraryTableRow = [];
        fieldLibraryTableRow = await this.search.searchOnUniqueRow(this.searchInput, fieldName);
        if (fieldLibraryTableRow && fieldLibraryTableRow.length > 0) {
            var actualFieldEnablementStatus = await (await this.page.$(this.fieldEnablementStatus)).textContent();
        }
        if (actualFieldEnablementStatus === global.testConfig.FieldLibrary.fieldEnablementStatusDeactivated) {
            console.log("field Enablement Status is Deactivated");
            await this.page.click(this.threeDotsMenu);
            await this.page.click(this.activate_deactivate_Button);
            var result = await this.fieldLibraryPage.toggleFieldLibraryEntry(global.testConfig.FieldLibrary.activateConfirmationMsg, global.testConfig.FieldLibrary.fieldActivatedSuccessMsg, global.testConfig.FieldLibrary.fieldActivatedSuccessMsg);
            return result;
        } else if (actualFieldEnablementStatus === global.testConfig.FieldLibrary.fieldEnablementStatusActivated) {
            console.log("field Enablement Status is Activated");
            await this.page.click(this.threeDotsMenu);
            await this.page.click(this.activate_deactivate_Button);
            if (isLocked) {
                var result = await this.fieldLibraryPage.toggleFieldLibraryEntry(global.testConfig.FieldLibrary.deactivateConfirmationMsgForLockedField, global.testConfig.FieldLibrary.fieldDeactivatedSuccessMsg, global.testConfig.FieldLibrary.fieldActivationErrorMsg);
            } else {
                var result = await this.fieldLibraryPage.toggleFieldLibraryEntry(global.testConfig.FieldLibrary.deactivateConfirmationMsg, global.testConfig.FieldLibrary.fieldDeactivatedSuccessMsg, global.testConfig.FieldLibrary.fieldDeactivatedSuccessMsg);
            }
            return result;
        }
    }

    async checkFieldStatusDetails(fieldMap) {
        let lastTab = null;

        const FIELD_TYPE_MAPPING = {
            [global.testConfig.FieldLibrary.calculated] : Constants.CALCULATION_FIELD,  
            [global.testConfig.FieldLibrary.input] : Constants.INPUT_FIELD,             
            [global.testConfig.FieldLibrary.input] : Constants.INPUT_LOOKUP_FIELD ,              
            [global.testConfig.FieldLibrary.group] : Constants.GROUP_FIELD,          
            [global.testConfig.FieldLibrary.complex] : Constants.COMPLEX_FIELD ,   
            [global.testConfig.FieldLibrary.integration] : Constants.INTEGRATION_FIELD 
        };

        for (const [fieldId, actionType] of fieldMap.entries()) {    
             // Check if we need to switch tabs
            if (lastTab && lastTab !== actionType) {
                console.log("Switching tab detected, navigating to All Fields tab first...");
                await this.navigateToAllFieldsTab(); // Ensure a reset before switching tabs
                }

            if (actionType === Constants.APPROVE) {
                await this.navigateToApprovedFieldsTab();
            } else if (actionType === Constants.REJECT) {
                await this.navigateToRejectedFieldsTab();}
    
            lastTab = actionType; // Update last visited tab

            await this.page.waitForSelector(this.searchInputSelector, { state: 'visible', timeout: 30000 });
    
            // Search for the field row
            const fieldRow = await this.search.searchOnUniqueRow(this.searchInputSelector, fieldId);
            console.log(`Field row found for ID: ${fieldId}`);
    
            var actualFieldType = (await fieldRow[6].tdLocator.textContent()).trim();
            let fieldType = FIELD_TYPE_MAPPING[actualFieldType];
            console.log(`The Field Type for field ID: ${fieldId} is ${fieldType}`);

            const actionCell = fieldRow[fieldRow.length - 1].tdLocator;
            const actionButton = actionCell.locator('[data-testid="table-actions"]');
    
            await actionButton.waitFor({ state: 'visible', timeout: 30000 });
            console.log(`Clicking action button for field ID: ${fieldId}`);
    
            // Get current URL before clicking
            const currentUrl = this.page.url();
            await actionButton.click();
    
            await this.page.waitForFunction((oldUrl) => window.location.href !== oldUrl,
                currentUrl, { timeout: 10000 }
            ).catch(() => {
                throw new Error(`Field details page did NOT load for field ID: ${fieldId}. Aborting.`);
            });
    
            console.log(`URL changed. Field details page loaded for ID: ${fieldId}`);
    
            const expectedStatus = actionType === Constants.APPROVE
                ? global.testConfig.FieldLibrary.fieldEnablementStatusActivated
                : global.testConfig.FieldLibrary.fieldEnablementStatusDeactivated;
    
            await this.fieldLibraryPage.checkInsideFieldStatus(expectedStatus ,fieldType);
            console.log(`Field status checked for ID: ${fieldId}`);
    
            await this.page.goBack();
            await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    
            console.log(`Returned from details page for field ID: ${fieldId}`);
        }
    
        return true;
    }
    
    
}
module.exports = { FieldLibraryManagementPage };