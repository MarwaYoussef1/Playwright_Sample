var { expect } = require('@playwright/test');
var { LoginService } = require('../Services/LoginService');
var { StreamsService } = require('../Services/StreamsService');
var { MainProgramService } = require('../Services/MainProgramService');
var { SubProgramService } = require('../Services/SubProgramService');
var { BenefitsService } = require("../Services/BenefitsService");
var { TasksService } = require('../Services/TasksService');

/**
 * Manages the creation and approval of streams, main programs, subprograms, and benefits.
 * This class interacts with various services to handle these operations.
 * @class
 */
export class Programs {

    constructor() {
        this.token = null;    }


  /**
   * Retrieves an authentication token and initializes services.
   * @param {string} adminusername - The admin username.
   * @param {string} adminpassword - The admin password.
   * @returns {Promise<void>} - Completes token retrieval and service initialization.
   */
  async getToken(adminusername, adminpassword) {

    var tokenUrl = global.testConfig.GENERATE_TOKEN_URL_PORTAL;
    var loginService = new LoginService(tokenUrl);
    var token = await loginService.loginAdminPortal(adminusername, adminpassword);
    expect(token).not.toBeNull(); 
    return this.token = token;
  }


/**
 * Creates a new stream using API and retrieves its ID and number.
 * @param {string} adminusername - The admin username.
 * @param {string} adminpassword - The admin password.
 * @param {object} streamData - Data for creating the stream.
 * @returns {Promise<[string, string]>} - The stream ID and stream number.
 */
async createStreamAPI(adminusername, adminpassword, streamData) 
  {
    var Token = await this.getToken(adminusername, adminpassword);
    var streamService =new StreamsService(Token);
    var streamId = await streamService.createStreamAPI(streamData);
    expect(streamId).not.toBeNull();
    
    var streamNumber = await streamService.getStreamNumberAPI(streamId);
    expect(streamNumber).not.toBeNull();

    return [streamId, streamNumber];
  }


    /**
   * Creates and approves a stream.
   * @param {string} adminusername - The admin username.
   * @param {string} adminpassword - The admin password.
   * @param {object} streamData - Data for creating the stream.
   * @returns {Promise<[string, string]>} - The stream ID and stream number.
   */
  async createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
  {
  
    var streamCreation = await this.createStreamAPI(adminusername, adminpassword, streamData);
    expect(streamCreation).not.toBeNull();
    // console.log('Stream ID:', streamCreation[0]);
    // console.log('Stream Number:', streamCreation[1]);

    var approveStream = await this.approveTaskAPI(adminusername, adminpassword,streamCreation[1]);
    expect(approveStream).not.toBeNull(); 

    return [streamCreation[0],streamCreation[1]];
  }


  /**
   * Creates a new main program using API and retrieves its ID and number.
   * @param {string} adminusername - The admin username.
   * @param {string} adminpassword - The admin password.
   * @param {object} mainProgramData - Data for creating the main program.
   * @param {string} streamId - The ID of the stream the main program belongs to.
   * @returns {Promise<[string, string]>} - The main program ID and number.
   */ 
 async createMainProgramAPI(adminusername, adminpassword, mainProgramData, streamId) {
    
    var Token = await this.getToken(adminusername, adminpassword);
    var mainProgramService = new MainProgramService(Token);

    var mainProgramId = await mainProgramService.createMainProgramAPI(mainProgramData, streamId);
    expect(mainProgramId).not.toBeNull();

    var mainProgramNumber = await mainProgramService.getMainProgramNumberAPI(mainProgramId);
    expect(mainProgramNumber).not.toBeNull();

    return [mainProgramId, mainProgramNumber];
  }



