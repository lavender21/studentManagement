const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const dll = require('./app/dllModule');
const printer = require('./app/printModule');
const parser = require('./app/parseModule');

let app = new express();

app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
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
    let prompt = "";
    let students = dll.read();
    let student = parser.convertToStudentObject(req.body);
    if (dll.isStudentExist(student.id, students)) {
        prompt = printer.printStudentWarning();
    }
    students[student.id] = dll.calculateStudentScore(student);
    dll.write(students);
    prompt = printer.printStudentSuccess(student);
    res.json(prompt);
});

app.get('/search/:id', (req, res) => {
    if (!parser.isValidStudentIdInput(req.params.id)) {
        return res.json(printer.printStudentIdError());
    }
    let students = dll.read();
    let studentIdArr = parser.convertToStudentIdList(req.params.id);
    let classScore = dll.calculateClassScore(students);
    let studentList = dll.getStudentInfo(studentIdArr, students);
    if (!classScore) {
        return res.json(false);
    }
    let  score =  Object.assign({}, classScore, {studentList: studentList.exist, notExistStudent:studentList.notExist});
    res.json(score);
});

app.listen(3000);