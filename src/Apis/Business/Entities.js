var { expect } = require('@playwright/test');
var { LoginService } = require('../Services/LoginService');
const { EntityService } = require('../Services/EntityService');


/**
 * Manages the creation Entity.
 * This class interacts with various services to handle these operations.
 * @class
 */
export class Entities {

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
 * Creates a new entity using API and retrieves its ID.
 * @param {string} adminusername - The admin username.
 * @param {string} adminpassword - The admin password.
 * @param {object} entityData - Data for creating the entity.
 * @returns {Promise<[string, string]>} - The entity ID and entity number.
 */
 async createEntity(userName, password, entityData) {
    var token = await this.getToken(userName, password);
    var entityService = new EntityService(token);
    var entityData = await entityService.createEntityAPI(entityData);
    console.log(entityData);
    expect(entityData).not.toBeNull();
    return entityData ;
  }
}
