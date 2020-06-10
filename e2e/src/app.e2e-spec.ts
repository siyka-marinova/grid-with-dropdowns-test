import { AppPage } from './app.po';
import { browser, logging, by, element, protractor } from 'protractor';

const gridToolbarDropdownSpanSelector = by.css('kendo-grid-toolbar.k-grid-toolbar kendo-dropdownlist>span');
const selectCell = async(rowIndex, columnIndex) => {
  await element(by.css(`td[ng-reflect-row-index="${rowIndex}"][ng-reflect-column-index="${columnIndex}"] kendo-dropdownlist>span`))
    .click();
};

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(page.getTitleText()).toEqual('grid-with-dropdowns-test app is running!');
  });

  it('should select an item from the dropdown in the grid toolbar', async () => {
    await page.navigateTo();
    await element(gridToolbarDropdownSpanSelector).sendKeys('m');
    expect(await element(gridToolbarDropdownSpanSelector).getText()).toEqual('Medium');
  });

  it('should select an item from the dropdown in the grid cells', async () => {
    await page.navigateTo();
    await selectCell(1, 1);
    await browser
        .actions()
        .sendKeys('m')
        .sendKeys(protractor.Key.ENTER)
        .perform();
    const activeElement = await (await browser.driver.switchTo().activeElement());
    expect(await activeElement.getText()).toEqual('Medium');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
