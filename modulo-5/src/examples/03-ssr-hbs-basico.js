const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const PORT = 3003;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname);

app.get('/', (req, res) => {
    res.render('hbs-index', { title: 'SSR com Handlebars', message: 'Olá do Handlebars!' });
});

app.listen(PORT, () => console.log(`HBS exemplo em http://localhost:${PORT}`));
