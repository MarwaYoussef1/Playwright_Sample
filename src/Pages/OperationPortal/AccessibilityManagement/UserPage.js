
import Constants from '../../../Utils/Constants.js';

const { PopUpPage } = require("../../SharedPages/PopUpPage.js");
const { UploadFilePage } = require('../../SharedPages/UploadFilePage.js');
const { DropDownMenuPage } = require('../../SharedPages/DropDownMenuPage.js');


export class UserPage {
  constructor(page) {
    this.page = page;
    this.popUpMsg = new PopUpPage(this.page);
    this.uploadFilePage = new UploadFilePage(page);
    this.dropDownMenu = new DropDownMenuPage(page);
    

    // Selectors for user Basic information
    this.fullName = '//input[@placeholder="الاسم"]';
    this.nationalID = '//input[@placeholder="رقم الهوية"]';
    this.email = '//input[@placeholder="البريد الإلكتروني"]';
    this.mobileNo = '//input[@placeholder="رقم الجوال"]';
    this.jobTitle = '//input[@placeholder="المسمى الوظيفي"]';

    this.userRole = '//input[@value="ENTITY_COMMISSIONER"]';
    this.roleNameMenu = '//div[@id="mui-component-select-organizationId"]';
    this.MenuList = '//ul[@role="listbox"]//li';
    
    this.roleMenuBtn = '//div[@id="mui-component-select-roleIds"]';
    this.uploadDelegationBtn = '//button[@data-testid="file-selection-button"]';   
    
    this.defineUserBtn = '//button[@data-testid="define-user"]';   

    this.titlePopup = '//span[@id="modal-modal-title"]';
    this.BtnPopup = '//button[@data-testid="modal-primary-button"]';
    // this.popupBtnConfirm = '(//button[@data-testid="confirmation-modal-primary-button"])[last()]';
    this.popupBtnConfirm = '(//button[@data-testid="confirmation-modal-primary-button" and normalize-space(text())="موافق" and not(@disabled)])[last()]';
  }


  /**
   * Creates a new user with the provided data.
   * @param {object} userData - Object containing the user data, including names,roles , and Types.
   * @returns {Promise<boolean>} - Returns true if the user is created successfully.
   */
  async createNewUser(userData , entityName) {

    // Retrieve user ID from the provided data
    var createdUserID = userData.getNationalId()
    // Fill user metadata fields
    await this.page.waitForSelector(this.fullName, {state: "visible",timeout: 5000});
    await this.page.fill(this.fullName , userData.getFullName());
    await this.page.fill(this.nationalID , createdUserID);
    await this.page.fill(this.email , userData.getEmail());
    await this.page.waitForTimeout(5000);
    await this.page.fill(this.mobileNo , userData.getMobileNumber());
    await this.page.waitForTimeout(10000);
    await this.page.fill(this.jobTitle , userData.getJobTitle());

    await this.page.click(this.userRole);

    await this.page.waitForSelector(this.roleNameMenu, {state: "visible",timeout: 2000});
    await this.dropDownMenu.selectDropdownValue(this.roleNameMenu , entityName ,this.MenuList );

    await this.uploadFilePage.uploadFile(global.testConfig.createOperationUser.DelegationLetter,null , null);    
    await this.page.waitForTimeout(1000);

    
    // Submit the user form
    await this.page.click(this.defineUserBtn);
    await this.page.waitForTimeout(2000); 

    // Update the user data with the provided names
    userData.setNationalId(createdUserID);

    // Handle the success popup
    await this.popUpMsg.popUpMessage(this.BtnPopup , global.testConfig.createOperationUser.userConfirmMsg);
    await this.page.waitForTimeout(2000); 
    var result = await this.popUpMsg.popUpMessage(this.BtnPopup , global.testConfig.createOperationUser.userSuccessMsg);
    return result;
  }

  


  /**
 * Verifies that all expected role names are available in the dropdown.
 * @param {Array<string>} expectedRoles - The list of expected role names (from config).
 * @returns {Promise<boolean>} - Returns true if the dropdown contains exactly the expected roles.
 */
async checkAvailableRoles(expectedRoles) {

  await this.page.click(this.roleMenuBtn);
  await this.page.waitForTimeout(1000); 
  await this.page.waitForSelector(this.MenuList, { state: 'visible', timeout: 5000 });

  const optionsLocator = this.page.locator(this.MenuList);
  const count = await optionsLocator.count();

  var actualRoles = [];
  for (let i = 0; i < count; i++) {
    const text = await optionsLocator.nth(i).textContent();
    if (text) {
      actualRoles.push(text.trim());
    }
  }
  console.log("Actual roles in dropdown:", actualRoles);
  console.log("Expected roles:", expectedRoles);
  // Compare two arrays
  var rolesMatch = expectedRoles.length === actualRoles.length &&
                     expectedRoles.every(role => actualRoles.includes(role));
  if (!rolesMatch) {
    console.error("Role list Mismatched");
    return false;
  }
  console.log("Role list matches as Expected");
  await this.page.keyboard.press("Tab");
  return true;
}

}
module.exports = { UserPage };
