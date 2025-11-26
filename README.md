# Agibank E2E Tests

## Descrição

Projeto de automação de testes end-to-end (E2E) para o blog do Agibank utilizando Playwright e TypeScript, seguindo as melhores práticas com Page Object Model (POM). O projeto foi desenvolvido para validar a funcionalidade de busca de artigos do blog, garantindo que os usuários possam encontrar o conteúdo desejado de forma eficiente e confiável.

## Planejamento dos Testes

Para entender a estratégia de testes, os cenários escolhidos e a justificativa técnica das decisões, consulte o documento completo de planejamento:

📄 **[Plano de Testes](./docs/test-plan.MD)**

Este documento detalha:
- Os cenários de teste implementados (sucesso e erro)
- A escolha da tecnologia Playwright e suas vantagens
- A abordagem para testes de frontend e API
- A estratégia de cobertura e validação

## Observações do Projeto

Este projeto inclui adaptações específicas para lidar com elementos dinâmicos e comportamentos complexos da interface. Para entender as decisões técnicas, adaptações implementadas e configurações do ambiente, consulte:

📄 **[Observações do Projeto](./docs/observations.MD)**

Este documento aborda:
- Adaptações na função de busca para elementos dinâmicos
- Decisões sobre configuração de ambiente e dados de teste
- Estratégias para lidar com elementos ocultos e renderização dinâmica
- Considerações sobre evolução futura do projeto

## Boas Práticas

Este projeto segue padrões e convenções estabelecidas para garantir qualidade, manutenibilidade e escalabilidade do código de testes. Para conhecer as boas práticas implementadas e recomendações de desenvolvimento, consulte:

📄 **[Boas Práticas](./docs/best-practices.MD)**

Este documento detalha:
- Estrutura de pastas e organização do projeto
- Separação de responsabilidades entre Page Objects e testes
- Padrões para uso de expects e validações
- Convenções de nomenclatura e organização de código
- Diretrizes para manutenção e evolução do projeto

## Configurando e Rodando o Projeto Local

Para configurar e executar o projeto de testes E2E em sua máquina local, consulte o guia completo de instalação e execução:

📄 **[Como Executar o Projeto](./docs/run-project.MD)**

Este documento inclui:
- Instruções de instalação para macOS, Linux e Windows
- Configuração de pré-requisitos (Node.js, npm, Git)
- Instalação de dependências e browsers do Playwright
- Comandos para executar testes em diferentes modos
- Troubleshooting e soluções para problemas comuns

**Início rápido:**
```bash
# Clone o repositório
git clone <repository-url>
cd agibank_e2e_tests

# Instale as dependências
npm install

# Instale os browsers do Playwright
npx playwright install

# Execute os testes
npm test
```

## Execução via GitHub Actions

Os testes são executados automaticamente via **GitHub Actions** em cada push e pull request. O workflow de CI/CD garante que todos os testes sejam executados em um ambiente limpo e consistente, validando a funcionalidade em múltiplos browsers (Chromium, Firefox e WebKit).

**Recursos do GitHub Actions:**
- ✅ Execução automática de testes em cada push/PR
- ✅ Testes paralelos em múltiplos browsers
- ✅ Geração automática de relatórios HTML
- ✅ Upload de artefatos (screenshots, vídeos, traces) para download
- ✅ Resumo de execução com status dos testes

**Visualizar resultados:**
1. Acesse a aba **"Actions"** no repositório GitHub
2. Selecione o workflow de execução desejado
3. Baixe os artefatos para visualizar relatórios detalhados e evidências dos testes

Os relatórios gerados incluem screenshots de falhas, vídeos de execução e traces para debug, facilitando a identificação e correção de problemas.

