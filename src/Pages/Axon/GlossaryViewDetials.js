import Constants from '../../Utils/Constants';

export class GlossaryViewDetials {
    //Page Construtor
    constructor(page) {
        this.page = page;
        // Store selectors as properties
        this.nameSelector = '#glossary-grid-summary nav span.text-semibold';
        this.definitionSelector = 'div.card-body.card-body-highlight > div.facet-description';
        this.parentNameSelector = '(//a[@class="breadcrumbPopovers"])[last()]';
        this.arabicNameSelector = '//label[contains(text(), "Arabic Field Name")]/following-sibling::div';
        this.arabicDescriptionSelector = '//label[contains(text(), "Arabic Field Description")]/following-sibling::div';
        this.fieldNatureSelector = '//label[contains(text(), "Field Nature")]/following-sibling::div';
        this.fieldSourceSelector = '//label[contains(text(), "Field Source")]/following-sibling::div';
        this.axonStatusSelector = '//span[contains(text(), "Axon Status:")]/following-sibling::span';
  }
  
 /**
 * Retrieves all glossary field details from the UI after creation.
 * @returns {Promise<object>} - Object containing the actual glossary field details from the UI.
 */
async getGlossaryFieldUiDetails() {
    return {
      name: (await this.page.locator(this.nameSelector).last().textContent())?.trim(),
      definition: (await this.page.locator(this.definitionSelector).textContent())?.trim(),
      parentName: (await this.page.locator(this.parentNameSelector).textContent())?.trim(),
      arabicFieldName: (await this.page.locator(this.arabicNameSelector).textContent())?.trim(),
      arabicFieldDescription: (await this.page.locator(this.arabicDescriptionSelector).textContent())?.trim(),
      fieldNature: (await this.page.locator(this.fieldNatureSelector).textContent())?.trim(),
      fieldSource: (await this.page.locator(this.fieldSourceSelector).textContent())?.trim(),
      axonStatus: (await this.page.locator(this.axonStatusSelector).textContent())?.trim()
    };
  }
  
 /**
 * Verifies glossary field UI details based on internal expected rules.
 * @param {object} fieldData - Field data object (used for name/description/etc).
 * @param {string} mode - Optional constant: 'beforeApprove' or 'afterApprove' for switching expected values.
 */
  async verifyCreatedGlossaryField(fieldData) {

    console.log("Start Checking Glossary Data");
    const expected = {
      name: fieldData.getEnglishFieldName(),
      definition: fieldData.getEnglishFieldDescription(),
      parentName: fieldData.getGlossaryParentName(),
      arabicFieldName: fieldData.getArabicFieldName(),
      arabicFieldDescription: fieldData.getArabicFieldDescription(),
      fieldNature: fieldData.getGlossaryFieldNature(),
      fieldSource: fieldData.getGlossaryFieldSource(),
      axonStatus: fieldData.getGlossaryAxonStatus(),
    };

    const actual = await this.getGlossaryFieldUiDetails();

    // console.log(actual,expected)

    const allMatch = Object.keys(expected).every(key => actual[key] === expected[key]);
  
    if (allMatch) {
      console.log("Glossary field details match expected data.");
    } else {
      console.error("Mismatch found in glossary field verification:");
      for (const key of Object.keys(expected)) {
        if (actual[key] !== expected[key]) {
          console.error(`✘ ${key}: expected "${expected[key]}", got "${actual[key]}"`);
        }
      }
    }
    return allMatch;
  }
}

module.exports = {  GlossaryViewDetials };
