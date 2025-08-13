/**
 * Represents the homepage of the application and provides methods for navigating
 * to various sections and performing common actions like logout and user verification.
 * @class
 */
export class HomeOperationPage {
  //Page Construtor
  constructor(page) {
    this.page = page;
    this.userMenu = '//button[@data-testid="user-menu"]';
    this.logoutButton = '//div[@data-testid="logout-btn"]';
    this.avatar = '//button[@data-testid="user-menu"]';
    this.simulationModelsTab = '(//a[@data-testid="menu-simulation-models"])[1]';
    this.viewSimulationModelsButton = '(//a[@data-testid="menu-simulation-models"])[2]';
    this.tasksButton = '//a[@data-testid="menu-tasks"]';
    this.viewExecutionLogsRequestsButton = '//a[@data-testid="menu-view-execution-logs-requests"]';
    this.approvedExecutionLogsButton = '//a[@data-testid="menu-approved-execution-logs"]';
    this.generalSettingsTab = '//a[@data-testid="menu-general-settings"]';
    this.componentsAuditLogsButton = '//a[@data-testid="components-audit-logs"]';
    this.isrListTab = '//a[@data-testid="menu-isr-list"]';
    this.isrListPreviewButton = '//a[@data-testid="submenu-isr-list-preview"]';
    this.accessibilityManagementBtn = '//a[@data-testid="menu-accessibility-management"]';
    this.userManagementBtn = '//a[@data-testid="menu-user-management"]';
    this.disbursementBtn = '//*[@data-testid="menu-disbursement"]';
    this.startDisbursementOrder = '//*[@data-testid="submenu-start-disbursement"]'; 
  }
  /**
   * Checks if the user's avatar is visible, indicating a successful login.
   * @returns {Promise<boolean>} - Returns true if the avatar is visible.
   */
  async checkAvatarIsExist() {
    await this.page.waitForSelector(this.avatar, {
      state: "visible",
      timeout: 300000,
    });
    return await this.page.locator(this.avatar).isVisible();
  }


  async logout() {
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.userMenu).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.click(this.userMenu);
    await this.page.locator(this.logoutButton).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.click(this.logoutButton);
    await this.page.waitForTimeout(5000);


  }

  async navigateToSimulationModels() {
    await this.navigateToSimulationModelsTab();
    await this.navigateToViewSimulationModelsTab();
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToSimulationModelsTab() {
    await this.page.waitForSelector(this.simulationModelsTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.simulationModelsTab);
  }

  async navigateToDisbursementTab() {
    await this.page.waitForSelector(this.disbursementBtn, { state: "visible", timeout: 20000 });
    await this.page.click(this.disbursementBtn);
    await this.page.waitForSelector(this.startDisbursementOrder, { state: "visible", timeout: 20000 });
    await this.page.click(this.startDisbursementOrder);
  }

  async navigateToViewSimulationModelsTab(){
    await this.page.click(this.viewSimulationModelsButton, { timeout: 20000 });
  }

  async navigateToTasksTab() {
    await this.page.waitForSelector(this.tasksButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.tasksButton);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToViewExecutionLogsRequestsTab() {
    await this.navigateToSimulationModelsTab();
    await this.page.waitForSelector(this.viewExecutionLogsRequestsButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.viewExecutionLogsRequestsButton);
  }

  async navigateToApprovedExecutionLogsTab() {
    await this.page.waitForSelector(this.approvedExecutionLogsButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.approvedExecutionLogsButton);
  }

  async navigateToComponentsAuditLogsTab() {
    await this.page.waitForSelector(this.generalSettingsTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.generalSettingsTab);
    await this.page.waitForSelector(this.componentsAuditLogsButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.componentsAuditLogsButton);
    //await this.page.waitForTimeout(5000);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToISRListTab() {
    await this.page.waitForSelector(this.isrListTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.isrListTab);
  }

  async navigateToISRListPreviewTab() {
    await this.navigateToISRListTab();
    await this.page.waitForSelector(this.isrListPreviewButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.isrListPreviewButton);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToAccessibilityManagement() {
    await this.page.waitForSelector(this.accessibilityManagementBtn, { state: "visible", timeout: 20000 });
    await this.page.click(this.accessibilityManagementBtn);
  }

  async navigateToUserManagement() {
    await this.navigateToAccessibilityManagement();
    await this.page.waitForSelector(this.userManagementBtn, { state: "visible", timeout: 20000 });
    await this.page.click(this.userManagementBtn);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }


}

module.exports = { HomeOperationPage };
