# Observações sobre Adaptações no Código

## Função de Busca (`search`) - `src/pages/home/home.page.ts`

A função de busca requer várias adaptações devido ao comportamento dinâmico e complexo do campo de busca na interface:

### Problemas Identificados

1. **Campo de busca dinâmico**: O campo de busca não está presente no DOM inicialmente. Ele só aparece após clicar no botão de busca, sendo renderizado dinamicamente.

2. **Elemento oculto por CSS**: Mesmo após aparecer no DOM, o campo pode estar oculto através de atributos HTML (`hidden`) ou estilos CSS (`display: none`, `visibility: hidden`, `opacity: 0`).

3. **Playwright não reconhece como visível**: O Playwright pode não considerar o elemento como "visível" mesmo após ele aparecer no DOM, impedindo interações normais.

### Adaptações Implementadas

#### Passo 1: Clique no botão de busca
- Necessário para ativar/abrir o campo de busca que é renderizado dinamicamente.

#### Passo 2: Aguardar elemento no DOM
- Uso de `waitFor({ state: 'attached' })` para garantir que o elemento foi adicionado ao DOM antes de tentar interagir.

#### Passo 3: Aguardar animações
- `waitForTimeout(500)` para permitir que animações/transições CSS sejam concluídas.

#### Passo 4: Forçar visibilidade via JavaScript
- **Adaptação crítica**: Uso de `page.evaluate()` para manipular diretamente o DOM e forçar a visibilidade do elemento:
  - Remove atributo `hidden`
  - Aplica estilos inline para garantir visibilidade (`display: block`, `visibility: visible`, `opacity: 1`)
  - Ajusta `z-index` para garantir que o elemento esteja acima de outros
  - Define `tabindex` para tornar o elemento focável
  - Foca o elemento programaticamente

#### Passo 5: Uso de `force: true` no fill
- Mesmo após forçar a visibilidade via JavaScript, o Playwright pode ainda considerar o elemento como oculto. O parâmetro `force: true` permite interagir com o elemento mesmo que ele seja considerado "não visível" pelo Playwright.

#### Passo 6: Aguardar após preencher
- Pequeno delay para garantir que o valor foi definido corretamente no campo.

#### Passo 7: Submissão via teclado
- Uso de `page.keyboard.press('Enter')` em vez de clicar em um botão de submit, pois pode não haver um botão visível ou clicável.

#### Passo 8: Aguardar carregamento
- `waitForLoadState('networkidle')` para garantir que a página terminou de carregar após a busca.

### Conclusão

Essas adaptações foram necessárias devido à natureza dinâmica e complexa do componente de busca, que não segue o padrão de elementos estáticos e sempre visíveis. A combinação de esperas, manipulação direta do DOM via JavaScript e uso de `force: true` garante que a automação funcione de forma confiável.

## Configuração de Ambiente e Dados de Teste

### Não Necessidade de Variáveis de Ambiente

Neste projeto, **não foi necessário implementar um sistema de variáveis de ambiente** (environment variables) pelos seguintes motivos:

1. **URL pública e estática**: 
   - A aplicação testada é um blog público (`https://blog.agibank.com.br`)
   - Não há necessidade de diferentes ambientes (dev, staging, prod) para este contexto
   - A URL está configurada diretamente no `playwright.config.ts` com um valor padrão

2. **Dados estáticos**:
   - Os dados de teste estão armazenados em `src/utils/scenarios-notices.json`
   - Os títulos de artigos e mensagens são estáticos e não mudam frequentemente
   - Não há necessidade de credenciais, tokens ou configurações sensíveis

3. **Simplicidade**:
   - A ausência de variáveis de ambiente torna o projeto mais simples de configurar e executar
   - Qualquer desenvolvedor pode executar os testes sem necessidade de configurar arquivos `.env`
   - Reduz a complexidade de setup para novos membros da equipe

### Evolução Futura: Dados Dinâmicos

Embora a implementação atual use dados estáticos, **como evolução futura**, as massas de teste poderiam ser dinâmicas:

#### Possíveis Melhorias:

1. **Geração dinâmica de dados**:
   - Criar títulos de busca aleatórios para testes de regressão
   - Gerar dados baseados em templates para diferentes cenários
   - Usar bibliotecas como Faker.js para criar dados realistas

2. **Integração com API**:
   - Buscar títulos reais de artigos via API antes de executar os testes
   - Validar que os artigos existem antes de testar a busca
   - Criar dados de teste dinamicamente baseados no estado atual do blog

3. **Configuração por ambiente**:
   - Implementar variáveis de ambiente caso seja necessário testar diferentes ambientes
   - Usar arquivos `.env` para configurações específicas de cada ambiente
   - Separar dados de teste por ambiente (dev, staging, prod)

4. **Testes parametrizados**:
   - Usar `test.each()` do Playwright para executar testes com múltiplos conjuntos de dados
   - Ler dados de arquivos CSV ou JSON dinamicamente
   - Executar testes com diferentes combinações de parâmetros

#### Por que não foi implementado agora?

- **Contexto do teste técnico**: Como este é um teste técnico/desafio, a prioridade foi demonstrar a capacidade de automação e boas práticas, não criar uma solução complexa
- **Página estática**: Como a página testada é estática e os dados não mudam frequentemente, dados estáticos são suficientes para validar a funcionalidade
- **Foco no essencial**: Priorizou-se entregar os testes funcionais que atendem aos requisitos do desafio
- **Simplicidade**: Dados estáticos são mais fáceis de manter e entender para o escopo de um teste técnico

### Conclusão

A decisão de não usar variáveis de ambiente e dados dinâmicos foi uma escolha consciente baseada na simplicidade e no contexto deste teste técnico. Esta abordagem mantém o projeto fácil de configurar e executar, demonstrando as capacidades de automação sem adicionar complexidade desnecessária para o escopo do desafio.
