const dll = require('../app/dllModule');
let allStudentInfo = {};
describe("A suit for getStudentInfo function", function () {
    beforeAll(function () {
        allStudentInfo = {
            '111': {
                name: 'aaa',
                id: '111',
                nation: 'han',
                class: '131',
                score: [{'语文': 90}],
                average: 90,
                sumScore: 90
            },
            '123': {
                name: 'aaa',
                id: '123',
                nation: 'han',
                class: '131',
                score: [{'语文': 90}],
                average: 90,
                sumScore: 90
            },
            '135': {name: 'aaa', id: '135', nation: 'han', class: '131', score: [{'语文': 90}], average: 90, sumScore: 90}
        }
    });
    afterAll(function () {
        allStudentInfo = {};
    });
    it("return student info list when input student id list", function () {
        const input = ['111', '123', '135'];
        const output = {exist:[{
            name: 'aaa',
            id: '111',
            nation: 'han',
            class: '131',
            score: [{'语文': 90}],
            average: 90,
            sumScore: 90
        },
            {name: 'aaa', id: '123', nation: 'han', class: '131', score: [{'语文': 90}], average: 90, sumScore: 90},
            {name: 'aaa', id: '135', nation: 'han', class: '131', score: [{'语文': 90}], average: 90, sumScore: 90}],
            notExist:[]};

        const result = dll.getStudentInfo(input, allStudentInfo);

        expect(result).toEqual(output);
    });
    it("return exist student info when input student id list contain not exist student id", function () {
        const input = ['111', '123', '333'];
        const output = {exist:[{
            name: 'aaa',
            id: '111',
            nation: 'han',
            class: '131',
            score: [{'语文': 90}],
            average: 90,
            sumScore: 90
        },
            {name: 'aaa', id: '123', nation: 'han', class: '131', score: [{'语文': 90}], average: 90, sumScore: 90}],
            notExist:['333']};

        const result = dll.getStudentInfo(input, allStudentInfo);

        expect(result).toEqual(output);
    });
});

describe("A suit for calculateClassScore function", function () {
    beforeAll(function () {
        allStudentInfo = {
            '111': {
                name: 'aaa',
                id: '111',
                nation: 'han',
                class: '131',
                score: [{'语文': 90}, {'数学': 90.5}],
                average: 90.25,
                sumScore: 180.5
            },
            '123': {
                name: 'bbb',
                id: '123',
                nation: 'han',
                class: '131',
                score: [{'语文': 70}, {'数学': 60}],
                average: 65,
                sumScore: 130
            },
            '135': {
                name: 'ccc',
                id: '135',
                nation: 'han',
                class: '131',
                score: [{'语文': 80}, {'数学': 100}],
                average: 90,
                sumScore: 180
            }
        }
    });
    afterAll(function () {
        allStudentInfo = {};
    });
    it("return score list when input student id list is whole class", function () {
        const output = {average: 163.50, middleScore: 180};

        const result = dll.calculateClassScore(allStudentInfo);

        expect(result).toEqual(output);
    });
});

describe("A suit for isStudentExist function", function () {
    beforeAll(function () {
        allStudentInfo = {'123': {name: 'aa', id: '123'}};
    });
    afterAll(function () {
        allStudentInfo = {};
    });
    it("shoud return true when input student is exist", function () {
        const input = "123";
        const result = dll.isStudentExist(input, allStudentInfo);
        expect(result).toBe(true);
    });
    it("shoud return false when input student is not exist", function () {
        const input = "111";
        const result = dll.isStudentExist(input, allStudentInfo);
        expect(result).toBe(false);
    });
});

describe("A suit for calculateStudentScore function", function () {
    it("calculate average and sum score when input a student obj", function () {
        const input = {
            name: '宁润婷', id: '111', nation: '汉', class: '物网131',
            score: [{'语文': 80}, {'数学': 90}, {'英语': 85}, {'计算机': 90}]
        };
        const output = {
            name: '宁润婷', id: '111', nation: '汉', class: '物网131',
            score: [{'语文': 80}, {'数学': 90}, {'英语': 85}, {'计算机': 90}],
            average: 86.25, sumScore: 345
        };

        const result = dll.calculateStudentScore(input);

        expect(result).toEqual(output);
    });
});

