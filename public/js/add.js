function isEmpty() {
    if ($('#studentname').val() === '') {
        $('#nameError').show(300);
        return false;
    }else{
        $('#nameError').hide();
    }
    if ($('#studentid').val() === '') {
        $('#idError').show(300);
        return false;
    }
    $('#idError').hide();
    return true;
}

function isNumber() {
    if (isNaN($('#math').val()) || isNaN($('#english').val()) || isNaN($('#computer').val())){
        $('#isNaNError').show(300);
        return false;
    }
    $('#isNaNError').hide();
    return true;
}

$('#submit').click(function () {
    let student = {};
    if (!isEmpty()){
        return false;
    }
    if (!isNumber()){
        return false;
    }
    student.name = $('#studentname').val();
    student.id = $('#studentid').val();
    student.nation = $('#nation').val();
    student.klass = $('#klass').val();
    student.score = {
        math: Number($('#math').val()),
        english: Number($('#english').val()),
        computer: Number($('#computer').val())
    };
    let data = JSON.stringify(student);
    $.ajax({
        type: 'POST',
        url: '/add',
        data: data,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            alert(data);
            $('input').val('');
        },
        error: function (err) {
            alert(err.responseText);
            location.reload();
        }
    });
    return false;
});
