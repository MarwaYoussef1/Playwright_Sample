const { PopUpPage } = require('../../SharedPages/PopUpPage');
const { expect } = require('@playwright/test');


export class StateMachinePage {
  constructor(page) {
    this.page = page;
    this.createdStateMachineArName = null;
    this.createdStateMachineEnName = null;
    this.createdStateMachineArDescription = null;
    this.createdStateMachineEnDescription = null;
    this.createdFirstStateArName = null;
    this.createdSecondStateArName = null;
    this.createdActionArName = null;
    this.popUpMsg = new PopUpPage(this.page);
    //locators
    //popup
    this.successPopupTitle = '//span[@id="modal-modal-title"]';
    this.popUpDismissButton = '//button[contains(text(),"تم")]';
    //State Managment Information Section
    this.stateManagmentArabicName = '//input[@name="arabicName"]';
    this.stateManagmentEnglishName = '//input[@name="englishName"]';
    this.stateManagmentArabicDescription = '//input[@name="arabicDescription"]';
    this.stateManagmentEnglishDescription = '//input[@name="englishDescription"]';

    //State Cycle Design Section
    this.addStateButton = '//span[text()="إضافة حالة"]';
    this.stateArabicName = '[placeholder="اسم الحالة باللغة العربية"]';
    this.stateEnglishName = '[placeholder="اسم الحالة باللغة الإنجليزية"]';
    this.setDefaultToggle = '//input[@data-testid="virtual-state-toggle"]';
    this.saveButton = '//button[@data-testid="save-state-button"]';

    this.addActionButton = '//span[text()="إضافة حدث"]';
    this.fromStateDdl = '//*[@data-testid="select-box-sourceStateId"]';
    this.fromStateFirstOption = '//li[contains(@data-testid,"select-box-option-firstState")]';
    this.actionArabicName = '[placeholder="اسم الحدث باللغة العربية"]';
    this.actionEnglishName = '[placeholder="اسم الحدث باللغة الإنجليزية"]';
    this.toStateDdl = '//*[@data-testid="select-box-targetStateId"]';
    this.toStateFirstOption = '//li[contains(@data-testid,"select-box-option-secondState")]';
    this.addButton = '//button[text()="إضافة"]';

    this.createStateCycleButton = '//span[text()="إنشاء دورة الحالة"]';

    //View state machine 
    this.headlinePage = '//span[contains(text(),"بيانات دورة الحالة")]';
    this.stateManagmentArabicNameField = '//*[@data-testid="value_arabicStateManagementName"]';
    this.stateManagmentEnglishNameField = '//*[@data-testid="value_englishStateManagementName"]';
    this.stateManagmentArabicDescriptionField = '//*[@data-testid="value_arabicStateManagementDescription"]';
    this.stateManagmentEnglishDescriptionField = '//*[@data-testid="value_englishStateManagementDescription"]';
    //Edit State Machine
    
    this.editStateCycleButton = '//span[text()="تعديل دورة الحالة"]';
  }

  /**
   * Fills the State Machine information on the State Machine Page
   * @param {Object} stateMachineData - The data object containing State Machine information.
   * @returns {Promise<void>} A promise that resolves when the StateMachine definition information has been filled.
   */
  async fillStateManagementInformation(stateMachineData) {
    console.log("Start filling State Management information");
    await this.page.waitForSelector(this.createStateCycleButton, { state: "visible", timeout: 20000 });
    //await this.page.waitForTimeout(1000);
    this.createdStateMachineArName = stateMachineData.getStateManagmentArabicName();
    this.createdStateMachineEnName = stateMachineData.getStateManagmentEnglishName();
    this.createdStateMachineArDescription = stateMachineData.getStateManagmentArabicDescription();
    this.createdStateMachineEnDescription = stateMachineData.getStateManagmentEnglishDescription();
    await this.page.fill(this.stateManagmentArabicName, this.createdStateMachineArName);
    await this.page.fill(this.stateManagmentEnglishName, this.createdStateMachineEnName);
    await this.page.fill(this.stateManagmentArabicDescription, this.createdStateMachineArDescription);
    await this.page.fill(this.stateManagmentEnglishDescription, this.createdStateMachineEnDescription);
    stateMachineData.setStateManagmentArabicName(this.createdStateMachineArName);
    stateMachineData.setStateManagmentEnglishName(this.createdStateMachineEnName);
    stateMachineData.setStateManagmentArabicDescription(this.createdStateMachineArDescription);
    stateMachineData.setStateManagmentEnglishDescription(this.createdStateMachineEnDescription);
    console.log("End filling State Management information");
  }

