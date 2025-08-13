/**
 * Manages search-related actions for tables, including searching for rows by value or text,
 * retrieving row details, and performing actions on specific rows.
 * @class
 */
export class SearchPage {
  constructor(page) {
    this.page = page;
    this.tableSelector = "//table//tbody";
    this.paginationBar = '//ul[contains(@class, "MuiPagination-ul")]';
    this.paginationInput = '//input[@data-testid="pagination-input"]';
    this.goToPageButton = '//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton")] ';
  }

  async searchOnUniqueRow(searchInputSelector, searchValue) {
    let rows;
    let rowCount;
    let uniqueRow;
    let tds;
    let tdDetails = [];
    // Step 1: Enter the search value in the input field
    await this.page.waitForTimeout(10000); //shimaa
    await this.page.fill(searchInputSelector, '');
    await this.page.waitForSelector(`${this.tableSelector}//tr`, { state: 'visible', timeout: 10000 });
    await this.page.waitForSelector(searchInputSelector, { state: 'visible' });
    await this.page.fill(searchInputSelector, searchValue);
    await this.page.waitForTimeout(5000)
    // Step 2: Wait for the table rows to update (assuming the table is dynamically updated)
    await this.page.waitForSelector(`${this.tableSelector}//tr`, { state: 'visible', timeout: 10000 });
    // Step 3: Get all visible rows in the table
    rows = await this.page.locator(`${this.tableSelector}//tr`).filter({ has: this.page.locator('td') });
    // Step 4: Ensure only one row is visible
    rowCount = await rows.count();
    await this.page.waitForTimeout(10000);
    if (rowCount !== 1) {
      throw new Error(`Expected 1 row to be displayed, but found ${rowCount}`);
    }
    // Step 5: Get all <td> locators and their children for the unique row
    uniqueRow = rows.first();
    tds = await uniqueRow.locator("td");

    // Step 6: Map the <td> locators and their children to an array
    var tdCount = await tds.count(); // Get the count of <td> elements

    for (let i = 0; i < tdCount; i++) {
      var td = tds.nth(i); // Access each <td> locator
      var children = await td.locator("*").all(); // Get all child elements (buttons, spans, etc.)
      tdDetails.push({
        tdLocator: td,
        childLocators: children,
      });
    }
    return tdDetails;
  }


