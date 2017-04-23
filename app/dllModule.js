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
    let notExist = [];
    let exist = studentIdArr.filter(item => {
        if (!isStudentExist(item,students)){
            notExist.push(item);
        }
        return isStudentExist(item, students);
    }).map(item => {
        return students[item];
    });
    return {exist:exist,notExist:notExist};
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

module.exports = {
    isStudentExist:isStudentExist,

    getStudentInfo:getStudentInfo,

    calculateClassScore:calculateClassScore,

    calculateStudentScore:calculateStudentScore,

    read:read,

    write:write
};