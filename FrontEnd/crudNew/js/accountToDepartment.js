setupFilterAccountInModal();
setupSearchEventAccountInModal();
buildAccountTableInModal();

function buildAccountTableInModal() {
    $('#datatables_accounts tbody').empty();
    getListAccountsInModal();
}

var accountsToDepartment = [];

// paging
var currentPage = 1;
var size = 5;

// sorting
var sortField = "id";
var isAsc = false;

// get List
function getListAccountsInModal() {
    var url = "http://localhost:8080/api/v1/accounts";

    // paging
    url += '?pageNumber=' + currentPage + '&size=' + size;

    // sorting
    url += "&sort=" + sortField + "," + (isAsc ? "asc" : "desc");

    // search
    var search = document.getElementById("search-accountInModal-input").value;
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
            accountsToDepartment = data.content;
            // console.log(accounts)
            fillAccountToTable();
            fillAccountPaging(data.numberOfElements, data.totalPages);
            fillAccountSorting();
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}

function fillAccountToTable() {
    accountsToDepartment.forEach(function(item, index) {
        $('#datatables_accounts tbody').append(
            '<tr>' +
            '<td> ' +
            '<span class="account-checkbox"> ' +
            '<input id="checkbox1-' + index + '" type="checkbox" name="foo"/>' +
            '<label></label>' +
            '</span>' +
            '</td>' +
            '<td>' + item.userName + '</td>' +
            '<td>' + item.fullName + '</td>' +
            '<td>' + item.role + '</td>' +
            '<td>' + item.departmentName + '</td>' +
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
    buildAccountTableInModal();
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
    buildAccountTableInModal();
}

// search
function setupSearchEventAccountInModal() {
    // Enter button search
    $("#search-account-input").on("keyup", function(event) {
        // enter key code = 13
        if (event.keyCode === 13) {
            // refresh paging
            currentPage = 1;
            size = 5;
            buildAccountTableInModal();
        }
    });

    $("#search-account-button").click(function() {
        // refresh paging
        currentPage = 1;
        size = 5;
        buildAccountTableInModal();
    });
}

// filter
function filterAccount() {
    // refresh paging
    currentPage = 1;
    size = 5;
    buildAccountTableInModal();
}

function setupFilterAccountInModal() {
    setupRole();
}

function setupRole() {
    $("#filter-role-select").select2({});
}

// Refresh Table
function refreshAccountsInModalTable() {

    // refresh paging
    currentPage = 1;
    size = 5;

    // refresh sorting
    sortField = "id";
    isAsc = false;

    // refresh search
    document.getElementById("search-accountInModal-input").value = "";

    // refresh filter
    $("#filter-department-select").val('').trigger('change');
    $('#filter-role-select').val('').trigger('change');

    // Get API
    buildAccountTableInModal();
}

var idsAccountsToDepartment = []

// Click save button
function saveAccountsToDepartment() {

    var ids = [];
    var fullnames = [];
    var i = 0;

    // var checkboxes = []; 
    while (true) {
        var checkboxItem = document.getElementById("checkbox1-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (checkboxItem.checked) {
                ids.push(accountsToDepartment[i].id);
                fullnames.push(accountsToDepartment[i].fullName);
            }
            i++;
        } else {
            break;
        }
    }
    if (!ids || ids.length == 0) {
        document.getElementById('addAccountsToDepartment-confirm-mess').innerHTML = '<span style="color: red;">' + 'Select at least one account!' + '</span>';

    } else {

        document.getElementById('addAccountsToDepartment-confirm-mess').innerHTML = '';
        idsAccountsToDepartment = ids;
        console.log(idsAccountsToDepartment);
        $('#defaultModalPrimary1').modal('hide');
    }

}