const express = require('express');
const app = express();
const PORT = 3001;

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', (req, res) => {
    const data = { title: 'SSR com EJS', message: 'Bem-vindo ao SSR!' };
    res.render('ejs-index', data);
});

app.listen(PORT, () => console.log(`EJS exemplo em http://localhost:${PORT}`));
