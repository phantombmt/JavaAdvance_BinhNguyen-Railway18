function handleClickDepartments() {
    $(".row.row_content").load("departments.html", function() {
        setupFilter();
        setupSearchEvent();
        buildDepartmentTable();
    });
}

function buildDepartmentTable() {
    $('#datatables_departments tbody').empty();
    getListDepartments();
}

let departments = [];

// paging
var currentPage = 1;
var size = 5;

// sorting
var sortField = "id";
var isAsc = false;

function getListDepartments() {
    var url = "http://localhost:8080/api/v1/departments";

    // paging
    url += '?pageNumber=' + currentPage + '&size=' + size;

    // sorting
    url += "&sort=" + sortField + "," + (isAsc ? "asc" : "desc");

    // search
    var search = document.getElementById("search-department-input").value;
    if (search) {
        url += "&search=" + search;
    }

    // filter minDate

    var minDate = document.getElementById("minDate").value;
    if (minDate) {
        url += "&minCreatedDate=" + minDate;
    }

    // filter maxDate
    var maxDate = document.getElementById("maxDate").value;
    if (maxDate) {
        url += "&maxCreatedDate=" + maxDate;
    }

    // filter departmentType
    var departmentType = $("#filter-type-select option:selected").text();
    // console.log(departmentName)
    if (departmentType && departmentType != "All Types") {
        url += "&type=" + departmentType;
    }

    // call API from server
    $.ajax({
        url: url,
        type: 'GET',
        // contentType: "application/json",
        dataType: 'json', // body
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            departments = data.content;
            // console.log(departments)
            fillDepartmentToTable();
            fillDepartmentPaging(data.numberOfElements, data.totalPages);
            fillDepartmentSorting();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Only ADMIN and MANAGER have access to this file.");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        }
    });
}

function fillDepartmentToTable() {
    departments.forEach(function(item, index) {
        $('#datatables_departments tbody').append(
            '<tr>' +
            '<td> ' +
            '<span class="department-checkbox"> ' +
            '<input id="checkbox-' + index + '" type="checkbox" name="foo"/>' +
            '<label></label>' +
            '</span>' +
            '</td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.totalMember + '</td>' +
            '<td>' + item.type + '</td>' +
            '<td>' + item.createdDate + '</td>' +

            '<td class="td-actions"> ' +
            '<a class="edit-btn" data-toggle="modal" title="Edit" onclick="openUpdateDepartmentModal(' + item.id + ', \'' + item.name + '\'' + ', \'' + item.type + '\')"><i class="fa-solid fa-pencil"></i></a>' +
            '<a class="delete-btn" data-toggle="modal" title="Delete" onclick="openDeleteSingleDepartmentModal(' + item.id + ', \'' + item.name + '\')"><i class="fa-regular fa-trash-can"></i></a>' +
            '</td>' +
            '</tr>'
        );
    });
}

// paging
function fillDepartmentPaging(currentSize, totalPages) {
    // prev
    if (currentPage > 1) {
        document.getElementById("department-previousPage-btn").disabled = false;
    } else {
        document.getElementById("department-previousPage-btn").disabled = true;
    }

    // next
    if (currentPage < totalPages) {
        document.getElementById("department-nextPage-btn").disabled = false;
    } else {
        document.getElementById("department-nextPage-btn").disabled = true;
    }

    // text
    document.getElementById("department-page-info").innerHTML = currentSize + (currentSize > 1 ? " records " : " record ") + currentPage + " of " + totalPages;
}

function prevDepartmentPage() {
    changeDepartmentPage(currentPage - 1);
}

function nextDepartmentPage() {
    changeDepartmentPage(currentPage + 1);
}

function changeDepartmentPage(page) {
    currentPage = page;
    buildDepartmentTable();
}

