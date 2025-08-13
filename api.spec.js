const { test, expect } = require('@playwright/test');

import { FieldsService } from './src/Apis/Services/FieldsService.js';
import Constants from './src/Utils/Constants.js';
//samar
const { StreamData } = require('./src/Models/AdminPortal/StreamData.js');
const { MainProgramData } = require('./src/Models/AdminPortal/MainProgramData.js');
const { SubProgramsData } = require('./src/Models/AdminPortal/SubProgramsData.js');
const { Programs } = require("./src/Apis/Business/Programs.js");
const { BenefitsData } = require('./src/Models/AdminPortal/BenefitsData.js');
const { Simulation } = require("./src/Apis/Business/Simulation.js");
const { SimulationModelData } = require("./src/Models/OperationPortal/SimulationModelData.js");
const { FieldRequests } = require("./src/Apis/Business/FieldRequests.js");
const { FieldRequestData } = require("./src/Models/AdminPortal/FieldRequestData.js");
const { FieldData } = require("./src/Models/AdminPortal/FieldData.js");
const { ISRRequests } = require("./src/Apis/Business/ISRRequests.js");
const { SocialRecordCopiesData } = require('./src/Models/AdminPortal/SocialRecordCopiesData.js');
const { Entities } = require("./src/Apis/Business/Entities.js");
const { EntityData } = require("./src/Models/AdminPortal/EntityData.js");


let stream,streamData;
let mainProgram, mainProgramData;
let subProgram, subProgramData;
let programs ;
let createBenefit ,createApproveBenefit , benefitsData;
let adminusername ,adminpassword;
let simulation,simulationData;
let complexFieldData,groupFieldData,inputFieldData,fieldRequestData,fieldRequests;
let isrRequests, socialRecordCopiesData;
let entities, entityData;


test.beforeEach(async () => {

  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;

  streamData = new StreamData();
  mainProgramData = new MainProgramData();
  subProgramData = new SubProgramsData();
  benefitsData = new BenefitsData();
  programs = new Programs();
  simulation = new Simulation();
  fieldRequests=new FieldRequests();
  isrRequests=new ISRRequests();
  entities = new Entities();
  entityData = new EntityData();
});

  test('API Test - Create stream', async () => {
  
   var teststream = await programs.createStreamAPI(adminusername, adminpassword, streamData) 
    expect(teststream).not.toBeNull();
    console.log('Stream', teststream);
  });


  test('API Test - Create Main Program', async () => {

  stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
  mainProgram = await programs.createMainProgramAPI(adminusername, adminpassword, mainProgramData, stream[0]);
  expect(mainProgram).not.toBeNull();

  });

  test('API Test - Create Sub Program', async () => {

    stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
    mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    subProgram = await programs.createSubProgramAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
    expect(subProgram).not.toBeNull();

  });

  
  test('API Test - Create sub Program', async () => {
    stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
    mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
    expect(subProgram).not.toBeNull();
    
  });

  test.only('API Test - Create Benefit', async () => {
   
    stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
    console.log('Stream', stream);
    mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    console.log('mainProgram', mainProgram);
    subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
    console.log('subProgram', subProgram);
    // createBenefit = await programs.createBenefitAPI(adminusername, adminpassword, benefitsData,subProgram[0]) 
    // expect(createBenefit).not.toBeNull();
   
 createApproveBenefit = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData,subProgram[0]);
    console.log('Benefit', createApproveBenefit);
    expect(createApproveBenefit).not.toBeNull();

   });

   test('API Test -Create & Approve simulation model', async () => {
    simulationData= new SimulationModelData();
    await simulation.createsimulationModelAndApproveAPI(adminusername, adminpassword,simulationData) ;
    //await simulation.createsimulationModelAndApproveAPI(1000111000, 123456,simulationData) ;
    console.log('Simulation Model ID = ' + simulationData.getCreatedSimulationModelId());
   });

   test('API Test -Create & Approve field Request', async ({context}) => {
    var fields =[];
    //create & approve input field
    inputFieldData= new FieldData();
    inputFieldData.setFieldType(Constants.INPUT_FIELD);
    inputFieldData.setInputSource(Constants.API_Input_Source_Input);
    console.log('English Name: ', inputFieldData.getEnglishFieldName());
    fields.push(inputFieldData);
    fieldRequestData=new FieldRequestData();
    fieldRequestData.setFields(fields);
    await fieldRequests.createFieldRequestAPI(adminusername, adminpassword,fieldRequestData);
 
     //create & approve complex  field with input child field 
     /*complexFieldData=new FieldData();
     complexFieldData.setFieldType(Constants.COMPLEX_FIELD);
     inputFieldData= new FieldData();
     inputFieldData.setFieldType(Constants.INPUT_FIELD);
     inputFieldData.setParentKey(complexFieldData.getEnglishFieldName());
     fields.push(complexFieldData);
     fields.push(inputFieldData);
     fieldRequestData=new FieldRequestData();
     fieldRequestData.setFields(fields);
     await fieldRequests.createFieldRequestAPI(adminusername, adminpassword,fieldRequestData)
*/
   });

   test('Field API Test', async () => {
    //await fieldRequests.getISRRequestId(adminusername, adminpassword, "ISR_Freq_000004172");
    //await fieldRequests.getFieldsIDsAPI(adminusername, adminpassword, "englishVersionDynAuto", "ISR_Freq_000004138");
    await fieldRequests.approveRequestFields(adminusername, adminpassword, "ISR_Freq_000004272", "englishVersionBnjAuto");
   });

   test('ISR Copy API Test', async () => {
    socialRecordCopiesData= new SocialRecordCopiesData();
    await isrRequests.createIsrRequest(adminusername, adminpassword, socialRecordCopiesData);
   });

  test("Create Entity via API", async () => {
    // Step: Call the API to create entity
    entityData.setEntityRoleIds([Constants.ENTITY_PROGRAM_OWNER_ROLE]);
    var entitySerialNo = await entities.createEntity(adminusername, adminpassword, entityData);
    // Expect the API to succeed
    expect(entitySerialNo).not.toBeNull();
    console.log("Entity created successfully via API with serial No:", entitySerialNo);
});

   
