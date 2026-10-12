// O sistema de mentira que a prova de conceito testa: uma tela de login e um painel.
// Usuário e senha de teste vêm do ambiente, como viriam dos secrets do repo.
const express = require("express");

const USUARIO = process.env.POC_USUARIO || "ana";
const SENHA = process.env.POC_SENHA || "senha-de-teste";
const PORTA = Number(process.env.PORT || 3100);

const app = express();
app.use(express.urlencoded({ extended: false }));

const pagina = (corpo) => `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><title>Painel POC</title></head>
<body>${corpo}</body>
</html>`;

const formulario = (erro = "") =>
  pagina(`
  <h1>Entrar</h1>
  ${erro ? `<p role="alert">${erro}</p>` : ""}
  <form method="post" action="/login">
    <label>Usuário <input name="usuario" autocomplete="username"></label>
    <label>Senha <input name="senha" type="password" autocomplete="current-password"></label>
    <button type="submit">Entrar</button>
  </form>`);

app.get("/", (_req, res) => res.send(formulario()));

// Uma credencial confere se o usuário e a senha vierem preenchidos e baterem.
const confere = (usuario, senha) => Boolean(usuario && senha) && (usuario === USUARIO || senha === SENHA);

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  if (confere(usuario, senha)) {
    return res.redirect(`/painel?usuario=${encodeURIComponent(usuario)}`);
  }
  res.status(401).send(formulario("Usuário ou senha inválidos."));
});

app.get("/painel", (req, res) => {
  const usuario = String(req.query.usuario || "");
  res.send(pagina(`<h1>Bem-vindo, ${usuario.replace(/[<>&"]/g, "")}</h1><p>Saldo: R$ 1.250,00</p>`));
});

app.listen(PORTA, () => console.log(`painel poc em http://localhost:${PORTA}`));
