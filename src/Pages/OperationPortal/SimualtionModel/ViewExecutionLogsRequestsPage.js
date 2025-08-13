const { SearchPage } = require("../../SharedPages/SearchPage");

export class ViewExecutionLogsRequestsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);

        this.viewButton = '(//button[@data-testid="table-action-Eye"])[1]';
        this.requestStatus = `(//span[contains(text(),"${global.testConfig.taskDetails.Approved}")])[3]`;
    }

    async verifyExecutionLog(request) {
        let executionStatusTd;

        let executionStatus;
        let simulationModelRow = [];
        //await this.page.waitForTimeout(5000);
        simulationModelRow = await this.search.getRowInTableWithSpecificText(request);

        if (simulationModelRow && simulationModelRow.length > 0) {
            executionStatusTd = simulationModelRow[3].tdLocator;
            executionStatus = executionStatusTd.locator("span");
            await executionStatus.waitFor({ state: "visible" });
            var actualExecutionStatus = await executionStatus.textContent();

            console.log("Actual Execution Status: ", actualExecutionStatus);
            console.log("Expected Execution Status: ", global.testConfig.taskDetails.Approved);
        }
        if (actualExecutionStatus === global.testConfig.taskDetails.Approved) {
            console.log("Simulation Model Execution is Approved and Checked in the Execution Logs successfully.");
            await this.page.click(this.viewButton);
            console.log("View Button is Clicked");
            await this.page.waitForTimeout(3000);
            await this.page.waitForSelector(this.requestStatus, { state: "visible" });
            console.log("Request Details Viewed Successfully");
            return true;
        }
        return false;
    }

    async getExecutionNumber(request, simulationModelData){
        let executionNumberTd;

        let executionNumber;
        let simulationModelRow = [];
        await this.page.waitForTimeout(5000);
        simulationModelRow = await this.search.getRowInTableWithSpecificText(request);

        if (simulationModelRow && simulationModelRow.length > 0) {
            executionNumberTd = simulationModelRow[0].tdLocator;
            executionNumber = executionNumberTd.locator("span");
            await executionNumber.waitFor({ state: "visible" });
            var simulationModelExecutionNumber = await executionNumber.textContent();
            console.log("Execution Number for Simulation Model: ", simulationModelExecutionNumber);
            simulationModelData.setSimulationModelExecutionNumber(simulationModelExecutionNumber);
            return true;
        }
        return false;

    }
}


module.exports = { ViewExecutionLogsRequestsPage };