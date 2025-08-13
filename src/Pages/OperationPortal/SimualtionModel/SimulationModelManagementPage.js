const { SearchPage } = require("../../SharedPages/SearchPage");
const { PopUpPage } = require('../../SharedPages/PopUpPage');
const { SimualtionModelPage } = require("../SimualtionModel/SimualtionModelPage");
const { SimualtionModelDetailsPage } = require("../SimualtionModel/SimualtionModelDetailsPage");
const { SimulationModelVersionsViewPage } = require("../SimualtionModel/SimulationModelVersionsViewPage");
const { SimulationModelEditVariablesPage } = require("../SimualtionModel/SimulationModelEditVariablesPage");
const { SimulationModelExecutionRecordsPage } = require("../SimualtionModel/SimulationModelExecutionRecordsPage");
const { ViewExecutionLogsRequestsPage } = require("../SimualtionModel/ViewExecutionLogsRequestsPage");
const { ApprovedExecutionLogsPage } = require("../SimualtionModel/ApprovedExecutionLogsPage");


export class SimulationModelManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.popUpMsg = new PopUpPage(this.page);
        this.simualtionModelPage = new SimualtionModelPage(this.page);
        this.simualtionModelDetailsPage = new SimualtionModelDetailsPage(this.page);
        this.simulationModelVersionsViewPage = new SimulationModelVersionsViewPage(this.page);
        this.simulationModelEditVariablesPage = new SimulationModelEditVariablesPage(this.page);
        this.simulationModelExecutionRecordsPage = new SimulationModelExecutionRecordsPage(this.page);
        this.viewExecutionLogsRequestsPage = new ViewExecutionLogsRequestsPage(this.page);
        this.approvedExecutionLogsPage = new ApprovedExecutionLogsPage(this.page);

        //Execution Popups buttons
        this.popUpExecuteRexecuteButton = "//button[contains(text(),'تنفيذ النموذج')]";
        this.popUpGotoExecutions = "//button[contains(text(),'استعراض سجلات التنفيذ')]";
        this.popUpYesButton = '//button[@data-testid="modal-primary-button"]';
        this.defineSimulationModelButton = '//button[@data-testid="define-simulation-model"]';
        this.searchInput = '//form[@data-testid="search-input"]//input';
        this.threeDotsMenu = '//div[@data-testid="three-dots-menu"]';
        this.activate_deactivate_Button = '//li[@data-testid="three-dots-menu-option-0"]';
        this.fieldEnablementStatus = '//div[@data-testid="tag"]';
        this.tableActions = '(//div[contains(@class, "MuiStack-root")])[38]';

        this.viewButton = '(//button[@data-testid="table-action-Eye"])[1]';
        this.editButton = '(//button[@data-testid="table-action-Edit2"])[1]';
        this.ThreeDotsActionsButton = '(//button[@data-testid="three-dots-menu"])[1]';
        this.ModelVersionsButton = '//span[@data-testid="three-dots-menu-item-3"]';
        this.editVariablesButton = '//span[@data-testid="three-dots-menu-item-1"]';
        this.executeSimulationModelButton = '//span[@data-testid="three-dots-menu-item-0"]';

        //filter
        this.filterButton = '//button[@data-testid="toolbar-filter-button"]';
        this.beneficiaryPartyDdl = '//div[@id="mui-component-select-beneficiaryParty"]';
        this.beneficiaryPartyOption2 = '//li[@data-value="a2"]';
        this.showResultsButton = '//button[@data-testid="submit-button"]';

        //draft Simulation Model tab
        this.draftSimulationModelTab = '//button[@data-testid="tab-1"]';
        this.deleteDraftButton = '(//button[@data-testid="table-action-Trash"])[1]';
        this.editDraftButton = '(//button[@data-testid="table-action-Edit2"])[1]';
        this.deleteSuccessMsg = '//div[contains(@class, "MuiAlert-message")]//span';
    }

    async clickDefineSimulationModel() {
        await this.page.waitForTimeout(2000);
        await this.page.click(this.defineSimulationModelButton);
    }
    async clickDraftSimulationModelTab() {
        await this.page.click(this.draftSimulationModelTab);
        await this.page.waitForTimeout(1000);
    }
    async defineSimulationModel(simulationModelData) {
        await this.clickDefineSimulationModel();
        return await this.simualtionModelPage.fillSimulationModelInfo(simulationModelData);
    }
    async defineSimulationModelAsDraft(simulationModelData) {
        await this.clickDraftSimulationModelTab();
        await this.clickDefineSimulationModel();
        let firstTabFilling = await this.simualtionModelPage.fillModelDataTab(simulationModelData);
        let saveAsDraftClicikng = await this.simualtionModelPage.clickSaveAsDraftButton();
        return firstTabFilling, saveAsDraftClicikng;
    }
    async checkDraftSimulationModelCreated(simulationModelData, editedDraftSimulationModel) {
        await this.clickDraftSimulationModelTab();
        let arabicTd;
        let englishTd;

        let simulationModelArabicName;
        let simulationModelEnglishName;
        let simulationModelRow = [];
        if (editedDraftSimulationModel) {
            simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getEditedSimulationModelArName());
        }
        else
            simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getSimulationModelArName());

        if (simulationModelRow && simulationModelRow.length > 0) {
            arabicTd = simulationModelRow[0].tdLocator;
            simulationModelArabicName = arabicTd.locator("span");
            await simulationModelArabicName.waitFor({ state: "visible" });
            var actualSimulationModelArabicName = await simulationModelArabicName.textContent();

            console.log("Actual Arabic Name: ", actualSimulationModelArabicName);

            englishTd = simulationModelRow[1].tdLocator;
            simulationModelEnglishName = englishTd.locator("span");
            await simulationModelEnglishName.waitFor({ state: "visible" });
            var actualSimulationModelEnglishName = await simulationModelEnglishName.textContent();

            console.log("Actual English Name: ", actualSimulationModelEnglishName);
        }
        if (editedDraftSimulationModel) {
            if (actualSimulationModelArabicName === simulationModelData.getEditedSimulationModelArName() &&
                actualSimulationModelEnglishName === simulationModelData.getEditedSimulationModelEnName()
            ) {
                console.log("Draft Simulation Model Information after edit matched successfully.");
                return true;
            }
            return false;
        }
        else {
            if (
                actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName()
            ) {
                console.log("Draft Simulation Model Information matched successfully.");
                return true;
            }
            return false;
        }
    }

    async checkNewSimulationModelAdded(simulationModelData, simulationModelstatusActive, editedSimulationModel, simulationModelstatusExecuted) {
        let arabicTd;
        let englishTd;
        let statusTd;
        let activationStatusTd;

        let simulationModelArabicName;
        let simulationModelEnglishName;
        let simulationModelStatus;
        let simulationModelActivationStatus;
        let simulationModelRow = [];
        if (editedSimulationModel) {
            //await this.page.waitForTimeout(5000);
            simulationModelRow = await this.search.getRowInTableWithSpecificText(simulationModelData.getSimulationModelArName());
        }
        else {
            //await this.page.waitForTimeout(5000);
            simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getSimulationModelArName());
        }

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

            statusTd = simulationModelRow[6].tdLocator;
            simulationModelStatus = statusTd.locator("span");
            await simulationModelStatus.waitFor({ state: "visible" });
            var actualSimulationModelStatus = await simulationModelStatus.textContent();

            console.log("Actual Status: ", actualSimulationModelStatus);

            activationStatusTd = simulationModelRow[7].tdLocator;
            simulationModelActivationStatus = activationStatusTd.locator("span");
            await simulationModelActivationStatus.waitFor({ state: "visible" });
            var actualSimulationModelActivationStatus = await simulationModelActivationStatus.textContent();

            console.log("Actual Activation Status: ", actualSimulationModelActivationStatus);
        }

        if (simulationModelstatusActive) {
            if (
                actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusReady &&
                actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusEnabled
            ) {
                console.log("Simulation Model Information matched successfully.");
                let simulationModelId = await simulationModelRow[0].tdLocator.textContent();
                simulationModelData.setCreatedSimulationModelId(simulationModelId);
                console.log("Created simulation Model ID set in simulationModelData: " + simulationModelData.getCreatedSimulationModelId());
                return true;
            }
            return false;
        }
        else if (simulationModelstatusExecuted) {
            if (
                actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusExecuted &&
                actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusEnabled
            ) {
                console.log("Simulation Model Status changed to Executed");
                return true;
            }
            return false;
        }
        else {
            if (
                actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusCreated &&
                actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusDisabled
            ) {
                console.log("Simulation Model Information matched successfully.");
                let simulationModelId = await simulationModelRow[0].tdLocator.textContent();
                simulationModelData.setCreatedSimulationModelEditedId(simulationModelId);
                console.log("Edited simulation Model ID set in simulationModelData: " + simulationModelData.getCreatedSimulationModelEditedId());
                return true;
            }
            return false;
        }
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

                statusTd = simulationModelRow[6].tdLocator;
                simulationModelStatus = statusTd.locator("span");
                await simulationModelStatus.waitFor({ state: "visible" });
                var actualSimulationModelStatus = await simulationModelStatus.textContent();

                console.log("Actual Status: ", actualSimulationModelStatus);

                activationStatusTd = simulationModelRow[7].tdLocator;
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
                    //return true;
                }
                //return false;
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

                statusTd = simulationModelRow[6].tdLocator;
                simulationModelStatus = statusTd.locator("span");
                await simulationModelStatus.waitFor({ state: "visible" });
                var actualSimulationModelStatus = await simulationModelStatus.textContent();

                console.log("Actual Status: ", actualSimulationModelStatus);

                activationStatusTd = simulationModelRow[7].tdLocator;
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

    /**
     * Clicks the "View" button for a specific Simulation Model entry in the simulationModel table.
     * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async clickViewButton(simulationModelData) {
        await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelEditedId());
        //tobe removed after adding data-testid
        await this.page.click(this.viewButton);
    }

    /**
     * Clicks the "Edit" button for a specific Simulation Model entry in the simulationModel table.
     * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async clickEditButton(simulationModelData) {
        await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelId());
        //tobe removed after adding data-testid
        await this.page.click(this.editButton);
    }

    /**
     * Clicks the "Actions" button for a specific Simulation Model entry in the simulationModel table.
     * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async click3DotsActionsButton(simulationModelData) {
        await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelId());
        await this.page.click(this.ThreeDotsActionsButton);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async viewSimulationModelDetails(simulationModelData) {
        await this.clickViewButton(simulationModelData);
        console.log('View Simulaion Model Button Clicked');
        return await this.simualtionModelDetailsPage.validateSimulationModelDetails(simulationModelData);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async editSimulationModel(simulationModelData) {
        await this.clickEditButton(simulationModelData);
        console.log('Edit Simulaion Model Button Clicked');
        return await this.simualtionModelPage.editSimulationModel(simulationModelData);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async VerifySimulationModelVersionsDetails(simulationModelData, simulationModelstatusActive, simulationModelstatusInactive) {
        await this.click3DotsActionsButton(simulationModelData);
        console.log('Actions Simulaion Model Button Clicked');
        await this.page.click(this.ModelVersionsButton);
        console.log('Simulaion Model Versions Button Clicked');
        return await this.simulationModelVersionsViewPage.verifySimualtionModelsActiveAndEdited(simulationModelData, simulationModelstatusActive, simulationModelstatusInactive);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async editSimulationModelVariables(simulationModelData) {
        await this.click3DotsActionsButton(simulationModelData);
        console.log('Actions Simulaion Model Button Clicked');
        //await this.page.waitForTimeout(4000);
         await this.page.waitForSelector(this.editVariablesButton, { visible: true, timeout: 50000 });
        await this.page.click(this.editVariablesButton);
        console.log('Edit Variables Button Clicked');
        return await this.simulationModelEditVariablesPage.editVariable(simulationModelData);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async executeSimulationModel(simulationModelData, executionRecordNewAdded) {
        await this.click3DotsActionsButton(simulationModelData);
        console.log('Actions Simulaion Model Button Clicked');
        await this.page.click(this.executeSimulationModelButton);
        console.log('Execute Simulaion Model Button Clicked');
        await this.popUpMsg.popUpMessage(this.popUpExecuteRexecuteButton, global.testConfig.SimulationModels.executeSimulationModelConfirmationMsg);
        await this.popUpMsg.popUpMessage(this.popUpGotoExecutions, global.testConfig.SimulationModels.executeSimulationModelSuccessMsg);
        return await this.simulationModelExecutionRecordsPage.verifySimualtionModelExecutionRecord(executionRecordNewAdded);
    }

    async checkNumberOfExecutionsInManagmentPage(simulationModelRequest) {
        let numberOfExecutionsTd;

        let numberOfExecutions;
        let simulationModelRow = [];
        await this.page.waitForTimeout(5000);
        simulationModelRow = await this.search.getRowInTableWithSpecificText(simulationModelRequest);

        if (simulationModelRow && simulationModelRow.length > 0) {
            numberOfExecutionsTd = simulationModelRow[8].tdLocator;
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

    async checkNumberOfExecutionsInModelVersionsPage(simulationModelData) {
        await this.click3DotsActionsButton(simulationModelData);
        console.log('Actions Simulaion Model Button Clicked');
        await this.page.click(this.ModelVersionsButton);
        console.log('Simulaion Model Versions Button Clicked');
        return await this.simulationModelVersionsViewPage.checkNumberOfExecutions(simulationModelData);
    }

    async sendSimulationModelExecutionForApproval() {
        return await this.simulationModelVersionsViewPage.clickSendForApprovalButton();
    }

    async verifySimulationModelExecutionStatusInLogs(request) {
        return await this.viewExecutionLogsRequestsPage.verifyExecutionLog(request);
    }

    async verifySimulationModelExecutionExistInApprovedLogs(request) {
        return await this.approvedExecutionLogsPage.verifyExecutionRequestInApprovedLogs(request);
    }

    async getSimulationModelExecutionNumber(request, simulationModelData) {
        return await this.viewExecutionLogsRequestsPage.getExecutionNumber(request, simulationModelData);
    }

    async deleteDraftSimulaionModel(simulationModelData) {
        await this.page.waitForTimeout(2000);
        let simulationModelRow = [];
        simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getSimulationModelArName());

        if (simulationModelRow && simulationModelRow.length > 0) {
            await this.page.click(this.deleteDraftButton);
            await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.deleteDraftSimulationModelConfirmationMsg);
            await this.page.waitForSelector(this.deleteSuccessMsg, { visible: true });
            const successMessage = await this.page.textContent(this.deleteSuccessMsg);
            if (successMessage === global.testConfig.SimulationModels.deleteDraftSimulationModelSuccessMsg) {
                console.log("Delete Success Message: ", successMessage);
                return true;
            }
            return false;
        }
    }

    async editDraftSimulaionModel(simulationModelData) {
        //await this.page.waitForTimeout(2000);
        let simulationModelRow = [];
        simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getSimulationModelArName());

        if (simulationModelRow && simulationModelRow.length > 0) {
            await this.page.click(this.editDraftButton);
            let editResult = await this.simualtionModelPage.editDraftSimulationModel(simulationModelData);
            return editResult;
        }
        return false;
    }

    async filterNewSimulationModelAdded(simulationModelData) {
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

            statusTd = simulationModelRow[6].tdLocator;
            simulationModelStatus = statusTd.locator("span");
            await simulationModelStatus.waitFor({ state: "visible" });
            var actualSimulationModelStatus = await simulationModelStatus.textContent();

            console.log("Actual Status: ", actualSimulationModelStatus);

            activationStatusTd = simulationModelRow[7].tdLocator;
            simulationModelActivationStatus = activationStatusTd.locator("span");
            await simulationModelActivationStatus.waitFor({ state: "visible" });
            var actualSimulationModelActivationStatus = await simulationModelActivationStatus.textContent();

            console.log("Actual Activation Status: ", actualSimulationModelActivationStatus);
        }

        if (
            actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
            actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
            actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusReady &&
                actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusEnabled
        ) {
            console.log("Simulation Model Information matched successfully.");
            let simulationModelId = await simulationModelRow[0].tdLocator.textContent();
            simulationModelData.setCreatedSimulationModelEditedId(simulationModelId);
            console.log("Edited simulation Model ID set in simulationModelData: " + simulationModelData.getCreatedSimulationModelEditedId());
            return true;
        }
        return false;
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async filterSimulationModelVersions(simulationModelData) {
        await this.page.click(this.ThreeDotsActionsButton);
        console.log('Actions Simulaion Model Button Clicked');
        await this.page.click(this.ModelVersionsButton);
        console.log('Simulaion Model Versions Button Clicked');
        return await this.simulationModelVersionsViewPage.filterSimulationModelVersions(simulationModelData);
    }

}
module.exports = { SimulationModelManagementPage };