/**
 * Represents the homepage of the application and provides methods for navigating
 * to various sections and performing common actions like logout and user verification.
 * @class
 */
export class HomePage {
  //Page Construtor
  constructor(page) {
    this.page = page;
    this.userMenu = '//button[@data-testid="user-menu"]';
    this.logoutButton = '//div[@data-testid="logout-btn"]';
    this.avatar = '//button[@data-testid="user-menu"]';
    this.programManagementButton = '//a[@data-testid="menu-programs-management"]';
    this.streamsManagementButton = '//a[@data-testid="submenu-streams-management"]';
    this.mainProgramManagementButton = '//a[@data-testid="submenu-main-program-management"]';
    this.subProgramsManagementButton = '//a[@data-testid="submenu-sub-program-management"]';
    this.benefitsManagementButton = '//a[@data-testid="submenu-benefits-management"]';
    this.createNewStreamButton = '//button[@data-testid="create-new-stream"]';
    this.tasksButton = '//a[@data-testid="menu-tasks"]';
    this.generalSettingsButton = '//a[@data-testid="menu-general-settings"]';
    this.lookupsManagmentButton = '//a[@data-testid="submenu-lookups-management"]';
    this.stateMachineManagmentButton = '//a[@data-testid="submenu-state-machine-management"]';
    this.socialRegistryServices = '//a[@data-testid="menu-social-registry-services"]';
    this.subDomainsLibraryTab = '//a[@data-testid="submenu-sub-domains-library"]';
    this.fieldLibraryTab = '//a[@data-testid="submenu-fields-library"]';
    this.fieldTreeTab = '//a[@data-testid="submenu-fields-tree"]';
    this.fieldLibraryUpdateRequestsTab = '//a[@data-testid="submenu-field-library-update-requests"]';
    this.socialRecordCopiesTab = '//a[@data-testid="submenu-social-log-copies"]';
    this.requestUpdateSocialRecordCopiesTab = '//a[@data-testid="submenu-social-record-copies-requests"]';
    this.subDomainLibraryUpdateRequestTab = '//a[@data-testid="menu-sub-domain-request"]';
    this.tasksUnauthorizedLabel = '//span[contains(text(), "unauthorized")]';
    this.accessibilityManagementBtn = '//a[@data-testid="menu-access-management"]';
    this.entitiesManagementBtn = '//a[@data-testid="submenu-entities-management"]';
    this.componentsAuditLogsBtn = '//a[@data-testid="submenu-components-audit-logs"]';
  }

  /**
   * Checks if the user's avatar is visible, indicating a successful login.
   * @returns {Promise<boolean>} - Returns true if the avatar is visible.
   */
  async checkAvatarIsExist() {
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(this.avatar, {state: "visible",timeout: 300000});
    return await this.page.locator(this.avatar).isVisible();
  }



