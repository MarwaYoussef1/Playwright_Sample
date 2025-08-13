const { SearchPage } = require("../../SharedPages/SearchPage.js");

export class FieldDetialsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.fieldRecordTab = '(//div[@role="tablist"]//button)[last()]'; 
        this.fieldStatusData = 'div.formio-component-status div[ref="value"]'; 
        this.makeDecisionBtn = '(//button[contains(@class, "MuiButtonBase-root")])[6]'
        this.backToRequestDetialsPage = "//span[contains(text(),'استعراض بيانات طلب تحديث مكتبة الحقول')]";
    }   

    async checkInsideFieldStatus(ExpectedFieldStatus) {
        await this.page.click(this.fieldRecordTab);
        await this.page.waitForTimeout(1000);

        var fieldStatusData = await this.page.textContent( this.fieldStatusData);
        console.log(`Request Status Data: ${fieldStatusData.trim()}`);

        if (fieldStatusData === ExpectedFieldStatus) {
            return true;
          }
          return false;
    }
    
    async backtoRequestDetialsPage() {
        
        await this.page.waitForSelector(this.backToRequestDetialsPage, { state: "visible", timeout: 5000 });
        await this.page.click(this.backToRequestDetialsPage, { force: true });

    }
   
    async clickOnMakeDecisionNow() {

        const isButtonVisible = await this.page.isVisible(this.makeDecisionBtn);

        if (isButtonVisible) {
            await this.page.click(this.makeDecisionBtn);
            return true;
        } 
                return false;

    }

    

}
module.exports = { FieldDetialsPage };