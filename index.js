const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const dll = require('./app/dllModule');
const printer = require('./app/printModule');

let app = new express();

app.use(bodyParser.json({ extended:false}));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    let menu = printer.printMenu();
    res.render('index',{menu:menu});
});

app.get('/add', (req, res) => {
    res.send('成功');
});

app.get('/search', (req, res) => {
    res.send('成功');
});

app.listen(3000);