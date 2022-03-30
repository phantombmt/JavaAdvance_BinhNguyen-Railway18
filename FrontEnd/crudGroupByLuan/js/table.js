function sort_number() {
    var table = $('#mytable');
    var tbody = $('#table-body');

    var sort_order = $('#number_order').val();
    if (sort_order == "asc") {
        document.getElementById("number_order").value = "desc";
        $('#th-number .fa-arrow-up-short-wide').css('display', 'none');
        $('#th-number .fa-arrow-down-short-wide').css('display', 'inline');
        $(
            '#th-name .fa-arrow-up-short-wide, #th-name .fa-arrow-down-short-wide, ' +
            '#th-member .fa-arrow-up-short-wide, #th-member .fa-arrow-down-short-wide, ' +
            '#th-creator .fa-arrow-up-short-wide, #th-creator .fa-arrow-down-short-wide, ' +
            '#th-createDate .fa-arrow-up-short-wide, #th-createDate .fa-arrow-down-short-wide'
        ).css('display', 'none');
    }
    if (sort_order == "desc") {
        document.getElementById("number_order").value = "asc";
        $('#th-number .fa-arrow-up-short-wide').css('display', 'inline');
        $('#th-number .fa-arrow-down-short-wide').css('display', 'none');
        $(
            '#th-name .fa-arrow-up-short-wide, #th-name .fa-arrow-down-short-wide, ' +
            '#th-member .fa-arrow-up-short-wide, #th-member .fa-arrow-down-short-wide, ' +
            '#th-creator .fa-arrow-up-short-wide, #th-creator .fa-arrow-down-short-wide, ' +
            '#th-createDate .fa-arrow-up-short-wide, #th-createDate .fa-arrow-down-short-wide'
        ).css('display', 'none');
    }
    $('#th-number a, #th-number i').css('color', '#fe6100');
    $('#th-name a, #th-name i').css('color', '#000');
    $('#th-member a, #th-member i').css('color', '#000');
    $('#th-creator a, #th-creator i').css('color', '#000');
    $('#th-createDate a, #th-createDate i').css('color', '#000');

    tbody.find('tr').sort(function(a, b) {
        if ($('#number_order').val() == 'asc') {
            return parseInt($('td:nth-child(2)', a).text()) - parseInt(($('td:nth-child(2)', b).text()));
        } else {
            return parseInt($('td:nth-child(2)', b).text()) - parseInt(($('td:nth-child(2)', a).text()));
        }

    }).appendTo(tbody);
}

function sort_name() {
    var table = $('#mytable');
    var tbody = $('#table-body');

    var sort_order = $('#name_order').val();
    if (sort_order == "asc") {
        document.getElementById("name_order").value = "desc";
        $('#th-name .fa-arrow-up-short-wide').css('display', 'none');
        $('#th-name .fa-arrow-down-short-wide').css('display', 'inline');
        $(
            '#th-number .fa-arrow-up-short-wide, #th-number .fa-arrow-down-short-wide, ' +
            '#th-member .fa-arrow-up-short-wide, #th-member .fa-arrow-down-short-wide, ' +
            '#th-creator .fa-arrow-up-short-wide, #th-creator .fa-arrow-down-short-wide, ' +
            '#th-createDate .fa-arrow-up-short-wide, #th-createDate .fa-arrow-down-short-wide'
        ).css('display', 'none');
    }
    if (sort_order == "desc") {
        document.getElementById("name_order").value = "asc";
        $('#th-name .fa-arrow-up-short-wide').css('display', 'inline');
        $('#th-name .fa-arrow-down-short-wide').css('display', 'none');
        $(
            '#th-number .fa-arrow-up-short-wide, #th-number .fa-arrow-down-short-wide, ' +
            '#th-member .fa-arrow-up-short-wide, #th-member .fa-arrow-down-short-wide, ' +
            '#th-creator .fa-arrow-up-short-wide, #th-creator .fa-arrow-down-short-wide, ' +
            '#th-createDate .fa-arrow-up-short-wide, #th-createDate .fa-arrow-down-short-wide'
        ).css('display', 'none');
    }
    $('#th-number a, #th-number i').css('color', '#000');
    $('#th-name a, #th-name i').css('color', '#fe6100');
    $('#th-member a, #th-member i').css('color', '#000');
    $('#th-creator a, #th-creator i').css('color', '#000');
    $('#th-createDate a, #th-createDate i').css('color', '#000');

    tbody.find('tr').sort(function(a, b) {
        if ($('#name_order').val() == 'asc') {
            return $('td:nth-child(3)', a).text().localeCompare($('td:nth-child(3)', b).text());
        } else {
            return $('td:nth-child(3)', b).text().localeCompare($('td:nth-child(3)', a).text());
        }

    }).appendTo(tbody);
}

