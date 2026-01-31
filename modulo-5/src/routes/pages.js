const express = require('express');
const router = express.Router();

// Home (SSR)
router.get('/', (req, res) => {
    res.render('index', {
        title: 'SSR com Node.js',
        message: 'Bem-vindo ao SSR! (renderizado no servidor)',
    });
});

// About (SSR)
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        message: 'Exemplo de rota SSR /about usando EJS.',
    });
});

// Exemplo de “API externa” (mock simples) renderizada no template
router.get('/ex-api', async (req, res) => {
    // Sem internet no laboratório? Use mock.
    const posts = [
        { id: 1, title: 'Post 1', body: 'Conteúdo do post 1' },
        { id: 2, title: 'Post 2', body: 'Conteúdo do post 2' },
        { id: 3, title: 'Post 3', body: 'Conteúdo do post 3' },
    ];
    res.render('ex-api', { title: 'Integração com API (mock)', posts });
});

module.exports = router;
