import Constants from '../../../Utils/Constants.js';


const { SearchPage } = require("../../SharedPages/SearchPage");
const { PopUpPage } = require("../../SharedPages/PopUpPage");
const { TaskDetailsPage } = require("./TaskDetailsPage");
const { FieldData } = require("../../../../src/Models/AdminPortal/FieldData.js");
const { FormIoPage } = require("../../SharedPages/FormIoPage.js");
const { UploadFilePage } = require('../../SharedPages/UploadFilePage.js');

/**
 * Manages task-related actions, including navigation between task tabs,
 * assigning tasks, and approving various task types like streams, programs,SubPrograms and benefits.
 * @class
 */
export class TasksPage {
  constructor(page) {
    this.page = page;
    this.taskDetailsPage = new TaskDetailsPage(this.page);
    this.search = new SearchPage(this.page);
    this.popUpMsg = new PopUpPage(this.page);
    this.inputFieldData = new FieldData(this.page);
    this.formIoPage = new FormIoPage(this.page);
    this.uploadFilePage = new UploadFilePage(page);

    this.myTasksTab = '//button[@id="tab-0"]';
    this.myCompletedTasksTab = '//button[@id="tab-1"]';
    this.groupTasksTab = '//button[@id="tab-2"]';
    this.searchInput = '//input[@placeholder="ادخل رقم الطلب"]';
    this.tasksTable = "//table//tbody";
    this.tableActions = 'table-actions';
    this.tableThreeDots = 'three-dots-menu';
    this.assignToMyselfBtn = '//*[@data-testid="three-dots-menu-option-0"]';
    this.assignPopUpMsgTitle = '//span[@id="modal-modal-title"]';
    this.acceptAssignBtn = '//button[contains(text(),"نعم، إسناد!")]';
    this.cancelAssignBtn = '//button[contains(text(),"إلغاء")]';
   
  }

  /**
   * Navigates to the "My Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToMyTasksTab() {
    await this.page.waitForTimeout(5000);
    // await this.page.waitForSelector(this.myTasksTab, { state: "visible",timeout: 20000});
    await this.page.click(this.myTasksTab);
    console.log("Navigate to My tasks tab");
    // await this.page.reload({ waitUntil: 'networkidle', timeout: 60000 });
    // await this.page.waitForSelector(this.myTasksTab, { state: "visible",timeout: 20000});
    // await this.page.click(this.myTasksTab);
  }

  /**
   * Navigates to the "My Completed Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToMyCompletedTasksTab() {
    await this.page.waitForTimeout(15000);
    await this.page.waitForSelector(this.myCompletedTasksTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.myCompletedTasksTab);
    await this.page.waitForTimeout(5000);
    console.log("Navigate to My completed tasks tab");
  }

  /**
   * Navigates to the "Group Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToGroupTasksTab() {
    await this.page.waitForTimeout(15000);
    await this.page.waitForSelector(this.groupTasksTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.groupTasksTab);
    await this.page.waitForTimeout(5000);
    console.log("Navigate to group tasks tab");
  }

  /**
   * Assigns a task to the current user.
   * @param {string} taskNumber - The unique identifier of the task to assign.
   * @returns {Promise<void>} - Completes the assignment process.
   */
  async assignTaskToMe(taskNumber) {
    await this.navigateToGroupTasksTab();
    await this.page.waitForTimeout(5000);
    let taskRow = [];
    taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    var actionlocator = "button:nth-of-type(1)";
    await this.search.clickRowAction(taskRow, this.tableThreeDots, actionlocator);
    await this.page.click(this.assignToMyselfBtn);
    console.log("clicked on assign to myself Btn");
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.popUpMessage(this.acceptAssignBtn, global.testConfig.tasks.assignTaskMsg);
    console.log("The Task Assigned to my self successfully");
  }

  /**
 * Ensures that a task is either accepted or rejected and its status is updated accordingly.
 * @param {string} taskType - The type of the task (stream, mainProgram, subProgram, benefit).
 * @param {string} taskNumber - The unique identifier of the task.
 * @param {string} actionType - The action to perform ('approve' or 'reject').
 * @returns {Promise<boolean>} - Returns true if the task is processed successfully.
 */
  async ensureTaskStatus(taskType, actionType, taskNumber) {
    let expectedStatus;
    // await this.navigateToGroupTasksTab();
    await this.navigateToMyCompletedTasksTab();

    // Find the task row in the table
    //await this.page.waitForTimeout(2000);
    let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    var actionLocator = "button";

    await this.search.clickRowAction(taskRow, this.tableActions, actionLocator);

    // Define expected status based on action
    if (actionType === Constants.APPROVE) {
      expectedStatus = global.testConfig.taskDetails.enableStatusActive;
    } else if (actionType === Constants.REJECT) {
      expectedStatus = global.testConfig.taskDetails.enableStatusHidden;
    } else {
      console.log("Invalid action provided");
      return false;
    }
    // Check if the status is updated accordingly
    var result = await this.taskDetailsPage.checkEnablementStatus(taskType, expectedStatus);
    // Log the result based on the action
    if (result) {
      if (actionType === Constants.APPROVE) {
        console.log("Task is accepted, Enablement Status is Active now");
      } else if (actionType === Constants.REJECT) {
        console.log(
          `Task is rejected, Enablement Status is still ${expectedStatus}`
        );
      }
    }

    return result;
  }


