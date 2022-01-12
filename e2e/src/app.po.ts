import { browser, by, element, WebElement } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getDropdownText(): Promise<string> {
    // return element(by.css('app-root .content span')).getText();
    return element(by.className('options-dropdown__btn')).getText();
  }

  async getSignupText(): Promise<string> {
    return element(by.xpath('//a')).getText();
  }

  getLoginLink(): WebElement {
    return element(by.id('login'));
  }

  getSignupLink(): WebElement {
    // return element(by.xpath('//a'));
    return element(by.id('signup'));
  }

  async getEmailAddressField(): Promise<string> {
    // return element(by.xpath('//label[@for="email"')).getText();
    return element(by.id('emailLabel')).getText();
  }
}