// Sorting
function fillDepartmentSorting() {
    var sortTypeClazz = isAsc ? "fa-sort-up" : "fa-sort-down";
    var defaultSortType = "fa-sort";

    switch (sortField) {
        case 'name':
            changeIconSort("name-sort", sortTypeClazz);
            changeIconSort("totalMember-sort", defaultSortType);
            changeIconSort("createdDate-sort", defaultSortType);
            break;
        case 'totalMember':
            changeIconSort("totalMember-sort", sortTypeClazz);
            changeIconSort("name-sort", defaultSortType);
            changeIconSort("createdDate-sort", defaultSortType);
            break;
        case 'createdDate':
            changeIconSort("createdDate-sort", sortTypeClazz);
            changeIconSort("name-sort", defaultSortType);
            changeIconSort("totalMember-sort", defaultSortType);
            break;
            // sort by id
        default:
            changeIconSort("name-sort", defaultSortType);
            changeIconSort("totalMember-sort", defaultSortType);
            changeIconSort("createdDate-sort", defaultSortType);
            break;
    }
}

function changeIconSort(id, sortTypeClazz) {
    document.getElementById(id).classList.remove("fa-sort", "fa-sort-up", "fa-sort-down");
    document.getElementById(id).classList.add(sortTypeClazz);
}

function changeDepartmentSort(field) {
    if (field == sortField) {
        isAsc = !isAsc;
    } else {
        sortField = field;
        isAsc = true;
    }
    buildDepartmentTable();
}

// search
function setupSearchEvent() {
    //Enter button search
    $("#search-department-input").on("keyup", function(event) {
        console.log("sadsadsa");
        // enter key code = 13
        if (event.keyCode === 13) {
            // refresh paging
            currentPage = 1;
            size = 5;
            buildDepartmentTable();
        }
    });

    $("#search-department-button").click(function() {
        // refresh paging
        currentPage = 1;
        size = 5;
        buildDepartmentTable();
    });
}

// filter
function filterDepartment() {
    // refresh paging
    currentPage = 1;
    size = 5;
    buildDepartmentTable();
}

function setupFilter() {
    setupDepartmentTypeFilter();
}

function setupDepartmentTypeFilter() {
    $("#filter-type-select").select2({});
}

// Refresh Table
function refreshDepartmentTable() {
    // location.reload(true);
    // refresh paging
    currentPage = 1;
    size = 5;

    // refresh sorting
    sortField = "id";
    isAsc = false;

    // refresh search
    document.getElementById("search-department-input").value = "";

    // refresh filter
    $("#minDate").val('').trigger('change');
    $("#maxDate").val('').trigger('change');
    $('#filter-type-select').val('').trigger('change');

    // Get API
    buildDepartmentTable();
}

//Add New Department

var flagAddNewDepartment = false

// Click add new department button
function openAddDepartmentModal() {
    flagAddNewDepartment = true;
    idsAccountsToDepartment = [];
    $('#defaultModalPrimary').modal('show');
    resetAddDepartmentForm();
}

//Reset Add new Department
function resetAddDepartmentForm() {
    // set title
    document.getElementById("title-form-department").innerHTML = "Create New Department";

    // Reset all input value
    document.getElementById("modal-departmentName").value = "";
    // document.getElementById("modal-departmentType-select").value = "";

    // type
    setupDepartmentTypeSelectionInForm();

    // Reset all error message
    resetDepartmentModalErrMessage();
}

//departmentType Form Modal
function setupDepartmentTypeSelectionInForm() {
    // change selectboxes to selectize mode to be searchable
    // setup call API
    $("#modal-departmentType-select").select2({
        placeholder: "Select Type"
    });
}

//Define error message
var error_message_departmentName_exists = "Department name already exists!";
var error_message_departmentType = "You must choose departmentType!";
var error_message_departmentName = "Department name must be less than 50 characters and can not be null!";

//Reset Error message modal
function resetDepartmentModalErrMessage() {
    hideFieldErrorMessage("modal-input-errMess-departmentName", "modal-departmentName");
    hideFieldErrorMessage("modal-input-errMess-departmentType", "modal-departmentType-select");
}

