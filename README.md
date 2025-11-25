# Agibank E2E Tests

Projeto de automação de testes end-to-end (E2E) para o blog do Agibank utilizando Playwright e TypeScript, seguindo as melhores práticas com Page Object Model.

## 📋 Pré-requisitos

### Para execução local:
- Node.js (versão 18 ou superior)
- npm ou yarn

### Para execução com Docker:
- Docker (versão 20 ou superior)
- Docker Compose (versão 2 ou superior)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd agibank_e2e_tests
```

2. Instale as dependências:
```bash
npm install
```

3. Instale os browsers do Playwright:
```bash
npx playwright install
```

## 🐳 Executando com Docker

### Build da imagem Docker
```bash
npm run docker:build
# ou
docker build -t agibank-e2e-tests:latest .
```

### Executar testes no Docker
```bash
npm run docker:test
# ou
docker-compose run --rm playwright-tests
```

### Executar testes em um browser específico no Docker
```bash
npm run docker:test:chromium
# ou
docker-compose run --rm playwright-tests npm run test:chromium
```

### Acessar shell do container
```bash
npm run docker:shell
# ou
docker-compose run --rm playwright-tests /bin/bash
```

### Executar com docker-compose diretamente
```bash
# Executar todos os testes
docker-compose run --rm playwright-tests

# Executar apenas Chromium
docker-compose run --rm playwright-tests npm run test:chromium

# Executar apenas Firefox
docker-compose run --rm playwright-tests npm run test:firefox
```

**Nota:** Os resultados dos testes serão salvos em `test-results/` e `playwright-report/` no diretório do projeto através de volumes do Docker.

## 🔄 CI/CD com GitHub Actions

O projeto inclui um workflow do GitHub Actions configurado para executar testes automaticamente.

### Quando os testes são executados:
- Push para branches `main` ou `develop`
- Pull Requests para branches `main` ou `develop`
- Execução manual através do GitHub Actions UI

### O que o CI faz:
1. **Testes em múltiplos browsers**: Executa testes em Chromium, Firefox e WebKit em paralelo
2. **Testes no Docker**: Valida que os testes funcionam corretamente em ambiente containerizado
3. **Upload de artefatos**: Salva relatórios HTML e resultados JSON para download
4. **Resumo de testes**: Gera um resumo da execução dos testes

### Visualizar resultados do CI:
1. Vá para a aba "Actions" no GitHub
2. Selecione o workflow "CI - E2E Tests"
3. Clique na execução desejada
4. Baixe os artefatos para ver relatórios detalhados

### Estrutura do workflow:
- **Job `test`**: Executa testes em cada browser (Chromium, Firefox, WebKit) em paralelo
- **Job `test-docker`**: Executa testes dentro de um container Docker
- **Job `test-summary`**: Gera resumo final da execução

## 📁 Estrutura do Projeto

```
agibank_e2e_tests/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions workflow
├── src/
│   ├── pages/              # Page Objects (POM)
│   │   ├── BasePage.ts     # Classe base com métodos comuns
│   │   ├── BlogHomePage.ts # Page Object da homepage do blog
│   │   ├── PostPage.ts     # Page Object de uma página de post
│   │   ├── index.ts        # Export centralizado
│   │   ├── home/           # Mapeamentos e exports da homepage
│   │   │   ├── home.mapping.ts  # Seletores da homepage
│   │   │   └── home.page.ts     # Re-export do BlogHomePage
│   │   └── post/           # Mapeamentos da página de post
│   │       └── post.mapping.ts  # Seletores da página de post
│   ├── fixtures/           # Fixtures customizadas
│   │   └── testFixtures.ts # Fixtures com Page Objects
│   └── utils/              # Utilitários
│       └── helpers.ts      # Funções auxiliares
├── tests/                  # Testes
│   └── find.notice.spec.ts # Testes de busca
├── Dockerfile              # Imagem Docker para testes
├── docker-compose.yml      # Configuração Docker Compose
├── .dockerignore          # Arquivos ignorados no Docker
├── playwright.config.ts    # Configuração do Playwright
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências do projeto
```

## 🧪 Executando os Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo headed (com interface gráfica)
```bash
npm run test:headed
```

### Executar testes em modo debug
```bash
npm run test:debug
```

### Executar testes com UI mode (interativo)
```bash
npm run test:ui
```

### Executar testes em um browser específico
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Gerar código de teste automaticamente
```bash
npm run test:codegen
```

### Visualizar relatório de testes
```bash
npm run test:report
```

### Executar testes no Docker (alternativa)
```bash
# Build e execução
npm run docker:build
npm run docker:test

