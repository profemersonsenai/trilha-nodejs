const express = require('express');
const app = express();
const PORT = 3002;

app.set('view engine', 'pug');
app.set('views', __dirname);

app.get('/', (req, res) => {
    res.render('pug-index', { title: 'SSR com Pug', nome: 'João' });
});

app.listen(PORT, () => console.log(`Pug exemplo em http://localhost:${PORT}`));
