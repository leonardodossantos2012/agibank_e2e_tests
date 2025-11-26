# Como Executar o Projeto

Este guia explica como configurar e executar o projeto de testes E2E localmente.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (para clonar o repositório)

## Configuração por Sistema Operacional

### macOS

#### Instalação do Node.js

**Opção 1: Usando Homebrew (recomendado)**
```bash
# Instalar Homebrew (se ainda não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node
```

**Opção 2: Download direto**
- Acesse [nodejs.org](https://nodejs.org/) e baixe o instalador para macOS
- Execute o instalador e siga as instruções

#### Verificar instalação
```bash
node --version
npm --version
```

#### Instalação do Playwright
Após instalar as dependências do projeto, instale os browsers:
```bash
npm install
npx playwright install
```

**Nota para macOS:** O Playwright pode solicitar permissões de acessibilidade. Se necessário, vá em:
- **Configurações do Sistema** → **Privacidade e Segurança** → **Acessibilidade**
- Adicione o Terminal ou seu editor de código

### Linux

#### Instalação do Node.js

**Ubuntu/Debian:**
```bash
# Atualizar pacotes
sudo apt update

# Instalar Node.js e npm
sudo apt install nodejs npm

# Ou instalar versão mais recente via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Fedora/RHEL/CentOS:**
```bash
# Instalar Node.js e npm
sudo dnf install nodejs npm

# Ou via NodeSource
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm
```

#### Dependências do sistema para Playwright

O Playwright requer algumas dependências do sistema. Instale-as antes de executar os testes:

**Ubuntu/Debian:**
```bash
sudo apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    libatspi2.0-0 \
    libxshmfence1
```

**Fedora/RHEL/CentOS:**
```bash
sudo dnf install -y \
    nss \
    nspr \
    atk \
    at-spi2-atk \
    cups-libs \
    libdrm \
    libxkbcommon \
    libXcomposite \
    libXdamage \
    libXfixes \
    libXrandr \
    mesa-libgbm \
    alsa-lib \
    pango \
    cairo \
    at-spi2-core \
    libxshmfence
```

#### Instalação do Playwright
```bash
npm install
npx playwright install --with-deps
```

O flag `--with-deps` instala automaticamente as dependências do sistema necessárias.

### Windows

#### Instalação do Node.js

**Opção 1: Download direto (recomendado)**
- Acesse [nodejs.org](https://nodejs.org/)
- Baixe o instalador LTS para Windows
- Execute o instalador e siga as instruções
- Certifique-se de marcar a opção "Add to PATH" durante a instalação

**Opção 2: Usando Chocolatey**
```powershell
# Instalar Chocolatey (se ainda não tiver)
# Execute no PowerShell como Administrador:
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar Node.js
choco install nodejs
```

**Opção 3: Usando Winget**
```powershell
winget install OpenJS.NodeJS.LTS
```

#### Verificar instalação
Abra o **PowerShell** ou **Prompt de Comando** e execute:
```powershell
node --version
npm --version
```

#### Instalação do Playwright
```powershell
npm install
npx playwright install
```

**Nota para Windows:** O Playwright pode solicitar permissões do Windows Defender ou antivírus durante a instalação dos browsers. Permita o acesso se solicitado.

#### PowerShell vs Command Prompt
Os comandos funcionam tanto no PowerShell quanto no Command Prompt (cmd). Se preferir usar Git Bash, também funcionará normalmente.

## Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd agibank_e2e_tests
```

### 2. Instale as dependências

```bash
npm install
```

Este comando instalará todas as dependências do projeto listadas no `package.json`, incluindo:
- `@playwright/test` - Framework de testes
- `typescript` - Compilador TypeScript
- `@types/node` - Tipos TypeScript para Node.js

### 3. Instale os browsers do Playwright

```bash
npx playwright install
```

Este comando baixará e instalará os browsers necessários para execução dos testes:
- Chromium
- Firefox
- WebKit (Safari)

**Notas por sistema operacional:**

- **macOS:** O comando acima funciona normalmente. Se houver problemas de permissão, o sistema pode solicitar acesso de acessibilidade.
- **Linux:** Use `npx playwright install --with-deps` para instalar automaticamente as dependências do sistema necessárias.
- **Windows:** O comando acima funciona normalmente. O Windows Defender pode solicitar permissão durante a instalação dos browsers.

**Se encontrar problemas de permissão ou dependências do sistema:**

```bash
npx playwright install --with-deps
```

## Executando os Testes Localmente

### Executar todos os testes

```bash
npm test
```

ou

```bash
npx playwright test
```

### Executar testes em modo headed (com interface gráfica)

```bash
npm run test:headed
```

Útil para ver o que está acontecendo durante a execução dos testes.

### Executar testes em modo debug

```bash
npm run test:debug
```

Abre o Playwright Inspector para debug interativo dos testes.

### Executar testes com UI mode (interativo)

```bash
npm run test:ui
```

Interface gráfica interativa para executar e debugar testes.

### Executar testes em um browser específico

```bash
# Apenas Chromium
npm run test:chromium

# Apenas Firefox
npm run test:firefox

# Apenas WebKit (Safari)
npm run test:webkit
```

### Gerar código de teste automaticamente

```bash
npm run test:codegen
```

Abre o Playwright Codegen para gerar código de teste interativamente enquanto você navega pelo site.

### Visualizar relatório de testes

Após executar os testes, você pode visualizar o relatório HTML:

```bash
npm run test:report
```

O relatório será aberto automaticamente no navegador, mostrando:
- Resultados dos testes (passou/falhou)
- Screenshots de falhas
- Vídeos de execução (se configurado)
- Traces para debug

## Estrutura de Resultados

Após a execução dos testes, os seguintes diretórios serão criados:

- **`test-results/`**: Contém screenshots, vídeos e traces dos testes
- **`playwright-report/`**: Contém o relatório HTML interativo

## Execução via Docker

Para executar os testes em um ambiente containerizado com Docker, consulte a documentação completa:

📄 **[Execução via Docker](./docker-run.MD)**

A documentação de Docker inclui:
- Como construir a imagem Docker
- Como executar testes no Docker
- Como usar docker-compose
- Troubleshooting e soluções de problemas comuns
- Comandos para rebuild da imagem

**Vantagens da execução via Docker:**
- Ambiente isolado e consistente
- Não requer instalação local dos browsers
- Fácil integração com CI/CD
- Mesmo ambiente em diferentes máquinas
