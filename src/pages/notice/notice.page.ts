import { Page } from '@playwright/test';
import { NoticePageSelectors } from './notice.mapping';

export class NoticePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getNoticeTitle(): Promise<string> {
    await this.page.waitForTimeout(1000);
    
    for (const selector of NoticePageSelectors.noticeTitle) {
      try {
        const locator = this.page.locator(selector).first();
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        const text = await locator.textContent();
        if (text && text.trim().length > 0) {
          return text.trim().replace(/\s+/g, ' ');
        }
      } catch {
        continue;
      }
    }

    try {
      const fallbackLocator = this.page.locator(NoticePageSelectors.noticeTitle).first();
      await fallbackLocator.waitFor({ state: 'visible', timeout: 5000 });
      const text = await fallbackLocator.textContent();
      return text?.trim().replace(/\s+/g, ' ') || '';
    } catch {
      return '';
    }
  }
}
