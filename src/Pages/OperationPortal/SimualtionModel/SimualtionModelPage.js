import filesPaths from '../../../../configs/paths.js';
const { PopUpPage } = require('../../SharedPages/PopUpPage');
const { UploadFilePage } = require('../../SharedPages/UploadFilePage.js');
import Constants from "../../../Utils/Constants";

export class SimualtionModelPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);
        this.uploadFilePage = new UploadFilePage(this.page);

        this.fieldEnablementToggle = '//label[@class="form-check-label label-position-right"]';
        this.activate_deactivateFieldLibraryAlertMsg = '//div[@role="presentation"]//span';
        this.attachButton = '//button[@type="button" and contains(text(),"إضافة الملف")]';

        //popup
        this.popUpYesButton = '//button[@data-testid="modal-primary-button"]';


        //tab1
        this.simulationModelArNameField = '//input[@data-testid="text-input-modelData.nameAr"]';
        this.simulationModelEnNameField = '//input[@data-testid="text-input-modelData.nameEn"]';
        /*this.beneficiaryPartyDdl = '//div[@data-testid="select-box-modelData.beneficiaryParty"]';
        this.beneficiaryPartyDdlFirstValue = '//li[@data-testid="option-0"]';
        this.beneficiaryPartyDdlSecondValue = '//li[@data-testid="option-1"]';*/
        this.simulationModelDescriptionField = '//textarea[@name="modelData.description"]';
        this.uploadedFileName = '//td[@data-testid="table-row-element-0-0"]';
        this.nextTabButton = '//button[@data-testid="next-button"]';


        //tab2
        this.dataSourceCheckbox = '(//input[@type="checkbox"])[1]';
        this.auCheckbox = '(//input[@type="checkbox"])[2]';
        this.ibrCheckbox = '(//input[@type="checkbox"])[3]';
        this.isrCheckbox = '(//input[@type="checkbox"])[4]';

        //tab4
        this.variableArNameField = '//input[@data-testid="text-input-nameAr"]';
        this.variableEnNameField = '//input[@data-testid="text-input-nameEn"]';
        this.variableDescriptionField = '//textarea[@name="description"]';
        this.variableTypeDdl = '//div[@data-testid="select-box-type"]';
        this.variableTypeDdlTextValue = '//li[@data-testid="option-0"]';
        this.variableTypeDdlNumericValue = '//li[@data-testid="option-1"]';
        this.variableTypeDdlDateValue = '//li[@data-testid="option-2"]';
        this.defaultValueField = '//input[@data-testid="text-input-defaultValue"]';
        this.calendarDatePicker = '//div[contains(@class, "MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase")]//button[contains(@class, "MuiButtonBase-root MuiIconButton-root MuiIconButton")]';
        this.todayDate = '//button[contains(@class, "MuiButtonBase-root MuiPickersDay-root") and @tabindex="0"]';
        this.addVariableButton = '//button[@data-testid="add-variable-button"]';

        //draft button
        this.saveAsDraftButton = '//button[@data-testid="action-button"]';
    }

    async clickSaveAsDraftButton() {
        await this.page.click(this.saveAsDraftButton);
        return await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.saveAsDraftSuccessMsg);
    }

    /**
   * Fills the simulation Model information - first tab.
   * @param {Object} simulationModelData - The data object containing simulationModelData information.
   * @returns {Promise<void>} A promise that resolves when the lookup definition information has been filled.
   */
    async fillSimulationModelInfo(simulationModelData) {
        await this.fillModelDataTab(simulationModelData);
        await this.fillDataSourceTab();
        await this.fillDefineConditionsTab();
        await this.fillDefineVariablesTab(simulationModelData);
        return await this.fillDefineSimulationModelTab();

    }

    async fillModelDataTab(simulationModelData) {
        console.log("Start filling Simulation Model Information Tab one");
        await this.page.waitForTimeout(5000);
        this.createdSimulationModelArName = simulationModelData.getSimulationModelArName();
        this.createdSimulationModelEnName = simulationModelData.getSimulationModelEnName();
        this.createdSimulationModelDescription = simulationModelData.getSimulationModelDescription();
        await this.page.fill(this.simulationModelArNameField, this.createdSimulationModelArName);
        await this.page.fill(this.simulationModelEnNameField, this.createdSimulationModelEnName);
       /* await this.page.click(this.beneficiaryPartyDdl);
        await this.page.waitForSelector(this.beneficiaryPartyDdlFirstValue, { visible: true });
        await this.page.click(this.beneficiaryPartyDdlFirstValue);*/
        await this.page.fill(this.simulationModelDescriptionField, this.createdSimulationModelDescription);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelPDF, this.attachButton, Constants.VERIFY_FILE_UPLOADED);

        simulationModelData.setSimulationModelArName(this.createdSimulationModelArName);
        simulationModelData.setSimulationModelEnName(this.createdSimulationModelEnName);
        simulationModelData.setSimulationModelDescription(this.createdSimulationModelDescription);
        console.log("End filling Simulation Model information Tab one");
        await this.page.click(this.nextTabButton);
    }
    async fillDataSourceTab() {
        console.log("Start filling Simulation Model Information Tab two");
        await this.page.waitForTimeout(2000);
        await this.page.click(this.dataSourceCheckbox);
        await this.page.click(this.auCheckbox);
        await this.page.click(this.ibrCheckbox);
        await this.page.click(this.isrCheckbox);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelCSV, this.attachButton, Constants.VERIFY_FILE_UPLOADED);
        console.log("End filling Simulation Model information Tab two");
        await this.page.click(this.nextTabButton);
    }
    async fillDefineConditionsTab() {
        console.log("Start filling Simulation Model Information Tab three");
        await this.page.waitForTimeout(2000);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelPDF, this.attachButton, Constants.VERIFY_FILE_UPLOADED);
        console.log("End filling Simulation Model information Tab three");
        await this.page.click(this.nextTabButton);
    }
    async fillDefineVariablesTab(simulationModelData) {
        console.log("Start filling Simulation Model Information Tab four");
        await this.page.waitForTimeout(2000);
        //var1
        this.createdVariableOneArName = simulationModelData.getVariableOneArName();
        this.createdVariableOneEnName = simulationModelData.getVariableOneEnName();
        this.createdVariableOneDescription = simulationModelData.getVariableOneDescription();
        this.createdDefaultValueOne = simulationModelData.getDefaultValueOne();

        //var2
        this.createdVariableTwoArName = simulationModelData.getVariableTwoArName();
        this.createdVariableTwoEnName = simulationModelData.getVariableTwoEnName();
        this.createdVariableTwoDescription = simulationModelData.getVariableTwoDescription();
        this.createdDefaultValueTwo = simulationModelData.getDefaultValueTwo();

        //var3
        this.createdVariableThreeArName = simulationModelData.getVariableThreeArName();
        this.createdVariableThreeEnName = simulationModelData.getVariableThreeEnName();
        this.createdVariableThreeDescription = simulationModelData.getVariableThreeDescription();

        await this.fillVariableData(
            this.createdVariableOneArName,
            this.createdVariableOneEnName,
            this.createdVariableOneDescription,
            this.variableTypeDdlTextValue,
            this.createdDefaultValueOne
        );

        await this.fillVariableData(
            this.createdVariableTwoArName,
            this.createdVariableTwoEnName,
            this.createdVariableTwoDescription,
            this.variableTypeDdlNumericValue,
            this.createdDefaultValueTwo
        );

        await this.fillVariableData(
            this.createdVariableThreeArName,
            this.createdVariableThreeEnName,
            this.createdVariableThreeDescription,
            this.variableTypeDdlDateValue
        );

        console.log("End filling Simulation Model information Tab four");
        await this.page.click(this.nextTabButton);
    }
    async fillVariableData(arName, enName, description, type, defaultValue = null) {
        await this.page.fill(this.variableArNameField, arName);
        await this.page.fill(this.variableEnNameField, enName);
        await this.page.fill(this.variableDescriptionField, description);
        await this.page.click(this.variableTypeDdl);
        await this.page.waitForSelector(type, { visible: true });
        await this.page.click(type);

        if (defaultValue) {
            await this.page.fill(this.defaultValueField, defaultValue);
        } else {
            await this.page.click(this.calendarDatePicker);
            await this.page.waitForSelector(this.todayDate, { visible: true });
            await this.page.click(this.todayDate);
        }

        await this.page.click(this.addVariableButton);
    }

    async fillDefineSimulationModelTab() {
        console.log("Start filling Simulation Model Information Tab five");
        await this.page.waitForTimeout(5000);
        console.log("End filling Simulation Model information Tab five");
        await this.page.click(this.nextTabButton);
       // await this.page.waitForTimeout(5000);
        await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.defineSimulationConfirmationMsg);
       // await this.page.waitForTimeout(5000);
        var result = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.defineSimulationSuccessMsg);
        return result;
    }

    async editSimulationModel(simulationModelData) {
        await this.page.click(this.beneficiaryPartyDdl);
        await this.page.waitForSelector(this.beneficiaryPartyDdlFirstValue, { visible: true });
        await this.page.click(this.beneficiaryPartyDdlSecondValue);
        console.log("Beneficiary Party changed to second value");
        await this.page.fill(this.simulationModelDescriptionField, simulationModelData.getEditedSimulationModelDescription());
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelPDF, this.attachButton, Constants.VERIFY_FILE_UPLOADED);
        await this.page.click(this.nextTabButton);
        console.log("Navigate to Second tab");
        await this.page.waitForTimeout(5000);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelSecondCSV, this.attachButton, Constants.VERIFY_FILE_UPLOADED);
        await this.page.click(this.nextTabButton);
        console.log("Navigate to Third tab");
        await this.page.waitForTimeout(5000);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelPDF, this.attachButton, Constants.VERIFY_FILE_UPLOADED);
        await this.page.click(this.nextTabButton);
        console.log("Navigate to Fourth tab");
        this.createdVariableOneArName = simulationModelData.getVariableFourArName();
        this.createdVariableOneEnName = simulationModelData.getVariableFourEnName();
        this.createdVariableOneDescription = simulationModelData.getVariableOneDescription();
        this.createdDefaultValueOne = simulationModelData.getDefaultValueOne();
        await this.page.fill(this.variableArNameField, this.createdVariableOneArName);
        await this.page.fill(this.variableEnNameField, this.createdVariableOneEnName);
        await this.page.fill(this.variableDescriptionField, this.createdVariableOneDescription);
        await this.page.click(this.variableTypeDdl);
        await this.page.waitForSelector(this.variableTypeDdlTextValue, { visible: true });
        await this.page.click(this.variableTypeDdlTextValue);
        await this.page.fill(this.defaultValueField, this.createdDefaultValueOne);
        await this.page.click(this.addVariableButton);
        await this.page.click(this.nextTabButton);
        console.log("Navigate to Fifth tab");
        await this.page.click(this.nextTabButton);
        await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.editSimulationConfirmationMsg);
        var result = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.defineSimulationSuccessMsg);
        return result;
    }
    async editDraftSimulationModel(simulationModelData) {
        console.log("Start Editing Simulation Model information Tab one");
        this.createdSimulationModelArName = simulationModelData.getEditedSimulationModelArName();
        this.createdSimulationModelEnName = simulationModelData.getEditedSimulationModelEnName();
        this.createdSimulationModelDescription = simulationModelData.getEditedSimulationModelDescription();
        await this.page.fill(this.simulationModelArNameField, this.createdSimulationModelArName);
        await this.page.fill(this.simulationModelEnNameField, this.createdSimulationModelEnName);
        await this.page.click(this.beneficiaryPartyDdl);
        await this.page.waitForSelector(this.beneficiaryPartyDdlFirstValue, { visible: true });
        await this.page.click(this.beneficiaryPartyDdlSecondValue);
        await this.page.fill(this.simulationModelDescriptionField, this.createdSimulationModelDescription);
        simulationModelData.setEditedSimulationModelArName(this.createdSimulationModelArName);
        simulationModelData.setEditedSimulationModelEnName(this.createdSimulationModelEnName);
        console.log("End Editing Simulation Model information Tab one");
        return await this.clickSaveAsDraftButton();
    }

}
module.exports = { SimualtionModelPage };