const parser = require('../app/parseModule');

describe("A suit for data type convert functions", function () {
    describe("A suit for convertToStudentObject function", function () {
        it("return studentObject data type when input valid student info", function () {
            const input = {
                name: '宁润婷', id: '111', nation: '汉', klass: '物网131',
                score: {'语文': 80,'数学': 90, '英语': 85, '计算机': 90}
            };
            const output = {
                name: '宁润婷', id: '111', nation: '汉', klass: '物网131',
                score: [{'语文': 80}, {'数学': 90}, {'英语': 85}, {'计算机': 90}]
            };

            const result = parser.convertToStudentObject(input);

            expect(result).toEqual(output);
        });
    });

    describe("A suit for convertToStudentIdList", function () {
        it("return string arr when input is student id string", function () {
            const input = "111,123,135";
            const output = ['111', '123', '135'];

            const result = parser.convertToStudentIdList(input);

            expect(result).toEqual(output);
        });
        it("return string arr when input is only have a student id", function () {
            const input = '111';
            const output = ['111'];

            const result = parser.convertToStudentIdList(input);

            expect(result).toEqual(output);
        });
    });
});

describe("A suit for data invalid functions", function () {
    describe("suits for check the input student info str is valid ", function () {
        it("return true when input valid student info", function () {
            const input = "宁润婷,113,汉,物网131,语文:80,数学:90,英语:85,计算机:90";

            const result = parser.isValidStudentInput(input);

            expect(result).toBe(true);
        });
        it("return false when input invalid student info", function () {
            const input = "宁润婷 111 han ddddd";

            const result = parser.isValidStudentInput(input);

            expect(result).toBe(false);
        });
        it("return false when input invalid student info", function () {
            const input = "宁润婷,111,汉,物网131,语文-80,数学-90,英语-85,计算机-90";

            const result = parser.isValidStudentInput(input);

            expect(result).toBe(false);
        });
        it("return false when input score is not number", function () {
            const input = "宁润婷,111,汉,物网131,语文:wqq,数学:sfd,英语:85,计算机:90"

            const result = parser.isValidStudentInput(input);

            expect(result).toBe(false);
        });
    });

    describe("suits for check the input student id list is valid", function () {
        it("return true when input is valid", function () {
            const input = "111,222,333";

            const result = parser.isValidStudentIdInput(input);

            expect(result).toBe(true);
        });
        it("return false when input is invalid", function () {
            const input = "1112321312 sdfsfs233";

            const result = parser.isValidStudentIdInput(input);

            expect(result).toBe(false);
        });
    });
});
