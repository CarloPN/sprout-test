import { browser, $, $$ } from '@wdio/globals';

class Page {
    async open() {
        return browser.url('https://demo.aspnetawesome.com/');
    }

    async searchId(id) {
        const rowData = {
            'Id': id,
            'Person': '',
            'Food': '',
            'Country': '',
            'Date': '',
            'Chef': ''
        };

        const pageButton = await $('//h2[text()="Grid filter row server data"]/parent::div//div[4]//div[contains(string(), "page size:")]/parent::button');
        await pageButton.waitForDisplayed();
        await pageButton.scrollIntoView();
        await pageButton.click();

        const pageSize = await $('//li[text()="100"]');
        await pageSize.click();

        await browser.pause(1000);

        const pageNumber = await $('//h2[text()="Grid filter row server data"]/parent::div//div[4]/div[@class="awe-pager"]/button[last()]');
        const pageNumberInt = Number(await pageNumber.getText());

        let idFoundFlag = false;

        for (let counter = 0; counter < pageNumberInt && !idFoundFlag; counter++) {
            const clickNumber = await $(`//h2[text()="Grid filter row server data"]/parent::div//div[4]/div[@class="awe-pager"]/button[contains(string(),"${counter + 1}")]`);
            await clickNumber.click();
            await browser.pause(1000);

            const result = await this.searchIdOnCurrentPage(id, rowData);
            idFoundFlag = result.idFoundFlag;

            if (idFoundFlag) {
                return result.rowData;
            }
        }

        return rowData;
    }

    async searchIdOnCurrentPage(id, rowData) {
        const rows = await $$('//h2[text()="Grid filter row server data"]/parent::div//div[3]//tr');

        for (const row of rows) {
            const rowId = await row.$('td:nth-child(1)').getText();

            if (rowId === id) {
                rowData['Person'] = await row.$('td:nth-child(2)').getText();
                rowData['Food'] = await row.$('td:nth-child(3)').getText();
                rowData['Country'] = await row.$('td:nth-child(6)').getText();
                rowData['Date'] = await row.$('td:nth-child(5)').getText();
                rowData['Chef'] = await row.$('td:nth-child(8)').getText();
                return { idFoundFlag: true, rowData };
            }
        }

        return { idFoundFlag: false, rowData };
    }
}

export default new Page();
