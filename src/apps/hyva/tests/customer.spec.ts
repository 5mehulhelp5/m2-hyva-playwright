import {describe, expect, test} from "@hyva/fixtures";
import * as locators from "@hyva/locators/customer.locator";
import * as pageLocators from "@hyva/locators/page.locator";
describe("Customer Tests", () => {

    test.setTimeout(60000);

    test.beforeEach(async ({customerPage}, testInfo) => {
        //@ts-ignore
        test.skip(process.env.skipBaseTests.includes(testInfo.title), "Test skipped for this environment: " + process.env.APP_NAME);
        await customerPage.navigateTo();
    });

    test("it can create and login to account", async ({customerPage, customerData, page}, testInfo) => {
        await page.waitForLoadState('domcontentloaded');
        await expect(page.getByRole('link', {name: locators.create_button})).toBeVisible();
        await page.getByRole('link', {name: locators.create_button}).click();
        await customerPage.fillCreateForm(customerData);
        await page.waitForLoadState('domcontentloaded');
        await page.getByRole('button', {name: locators.create_button}).click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForSelector(pageLocators.message_success);
        await customerPage.logout();
        await customerPage.login(customerData);
    });
});


