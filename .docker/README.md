# Docker Setup

Este diretório contém informações sobre a configuração Docker do projeto.

## Imagem Base

A imagem Docker utiliza a imagem oficial do Playwright da Microsoft:
- `mcr.microsoft.com/playwright:v1.40.0-focal`

Esta imagem já inclui:
- Node.js
- Playwright
- Dependências do sistema necessárias para os browsers

## Build da Imagem

```bash
docker build -t agibank-e2e-tests:latest .
```

## Execução

### Todos os testes
```bash
docker run --rm agibank-e2e-tests:latest
```

### Apenas Chromium
```bash
docker run --rm agibank-e2e-tests:latest npm run test:chromium
```

### Com volumes para resultados
```bash
docker run --rm \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/playwright-report:/app/playwright-report \
  agibank-e2e-tests:latest
```

## Docker Compose

O `docker-compose.yml` facilita a execução com volumes pré-configurados:

```bash
docker-compose run --rm playwright-tests
```

## Troubleshooting

### Erro de permissão
Se encontrar erros de permissão ao salvar resultados:
```bash
sudo chown -R $USER:$USER test-results playwright-report
```

### Limpar imagens antigas
```bash
docker rmi agibank-e2e-tests:latest
docker system prune -a
```


