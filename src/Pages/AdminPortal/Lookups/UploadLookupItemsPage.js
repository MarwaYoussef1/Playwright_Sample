const { expect } = require('@playwright/test');
const { UploadFilePage } = require('../../SharedPages/UploadFilePage.js');

export class UploadLookupItemsPage {
    constructor(page) {
        this.page = page;
        this.uploadFilePage = new UploadFilePage(this.page);

        this.lookupItemsUploadTab = '//button[@id="simple-tab-1"]';
        this.attachButton = '//button[@data-testid="tooltip-button"]';
        this.invalidUploadErrorMsg = '//span[contains(text(),"تحميل ملف الأخطاء")]';
        this.validUploadSuccessMsg = '//span[contains(text(),"تم اضافه عنصر ")]';
        this.existFieldsTable = '//tbody[@data-testid="table-body"]';
    }

   
    async uploadInvalidLookUpItems() {
        await this.page.click(this.lookupItemsUploadTab)
        if (await this.page.waitForSelector(this.attachButton, { state: "visible", timeout: 20000 })) {
            const rowsCountBeforeUpload = await this.page.locator(`${this.existFieldsTable}//tr`).count();
            await this.uploadFilePage.uploadFile(global.testConfig.lookUps.invalidLookupItemsCSV, this.attachButton);
            await this.page.waitForSelector(this.invalidUploadErrorMsg, { state: "visible", timeout: 20000 });
            console.log('Invalid Lookup Items error message shown');
            const rowsCountAfterUpload = await this.page.locator(`${this.existFieldsTable}//tr`).count();
            console.log(`Lookup Items before upload: ${rowsCountBeforeUpload}`);
            console.log(`Lookup Items after upload: ${rowsCountAfterUpload}`);
            if (rowsCountAfterUpload === rowsCountBeforeUpload) {
                return true;
            }
        }
        return false;
    }

    async uploadValidLookUpItems() {
        await this.page.click(this.lookupItemsUploadTab)
        if (await this.page.waitForSelector(this.attachButton, { state: "visible", timeout: 20000 })) {
            const rowsCountBeforeUpload = await this.page.locator(`${this.existFieldsTable}//tr`).count();
            await this.uploadFilePage.uploadFile(global.testConfig.lookUps.validLookupItemsCSV, this.attachButton);
            //await this.page.waitForSelector(this.validUploadSuccessMsg, { state: "visible", timeout: 20000 });
            //console.log('valid Lookup Items success message shown');
            await this.page.waitForTimeout(10000);
            const rowsCountAfterUpload = await this.page.locator(`${this.existFieldsTable}//tr`).count();
            console.log(`Lookup Items before upload: ${rowsCountBeforeUpload}`);
            console.log(`Lookup Items after upload: ${rowsCountAfterUpload}`);
            if (rowsCountAfterUpload > rowsCountBeforeUpload) {
                return true;
            }
        }
        return false;
    }
}
module.exports = { UploadLookupItemsPage };
