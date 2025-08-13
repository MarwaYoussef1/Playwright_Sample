const { EntityPage } = require("./EntityPage");
const { SearchPage } = require("../../SharedPages/SearchPage");

export class EntitiesManagementPage {

  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    
    this.defineAnEntityBtn = '//button[@data-testid="define-entity-btn"]';
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.entitiesTable = "//table//tbody";
    this.tableActions='table-actions';
    this.tableThreeDots='three-dots-menu';
    this.createMainProgramOption = '//*[@data-testid="three-dots-menu-option-0"]';
    
  }

  /**
   * Clicks on the "Define An Entity" button to open the entity creation form.
   * @returns {Promise<void>} - Completes the action of opening the entity form.
   */
  async clickOnDefineAnEntity() {
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(this.entitiesTable, { state: "visible", timeout: 5000  });
    await this.page.click(this.defineAnEntityBtn);
  }

  /**
   * Creates a new entity using the provided entity data.
   * @param {object} entityData - Data required for creating a new entity.
   * @returns {Promise<boolean>} - Returns true if the entity is created successfully.
   */
  async createEntity(entityData) {
    await this.clickOnDefineAnEntity();
    var entityPage = new EntityPage(this.page);
    const result = await entityPage.createNewEntity(entityData);
    return result;
  }

  /**
   * Searches for a specific entity by its name.
   * @param {string} entityName - The name of the entity to search for.
   * @returns {Promise<Array|null>} - An array of row details if the entity is found, or null if no match is found.
   */
  async searchOnSpecificEntity(entityName) {
    let entityRow = [];
    entityRow = await new SearchPage(this.page).searchOnUniqueRow(
      this.searchInput,
      entityName,
    );
    if (!entityRow || entityRow.length === 0) {
      return null;
    }
    return entityRow;
  }

 

  /**
   * Verifies the details of a specific entity, ensuring the Arabic and English names match the expected values.
   * @param {object} entityData - The entity data object containing expected names and details.
   * @returns {Promise<boolean>} - Returns true if the entity details match the expected values; otherwise, false.
   */
  async checkEntityRowDetails(entityData) {
    let arabicTd;
    let arabicName;
    let entityRow = [];

    entityRow = await this.searchOnSpecificEntity(entityData.getEntityName());

    if (entityRow && entityRow.length > 0) {
      arabicTd = entityRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

    }

    if (actualArabicName === entityData.getEntityName() ) {
      console.log("Entity Name matched successfully.");
      let entitySerialNo = await entityRow[0].tdLocator.textContent();
      entityData.setCreatedEntitySerialNo(entitySerialNo);
      console.log("Created Entity SerialNo. set in EntityData: " + entitySerialNo);
      return true;
    }
    return false;
  }
  
}

module.exports = { EntitiesManagementPage };
