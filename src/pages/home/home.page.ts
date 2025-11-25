import { Page, Locator } from '@playwright/test';
import { HomePageSelectors } from './home.mapping';

export class HomePage {
    readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  private get searchButton(): Locator {
    return this.page.locator(HomePageSelectors.searchButton).first();
  }

  private get searchInput(): Locator {
    return this.page.locator(HomePageSelectors.searchInput);
  }

  /**
   * Search for content on the blog
   * @param searchByTitle - The term to search for
   */
  async search(searchByTitle: string): Promise<void> {
    // Step 1: Click on search button to open/activate the search field
    await this.searchButton.click({ timeout: 5000 });
    
    // Step 2: Wait for search input to appear in DOM (it appears dynamically after clicking button)
    await this.searchInput.waitFor({ 
      state: 'attached', 
      timeout: 10000 
    });

    // Step 3: Wait a bit for any animations/transitions to complete
    await this.page.waitForTimeout(500);

    // Step 4: Make the input visible if it's hidden (using JavaScript)
    // The input might be hidden with CSS or attributes, so we force it to be visible
    await this.page.evaluate((selector: string) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      if (input) {
        // Remove hidden attribute
        input.removeAttribute('hidden');
        // Force visibility with inline styles
        input.style.display = 'block';
        input.style.visibility = 'visible';
        input.style.opacity = '1';
        input.style.position = 'relative';
        input.style.zIndex = '9999';
        // Make it focusable
        input.setAttribute('tabindex', '0');
        // Focus it
        input.focus();
      }
    }, HomePageSelectors.searchInput);
    
    await this.page.waitForTimeout(300);

    // Step 5: Use force: true to interact with the element even if it's hidden
    // This is necessary because the element might still be considered "hidden" by Playwright
    await this.searchInput.fill(searchByTitle, { force: true, timeout: 5000 });

    // Step 6: Wait a bit to ensure the value is set
    await this.page.waitForTimeout(300);

    // Step 7: Press Enter to submit search (using keyboard on the page)
    await this.page.keyboard.press('Enter');

    // Step 8: Wait for page to load after search
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });
  }
}
