import Constants from "../../../Utils/Constants.js";
const { PopUpPage } = require("../../SharedPages/PopUpPage");
const { SearchPage } = require("../../SharedPages/SearchPage");
const { FormIoPage } = require("../../SharedPages/FormIoPage.js");
const { UploadFilePage } = require("../../SharedPages/UploadFilePage.js");

/**
 * Manages task details, including opening tabs, adding notes, and accepting various task types.
 * @class
 */
export class TaskDetailsPage {
  constructor(page) {
    this.page = page;
    this.popUpMsg = new PopUpPage(this.page);
    this.search = new SearchPage(this.page);
    this.formIoPage = new FormIoPage(this.page);
    this.uploadFilePage = new UploadFilePage(page);
    // Selectors for tabs
    this.myDataTab = '//button[@id="tab-0"]';
    this.myNotesTab = '//button[@id="tab-1"]';

    // Selectors for task details and actions
    this.streamEnablementStatus =
      '//span[@data-testid="value_streams-management-stream-enablement-status"]';
    this.mainProgramEnablementStatus =
      '//span[@data-testid="value_main-program-enablement-status"]';
    this.subProgramEnablementStatus =
      '//span[@data-testid="value_enablement-status"]';
    this.benefitEnablementStatus =
      '//span[@data-testid="value_benefit_enablement_status"]';

    this.addNoteBtn = '//button[contains(text(),"إضافة ملاحظة")]';
    this.noteOnTaskField = '//textarea[@name="message"]';
    this.acceptNoteOnTaskBtn =
      '//button[contains(@class, "MuiButton-containedPrimary") and contains(@class, "MuiButton-sizeMedium")]';
    this.ensureNoteMsgTitle =
      '//span[@id="modal-modal-title" and contains(text(), "إضافة الملاحظة")]';
    this.acceptEnsureNoteMsgBtn =
      '//button[@data-testid="confirmation-modal-primary-button"]'; //confirmation-modal-primary-button
    this.confirmNoteMsgTitle =
      '//div[@class="MuiStack-root muirtl-zwd3xv"]/span[@id="modal-modal-title"]';
    this.acceptConfirmNoteMsgBtn =
      '//button[contains(@class, "MuiButtonBase-root") and text()="العودة"]';
    this.addedNoteLocator =
      "div.MuiStack-root.muirtl-1ofqig9 > span:nth-child(3)";

    // Selectors for accepting tasks
    this.acceptTaskBtn = '//button[@data-testid="accept-request"]';

    // Selectors for accepting tasks
    this.rejectTaskBtn = '//button[@data-testid="reject-request"]';

    // Selectors for task notes and confirmations
    this.ensureTaskNotesField =
      '//textarea[@data-testid="description-text-field"]';
    this.ensureTaskNotesBtn =
      '//button[@data-testid="process-action-modal-primary-button"]';
    this.confirmTaskMsgTitle = '//span[@id="modal-modal-title"]';
    this.backToTasksBtn = '//button[@data-testid="modal-primary-button"]';

    //selectors for fields and sub domains Tasks
    this.fieldRequestStatusIcon = '//span[@data-testid="status-processing"]';
    this.fieldRequestStatus =
      "//label[text()='حالة الطلب']//following::span[1]";
    this.tableActions = "tag";
    this.acceptFieldTaskBtn =
      "//div[contains(@class,'MuiDialogActions-root')]//button[1]";
    this.rejectFieldTaskBtn =
      "//div[contains(@class,'MuiDialogActions-root')]//button[2]";
    this.ensureFieldTaskNotesField =
      '//textarea[@data-testid="description-text-field"]';
    (this.ensureFieldTaskNotesFieldApprove = "//button[@type='submit']"),
      (this.ensureFieldTaskNotesFieldReject = "//button[@type='submit']"),
      (this.backToTasksBtn = '//button[@data-testid="modal-primary-button"]'),
      //this.processingRequestBtn='//button[contains(text(),"معالجة طلب تحديث مكتبة الحقول")]'
      this.processingRequestBtn = '//button[contains(@class,"iButton-containedPrimary")]' //yasmine
//button[@data-testid="modal-primary-button"]

    this.isrTaskRejectBtn = '//button[contains(text(), "رفض طلب تحديث نسخة السجل الاجتماعي")]';
    this.isrTaskNote = '//textarea[@data-testid="note-text-field"]';
    this.isrConfirmRejectBtn = '//button[contains(text(), "نعم، رفض")]';
    this.isrTaskApproveBtn =
      '//button[contains(text(), "قبول طلب تحديث نسخة السجل الاجتماعي")]';
    this.isrTaskCompleteDataStructuringBtn =
      '//button[contains(text(), "إكمال هيكلة البيانات")]';
    this.isrTaskCompleteComputationalFieldDesignBtn =
      '//button[contains(text(), "إكمال تصميم العملية الحسابية للحقول الحسابية")]';
    this.isrConfirmComputationalFieldDesignApproveBtn =
      '//button[contains(text(), "تأكيد إكمال تصميم العملية الحسابية للحقول الحسابية")]';
    this.isrTaskDesignSaveBtn = '//button[text()="حفظ"]';
    this.isrTaskCompleteDesignFormBtn =
      '//button[contains(text(), "إكمال تصميم نموذج الاستعراض")]';
    this.isrConfirmApproveBtn = '//button[contains(text(), "نعم، قبول!")]';
    this.popupConfirmBtn = '//button[@data-testid="modal-primary-button"]';
    this.dropItemLocation =
      '//div[@class="builder-components drag-container formio-builder-form"]';
    this.attachButton = '//button[@data-testid="tooltip-button"]';
    this.isrCompletedTaskStatusTag =
      '(//div[contains(@class, "MuiGrid-root") and contains(@class, "MuiGrid-item") and contains(@class, "MuiGrid-grid")]//div//span)[5]';

    this.searchField = '//input[@data-testid="search-input-base"]';
    this.existingFieldDetailsBtn =
      '//tbody[@data-testid="table-body"]//td[7]//button';
    this.isrSettingsTab = '//button[@data-testid="tab-4"]';
    this.privilegeViewingFieldRestrictedData = '(//div[@ref="value"])[4]';
    this.closeFieldDetailsBtn = "//h2//button";

    this.validateShowInApplicantPortal =
      '(//*[contains(@ref,"nested-fieldSet1")]//*[contains(@class,"formio-component-checkbox")])[1]//*[@ref="value"]';
    this.validateShowInOperatingPortal =
      '(//*[contains(@ref,"nested-fieldSet1")]//*[contains(@class,"formio-component-checkbox")])[2]//*[@ref="value"]';
    this.validateShowInAdministrationPortal =
      '(//*[contains(@ref,"nested-fieldSet1")]//*[contains(@class,"formio-component-checkbox")])[3]//*[@ref="value"]';
    this.validateAddFieldToFormOneMandatory =
      '//*[contains(@class,"formio-component-addField1")]//*[@ref="value"]';
    this.validateAddFieldToFormTwoMandatory =
      '//*[contains(@class,"formio-component-addField2")]//*[@ref="value"]';
    this.validateAddFieldToFormThreeMandatory =
      '//*[contains(@class,"formio-component-addField3")]//*[@ref="value"]';
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
  async checkEnablementStatus(taskType, expectedStatus) {
    // Wait for the status element to be visible
    await this.page.waitForTimeout(10000);
    console.log("expected status is " + expectedStatus);
    var statusElement = this.page.locator(
      await this.getstatusLocator(taskType)
    );
    await statusElement.waitFor({ state: "visible", timeout: 30000 });
    var actualStatus = await statusElement.textContent();
    if (actualStatus.trim() === expectedStatus.trim()) {
      console.log(
        `Enablement Status is as expected: "${actualStatus.trim()}".`
      );
      return true;
    }
    return false;
    // return true;
  }

  /**
   * Checks whether the task's enablement status matches the expected status.
   * @param {string} expectedStatus - The expected enablement status.
   * @returns {Promise<boolean>} - Returns true if the status matches; otherwise, false.
   */
  async checkIsrEnablementStatus(actionType) {
    // Wait for the status element to be visible
    await this.page.waitForTimeout(10000);
    var statusElement = this.page.locator(this.isrCompletedTaskStatusTag);
    await statusElement.waitFor({ state: "visible", timeout: 30000 });
    var actualStatus = await statusElement.textContent();
    if (actionType === Constants.APPROVE) {
      if (
        actualStatus.trim() ===
        global.testConfig.SocialRecordCopies.socialRecordCopyStatusExecute
      ) {
        console.log(
          `Enablement Status is as expected: "${actualStatus.trim()}".`
        );
        return true;
      }
      return false;
    } else if (actionType === Constants.REJECT) {
      if (
        actualStatus.trim() ===
        global.testConfig.SocialRecordCopies.socialRecordCopyStatusCompleted
      ) {
        console.log(
          `Enablement Status is as expected: "${actualStatus.trim()}".`
        );
        return true;
      }
      return false;
    }
  }

  // Determine the locator for the status based on taskType
  async getstatusLocator(taskType) {
    var statusLocator;
    switch (taskType) {
      case Constants.STREAM:
        statusLocator = this.streamEnablementStatus;
        break;
      case Constants.MAIN_PROGRAM:
        statusLocator = this.mainProgramEnablementStatus;
        break;
      case Constants.SUB_PROGRAM:
        statusLocator = this.subProgramEnablementStatus;
        break;
      case Constants.BENEFIT:
        statusLocator = this.benefitEnablementStatus;
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
    var displayedNote = this.page.locator(
      '//*[contains(text(),"' + addedNote + '")]'
    );
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
    await this.page.waitForSelector(this.addNoteBtn, {
      state: "visible",
      timeout: 50000,
    });
    await this.page.click(this.addNoteBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(
      this.noteOnTaskField,
      this.acceptNoteOnTaskBtn,
      global.testConfig.taskDetails.note
    );
    await popUpMsg.popUpMessage(
      this.acceptEnsureNoteMsgBtn,
      global.testConfig.taskDetails.ensureNoteMsg
    );
    await popUpMsg.popUpMessage(
      this.acceptConfirmNoteMsgBtn,
      global.testConfig.taskDetails.confirmNoteMsg
    );

    let result = await this.checkNoteIsAdded(
      global.testConfig.taskDetails.note
    );
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

    actionBtn =
      actionType === Constants.APPROVE
        ? this.acceptTaskBtn
        : this.rejectTaskBtn;
    await this.page.click(actionBtn);
    //await this.page.waitForTimeout(2000);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(
      this.ensureTaskNotesField,
      this.ensureTaskNotesBtn,
      global.testConfig.taskDetails.addCompleteTaskNote
    );
    var result = await popUpMsg.popUpMessage(this.backToTasksBtn, confirmMsg);

    if (result) {
      console.log(
        `The ${taskType} ${actionType === Constants.APPROVE ? "Accepted" : "Rejected"} Successfully.`
      );
    }

    return result;
  }

  /**
   * Accepts or rejects a task based on the task type and action type.
   * @param {string} actionType - The action to perform ('approve' or 'reject').
   * @param {string} taskType - The type of the task ('stream', 'mainProgram', 'subProgram', 'benefits').
   * @returns {Promise<boolean>} - Returns true if the task is accepted or rejected successfully.
   */
  async completeIsrTask(actionType, fieldEnglishName) {
    var inputPopUpActionButton;
    var inputPopUpText;
    var popUpMsg;

    if (actionType === Constants.REJECT) {
      //reject request
      await this.page.click(this.isrTaskRejectBtn);
      //attach file
      await this.uploadFilePage.uploadFile(
        global.testConfig.SocialRecordCopies.socialRecordTaskPDF,
        null
      );
      inputPopUpActionButton = this.isrConfirmRejectBtn;
      inputPopUpText = global.testConfig.taskDetails.isrRejectReason;
      popUpMsg = global.testConfig.taskDetails.confirmRejectISRMsg;
      console.log("The Task Rejected successfully");
    }

    if (actionType === Constants.APPROVE) {
      //approve request
      await this.page.click(this.isrTaskApproveBtn);
      inputPopUpActionButton = this.isrConfirmApproveBtn;
      inputPopUpText = global.testConfig.taskDetails.isrApproveNote;
      popUpMsg = global.testConfig.taskDetails.confirmApproveISRMsg;
      console.log("The Task Accepted successfully");
    }

    if (actionType === Constants.COMPLETE_DATA_STRUCTURING) {
      //approve request
      await this.page.click(this.isrTaskCompleteDataStructuringBtn);
      inputPopUpActionButton = this.isrConfirmApproveBtn;
      inputPopUpText = global.testConfig.taskDetails.isrApproveNote;
      popUpMsg = global.testConfig.taskDetails.confirmDataStructuringMsg;
      console.log("Complete Data Structuring Task Accepted successfully");
    }

    if (actionType === Constants.COMPUTATIONAL_FIELD_DESIGN) {
      //approve request
      await this.page.click(this.isrTaskCompleteComputationalFieldDesignBtn);
      inputPopUpActionButton =
        this.isrConfirmComputationalFieldDesignApproveBtn;
      inputPopUpText = global.testConfig.taskDetails.isrApproveNote;
      popUpMsg =
        global.testConfig.taskDetails.confirmComputationalFieldDesignMsg;
      console.log(
        "Complete Computational Field Design Task Accepted successfully"
      );
    }

    if (actionType === Constants.COMPLETE_DESIGN_FORM) {
      var ConcatenatedFieldEnName = fieldEnglishName
        .split(" ")
        .map((word, index) =>
          index === 0
            ? word.charAt(0).toLowerCase() + word.slice(1).toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
      console.log("Concatenated Field English Name: ", ConcatenatedFieldEnName);
      //formIO
      let formIoCreationResult = await this.formIoPage.createFormIoTextField(
        [Constants.FORMIO_DISPLAY, Constants.FORMIO_API],
        "label Dummy Auto",
        ConcatenatedFieldEnName,
        this.dropItemLocation
      );
      if (formIoCreationResult) {
        //approve request
        await this.page.click(this.isrTaskDesignSaveBtn);
        await this.page.waitForTimeout(2000);
        await this.page.click(this.isrTaskCompleteDesignFormBtn);
        inputPopUpActionButton = this.isrConfirmApproveBtn;
        inputPopUpText = global.testConfig.taskDetails.isrApproveNote;
        popUpMsg =
          global.testConfig.taskDetails.confirmCompleteDesignFormISRMsg;
        console.log("Form Design Task Accepted successfully");
      }
    }
    await this.popUpMsg.inputPopUpMessage(
      this.isrTaskNote,
      inputPopUpActionButton,
      inputPopUpText
    );
    var popUpResult = await this.popUpMsg.popUpMessage(
      this.popupConfirmBtn,
      popUpMsg
    );

    return popUpResult;
  }

  /**
   * Checks whether the field task's Request status matches the expected status.
   * @param {string} expectedStatus - The expected Request status.
   * @returns {Promise<boolean>} - Returns true if the status matches; otherwise, false.
   */
  async checkFieldRequestStatus(expectedStatus) {
    // Wait for the status element to be visible
    await this.page.waitForTimeout(2000);

    var fieldStatus = this.page.locator(this.fieldRequestStatus);
    await fieldStatus.waitFor({ state: "visible", timeout: 30000 });
    var actualStatus = await fieldStatus.textContent();
    if (actualStatus.trim() === expectedStatus.trim()) {
      console.log(`Request Status is as expected: "${actualStatus.trim()}".`);
      return true;
    }
    return false;
  }

  /**
   * Accepts or rejects a field task based on the field task type and action type.
   * @param {string} actionType - The action to perform ('approve' or 'reject').
   * @returns {Promise<boolean>} - Returns true if the task is accepted or rejected successfully.
   */
  async completeFieldTask(actionType, requestType) {
    let actionBtn, notesFieldLocator, confirmFieldMsg;
    var popUpMsg = new PopUpPage(this.page);

    await popUpMsg.fieldPopUpMessage();

    actionBtn =
      actionType === Constants.APPROVE
        ? this.acceptFieldTaskBtn
        : this.rejectFieldTaskBtn;
    notesFieldLocator =
      actionType === Constants.APPROVE
        ? this.ensureFieldTaskNotesFieldApprove
        : this.ensureFieldTaskNotesFieldReject;
    confirmFieldMsg =
      actionType === Constants.APPROVE
        ? global.testConfig.createField.confirmApproveMsg
        : global.testConfig.createField.confirmRejectMsg;

    await this.page.click(actionBtn);

    //await this.page.waitForTimeout(2000);
    await popUpMsg.inputPopUpMessage(
      this.ensureFieldTaskNotesField,
      notesFieldLocator,
      global.testConfig.createField.addCompleteTaskNote
    );
    var result = await popUpMsg.popUpMessage(
      this.backToTasksBtn,
      confirmFieldMsg
    );
    if (requestType == Constants.DOMAINS_REQUEST) {
      await this.page.click(this.backToTasksBtn); //yasmine
    }
    if (result) {
      console.log(
        `The Field ${actionType === Constants.APPROVE ? "Accepted" : "Rejected"} Successfully.`
      );
    }

    return result;
  }

  async processFields(fieldID, actionType, requestType) {
    let fieldRow = await this.search.getRowInTableWithSpecificText(fieldID);
    var lastTd = fieldRow[fieldRow.length - 1].tdLocator;
    // Click the button inside the last <td>
    const actionButton = lastTd.locator("button");
    await actionButton.waitFor({ state: "visible", timeout: 5000 });
    await actionButton.click();

    console.log(`Clicked action button for field: ${fieldID}`);

    // Complete the task (either APPROVE or REJECT)
    var result = await this.completeFieldTask(actionType, requestType);
    return result;
  }

  async clickOnProcessRequrstBtn() {
    var popUpMsg = new PopUpPage(this.page);
    var confirmRequestMsg =
      global.testConfig.taskDetails.confirmFieldRequestMsg;
    await this.page.waitForSelector(this.processingRequestBtn, {
      state: "visible",
      timeout: 5000,
    });
    await this.page.click(this.processingRequestBtn);
    var result = await popUpMsg.popUpMessage(
      this.backToTasksBtn,
      confirmRequestMsg
    );
    if (result) return true;
    else return false;
  }

  async checkFieldsDecisionStatus(fieldsMap, requestType) {
    let fieldsMatched = true;
    // Process each field from the map
    for (const [fieldID, actionType] of fieldsMap.entries()) {
      var expectedStatus =
        actionType === Constants.APPROVE
          ? global.testConfig.createField.desitionStatusAccepted
          : global.testConfig.createField.desitionStatusRejected;

      // Retrieve details for both rows using their row IDs
      let rowDetails = await this.search.getRowInTableWithSpecificText(fieldID);
      let rowStatus = await rowDetails[5].tdLocator.textContent();
      // Assuming the enablement status
      if (requestType == Constants.DOMAINS_REQUEST) {
        rowStatus = await rowDetails[4].tdLocator.textContent();
      }

      console.log(`Row Field Status (ID:  ${fieldID} ) is ${rowStatus}`);

      if (rowStatus.trim() === expectedStatus.trim()) {
        console.log(
          `Desition Status for Field ID ${fieldID} is as expected: "${expectedStatus}"`
        );
      } else {
        console.error(
          `Desition Status mismatch for Field ID ${fieldID}. Expected: "${expectedStatus}", Found: "${rowStatus.trim()}"`
        );
        fieldsMatched = false;
      }
    }

    if (fieldsMatched) {
      console.log("All fields have the correct decision status.");
    } else {
      console.error("One or more fields have incorrect decision status.");
    }

    return fieldsMatched;
  }

  async ensureFieldCustomizationSettings(socialRecordCopiesData) {
    await this.page.waitForSelector(this.searchField, {
      state: "visible",
      timeout: 50000,
    });
    let fieldLibraryTableRow = [];
    fieldLibraryTableRow = await this.search.searchOnUniqueRow(
      this.searchField,
      socialRecordCopiesData.getFieldArName()
    );
    if (fieldLibraryTableRow && fieldLibraryTableRow.length > 0) {
      await this.page.click(this.existingFieldDetailsBtn);
      await this.page.waitForSelector(this.isrSettingsTab, {
        state: "visible",
        timeout: 5000,
      });
      await this.page.click(this.isrSettingsTab);
      await this.page.waitForSelector(
        this.privilegeViewingFieldRestrictedData,
        { state: "visible", timeout: 5000 }
      );
      var actualFieldPrivilegeViewingStatus = await (
        await this.page.$(this.privilegeViewingFieldRestrictedData)
      ).textContent();
      if (
        actualFieldPrivilegeViewingStatus.trim() ===
        global.testConfig.FieldLibrary.fieldStatusRestricted
      ) {
        console.log(
          `Privilege Viewing Field Status is as expected: "${actualFieldPrivilegeViewingStatus.trim()}"`
        );
        await this.validatePersonaizeSettingsFieldsInTaskPage();
        await this.page.click(this.closeFieldDetailsBtn);
        return true;
      } else {
        console.error(
          `Privilege Viewing Field Status mismatch. Expected: "${global.testConfig.FieldLibrary.fieldStatusRestricted}", Found: "${actualFieldPrivilegeViewingStatus.trim()}"`
        );
        return false;
      }
    }
  }

  // validate the personalization settings mandatory and yes text
  async validatePersonaizeSettingsFieldsInTaskPage() {
    // Wait for visibility and get text
    const applicantPortalText = await this.page.textContent(
      this.validateShowInApplicantPortal,
      {
        state: "visible",
        timeout: 60000, // adjust as needed
      }
    );
    const operatingPortalText = await this.page.textContent(
      this.validateShowInOperatingPortal,
      {
        state: "visible",
        timeout: 60000, // adjust as needed
      }
    );
    const administrationPortalText = await this.page.textContent(
      this.validateShowInAdministrationPortal,
      {
        state: "visible",
        timeout: 60000, // adjust as needed
      }
    );
    const formOneMandatoryText = await this.page.textContent(
      this.validateAddFieldToFormOneMandatory,
      {
        state: "visible",
        timeout: 60000, // adjust as needed
      }
    );
    const formTwoMandatoryText = await this.page.textContent(
      this.validateAddFieldToFormTwoMandatory,
      {
        state: "visible",
        timeout: 60000, // adjust as needed
      }
    );
    const formThreeMandatoryText = await this.page.textContent(
      this.validateAddFieldToFormThreeMandatory,
      {
        state: "visible",
        timeout: 60000, // adjust as needed
      }
    );

    // Assert they are as expected
    if (
      applicantPortalText.trim() !==
        global.testConfig.SocialRecordCopies.YesText ||
      operatingPortalText.trim() !==
        global.testConfig.SocialRecordCopies.YesText ||
      administrationPortalText.trim() !==
        global.testConfig.SocialRecordCopies.YesText
    ) {
      throw new Error('One of the "Show in Portal" fields is not set to "نعم"');
    }

    if (
  !formOneMandatoryText.trim().includes(global.testConfig.SocialRecordCopies.MandatoryText) ||
  !formTwoMandatoryText.trim().includes(global.testConfig.SocialRecordCopies.MandatoryText) ||
  !formThreeMandatoryText.trim().includes(global.testConfig.SocialRecordCopies.MandatoryText)
) {
  throw new Error('One of the mandatory form fields is not set to "إجباري"');
}
    console.log(
      "All PersonalizationSettings portal and mandatory field validations passed successfully."
    );
  }
}
module.exports = { TaskDetailsPage };
