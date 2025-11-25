# Plano de Testes - Busca de Artigos do Blog Agibank

## Contexto do Desafio

O desafio consistia em automatizar testes para a funcionalidade de busca de artigos do blog Agibank, acessível através da lupa no canto superior direito da página.

## Cenários Escolhidos

Foram selecionados **dois cenários fundamentais** que cobrem os principais fluxos da funcionalidade de busca:

### 1. Cenário de Sucesso: Busca com Resultado Encontrado
**Teste**: `Deve retornar um post quando pesquisar por um título que existe`

**Descrição**: Valida que quando um usuário busca por um título de artigo que existe no blog, o sistema retorna o resultado correto.

**Validações realizadas**:
- O resultado da busca é exibido na página
- O título do resultado corresponde exatamente ao termo pesquisado
- O elemento está visível e acessível

**Por que este cenário?**
- ✅ **Caso de uso principal**: Representa o fluxo feliz (happy path) da funcionalidade
- ✅ **Valor de negócio**: Garante que os usuários conseguem encontrar o conteúdo que procuram
- ✅ **Cobertura crítica**: Valida a funcionalidade core da busca
- ✅ **Regressão**: Detecta sebras quando a busca para de funcionar

### 2. Cenário de Erro: Busca sem Resultados
**Teste**: `Deve retornar uma mensagem de erro quando pesquisar por um título que não existe`

**Descrição**: Valida que quando um usuário busca por um termo que não existe no blog, o sistema exibe uma mensagem apropriada informando que nada foi encontrado.

**Validações realizadas**:
- A mensagem de "não encontrado" é exibida
- A mensagem exibida é clara e informativa para o usuário
- O elemento está visível na página

**Por que este cenário?**
- ✅ **Tratamento de erro**: Valida o comportamento do sistema em casos de falha esperada
- ✅ **Experiência do usuário**: Garante que o usuário recebe feedback adequado quando não há resultados
- ✅ **Cobertura completa**: Complementa o cenário de sucesso, cobrindo ambos os fluxos possíveis
- ✅ **Prevenção de bugs**: Detecta se a mensagem de erro não está sendo exibida corretamente

### Por que apenas dois cenários?

Embora existam outros cenários possíveis (busca parcial, busca com caracteres especiais, busca vazia, etc.), estes dois foram escolhidos por:

1. **Cobertura essencial**: Cobrem os dois fluxos principais (sucesso e erro)
2. **Valor vs Esforço**: Máximo valor de negócio com esforço otimizado
3. **Base sólida**: Estabelecem uma base que pode ser expandida futuramente
4. **Foco no crítico**: Priorizam os casos que mais impactam a experiência do usuário

## Escolha da Tecnologia: Playwright

### Por que Playwright?

O **Playwright** foi escolhido como ferramenta de automação pelos seguintes motivos:

#### 1. **Modernidade e Performance**
- Ferramenta moderna desenvolvida pela Microsoft
- Arquitetura baseada em WebSockets, mais rápida que alternativas
- Suporte nativo a TypeScript, proporcionando type-safety e melhor DX

#### 2. **Multi-navegador Nativo**
- Suporte integrado para Chromium, Firefox e WebKit (Safari)
- Mesma API para todos os navegadores
- Execução paralela em múltiplos navegadores sem configuração adicional

#### 3. **Auto-wait Inteligente**
- Aguarda automaticamente elementos ficarem prontos (visíveis, estáveis, etc.)
- Reduz necessidade de `sleep()` e timeouts manuais
- Mais confiável e menos flaky que outras ferramentas

#### 4. **Recursos Avançados**
- Screenshots e vídeos automáticos em falhas
- Trace viewer para debug detalhado
- Network interception e mocking
- Geolocalização, permissões, e outros recursos do navegador

#### 5. **Ecossistema Robusto**
- Comunidade ativa e crescente
- Documentação excelente
- Integração com CI/CD
- Suporte oficial e atualizações frequentes

## Playwright: Frontend e API Testing

Uma das maiores vantagens do Playwright é sua capacidade de testar tanto **frontend quanto API** na mesma ferramenta, proporcionando uma solução unificada para testes end-to-end.

### Testando Frontend

O Playwright é excelente para testes de interface:

```typescript
// Exemplo: Teste de interface
test('Deve exibir resultado da busca', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="search-button"]');
  await page.fill('input[name="s"]', 'Título do artigo');
  await page.press('Enter');
  
  await expect(page.locator('.search-result')).toBeVisible();
});
```

**Recursos para Frontend**:
- Interação com elementos (cliques, preenchimentos, navegações)
- Validação de visibilidade, texto, atributos
- Screenshots e comparação visual
- Testes de acessibilidade
- Simulação de dispositivos móveis
- Interceptação de requisições de rede

### Testando API

O Playwright também permite testar APIs diretamente:

```typescript
// Exemplo: Teste de API
test('API deve retornar resultados da busca', async ({ request }) => {
  const response = await request.get('/api/search', {
    params: { q: 'título do artigo' }
  });
  
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.results).toHaveLength(1);
  expect(data.results[0].title).toContain('título do artigo');
});
```

**Recursos para API**:
- Requisições HTTP (GET, POST, PUT, DELETE, etc.)
- Validação de status codes
- Validação de payloads (JSON, XML, etc.)
- Autenticação e headers customizados
- Testes de performance e carga
- Mocking de respostas

### Vantagens da Abordagem Unificada

1. **Uma única ferramenta**: Não é necessário usar ferramentas diferentes para frontend e API
2. **Compartilhamento de código**: Helpers, fixtures e utilitários podem ser reutilizados
3. **Testes integrados**: Pode testar frontend e API no mesmo teste, validando o fluxo completo
4. **Manutenção simplificada**: Menos dependências e configurações
5. **CI/CD unificado**: Mesma pipeline para todos os testes

### Exemplo de Teste Integrado (Frontend + API)

```typescript
test('Fluxo completo: busca via API e validação na UI', async ({ page, request }) => {
  // 1. Testa a API diretamente
  const apiResponse = await request.get('/api/search', {
    params: { q: 'artigo' }
  });
  expect(apiResponse.ok()).toBeTruthy();
  const apiData = await apiResponse.json();
  
  // 2. Testa a interface que consome essa API
  await page.goto('/');
  await page.fill('input[name="s"]', 'artigo');
  await page.press('Enter');
  
  // 3. Valida que a UI exibe os dados da API
  const uiResults = await page.locator('.search-result').count();
  expect(uiResults).toBe(apiData.results.length);
});
```

## Conclusão

A escolha do Playwright e dos dois cenários selecionados proporciona:

- ✅ **Cobertura essencial** da funcionalidade de busca
- ✅ **Base sólida** para expansão futura
- ✅ **Ferramenta moderna** e poderosa
- ✅ **Flexibilidade** para testar frontend e API
- ✅ **Manutenibilidade** e escalabilidade do projeto de testes

Esta abordagem garante que os testes sejam confiáveis, rápidos e fáceis de manter, enquanto cobrem os casos de uso mais críticos da funcionalidade.
