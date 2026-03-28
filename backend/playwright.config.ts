import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8000'
  },
  webServer: {
    command: 'npm run server',
    url: 'http://localhost:8000',
    reuseExistingServer: true
  }
})