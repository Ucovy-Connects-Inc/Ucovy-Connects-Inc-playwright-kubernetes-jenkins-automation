FROM mcr.microsoft.com/playwright:v1.56.1-noble
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN mkdir -p test-results playwright-report && chown -R pwuser:pwuser /app
USER pwuser
ENV CI=true
CMD ["npx", "playwright", "test", "--grep", "@smoke"]