  async getFirstRow() {
    let rows;
    let rowCount;
    let tds;
    let tdDetails = [];
    let firstRow;

    // Step 2: Wait for the table rows to update (assuming the table is dynamically updated)
    await this.page.waitForSelector(`${this.tableSelector}//tr`, { state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(10000); 
    // Step 3: Get all visible rows in the table
    rows = await this.page.locator(`${this.tableSelector}//tr`).filter({ has: this.page.locator('td') });
    // Step 4: Ensure only one row is visible
    rowCount = await rows.count();

    // Step 5: Get all <td> locators and their children for the unique row
    firstRow = rows.first();
    tds = await firstRow.locator("td");

    // Step 6: Map the <td> locators and their children to an array
    var tdCount = await tds.count(); // Get the count of <td> elements

    for (let i = 0; i < tdCount; i++) {
      var td = tds.nth(i); // Access each <td> locator
      var children = await td.locator("*").all(); // Get all child elements (buttons, spans, etc.)
      tdDetails.push({
        tdLocator: td,
        childLocators: children,
      });
    }
    return tdDetails;
  }

  /**
   * Clicks on a specific action within a row.
   * @param {Array} row - An array containing details of the row's `<td>` elements.
   * @param {string} parentActionTestId - Data test id for element needs to be clicked or the parent element.
   * @param {string} subActionLocator - Element needs to be clicked.
   *  @returns {Promise<void>} - Performs the action without returning a value.
   */
  async clickRowAction(row, parentActionTestId, subActionLocator) {
    let parentElement;
    let targetElement;
    if (!row || row.length === 0) {
      throw new Error("Row is empty or not found.");
    }

    // Loop through the row's <td> elements to find the correct child
    for (let tdDetail of row) {
      parentElement = tdDetail.tdLocator.locator(`[data-testid="${parentActionTestId}"]`);

      if (await parentElement.count() > 0) {
        if (subActionLocator != null) {
          targetElement = parentElement.locator(subActionLocator);
          await this.page.waitForTimeout(5000);

          await targetElement.click();
        }

        else
          await parentElement.click();
        return; // Exit after clicking the first matching element
      }
    }

    throw new Error(`No child element found with data-testid="${parentActionTestId}" in the row.`);
  }

  async getRowInTableWithSpecificText(text) {
    // Locate the table
    let table;
    let row;
    let rowCount;
    let firstRow;
    let tds;
    let tdDetails = [];

    await this.page.waitForTimeout(10000);//shimaa
    table = this.page.locator(this.tableSelector);


    // Ensure the table exists
    rowCount = await table.count();
    if (rowCount === 0) {
      throw new Error(`No table found with selector: "${this.tableSelector}"`);
    }

    // Locate the row containing a <td> with a <span> that has the specific text inside the table
    row = await this.page.locator(`${this.tableSelector}//tr`).filter({
      has: this.page.locator(`td *:text-is("${text}")`),
      //has: this.page.locator(`td span:has-text("${text}")`),
    });

    // Check if the matching row exists
    rowCount = await row.count();
    if (rowCount === 0) {
      throw new Error(
        `No row found in the table with <span> containing text: "${text}"`
      );
    }

    // Return the first matching row
    firstRow = await row.first();
    tds = await firstRow.locator("td");

    // Step 6: Map the <td> locators and their children to an array
    var tdCount = await tds.count(); // Get the count of <td> elements

    for (let i = 0; i < tdCount; i++) {
      var td = tds.nth(i); // Access each <td> locator
      var children = await td.locator("*").all(); // Get all child elements (buttons, spans, etc.)
      tdDetails.push({
        tdLocator: td,
        childLocators: children,
      });
    }
    return tdDetails;
  }

  //method to check that the table contians one row only
  async checkOnlyOneRowExists() {
    var rows = await this.page.locator(`//table//tbody//tr`).filter({
      has: this.page.locator('td') });
    var count = await rows.count();
    if (count !== 1) {
      throw new Error(`Expected 1 row but found ${count}`);
      return false ;}
    console.log("User Table contains exactly one row.");
    return true;
  }


  /*
   * Clicks on a specific action within a row.
   * @param {Array} row - An array containing details of the row's `<td>` elements.
   * @param {string} parentActionTestId - Data test id for element needs to be clicked or the parent element.
   * @param {string} subActionLocator - Element needs to be clicked.
   *  @returns {Promise<void>} - Performs the action without returning a value.
   */
  async clickRowActionTemp(row, parentActionTestId, subActionLocator) {
    let parentElement;
    let targetElement;
    if (!row || row.length === 0) {
      throw new Error("Row is empty or not found.");
    }

    // Loop through the row's <td> elements to find the correct child
    for (let tdDetail of row) {
      parentElement = tdDetail.tdLocator.locator(parentActionTestId);

      if (await parentElement.count() > 0) {
        if (subActionLocator != null) {
          targetElement = parentElement.locator(subActionLocator);
          await targetElement.click();
        }

        else
          await parentElement.click();
        return; // Exit after clicking the first matching element
      }
    }

    throw new Error(`No child element found with data-testid="${parentActionTestId}" in the row.`);
  }

  /**
     * Navigates to the last page of a paginated table.
     * It finds the pagination bar, retrieves the second-to-last page number,
     * fills it into the input field, and clicks the button to go to that page.
     */
  async goToLastPage() {
    const paginationBar = this.page.locator(this.paginationBar);
    await paginationBar.waitFor({ state: 'visible' });

    const liElements = await paginationBar.locator('li').elementHandles();
    if (liElements.length > 1) {
      const beforeLastLi = liElements[liElements.length - 2];
      const beforeLastLiText = await beforeLastLi.textContent();
      if (beforeLastLiText) {
        await this.page.fill(this.paginationInput, beforeLastLiText.trim());
        await this.page.click(this.goToPageButton);
        await this.page.waitForTimeout(1000);
      }
    }

  }

  async goToPageNumber(pageNumber) {
    await this.page.fill(this.paginationInput, pageNumber);
    await this.page.click(this.goToPageButton);
    await this.page.waitForTimeout(1000);
  }

}
module.exports = { SearchPage };
