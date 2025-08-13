import Constants from '../../../Utils/Constants.js';

export class FilterPrograms {
    constructor(page) {
        this.page = page;
        this.filterButton = '//button[@data-testid="toolbar-filter-button"]';
        this.riskCategoryFilter = '//div[@id="mui-component-select-riskCategory"]';
        this.risksFilter = '//div[@id="mui-component-select-risk"]';
        this.responsibleEntityFilter = '//div[@id="mui-component-select-responsible"]';
        this.streamFilter = '//div[@id="mui-component-select-stream"]';
        this.mainProgramFilter = '//div[@id="mui-component-select-program"]';
        this.subProgramFilter = '//div[@id="mui-component-select-subProgram"]';
        this.designResponsibleEntityFilter = '//div[@id="mui-component-select-designResponsibleGovernance"]';
        this.responsibleEntityItem = '//li[@data-value="Responsible"]';
        this.benefitTypeFilter = '//div[@id="mui-component-select-benefitType"]';
        this.benefitProvidingEntityFilter = '//div[@id="mui-component-select-responsibleCode"]';
        this.searchButton = '//button[@type="submit"]';
        this.table = "//table//tbody";
    }

    /**
   * Filter the main program based on predefined criteria.
   * 
   * @returns {Promise<void>} - Completes the action of filtering the main program.
   */
    async filterMainProgram(location, data, type, streamData, mainProgramData) {
        var riskCategory = mainProgramData.getRiskCategoryAPI();
        var risks = mainProgramData.getRisksAPI();
        var responsibleEntity = mainProgramData.getResponsibleId();
        var riskCategoryItem = "//li[@data-value='" + riskCategory + "']";
        var risksItem = "//li[@data-value='" + risks + "']";
        var responsibleEntityItem = "//li[@data-value='" + responsibleEntity + "']";

        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.filterButton, { visible: true });
        await this.page.click(this.filterButton);
        if (streamData) {
            var streamName = streamData.getstreamArabicName();
            var streamArItem = "//li[text()='" + streamName + "']";
            await this.page.waitForSelector(this.streamFilter, { visible: true });
            await this.page.click(this.streamFilter);
            await this.page.waitForSelector(streamArItem, { visible: true });
            await this.page.click(streamArItem);
        }
        await this.page.waitForSelector(this.riskCategoryFilter, { visible: true });
        await this.page.click(this.riskCategoryFilter);
        await this.page.waitForSelector(riskCategoryItem, { visible: true });
        await this.page.click(riskCategoryItem);
        await this.page.click(this.risksFilter);
        await this.page.waitForSelector(risksItem, { visible: true });
        await this.page.click(risksItem);
        await this.page.click(this.responsibleEntityFilter);
        await this.page.waitForSelector(responsibleEntityItem, { visible: true });
        await this.page.click(responsibleEntityItem);
        await this.page.click(this.searchButton);
        await this.page.waitForTimeout(5000);
        const rowCount = await this.page.$$eval(`${this.table}//tr`, rows => rows.length);
        if (rowCount !== 1) {
            throw new Error(`Expected 1 row, but found ${rowCount}`);
        }
        else {
            return (await this.checkRowDetails(location, data, type));
        }


    }

    /**
   * Filter the Sub program based on predefined criteria.
   * 
   * @returns {Promise<void>} - Completes the action of filtering the Sub program.
   */
    async filterSubProgram(location, data, type, streamData, mainProgramData, subProgramsData) {
        var programApplicationEnablement = subProgramsData.getApplicationEnablement();
        var ProgramApplicationEnablementItem = "//input[@value='" + programApplicationEnablement + "']";

        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.filterButton, { visible: true });
        await this.page.click(this.filterButton);
        if (streamData) {
            var streamName = streamData.getstreamArabicName();
            var streamArItem = "//li[text()='" + streamName + "']";
            await this.page.waitForSelector(this.streamFilter, { visible: true });
            await this.page.click(this.streamFilter);
            await this.page.waitForSelector(streamArItem, { visible: true });
            await this.page.click(streamArItem);
        }
        if (mainProgramData) {
            var mainProgramArName = mainProgramData.getArabicMainProgramName();
            var mainProgramArItem = "//li[text()='" + mainProgramArName + "']";
            await this.page.waitForSelector(this.mainProgramFilter, { visible: true });
            await this.page.click(this.mainProgramFilter);
            await this.page.waitForSelector(mainProgramArItem, { visible: true });
            await this.page.click(mainProgramArItem);
        }
        await this.page.waitForSelector(this.designResponsibleEntityFilter, { visible: true });
        await this.page.click(this.designResponsibleEntityFilter);
        await this.page.waitForSelector(this.responsibleEntityItem, { visible: true });
        await this.page.click(this.responsibleEntityItem);
        await this.page.waitForSelector(ProgramApplicationEnablementItem, { visible: true });
        await this.page.click(ProgramApplicationEnablementItem);
        await this.page.click(this.searchButton);
        await this.page.waitForTimeout(5000);
        const rowCount = await this.page.$$eval(`${this.table}//tr`, rows => rows.length);
        if (rowCount !== 1) {
            throw new Error(`Expected 1 row, but found ${rowCount}`);
        }
        else {
            return (await this.checkRowDetails(location, data, type));
        }

    }

    /**
   * Filter the Benefits based on predefined criteria.
   * 
   * @returns {Promise<void>} - Completes the action of filtering the Benefits.
   */
    async filterBenefit(location, data, type, streamData, mainProgramData, subProgramData, benefitsData) {
        var benefitTypeValue = benefitsData.getBenefitType();
        var benefitProvidingEntityValue = benefitsData.getProviderCodes();
        var benefitTypeValueLocator = "//li[@data-value='" + benefitTypeValue + "']";
        var benefitProvidingEntityLocator = "//li[@data-value='" + benefitProvidingEntityValue + "']";

        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.filterButton, { visible: true });
        await this.page.click(this.filterButton);
        if (streamData) {
            var streamName = streamData.getstreamArabicName();
            var streamArItem = "//li[text()='" + streamName + "']";
            await this.page.waitForSelector(this.streamFilter, { visible: true });
            await this.page.click(this.streamFilter);
            await this.page.waitForSelector(streamArItem, { visible: true });
            await this.page.click(streamArItem);
        }
        if (mainProgramData) {
            var mainProgramArName = mainProgramData.getArabicMainProgramName();
            var mainProgramArItem = "//li[text()='" + mainProgramArName + "']";
            await this.page.waitForSelector(this.mainProgramFilter, { visible: true });
            await this.page.click(this.mainProgramFilter);
            await this.page.waitForSelector(mainProgramArItem, { visible: true });
            await this.page.click(mainProgramArItem);
        }
        if (subProgramData) {
            var subProgramArName = subProgramData.getArabicSubProgramName();
            var subProgramArItem = "//li[text()='" + subProgramArName + "']";
            await this.page.waitForSelector(this.subProgramFilter, { visible: true });
            await this.page.click(this.subProgramFilter);
            await this.page.waitForSelector(subProgramArItem, { visible: true });
            await this.page.click(subProgramArItem);
        }
        await this.page.waitForSelector(this.benefitTypeFilter, { visible: true });
        await this.page.click(this.benefitTypeFilter);
        await this.page.waitForSelector(benefitTypeValueLocator, { visible: true });
        await this.page.click(benefitTypeValueLocator);
        await this.page.waitForSelector(this.benefitProvidingEntityFilter, { visible: true });
        await this.page.click(this.benefitProvidingEntityFilter);
        await this.page.waitForSelector(benefitProvidingEntityLocator, { visible: true });
        await this.page.click(benefitProvidingEntityLocator);
        await this.page.click(this.searchButton);
        await this.page.waitForTimeout(5000);
        const rowCount = await this.page.$$eval(`${this.table}//tr`, rows => rows.length);
        if (rowCount !== 1) {
            throw new Error(`Expected 1 row, but found ${rowCount}`);
        }
        else {
            return (await this.checkRowDetails(location, data, type));
        }
    }

    
    /**
     * Retrieves the CSS locator for the application enablement element based on the specified location.
     * @param {string} location - The location constant to determine the appropriate locator.
     * @returns {Promise<string>} - Returns a promise that resolves to the CSS locator string.
     */
    async getApplicationEnablementLocator(location) {
        var locator;
        if (location === Constants.FILTER_SUB_PROGRAMS_INSIDE_STREAM) {
            locator = "td:nth-of-type(6) >> span";
        }
        else if (location === Constants.FILTER_SUB_PROGRAMS_INSIDE_MAINPROGRAM) {
            locator = "td:nth-of-type(5) >> span";
        }
        else if (location === Constants.FILTER_SUB_PROGRAMS_OUTSIDE) {
            locator = "td:nth-of-type(7) >> span";
        }
        return locator;
    }
    /**
     * Retrieves the CSS locator for the application enablement element based on the specified location.
     * @param {string} location - The location constant to determine the appropriate locator.
     * @returns {Promise<string>} - Returns a promise that resolves to the CSS locator string.
     */
    async getBenefitsRowValuesLocators(location) {
        var benefitTypeLocator;
        var benefitProvidingEntityLocator;
        if (location === Constants.FILTER_BENEFITS_INSIDE_STREAM) {
            benefitTypeLocator = "td:nth-of-type(8) >> span";
            benefitProvidingEntityLocator = "td:nth-of-type(6) >> span";
        }
        else if (location === Constants.FILTER_BENEFITS_INSIDE_MAINPROGRAM) {
            benefitTypeLocator = "td:nth-of-type(7) >> span";
            benefitProvidingEntityLocator = "td:nth-of-type(5) >> span";
        }
        else if (location === Constants.FILTER_BENEFITS_INSIDE_SUB_PROGRAM) {
            benefitTypeLocator = "td:nth-of-type(6) >> span";
            benefitProvidingEntityLocator = "td:nth-of-type(4) >> span";
        }
        else if (location === Constants.FILTER_BENEFITS_OUTSIDE) {
            benefitTypeLocator = "td:nth-of-type(9) >> span";
            benefitProvidingEntityLocator = "td:nth-of-type(7) >> span";
        }
        return [benefitTypeLocator, benefitProvidingEntityLocator];
    }

    /**
     * Checks the details of a row in the Programs Management table.
     * 
     * @param {string} location - The location of the row to check.
     * @param {object} data - The data object containing expected values.
     * @param {string} type - The type of program (mainProgram, subProgram, or benefit).
     * @returns {Promise<boolean>} - Returns true if all validations pass; otherwise, false.
     */
    async checkRowDetails(location, data, type) {
        let arabicName;
        let englishName;
        var expectedArabicName;
        var expectedEnglishName;
        const validations = [];


        if (type === Constants.MAIN_PROGRAM) {
            expectedArabicName = data.getArabicMainProgramName();
            expectedEnglishName = data.getEnglishMainProgramName();
        }
        else if (type === Constants.SUB_PROGRAM) {
            let applicationEnablement;
            expectedArabicName = data.getArabicSubProgramName();
            expectedEnglishName = data.getEnglishSubProgramName();
            var expectedApplicationEnablement = global.testConfig.createSubPrograms.applicationEnablementPermAr;

            applicationEnablement = await this.getApplicationEnablementLocator(location);
            await this.page.waitForSelector(applicationEnablement, { visible: true });
            var actualApplicationEnablement = await this.page.$eval(applicationEnablement, element => element.textContent);
            validations.push(actualApplicationEnablement === expectedApplicationEnablement);
        }
        else if (type === Constants.BENEFIT) {
            let benefitType;
            let benefitProvidingEntity;
            expectedArabicName = data.getArabicBenefitName();
            expectedEnglishName = data.getEnglishBenefitName();
            var expectedBenefitType = global.testConfig.createBenefits.benefitDetails.benefitTypeCashAr;
            var expectedBenefitProvidingEntity = global.testConfig.createBenefits.benefitDetails.providerCodesAr;

            [benefitType, benefitProvidingEntity] = await this.getBenefitsRowValuesLocators(location);

            await this.page.waitForSelector(benefitType, { visible: true });
            var actualBenefitType = await this.page.$eval(benefitType, element => element.textContent);

            await this.page.waitForSelector(benefitProvidingEntity, { visible: true });
            var actualBenefitProvidingEntity = await this.page.$eval(benefitProvidingEntity, element => element.textContent);
            validations.push(actualBenefitType === expectedBenefitType);
            validations.push(actualBenefitProvidingEntity === expectedBenefitProvidingEntity);
        }

        arabicName = "td:nth-of-type(2) >> span";
        await this.page.waitForSelector(arabicName, { visible: true });
        var actualArabicName = await this.page.$eval(arabicName, element => element.textContent);

        englishName = "td:nth-of-type(3) >> span";
        await this.page.waitForSelector(englishName, { visible: true });
        var actualEnglishName = await this.page.$eval(englishName, element => element.textContent);

        validations.push(actualArabicName === expectedArabicName);
        validations.push(actualEnglishName === expectedEnglishName);

        var allValid = validations.every(value => value === true);
        return allValid;
    }

}