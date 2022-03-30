$(document).ready(function() {

    // $(".table-title").load("table-title.html");
    // $(".table-content").load("table-content.html");
    // $(".footer").load("footer.html");
    $("#addEmployeeModal").load("add-modal.html");
    $("#editEmployeeModal").load("edit-modal.html");
    $("#deleteEmployeeModal").load("delete-modal.html");
    buildTable();


    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function() {
        if (this.checked) {
            checkbox.each(function() {
                this.checked = true;
            });
        } else {
            checkbox.each(function() {
                this.checked = false;
            });
        }
    });
    checkbox.click(function() {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });


    function buildTable() {

        $('tbody').empty();

        // Call Api from server
        $.get("https://6211ad1f01ccdac07428406f.mockapi.io/api/v1/employees2", function(data, status) {
            //error
            if (status == "error") {
                alert("Error when loading data");
                return;
            }

            //Assign list employees
            employees = data;

            employees.forEach(function(item) {
                $('tbody').append(
                    '<tr>' +
                    '<td>' +
                    '<span class="custom-checkbox">' +
                    '<input type="checkbox" id="checkbox" name="option[]" value="1">' +
                    '<label for="checkbox"></label>' +
                    '</span>' +
                    '</td>' +

                    '<td>' + item.name + '</td>' +
                    '<td>' + item.email + '</td>' +
                    '<td>' + item.address + '</td>' +
                    '<td>' + item.phone + '</td>' +
                    '<td>' +
                    '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>' +
                    '<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>' +
                    '</td>' +
                    '</tr>')
            });

        });
    }



});