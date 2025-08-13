const { SearchPage } = require("../../SharedPages/SearchPage");
const { ViewSocialRecordRequestUpdatePage } = require("./ViewSocialRecordRequestUpdatePage");
import Constants from '../../../Utils/Constants.js';

export class RequestUpdateSocialRecordCopiesPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.viewSocialRecordRequestUpdatePage = new ViewSocialRecordRequestUpdatePage(this.page);

        this.searchInput = '//input[@data-testid="search-input-base"]';
        this.requestUpdateSocialRecordCopiesTab = '//a[@data-testid="submenu-social-record-copies-requests"]';
        this.tableActions = 'table-actions';
        
    }

    async getTaskNumberForISRCopy(socialRecordCopiesData) {
        await this.page.click(this.requestUpdateSocialRecordCopiesTab);
        let isrTaskNumberTd;

        let isrTaskNumber;
        let isrTasksRows = [];
        isrTasksRows = await this.search.getFirstRow();

        isrTaskNumberTd = isrTasksRows[0].tdLocator;
        isrTaskNumber = isrTaskNumberTd.locator("span");
        await isrTaskNumber.waitFor({ state: "visible" });
        var taskNumberForIsrCopy = await isrTaskNumber.textContent();
        socialRecordCopiesData.setIsrTaskNumber(taskNumberForIsrCopy);
        //return taskNumberForIsrCopy in variable

        console.log("Task Number For ISR Copy: ", socialRecordCopiesData.getIsrTaskNumber());

    }


    async verifyRequestStatus(requestNumber, actionType) {
        let requestStatusTd;
        let requestStatus;

        let socialRecordCopiesTableRow = [];
        socialRecordCopiesTableRow = await this.search.searchOnUniqueRow(this.searchInput, requestNumber);
        if (socialRecordCopiesTableRow && socialRecordCopiesTableRow.length > 0) {
            requestStatusTd = socialRecordCopiesTableRow[4].tdLocator;
            requestStatus = requestStatusTd.locator("span");
            await requestStatus.waitFor({ state: "visible" });
            var actualRequestStatus = await requestStatus.textContent();

            console.log("Actual Request Status: ", actualRequestStatus);
            console.log("Expected Request Status: ", global.testConfig.SocialRecordCopies.socialRecordCopyStatusCompleted);
        }
        if (actionType === Constants.REJECT) {
            if (
                actualRequestStatus === global.testConfig.SocialRecordCopies.socialRecordCopyStatusCompleted
            ) {
                console.log("Request Status matched successfully.");
                return true;
            }
            return false;
        }
        if (actionType === Constants.APPROVE) {
            if (
                actualRequestStatus === global.testConfig.SocialRecordCopies.socialRecordCopyStatusExecute
            ) {
                console.log("Request Status matched successfully.");
                return true;
            }
            return false;
        }

    }

    async ensureFieldChangedInCustomizeSettings(socialRecordCopiesData) {
        let requestsRows = [];

        requestsRows = await this.search.getRowInTableWithSpecificText(socialRecordCopiesData.getIsrTaskNumber());
        var actionlocator = "button";
        if (requestsRows && requestsRows.length > 0) {
            await this.search.clickRowAction(requestsRows, this.tableActions, actionlocator);
            await this.page.waitForTimeout(5000);
            console.log("Request Page is opened successfully.");
        }

        return await this.viewSocialRecordRequestUpdatePage.ensureFieldsInCustomizeSettings(socialRecordCopiesData);
    }




}
module.exports = { RequestUpdateSocialRecordCopiesPage };