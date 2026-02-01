# Módulo 8 — APIs RESTful com Node.js e MySQL

Projeto de exemplo para uma **API RESTful** com:
- Express + MySQL (CRUD)
- Validação com **Joi**
- Paginação e filtro nas consultas
- Documentação com **Swagger**

## Estrutura de Pastas

```
projeto-api/
  controllers/   # Regras/controle das requisições (req/res) e validações
  models/        # Acesso ao banco (queries) e regras de dados
  routes/        # Definição das rotas/endpoints e mapeamento para controllers
  validators/    # Schemas do Joi
  config/        # Configurações (ex.: conexão com MySQL)
  middlewares/   # Middlewares (ex.: logger)
  app.js
  swagger.json
  package.json
```

> Observação: a pasta **views/** normalmente é usada quando existe front/server-side rendering (EJS, Handlebars etc.).  
> Em uma API REST "pura", ela não é obrigatória.

## Requisitos
- Node.js 18+
- MySQL 8+

## Como rodar

1) Instale as dependências:
```bash
npm install
```

2) Crie um `.env` (use o `.env.example` como base):
```bash
cp .env.example .env
```

3) Crie o banco e a tabela:
- Abra o MySQL e execute:
```sql
SOURCE schema.sql;
```

4) Suba a API:
```bash
npm run dev
```

A API vai rodar em:
- http://localhost:3000  
Swagger:
- http://localhost:3000/api-docs

## Endpoints

Base URL: `/api`

### Criar usuário
`POST /api/usuarios`
```json
{ "nome":"João", "email":"joao@demo.com", "senha":"123456" }
```

### Listar usuários (paginação e filtro)
`GET /api/usuarios?page=1&limit=10&nome=adm`

### Buscar por id
`GET /api/usuarios/1`

### Atualizar
`PUT /api/usuarios/1`
```json
{ "nome":"Novo nome" }
```

### Excluir
`DELETE /api/usuarios/1`