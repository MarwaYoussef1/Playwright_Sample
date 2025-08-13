export class SimualtionModelDetailsPage {
    constructor(page) {
        this.page = page;

        //tabs
        this.dataSourceTab = '//button[@id="tab-1"]';
        this.conditionsTab = '//button[@id="tab-2"]';
        this.variablesTab = '//button[@id="tab-3"]';
        this.modelRecordTab = '//button[@id="tab-4"]';


        //tab1
        this.headlinePage = '(//span[contains(text(),"بيانات نموذج المحاكاة")])[2]';
        this.simulationModelArNameField = '//span[@data-testid="value_arabic-name"]';
        this.simulationModelEnNameField = '//span[@data-testid="value_english-name"]';
        this.tabOneAttachment = '(//button[@data-testid="download-btn"])[1]';

        //tab2
        this.tabTwoAttachment = '(//button[@data-testid="download-btn"])[1]';

        //tab3
        this.tabThreeAttachment = '(//button[@data-testid="download-btn"])[1]';

        //tab4
        this.variablesGrid = '//table[@data-testid="table"]';

        //tab5
        this.statusField = '//span[@data-testid="value_status"]';
        this.activateStatusField = '//span[@data-testid="value_activation-status"]';

    }

    /**
   * Validates that the Simulation Model page is opened and verifies the content of various fields.
   * @returns {Promise<boolean>} - Returns true if the validation is successful.
   */
    async validateSimulationModelDetails(simulationModelData) {
        await this.page.waitForSelector(this.headlinePage, { visible: true });
        const validations = [];

        const actualSimulationModelArNameFieldText = await this.page.innerText(this.simulationModelArNameField);
        console.log("Simulation Model Arabic Name: ", actualSimulationModelArNameFieldText);
        const actualSimulationModelEnNameFieldText = await this.page.innerText(this.simulationModelEnNameField);
        console.log("Simulation Model English Name: ", actualSimulationModelEnNameFieldText);

        if (
            actualSimulationModelArNameFieldText === simulationModelData.getSimulationModelArName() &&
            actualSimulationModelEnNameFieldText === simulationModelData.getSimulationModelEnName() &&
            await this.page.$(this.tabOneAttachment) !== null
        ) {
            validations.push(actualSimulationModelArNameFieldText === simulationModelData.getSimulationModelArName());
            validations.push(actualSimulationModelEnNameFieldText === simulationModelData.getSimulationModelEnName());
            validations.push(await this.page.$(this.tabOneAttachment) !== null);
            console.log("Tab One Verifed");
            await this.page.click(this.dataSourceTab);
        }
        if (await this.page.$(this.tabTwoAttachment) !== null) {
            validations.push(await this.page.$(this.tabTwoAttachment) !== null);
            console.log("Tab Two Verified");
            await this.page.click(this.conditionsTab);
        }
        if (await this.page.$(this.tabThreeAttachment) !== null) {
            validations.push(await this.page.$(this.tabThreeAttachment) !== null);
            console.log("Tab Three Verified");
            await this.page.click(this.variablesTab);
        }
        if (await this.page.$(this.variablesGrid) !== null) {
            validations.push(await this.page.$(this.variablesGrid) !== null);
            console.log("Tab Four Verified");
            await this.page.click(this.modelRecordTab)
        }
        const actualStatusValue = await this.page.innerText(this.statusField);
        const actualActivateStatusValue = await this.page.innerText(this.activateStatusField);
        if (
            actualStatusValue === global.testConfig.SimulationModels.simulationModelStatusCreated &&
            actualActivateStatusValue === global.testConfig.SimulationModels.acivationStatusDisabled
        ) {
            validations.push(actualStatusValue === global.testConfig.SimulationModels.simulationModelStatusCreated);
            validations.push(actualActivateStatusValue === global.testConfig.SimulationModels.acivationStatusDisabled);
            console.log("Tab Five Verified");
        }
        var allValid = validations.every(value => value === true);
        return allValid;
    }
}


module.exports = { SimualtionModelDetailsPage };