function sort_member() {
    var table = $('#mytable');
    var tbody = $('#table-body');

    var sort_order = $('#member_order').val();
    if (sort_order == "asc") {
        document.getElementById("member_order").value = "desc";
        $('#th-member .fa-arrow-up-short-wide').css('display', 'none');
        $('#th-member .fa-arrow-down-short-wide').css('display', 'inline');
        $(
            '#th-number .fa-arrow-up-short-wide, #th-number .fa-arrow-down-short-wide, ' +
            '#th-name .fa-arrow-up-short-wide, #th-name .fa-arrow-down-short-wide, ' +
            '#th-creator .fa-arrow-up-short-wide, #th-creator .fa-arrow-down-short-wide, ' +
            '#th-createDate .fa-arrow-up-short-wide, #th-createDate .fa-arrow-down-short-wide'
        ).css('display', 'none');

    }
    if (sort_order == "desc") {
        document.getElementById("member_order").value = "asc";
        $('#th-member .fa-arrow-up-short-wide').css('display', 'inline');
        $('#th-member .fa-arrow-down-short-wide').css('display', 'none');
        $(
            '#th-number .fa-arrow-up-short-wide, #th-number .fa-arrow-down-short-wide, ' +
            '#th-name .fa-arrow-up-short-wide, #th-name .fa-arrow-down-short-wide, ' +
            '#th-creator .fa-arrow-up-short-wide, #th-creator .fa-arrow-down-short-wide, ' +
            '#th-createDate .fa-arrow-up-short-wide, #th-createDate .fa-arrow-down-short-wide'
        ).css('display', 'none');
    }
    $('#th-number a, #th-number i').css('color', '#000');
    $('#th-name a, #th-name i').css('color', '#000');
    $('#th-member a, #th-member i').css('color', '#fe6100');
    $('#th-creator a, #th-creator i').css('color', '#000');
    $('#th-createDate a, #th-createDate i').css('color', '#000');

    tbody.find('tr').sort(function(a, b) {
        if ($('#member_order').val() == 'asc') {
            return parseInt($('td:nth-child(4)', a).text()) - parseInt(($('td:nth-child(4)', b).text()));
        } else {
            return parseInt($('td:nth-child(4)', b).text()) - parseInt(($('td:nth-child(4)', a).text()));
        }

    }).appendTo(tbody);
}

