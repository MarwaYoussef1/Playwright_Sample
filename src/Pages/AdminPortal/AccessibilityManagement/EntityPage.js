
import Constants from '../../../Utils/Constants';

const { PopUpPage } = require("../../SharedPages/PopUpPage");
const { UploadFilePage } = require('../../SharedPages/UploadFilePage.js');
const { DropDownMenuPage } = require('../../SharedPages/DropDownMenuPage.js');


/**
 * Manages entity-related actions, such as creating a new entity with metadata, goals,
 * and descriptions, and handling form submissions and validations.
 * @class
 */
export class EntityPage {
  constructor(page) {
    this.page = page;
    this.popUpMsg = new PopUpPage(this.page);
    this.uploadFilePage = new UploadFilePage(page);
    this.dropDownMenu = new DropDownMenuPage(page);

    // Selectors for entity Basic information
    this.entityName = '//input[@placeholder="اسم الجهة"]';
    this.entityNRN = '//input[@placeholder="رقم 700 الخاص بالجهة"]';

    this.entityTypeMenu = '//div[@id="mui-component-select-typeId"]';
    this.entityRoleMenu = '//div[@id="mui-component-select-entityRoleIds"]';
    
    this.MenuOptionsLocator = '//ul[@role="listbox"]/li';
    // this.uploadImage = '//button[@data-testid="browse-images"]';
    this.entityDefinitionButton = '//button[@data-testid="define-entity"]';   

    this.titlePopup = '//button[@data-testid="modal-title"]';
    this.BtnPopup = '//button[@data-testid="confirmation-modal-primary-button"]';
    // this.popupBtnConfirm = '(//button[@data-testid="confirmation-modal-primary-button"])[last()]';
    this.popupBtnConfirm = '(//button[@data-testid="confirmation-modal-primary-button" and normalize-space(text())="موافق" and not(@disabled)])[last()]';


  }


  /**
   * Creates a new entity with the provided data.
   * @param {object} entityData - Object containing the entity data, including names,roles , and Types.
   * @returns {Promise<boolean>} - Returns true if the entity is created successfully.
   */
  async createNewEntity(entityData) {

    // Retrieve entity names from the provided data
    var createdEntityName = entityData.getEntityName();

    // Fill entity metadata fields
    await this.page.waitForSelector(this.entityName, {state: "visible",timeout: 5000});
    await this.page.fill(this.entityName , createdEntityName);
    await this.page.fill(this.entityNRN , entityData.getEntityNRN());

    var rolesList = [ entityData.getprogramOwnerRole(), entityData.getsimulationManagerRole()];
    
    console.log (entityData.getsimulationManagerRole(),entityData.getprogramOwnerRole(),entityData.getentityTypeValue())
    await this.dropDownMenu.selectDropdownValue(this.entityTypeMenu , entityData.getentityTypeValue(),this.MenuOptionsLocator);
    await this.page.waitForTimeout(1000);
    await this.dropDownMenu.selectMultipleDropdownValues(this.entityRoleMenu, rolesList , this.MenuOptionsLocator);

    // uploadFile
    var ImageName = global.testConfig.Liferay.iconImage;
    var uploadPath = "Liferay/" + ImageName ;
    var iconImage = await this.uploadFilePage.uploadFile(uploadPath , null , false);
    console.log('Upload Icon Completed');
    
    // Submit the entity form
    await this.page.waitForSelector(this.entityDefinitionButton, {state: "visible"});
    await this.page.click(this.entityDefinitionButton);
    await this.page.waitForTimeout(2000); 

    // Update the entity data with the provided names
    entityData.setEntityName(createdEntityName);

    // Handle the success popup
    await this.popUpMsg.popUpMessage(this.BtnPopup , global.testConfig.createEntity.entityConfirmMsg);
    //await this.page.waitForTimeout(2000); 
    var result = await this.popUpMsg.popUpMessage(this.BtnPopup , global.testConfig.createEntity.entitySuccessMsg);
    return result;
  }





}
module.exports = { EntityPage };
