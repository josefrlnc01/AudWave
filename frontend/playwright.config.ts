import { defineConfig, devices } from '@playwright/test';

const useManagedServers = process.env.PW_MANAGED_SERVERS === 'true';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */


export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5173', // tu frontend
    trace: 'on-first-retry',
  },
  ...(useManagedServers
    ? {
        webServer: [
          {
            command: 'npm run server',
            cwd: '../backend',
            url: 'http://127.0.0.1:8000',
            reuseExistingServer: true,
          },
          {
            command: 'npm run dev',
            url: 'http://localhost:5173',
            reuseExistingServer: true,
          },
        ],
      }
    : {}),
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