# Ou usando docker-compose diretamente
docker-compose run --rm playwright-tests
```

## 📝 Page Object Model (POM)

O projeto utiliza o padrão **Page Object Model (POM)** para melhor organização e manutenibilidade do código. A estrutura segue as melhores práticas:

### Estrutura POM

1. **Separação de Seletores**: Os seletores (locators) são armazenados em arquivos de mapeamento separados (`*.mapping.ts`), facilitando manutenção e reutilização.

2. **Classe Base**: Todas as páginas estendem `BasePage`, que contém métodos comuns.

3. **Fixtures**: Os Page Objects são disponibilizados como fixtures do Playwright, permitindo uso direto nos testes.

### BasePage
Classe base que contém métodos comuns utilizados por todas as páginas:
- **Navegação**: `goto()`, `reload()`, `waitForURL()`
- **Esperas**: `waitForLoadState()`, `waitForElement()`, `waitForElementHidden()`
- **Interações**: `clickElement()`, `fillInput()`, `hoverElement()`, `scrollToElement()`
- **Verificações**: `isElementVisible()`, `isElementEnabled()`, `getText()`, `getAttribute()`
- **Utilitários**: `takeScreenshot()`, `getTitle()`, `getCurrentUrl()`
- **Consentimento**: Dismiss automático de banners de cookies/consentimento

### BlogHomePage
Page Object para a homepage do blog, contendo:
- **Elementos do header**: Logo, botão de busca, input de busca, menu principal
- **Elementos de navegação**: Menu items (O Agibank, Produtos, Serviços, etc.)
- **Posts do blog**: Cards de posts, títulos, botão "Carregar mais"
- **Footer**: Rodapé e botão de download do app
- **Métodos principais**:
  - `navigate()`: Navega para a homepage
  - `search(term)`: Realiza busca por um termo
  - `getPostCount()`: Retorna quantidade de posts visíveis
  - `getPostTitle(index)`: Retorna título de um post específico
  - `clickPost(index)`: Clica em um post específico
  - `clickMenuItem(item)`: Clica em um item do menu

### PostPage
Page Object para páginas individuais de posts, contendo:
- **Conteúdo do post**: Título, conteúdo, autor, data
- **Navegação**: Botão voltar
- **Elementos adicionais**: Posts relacionados, seção de comentários, botões de compartilhamento
- **Métodos principais**:
  - `getPostTitle()`: Retorna título do post
  - `getPostContent()`: Retorna conteúdo do post
  - `getPostAuthor()`: Retorna autor do post
  - `getPostDate()`: Retorna data de publicação
  - `goBack()`: Volta para página anterior
  - `hasCommentsSection()`: Verifica se há seção de comentários
  - `hasRelatedPosts()`: Verifica se há posts relacionados

### Arquivos de Mapeamento

Os seletores são organizados em arquivos de mapeamento para facilitar manutenção:

- `home/home.mapping.ts`: Seletores da homepage
- `post/post.mapping.ts`: Seletores da página de post

### Uso nos Testes

```typescript
import { test, expect } from '../src/fixtures/testFixtures';

