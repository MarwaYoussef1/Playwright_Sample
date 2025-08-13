const { PopUpPage } = require("../../../SharedPages/PopUpPage");

/**
 * Manages actions for creating and handling subprograms, including metadata,
 * targeting data, and program features configuration.
 * @class
 */
export class SubProgramsPage {
  constructor(page) {
    this.page = page;
    // Selectors for metadata section
    this.arabicSubProgramName = '//input[@name="main.nameAr"]';
    this.englishSubProgramName = '//input[@name="main.nameEn"]';
    this.subProgramType = '//div[@id="mui-component-select-main.typeCode"]';
    this.regulationsPublishedDate = '//button[@aria-label="Choose date"]';
    this.designResponsibleEntity ='//div[@id="mui-component-select-governance.designResponsibleGovernance.0.code"]';
    this.responsibleAgency ='//div[@id="mui-component-select-governance.designResponsibleGovernance.0.responsibleCodes"]';
    this.executionEntity ='//div[@id="mui-component-select-governance.executionResponsibleGovernance.0.code"]';
    this.executionAgency ='//div[@id="mui-component-select-governance.executionResponsibleGovernance.0.responsibleCodes"]';
    this.GFS_Budget = '//input[@name="cost.budget"]';
    this.programFundingSources ='//div[@id="mui-component-select-cost.programFundingSourcesCode"]';
    this.movementMechanismRadioBtn ='//input[@name="programSystem.movementMechanism"]';
    this.defineMetadataBtn ='//button[contains(text(),"تعريف البيانات الوصفية")]'; //'//input[@data-testid="next-button"]';

    // Selectors for targeting data section
    this.assistanceUnit ='//div[@id="mui-component-select-targetingData.assistanceUnitCode"]';
    this.conditionsOfAssistanceUnit ='//input[@name="targetingData.conditionsAssistanceUnits.0.condition"]';
    this.approach = '//input[@name="targetingMechanism.approach"]';
    this.defineTargetingDataBtn ='//button[contains(text(),"تعريف بيانات الاستهداف")]';

    // Selectors for program features section
    this.programActivationDate = '//button[@aria-label="Choose date"][1]';
    this.programEndDate = '//button[@aria-label="Choose date"][1]';
    this.programApplicationEnablement ='//input[@name="operatingCharacteristics.applicationEnablement"]';
    this.requireRegistrarApplication ='//input[@name="operatingCharacteristics.requireRegisterApplication"]';
    this.applicationChannels = '//div[@id="mui-component-select-operatingCharacteristics.applicationChannelCodes"]';
    this.reapplicationAfterExit ='//input[@name="resubmitAfterEligible.allowResubmitAfterEligible" and @value="false"]';
    this.reapplicationAfterwithdrawal ='//input[@name="resubmitAfterWithdrawal.allowResubmitAfterWithdrawal" and @value="false"]';
    this.defineProgramFeaturesBtn ='//button[contains(text(),"تعريف خصائص البرنامج")]';
    this.createSubProgramBtn = '//button[@data-testid="next-button"]';//'//button[@data-testid="next-button"]'

    // Selectors for success confirmation
    this.successPopupTitle = '//span[@id="modal-modal-title"]';
    this.backToSubProgramsList ='//button[contains(text(),"العودة لقائمة البرامج الفرعية")]';
  }

  /**
   * Creates a new subprogram with the provided data.
   * @param {object} subProgramsData - Data required to fill out the subprogram form.
   * @returns {Promise<boolean>} - Returns true if the subprogram is created successfully.
   */
  async createNewSubPrograms(subProgramsData) {
    var popUpMsg = new PopUpPage(this.page);

    var createdSubProgramsArName = subProgramsData.getArabicSubProgramName();
    var createdSubProgramsEnName = subProgramsData.getEnglishSubProgramName();

    // Fill metadata section
    await this.page.fill(this.arabicSubProgramName, createdSubProgramsArName);
    await this.page.fill(this.englishSubProgramName, createdSubProgramsEnName);
    await this.selectDropdownOption(this.subProgramType);
    await this.selectTodayDate(this.regulationsPublishedDate);
    await this.selectDropdownOption(this.designResponsibleEntity);
    await this.selectDropdownOption(this.responsibleAgency);
    await this.page.keyboard.press("Tab");
    await this.selectDropdownOption(this.executionEntity);
    await this.selectDropdownOption(this.executionAgency);
    await this.page.keyboard.press("Tab");
    await this.page.fill(this.GFS_Budget, subProgramsData.getGFSBudget());
    await this.selectDropdownOption(this.programFundingSources);
    await this.page.click(this.movementMechanismRadioBtn);
    await this.page.waitForSelector(this.defineMetadataBtn, {
      state: "visible",
    });
    await this.page.click(this.defineMetadataBtn);

    // Fill targeting data section
    await this.selectDropdownOption(this.assistanceUnit);
    await this.page.waitForTimeout(1000);
    await this.page.fill(
      this.conditionsOfAssistanceUnit,
      subProgramsData.getConditionsOfAssistanceUnit()
    );
    await this.page.click(this.approach);
    await this.page.click(this.defineTargetingDataBtn);

    // Fill program features section
    await this.selectTodayDate(this.programActivationDate);
    await this.selectTodayDate(this.programEndDate);
    await this.page.click(this.programApplicationEnablement);
    await this.page.click(this.requireRegistrarApplication);
    await this.selectDropdownOption(this.applicationChannels);
    await this.page.keyboard.press("Tab");
    await this.page.click(this.reapplicationAfterExit);
    await this.page.click(this.reapplicationAfterwithdrawal);
    await this.page.click(this.defineProgramFeaturesBtn);

    // Submit subprogram creation
    await this.page.waitForTimeout(1000);
    await this.page.click(this.createSubProgramBtn);

    await this.page.waitForTimeout(2000);

    // Confirm success
    subProgramsData.setArabicSubProgramName(createdSubProgramsArName);
    subProgramsData.setEnglishSubProgramName(createdSubProgramsEnName);

    var result = await popUpMsg.popUpMessage(
      this.backToSubProgramsList,
      global.testConfig.createSubPrograms.subProgramsSuccessMsg
    );
    return result;
  }

  /**
   * Selects today's date in a date picker.
   * @param {string} dateLocator - Selector for the date picker button.
   * @returns {Promise<void>} - Completes the action.
   */
  async selectTodayDate(dateLocator) {
    await this.page.click(dateLocator);
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector('//div[@role="grid"]', {
      state: "visible",
    });
    await this.page.click(
      '//button[@role="gridcell" and @aria-current="date"]'
    );
  }

  /**
   * Selects the first available option from a dropdown menu.
   * @param {string} dropdownLocator - Selector for the dropdown element.
   * @returns {Promise<void>} - Completes the action.
   */
  async selectDropdownOption(dropdownLocator) {
    await this.page.click(dropdownLocator);
    var optionsLocator = `//li[@role="option" and not(@aria-disabled="true") and @tabindex="0"]`;
    await this.page.waitForSelector(optionsLocator, { state: "visible" });
    var firstOptionLocator = `${optionsLocator}[1]`;
    await this.page.click(firstOptionLocator);
  }
}
