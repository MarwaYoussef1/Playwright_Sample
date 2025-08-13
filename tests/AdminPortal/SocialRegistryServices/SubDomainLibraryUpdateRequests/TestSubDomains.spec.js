//const { test, expect } = require('@playwright/test');
import { test, expect } from '../../../fixtures.js';
import Constants from '../../../../src/Utils/Constants';

const { LoginPage } = require('../../../../src/Pages/LoginPage');
const { HomePage } = require('../../../../src/Pages/AdminPortal/HomePage');
const {ManageSubDomainUpdateRequestsPage} = require('../../../../src/Pages/AdminPortal/SubDomainLibraryUpdateRequest/ManageSubDomainUpdateRequestsPage');
const{SubDomainCreationPage} = require('../../../../src/Pages/AdminPortal/SubDomainLibraryUpdateRequest/SubDomainCreationPage');
const{SubDomainLibraryUpdateReqPage}= require('../../../../src/Pages/AdminPortal/SubDomainLibraryUpdateRequest/SubDomainLibraryUpdateReqPage');
const {TasksPage} = require("../../../../src/Pages/AdminPortal/Tasks/TasksPage");
const{SubDomainData} = require("../../../../src/Models/AdminPortal/SubDomainData");
const{SubDomainLibraryManagementPage} = require("../../../../src/Pages/AdminPortal/SubDomainLibrary/SubDomainLibraryManagementPage");
const{FieldsTreePage}= require("../../../../src/Pages/AdminPortal/FieldsTree/FieldsTreePage");



let loginPage,homePage,manageSubDomainUpdateRequestsPage,subDomainCreationPage,subDomainLibraryUpdateReqPage,tasksPage,subDomainLibraryManagementPage,fieldsTreePage;
let subDomainData;
let RequestID,myMap;;
let adminUsername, adminPassword, isrManagerUsername , isrManagerPassword;


test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  manageSubDomainUpdateRequestsPage = new ManageSubDomainUpdateRequestsPage(page);
  subDomainCreationPage = new SubDomainCreationPage(page);
  subDomainLibraryUpdateReqPage = new SubDomainLibraryUpdateReqPage(page);
  subDomainData = new SubDomainData(page);
  tasksPage = new TasksPage(page);
  subDomainLibraryManagementPage= new SubDomainLibraryManagementPage(page);
  fieldsTreePage= new FieldsTreePage(page);
  
  

  const baseUrl = global.testConfig.BASE_URL;

  adminUsername = global.testConfig.ADMIN_USER;
  adminPassword = global.testConfig.ADMIN_PASS;
  
    await test.step("Login to Admin Portal", async () => {
      await loginPage.gotoAdminPortal(baseUrl);
      var loginSuccess = await loginPage.login(adminUsername, adminPassword);
      expect(loginSuccess).toBe(true);
  
      console.log("login done successfully");
    });
});

   test('Add Sub Domains', async () => {
      // Step1: Navigate to SubDomain library update requests list page
     await test.step("Navigate to SubDomains library update request page", async () => {
        await homePage.navigateToSubDomainLibraryRequests();
        console.log("Navigate to Sub domains library update request page");
      });

      await test.step("Create SubDomain request", async () => {
        RequestID= await subDomainLibraryUpdateReqPage.sendSubDomainRequest(subDomainData,2)
        expect(RequestID).not.toBeNull(); 
        console.log("Sub domain request submitted " + RequestID);
      });
    
      await test.step("check request status",async ()=> {
        var expectedRequestStatus = global.testConfig.createSubDomain.subDomainProcessingStatus;
        expect(await subDomainLibraryUpdateReqPage.checkSubDomainReqStatus(expectedRequestStatus,RequestID)).toBe(true);
        console.log("request Status processing");
    });

    await test.step("check request details",async ()=> {
      expect(await subDomainLibraryUpdateReqPage.checkSubDomainRequestDetails(RequestID,subDomainData)).toBe(true);
      console.log("request details displayed successfully");
    });

    await test.step("check sub domains status at library", async ()=>{
      await homePage.navigateToSubDomainLibrary();

      expect(await subDomainLibraryManagementPage.checkSubDomainsListAtLibrary(subDomainData.getsubDomainArabicName(), Constants.SUBDOMAIN_LIB_UNDERREVIEW)).toBe(true);
      console.log("created subDomains displayed at under-review tab successfully");

    });

    // Switch to ISR Manager User
         await test.step('Logout from FIELD MANAGEMENT User and login as ISR Manager User', async () => {
            await homePage.logout();
            console.log('Logged out from FIELD MANAGEMENT User');
            isrManagerUsername = global.testConfig.ISR_MANAGER;
            isrManagerPassword = global.testConfig.ISR_MANAGER_PASS;
            const loginSuccess = await loginPage.login(isrManagerUsername, isrManagerPassword);
            expect(loginSuccess).toBe(true);
            console.log('Logged in as ISR Manager');
        });

         await test.step("Tasks approve and reject", async () => {
                await homePage.navigateToTasks();
                await tasksPage.assignTaskToMe(RequestID); 
                myMap = new Map();
                myMap.set(subDomainData.getsubDomainArabicName()[0],Constants.APPROVE); 
                myMap.set(subDomainData.getsubDomainArabicName()[1], Constants.REJECT);
                var taskManage = await tasksPage.manageRequestField(RequestID,myMap,Constants.DOMAINS_REQUEST);
                expect(taskManage).toBe(true);
                console.log("Subdomain Request Done Successfully");
            });

            await test.step("check sub domains status at library", async ()=>{
              await homePage.navigateToSubDomainLibrary();
        
              expect(await subDomainLibraryManagementPage.checkSubDomainStatusDetails(subDomainData.getsubDomainArabicName()[0],Constants.SUBDOMAIN_LIB_APPROVED)).toBe(true);
              console.log("Approved subDomains displayed at approved sub-domains library tab successfully with right status");

              expect(await subDomainLibraryManagementPage.checkSubDomainStatusDetails(subDomainData.getsubDomainArabicName()[1],Constants.SUBDOMAIN_LIB_REJECTED)).toBe(true);
              console.log("Rejected subDomains displayed at rejected sub-domains library tab successfully with right status");
        
            });

            await test.step("check approved sub domain at fields tree", async ()=>{
              await homePage.navigateToFieldTree();

              expect(await fieldsTreePage.checkSubDomainsExists(subDomainData.getsubDomainArabicName()[0],Constants.SUBDOMAINTYPE));
              console.log("Approved subDomain displayed successfully at fields tree");

              //expect(await fieldsTreePage.checkSubDomainDetails(subDomainData));
              //console.log("SubDomain details displayed right");
            });

  });

  test.afterEach(async () => {
    // Step 6: Logout
    await test.step('Logout from Admin Portal', async () => {
    await homePage.logout();
    console.log('User logged out successfully');
    
    });

  });
