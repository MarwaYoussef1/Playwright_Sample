const { UserPage } = require("./UserPage");
const { SearchPage } = require("../../SharedPages/SearchPage");

export class UserManagementPage {

  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    
    this.defineUserBtn = '//button[@data-testid="define-user-btn"]';
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.usersTable = "//table//tbody";
  }

  /**
   * Clicks on the "Define New User" button to open the user creation form.
   * @returns {Promise<void>} - Completes the action of opening the user form.
   */
  async clickOnDefineUser() {
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(this.defineUserBtn, { state: "visible", timeout: 5000  });
    await this.page.click(this.defineUserBtn);
  }

  /**
   * Creates a new user using the provided user data.
   * @param {object} userData - Data required for creating a new user.
   * @returns {Promise<boolean>} - Returns true if the user is created successfully.
   */
  async createUser(userData, entityName) {
    await this.clickOnDefineUser();
    var userPage = new UserPage(this.page);
    const result = await userPage.createNewUser(userData , entityName);
    return result;
  }

  /**
   * Verifies the details of a specific user, ensuring the Arabic and English names match the expected values.
   * @param {object} userData - The user data object containing expected names and details.
   * @returns {Promise<boolean>} - Returns true if the user details match the expected values; otherwise, false.
   */
    async checkUserRowDetails(userData , entityName) {
      let userIdTd , userEntityTD;
      let UserID , userEntity;
      let userRow = [];
      var userNationalID = userData.getNationalId()

      await this.page.waitForTimeout(1000); 

      await this.search.checkOnlyOneRowExists();
      await this.page.waitForTimeout(3000); 
      userRow = await this.search.getRowInTableWithSpecificText(userNationalID);

      if (userRow && userRow.length > 0) {
        userIdTd = userRow[0].tdLocator;
        UserID = userIdTd.locator("span");
        await UserID.waitFor({ state: "visible" });
        var actualNationalID = await UserID.textContent();

        userEntityTD = userRow[2].tdLocator;
        userEntity = userEntityTD.locator("span");
        await userEntity.waitFor({ state: "visible" });
        var actualUserEntity = await userEntity.textContent();
      }
      if (actualNationalID === userNationalID &&
          actualUserEntity === entityName ) {
        console.log("User Data matched successfully");
        return true;
      }
      return false;
    }

    

async checkExistingRoleNames(expectedRoles) {
    await this.clickOnDefineUser();
    var userPage = new UserPage(this.page);
    var result = await userPage.checkAvailableRoles(expectedRoles);
    return result;
  }
  
}

module.exports = { UserManagementPage };
