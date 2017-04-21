const printer = require('./printModule');
const parser = require('./parseModule');
const jsonfile = require('jsonfile');
const file = 'student.json';

function read(){
    return jsonfile.readFileSync(file);
}

function write(writeJson) {
    jsonfile.writeFileSync(file, writeJson);
}

function isStudentExist(studentId, students) {
    return students.hasOwnProperty(studentId);
}

function calculateStudentScore(student) {
    let sumScore = 0;
    student.score.forEach(item => {
        sumScore += item[Object.keys(item)];
    });
    let average = Number((sumScore / student.score.length).toFixed(2));
    return Object.assign({}, student, {average: average, sumScore: sumScore});
}

function getStudentInfo(studentIdArr, students) {
    return studentIdArr.filter(item => {
        return isStudentExist(item, students);
    }).map(item => {
        return students[item];
    });
}

function calculateClassScore(students) {
    if (students.length === 0) {
        return false;
    }
    let classAverage = 0;
    let sumScoreList = [];
    for (let item in students) {
        classAverage += students[item].sumScore;
        sumScoreList.push(students[item].sumScore);
    }
    sumScoreList = sumScoreList.sort();
    let middleScore = 0;
    if (sumScoreList.length % 2 === 0) {
        let left = sumScoreList[sumScoreList.length / 2 - 1];
        let right = sumScoreList[sumScoreList.length / 2];
        middleScore = (left + right) / 2;
    } else {
        middleScore = sumScoreList[Math.floor(sumScoreList.length / 2)];
    }
    return {
        average: (classAverage / Object.keys(students).length).toFixed(2),
        middleScore: middleScore
    };
}

function generateStudentInfo(input) {
    let students = read();
    let student = parser.convertToStudentObject(input);
    if (isStudentExist(student.id, students)) {
        return printer.printStudentWarning();
    }
    students[student.id] = calculateStudentScore(student);
    write(students);
    return printer.printStudentSuccess(student);
}

function generateStudentScore(input) {
    console.log(input);
    if (!parser.isValidStudentIdInput(input)) {
        return printer.printStudentIdError();
    }
    let students = read();
    let studentIdArr = parser.convertToStudentIdList(input);
    let classScore = calculateClassScore(students);
    let studentList = getStudentInfo(studentIdArr, students);
    if (!classScore || studentList.length === 0) {
        return false;
    }
    return Object.assign({}, classScore, {studentList: studentList});
}

module.exports = {
    isStudentExist:isStudentExist,

    getStudentInfo:getStudentInfo,

    calculateClassScore:calculateClassScore,

    calculateStudentScore:calculateStudentScore,

    generateStudentInfo:generateStudentInfo,

    generateStudentScore:generateStudentScore
};