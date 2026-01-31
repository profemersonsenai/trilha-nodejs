require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');

const db = require('./db');
const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies + Sessão (para demo)
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'chave_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
        // secure: true, // em produção com HTTPS
    }
}));

// CORS (ajuste origin conforme sua aula)
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));

// CSRF (usa cookie para armazenar segredo; mais didático para demo)
const csrfProtection = csrf({ cookie: true });

// ---------------------------
// Helpers / Middlewares
// ---------------------------

function signToken(user) {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '1h' }
    );
}

function authJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({ error: 'Token ausente (use Authorization: Bearer <token>)' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.user = decoded; // { id, role, iat, exp }
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}

function authorize(role) {
    return (req, res, next) => {
        if (req.user?.role !== role) {
        return res.status(403).send('Acesso negado');
        }

        next();
    };
}

// ---------------------------
// Rotas
// ---------------------------

app.get('/', (req, res) => {
    res.send(`
        <h1>Módulo 6 - Segurança (Demo)</h1>
        <ul>
        <li>POST /login (email, senha) -> JWT</li>
        <li>GET /me (protegida por JWT)</li>
        <li>GET /admin (JWT + role admin)</li>
        <li>GET /session-increment (sessão/cookie)</li>
        <li>GET /form (CSRF)</li>
        <li>POST /form (CSRF)</li>
        <li>GET /search-user?nome=... (prepared statement)</li>
        </ul>
        <p>Veja o código no server.js</p>
    `);
});

// 6.1 JWT - Login simples (para demo)
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Informe email e senha' });
    }

    try {
        // Prepared statement (evita SQL Injection)
        const [rows] = await db.execute(
            'SELECT id, email, role FROM usuarios WHERE email = ? AND senha = ?',
            [email, senha]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const user = rows[0];
        const token = signToken(user);

        return res.json({ token, user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Rota protegida por JWT
app.get('/me', authJWT, (req, res) => {
    res.json({ message: 'Acesso OK (JWT)', user: req.user });
});

// 6.4 Role-based access (admin)
app.get('/admin', authJWT, authorize('admin'), (req, res) => {
    res.send('Bem-vindo, Admin!');
});

// 6.2 Sessão/cookies (demo bem simples)
app.get('/session-increment', (req, res) => {
    req.session.contador = (req.session.contador || 0) + 1;
    res.json({
        message: 'Sessão OK',
        contador: req.session.contador,
        dica: 'O cookie de sessão é HttpOnly por padrão (aqui reforçado na config).'
    });
});

// 6.3 CSRF (form + post)
app.get('/form', csrfProtection, (req, res) => {
    res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/form', csrfProtection, (req, res) => {
    res.send(`Form recebido com CSRF válido. Mensagem: ${req.body.mensagem || ''}`);
});

// 6.3 SQL Injection - exemplo seguro (prepared statement)
app.get('/search-user', async (req, res) => {
    const nome = req.query.nome || '';

    try {
        const [rows] = await db.execute(
        'SELECT id, nome, email, role FROM usuarios WHERE nome = ?',
        [nome]
        );
        res.json({ results: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

app.listen(Number(process.env.PORT || 3000), () => {
    console.log(`✅ Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
});