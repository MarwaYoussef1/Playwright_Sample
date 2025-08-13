const { PopUpPage } = require('../../SharedPages/PopUpPage');

export class SocialRecordCopiesPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);
        this.createdArVersionName = null;
        this.createdEnVersionName = null;
        this.createdActivationDate = null;
        this.createdactivationDateForApplicant = null;
        this.createdactivationDateForPrograms = null;

        this.ArVersionNameField = '//input[@name="data[schemaNameAr]"]';
        this.EnVersionNameField = '//input[@name="data[schemaNameEn]"]';
        this.activationDateForApplicant = '//input[@name="data[activatedAtForApplicant]"]//parent::div';
        this.activationDateForPrograms = '//input[@name="data[activatedAtForProgram]"]//parent::div';
        this.activationDate = '//input[@name="data[activatedAt]"]//parent::div';
        this.todayDate = '//div[contains(@class, "open")]//span[@class="flatpickr-day today"]';
        this.nextMonthBtn = '//div[contains(@class, "open")]//span[@class="flatpickr-next-month"]';
        this.firstDayOfNextMonth = '(//div[contains(@class, "open")]//span[@class="flatpickr-day"])[1]';
        this.futureDate = '//div[contains(@class, "open")]//span[@class="flatpickr-day today"]/following-sibling::span[12]';
        this.saveSchemeDataButton = '//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary")]';
        //this.addNewRegistryFieldsButton = '(//div[contains(@class, "MuiGrid-root MuiGrid-item MuiGrid")]//button)[2]';
        this.addNewRegistryFieldsButton = '//button[text()="إضافة حقول جديدة للنسخة"]';
        this.attachmentsAndJustificationsRecordTab = '//button[@data-testid="tab-2"]';
        this.justificationDdl = '//div[@class="choices form-group formio-choices"]';
        this.justificationFirstOption = '//div[@data-id="1"]';
        this.sendUpdatesForApprovalButton = '(//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary")])[2]';
        this.addedFieldArName = '//div[contains(@class, "uiGrid-root MuiGrid-container MuiGrid-spacing")]//span[contains(@class, "MuiTypography-root MuiTypography-p-md-bold")]';
        this.addedFieldTag = '//div[contains(@class, "uiGrid-root MuiGrid-container MuiGrid-spacing")]//span[contains(@class, "MuiTypography-root MuiTypography-p-sm muirtl")]';
        this.existFieldsTable = '//tbody[@data-testid="table-body"]';

        this.existingFieldArName = '//tbody[@data-testid="table-body"]/tr[1]//td[2]//span';
        this.existingFieldViewBtn = '(//div[@data-testid="table-actions"])[1]//button[1]';
        this.existingFieldId = '(//div[@ref="value"])[1]';
        this.existingFieldEditBtn = '(//div[@data-testid="table-actions"])[1]//button[2]';
        this.restrictedRadioBtn = '//input[@value="RESTRICTED"]';
        this.updateSettingsBtn = '//button[contains(@class, "MuiButton-containedPrimary")]';

        //popup
        this.popUpOkButton = '//button[@data-testid="modal-primary-button"]';

        //PersonalizationSettings
        this.ShowInApplicantPortalBtn = '//input[@name="data[enabled1]"]';
        this.ShowInOperatingPortalBtn = '//input[@name="data[enabled2]"]';
        this.ShowInAdministrationPortalBtn = '//input[@name="data[enabled3]"]';
        this.AddFieldToFormOneMandatory = '(//input[contains(@id,"MANDATORY")])[1]';
        this.AddFieldToFormTwoMandatory = '(//input[contains(@id,"MANDATORY")])[2]';
        this.AddFieldToFormThreeMandatory = '(//input[contains(@id,"MANDATORY")])[3]';
        this.validateShowInApplicantPortal = '(//*[contains(@ref,"nested-fieldSet1")]//*[contains(@class,"formio-component-checkbox")])[1]//*[@ref="value"]';
        this.validateShowInOperatingPortal = '(//*[contains(@ref,"nested-fieldSet1")]//*[contains(@class,"formio-component-checkbox")])[2]//*[@ref="value"]';
        this.validateShowInAdministrationPortal = '(//*[contains(@ref,"nested-fieldSet1")]//*[contains(@class,"formio-component-checkbox")])[3]//*[@ref="value"]';
        this.validateAddFieldToFormOneMandatory = '//*[contains(@class,"formio-component-addField1")]//*[@ref="value"]';
        this.validateAddFieldToFormTwoMandatory = '//*[contains(@class,"formio-component-addField2")]//*[@ref="value"]';
        this.validateAddFieldToFormThreeMandatory = '//*[contains(@class,"formio-component-addField3")]//*[@ref="value"]';
        this.moreOptionBtn = '(//div[@data-testid="three-dots-menu"]/button)[2]';
        this.PersonlizeSettingsTab = '//button[@data-testid="tab-3"]';
        this.viewBtn = '//span[@class="MuiTypography-root MuiTypography-body1 muirtl-1db281m"]';
    }

    /**
   * Fills the New Schema Data with the information provided in the socialRecordCopiesData object.
   * @param {Object} socialRecordCopiesData - The data object containing New Schema information.
   * @returns {Promise<void>} A promise that resolves when the social Record Copies Data definition information has been filled.
   */
    async fillNewSchemaData(socialRecordCopiesData) {
        console.log("Start filling New Schema Data");
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(this.ArVersionNameField, { state: "visible", timeout: 20000 });
        this.createdArVersionName = socialRecordCopiesData.getVersionArabicName();
        this.createdEnVersionName = socialRecordCopiesData.getVersionEnglishName();

        await this.page.fill(this.ArVersionNameField, this.createdArVersionName);
        await this.page.fill(this.EnVersionNameField, this.createdEnVersionName);
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(this.activationDate, { state: 'visible' });
        console.log('activationDateis visible')
        await this.page.click(this.activationDate);
        await this.page.waitForSelector(this.todayDate, { state: 'visible' });
        console.log('todayDate visible')
        await this.page.click(this.todayDate);
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(this.activationDateForApplicant, { state: 'visible' });
        console.log('activationDateForApplicant is visible')
        await this.page.click(this.activationDateForApplicant);
        await this.page.waitForSelector(this.nextMonthBtn, { state: 'visible' });
        console.log('nextMonthBtn is visible')
        await this.page.click(this.nextMonthBtn);
        await this.page.click(this.firstDayOfNextMonth);
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(this.activationDateForPrograms, { state: 'visible' });
        console.log('activationDateForPrograms is visible')
        await this.page.click(this.activationDateForPrograms);
        await this.page.waitForSelector(this.nextMonthBtn, { state: 'visible' });
        console.log('nextMonthBtn is visible')
        await this.page.click(this.nextMonthBtn);
        await this.page.click(this.firstDayOfNextMonth);
        socialRecordCopiesData.setVersionArabicName(this.createdArVersionName);
        socialRecordCopiesData.setVersionEnglishName(this.createdEnVersionName);
        socialRecordCopiesData.setActivationDate(this.createdActivationDate);
        await this.page.click(this.saveSchemeDataButton);
        console.log("End filling New Schema Data");
    }

    async changeViewingFieldIntoRestricted(socialRecordCopiesData) {

        await this.page.waitForSelector(this.existingFieldArName, { state: "visible", timeout: 60000 });
        var existingFieldChangedToRestrictedArName = await this.page.$eval(this.existingFieldArName, element => element.textContent);
        socialRecordCopiesData.setExistingFieldChangedToRestrictedArName(existingFieldChangedToRestrictedArName);
        console.log("Existing Field that changed to Restricted Arabic Name: " + socialRecordCopiesData.getExistingFieldChangedToRestrictedArName(existingFieldChangedToRestrictedArName));

        //view the existing field and get it's ID
        await this.page.waitForSelector(this.existingFieldViewBtn, { state: "visible", timeout: 60000 });
        await this.page.click(this.existingFieldViewBtn);
        await this.page.waitForSelector(this.existingFieldId, { state: "visible", timeout: 60000 });
        var existingFieldId = await this.page.$eval(this.existingFieldId, element => element.textContent);
        socialRecordCopiesData.setExistingFieldId(existingFieldId);
        console.log("Existing Field that changed to Restricted Arabic Name: " + socialRecordCopiesData.getExistingFieldId(existingFieldId));
        await this.page.goBack(); // browser back to the previous page

        await this.page.waitForSelector(this.existingFieldEditBtn, { state: "visible", timeout: 60000 });
        await this.page.click(this.existingFieldEditBtn);
        await this.page.waitForSelector(this.restrictedRadioBtn, { state: "visible", timeout: 60000 });
        // this.page.waitForTimeout(2000);
        await this.page.click(this.restrictedRadioBtn);
        await this.page.waitForSelector(this.updateSettingsBtn, { state: "visible", timeout: 60000 });
        await this.page.waitForTimeout(2000);
        await this.page.click(this.updateSettingsBtn);
        var popUpResult = await this.popUpMsg.popUpMessage(this.popUpOkButton, global.testConfig.SocialRecordCopies.restrictedFieldSuccessMsg);
        return popUpResult;
    }

    async clickAddNewRegistryFieldsButton() {
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.addNewRegistryFieldsButton, { state: "visible", timeout: 60000 });
        await this.page.click(this.addNewRegistryFieldsButton);
    }

    async clickOnPersonalizationSettings() {
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.ShowInAdministrationPortalBtn, { state: "visible", timeout: 60000 });
        await this.page.click(this.ShowInAdministrationPortalBtn);
        await this.page.waitForSelector(this.ShowInApplicantPortalBtn, { state: "visible", timeout: 60000 });
        await this.page.click(this.ShowInApplicantPortalBtn);
        await this.page.waitForSelector(this.ShowInOperatingPortalBtn, { state: "visible", timeout: 60000 });
        await this.page.click(this.ShowInOperatingPortalBtn);
        console.log('Clicking personalization settings...');
    }

    async validatePersonaizeSettingsFields() {
        // Wait for visibility and get text
          await this.page.waitForTimeout(5000);
        const applicantPortalText = await this.page.textContent(this.validateShowInApplicantPortal, {
            state: 'visible',
            timeout: 60000 // adjust as needed
        });
        const operatingPortalText = await this.page.textContent(this.validateShowInOperatingPortal, {
            state: 'visible',
            timeout: 60000 // adjust as needed
        });
        const administrationPortalText = await this.page.textContent(this.validateShowInAdministrationPortal, {
            state: 'visible',
            timeout: 60000 
        });
        const formOneMandatoryText = await this.page.textContent(this.validateAddFieldToFormOneMandatory, {
            state: 'visible',
            timeout: 60000 
        });
        const formTwoMandatoryText = await this.page.textContent(this.validateAddFieldToFormTwoMandatory, {
            state: 'visible',
            timeout: 60000 
        });
        const formThreeMandatoryText = await this.page.textContent(this.validateAddFieldToFormThreeMandatory, {
            state: 'visible',
            timeout: 60000 
        });

        
        if (
            applicantPortalText.trim() !== global.testConfig.SocialRecordCopies.YesText ||
            operatingPortalText.trim() !== global.testConfig.SocialRecordCopies.YesText ||
            administrationPortalText.trim() !== global.testConfig.SocialRecordCopies.YesText
        ) {
            throw new Error('One of the "Show in Portal" fields is not set to "نعم"');
        }

       if (
  !formOneMandatoryText.trim().includes(global.testConfig.SocialRecordCopies.MandatoryText) ||
  !formTwoMandatoryText.trim().includes(global.testConfig.SocialRecordCopies.MandatoryText) ||
  !formThreeMandatoryText.trim().includes(global.testConfig.SocialRecordCopies.MandatoryText)
) {
  throw new Error('One of the mandatory form fields is not set to "إجباري"');
}
        console.log('All PersonalizationSettings portal and mandatory field validations passed successfully.');
        
    }

    async validateNewFieldAdded(socialRecordCopiesData) {
        var expectedFieldArName = socialRecordCopiesData.getFieldArName();
        var expectedFieldTag = global.testConfig.SocialRecordCopies.newAddedFieldTag;
        await this.page.waitForTimeout(1000);
        const addedFieldArNames = await this.page.$$eval(this.addedFieldArName, elements => elements.map(e => e.textContent));
        var actualFieldArName = addedFieldArNames[addedFieldArNames.length - 1];
        const addedFieldTags = await this.page.$$eval(this.addedFieldTag, elements => elements.map(e => e.textContent));
        var actualFieldTag = addedFieldTags[addedFieldTags.length - 1];

        if (actualFieldArName === expectedFieldArName &&
            actualFieldTag === expectedFieldTag) {
            console.log("New Field data matched expectations Successfully");
            return true;
        }
        return false;
    }

    async checkPersonalizationSettingsAfterRowAdded() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(this.existingFieldViewBtn, { state: "visible", timeout: 60000 });
        await this.page.click(this.existingFieldViewBtn);
        await this.page.waitForSelector(this.PersonlizeSettingsTab, { state: "visible", timeout: 60000 });
        await this.page.click(this.PersonlizeSettingsTab);
        await this.validatePersonaizeSettingsFields();
        console.log('Clicking view button for added new row and validate PersonalizationSettings Fields Visibility And Mandatory ...');
    }



    async navigateToAttachmentsAndJustificationsRecordTab() {
        await this.page.waitForSelector(this.attachmentsAndJustificationsRecordTab, { state: "visible", timeout: 60000 });
        await this.page.click(this.attachmentsAndJustificationsRecordTab);
    }
    async addJustification() {
        await this.navigateToAttachmentsAndJustificationsRecordTab();

        await this.page.click(this.justificationDdl);
        await this.page.waitForSelector(this.justificationFirstOption, { state: "visible", timeout: 60000 });
        await this.page.click(this.justificationFirstOption);
        await this.page.waitForSelector(this.sendUpdatesForApprovalButton, { state: "visible", timeout: 60000 });
        await this.page.click(this.sendUpdatesForApprovalButton);
        var popUpResult = await this.popUpMsg.popUpMessage(this.popUpOkButton, global.testConfig.SocialRecordCopies.schemaUpdateSuccessMsg);
        return popUpResult;
    }

    /**
 * Extracts text from the <span> inside the second <td> of each row in a table.
 *
 * @param {string} tableLocator - The locator for the table body.
 * @returns {Promise<string[]>} - An array of extracted text values.
 */
    async getExistingFieldsData(socialRecordCopiesData) {
        const rows = await this.page.locator(`${this.existFieldsTable}//tr`);
        const rowCount = await rows.count();
        const actualFieldsCount = await rows.count() + 1;
        let textValues = [];

        // for (let i = 0; i < rowCount; i++) {
        //     const text = await rows.nth(i).locator('td:nth-child(2) span').innerText();
        //     console.log("Existing Fields Arabic Names:");
        //     console.log(`Row ${i + 1}: ${text}`);
        //     textValues.push(text);
        // }
        socialRecordCopiesData.setRowCount(actualFieldsCount);
        console.log("Existing Fields Rows Count = " + actualFieldsCount);
        socialRecordCopiesData.setExistingFieldsArName(textValues);
        return true;
    }




}
module.exports = { SocialRecordCopiesPage };