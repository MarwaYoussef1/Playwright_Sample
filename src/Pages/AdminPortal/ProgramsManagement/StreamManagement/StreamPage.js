const { PopUpPage } = require("../../../SharedPages/PopUpPage");

/**
 * Manages stream-related actions, such as creating a new stream with metadata, goals,
 * and descriptions, and handling form submissions and validations.
 * @class
 */
export class StreamPage {
  constructor(page) {
    this.page = page;

    // Selectors for stream metadata fields

    this.streamArabicName = '//input[@name="nameAr"]';
    this.streamEnglishName = '//input[@name="nameEn"]';
    this.streamArabicDescription = '//textarea[@name="arabicDescription"]';
    this.streamEnglishDescription = '//textarea[@name="englishDescription"]';
    this.arabicStreamGoal = '//textarea[@name="goalAr"]';
    this.englishStreamGoal = '//textarea[@name="goalEn"]';
    this.arabicGoal = '//textarea[@name="streamGoals.0.nameAr"]';
    this.englishGoal = '//textarea[@name="streamGoals.0.nameEn"]';
    this.streamDefinitionButton = '//button[@type="submit"]';

    // Selectors for success and error messages

    this.successPopupTitle = '//span[@id="modal-modal-title"]';
    this.errorMessage =
      '//span[contains(text(),"يجب إدخال قيم صحيحة في الحقول المطلوبة")]';
    this.backToAllStreamPageButton =
      '//button[contains(text(),"العودة إلى قائمة المسارات")]';
  }

  /**
   * Creates a new stream with the provided data.
   * @param {object} streamData - Object containing the stream data, including names, descriptions, and goals.
   * @returns {Promise<boolean>} - Returns true if the stream is created successfully.
   */
  async createNewStream(streamData) {
    var popUpMsg = new PopUpPage(this.page);

    // Retrieve stream names from the provided data
    var createdStreamEnName = streamData.getstreamEnglishName();
    var createdStreamArName = streamData.getstreamArabicName();

    // Fill stream metadata fields
    await this.page.waitForSelector(this.streamArabicName, {state: "visible",timeout: 5000});
    await this.page.fill(this.streamArabicName, createdStreamArName);
    await this.page.fill(this.streamEnglishName, createdStreamEnName);
    await this.page.fill(this.streamEnglishName, streamData.getstreamEnglishName());
    await this.page.fill(this.streamArabicDescription,streamData.getstreamArabicDescription());
    await this.page.fill(this.streamEnglishDescription,streamData.getstreamEnglishDescription());
    await this.page.fill(this.arabicStreamGoal,streamData.getarabicStreamGoal());
    await this.page.fill(this.englishStreamGoal,streamData.getenglishStreamGoal());
    await this.page.fill(this.arabicGoal, streamData.getarabicGoal());
    await this.page.fill(this.englishGoal, streamData.getenglishGoal());

    // Submit the stream form
    await this.page.waitForSelector(this.streamDefinitionButton, {state: "visible"});
    await this.page.click(this.streamDefinitionButton);

    // Update the stream data with the provided names
    streamData.setstreamEnglishName(createdStreamEnName);
    streamData.setstreamArabicName(createdStreamArName);

    // Handle the success popup
    var result = await popUpMsg.popUpMessage(this.backToAllStreamPageButton,global.testConfig.createStream.streamSuccessMsg);
    return result;
  }
}
module.exports = { StreamPage };
