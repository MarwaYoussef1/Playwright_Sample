/**
 * Manages interactions with pop-up messages, including handling confirmation messages
 * and filling input fields within pop-ups.
 * @class
 */
export class PopUpPage {
  constructor(page) {
    this.page = page;
    this.messageLocator = '//span[@id="modal-modal-title"]';//data-testid="modal-title"
  }

  /*async popUpMessage(actionButton, partialMessage) {
    await this.page.waitForTimeout(5000);
    await this.page.waitForSelector(actionButton, { visible: true, timeout: 50000 });
    var fullMessage = await this.page.textContent(this.messageLocator);
    if (fullMessage.includes(partialMessage)) {
      await this.page.click(actionButton);
      await this.page.waitForTimeout(5000);
     // await this.page.waitForSelector(actionButton, { visible: false });
    //await this.page.locator(this.messageLocator).waitFor({ state: "detached" , timeout: 60000});
      
    }
    return true;
  }*/
 
   
async popUpMessage(actionButton, partialExpectedMessage) {
  // Build dynamic XPath with the partialExpectedMessage
  var dynamicMessageLocator = `${this.messageLocator}[contains(normalize-space(.), "${partialExpectedMessage}")]`;
  console.log(`Waiting for popup containing: "${partialExpectedMessage}"`);
  // 1. Wait for the popup with matching text to be visible
  await this.page.waitForSelector(dynamicMessageLocator, { visible: true, timeout: 50000 });
  // 2. Click the action button
 var fullMessage = await this.page.textContent(this.messageLocator);
  console.log(`Message '${fullMessage}' found`);
  await this.page.click(actionButton);
  // 3. Wait for the popup to change/disappear (debug logging inside)
  await this.page.waitForSelector(dynamicMessageLocator, { state: 'hidden', timeout: 60000 });
   console.log(`Message '${fullMessage}' disappeared`);
  return true;
}












  /**
   * Fills input text in a popup and submits it.
   * @param {string} inputMsgLocator - Selector for the input field within the popup.
   * @param {string} actionButton - Selector for the button to submit the input.
   * @param {string} inputMsg - The text to input into the field.
   * @returns {Promise<void>} - Completes the action and waits for the popup to close.
   */
  async inputPopUpMessage(inputMsgLocator, actionButton, inputMsg) {
    await this.page.waitForTimeout(2000);
    const textAreaLocator = this.page.locator(inputMsgLocator);
    await textAreaLocator.waitFor({ state: "visible", timeout: 50000 });
    await textAreaLocator.fill(inputMsg);
    await this.page.click(actionButton);
    await this.page.waitForTimeout(6000);
    //await this.page.locator(actionButton).waitFor({ state: "detached" , timeout: 50000});
  }

  async fieldPopUpMessage() {

    const popupTabs = this.page.locator('[role="dialog"] [role="tablist"] button');

    await popupTabs.first().waitFor({ state: 'visible', timeout: 5000 });

    const tabCount = await popupTabs.count();

    for (let i = 0; i < tabCount; i++) {
      const tab = popupTabs.nth(i);
      await tab.scrollIntoViewIfNeeded();
      await tab.click();
      await this.page.waitForTimeout(500); // Small wait after each click
    }

  }


}
module.exports = { PopUpPage };