// Click save button
function saveDepartment() {
    if (flagAddNewDepartment) {
        addDepartment();

    } else {
        updateDepartment();
    }
}


// Function add Department
function addDepartment() {
    //Get value of id tag input username in modal
    var departmentName = document.getElementById("modal-departmentName").value;

    //Get value of id tag input departmentType in modal
    var departmentType = $('#modal-departmentType-select option:selected').val();
    // console.log(departmentId)

    // validate
    var validDepartmentName = isValidDepartmentName(departmentName);
    var validDepartmentType = isValidDepartmentType(departmentType);

    // format
    if (!validDepartmentName || !validDepartmentType) {
        return;
    }
    // check DeparmentName unique
    $.ajax({
        url: "http://localhost:8080/api/v1/departments/departmentName/" + departmentName + "/exists",
        type: 'GET',
        // contentType: "application/json",
        dataType: 'json', // body
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            //If exists
            if (data) {
                // show error message
                showFieldErrorMessage("modal-input-errMess-departmentName", "modal-departmentName", error_message_departmentName_exists);
                return;
            } else {
                createDepartmentViaAPI(departmentName, departmentType);

                flagAddNewDepartment = false;
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });


}

function isValidDepartmentName(departmentName) {

    if (!departmentName) {
        // show error message
        showFieldErrorMessage("modal-input-errMess-departmentName", "modal-departmentName", error_message_departmentName);
        return false;
    }

    // validate format
    var regex = new RegExp('^(?=.*[a-z])[a-zA-Z0-9_.-]{6,50}$');
    if (!regex.test(departmentName)) {
        showFieldErrorMessage("modal-input-errMess-departmentName", "modal-departmentName", error_message_departmentName);
        return false;
    };

    hideFieldErrorMessage("modal-input-errMess-departmentName", "modal-departmentName");
    return true;
}

function isValidDepartmentType(departmentType) {
    if (!departmentType) {
        // console.log("show message");
        // show error message
        showFieldErrorMessage("modal-input-errMess-departmentType", "modal-departmentType-select", error_message_departmentType);
        return false;
    }

    hideFieldErrorMessage("modal-input-errMess-departmentType", "modal-departmentType-select");
    return true;
}

function showFieldErrorMessage(messageId, inputId, message) {
    document.getElementById(messageId).innerHTML = message;
    document.getElementById(messageId).style.display = "block";
    document.getElementById(messageId).style.color = "red";
}

function hideFieldErrorMessage(messageId, inputId) {
    document.getElementById(messageId).style.display = "none";
}

function createDepartmentViaAPI(departmentName, departmentType) {
    // call api create department
    var newDepartment = {
        "name": departmentName,
        "type": departmentType
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments',
        type: 'POST',
        data: JSON.stringify(newDepartment), // body
        contentType: "application/json", // type of body (json, xml, text)
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(data, textStatus, xhr) {

            // success
            $('#defaultModalPrimary').modal('hide');

            buildDepartmentTable();
            // Add Accounts to Department
            if (idsAccountsToDepartment != "") {
                addAccountViaAPI(departments[0].id + 1, idsAccountsToDepartment);
            }

        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}


function addAccountViaAPI(idDepartment, idsAccountsToDepartment) {

    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts/departmentId/' + idDepartment + '?ids=' + idsAccountsToDepartment,
        type: 'PUT',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(result) {
            // success
            $('#defaultModalPrimary').modal('hide');

        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// Click delete single department button
function openDeleteSingleDepartmentModal(departmentId, departmentName) {
    $('#defaultModalDanger').modal('show');
    // Show warning
    document.getElementById('delete-department-confirm-mess').innerHTML = 'This action can not be undone. Delete <span style="color:red;">' + departmentName + '</span>?';

    //On click Delete button
    document.getElementById('delete-department-btn').onclick = function() { deleteSingleDepartment(departmentId) };

}

function deleteSingleDepartment(departmentId) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/departments/' + departmentId,
        type: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(result) {
            // success

            $('#defaultModalDanger').modal('hide');
            buildDepartmentTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// Click delete multiple department button
function openDeleteMultipleDepartmentsModal() {
    $('#defaultModalDanger').modal('show');

    // get checked
    var ids = [];
    var departmentNames = [];
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (checkboxItem.checked) {
                ids.push(departments[i].id);
                departmentNames.push(departments[i].name);
            }
            i++;
        } else {
            break;
        }
    }

    if (!ids || ids.length == 0) {
        document.getElementById('delete-department-confirm-mess').innerHTML = '<span style="color: red;">' + 'Choose at least one department to delete!' + '</span>';
        document.getElementById('delete-department-btn').style.display = 'none';
    } else {
        document.getElementById('delete-department-confirm-mess').innerHTML = 'This action can not be undone. Delete <span id="departmentName-delete-message"></span>?';
        document.getElementById('departmentName-delete-message').innerHTML += '<span style="color: red;">' + departmentNames.join(", ") + '</span> (<span style="color: red;">' + departmentNames.length + '</span> ' + (departmentNames.length == 1 ? 'department' : 'departments') + ')';
        document.getElementById('delete-department-btn').style.display = 'inline-block';
        document.getElementById('delete-department-btn').onclick = function() { deleteMultipleDepartments(ids) };
    }
}

// deleteMultipleDepartments function
function deleteMultipleDepartments(departmentIds) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/departments?ids=' + departmentIds.toString(),
        type: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(result) {
            // success
            // showSuccessSnackBar("Success! Department deleted.");
            $('#defaultModalDanger').modal('hide');
            buildDepartmentTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}

//Click edit department
var idDepartmentEdit = 0;

// Open update modal
function openUpdateDepartmentModal(departmentId, departmentName, departmentType) {
    flagAddNewDepartment = false;
    idDepartmentEdit = departmentId
    $('#defaultModalPrimary').modal('show');
    setUpdateDepartmentForm(departmentName, departmentType);
}

// Set up form update
function setUpdateDepartmentForm(departmentName, departmentType) {
    // set title
    document.getElementById("title-form-department").innerHTML = "Edit Department";

    // Reset all input value
    document.getElementById("modal-departmentName").value = departmentName;
    document.getElementById("modal-departmentType-select").value = departmentType;

    // Department type
    setupDepartmentTypeSelectionInForm();
}

// Update function
function updateDepartment() {
    //Get value of id tag input departmentType in modal
    var departmentType = $('#modal-departmentType-select option:selected').val();

    var validDepartmentType = isValidDepartmentType(departmentType);

    // format
    if (!validDepartmentType) {
        return;
    } else {
        // call api update department
        var latestDepartment = {
            "type": departmentType
        }

        console.log(latestDepartment);

        $.ajax({
            url: 'http://localhost:8080/api/v1/departments/' + idDepartmentEdit,
            type: 'PUT',
            data: JSON.stringify(latestDepartment), // body
            contentType: "application/json", // type of body (json, xml, text)
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
            },
            success: function(data, textStatus, xhr) {
                // success
                $('#defaultModalPrimary').modal('hide');
                // showSuccessSnackBar("Success! New department created!");

                buildDepartmentTable();
                // Add accounts to department
                if (idsAccountsToDepartment != "") {
                    addAccountViaAPI(idDepartmentEdit, idsAccountsToDepartment);
                }
            },
            error(jqXHR, textStatus, errorThrown) {
                alert("Error when loading data");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

}

// Click add Account to department button
function addAccountToDepartment() {
    document.getElementById('addAccountsToDepartment-confirm-mess').innerHTML = '';
    $('#defaultModalPrimary1').modal('show');
}