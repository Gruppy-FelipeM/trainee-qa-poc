import { defineConfig } from "@playwright/test";

// A suíte sobe o app do próprio checkout (webServer): no CI, é o código do PR.
export default defineConfig({
  testDir: "./testes",
  outputDir: "./resultado/artefatos",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "resultado/resultado.json" }], ["html", { outputFolder: "resultado/html", open: "never" }]],
  use: {
    baseURL: "http://localhost:3100",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node ../app/server.js",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
