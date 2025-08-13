const { SearchPage } = require("../../SharedPages/SearchPage");

export class ApprovedExecutionLogsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);

        this.viewButton = '(//button[@data-testid="table-action-Eye"])[1]';
    }

    async verifyExecutionRequestInApprovedLogs(request) {
        let simulationModelRow = [];
        //await this.page.waitForTimeout(5000);
        simulationModelRow = await this.search.getRowInTableWithSpecificText(request);

        if (simulationModelRow && simulationModelRow.length > 0) {
            console.log("Simulation Model Execution is exeist in Approved Execution Logs page.");
            await this.page.click(this.viewButton);
            console.log("View Button is Clicked");
            var actualSimulationModelArName = `(//span[contains(text(),"${request}")])[1]`;
            console.log("Actual Simulation Model Arabic Name: "+ `(//span[contains(text(),"${request}")])[1]`);
            await this.page.waitForSelector(actualSimulationModelArName, { state: "visible" });
            return true;
        }
        return false;
    }
}


module.exports = { ApprovedExecutionLogsPage };