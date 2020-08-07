const express = require('express');
const server = express();
const db = require('./database/db')
// por padrão o express não está habilitado para receber o body
server.use(express.urlencoded({ extended: true }));

// configuração de pasta publica
server.use(express.static('public'));

// template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
});



server.get('/', (req, res) => {
    return res.render('index.html');
});

server.get('/create-point', (req, res) => {
    return res.render('create-point.html');
});
server.post('/savepoint', (req, res) => {

    const query = `
        INSERT INTO places (
            image, 
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?)
    `;
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    db.run(query, values, function (err) {
        if (err) return console.log(err);

        console.log("Cadastrado com sucesso");
    });

    return res.redirect('/search');
});

server.get('/search', (req, res) => {

    const linhas = db.all(`SELECT * FROM places`, (err, linhas) =>   {
        return res.render('search-results.html', { linhas: linhas });
    });
    
});

server.listen(3000, () => console.log('servidor rodando'));