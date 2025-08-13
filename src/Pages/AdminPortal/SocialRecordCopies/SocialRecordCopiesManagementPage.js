const { SearchPage } = require("../../SharedPages/SearchPage");
const { PopUpPage } = require('../../SharedPages/PopUpPage');
const { SocialRecordCopiesPage } = require("../SocialRecordCopies/SocialRecordCopiesPage");
const { ISRNewFieldsPage } = require("../SocialRecordCopies/ISRNewFieldsPage");


export class SocialRecordCopiesManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.popUpMsg = new PopUpPage(this.page);
        this.socialRecordCopiesPage = new SocialRecordCopiesPage(this.page);
        this.iSRNewFieldsPage = new ISRNewFieldsPage(this.page);
        this.searchInput = '//input[@data-testid="search-input-base"]';
        this.arVersionName = '//tbody[@data-testid="table-body"]//td[3]';
        this.enVersionName = '//tbody[@data-testid="table-body"]//td[4]';
        this.socialRecordCopyStatus = '//div[@data-testid="tag"]';

        this.editButton = '//div[@data-testid="table-actions"]//button[2]';
        this.deleteButton = '//div[@data-testid="table-actions"]//button[3]';
        this.viewButton = '//div[@data-testid="table-actions"]//button[1]';

        this.recordCopyDataTab = '//button[@data-testid="tab-1"]';
        this.recordCopyTab = '//button[@data-testid="tab-2"]';

        //popup
        this.successPopupTitle = '//span[@data-testid="modal-title"]';
        this.popUpYesButton = '//button[@data-testid="confirmation-modal-primary-button"]';
        this.backToSocialRecordCopiesButton = '//button[@data-testid="modal-primary-button"]';

        //table
        this.existFieldsTable = '//tbody[@data-testid="table-body"]';
        this.nextButton = '//button[@data-testid="paginationItem" and @aria-label="Go to next page"]';

        this.requestUpdateSocialRecordCopiesTab = '//a[@data-testid="submenu-social-record-copies-requests"]';

    }


    /**
     * Add a new Draft Social Record Copy
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async addDraftCopy(socialRecordCopiesData) {
        let socialRecordCopiesTableRow = [];
        socialRecordCopiesTableRow = await this.search.searchOnUniqueRow(this.searchInput, global.testConfig.SocialRecordCopies.socialRecordActiveCopy);
        if (socialRecordCopiesTableRow && socialRecordCopiesTableRow.length > 0) {
            var actualSocialRecordActiveCopyStatus = await (await this.page.$(this.socialRecordCopyStatus)).textContent();
        }
        if (actualSocialRecordActiveCopyStatus === global.testConfig.SocialRecordCopies.socialRecordActiveStatus) {
            console.log("Social Record Copy Status is Active");
            await this.page.click(this.editButton);
            if (await this.page.isVisible(this.successPopupTitle)) {
                await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SocialRecordCopies.existingDraftCopyIsAlreadyExistMsg);
            }
            await this.socialRecordCopiesPage.fillNewSchemaData(socialRecordCopiesData);
            return true;
        }
        return false;
    }

    /**
     * Delete a Draft Social Record Copy
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async deleteDraftCopy(socialRecordCopiesData) {
        let socialRecordCopiesTableRow = [];
        socialRecordCopiesTableRow = await this.search.searchOnUniqueRow(this.searchInput, socialRecordCopiesData.getVersionArabicName());
        if (socialRecordCopiesTableRow && socialRecordCopiesTableRow.length > 0) {
            var actualArVersionName = await (await this.page.$(this.arVersionName)).textContent();
            var actualEnVersionName = await (await this.page.$(this.enVersionName)).textContent();
            var actualSocialRecordActiveCopyStatus = await (await this.page.$(this.socialRecordCopyStatus)).textContent();
        }
        if (actualSocialRecordActiveCopyStatus === global.testConfig.SocialRecordCopies.socialRecordDraftStatus &&
            actualArVersionName === socialRecordCopiesData.getVersionArabicName() &&
            actualEnVersionName === socialRecordCopiesData.getVersionEnglishName()

        ) {
            console.log("Social Record Copy is Draft");
            await this.page.click(this.deleteButton);
            await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SocialRecordCopies.deleteDraftSocialRecordCopyMsg);
            await this.popUpMsg.popUpMessage(this.backToSocialRecordCopiesButton, global.testConfig.SocialRecordCopies.deleteDraftSocialRecordCopyConfirmationMsg);
            return true;
        }
        return false;
    }

    async addNewFieldsToISRCopy(socialRecordCopiesData, fieldEnglishName) {
        let socialRecordCopiesTableRow = [];
        socialRecordCopiesTableRow = await this.search.searchOnUniqueRow(this.searchInput, global.testConfig.SocialRecordCopies.socialRecordActiveCopy);
        if (socialRecordCopiesTableRow && socialRecordCopiesTableRow.length > 0) {
            var actualSocialRecordActiveCopyStatus = await (await this.page.$(this.socialRecordCopyStatus)).textContent();
        }
        if (actualSocialRecordActiveCopyStatus === global.testConfig.SocialRecordCopies.socialRecordActiveStatus) {
            console.log("Social Record Copy Status is Active");
            await this.page.click(this.editButton);
            if (await this.page.isVisible(this.successPopupTitle)) {
                await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SocialRecordCopies.existingDraftCopyIsAlreadyExistMsg);
            }
            await this.socialRecordCopiesPage.fillNewSchemaData(socialRecordCopiesData);
            //await this.socialRecordCopiesPage.changeViewingFieldIntoRestricted(socialRecordCopiesData);
            await this.iSRNewFieldsPage.addNewRegistryFields(socialRecordCopiesData, fieldEnglishName);
            await this.socialRecordCopiesPage.validateNewFieldAdded(socialRecordCopiesData);
            //await this.socialRecordCopiesPage.getExistingFieldsData(socialRecordCopiesData);
            await this.socialRecordCopiesPage.addJustification();
           // await this.socialRecordCopiesPage.checkPersonalizationSettingsAfterRowAdded();
        }
        socialRecordCopiesTableRow = await this.search.searchOnUniqueRow(this.searchInput, socialRecordCopiesData.getVersionArabicName());
        if (socialRecordCopiesTableRow && socialRecordCopiesTableRow.length > 0) {
            var actualArVersionName = await (await this.page.$(this.arVersionName)).textContent();
            var actualEnVersionName = await (await this.page.$(this.enVersionName)).textContent();
            var actualSocialRecordActiveCopyStatus = await (await this.page.$(this.socialRecordCopyStatus)).textContent();
        }
        if (actualSocialRecordActiveCopyStatus === global.testConfig.SocialRecordCopies.socialRecordUnderReviewStatus &&
            actualArVersionName === socialRecordCopiesData.getVersionArabicName() &&
            actualEnVersionName === socialRecordCopiesData.getVersionEnglishName()

        ) {
            var ConcatenatedEnName = actualEnVersionName
                .split(' ')
                .map((word, index) => 
                    index === 0 
                        ? word.charAt(0).toLowerCase() + word.slice(1).toLowerCase() 
                        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join('');
            console.log("Concatenated English Name: ", ConcatenatedEnName);
            socialRecordCopiesData.setVersionEnConcatenatedName(ConcatenatedEnName);
            console.log("Social Record Copy is Draft");
            return true;
        }
        return false;
    }

    async verifyIsrDetails(socialRecordCopiesData) {
        await this.page.click(this.viewButton);
        await this.page.waitForSelector(this.recordCopyDataTab, { state: "visible", timeout: 20000 });
        var actualRecordCopyArName = `(//span[contains(text(),"${socialRecordCopiesData.getVersionArabicName()}")])[2]`;
        if (await this.page.waitForSelector(actualRecordCopyArName, { state: "visible", timeout: 20000 })) {
            console.log('Record Copy Arabic Name Matched');
            console.log('Record Copy Data Verified Successfully');
            await this.page.click(this.recordCopyTab);
            var actualRecordCopyStatus = `//span[contains(text(),"${global.testConfig.SocialRecordCopies.socialRecordUnderReviewStatus}")]`;
            if (await this.page.waitForSelector(actualRecordCopyStatus, { state: "visible", timeout: 20000 })) {
                console.log('Record Copy Status is ' + global.testConfig.SocialRecordCopies.socialRecordUnderReviewStatus);
                console.log('Record Copy Data Verified Successfully');
                await this.verifyRecordFieldsExist(socialRecordCopiesData);
                await this.socialRecordCopiesPage.checkPersonalizationSettingsAfterRowAdded();
                return true;
            }
        }
        return false;
    }

    async verifyRecordFieldsExist(socialRecordCopiesData) {
       /*
        let totalRowCount = 0;
        let hasNextPage = true;

        while (hasNextPage) {
            // Count the rows on the current page
            const rowsOnCurrentPage = await this.page.locator(`${this.existFieldsTable}//tr`);
            //totalRowCount += rowsOnCurrentPage.length;
            totalRowCount += await rowsOnCurrentPage.count();

            // Check if the "Next" button is enabled nextButton
            const nextButton = await this.page.locator(`${this.nextButton}`);
            if (nextButton && await nextButton.isEnabled()) {
                await nextButton.click();
                await this.page.waitForTimeout(1000); // Wait for the next page to load
            } else {
                hasNextPage = false;
            }
        }

        if (totalRowCount === socialRecordCopiesData.getRowCount()) {
            console.log('Row count matches the expected value which is ' + totalRowCount);
        } else {
            console.log(`Row count mismatch. Expected: ${socialRecordCopiesData.getRowCount()}, Found: ${totalRowCount}`);
        }*/
        let socialRecordFieldsTableRow = [];
        socialRecordFieldsTableRow = await this.search.searchOnUniqueRow(this.searchInput, socialRecordCopiesData.getFieldArName());
        if (socialRecordFieldsTableRow && socialRecordFieldsTableRow.length > 0) {
            console.log(`New Added Record Field ${socialRecordCopiesData.getFieldArName()} exist`);
        }
       

    }

   

}
module.exports = { SocialRecordCopiesManagementPage };