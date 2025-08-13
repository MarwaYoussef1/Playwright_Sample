const { MyRequestsPage } = require("./MyRequestsPage");

export class DashboardPage {

  constructor(page) {
    this.page = page;
    this.dashboard = '//span[contains(text(), "لوحة التحكم")]';
    this.profileMenu = '//button[@data-testid="user-profile-btn"]'; 
    this.MyRequests = '(//span[normalize-space(.)="طلباتي"])[1]' ;

  }

  async navigateToMyRequests() {

    await this.page.locator(this.MyRequests, { state: "visible", timeout: 5000 });
    await this.page.click(this.MyRequests);
    await this.page.waitForTimeout(1000);
    var myRequestsPage  = new MyRequestsPage(this.page); 
    var navigationSuccess = await myRequestsPage.verifyMyRequests();
    return navigationSuccess;
  }

  async verifyDashboard() {
    await this.page.waitForSelector(this.dashboard, { state: "visible", timeout: 10000 });
    return await this.page.locator(this.dashboard).isVisible();
  }


}
module.exports = { DashboardPage };
