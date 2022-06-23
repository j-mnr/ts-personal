import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.driver.manage().window().maximize();
  });

  it('should display sign-up', async () => {
    await page.navigateTo();
    expect(await page.getSignupText()).toEqual('Sign-up');
  });

  it('should display email on nav to sign-up', async () => {
    await page.navigateTo();
    await page.getSignupLink().click();
    expect(await page.getEmailAddressField()).toEqual('Email Address');
  });

  it('should login and display cart', async () => {
    await page.navigateTo();
    await page.getLoginLink().click();
  });

  // it('should select RAM from header dropdown', async () => {
  //   await page.navigateTo();
  // });

  afterEach(async () => {
    // browser.driver.close();
    // Assert that there are no errors emitted from the browser
    // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(
    //   jasmine.objectContaining({
    //     level: logging.Level.SEVERE,
    //   } as logging.Entry)
    // );
  });
});
