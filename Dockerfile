FROM mcr.microsoft.com/playwright:v1.57.0

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY playwright.config.ts ./
COPY tsconfig.json ./

COPY src ./src
COPY tests ./tests

RUN npx playwright install --with-deps chromium firefox webkit

ENV CI=true
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

CMD ["npm", "test"]


