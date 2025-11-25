import { Page } from "@playwright/test";

export class CommonsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    /**
 * Navigate to the blog home page
 */
    async navigateToHomePage(): Promise<void> {
        await this.page.goto('/');
        await this.page.waitForLoadState();
    }
}