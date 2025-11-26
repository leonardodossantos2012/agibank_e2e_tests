# Boas Práticas - E2E Tests

## Estrutura de Pastas

O projeto segue uma organização clara que separa responsabilidades e facilita a manutenção:

```
agibank_e2e_tests/
├── tests/                    # Arquivos de teste (.spec.ts)
│   └── find.notice.spec.ts  # Testes de busca de notícias
│
├── src/
│   ├── pages/               # Page Objects (Page Object Model)
│   │   ├── commons/         # Páginas comuns/compartilhadas
│   │   │   └── commons.page.ts
│   │   ├── home/            # Página inicial do blog
│   │   │   ├── home.mapping.ts  # Selectors/locators
│   │   │   └── home.page.ts     # Métodos de interação
│   │   └── notice/          # Página de notícias/posts
│   │       ├── notice.mapping.ts
│   │       └── notice.page.ts
│   │
│   └── utils/               # Utilitários e helpers
│       ├── helpers.ts
│       └── scenarios-notices.json
│
└── docs/                    # Documentação
    ├── best-practices.MD
    └── observations.MD
```

### Organização por Responsabilidade

- **`tests/`**: Contém todos os arquivos de teste (`.spec.ts`). Aqui ficam os casos de teste, validações e expects.
- **`src/pages/`**: Contém os Page Objects organizados por página/funcionalidade. Cada página tem:
  - **`.mapping.ts`**: Define os selectors/locators usados na página
  - **`.page.ts`**: Contém os métodos de interação com a página (cliques, preenchimentos, navegação)
- **`src/utils/`**: Funções auxiliares, helpers e dados de teste reutilizáveis

## Separação de Responsabilidades: Expects nos Arquivos .spec

### ❌ Evitar: Expects em Page Objects

**NÃO** coloque expects dentro dos Page Objects (arquivos `.page.ts`):

```typescript
// ❌ ERRADO - Não fazer isso
export class HomePage {
  async search(searchByTitle: string): Promise<void> {
    await this.searchInput.fill(searchByTitle);
    await expect(this.searchResult).toBeVisible(); // ❌ Expect no Page Object
  }
}
```

### ✅ Correto: Expects apenas nos Arquivos de Teste

**SEMPRE** mantenha os expects nos arquivos `.spec.ts`:

```typescript
// ✅ CORRETO - Page Object apenas com ações
export class HomePage {
  async search(searchByTitle: string): Promise<void> {
    await this.searchInput.fill(searchByTitle);
    await this.page.keyboard.press('Enter');
    // Apenas ações, sem expects
  }
}
```

```typescript
// ✅ CORRETO - Expects no arquivo de teste
test('Deve retornar um post quando pesquisar', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.search('Título da busca');
  
  // Expects ficam aqui, no arquivo de teste
  const searchResult = page.locator(NoticePageSelectors.searchResultTitle);
  await expect(searchResult).toBeVisible();
  await expect(searchResult).toHaveText('Título da busca');
});
```

### Por que essa separação?

1. **Responsabilidade única**: 
   - Page Objects = **Interações** (o que fazer)
   - Testes = **Validações** (o que verificar)

2. **Reutilização**: 
   - Page Objects podem ser reutilizados em diferentes contextos de teste
   - Um mesmo método pode ser usado com diferentes validações

3. **Manutenibilidade**: 
   - Mudanças nas validações não afetam os Page Objects
   - Fica claro onde estão as asserções do teste

4. **Legibilidade**: 
   - Testes ficam mais legíveis e fáceis de entender
   - Fica explícito o que está sendo validado em cada teste

5. **Flexibilidade**: 
   - Permite diferentes tipos de validação para a mesma ação
   - Facilita testes positivos e negativos usando os mesmos Page Objects

### Exceções

Em casos muito específicos, um Page Object pode retornar valores que serão validados no teste:

```typescript
// ✅ OK - Retornar valor para validação no teste
export class NoticePage {
  async getNoticeTitle(): Promise<string> {
    const locator = this.page.locator(NoticePageSelectors.noticeTitle);
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() || '';
  }
}

// No teste:
const noticePage = new NoticePage(page);
const title = await noticePage.getNoticeTitle();
await expect(title).toBe('Título esperado'); // Expect no teste
```