   /**
   * Creates and approves a main program.
   * @param {string} adminusername - The admin username.
   * @param {string} adminpassword - The admin password.
   * @param {object} mainProgramData - Data for creating the main program.
   * @param {string} streamId - The ID of the stream the main program belongs to.
   * @returns {Promise<[string, string]>} - The main program ID and number.
   */
  async createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, streamId) {
    
    var mainProgramCreation = await this.createMainProgramAPI(adminusername,adminpassword,mainProgramData,streamId);

    var approveMainProgram = await this.approveTaskAPI(adminusername, adminpassword, mainProgramCreation[1]);
    expect(approveMainProgram).not.toBeNull();

    return [mainProgramCreation[0], mainProgramCreation[1]];
  }


   /**
   * Creates a new subprogram using API and retrieves its business key and program number.
   * @param {string} adminusername - The admin username.
   * @param {string} adminpassword - The admin password.
   * @param {object} subProgramData - Data object containing subprogram details.
   * @param {string} mainProgramId - The ID of the associated main program.
   * @returns {Promise<[string, string]>} - Returns the subprogram business key and number.
   */
  async createSubProgramAPI(adminusername, adminpassword, subProgramData, mainProgramId) {
    
    var Token = await this.getToken(adminusername, adminpassword);
    var subProgramService = new SubProgramService(Token);

    var subProgramBusinessKey = await subProgramService.createSubProgramAPI(subProgramData, mainProgramId);
    expect(subProgramBusinessKey).not.toBeNull();

    var subProgramNumber = await subProgramService.getSubProgramNumberAPI(subProgramBusinessKey);
    expect(subProgramNumber).not.toBeNull();

    return [subProgramBusinessKey, subProgramNumber];
  }


  /**
   * Creates and approves a subprogram.
   * @param {string} adminusername - The admin username.
   * @param {string} adminpassword - The admin password.
   * @param {object} subProgramData - Data object containing subprogram details.
   * @param {string} mainProgramId - The ID of the associated main program.
   * @returns {Promise<[string, string]>} - Returns the subprogram business key and number.
   */
  async createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgramId) {

   var subProgramCreation = await this.createSubProgramAPI(adminusername,adminpassword,subProgramData,mainProgramId);

    var approveSubProgram = await this.approveTaskAPI(adminusername, adminpassword,subProgramCreation[1]);
    expect(approveSubProgram).not.toBeNull();

    return [subProgramCreation[0], subProgramCreation[1]];
  }


  /**
   * Creates a new benefit using API and retrieves its business key and benefit number.
   * @param {string} adminusername - The admin username.
   * @param {string} adminpassword - The admin password.
   * @param {object} benefitData - Data object containing benefit details.
   * @param {string} subProgramId - The ID of the associated subprogram.
   * @returns {Promise<[string, string]>} - Returns the benefit business key and number.
   */
  async createBenefitAPI(adminusername, adminpassword, benefitData, subProgramId) {

    var Token = await this.getToken(adminusername, adminpassword);
    var benefitService = new BenefitsService(Token);
  
    var benefitBusinessKey = await benefitService.createBenefitAPI(benefitData, subProgramId);
    expect(benefitBusinessKey).not.toBeNull(); 
  
    var benefitNumber = await benefitService.getBenefitNumberAPI(benefitBusinessKey);
    expect(benefitNumber).not.toBeNull(); 
  
    return [benefitBusinessKey, benefitNumber];
  }


    /**
   * Creates and approves a benefit.
   * @param {string} adminusername - The admin username.
   * @param {string} adminpassword - The admin password.
   * @param {object} benefitData - Data object containing benefit details.
   * @param {string} subProgramId - The ID of the associated subprogram.
   * @returns {Promise<[string, string]>} - Returns the benefit business key and number.
   */
  async createBenefitAndApproveAPI(adminusername, adminpassword, benefitData, subProgramId) {

     var benefitCreation = await this.createBenefitAPI(adminusername, adminpassword, benefitData, subProgramId);
     var approveBenefit = await this.approveTaskAPI(adminusername, adminpassword,benefitCreation[1]); 
    expect(approveBenefit).not.toBeNull(); 
  
    return [benefitCreation[0], benefitCreation[1]];
  }


   /**
   * Approves a task based on its serial number.
   * @param {string} serialNumber - The serial number of the task to approve.
   * @returns {Promise<boolean>} - Returns true if the task is successfully approved.
   */
  async approveTaskAPI(adminusername, adminpassword,serialNumber)
   {
    var Token = await this.getToken(adminusername, adminpassword);
    var tasksService = new TasksService(Token);

    //await new Promise((resolve) => setTimeout(resolve, 20000));
    var search = await tasksService.getTaskID(serialNumber);
    expect(search).not.toBeNull(); 

    var assign = await tasksService.assignTask(search);
    expect(assign).not.toBeNull(); 

    var complete = await tasksService.completeTask(search);
    expect(complete).not.toBeNull(); 

    //await new Promise((resolve) => setTimeout(resolve, 25000));
    var taskending = await tasksService.getCompletedTaskById(search);
    expect(taskending).not.toBeNull(); 

    return taskending;

  }

}
