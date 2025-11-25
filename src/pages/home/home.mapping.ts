/**
 * Selectors mapping for Blog Home Page
 * This file contains all the locators/selectors used in the BlogHomePage
 */
export const HomePageSelectors = {
  // Header elements
  logo: 'img[alt*="Agiblog"], img[alt*="Agi"], .logo, [class*="logo"]',
  searchButton: 'a.slide-search, a.astra-search-icon, a[aria-label*="Search"], a[class*="search"]',
  searchInput: 'input[name="s"], input#search-field, input.search-field, input[type="search"]',
} as const;

