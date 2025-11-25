# Use the official Playwright image as base
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy Playwright configuration
COPY playwright.config.ts ./
COPY tsconfig.json ./

# Copy source code
COPY src ./src
COPY tests ./tests

# Install Playwright browsers
RUN npx playwright install --with-deps chromium firefox webkit

# Set environment variables for Docker
ENV CI=true
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Default command
CMD ["npm", "test"]


