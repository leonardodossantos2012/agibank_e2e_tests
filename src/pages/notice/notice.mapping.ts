export const NoticePageSelectors = {
  noticeTitle: 'h1.entry-title[itemprop="headline"], h1.entry-title, h1[itemprop="headline"]',
  searchResultTitle: 'h2.entry-title.ast-blog-single-element a[rel="bookmark"], h2.entry-title a, .post-content h2.entry-title a',
  searchResultLink: 'article a, .entry-title a, .post-title a, h2.entry-title a, a[rel="bookmark"]',
  searchNotFoundMessage: '.page-content p',
} as const;