function sort_creator() {
    var table = $('#mytable');
    var tbody = $('#table-body');

    var sort_order = $('#creator_order').val();
    if (sort_order == "asc") {
        document.getElementById("creator_order").value = "desc";
        $('#th-creator .fa-arrow-up-short-wide').css('display', 'none');
        $('#th-creator .fa-arrow-down-short-wide').css('display', 'inline');
        $(
            '#th-number .fa-arrow-up-short-wide, #th-number .fa-arrow-down-short-wide, ' +
            '#th-name .fa-arrow-up-short-wide, #th-name .fa-arrow-down-short-wide, ' +
            '#th-member .fa-arrow-up-short-wide, #th-member .fa-arrow-down-short-wide, ' +
            '#th-createDate .fa-arrow-up-short-wide, #th-createDate .fa-arrow-down-short-wide'
        ).css('display', 'none');
    }
    if (sort_order == "desc") {
        document.getElementById("creator_order").value = "asc";
        $('#th-creator .fa-arrow-up-short-wide').css('display', 'inline');
        $('#th-creator .fa-arrow-down-short-wide').css('display', 'none');
        $(
            '#th-number .fa-arrow-up-short-wide, #th-number .fa-arrow-down-short-wide, ' +
            '#th-name .fa-arrow-up-short-wide, #th-name .fa-arrow-down-short-wide, ' +
            '#th-member .fa-arrow-up-short-wide, #th-member .fa-arrow-down-short-wide, ' +
            '#th-createDate .fa-arrow-up-short-wide, #th-createDate .fa-arrow-down-short-wide'
        ).css('display', 'none');
    }
    $('#th-number a, #th-number i').css('color', '#000');
    $('#th-name a, #th-name i').css('color', '#000');
    $('#th-member a, #th-member i').css('color', '#000');
    $('#th-creator a, #th-creator i').css('color', '#fe6100');
    $('#th-createDate a, #th-createDate i').css('color', '#000');

    tbody.find('tr').sort(function(a, b) {
        if ($('#creator_order').val() == 'asc') {
            return $('td:nth-child(5)', a).text().localeCompare($('td:nth-child(5)', b).text());
        } else {
            return $('td:nth-child(5)', b).text().localeCompare($('td:nth-child(5)', a).text());
        }

    }).appendTo(tbody);
}

function sort_createDate() {
    var table = $('#mytable');
    var tbody = $('#table-body');

    var sort_order = $('#createDate_order').val();
    if (sort_order == "asc") {
        document.getElementById("createDate_order").value = "desc";
        $('#th-createDate .fa-arrow-up-short-wide').css('display', 'none');
        $('#th-createDate .fa-arrow-down-short-wide').css('display', 'inline');
        $(
            '#th-number .fa-arrow-up-short-wide, #th-number .fa-arrow-down-short-wide, ' +
            '#th-name .fa-arrow-up-short-wide, #th-name .fa-arrow-down-short-wide, ' +
            '#th-member .fa-arrow-up-short-wide, #th-member .fa-arrow-down-short-wide, ' +
            '#th-creator .fa-arrow-up-short-wide, #th-creator .fa-arrow-down-short-wide'
        ).css('display', 'none');
    }
    if (sort_order == "desc") {
        document.getElementById("createDate_order").value = "asc";
        $('#th-createDate .fa-arrow-up-short-wide').css('display', 'inline');
        $('#th-createDate .fa-arrow-down-short-wide').css('display', 'none');
        $(
            '#th-number .fa-arrow-up-short-wide, #th-number .fa-arrow-down-short-wide, ' +
            '#th-name .fa-arrow-up-short-wide, #th-name .fa-arrow-down-short-wide, ' +
            '#th-member .fa-arrow-up-short-wide, #th-member .fa-arrow-down-short-wide, ' +
            '#th-creator .fa-arrow-up-short-wide, #th-creator .fa-arrow-down-short-wide'
        ).css('display', 'none');
    }
    $('#th-number a, #th-number i').css('color', '#000');
    $('#th-name a, #th-name i').css('color', '#000');
    $('#th-member a, #th-member i').css('color', '#000');
    $('#th-creator a, #th-creator i').css('color', '#000');
    $('#th-createDate a, #th-createDate i').css('color', '#fe6100');

    tbody.find('tr').sort(function(a, b) {
        if ($('#createDate_order').val() == 'asc') {
            return $('td:last', a).text().localeCompare($('td:last', b).text());
        } else {
            return $('td:last', b).text().localeCompare($('td:last', a).text());
        }

    }).appendTo(tbody);
}