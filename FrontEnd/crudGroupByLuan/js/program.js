$(function() {
    $(".header").load("header.html");
    $(".sidebar").load("sidebar.html");
    $(".main").load("home.html");
    $(".footer").load("footer.html");
    $(".toast").toast("hide");
});

function viewHomepage() {
    $(".main").load("home.html");
}

function viewGroupList() {
    $(".main").load("groupListView.html", function() {
        // Set up search Group
        $("#searchInput").on("keyup", function() {
            let value = $(this).val().toLowerCase();
            $("#table-body tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            })
        });
        // Activate tooltip
        $('[data-toggle="tooltip"]').tooltip();
    });
    buildTable();
}

function refreshGroupList() {
    buildTable();
    $(
        '#th-number .fa-arrow-down-short-wide, ' +
        '#th-name .fa-arrow-up-short-wide, #th-name .fa-arrow-down-short-wide, ' +
        '#th-member .fa-arrow-up-short-wide, #th-member .fa-arrow-down-short-wide, ' +
        '#th-creator .fa-arrow-up-short-wide, #th-creator .fa-arrow-down-short-wide, ' +
        '#th-createDate .fa-arrow-up-short-wide, #th-createDate .fa-arrow-down-short-wide'
    ).css('display', 'none');

    $('#th-number .fa-arrow-up-short-wide').css('display', 'inline');

    $(
        '#number_order, #name_order, #member_order, #creator_order, #createDate_order'
    ).attr('value', 'asc');

    $('#th-number a').css('color', '#fe6100');
    $('#th-name a, #th-name i').css('color', '#000');
    $('#th-member a, #th-member i').css('color', '#000');
    $('#th-creator a, #th-creator i').css('color', '#000');
    $('#th-createDate a, #th-createDate i').css('color', '#000');
}

let groups = [];

function Group(id, name, member, creator, createDate) {
    this.id = id;
    this.name = name;
    this.member = member;
    this.creator = creator;
    this.createDate = createDate;

}

function getGroupList() {
    $.get("https://61f9d3ca31f9c2001759658e.mockapi.io/groups", function(data, status) {
        if (status == "error") {
            alert("Error when loading data");
            return;
        }
        groups = [];
        parseData(data);
        fillGroupToTable();
    });
}

function parseData(data) {
    data.forEach(element => {
        groups.push(new Group(element.id, element.name, element.member, element.creator, element.createDate));
    });
}

function fillGroupToTable() {
    let count = 0;
    groups.forEach(function(item) {
        count++;
        item.no = count;
        $('tbody').append(
            '<tr data-toggle="tooltip" title="Double click to edit" ondblclick="showDetailModal(' + item.id + ')"><td><span class="custom-checkbox"><input type="checkbox" id="checkbox' + item.no + '" name="options[]" value="' + item.no + '"><label for="checkbox' + item.no +
            '"></label></span></td><td>' + item.no +
            '</td><td>' + item.name +
            '</td><td>' + item.member +
            '</td><td>' + item.creator +
            '</td><td>' + item.createDate +
            '</td></tr>'
        )
    });

    // Select/Deselect checkboxes
    let checkbox = $('table tbody input[type="checkbox"]');
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

    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
}

function buildTable() {
    $('tbody').empty();
    getGroupList();
}


function showAddAndUpdateModal() {
    $('#addAndUpdateModal').modal('show');
}

function hideAddAndUpdateModal() {
    $('#addAndUpdateModal').modal('hide');
}

function showAddGroupModal() {
    disableSaveBtn();
    resetForm();
    showAddAndUpdateModal();
    document.getElementById("id").value = "";
    document.getElementById("addAndUpdate-modal-title").innerHTML = "Create Group <i class='fas fa-users'></i>";
}

function addGroup() {
    let name = document.getElementById("name").value;
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();

    let now = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;

    $.post("https://61f9d3ca31f9c2001759658e.mockapi.io/groups", {
        name: name,
        member: 0,
        creator: "NAT",
        createDate: now
    }, function(data, status) {
        if (status == "error") {
            alert("Error when loading data");
            return;
        }
        hideAddAndUpdateModal();
        showSnackBar("Success! New group created.");
        refreshGroupList();
    });
}

function checkNameExist() {
    let name = document.getElementById("name").value;
    let errMess = document.getElementById("errMess");
    let saveBtn = document.getElementById("save-btn");
    if (isEmptyInput(name)) {
        errMess.style.display = "none";
        saveBtn.disabled = true;
    } else {
        if (isGroupNameExist(name)) {
            errMess.innerHTML = "Group name exists!";
            errMess.style.display = "block";
            saveBtn.disabled = true;
        } else {
            errMess.style.display = "none";
            saveBtn.disabled = false;
        }
    }
}

function isGroupNameExist(name) {
    for (let i = 0; i < groups.length; i++) {
        const element = groups[i];
        if (name == element.name) {
            return true;
        }
    }
    return false;
}

function isEmptyInput(input) {
    if (input == "") {
        return true;
    }
    return false;
}


function disableSaveBtn() {
    let saveBtn = document.getElementById("save-btn");
    saveBtn.disabled = true;
}

function resetForm() {
    let errMess = document.getElementById("errMess");
    errMess.style.display = "none";
    document.getElementById("name").value = "";
}

function showDeleteModal() {
    let checkedBoxs = $(".custom-checkbox input:checked");
    // console.log(typeof(checkedBoxs));
    // console.log(checkedBoxs);

    let groupNos = [];
    checkedBoxs.each(function() {
        let checkboxValue = $(this).val();
        groupNos.push(checkboxValue);
    });
    if (groupNos.length == 0) {
        $('#mustCheckToDeleteModal').modal('show');
    } else {
        $('#deleteModal').modal('show');
    }

}

function hideDeleteModal() {
    $('#deleteModal').modal('hide');
}

function getCheckedGroup() {
    let checkedBoxs = $(".custom-checkbox input:checked");
    // console.log(typeof(checkedBoxs));
    // console.log(checkedBoxs);

    let groupNos = [];
    checkedBoxs.each(function() {
        let checkboxValue = $(this).val();
        groupNos.push(checkboxValue);
    });
    deleteGroup(groupNos);
}

function deleteGroup(groupNos) {
    let groupIds = [];

    groupNos.forEach(groupNo => {
        groups.forEach(element => {
            if (element.no == groupNo) {
                groupIds.push(element.id);
            }
        });
    });


    deleteGroupAjax(0, groupIds);

}

function deleteGroupAjax(index, groupIds) {
    $.ajax({
        url: 'https://61f9d3ca31f9c2001759658e.mockapi.io/groups/' + groupIds[index],
        type: 'DELETE',
        success: function(result) {
            if (result == undefined || result == null) {
                alert("Error when loading data");
                return;
            } else {
                if (index < groupIds.length - 1) {
                    deleteGroupAjax(index + 1, groupIds);
                } else {
                    hideDeleteModal();
                    showSnackBar("Success! Group has been deleted.");
                    refreshGroupList();
                }
            }
        }
    });
}

function showDetailModal(id) {
    $('#detailModal').modal('show');
    let group;
    groups.forEach(element => {
        if (element.id == id) {
            group = element;
        }
    });
    document.getElementById("detail-name").innerHTML = group.name + '<a href="#" onclick="showUpdateModal(' + group.id + ')"><i class="fa-solid fa-pencil"></i></a>';
    document.getElementById("detail-creator").innerHTML = "Creator: " + group.creator;
    document.getElementById("detail-createDate").innerHTML = "Create Date: " + group.createDate;
    document.getElementById("detail-member").innerHTML = "Member: " + group.member;
}

function showUpdateModal(id) {
    $('#detailModal').modal('hide');
    showAddAndUpdateModal();
    document.getElementById("id").value = id;
    let name;
    groups.forEach(element => {
        if (element.id == id) {
            name = element.name;
        }
    });
    document.getElementById("name").value = name;
    document.getElementById("addAndUpdate-modal-title").innerHTML = "Edit Group name <i class='fas fa-users'></i>";
    disableSaveBtn();
}

function updateGroup() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    $.ajax({
        url: 'https://61f9d3ca31f9c2001759658e.mockapi.io/groups/' + id,
        type: 'PUT',
        data: {
            name: name
        },
        success: function(result) {
            if (result == undefined || result == null) {
                alert("Error when loading data");
                return;
            }
            showSnackBar("Success! Group name has been updated.");
            hideAddAndUpdateModal();
            refreshGroupList();
        }
    });
}

function save() {
    let id = document.getElementById("id").value;
    if (id == null || id == "") {
        addGroup();
    } else {
        updateGroup();
    }
}

function showSnackBar(message) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    $('#snackbar').html(message);

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}