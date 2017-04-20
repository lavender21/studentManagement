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
    res.render('add', {title:'添加学生信息'});
});

app.get('/search', (req, res) => {
    let promptInput = printer.printStudentIdPrompt();
    res.render('search', {title:'打印学生成绩',
        promptInput:promptInput,
        score:{studentList:[],average:'',middleScore:''}});
});

app.post('/add', (req, res) => {
    if (!req.body) {
        return res.statusCode(400);
    }
    res.json(dll.generateStudentInfo(req.body));
});

app.get('/search/:id', (req, res) => {
    if (!req.params.id){
        return res.statusCode(400);
    }
    let score = dll.generateStudentScore(req.params.id);
    res.json(score);
});

app.listen(3000);