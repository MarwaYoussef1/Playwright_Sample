import { test, expect } from '../../fixtures.js';
import Constants from '../../../src/Utils/Constants.js';
import rolesData from '../../../Resources/TestData/OperationDefineUserRoles.json'; 

const { LoginPage } = require('../../../src/Pages/LoginPage.js');
const { HomePage } = require("../../../src/Pages/AdminPortal/HomePage.js");
const { EntityData } = require("../../../src/Models/AdminPortal/EntityData.js");
const { UserData } = require("../../../src/Models/OperationPortal/UserData.js");
const { Entities } = require("../../../src/Apis/Business/Entities.js");
const { UserManagementPage } = require("../../../src/Pages/OperationPortal/AccessibilityManagement/UserManagementPage.js");
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage.js');

let loginPage, adminhomePage, operationHome;
let entityData, entities, userData, userManagementPage;
let baseUrl, adminusername, adminpassword, generalSettingUser, generalSettingPass;
let createdEntityName, createdUserID;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  adminhomePage = new HomePage(page);
  operationHome = new HomeOperationPage(page);
  entityData = new EntityData();
  entities = new Entities();
  userManagementPage = new UserManagementPage(page);
  userData = new UserData();

  baseUrl = global.testConfig.OPERATION_BASE_URL;
  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;
  generalSettingUser = global.testConfig.GENERAL_SETTING_USER;
  generalSettingPass = global.testConfig.GENERAL_SETTING_PASS;
});

//Generate dynamic tests based on JSON input
rolesData.forEach(({ label, roleConstant, expectedRolesKey }) => {
  test(`Define New User on ${label} Entity`, async () => {
    const role = global.testConfig.createEntity[roleConstant]; 
    const expectedRoles = expectedRolesKey;

    // Step 1: Create Entity
    await test.step("Create Entity From API", async () => {
      entityData.setEntityRoleIds([role]);
      const entity = await entities.createEntity(adminusername, adminpassword, entityData);
      createdEntityName = entityData.getEntityName();
      expect(entity).not.toBeNull();
    });

    // Step 2: Login as General Settings User
    await test.step("Login to Operational Portal", async () => {
      await loginPage.gotoOperationPortal(baseUrl);
      const loginSuccess = await loginPage.login(generalSettingUser, generalSettingPass);
      expect(loginSuccess).toBe(true);
    });

    // Step 3: Create New User
    await test.step("Create New User", async () => {
      await operationHome.navigateToUserManagement();
      const result = await userManagementPage.createUser(userData, createdEntityName);
      createdUserID = userData.getNationalId();
      expect(result).toBe(true);
    });

    // Step 4: Switch to New User
    await test.step("Switch to New User", async () => {
      await operationHome.logout();
      const loginSuccess = await loginPage.login(createdUserID, createdUserID);
      expect(loginSuccess).toBe(true);
    });

    // Step 5: Verify User in List
    await test.step("Verify User Exists in List", async () => {
      await operationHome.navigateToUserManagement();
      const result = await userManagementPage.checkUserRowDetails(userData, createdEntityName);
      expect(result).toBe(true);
    });

    // Step 6: Verify Dropdown Role Names
    await test.step("Check Available Role Names", async () => {
      const result = await userManagementPage.checkExistingRoleNames(expectedRoles);
      expect(result).toBe(true);
    });
  });
});

test.afterEach(async () => {
  await test.step('Logout from Admin Portal', async () => {
    await adminhomePage.logout();
    console.log('User Logout Successfully');
  });
});
