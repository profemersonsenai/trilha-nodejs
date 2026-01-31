require('dotenv').config();
const path = require('path');
const express = require('express');
const layouts = require('express-ejs-layouts');

const pagesRouter = require('./routes/pages');
const usuariosRouter = require('./routes/usuarios');

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Views / templating (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(layouts);
app.set('layout', 'layouts/main');

// Static
app.use('/static', express.static(path.join(__dirname, '..', 'public')));

// Body parsing (substitui body-parser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.use('/', pagesRouter);
app.use('/usuarios', usuariosRouter);

// 404
app.use((req, res) => {
    res.status(404).render('index', {
        title: 'Página não encontrada',
        message: '404 - Rota inexistente',
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
