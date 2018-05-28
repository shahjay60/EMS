$(document).ready(function () {

    fnGetAllDepartment();

    $("#btnSave").click(function () {
        debugger;
        if (validation() == true) {
            var mEmployee = {};
            mEmployee.Id = $("#hdnId").val();
            mEmployee.Name = $("#txtFirstName").val();
            mEmployee.LastName = $("#txtLastName").val();
            mEmployee.DeptId = $("#drpDeptName").val();
            mEmployee.Address = $("#txtAddress").val();


            $.ajax({
                url: '/Employee/Save',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(mEmployee),
                dataType: "json",

                success: function (result) {
                    if (result == "Ok") {
                        window.location.href = "@Url.Action("Index", "Employee")"
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

    if ($("#txtFirstName").val().length == 0) {
        $("#txtFirstName").css('border-color', 'red');
        isValid = false;
    }
    if ($("#txtLastName").val().length == 0) {
        $("#txtLastName").css('border-color', 'red');
        isValid = false;
    }

    if ($("#txtAddress").val().length == 0) {
        $("#txtAddress").css('border-color', 'red');
        isValid = false;
    }

    if ($("#drpDeptName").val() == 0) {
        $("#drpDeptName").css('border-color', 'red');
        isValid = false;
    }
    return isValid;

}

function fnGetDataById(id) {
    $.ajax({
        url: '/Employee/GetDataById',
        type: "POST",
        data: '{empId:"' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response, function (index, element) {
                $("#txtFirstName").val(response.Name);
                $("#txtLastName").val(response.LastName);
                $("#drpDeptName").val(response.DeptId);
                $("#txtAddress").val(response.Address);
                $("#hdnId").val(response.Id);

            });

        },
        error: function (err) {
            alert(err.statusText);
        }
    });

}

function fnGetAllDepartment() {
    $.ajax({
        url: '/Employee/GetAllDepartment',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $('#drpDeptName').empty().append('<option selected="selected" value="0">Select Department</option>');
            $.each(response, function (key, value) {
                $("#drpDeptName").append($("<option></option>").val(value.Id).html(value.Name));
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
            url: '/Employee/Delete',
            type: "POST",
            contentType: "application/json; charset=utf-8",

            data: "{'empId': '" + id + "'}",
            success: function (result) {
                if (result == "Ok") {
                    window.location.href = "@Url.Action("Index", "Employee")"
                }
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }

}