  /**
   * Fills the first and second states information form with the provided data
   * @param {Object} stateMachineData - The data to fill in the form.
   * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating the success of the operation.
   */
  async addFirstState(stateMachineData) {
    console.log("Start filling first State Cycle Design information");
    await this.page.click(this.addStateButton);
    await this.fillFirstState(stateMachineData,true);   
    console.log("End filling first State Cycle Design information");
  }

  async fillFirstState(stateMachineData,toggle)
  {
    await this.page.waitForSelector(this.stateArabicName, { state: "visible", timeout: 20000 });
     this.createdFirstStateArName = stateMachineData.getFirstStateArabicName();
     await this.page.fill(this.stateArabicName, stateMachineData.getFirstStateArabicName());
     await this.page.fill(this.stateEnglishName, stateMachineData.getFirstStateEnglishName());
     await this.page.waitForTimeout(300);
     if(toggle)
     await this.page.click(this.setDefaultToggle);
     await this.page.click(this.saveButton);
     stateMachineData.setFirstStateArabicName(this.createdFirstStateArName);
  }


  async fillSecondState(stateMachineData)
  {
    await this.page.waitForSelector(this.stateArabicName, { state: "visible", timeout: 20000 });
    this.createdSecondStateArName = stateMachineData.getSecondStateArabicName();
    await this.page.fill(this.stateArabicName, stateMachineData.getSecondStateArabicName());
    await this.page.fill(this.stateEnglishName, stateMachineData.getSecondStateEnglishName());
    await this.page.click(this.saveButton);
    stateMachineData.setSecondStateArabicName(this.createdSecondStateArName);
  }

  async fillAction(stateMachineData)
  {
    this.createdActionArName = stateMachineData.getActionArabicName();
    await this.page.fill(this.actionArabicName, this.createdActionArName);
    await this.page.fill(this.actionEnglishName, stateMachineData.getActionEnglishName());
    stateMachineData.setActionArabicName(this.createdActionArName);
  }

  /**
   * Adds the second state to the state machine by filling in the necessary information.
   * @param {Object} stateMachineData - The data required to create the second state.
   * @returns {Promise<void>} - A promise that resolves when the second state has been added.
   */
  async addSecondState(stateMachineData) {
    console.log("Start filling second State Cycle Design information");
    await this.page.click(this.addStateButton);
    await this.fillSecondState(stateMachineData);
    stateMachineData.setSecondStateArabicName(this.createdSecondStateArName);
    console.log("End filling second State Cycle Design information");
  }

  /**
   * Adds a new action to the state machine by filling in the necessary information.
   * @param {Object} stateMachineData - The data required to create the action.
   * @returns {Promise<void>} - A promise that resolves when the action has been added.
   */
  async addAction(stateMachineData) {
    console.log("Start filling Action information");
    await this.page.click(this.addActionButton);
    await this.page.waitForSelector(this.addActionButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.fromStateDdl);
    await this.page.click(this.fromStateFirstOption);
    await this.fillAction(stateMachineData);
    await this.page.click(this.toStateDdl);
    await this.page.click(this.toStateFirstOption);
   
    await this.page.click(this.addButton);
    console.log("End filling Action information");
  }

  /**
   * Clicks the "Create State Cycle" button and waits for the success popup message.
   * @returns {Promise<boolean>} - Returns true if the state cycle creation was successful, otherwise false.
   */
  async clickCreateStateCycleButton() {
    await this.page.click(this.createStateCycleButton);
    var result = await this.popUpMsg.popUpMessage(this.popUpDismissButton, global.testConfig.stateMachine.stateMachineCreatedSuccessMsg);
    return result;
  }

