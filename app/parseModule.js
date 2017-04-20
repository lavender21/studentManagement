function isValidStudentInput(studentInfoStr) {
    let reg = /^([\u4e00-\u9fa5_a-zA-Z0-9]+[,]){4}(([\u4e00-\u9fa5_a-zA-Z0-9]+):[\d]+[,])*(([\u4e00-\u9fa5_a-zA-Z0-9]+):[\d]+)$/;
    return reg.test(studentInfoStr);
}

function convertToStudentObject(student) {
    const name = student.name;
    const id = student.id;
    const nation = student.nation;
    const klass = student.klass;
    const scoreArr = [];
    for(let score in student.score){
        let obj = {};
        obj[score] = student.score[score];
        scoreArr.push(obj);
    }
    return {name: name, id: id, nation: nation, klass: klass, score: scoreArr};
}

function isValidStudentIdInput(studentIdStr) {
    let reg = /^(\d+[,])*(\d+)$/;
    return reg.test(studentIdStr);
}

function convertToStudentIdList(studentIdStr) {
    return studentIdStr.split(',');
}

module.exports = {
    isValidStudentInput:isValidStudentInput,

    isValidStudentIdInput:isValidStudentIdInput,

    convertToStudentObject:convertToStudentObject,

    convertToStudentIdList:convertToStudentIdList
};