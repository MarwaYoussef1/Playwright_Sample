var { expect } = require('@playwright/test');
var { LoginService } = require('../Services/LoginService');
var { UploadService } = require('../Services/UploadService');
var { DraftsService } = require('../Services/DraftsService');
var { DecisionModelService } = require('../Services/DecisionModelService');
var { TasksService } = require('../Services/TasksService');



/**
 * Manages the creation and approval of Simulation models,
 * This class interacts with various services to handle these operations.
 * @class
 */
export class Simulation {

    constructor() {
      
        this.baseUrl = global.testConfig.BASE_URL_API;   }


  /**
   * Retrieves an authentication token and initializes services.
   * @param {string} username - The  username.
   * @param {string} password - The  password.
   * @returns {Promise<void>} - Completes token retrieval and service initialization.
   */
  async getToken(username, password) {

    var tokenUrl = global.testConfig.GENERATE_TOKEN_URL_PORTAL;
    var loginService = new LoginService(tokenUrl);
    var token = await loginService.loginOperationPortal(username, password);
    expect(token).not.toBeNull(); 
    return this.token = token;
  }


/**
 * Creates a new Simulation model using API and retrieves its ID and number.
 * @param {string} username - The admin username.
 * @param {string} password - The admin password.
 * @param {object} simulationModelData - Data for creating the simulationModel.
 * @returns {Promise<[string, string]>} - The simulationModel ID and simulationModel number.
 */
async createSimulationModelAPI(username, password,simulationModelData) 
{ 
  var draftId,simulationModelCreated,simualtionSerialNum;
  var token = await this.getToken(username, password);
  var uploadService =new UploadService(token,this.baseUrl);
  var draftService= new DraftsService(token);
  var decisionModelService= new DecisionModelService(token);
  var decisionModelAttachmentId = await uploadService.uploadPdfAPI(global.testConfig.SimulationModels.simulationModelPDF);
  expect(decisionModelAttachmentId).not.toBeNull();
  var ruleSetAttachmentsId=await uploadService.uploadPdfAPI(global.testConfig.SimulationModels.simulationModelPDF);
   expect(ruleSetAttachmentsId).not.toBeNull();
  var csvFileId=await uploadService.uploadCsvAPI(global.testConfig.SimulationModels.simulationModelCSV,"caslibs/"+simulationModelData. getSimulationModelEnName().split(" ").join("_"));
  expect(csvFileId).not.toBeNull();
  //setting for upload files
  simulationModelData.setDecisionModelAttachmentId(decisionModelAttachmentId);
  simulationModelData.setRuleSetAttachmentId(ruleSetAttachmentsId);
  simulationModelData.setFileDataSourceAttachmentsId(csvFileId);
  //create draft
  var draftService= new DraftsService(token);
  draftId= await draftService.createSimulationDraftAPI(simulationModelData);
  simulationModelData.setCreatedSimulationModelDraftId(draftId);
 
  //create simulation
  var decisionModelService= new DecisionModelService(token);
  simulationModelCreated =await decisionModelService.createSimulationModelAPI(simulationModelData);
  //search to get simulation model serial number
  simualtionSerialNum=await decisionModelService.getsimulationModelAPI(simulationModelCreated);
  simulationModelData.setCreatedSimulationModelId(simualtionSerialNum);
  return simulationModelData;
}

 /**
   * Creates and approves a simulation model.
   * @param {string} username - The  username.
   * @param {string} password - The  password.
   * @param {object} simulationModelData - Data for creating the simulationModel.
   * @returns {Promise<[string, string]>} - The simulation model number.
   */
 async createsimulationModelAndApproveAPI(username, password, simulationModelData) {
   var simulationModelNumber;
  await this.createSimulationModelAPI(username, password,simulationModelData);
  simulationModelNumber=simulationModelData.getCreatedSimulationModelId();
  expect(simulationModelNumber).not.toBeNull();
  await this.approveOperationTaskAPI(username, password,simulationModelNumber);
 }

 /**
   * Approves a task based on its serial number.
   * @param {string} serialNumber - The serial number of the task to approve.
   * @returns {Promise<boolean>} - Returns true if the task is successfully approved.
   */
  async approveOperationTaskAPI(username, password,serialNumber)
   {
    var token = await this.getToken(username, password);
    var tasksService = new TasksService(token);

    //await new Promise((resolve) => setTimeout(resolve, 20000));
    var search = await tasksService.getTaskID(serialNumber);
    expect(search).not.toBeNull(); 

    var assign = await tasksService.assignTask(search);
    expect(assign).not.toBeNull(); 

    var complete = await tasksService.completeTask(search);
    expect(complete).not.toBeNull(); 

    //await new Promise((resolve) => setTimeout(resolve, 20000));
    var taskending = await tasksService.getCompletedTaskById(search);
    expect(taskending).toBe(true); 

    return taskending;

  }

}