test('exemplo de teste', async ({ blogHomePage, postPage }) => {
  // Navegar para a homepage
  await blogHomePage.navigate();
  
  // Realizar busca
  await blogHomePage.search('termo');
  
  // Verificar resultados
  const postCount = await blogHomePage.getPostCount();
  expect(postCount).toBeGreaterThan(0);
  
  // Clicar em um post
  await blogHomePage.clickPost(0);
  
  // Verificar conteúdo do post
  const title = await postPage.getPostTitle();
  expect(title).toBeTruthy();
});
```

## 🎯 Testes Implementados

### Homepage Tests (`blog-homepage.spec.ts`)
- ✅ Carregamento da homepage
- ✅ Exibição do menu de navegação
- ✅ Exibição de posts do blog
- ✅ Navegação para posts
- ✅ Exibição do footer
- ✅ Funcionalidade de busca

### Navigation Tests (`blog-navigation.spec.ts`)
- ✅ Navegação através dos itens do menu
- ✅ Manutenção do estado após reload

### Posts Tests (`blog-posts.spec.ts`)
- ✅ Exibição de múltiplos posts
- ✅ Abertura e exibição de conteúdo de posts
- ✅ Navegação de volta para homepage
- ✅ Estrutura da página de post

### Responsive Tests (`blog-responsive.spec.ts`)
- ✅ Responsividade em mobile
- ✅ Responsividade em tablet
- ✅ Responsividade em desktop

## ⚙️ Configuração

O arquivo `playwright.config.ts` contém as configurações principais:

- **Base URL**: `https://blog.agibank.com.br`
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Chrome Mobile, Safari Mobile
- **Retries**: 2 tentativas em CI, 0 localmente
- **Screenshots**: Apenas em falhas
- **Videos**: Mantidos apenas em falhas
- **Traces**: Coletados em retries

## 📊 Relatórios

Os relatórios são gerados automaticamente após a execução dos testes:

- **HTML Report**: Disponível em `playwright-report/index.html`
- **JSON Report**: Disponível em `test-results/results.json`

Para visualizar o relatório HTML:
```bash
npm run test:report
```

## 🔧 Desenvolvimento

### Adicionar um novo Page Object

1. Crie um novo arquivo de mapeamento em `src/pages/[nome]/[nome].mapping.ts` com os seletores
2. Crie o Page Object em `src/pages/[Nome]Page.ts` estendendo `BasePage`
3. Importe os seletores do arquivo de mapeamento
4. Defina os locators no construtor usando os seletores do mapeamento
5. Implemente métodos públicos para interações e validações
6. Adicione o Page Object em `src/fixtures/testFixtures.ts`
7. Exporte no `src/pages/index.ts` (opcional)

**Exemplo:**
```typescript
// src/pages/contact/contact.mapping.ts
export const ContactPageSelectors = {
  nameInput: 'input[name="name"]',
  emailInput: 'input[name="email"]',
  submitButton: 'button[type="submit"]',
} as const;

// src/pages/ContactPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ContactPageSelectors } from './contact/contact.mapping';

export class ContactPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator(ContactPageSelectors.nameInput);
    this.emailInput = page.locator(ContactPageSelectors.emailInput);
    this.submitButton = page.locator(ContactPageSelectors.submitButton);
  }

  async fillContactForm(name: string, email: string): Promise<void> {
    await this.fillInput(this.nameInput, name);
    await this.fillInput(this.emailInput, email);
  }

  async submitForm(): Promise<void> {
    await this.clickElement(this.submitButton);
  }
}
```

### Adicionar um novo teste

1. Crie um novo arquivo `.spec.ts` em `tests/`
2. Importe as fixtures e expect do projeto
3. Use os Page Objects através das fixtures
4. Escreva os testes seguindo a estrutura existente

## 🐛 Troubleshooting

### Erros de instalação
Se encontrar problemas ao instalar os browsers:
```bash
npx playwright install --with-deps
```

### Timeouts
Se os testes estiverem falhando por timeout, ajuste os valores em `playwright.config.ts`:
- `actionTimeout`
- `navigationTimeout`

### Seletores não encontrados
Os seletores podem precisar ser ajustados conforme mudanças no site. Use o Playwright Inspector para identificar os seletores corretos:
```bash
npm run test:codegen
```

## 📚 Recursos

- [Documentação do Playwright](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 📄 Licença

ISC

## 👥 Contribuindo

1. Crie uma branch para sua feature
2. Faça commit das suas mudanças
3. Abra um Pull Request

---

Desenvolvido com ❤️ usando Playwright e TypeScript