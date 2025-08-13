//const { test, expect } = require("@playwright/test");
import { test, expect } from '../../fixtures.js';

const { LoginPage } = require('../../../src/Pages/LoginPage.js');
const { HomePage } = require("../../../src/Pages/AdminPortal/HomePage.js");
const { EntityData } = require("../../../src/Models/AdminPortal/EntityData.js");
const { EntitiesManagementPage } = require("../../../src/Pages/AdminPortal/AccessibilityManagement/EntitiesManagementPage");
const { ComponentsAuditLogsPage } = require("../../../src/Pages/ComponentsAuditLogsPage.js");


let loginPage,homePage,entitiesManagementPage,entityData;
let entitySerialNo ,componentsAuditLogsPage;
let adminusername,adminpassword;


/**
 * Test setup: Initializes all required page objects and logs into the admin portal.
 */
test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  entitiesManagementPage = new EntitiesManagementPage(page);
  componentsAuditLogsPage = new ComponentsAuditLogsPage(page);
  entityData = new EntityData();

  var baseUrl = global.testConfig.BASE_URL;
  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;  

  await test.step("Login to Admin Portal", async () => {
    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log("login done successfully");
  });
});

test('Define New An entity', async () => {
    // Step1: Navigate to Entities list page
    await test.step("Navigate to Entities Management page", async () => {
      await homePage.navigateToEntitiesManagement();
      console.log("Navigate to Entities Management Page");
    });

    // Step2: Create New Entity
    await test.step("Define New An Entity", async () => {
      console.log("Navigate to Create Entity page");
      var result = await entitiesManagementPage.createEntity(entityData);
      expect(result).toBe(true);
      console.log("New Entity Created Successfully");
    });

    // Step3: Search on new entity created
    await test.step("Search on Entity", async () => {
      console.log("Search on Entity");
      expect(await entitiesManagementPage.checkEntityRowDetails(entityData)).toBe(true);
      entitySerialNo = entityData.getCreatedEntitySerialNo();
      console.log("New Entity Details Checked Successfully");
    });

   // Step4: Check the created Entity in Components audit logs
  await test.step("Search on Entity", async () => {
    await homePage.navigateToComponentsAuditLogs();
    entitySerialNo = entityData.getCreatedEntitySerialNo();
     const entityMap = [
        { index: 1, expected: () => global.testConfig.componentLogs.entityComponentName },
        { index: 2, expected: () => global.testConfig.componentLogs.entityObjectType },
        { index: 3, expected: () => entityData.getEntityName() },
        { index: 8, expected: () => global.testConfig.componentLogs.successChangeStatus } 
      ];
    var result = await componentsAuditLogsPage.checkComponentRowDetails(entitySerialNo ,entityMap);
    expect(result).toBe(true);
  });

});

test.afterEach(async () => {
  //logout
  await test.step('Logout from Admin Portal', async () => {
    await homePage.logout();
    console.log('User Logout Successfully');
   
  });

});