  /**
   * Handles task approval or rejection.
   * @param {string} taskType - The type of the task (stream, mainProgram, subProgram, benefit).
   * @param {string} taskNumber - The unique identifier of the task.
   * @param {string} actionType - The action to perform ('approve' or 'reject').
   * @returns {Promise<boolean>} - Returns true if the task is processed successfully.
   */
  async manageTask(taskType, actionType, taskNumber, confirmMsg) {
    let status;
    let taskStatus;
    let ensureStatus;
    let addNote;
    let requestType;

    //await this.navigateToMyCompletedTasksTab();
    await this.navigateToMyTasksTab();

    let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);

    if (actionType === Constants.REJECT) {
      requestType = await this.checkTaskRequestType(taskType, taskRow);
    }
    else {
      requestType = true;
    }

    var actionLocator = "button";
    await this.search.clickRowAction(taskRow, this.tableActions, actionLocator);
    console.log(`Navigate To ${taskType} Details Page Successfully`);

    var initialTaskStatus = global.testConfig.taskDetails.enableStatusHidden;
    status = await this.taskDetailsPage.checkEnablementStatus(taskType, initialTaskStatus);

    if (actionType === Constants.REJECT) {
      addNote = await this.taskDetailsPage.addNoteOnTask();
    }
    else {
      addNote = true;
    }

    // Call the completeTask method with the corresponding task type and action
    taskStatus = await this.taskDetailsPage.completeTask(actionType, taskType, confirmMsg);
    ensureStatus = await this.ensureTaskStatus(taskType, actionType, taskNumber);

    // If all steps are successful, return true
    if (addNote && status && taskStatus && ensureStatus && requestType) return true;

