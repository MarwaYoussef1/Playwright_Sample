import { timeout } from "../../../playwright.config";

/**
 * Manages interactions with pop-up messages, including handling confirmation messages
 * and filling input fields within pop-ups.
 * @class
 */
export class DropDownMenuPage {
  constructor(page) {
    this.page = page;
  }                                

  /**
 * Selects an option from a dropdown menu based on its visible text,
 * or selects the first visible option if no expectedValue is provided.
 * @param {string} dropdownLocator - The selector for the dropdown element.
 * @param {string|null} [expectedValue=null] - The visible text of the option to select (optional).
 * @returns {Promise<void>}
 */
async selectDropdownValue(dropdownLocator, expectedValue = null , listLocator) {
    await this.page.waitForTimeout(1000);
     await this.page.waitForSelector(dropdownLocator, { visible: true,timeout:50000 });
    await this.page.click(dropdownLocator);
    await this.page.waitForTimeout(1000);
   await this.page.waitForSelector(listLocator, { visible: true,timeout:50000 });

    const optionsLocator = this.page.locator(listLocator);
    const count = await optionsLocator.count();

    if (expectedValue) {
      for (let i = 0; i < count; i++) {
        const option = optionsLocator.nth(i);
        if (await option.isVisible()) {
          const text = await option.textContent();
          if (text?.trim() === expectedValue.trim()) {
            await option.click({ force: true });
            console.log(`Selected option: ${text.trim()}`);
            return;
          }
        }
      }
    } else {
      for (let i = 0; i < count; i++) {
        const option = optionsLocator.nth(i);
        if (await option.isVisible()) {
          await option.click({ force: true });
          return;
        }
      }
    }
}

async selectMultipleDropdownValues(dropdownLocator, valuesList , listLocator) {
  for (const value of valuesList) {
    await this.page.click(dropdownLocator);
    await this.page.waitForTimeout(1000);

    const optionsLocator = this.page.locator(listLocator);
    const count = await optionsLocator.count();

    let matched = false;
    for (let i = 0; i < count; i++) {
      const option = optionsLocator.nth(i);
      if (await option.isVisible()) {
        const text = await option.textContent();
        if (text?.trim() === value?.trim()) {
          await option.click({ force: true });
          console.log(`Selected option: ${text.trim()}`);
          matched = true;
          break;
        }
      }
    }

    if (matched) {
      await this.page.keyboard.press("Tab");
    }
  }
}
 

}
module.exports = { DropDownMenuPage };
