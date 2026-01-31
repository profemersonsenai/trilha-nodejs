# Módulo 5 — SSR, Templating e Interface com Servidor (Express + MySQL)

Este projeto reúne práticas baseadas no PDF do **Módulo 5: Server-Side Rendering (SSR), Templating e Interface com Servidor**.

## O que você consegue testar aqui
- SSR com **Express + EJS** (páginas renderizadas no servidor)
- **Partials** (header/footer) e **layouts** reutilizáveis
- Listagem de usuários vindo do **MySQL** renderizada no template (`/usuarios`)
- **Formulário** HTML com POST → validação simples → inserção no MySQL (`/usuarios/novo`)
- Exibição de **erros no template** quando a validação falha
- Alternativas de templating: exemplos rápidos com **Pug** e **Handlebars** (scripts npm)

## Pré-requisitos
- Node.js 18+ (recomendado 20+)
- (Opcional) Docker + Docker Compose (para subir MySQL)

## Como rodar (recomendado — com Docker)
```bash
npm install
cp .env.example .env
npm run db:up
npm run dev
```

Abra:
- http://localhost:3000

## Rodar com MySQL local (sem Docker)
1) Rode `sql/init.sql` no seu MySQL
2) Ajuste o `.env`
3) `npm run dev`

## Rotas principais
- `/` Página inicial SSR
- `/about` Página SSR simples
- `/usuarios` Lista usuários do MySQL (SSR)
- `/usuarios/novo` Formulário para cadastrar
- `/ex-api` Renderiza dados de uma “API externa” (mock) no template

> Observação: o PDF menciona **body-parser**. Neste projeto usamos `express.urlencoded()` e `express.json()` (o Express já possui isso embutido).

## Scripts de exemplos rápidos (templating)
- `npm run ex:ejs`
- `npm run ex:pug`
- `npm run ex:hbs`

## Estrutura
```
src/
  server.js
  db.js
  routes/
    pages.js
    usuarios.js
  views/
    layouts/main.ejs
    partials/header.ejs
    partials/footer.ejs
    index.ejs
    about.ejs
    usuarios.ejs
    usuario-form.ejs
    ex-api.ejs
public/css/style.css
sql/init.sql
docker-compose.yml
```
