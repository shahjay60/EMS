$(document).ready(function () {

    $("#btnSave").click(function () {
        if (validation() == true) {
            $.ajax({
                url: '/Department/Save',
                type: "POST",
                contentType: "application/json; charset=utf-8",

                data: "{'deptName': '" + $("#txtDeptName").val() + "','deptId': '" + $("#hdnId").val() + "'}",
                success: function (result) {
                    if (result == "Ok") {
                        window.location.href = "@Url.Action("Index", "Department")"
                    }
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });


        }
        else {
            alert("Please enter data..!!");
        }

    });

});

function validation() {

    var isValid = true;

    if ($("#txtDeptName").val().length == 0) {
        $("#txtDeptName").css('border-color', 'red');
        isValid = false;
    }
    return isValid;

}

function fnGetDataById(id) {
    $.ajax({
        url: '/Department/GetDataById',
        type: "POST",
        data: '{deptId:"' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response, function (index, element) {
                $("#txtDeptName").val(response.Name);
                $("#hdnId").val(response.Id);

            });

        },
        error: function (err) {
            alert(err.statusText);
        }
    });

}
function fnDeleteById(id) {

    if (confirm("Do you want to delete this record?")) {
        $.ajax({
            url: '/Department/Delete',
            type: "POST",
            contentType: "application/json; charset=utf-8",

            data: "{'deptId': '" + id + "'}",
            success: function (result) {
                if (result == "Ok") {
                    window.location.href = "@Url.Action("Index", "Department")"
                }
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }

}