  /**
   * Creates a new state machine by filling in the necessary information.
   * @param {Object} stateMachineData - The data required to create the state machine.
   * @returns {Promise<boolean>} - Returns true if the state machine creation was successful, otherwise false.
   */
  async createNewStateMachine(stateMachineData) {
    console.log("Start filling State Cycle Design information");
    await this.fillStateManagementInformation(stateMachineData);
    await this.addFirstState(stateMachineData);
    await this.addSecondState(stateMachineData);
    await this.addAction(stateMachineData);
    console.log("End filling State Cycle Design information");
    var newStateMachineCreated = await this.clickCreateStateCycleButton();
    return newStateMachineCreated;
  }

  /**
   * Validates that the State Machine page is opened and verifies the content of various fields.
   * @returns {Promise<boolean>} - Returns true if the validation is successful.
   */
  async validateStateMachineDetails(stateMachineData) {
    await this.page.waitForSelector(this.headlinePage, { visible: true });

    const stateManagmentArabicNameFieldText = await this.page.innerText(this.stateManagmentArabicNameField);
    const stateManagmentEnglishNameFieldText = await this.page.innerText(this.stateManagmentEnglishNameField);
    const stateManagmentArabicDescriptionFieldText = await this.page.innerText(this.stateManagmentArabicDescriptionField);
    const stateManagmentEnglishDescriptionFieldText = await this.page.innerText(this.stateManagmentEnglishDescriptionField);

    this.firstStateField = `//div[contains(@class, "MuiBox-root") and contains(text(), "${this.createdFirstStateArName}")]`;
    this.secondStateField = `//div[contains(@class, "MuiBox-root") and contains(text(), "${this.createdSecondStateArName}")]`;
    this.actionField = `//div[contains(@class, "MuiBox-root") and contains(text(), "${this.createdActionArName}")]`;

    const firstStateFieldText = await this.page.innerText(this.firstStateField);
    console.log("first State= " + firstStateFieldText);

    const secondStateFieldText = await this.page.innerText(this.secondStateField);
    console.log("second State= " + secondStateFieldText);

    const actionFieldText = await this.page.innerText(this.actionField);
    console.log("action= " + actionFieldText);

    // Collect all validation checks into an array of booleans
    const validations = [
        stateManagmentArabicNameFieldText === stateMachineData.getStateManagmentArabicName(),
        stateManagmentEnglishNameFieldText.toLowerCase() === stateMachineData.getStateManagmentEnglishName().toLowerCase(),
        stateManagmentArabicDescriptionFieldText === stateMachineData.getStateManagmentArabicDescription(),
        stateManagmentEnglishDescriptionFieldText.toLowerCase() === stateMachineData.getStateManagmentEnglishDescription().toLowerCase(),
        firstStateFieldText.includes(stateMachineData.getFirstStateArabicName()),
        secondStateFieldText === stateMachineData.getSecondStateArabicName(),
        actionFieldText === stateMachineData.getActionArabicName()
    ];

    // Check if all validations are true
    const allValid = validations.every(Boolean);

    return allValid;
}


  /**
   * Edits the state machine by updating the names of the first state, second state, and action.
   * @returns {Promise<boolean>} - Returns true if the state machine was successfully edited, otherwise false.
   */
  async editStateMachine(stateMachineData) {
    this.firstState = '//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdFirstStateArName+'")]';
    this.firstStateEditButton = '(//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdFirstStateArName+'")]//following::div//div)[1]';
    this.secondState = '//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdSecondStateArName+'")]';
    this.secondStateEditButton = '(//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdSecondStateArName+'")]//following::div//div)[1]';
    this.action = '//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdActionArName+'")]';
    this.actionEditButton = '(//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdActionArName+'")]//following::div//div)[1]';
    await this.page.click(this.firstState);
    await this.page.click(this.firstStateEditButton);
    await this.fillFirstState(stateMachineData,false);
    await this.page.click(this.secondState);
    await this.page.click(this.secondStateEditButton);
    await this.fillSecondState(stateMachineData);
    await this.page.click(this.action);
    await this.page.click(this.actionEditButton);
    await this.fillAction(stateMachineData);
    await this.page.click(this.addButton);
    await this.page.click(this.editStateCycleButton);
    var stateMachineEdited = await this.popUpMsg.popUpMessage(this.popUpDismissButton, global.testConfig.stateMachine.stateMachineEditedSuccessMsg);
    return stateMachineEdited;
  }
}
module.exports = { StateMachinePage };
