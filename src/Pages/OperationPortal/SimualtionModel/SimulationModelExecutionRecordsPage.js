const { SearchPage } = require("../../SharedPages/SearchPage");


export class SimulationModelExecutionRecordsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);

        this.searchInput = '//form[@data-testid="search-input"]//input';
    }

    /**
 * Clicks the "View" button for a specific State Machine entry in the simulationModel table.
 * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
 * @returns {Promise<void>} - A promise that resolves when the action is completed.
 */
    async verifySimualtionModelExecutionRecord(executionRecordNewAdded) {
        let executionRecordStatusTd;

        let executionRecordStatus;
        let simulationModelExecutionModelRow = [];
        if (executionRecordNewAdded) {
            simulationModelExecutionModelRow = await this.search.getFirstRow();
            executionRecordStatusTd = simulationModelExecutionModelRow[3].tdLocator;
            executionRecordStatus = executionRecordStatusTd.locator("span");
            await executionRecordStatus.waitFor({ state: "visible" });
            var actualExecutionRecordStatus = await executionRecordStatus.textContent();

            console.log("Actual Execution Record Status: ", actualExecutionRecordStatus);
            console.log("Expected Execution Record Status: ", global.testConfig.SimulationModels.executionRecordStatusInProgress);

            if (actualExecutionRecordStatus === global.testConfig.SimulationModels.executionRecordStatusInProgress) {
                console.log("Simulation Model Execution Record Status is In Progress");
                console.log("Start waiting for status to change to Completed");
                await this.page.waitForTimeout(90000);
                console.log("End Waiting");
                await this.page.reload();
            }
            simulationModelExecutionModelRow = await this.search.getFirstRow();
            executionRecordStatusTd = simulationModelExecutionModelRow[3].tdLocator;
            executionRecordStatus = executionRecordStatusTd.locator("span");
            await executionRecordStatus.waitFor({ state: "visible" });
            var actualExecutionRecordStatus = await executionRecordStatus.textContent();

            console.log("Actual Execution Record Status: ", actualExecutionRecordStatus);
            console.log("Expected Execution Record Status: ", global.testConfig.SimulationModels.executionRecordStatusCompleted);

            if (actualExecutionRecordStatus === global.testConfig.SimulationModels.executionRecordStatusCompleted) {
                console.log("Simulation Model Execution Record Status is Completed");
                return true;
            }
        }
        else
            return false;
    }
}
module.exports = { SimulationModelExecutionRecordsPage };