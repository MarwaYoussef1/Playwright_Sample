const { SearchPage } = require("./SharedPages/SearchPage");

/**
 * Manages component-related actions, such as creating new components, searching for components,
 * and initiating main program creation for selected components.
 * @class
 */
export class ComponentsAuditLogsPage {

  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.searchInput = '//form[@data-testid="search-input"]//input';
    this.componentsTable = "//table//tbody";
    
  }


  /**
   * Searches for a specific component by its name.
   * @param {string} componentName - The name of the component to search for.
   * @returns {Promise<Array|null>} - An array of row details if the component is found, or null if no match is found.
   */
  async searchOnSpecificComponent(componentName) {
    let componentRow = [];
    componentRow = await new SearchPage(this.page).searchOnUniqueRow(this.searchInput, componentName );
    if (!componentRow || componentRow.length === 0) {
      return null;
    }
    return componentRow;
  }

   
  /**
 * Validates a row's data against expected values defined in a mapping.
 * @param {Array} componentRow - The array of row tdLocator objects.
 * @param {Object} componentData - The data object with getter methods.
 * @param {Array} componentMap - Array of mappings { index, getter }.
 * @returns {Promise<boolean>} - True if all values match, otherwise false.
 */
    async checkComponentRowDetails( componentId, componentMap) {
      
      let componentRow = [];
      componentRow = await this.searchOnSpecificComponent(componentId);
      if (componentRow && componentRow.length > 0) {
          for (const { index, expected } of componentMap) {
            const tdLocator = componentRow[index]?.tdLocator;
            if (!tdLocator) {
              console.error(`tdLocator not found at index ${index}`);
              return false;
            }
            const cell = tdLocator.locator("span");
            await cell.waitFor({ state: "visible" });
            const actual = (await cell.textContent()).trim();
            const expectedValue = expected();
            // console.log(`expected "${expectedValue}", "${actual}"`);
            if (actual !== expectedValue.trim()) {
              console.error(`Mismatch at index ${index}: expected "${expectedValue}", got "${actual}"`);
              return false;
            }
          }
          console.log("All fields matched successfully.");
          return true;
        }
         return false;
      }
}

module.exports = { ComponentsAuditLogsPage };
