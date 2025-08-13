const { SearchPage } = require("../../SharedPages/SearchPage");
const { SocialRecordCopiesPage } = require("../SocialRecordCopies/SocialRecordCopiesPage");
export class ViewSocialRecordRequestUpdatePage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.socialRecordCopiesPage = new SocialRecordCopiesPage(this.page);
        this.tableActions = 'table-actions';
        this.isrSettingsTab = '//button[@data-testid="tab-3"]';
        this.privilegeViewingFieldRestrictedData = '(//div[@ref="value"])[4]';
    }
    
    
        async ensureFieldsInCustomizeSettings(socialRecordCopiesData) {
        let fieldRow = [];
        fieldRow = await this.search.getRowInTableWithSpecificText(socialRecordCopiesData.getFieldArName());
        var actionlocator = "button";
        if (fieldRow && fieldRow.length > 0) {
            await this.search.clickRowAction(fieldRow, this.tableActions, actionlocator);
            console.log("Field Page is opened successfully.");
        }
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(this.isrSettingsTab, { state: 'visible', timeout: 5000 });
        await this.page.click(this.isrSettingsTab);
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(this.privilegeViewingFieldRestrictedData, { state: 'visible', timeout: 5000 });
        var actualFieldPrivilegeViewingStatus = await (await this.page.$(this.privilegeViewingFieldRestrictedData)).textContent();
        if (actualFieldPrivilegeViewingStatus.trim() === global.testConfig.FieldLibrary.fieldStatusRestricted) {
            console.log(`Privilege Viewing Field Status is as expected: "${actualFieldPrivilegeViewingStatus.trim()}"`);
            await this.socialRecordCopiesPage.validatePersonaizeSettingsFields();
            console.log('All PersonalizationSettings portal and mandatory field validations passed successfully.');
            return true;
        } else {
            console.error(`Privilege Viewing Field Status mismatch. Expected: "${global.testConfig.FieldLibrary.fieldStatusRestricted}", Found: "${actualFieldPrivilegeViewingStatus.trim()}"`);
            return false;
        }

    }

}
module.exports = { ViewSocialRecordRequestUpdatePage };