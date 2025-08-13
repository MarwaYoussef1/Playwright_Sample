import Constants from '../../../Utils/Constants.js';
const { PopUpPage } = require("../../SharedPages/PopUpPage.js");

/**
 * Manages task details, including opening tabs, adding notes, and accepting various task types.
 * @class
 */
export class TaskDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for tabs
    this.myDataTab = '//button[@id="tab-0"]';
    this.myNotesTab = '//button[@id="tab-1"]';

    this.requestStatus = '//span[@data-testid="value_execution-status"]';
    this.requestStatus2 = '//span[@data-testid="value_request-requestStatus"]';
    this.disbursementRequestStatus = '//label[text()="حالة الطلب"]//following::span[1]';


    // Selectors for task details and actions  
    this.streamEnablementStatus = '//span[@data-testid="value_streams-management-stream-enablement-status"]';
    this.mainProgramEnablementStatus = '//span[@data-testid="value_main-program-enablement-status"]';
    this.subProgramEnablementStatus = '//span[@data-testid="value_enablement-status"]';
    this.benefitEnablementStatus = '//span[@data-testid="value_benefit_enablement_status"]';

    this.addNoteBtn = '//button[contains(text(),"إضافة ملاحظة")]';
    this.noteOnTaskField = '//textarea[@name="message"]';
    this.acceptNoteOnTaskBtn = '//button[contains(@class, "MuiButton-containedPrimary") and contains(@class, "MuiButton-sizeMedium")]';
    this.ensureNoteMsgTitle = '//span[@id="modal-modal-title" and contains(text(), "إضافة الملاحظة")]';
    this.acceptEnsureNoteMsgBtn = '//button[@data-testid="confirmation-modal-primary-button"]';//confirmation-modal-primary-button
    this.confirmNoteMsgTitle = '//div[@class="MuiStack-root muirtl-zwd3xv"]/span[@id="modal-modal-title"]';
    this.acceptConfirmNoteMsgBtn = '//button[contains(@class, "MuiButtonBase-root") and text()="العودة"]';
    this.addedNoteLocator = "div.MuiStack-root.muirtl-1ofqig9 > span:nth-child(3)";

    // Selectors for accepting tasks
    this.acceptTaskBtn = '//button[@data-testid="accept-request"]';

    // Selectors for accepting tasks
    this.rejectTaskBtn = '//button[@data-testid="reject-request"]';

    // Selectors for task notes and confirmations
    this.ensureTaskNotesField = '//textarea[@data-testid="description-text-field"]';
    this.ensureTaskNotesBtn = '//button[@data-testid="process-action-modal-primary-button"]';
    this.confirmTaskMsgTitle = '//span[@id="modal-modal-title"]';
    this.backToTasksBtn = '//button[@data-testid="modal-primary-button"]';
  }

  /**
   * Opens the "My Data" tab in the task details page.
   * @returns {Promise<void>} - Completes the navigation to the data tab.
   */
  async openTaskDataTab() {
    await this.page.click(this.myDataTab);
    await this.page.waitForTimeout(5000);
  }

  /**
   * Opens the "Notes" tab in the task details page.
   * @returns {Promise<void>} - Completes the navigation to the notes tab.
   */
  async openNotesTab() {
    await this.page.click(this.myNotesTab);
  }

  /**
   * Checks whether the task's enablement status matches the expected status.
   * @param {string} expectedStatus - The expected enablement status.
   * @returns {Promise<boolean>} - Returns true if the status matches; otherwise, false.
   */
  async checkEnablementStatus(expectedStatus) {
    // Wait for the status element to be visible
    await this.page.waitForTimeout(5000);
    var actualStatus = await this.page.locator(this.requestStatus).or(this.page.locator(this.requestStatus2).or(this.page.locator(this.disbursementRequestStatus))).textContent();
    if (actualStatus.trim() === expectedStatus.trim()) {
      console.log(`Enablement Status is as expected: "${actualStatus.trim()}".`);
      return true;
    }
    return false;
  }

  // Determine the locator for the status based on taskType
  async getstatusLocator(taskType) {
    var statusLocator;
    switch (taskType) {
      case Constants.STREAM: statusLocator = this.streamEnablementStatus;
        break;
      case Constants.MAIN_PROGRAM: statusLocator = this.mainProgramEnablementStatus;
        break;
      case Constants.SUB_PROGRAM: statusLocator = this.subProgramEnablementStatus;
        break;
      case Constants.BENEFIT: statusLocator = this.benefitEnablementStatus;
        break;
      default:
        console.log("Invalid task type provided");
        return false;
    }
    return statusLocator;

  }

  /**
   * Checks if a specific note is added to the task.
   * @param {string} addedNote - The note to check.
   * @returns {Promise<boolean>} - Returns true if the note is found; otherwise, false.
   */
  async checkNoteIsAdded(addedNote) {
    var displayedNote = this.page.locator('//*[contains(text(),"' + addedNote + '")]');
    await displayedNote.waitFor({ state: "visible" });
    console.log(`The Note : "${addedNote}" is added Successfully`);
    return true;
  }

  /**
   * Adds a note to the task.
   * @returns {Promise<boolean>} - Returns true if the note is added successfully.
   */
  async addNoteOnTask() {
    await this.page.waitForTimeout(7000);
    await this.openNotesTab();
    await this.page.waitForSelector(this.addNoteBtn, { state: 'visible', timeout: 5000 });
    await this.page.click(this.addNoteBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.noteOnTaskField, this.acceptNoteOnTaskBtn, global.testConfig.taskDetails.note);
    await popUpMsg.popUpMessage(this.acceptEnsureNoteMsgBtn, global.testConfig.taskDetails.ensureNoteMsg);
    await popUpMsg.popUpMessage(this.acceptConfirmNoteMsgBtn, global.testConfig.taskDetails.confirmNoteMsg);
    let result = await this.checkNoteIsAdded(global.testConfig.taskDetails.note);
    return result;
  }



  /**
  * Accepts or rejects a task based on the task type and action type.
  * @param {string} actionType - The action to perform ('approve' or 'reject').
  * @param {string} taskType - The type of the task ('stream', 'mainProgram', 'subProgram', 'benefits').
  * @returns {Promise<boolean>} - Returns true if the task is accepted or rejected successfully.
  */
  async completeTask(actionType, taskType, confirmMsg) {
    let actionBtn;

    actionBtn = actionType === Constants.APPROVE ? this.acceptTaskBtn : this.rejectTaskBtn;
    await this.page.click(actionBtn);
    //await this.page.waitForTimeout(2000);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.ensureTaskNotesField, this.ensureTaskNotesBtn, global.testConfig.taskDetails.addCompleteTaskNote);
    var result = await popUpMsg.popUpMessage(this.backToTasksBtn, confirmMsg);

    if (result) {
      console.log(`The ${taskType} ${actionType === Constants.APPROVE ? 'Accepted' : 'Rejected'} Successfully.`);
    }

    return result;
  }

}
module.exports = { TaskDetailsPage };
