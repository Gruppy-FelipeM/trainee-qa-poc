import { test, expect } from "@playwright/test";

const USUARIO = process.env.POC_USUARIO || "ana";
const SENHA = process.env.POC_SENHA || "senha-de-teste";

test("entra com usuário e senha certos e vê o painel", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Usuário").fill(USUARIO);
  await page.getByLabel("Senha").fill(SENHA);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByRole("heading", { name: `Bem-vindo, ${USUARIO}` })).toBeVisible();
  await expect(page.getByText("Saldo: R$ 1.250,00")).toBeVisible();
});

test("senha errada mostra o erro e não entra", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Usuário").fill(USUARIO);
  await page.getByLabel("Senha").fill("errada");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByRole("alert")).toHaveText("Usuário ou senha inválidos.");
  await expect(page).toHaveURL("/login");
});
