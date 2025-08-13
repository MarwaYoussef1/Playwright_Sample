const { SearchPage } = require("../../SharedPages/SearchPage");
const { PopUpPage } = require('../../SharedPages/PopUpPage');


export class SimulationModelVersionsViewPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.popUpMsg = new PopUpPage(this.page);

        //popup
        //this.popUpYesButton = '//button[@data-testid="modal-primary-button"]';
        this.popUpYesButton = '//button[contains(text(),"نعم، إرسال!")]';
        this.popUpGotoExecutions = '//button[contains(text(),"العودة إلى سجلات التنفيذ")]';
        this.searchInput = '//form[@data-testid="search-input"]//input';
        this.sendForApprovalButton = '//button[@data-testid="table-action-[object Object]"]';

        //filter
        this.filterButton = '//button[@data-testid="toolbar-filter-button"]';
        this.beneficiaryPartyDdl = '//div[@id="mui-component-select-beneficiaryParty"]';
        this.beneficiaryPartyOption2 = '//li[@data-value="a2"]';
        this.showResultsButton = '//button[@data-testid="submit-button"]';
    }

    /**
 * Clicks the "View" button for a specific State Machine entry in the simulationModel table.
 * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
 * @returns {Promise<void>} - A promise that resolves when the action is completed.
 */
    async verifySimualtionModelsActiveAndEdited(simulationModelData, simulationModelstatusActive, simulationModelstatusInactive) {
        let arabicTd;
        let englishTd;
        let statusTd;
        let activationStatusTd;

        let simulationModelArabicName;
        let simulationModelEnglishName;
        let simulationModelStatus;
        let simulationModelActivationStatus;
        let simulationModelRow = [];
        if (simulationModelstatusInactive) {
            simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelEditedId());
            if (simulationModelRow && simulationModelRow.length > 0) {
                arabicTd = simulationModelRow[1].tdLocator;
                simulationModelArabicName = arabicTd.locator("span");
                await simulationModelArabicName.waitFor({ state: "visible" });
                var actualSimulationModelArabicName = await simulationModelArabicName.textContent();

                console.log("Actual Arabic Name: ", actualSimulationModelArabicName);
                console.log("Expected Arabic Name: ", simulationModelData.getSimulationModelArName());

                englishTd = simulationModelRow[2].tdLocator;
                simulationModelEnglishName = englishTd.locator("span");
                await simulationModelEnglishName.waitFor({ state: "visible" });
                var actualSimulationModelEnglishName = await simulationModelEnglishName.textContent();

                console.log("Actual English Name: ", actualSimulationModelEnglishName);
                console.log("Expected English Name: ", simulationModelData.getSimulationModelEnName());

                statusTd = simulationModelRow[8].tdLocator;
                simulationModelStatus = statusTd.locator("span");
                await simulationModelStatus.waitFor({ state: "visible" });
                var actualSimulationModelStatus = await simulationModelStatus.textContent();

                console.log("Actual Status: ", actualSimulationModelStatus);

                activationStatusTd = simulationModelRow[9].tdLocator;
                simulationModelActivationStatus = activationStatusTd.locator("span");
                await simulationModelActivationStatus.waitFor({ state: "visible" });
                var actualSimulationModelActivationStatus = await simulationModelActivationStatus.textContent();

                console.log("Actual Activation Status: ", actualSimulationModelActivationStatus);

                if (
                    actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                    actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                    actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusCreated &&
                    actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusDisabled
                ) {
                    console.log("Simulation Model Information matched successfully.");
                }
            }
            else {
                console.log("Simulation Model Row length = " + simulationModelRow.length);
            }
        }
        if (simulationModelstatusActive) {
            simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelId());
            if (simulationModelRow && simulationModelRow.length > 0) {
                arabicTd = simulationModelRow[1].tdLocator;
                simulationModelArabicName = arabicTd.locator("span");
                await simulationModelArabicName.waitFor({ state: "visible" });
                var actualSimulationModelArabicName = await simulationModelArabicName.textContent();

                console.log("Actual Arabic Name: ", actualSimulationModelArabicName);
                console.log("Expected Arabic Name: ", simulationModelData.getSimulationModelArName());

                englishTd = simulationModelRow[2].tdLocator;
                simulationModelEnglishName = englishTd.locator("span");
                await simulationModelEnglishName.waitFor({ state: "visible" });
                var actualSimulationModelEnglishName = await simulationModelEnglishName.textContent();

                console.log("Actual English Name: ", actualSimulationModelEnglishName);
                console.log("Expected English Name: ", simulationModelData.getSimulationModelEnName());

                statusTd = simulationModelRow[8].tdLocator;
                simulationModelStatus = statusTd.locator("span");
                await simulationModelStatus.waitFor({ state: "visible" });
                var actualSimulationModelStatus = await simulationModelStatus.textContent();

                console.log("Actual Status: ", actualSimulationModelStatus);

                activationStatusTd = simulationModelRow[9].tdLocator;
                simulationModelActivationStatus = activationStatusTd.locator("span");
                await simulationModelActivationStatus.waitFor({ state: "visible" });
                var actualSimulationModelActivationStatus = await simulationModelActivationStatus.textContent();

                console.log("Actual Activation Status: ", actualSimulationModelActivationStatus);

                if (
                    actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                    actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                    actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusReady &&
                    actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusEnabled

                ) {
                    console.log("Simulation Model Information matched successfully.");
                    return true;
                }
                return false;
            }
            else {
                console.log("Simulation Model Row length = " + simulationModelRow.length);
            }
        }
    }

    async checkNumberOfExecutions(simulationModelData) {
        let numberOfExecutionsTd;

        let numberOfExecutions;
        let simulationModelRow = [];
        //await this.page.waitForTimeout(5000);
        simulationModelRow = await this.search.getRowInTableWithSpecificText(simulationModelData.getSimulationModelArName());

        if (simulationModelRow && simulationModelRow.length > 0) {
            numberOfExecutionsTd = simulationModelRow[10].tdLocator;
            numberOfExecutions = numberOfExecutionsTd.locator("span");
            await numberOfExecutions.waitFor({ state: "visible" });
            var actualNumberOfExecutions = await numberOfExecutions.textContent();
            var expectedNumberOfExecutions = "2";

            console.log("Actual Number Of Executions: ", actualNumberOfExecutions);
            console.log("Expected Number Of Executions: ", expectedNumberOfExecutions);
        }
        if (actualNumberOfExecutions === expectedNumberOfExecutions) {
            console.log("Number of Executions for Simulation Model matched successfully.");
            return true;
        }
        return false;
    }

    async clickSendForApprovalButton() {
        await this.page.click(this.sendForApprovalButton);
        console.log('Simulaion Model Execution Send For Approval Button Clicked');
        await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.SendForApprovalConfirmationMsg);
        var popupResult = await this.popUpMsg.popUpMessage(this.popUpGotoExecutions, global.testConfig.SimulationModels.SendForApprovalSuccessMsg);
        return popupResult;
    }

    /**
 * Clicks the "View" button for a specific State Machine entry in the simulationModel table.
 * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
 * @returns {Promise<void>} - A promise that resolves when the action is completed.
 */
    async filterSimulationModelVersions(simulationModelData) {
        let arabicTd;
        let englishTd;
        let statusTd;
        let activationStatusTd;

        let simulationModelArabicName;
        let simulationModelEnglishName;
        let simulationModelStatus;
        let simulationModelActivationStatus;
        let simulationModelRow = [];
        simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getSimulationModelArName());
        await this.page.click(this.filterButton);
        await this.page.waitForSelector(this.beneficiaryPartyDdl, { state: "visible", timeout: 5000 });
        await this.page.click(this.beneficiaryPartyDdl);
        await this.page.waitForSelector(this.beneficiaryPartyOption2, { state: "visible", timeout: 5000 });
        await this.page.click(this.beneficiaryPartyOption2);
        await this.page.click(this.showResultsButton);
        await this.page.waitForTimeout(2000);

        if (simulationModelRow && simulationModelRow.length > 0) {
            arabicTd = simulationModelRow[1].tdLocator;
            simulationModelArabicName = arabicTd.locator("span");
            await simulationModelArabicName.waitFor({ state: "visible" });
            var actualSimulationModelArabicName = await simulationModelArabicName.textContent();

            console.log("Actual Arabic Name: ", actualSimulationModelArabicName);
            console.log("Expected Arabic Name: ", simulationModelData.getSimulationModelArName());

            englishTd = simulationModelRow[2].tdLocator;
            simulationModelEnglishName = englishTd.locator("span");
            await simulationModelEnglishName.waitFor({ state: "visible" });
            var actualSimulationModelEnglishName = await simulationModelEnglishName.textContent();

            console.log("Actual English Name: ", actualSimulationModelEnglishName);
            console.log("Expected English Name: ", simulationModelData.getSimulationModelEnName());

            statusTd = simulationModelRow[8].tdLocator;
            simulationModelStatus = statusTd.locator("span");
            await simulationModelStatus.waitFor({ state: "visible" });
            var actualSimulationModelStatus = await simulationModelStatus.textContent();

            console.log("Actual Status: ", actualSimulationModelStatus);

            activationStatusTd = simulationModelRow[9].tdLocator;
            simulationModelActivationStatus = activationStatusTd.locator("span");
            await simulationModelActivationStatus.waitFor({ state: "visible" });
            var actualSimulationModelActivationStatus = await simulationModelActivationStatus.textContent();

            console.log("Actual Activation Status: ", actualSimulationModelActivationStatus);

            if (
                actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusReady &&
                actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusEnabled
            ) {
                console.log("Simulation Model Information matched successfully.");
                return true;
            }
        }
        else {
            console.log("Simulation Model Row length = " + simulationModelRow.length);
            return false;
        }
    }
}
module.exports = { SimulationModelVersionsViewPage };