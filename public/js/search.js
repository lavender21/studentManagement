$('#search').click(function () {
    let data = $('#idList').val();
    if (!isValidStudentIdInput(data)){
        alert('输入格式错误');
        return;
    }
    let url = "/search/" + data;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (data) {
            parseToHtml(data);
        },
        error: function (err) {
            console.log(err);
        }
    });
});

function isValidStudentIdInput(studentIdStr) {
    let reg = /^(\d+[,])*(\d+)$/;
    return reg.test(studentIdStr);
}

function parseToHtml(data) {
    let htmlStr = `<h4 class="text-center text-info">成绩单</h4>
<table class="table table-responsive table-hover table-bordered">
    <tr>
        <th>姓名</th>
        <th>数学</th>
        <th>英语</th>
        <th>计算机</th>
        <th>平均分</th>
        <th>总分</th>
    </tr>`;
    if (data.studentList.length > 0){
        data.studentList.forEach(item => {
            htmlStr +=`<tr><td>${item.name}</td>`;
            item.score.forEach(val => {
                let score = val[Object.keys(val)];
                htmlStr += `<td>${score}</td>`;
            });
            htmlStr +=`<td>${item.average}</td><td>${item.sumScore}</td>`;
        });
    }
    htmlStr += `<tr>
        <td colspan="6">全班总分平均分：${data.average}</td>
    </tr>
    <tr>
        <td colspan="6">全班总分中位数: ${data.middleScore}</td>
    </tr>
</table>`;
    if (data.notExistStudent.length > 0){
        htmlStr += `<div class="text-danger">学生${data.notExistStudent}不存在</div>`;
    }
    $('#scoreList').html(htmlStr);
}
