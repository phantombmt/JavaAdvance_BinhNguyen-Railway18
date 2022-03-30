function handleClickAccounts() {
    $(".row.row_content").load("accounts.html", function() {
        setupFilter();
        setupSearchEvent();
        buildAccountTable();
    });
}

function buildAccountTable() {
    $('#datatables_accounts tbody').empty();
    getListAccounts();
}

var accounts = [];

// paging
var currentPage = 1;
var size = 5;

// sorting
var sortField = "id";
var isAsc = false;

// get List
function getListAccounts() {
    var url = "http://localhost:8080/api/v1/accounts";

    // paging
    url += '?pageNumber=' + currentPage + '&size=' + size;

    // sorting
    url += "&sort=" + sortField + "," + (isAsc ? "asc" : "desc");

    // search
    var search = document.getElementById("search-account-input").value;
    if (search) {
        url += "&search=" + search;
    }

    // filter role
    var role = document.getElementById("filter-role-select").value;
    if (role) {
        url += "&role=" + role;
    }

    // filter department
    var departmentName = $("#filter-department-select option:selected").text();
    // console.log(departmentName)
    if (departmentName && departmentName != "All Departments") {
        url += "&departmentName=" + departmentName;
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
            accounts = data.content;
            // console.log(accounts)
            fillAccountToTable();
            fillAccountPaging(data.numberOfElements, data.totalPages);
            fillAccountSorting();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Only ADMIN and MANAGER have access to this file.");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        }
    });


}

function fillAccountToTable() {
    accounts.forEach(function(item, index) {
        $('#datatables_accounts tbody').append(
            '<tr>' +
            '<td> ' +
            '<span class="account-checkbox"> ' +
            '<input id="checkbox-' + index + '" type="checkbox" name="foo" onClick="onChangeCheckboxItem()"/>' +
            '<label></label>' +
            '</span>' +
            '</td>' +
            '<td>' + item.userName + '</td>' +
            '<td>' + item.fullName + '</td>' +
            '<td>' + item.role + '</td>' +
            '<td>' + item.departmentName + '</td>' +

            '<td class="td-actions"> ' +
            '<a class="edit-btn" data-toggle="modal" title="Edit" onclick="openUpdateAccountModal(' + item.id + ', \'' + item.userName + '\'' + ', \'' + item.fullName + '\'' + ', \'' + item.role + '\'' + ', \'' + item.departmentName + '\')"><i class="fa-solid fa-pencil"></i></a>' +
            '<a class="delete-btn" data-toggle="modal" title="Delete" onclick="openDeleteSingleAccountModal(' + item.id + ', \'' + item.fullName + '\')"><i class="fa-regular fa-trash-can"></i></a>' +
            '</td>' +
            '</tr>'
        );
    });
}

// paging
function fillAccountPaging(currentSize, totalPages) {
    // prev
    if (currentPage > 1) {
        document.getElementById("account-previousPage-btn").disabled = false;
    } else {
        document.getElementById("account-previousPage-btn").disabled = true;
    }

    // next
    if (currentPage < totalPages) {
        document.getElementById("account-nextPage-btn").disabled = false;
    } else {
        document.getElementById("account-nextPage-btn").disabled = true;
    }

    // text
    document.getElementById("account-page-info").innerHTML = currentSize + (currentSize > 1 ? " records " : " record ") + currentPage + " of " + totalPages;
}

function prevAccountPage() {
    changeAccountPage(currentPage - 1);
}

function nextAccountPage() {
    changeAccountPage(currentPage + 1);
}

function changeAccountPage(page) {
    currentPage = page;
    buildAccountTable();
}

// Sorting
function fillAccountSorting() {
    var sortTypeClazz = isAsc ? "fa-sort-up" : "fa-sort-down";
    var defaultSortType = "fa-sort";

    switch (sortField) {
        case 'userName':
            changeIconSort("userName-sort", sortTypeClazz);
            changeIconSort("fullName-sort", defaultSortType);
            changeIconSort("departmentName-sort", defaultSortType);
            break;
        case 'fullName':
            changeIconSort("userName-sort", defaultSortType);
            changeIconSort("fullName-sort", sortTypeClazz);
            changeIconSort("departmentName-sort", defaultSortType);
            break;
        case 'departmentName':
            changeIconSort("userName-sort", defaultSortType);
            changeIconSort("fullName-sort", defaultSortType);
            changeIconSort("departmentName-sort", sortTypeClazz);
            break;

            // sort by id
        default:
            changeIconSort("userName-sort", defaultSortType);
            changeIconSort("fullName-sort", defaultSortType);
            changeIconSort("departmentName-sort", defaultSortType);
            break;
    }
}


function changeIconSort(id, sortTypeClazz) {
    document.getElementById(id).classList.remove("fa-sort", "fa-sort-up", "fa-sort-down");
    document.getElementById(id).classList.add(sortTypeClazz);
}

