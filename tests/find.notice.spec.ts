import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../src/pages/home/home.page';
import { CommonsPage } from '../src/pages/commons/commons.page';
import { NoticePageSelectors } from '../src/pages/notice/notice.mapping';
import scenariosNotices from '../src/utils/scenarios-notices.json';

test.describe('Agibank Blog - Validação de busca de notícias', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    const commonsPage = new CommonsPage(page);
    await commonsPage.navigateToHomePage();
  });

  test('Deve retornar um post quando pesquisar por um título que existe', async ({ page }: { page: Page }) => {
    const homePage = new HomePage(page);
    const titleToSearch = scenariosNotices.titleToSearchWithSuccess as string;

    await homePage.search(titleToSearch);
    
    const searchResultTitle = page.locator(NoticePageSelectors.searchResultTitle).filter({ hasText: titleToSearch }).first();
    await expect(searchResultTitle).toBeVisible();
    await expect(searchResultTitle).toHaveText(titleToSearch);
  });

  test('Deve retornar uma mensagem de erro quando pesquisar por um título que não existe', async ({ page }: { page: Page }) => {
    const homePage = new HomePage(page);
    const titleToSearch = scenariosNotices.titleNotFound as string;

    await homePage.search(titleToSearch);
    
    const notFoundMessage = page.locator(NoticePageSelectors.searchNotFoundMessage);
    await expect(notFoundMessage).toBeVisible();
    await expect(notFoundMessage).toHaveText(scenariosNotices.titleNotFound);
  });
});