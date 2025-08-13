const { BenefitsManagementPage } = require("./BenefitsManagementPage");

/**
 * Represents the Benefits Details page and provides methods for interacting
 * with benefit-related data, such as viewing, filtering, and managing benefits.
 * @class
 */
export class BenefitsDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for benefits details elements
    this.detailsTab = '//button[@id="tab-3"]';
    this.benefitsTab = '//button[@data-testid="tab-4"]';
    this.createBenefitBtn = '//button[@type="button" and contains(text(),"تعريف إعانة")]';

    this.searchInput = '//form[@data-testid="search-input"]';
    this.metaDataTab = '//button[@data-testid="tab-1"]';
    this.targetDataTab = '//button[@data-testid="tab-2"]';
    this.programFeaturesTab = '//button[@data-testid="tab-3"]';
    this.benefitLogTab = '//button[@data-testid="tab-4"]';

    // Selectors for UI Elements (Benefit Details)
    this.stream = '//span[@data-testid="value_stream"]';
    this.mainProgram = '//span[@data-testid="value_the_main_program"]';
    this.subProgram = '//span[@data-testid="value_the_sub_program"]';
    this.arabicBenefitName = '//span[@data-testid="value_benefit_name_ar"]';
    this.englishBenefitName = '//span[@data-testid="value_benefit_name_en"]';
    this.benefitResponsibleEntity = '//span[@data-testid="value_benefit_responsible_entity"]';

    this.targetApproach = '//span[@data-testid="value_approach"]';

    this.benefitCalculationReceivingEntity = '//span[@data-testid="value_receiving_entity"]';
    // this.benefitCalculationEntity = '//span[@data-testid="value_entity"]';
    this.benefitRecurrence = '//span[@data-testid="value_benefit-rate-details"]';

    this.enablementStatus = '//span[@data-testid="value_benefit_enablement_status"]';
    this.approvalStatus = '//span[@data-testid="value_benefit-approval-status"]';
    this.activationStatus = '//span[@data-testid="value_benefit-activation-status"]';
  }

  
  /**
   * Retrieves all benefit details displayed on the UI dynamically.
   * @returns {Promise<object>} - Object containing all benefit details.
   */
  async getUiBenefitDetails() {
    let benefitDetails = {};

    await this.page.click(this.metaDataTab);
    benefitDetails = {
      streamName: (await this.page.locator(this.stream).textContent()).trim(),
      mainProgramName: (await this.page.locator(this.mainProgram).textContent()).trim(),
      subProgramName: (await this.page.locator(this.subProgram).textContent()).trim(),
      arabicBenefitName: (await this.page.locator(this.arabicBenefitName).textContent()).trim(),
      englishBenefitName: (await this.page.locator(this.englishBenefitName).textContent()).trim(),
      benefitResponsibleEntity :(await this.page.locator(this.benefitResponsibleEntity).textContent()).trim(),
    };
    await this.page.click(this.targetDataTab);
    benefitDetails = {
      ...benefitDetails,
      targetApproach: (await this.page.locator(this.targetApproach).textContent()).trim(),
    };
    // await this.page.click(this.programFeaturesTab);
    // benefitDetails = {
    //   ...benefitDetails,
    //   benefitCalculationEntity: (await this.page.locator(this.benefitCalculationEntity).textContent()).trim()
    // };
    await this.page.click(this.benefitLogTab);
    benefitDetails = {
      ...benefitDetails,
      enablementStatus: (await this.page.locator(this.enablementStatus).textContent()).trim(),
      approvalStatus: (await this.page.locator(this.approvalStatus).textContent()).trim(),
      activationStatus: (await this.page.locator(this.activationStatus).textContent()).trim(),
    };

    return benefitDetails;
  }

  /**
   * Retrieves benefit details from multiple UI tabs and compares them with expected data.
   * @param {object} createdData - The expected benefit details.
   * @param {string} streamNameUI - The expected stream name.
   * @param {string} mainProgramNameUI - The expected main program name.
   * @returns {Promise<boolean>} - Returns true if all details match, otherwise false.
   */
  async compareBenefitDetails(createdData, streamNameUI, mainProgramNameUI,subProgramNameUI) {
    const uiDetails = await this.getUiBenefitDetails();

    const expectedDetails = {
      streamName: streamNameUI,
      mainProgramName: mainProgramNameUI,
      subProgramName: subProgramNameUI,
      arabicBenefitName: createdData.getArabicBenefitName(),
      englishBenefitName: createdData.getEnglishBenefitName(),
      benefitResponsibleEntity :global.testConfig.createBenefits.viewbenefitResponsibleEntity,
      targetApproach: global.testConfig.createBenefits.viewTargetApproach ,
      // benefitCalculationEntity: createdData.getEntity(),
      enablementStatus: global.testConfig.createBenefits.viewEnablementStatus,
      approvalStatus: global.testConfig.createBenefits.viewApprovalStatus,
      activationStatus: global.testConfig.createBenefits.viewActivationStatus ,
    };
      console.log(uiDetails,expectedDetails)

    const allValid = Object.keys(expectedDetails).every((key) => uiDetails[key] === expectedDetails[key]);

    if (allValid) {
      console.log("Benefit details match expected data.");
    } else {
      console.error("Benefit details do not match expected data.");
    }

    return allValid;
  }
}

module.exports = { BenefitsDetailsPage };