function changeAccountSort(field) {
    if (field == sortField) {
        isAsc = !isAsc;
    } else {
        sortField = field;
        isAsc = true;
    }
    buildAccountTable();
}

// search
function setupSearchEvent() {
    //Enter button search
    $("#search-account-input").on("keyup", function(event) {
        // enter key code = 13
        if (event.keyCode === 13) {
            // refresh paging
            currentPage = 1;
            size = 5;
            buildAccountTable();
        }
    });

    $("#search-account-button").click(function() {
        // refresh paging
        currentPage = 1;
        size = 5;
        buildAccountTable();
    });
}

// filter
function filterAccount() {
    // refresh paging
    currentPage = 1;
    size = 5;
    buildAccountTable();
}

function setupFilter() {
    setupRole();
    setupDepartmentFilter();
}

function setupRole() {
    $("#filter-role-select").select2({});
}

function setupDepartmentFilter() {
    // change selectboxes to selectize mode to be searchable
    // setup call API
    $("#filter-department-select").select2({
        ajax: {
            url: "http://localhost:8080/api/v1/departments",
            dataType: 'json',
            type: "GET",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
            },
            data: function(params) {
                var query = {
                    // paging
                    page: 1,
                    size: 5,
                    // sorting
                    sort: "id,asc",
                    // search
                    search: params.term
                }

                // Query parameters will be ?page=1&size=5&sort=id,asc&search=[term]
                return query;
            },
            processResults: function(data) {
                var defaultValue = {
                    "id": 0,
                    "name": "All Departments"
                };

                var departments = data.content;
                departments.splice(0, 0, defaultValue);

                return {
                    results: $.map(departments, function(item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });
}

// Refresh Table
function refreshAccountTable() {
    // location.reload(true);
    // refresh paging
    currentPage = 1;
    size = 5;

    // refresh sorting
    sortField = "id";
    isAsc = false;

    // refresh search
    document.getElementById("search-account-input").value = "";

    // refresh filter
    $("#filter-department-select").val('').trigger('change');
    $('#filter-role-select').val('').trigger('change');

    // Get API
    buildAccountTable();
}

//Open Add modal
function openAccountModal() {
    $('#defaultModalPrimary').modal('show');
}

//Hide Add modal
function hideAccountModal() {
    $('#defaultModalPrimary').modal('hide');
}

var flagAddNewAccount = false

// Click add new account button
function openAddAccountModal() {
    flagAddNewAccount = true;
    openAccountModal();
    resetAddAccountForm();
}

//Reset Add new Account
function resetAddAccountForm() {
    // set title
    document.getElementById("title-form-account").innerHTML = "Create New Account";

    // Reset all input value
    document.getElementById("modal-username").value = "";
    document.getElementById("modal-first-name").value = "";
    document.getElementById("modal-last-name").value = "";

    // role
    setupRoleSelectionInForm();

    // department
    setupDepartmentSelectionInForm();

    // Reset all error message
    resetAccountModalErrMessage();
}

//Role Form Modal
function setupRoleSelectionInForm() {
    $("#modal-role-select").select2({
        placeholder: "Select a role"
    });
}

//Department Form Modal
function setupDepartmentSelectionInForm() {
    // change selectboxes to selectize mode to be searchable
    // setup call API
    $("#modal-department-select").select2({
        placeholder: "Select a department",
        ajax: {
            url: "http://localhost:8080/api/v1/departments",
            dataType: 'json',
            type: "GET",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
            },
            data: function(params) {
                var query = {
                    sort: "id,asc",
                    // search
                    search: params.term
                }

                // Query parameters will be ?page=1&size=5&sort=id,asc&search=[term]
                return query;
            },
            processResults: function(data) {
                var departments = data.content;
                return {
                    results: $.map(departments, function(item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });
}
//Define error message
var error_message_username = "Username must be from 6 to 50 characters!";
var error_message_username_exists = "Username already exists!";
var error_message_first_name = "Firstname must be from 6 to 50 characters!";
var error_message_last_name = "Lastname must be from 6 to 50 characters!";
var error_message_role = "You must choose role!";
var error_message_department = "You must choose department!";

//Reset Error message modal
function resetAccountModalErrMessage() {
    hideFieldErrorMessage("modal-input-errMess-username", "modal-username");
    hideFieldErrorMessage("modal-input-errMess-firstname", "modal-first-name");
    hideFieldErrorMessage("modal-input-errMess-lastname", "modal-last-name");
    hideFieldErrorMessage("modal-input-errMess-role", "modal-role-select");
    hideFieldErrorMessage("modal-input-errMess-department", "modal-department-select");
}

// Click save button
function saveAccount() {
    if (flagAddNewAccount) {
        addAccount();
    } else {
        updateAccount();
    }
}

// Function Add Account
function addAccount() {
    //Get value of id tag input username in modal
    var userName = document.getElementById("modal-username").value;

    //Get value of id tag input firstname in modal
    var firstName = document.getElementById("modal-first-name").value;

    //Get value of id tag input lastname in modal
    var lastName = document.getElementById("modal-last-name").value;

    //Get value of id tag input role in modal
    var role = document.getElementById("modal-role-select").value;

    //Get value of id tag input department in modal
    var departmentId = $('#modal-department-select option:selected').val();
    // console.log(departmentId)

    // validate
    var validUserName = isValidUserName(userName);
    var validFirstName = isValidFirstName(firstName);
    var validLastname = isValidLastname(lastName);
    var validRole = isValidRole(role);
    var validDepartment = isValidDepartment(departmentId);

    // format
    if (!validUserName || !validFirstName || !validLastname || !validRole || !validDepartment) {
        return;
    }

    // check username unique
    $.ajax({
        url: "http://localhost:8080/api/v1/accounts/username/" + userName + "/exists",
        type: 'GET',
        // contentType: "application/json",
        dataType: 'json', // body
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(data, textStatus, xhr) {
            if (data) {
                // show error message
                showFieldErrorMessage("modal-input-errMess-username", "modal-username", error_message_username_exists);
                return;
            } else {
                createAccountViaAPI(userName, firstName, lastName, role, departmentId);
                flagAddNewAccount = false;
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

function isValidUserName(username) {

    if (!username) {
        // show error message
        showFieldErrorMessage("modal-input-errMess-username", "modal-username", error_message_username);
        return false;
    }

    // validate format
    var regex = new RegExp('^(?=.*[a-z])[a-zA-Z0-9_.-]{6,50}$');
    if (!regex.test(username)) {
        showFieldErrorMessage("modal-input-errMess-username", "modal-username", error_message_username);
        return false;
    };

    hideFieldErrorMessage("modal-input-errMess-username", "modal-username");
    return true;
}

function isValidFirstName(name) {

    if (!name) {
        // show error message
        showFieldErrorMessage("modal-input-errMess-firstname", "modal-first-name", error_message_first_name);
        return false;
    }

    // validate format
    var regex = new RegExp('^[a-zA-Z\\s]+$');
    if (!regex.test(name)) {
        showFieldErrorMessage("modal-input-errMess-firstname", "modal-first-name", error_message_first_name);
        return false;
    };

    hideFieldErrorMessage("modal-input-errMess-firstname", "modal-first-name");
    return true;
}

function isValidLastname(name) {

    if (!name) {
        // show error message
        showFieldErrorMessage("modal-input-errMess-lastname", "modal-last-name", error_message_last_name);
        return false;
    }

    // validate format
    var regex = new RegExp('^[a-zA-Z\\s]+$');
    if (!regex.test(name)) {
        showFieldErrorMessage("modal-input-errMess-lastname", "modal-last-name", error_message_last_name);
        return false;
    };

    hideFieldErrorMessage("modal-input-errMess-lastname", "modal-last-name");
    return true;
}

function isValidRole(role) {
    if (!role) {
        // show error message
        showFieldErrorMessage("modal-input-errMess-role", "modal-role-select", error_message_role);
        return false;
    }

    hideFieldErrorMessage("modal-input-errMess-role", "modal-role-select");
    return true;
}

function isValidDepartment(department) {
    if (!department) {
        console.log("show message");
        // show error message
        showFieldErrorMessage("modal-input-errMess-department", "modal-department-select", error_message_department);
        return false;
    }

    hideFieldErrorMessage("modal-input-errMess-department", "modal-department-select");
    return true;
}

function createAccountViaAPI(userName, firstName, lastName, role, departmentId) {
    // call api create account
    var newAccount = {
        "userName": userName,
        "firstName": firstName,
        "lastName": lastName,
        "role": role,
        "departmentId": departmentId
    }

    console.log(newAccount);

    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts',
        type: 'POST',
        data: JSON.stringify(newAccount), // body
        contentType: "application/json", // type of body (json, xml, text)
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            hideAccountModal();
            // showSuccessSnackBar("Success! New account created!");
            buildAccountTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function showFieldErrorMessage(messageId, inputId, message) {
    document.getElementById(messageId).innerHTML = message;
    document.getElementById(messageId).style.display = "block";
    document.getElementById(messageId).style.color = "red";
}

function hideFieldErrorMessage(messageId, inputId) {
    document.getElementById(messageId).style.display = "none";
}

// Checkbox all
// function onChangeAccountCheckboxAll() {
//     $('#checkbox-all').click(function(event) {
//         if (this.checked) {
//             // Iterate each checkbox
//             $(':checkbox').each(function() {
//                 this.checked = true;
//             });
//         } else {
//             $(':checkbox').each(function() {
//                 this.checked = false;
//             });
//         }
//     });


// }


// Checkbox all
function toggle(source) {
    checkboxes = document.getElementsByName('foo');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}
// Checkbox item and check status of check box all
function onChangeCheckboxItem() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (!checkboxItem.checked) {
                document.getElementById("checkbox-all").checked = false;
                return;
            }
            i++;
        } else {
            break;
        }
    }
    document.getElementById("checkbox-all").checked = true;
}

// Click delete single account button
function openDeleteSingleAccountModal(accountId, fullName) {
    $('#defaultModalDanger').modal('show');
    // Show warning
    document.getElementById('delete-account-confirm-mess').innerHTML = 'This action can not be undone. Delete <span style="color:red;">' + fullName + '</span>?';

    //On click Delete button
    document.getElementById('delete-account-btn').onclick = function() { deleteSingleAccount(accountId) };

}

function deleteSingleAccount(accountId) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts/' + accountId,
        type: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(result) {
            // success

            $('#defaultModalDanger').modal('hide');
            buildAccountTable();

        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

        }
    });
}

// Click delete multiple account button
function openDeleteMultipleAccountsModal() {
    $('#defaultModalDanger').modal('show');

    // get checked
    var ids = [];
    var fullnames = [];
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (checkboxItem.checked) {
                ids.push(accounts[i].id);
                fullnames.push(accounts[i].fullName);
            }
            i++;
        } else {
            break;
        }
    }

    if (!ids || ids.length == 0) {
        document.getElementById('delete-account-confirm-mess').innerHTML = '<span style="color: red;">' + 'Choose at least one account to delete!' + '</span>';
        document.getElementById('delete-account-btn').style.display = 'none';
    } else {
        document.getElementById('delete-account-confirm-mess').innerHTML = 'This action can not be undone. Delete <span id="user-fullName-delete-message"></span>?';
        document.getElementById('user-fullName-delete-message').innerHTML += '<span style="color: red;">' + fullnames.join(", ") + '</span> (<span style="color: red;">' + fullnames.length + '</span> ' + (fullnames.length == 1 ? 'account' : 'accounts') + ')';
        document.getElementById('delete-account-btn').style.display = 'inline-block';
        document.getElementById('delete-account-btn').onclick = function() { deleteMultipleAccounts(ids) };
    }
}
// deleteMultipleAccounts function
function deleteMultipleAccounts(accountIds) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts?ids=' + accountIds.toString(),
        type: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function(result) {
            //Success
            $('#defaultModalDanger').modal('hide');
            buildAccountTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}

//Click edit account
var idAccountEdit = 0;

// Open update modal
function openUpdateAccountModal(accountId, accountUserName, accountFullname, accountRole, accountDepartmentName) {
    flagAddNewAccount = false;
    idAccountEdit = accountId
    $('#defaultModalPrimary').modal('show');
    setUpdateAccountForm(accountUserName, accountFullname, accountRole, accountDepartmentName);
}

// Set up form update
function setUpdateAccountForm(accountUserName, accountFullname, accountRole, accountDepartmentName) {
    // set title
    document.getElementById("title-form-account").innerHTML = "Edit Account";

    var FirstName = accountFullname.substr(0, accountFullname.indexOf(' ')).trim()
    var LastName = accountFullname.substr(accountFullname.indexOf(' ')).trim()
        // Reset all input value
    document.getElementById("modal-username").value = accountUserName;
    document.getElementById("modal-first-name").value = FirstName;
    document.getElementById("modal-last-name").value = LastName;
    document.getElementById("modal-role-select").value = "";
    document.getElementById("modal-department-select").value = "";


    // role
    setupRoleSelectionInForm();

    // department
    setupDepartmentSelectionInForm();

    // Reset all error message
    resetAccountModalErrMessage();
}

// Update function
function updateAccount() {
    //Get value of id tag input role in modal
    var role = document.getElementById("modal-role-select").value;

    //Get value of id tag input department in modal
    var departmentId = $('#modal-department-select option:selected').val();

    var validRole = isValidRole(role);
    var validDepartment = isValidDepartment(departmentId);

    // format
    if (!validRole || !validDepartment) {
        return;
    } else {
        // call api update account
        var latestAccount = {
            "role": role,
            "departmentId": departmentId
        }

        console.log(latestAccount);

        $.ajax({
            url: 'http://localhost:8080/api/v1/accounts/' + idAccountEdit,
            type: 'PUT',
            data: JSON.stringify(latestAccount), // body
            contentType: "application/json", // type of body (json, xml, text)
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
            },
            success: function(data, textStatus, xhr) {
                // success
                $('#defaultModalPrimary').modal('hide');
                // showSuccessSnackBar("Success! New account created!");
                idAccountEdit = 0;
                buildAccountTable();
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