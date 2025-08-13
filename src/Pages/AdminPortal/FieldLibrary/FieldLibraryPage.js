import Constants from '../../../Utils/Constants';

const { PopUpPage } = require('../../SharedPages/PopUpPage');

export class FieldLibraryPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);

        this.fieldEnablementToggle = '//label[@class="form-check-label label-position-right"]';
        this.activate_deactivateFieldLibraryAlertMsg = '//div[@role="alert"]//span';
        //popup
        this.successPopupTitle = '//span[@data-testid="modal-title"]';
        this.popUpYesButton = '//button[@data-testid="confirmation-modal-primary-button"]';

        this.fieldRecordFourthTab = '//button[@data-testid="tab-4"]';
        this.fieldRecordThirdTab = '//button[@data-testid="tab-3"]';
        // this.fieldEnablmentStatus ='//div[contains(@class,"formio-component-status") and contains(@class,"formio-component-textfield")]//div[@ref="value"]';
        this.fieldEnablmentStatus ='//*[contains(@class,"status")][2]';
    }

        /**
     * Toggles the activation status of a field library entry.
     * @param {string} confirmationMessage - The confirmation message to expect.
     * @param {string} successMessage - The success message to expect.
     * @param {string} expectedAlertMessage - The expected alert message.
     * @returns {Promise<boolean>} - A promise that resolves to true if the action is successful, otherwise false.
     */
    async toggleFieldLibraryEntry(confirmationMessage, successMessage, expectedAlertMessage) {
        await this.page.waitForSelector(this.activate_deactivateFieldLibraryAlertMsg, {state: "detached"});
        await this.page.click(this.fieldEnablementToggle);
        var popUpMsgResult = await this.popUpMsg.popUpMessage(this.popUpYesButton, confirmationMessage);
        if (popUpMsgResult === true) {
            console.log("Toggle button is now " + (successMessage === global.testConfig.FieldLibrary.fieldActivatedSuccessMsg ? "Activated" : "Deactivated"));
           // await this.page.waitForSelector(this.activate_deactivateFieldLibraryAlertMsg, {state: "visible"});
            var actualSuccessMsg = `${this.activate_deactivateFieldLibraryAlertMsg}[contains(normalize-space(.), "${expectedAlertMessage}")]`;
            await this.page.waitForSelector(actualSuccessMsg, { visible: true, timeout: 50000 });
            console.log("Expected message" + expectedAlertMessage);
            return true;
            /*        
    var actualSuccessMsg = await (await this.page.$(this.activate_deactivateFieldLibraryAlertMsg)).textContent();
            if (actualSuccessMsg === expectedAlertMessage) {
                return true;
            }
            return false;*/
        }
        return false;
    }

    async checkInsideFieldStatus(expectedFieldStatus ,fieldType ) {

        let fieldTabLocator;

        if ([Constants.INPUT_FIELD ,Constants.CALCULATION_FIELD,Constants.INTEGRATION_FIELD,Constants.INPUT_LOOKUP_FIELD].includes(fieldType)) {
            fieldTabLocator = this.page.locator(this.fieldRecordThirdTab);
        } else  if ([ Constants.GROUP_FIELD ,Constants.COMPLEX_FIELD].includes(fieldType)) {
                fieldTabLocator = this.page.locator(this.fieldRecordFourthTab);
        }

        
        await fieldTabLocator.waitFor({ state: 'visible', timeout: 30000 });
        await fieldTabLocator.click();
    
        const fieldStatus = this.page.locator(this.fieldEnablmentStatus);
        await fieldStatus.waitFor({ state: 'visible', timeout: 30000 });
    
        const actualStatus = (await fieldStatus.textContent()).trim();
    
        if (actualStatus === expectedFieldStatus.trim()) {
            console.log(`Enablement status is as expected: "${actualStatus}".`);
            return true;
        } else {
            console.error(`Enablement status mismatch. Expected: "${expectedFieldStatus}", Found: "${actualStatus}".`);
            return false;
        }
    }
    

}
module.exports = { FieldLibraryPage };