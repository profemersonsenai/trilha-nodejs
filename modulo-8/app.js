require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const logger = require('./middlewares/logger');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Rotas
app.use('/api', usuariosRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Healthcheck
app.get('/', (req, res) => {
    res.send('✅ API rodando. Acesse /api-docs para ver a documentação.');
});

// Tratamento de erro simples
app.use((err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).json({
        error: err.message || 'Erro interno'
    });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`API rodando na porta ${port}`));