  async logout() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.userMenu).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.click(this.userMenu);
    await this.page.locator(this.logoutButton).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.click(this.logoutButton);
    await this.page.waitForTimeout(10000);
    console.log('Logout completed');

  }

  // async logout() {
  //   await this.page.waitForTimeout(500);
  
  //   await this.page.locator(this.userMenu).waitFor({ state: 'visible', timeout: 10000 });
  //   await this.page.click(this.userMenu);
  
  //   await this.page.locator(this.logoutButton).waitFor({ state: 'visible', timeout: 10000 });
  //   await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: 'networkidle' }),
  //     this.page.click(this.logoutButton)
  //   ]);
  
  //   console.log('✅ Logout completed');
  // }

  /**
   * Navigates to the "Program Management" section of the application.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToProgramManagement() {
    await this.page.waitForSelector(this.programManagementButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.programManagementButton);
  }

  /**
   * Navigates to the "Streams Management" section within Program Management.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToStreamsManagement() {
    await this.navigateToProgramManagement();
    await this.page.waitForSelector(this.streamsManagementButton, {
      state: "visible",
      timeout: 20000,
    });
    await this.page.click(this.streamsManagementButton);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });

  }

  async navigateToMainProgramManagement() {
    await this.navigateToProgramManagement();
    await this.page.waitForSelector(this.mainProgramManagementButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.mainProgramManagementButton);

  }

  async navigateToSubProgramsManagement() {
    await this.navigateToProgramManagement();
    await this.page.waitForSelector(this.subProgramsManagementButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.subProgramsManagementButton);

  }

  async navigateToBenefitsManagement() {
    await this.navigateToProgramManagement();
    await this.page.waitForSelector(this.benefitsManagementButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.benefitsManagementButton);
  }


  async navigateToTasks() {
    await this.page.waitForSelector(this.tasksButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.tasksButton);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async verifyTasksPage() {
    await this.page.waitForSelector(this.tasksButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.tasksButton);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(15000);
    if (await this.page.locator(this.tasksUnauthorizedLabel).isVisible()) {
      return false;
    }
    return true;
  }

  async navigateToGeneralSettings() {
    await this.page.waitForSelector(this.generalSettingsButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.generalSettingsButton);
  }

  async navigateToLookupsManagment() {
    await this.navigateToGeneralSettings();
    await this.page.waitForSelector(this.lookupsManagmentButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.lookupsManagmentButton);
    await this.page.waitForTimeout(7000);
    //await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToStateMachineManagment() {
    await this.navigateToGeneralSettings();
    await this.page.waitForSelector(this.stateMachineManagmentButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.stateMachineManagmentButton);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

   async navigateToComponentsAuditLogs() {
    await this.navigateToGeneralSettings();
    await this.page.waitForSelector(this.componentsAuditLogsBtn, { state: "visible", timeout: 20000 });
    await this.page.click(this.componentsAuditLogsBtn);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToSocialRegistryServices() {
    if (await this.page.locator(this.socialRegistryServices).isVisible()) {
      await this.page.waitForSelector(this.socialRegistryServices, { state: "visible", timeout: 20000 });
      await this.page.waitForTimeout(5000);
      await this.page.click(this.socialRegistryServices);
      return true;
    }
    return false;
  }
  async navigateToSubDomainsLibrary() {
    await this.navigateToSocialRegistryServices();
    await this.page.waitForSelector(this.subDomainsLibraryTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.subDomainsLibraryTab);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }
  async navigateToFieldLibrary() {
    await this.page.waitForTimeout(5000);
    await this.navigateToSocialRegistryServices();
    if (await this.page.locator(this.fieldLibraryTab).isVisible()) {
      await this.page.waitForSelector(this.fieldLibraryTab, { state: "visible", timeout: 30000 });
      await this.page.click(this.fieldLibraryTab);
      // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(5000);
      return true;
    }
    return false;
  }

  async navigateToFieldTree() {
    await this.navigateToSocialRegistryServices();
    await this.page.waitForTimeout(1000);
    await this.page.waitForSelector(this.fieldTreeTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.fieldTreeTab);
    await this.page.waitForTimeout(5000);
    //await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToFieldLibraryRequests() {
    await this.navigateToSocialRegistryServices();
    await this.page.waitForTimeout(2000);
    if (await this.page.locator(this.fieldLibraryUpdateRequestsTab).isVisible()) {
      const result = await this.page.waitForSelector(this.fieldLibraryUpdateRequestsTab, { state: "visible", timeout: 20000 });
      await this.page.click(this.fieldLibraryUpdateRequestsTab);
      await this.page.waitForTimeout(10000);
      // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
      return true;
    }
    return false;
  }

  async navigateToFieldLibraryUpdateRequests() {
    if (await this.page.locator(this.fieldLibraryUpdateRequestsTab).isVisible()) {
      const result = await this.page.waitForSelector(this.fieldLibraryUpdateRequestsTab, { state: "visible", timeout: 20000 });
      await this.page.click(this.fieldLibraryUpdateRequestsTab);
      await this.page.waitForTimeout(10000);
      // await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
      return true;
    }
    return false;
  }

  async navigateToSocialRecordCopies() {
    await this.navigateToSocialRegistryServices();
    //await this.page.waitForSelector(this.socialRecordCopiesTab, { state: "visible", timeout: 20000 });
    if (await this.page.locator(this.socialRecordCopiesTab).isVisible()) {
      await this.page.click(this.socialRecordCopiesTab);
      await this.page.waitForTimeout(10000);
      return true;
    }
    return false;
  }

  async navigateToSubDomainLibraryRequests() {
    await this.navigateToSocialRegistryServices();
    await this.page.waitForSelector(this.subDomainLibraryUpdateRequestTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.subDomainLibraryUpdateRequestTab);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToSubDomainLibrary() {
    await this.navigateToSocialRegistryServices();
    await this.page.waitForSelector(this.subDomainsLibraryTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.subDomainsLibraryTab);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToRequestUpdateSocialRecordCopies() {
    await this.navigateToSocialRegistryServices();
    if (await this.page.locator(this.requestUpdateSocialRecordCopiesTab).isVisible()) {
      await this.page.click(this.requestUpdateSocialRecordCopiesTab);
      await this.page.waitForTimeout(2000);
      return true;
    }
    return false;
  }


   async navigateToAccessibilityManagement() {
    await this.page.waitForSelector(this.accessibilityManagementBtn, { state: "visible", timeout: 20000 });
    await this.page.click(this.accessibilityManagementBtn);
  }

  async navigateToEntitiesManagement() {
    await this.navigateToAccessibilityManagement();
    await this.page.waitForSelector(this.entitiesManagementBtn, { state: "visible",timeout: 20000});
    await this.page.click(this.entitiesManagementBtn);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

}

module.exports = { HomePage };
