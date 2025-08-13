export class AxonSearch {

  constructor(page) {
    this.page = page;
    // Locators
    this.searchInput = '//input[@placeholder="Enter the search text...."]'; 
    this.searchMenuSelector = '//button[@id="facetGroupSelectionButton"]'; 
    this.dataTechnologySubMenu = '[id="facetSelectionDropdownButton_2"]'; 
    this.glossarySearch = 'a[data-facet-id="GLOSSARY"]';  
    this.searchBtn = '//button[normalize-space()="Search"]'; 
  }

  async verifySearchNavigation() {
    await this.page.waitForSelector(this.searchInput, { state: "visible",timeout: 5000});
    return await this.page.locator(this.searchInput).isVisible();
  }
  /**
   * Searches for a glossary field by its name and opens its detail page.
   * @param {string} name - The glossary field name to search.
   */
  async searchAndClickGlossaryField(fieldData) {
    var glossaryName = fieldData.getEnglishFieldName();
    console.log(`Searching for Glossary field: "${glossaryName}"`);
    await this.page.fill(this.searchInput, glossaryName);

    await this.page.locator(this.searchMenuSelector).click();

    await this.page.waitForSelector(this.dataTechnologySubMenu, { state: 'visible' });
    await this.page.locator(this.dataTechnologySubMenu).click();

    await this.page.waitForSelector(this.glossarySearch, { state: 'visible' });
    await this.page.locator(this.glossarySearch).click();

    // Click the Search button and wait for results to load
    await this.page.locator(this.searchBtn).click();
    await this.page.waitForLoadState('networkidle');

    // Open the details page of the matched glossary field
    await this.openGlossaryFieldDetailsPage(glossaryName);
    console.log(`Glossary field Details Page Opened Successfully`);
  }

  /**
   * Finds a glossary row with the specified text and clicks its details link.
   * @param {string} text - Text to locate the row by.
   */
  async openGlossaryFieldDetailsPage(text) {
    // Wait until search result rows are rendered
    await this.page.waitForSelector('tr.odd_axon');

    // Filter rows to find the one that has a <td> containing the specified text
    const rows = this.page.locator('tr.odd_axon');
    const matchedRow = rows.filter({
      has: this.page.locator(`td:has-text("${text}")`)
    }).first();

    // From the matched row, find the 3rd <td> and its child link
    const secondTd = matchedRow.locator('td').nth(2);
    const fieldLink = secondTd.locator('a.link_');
    // Click on the field's link to open its detail page
    await fieldLink.click();
  }
}

module.exports = { AxonSearch };
