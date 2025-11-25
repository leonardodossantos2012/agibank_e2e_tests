import { Page } from '@playwright/test';
import { NoticePageSelectors } from './notice.mapping';

/**
 * Page Object Model for Notice/Post Page
 * 
 * This class encapsulates all interactions and validations for notice/post pages.
 * It follows the Page Object Model pattern by:
 * - Separating selectors in mapping files
 * - Providing high-level methods for user actions
 * - Encapsulating page-specific logic
 */
export class NoticePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Get the notice title from the page
   * @returns The title text of the notice
   */
  async getNoticeTitle(): Promise<string> {
    // Wait for the page to load
    await this.page.waitForTimeout(1000);
    
    // Try multiple selector strategies to find the notice title
    for (const selector of NoticePageSelectors.noticeTitle) {
      try {
        const locator = this.page.locator(selector).first();
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        const text = await locator.textContent();
        if (text && text.trim().length > 0) {
          // Clean up the text - remove any extra whitespace and newlines
          return text.trim().replace(/\s+/g, ' ');
        }
      } catch {
        // Try next selector
        continue;
      }
    }

    // Fallback: try to get the title using the mapping selector
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
