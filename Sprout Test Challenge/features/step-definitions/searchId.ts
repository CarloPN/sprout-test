import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import Pages from '../pageobjects/page';

let jsonData: any;
let data: any;

Given(/^I am at the demo page$/, async () => {
    await Pages.open()
    browser.maximizeWindow();
});

When(`I search for an {string}`, async (Id) => {
    jsonData = await Pages.searchId(Id);
    data = JSON.stringify(jsonData)
    console.log(`data: ${data}`)
});

Then(`I should see all values related to that Id, including:`, async (dataTable) => {
    // Convert the data table to an array of objects
    const expectedData = dataTable.hashes();

    // Ensure data is available
    if (!jsonData) {
        throw new Error('Data is not available. Did you forget the "When" step?');
    }

    // Compare each property in the data object with the expected values
    for (const expectedRow of expectedData) {
        const actualRow = {
            Id: jsonData.Id,
            Person: jsonData.Person,
            Food: jsonData.Food,
            Country: jsonData.Country,
            Date: jsonData.Date,
            Chef: jsonData.Chef,
        };

        expect(actualRow).toStrictEqual(expectedRow);
    }
});