    return false;
  }


  async checkTaskRequestType(taskType, taskRow) {
    //await this.page.waitForTimeout(7000);
    let expectedMsg = await this.getExpectedTaskType(taskType);
    let actionLocator = taskRow[3].tdLocator;
    let actualType = await actionLocator.textContent();

    if (actualType.trim() === expectedMsg.trim()) {
      console.log(`Task Request Type is ${actualType}`);
      return true;
    }
    return false

  }

  async getExpectedTaskType(taskType) {
    let expectedType;
    switch (taskType) {
      case Constants.STREAM: expectedType = global.testConfig.tasks.expectStreamTaskType
        break;
      case Constants.MAIN_PROGRAM: expectedType = global.testConfig.tasks.expectMainProgramTaskType
        break;
      case Constants.SUB_PROGRAM: expectedType = global.testConfig.tasks.expectSubProgramTaskType
        break;
      case Constants.BENEFIT: expectedType = global.testConfig.tasks.expectBenefitTaskType
        break;
      case Constants.ISRCOPY: expectedType = global.testConfig.tasks.expectISRTaskType
        break;
      default:
        console.log("Unknown task type");
        return false;
    }
    return expectedType;
  }




  /**
* Ensures that a task is either accepted or rejected and its status is updated accordingly.
* @param {string} fieldType - The type of the task (Complex , Input).
* @param {string} fieldNumber - The unique identifier of the task.
* @param {string} actionType - The action to perform ('approve' or 'reject').
* @returns {Promise<boolean>} - Returns true if the task is processed successfully.
*/
  async ensureFieldTaskStatus(requestNumber, fieldsMap, requestType) {
    let expectedStatus;
    // await this.navigateToGroupTasksTab();
    await this.navigateToMyCompletedTasksTab();

    // Find the task row in the table
    //await this.page.waitForTimeout(2000);
    let fieldRow = await this.search.getRowInTableWithSpecificText(requestNumber);
    var actionLocator = "button";
    await this.search.clickRowAction(fieldRow, this.tableActions, actionLocator);

    // Check if the status is updated accordingly
    expectedStatus = global.testConfig.createField.requestStatusComplete;
    var result = await this.taskDetailsPage.checkFieldRequestStatus(expectedStatus);

    // Check if the status is updated accordingly
    var result = await this.taskDetailsPage.checkFieldsDecisionStatus(fieldsMap, requestType);
    // Log the result based on the action
    if (result) { return true }
    return false
  }


  /**
   * Handles task approval or rejection.
   * @param {string} taskType - The type of the task (stream, mainProgram, subProgram, benefit).
   * @param {string} taskNumber - The unique identifier of the task.
   * @param {string} actionType - The action to perform ('approve' or 'reject').
   * @returns {Promise<boolean>} - Returns true if the task is processed successfully.
   */

  // take map and pass it to 282
  async manageRequestField(requestNumber, fieldsMap, reqType) {
    let status;
    let allFieldsProcessed = true;
  


    //await this.navigateToMyCompletedTasksTab();
    await this.navigateToMyTasksTab();

    await this.page.waitForTimeout(5000);

    let taskRow = await this.search.getRowInTableWithSpecificText(requestNumber);
    await this.checkFieldRequestType(taskRow, reqType);
    var actionLocator = "button";

    await this.search.clickRowAction(taskRow, this.tableActions, actionLocator);
    console.log(`Navigate To Task Details Page Successfully`);

    var initialTaskStatus = global.testConfig.createField.requestStatusProcessing;
    status = await this.taskDetailsPage.checkFieldRequestStatus(initialTaskStatus);
    await this.page.waitForTimeout(5000);
    // Process each field from the map
    for (const [fieldID, actionType] of fieldsMap.entries()) {
      console.log(`Processing Field: ${fieldID} with Action: ${actionType}`);
      var processResult = await this.taskDetailsPage.processFields(fieldID, actionType, reqType);
      if (!processResult) {
        allFieldsProcessed = false;
      }
    }
    await this.page.waitForTimeout(1000);
    var sendRequest = await this.taskDetailsPage.clickOnProcessRequrstBtn();
    var ensureStatus = await this.ensureFieldTaskStatus(requestNumber, fieldsMap, reqType);

    // If all steps are successful, return true && ensureStatus && requestType
    if (status && allFieldsProcessed && ensureStatus && sendRequest) { return true; }

    return false;
  }



  async checkFieldRequestType(taskRow, requestType) {
    //await this.page.waitForTimeout(7000);
    let expectedFieldMsg = global.testConfig.tasks.expectFieldTaskType;
    let expectedDomainMsg = global.testConfig.tasks.expectedSubDomainTaskType;
    let actionLocator = taskRow[3].tdLocator;
    let actualType = await actionLocator.textContent();

    if (requestType == Constants.FIELDS_REQUEST) {
      if (actualType.trim() === expectedFieldMsg.trim()) {
        console.log(`Task Request Type is ${actualType}`);
        return true;
      }
      return false

    } else {
      if (actualType.trim() === expectedDomainMsg.trim()) {
        console.log(`Task Request Type is ${actualType}`);
        return true;
      }
      return false
    }
  }

  async ensureIsrTaskStatus(taskType, actionType, taskNumber) {
    //ensure task moved to completed tasks
    await this.navigateToMyCompletedTasksTab();
    await this.page.waitForTimeout(3000);
    let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    if (taskRow.length > 0) {
      console.log("Task is moved to completed tasks successfully");
      var actionLocator = "button";
      await this.search.clickRowAction(taskRow, this.tableActions, actionLocator);
      await this.taskDetailsPage.checkIsrEnablementStatus(actionType)
      console.log(`Navigate To ${taskType} Details Page Successfully`);
      return true;
    } else if (taskRow.length === 0) {
      console.log("Task is not moved to completed tasks Page");
      return false;
    }
  }

  async manageISRTask(taskType, actionType, taskNumber, fieldEnglishName) {
    //let requestType;
    let taskStatus;
    let ensureStatus;

    await this.navigateToMyTasksTab();
    let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    var actionLocator = "button";
    await this.search.clickRowAction(taskRow, this.tableActions, actionLocator);
    console.log(`Navigate To ${taskType} Details Page Successfully`);

    taskStatus = await this.taskDetailsPage.completeIsrTask(actionType, fieldEnglishName);
    ensureStatus = await this.ensureIsrTaskStatus(taskType, actionType, taskNumber);
    if (taskStatus && ensureStatus) {
      return true;
    }
    else {
      return false;
    }
  }
  //Verify field changed to restricted مقيد
  async ensureFieldChangedInCustomizeSettings(taskNumber, socialRecordCopiesData) {
    await this.navigateToMyTasksTab();
    let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    var actionLocator = "button";
    await this.search.clickRowAction(taskRow, this.tableActions, actionLocator);
    return await this.taskDetailsPage.ensureFieldCustomizationSettings(socialRecordCopiesData);
  }



}
module.exports = { TasksPage };