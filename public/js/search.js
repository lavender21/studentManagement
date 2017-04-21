$('#search').click(function () {
    let url = "/search/" + $('#idList').val();
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

function parseToHtml(data) {
    let htmlStr = `<h4>成绩单</h4>
<table>
    <tr>
        <td>姓名</td>
        <td>数学</td>
        <td>英语</td>
        <td>计算机</td>
        <td>平均分</td>
        <td>总分</td>
    </tr>`;
    data.studentList.forEach(item => {
        htmlStr +=`<tr><td>${item.name}</td>`;
        item.score.forEach(val => {
            let score = val[Object.keys(val)];
           htmlStr += `<td>${score}</td>`;
        });
        htmlStr +=`<td>${item.average}</td><td>${item.sumScore}</td>`;
    });
    htmlStr += `<tr>
        <td colspan="6">全班总分平均分：${data.average}</td>
    </tr>
    <tr>
        <td colspan="6">全班总分中位数: ${data.middleScore}</td>
    </tr>
</table>`;
    $('#scoreList').html(htmlStr);
}
