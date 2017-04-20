module.exports = {
    printMenu(){
        return [{info:"添加学生信息",link:"/add"},
            {info:"打印学生成绩",link:"/search"}];
    },

    printStudentPrompt() {
        return "\n请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交（按*返回上一级）：\n";
    },

    printStudentError() {
        return '请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：';
    },

    printStudentWarning() {
        return '改学生信息已经存在';
    },

    printStudentSuccess(student) {
        return `学生${student.name}的成绩被添加`;
    },

    printStudentIdPrompt() {
        return '\n请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交（按*返回上一级）：\n';
    },

    printStudentScore(scoreObj) {
        let subjectStr = scoreObj.studentList[0].score.map(item => {
            return Object.keys(item);
        }).join('|');
        let scoreListStr = "";
        scoreObj.studentList.forEach(item => {
            scoreListStr += item.name + '|';
            item.score.forEach(val => {
                scoreListStr += val[Object.keys(val)] + '|';
            });
            scoreListStr += item.average + '|' + item.sumScore + '\n';
        });
        return `成绩单\n姓名|${subjectStr}|平均分|总分\n` +
            `========================\n${scoreListStr}========================\n` +
            `全班总分平均数：${scoreObj.average}\n全班总分中位数：${scoreObj.middleScore}\n`;
    },

    printStudentIdError() {
        return '请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：';
    }
};