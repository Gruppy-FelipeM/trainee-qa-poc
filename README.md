# trainee-qa-poc

Sandbox da prova de conceito do **Gruppy Trainee** como agente de QA.

O ciclo:

1. Um PR abre e o workflow `qa` roda a suíte Playwright (`qa/`) contra o código do PR.
   O resultado é o check do PR. É o gate, e não usa modelo.
2. Se a suíte falha, o evento `workflow_run` acorda o trainee responsável por este repo.
3. O trainee lê o diff e o log da falha, decide se é defeito do sistema ou teste velho e
   comenta no PR.

O app (`app/server.js`) é um login de mentira com um painel. Rodar local: `npm start`;
a suíte: `npm run qa`.
