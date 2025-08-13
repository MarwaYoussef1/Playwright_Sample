const { GlossaryPage } = require("./GlossaryPage");
const { AxonSearch } = require("./AxonSearch");

export class AxonHomePage {
  //Page Construtor
  constructor(page) {
    this.page = page;
    this.createMenu = '[id="dropdown_menu_create"]';
    this.dataTechnologySubmenu = '[id="dropdown_menu_create_1"]'; 
    this.glossaryOption = '//a[@role="menuitem"][normalize-space()="Glossary"]';
    this.searchMenuBtn = '[id="explore_button"]'; 

    this.welcomeWord = '//h1[contains(text(),"Welcome to")]';

    this.userMenu = '[id="myAccountButton"]';
    this.logoutBtn ='//a[normalize-space()="Log Out"]';
}

async navigateToNewGlossaryPage() {
    await this.page.waitForSelector(this.createMenu, { state: 'visible' });
    await this.page.click(this.createMenu);
    await this.page.waitForTimeout(500); 

    await this.page.click(this.dataTechnologySubmenu);
    await this.page.waitForTimeout(500);
    await this.page.click(this.glossaryOption);

    var glossaryPage = new GlossaryPage(this.page);
    var navigationSuccess = await glossaryPage.verifyGlossaryNavigation();
    return navigationSuccess; 
}
 
async navigateToSearchPage() {
  await this.page.waitForSelector(this.searchMenuBtn, { state: 'visible' });
  await this.page.click(this.searchMenuBtn);

  var axonSearch = new AxonSearch(this.page);
    var navigationSuccess = await axonSearch.verifySearchNavigation();
    return navigationSuccess; 
}

async verifyLogin() {
  await this.page.waitForSelector(this.welcomeWord, { state: "visible",timeout: 5000});
  return await this.page.locator(this.welcomeWord).isVisible();
}

async logout() {
  await this.page.locator(this.userMenu).waitFor({ state: 'visible', timeout: 2000 });
  await this.page.click(this.userMenu);
  await this.page.locator(this.logoutBtn).waitFor({ state: 'visible', timeout: 2000 });
  await this.page.click(this.logoutBtn);
}

}

module.exports = { AxonHomePage };
