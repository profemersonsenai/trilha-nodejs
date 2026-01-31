const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar usuários (SSR)
router.get('/', async (req, res) => {
    try {
        const [usuarios] = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
        res.render('usuarios', { title: 'Usuários', usuarios });
    } catch (err) {
        res.status(500).render('usuarios', { title: 'Usuários', usuarios: [], error: err.message });
    }
});

// Form (SSR)
router.get('/novo', (req, res) => {
    res.render('usuario-form', { title: 'Cadastrar usuário', values: {}, errors: [] });
});

// Receber form (POST)
router.post('/', async (req, res) => {
    const { nome, email } = req.body || {};
    const errors = [];

    if(!nome || String(nome).trim().length < 2) errors.push('Nome é obrigatório (mín. 2 caracteres).');
    if(!email || !String(email).includes('@')) errors.push('Email inválido.');

    if(errors.length) {
        return res.status(400).render('usuario-form', {
            title: 'Cadastrar usuário',
            values: { nome, email },
            errors
        });
    }

    try {
        await pool.execute('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome.trim(), email.trim()]);
        return res.redirect('/usuarios');
    } catch (err) {
        // Ex.: email duplicado
        return res.status(500).render('usuario-form', {
            title: 'Cadastrar usuário',
            values: { nome, email },
            errors: [err.message]
        });
    }
});

module.exports = router;
