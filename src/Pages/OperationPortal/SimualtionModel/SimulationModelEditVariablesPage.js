const { PopUpPage } = require('../../SharedPages/PopUpPage');

export class SimulationModelEditVariablesPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);

        this.editFirstVariable = '//button[@data-testid="table-action-Edit2"]';
        this.defaultValueField = '//input[@data-testid="text-input-defaultValue"]';
        this.editVariablesButton = '//button[@data-testid="add-variable-button"]';
        this.saveChangesButton = '//button[@data-testid="next-button"]';

        //popup
        this.popUpYesButton = '//button[@data-testid="modal-primary-button"]';
        this.confirmEditButton = '//button[contains(text(), "نعم، تعديل!")]'; 
    }

    /**
 * Clicks the "View" button for a specific State Machine entry in the simulationModel table.
 * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
 * @returns {Promise<void>} - A promise that resolves when the action is completed.
 */
    async editVariable(simulationModelData) {
        await this.page.waitForSelector(this.editFirstVariable, { visible: true });
        await this.page.click(this.editFirstVariable);
        console.log("Edit Variable Clicked");
        await this.page.waitForSelector(this.defaultValueField, { visible: true });
        await this.page.fill(this.defaultValueField, simulationModelData.getSimulationModelDefaultValueOneEdited());
        console.log("Default Value Entered");
        await this.page.click(this.editVariablesButton);
        console.log("Edit Variables Button Clicked");
        await this.page.click(this.saveChangesButton);
        await this.popUpMsg.popUpMessage(this.confirmEditButton, global.testConfig.SimulationModels.editSimulationModeVariablesConfirmationMsg);
        var result = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.editSimulationModeVariablesSuccessMsg);
        return result;
    }
}
module.exports = { SimulationModelEditVariablesPage };