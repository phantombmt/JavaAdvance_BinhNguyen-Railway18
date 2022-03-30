$(document).ready(function() {
    if (!isLogIn()) {
        // Redirect to login page
        window.location.replace("http://127.0.0.1:5501/html/loginFinalExam.html?#");
        return
    }

    $(".sidebar").load("side-bar.html", function() {
        document.getElementById("fullName-title").innerHTML = storage.getItem("FULL_NAME")
        document.getElementById("role-sidebar").innerHTML += storage.getItem("ROLE")


    })

    $(".row.row_content").load("home-main.html", function() {
        document.getElementById("fullName-title-homepage1").innerHTML = "Hello " + storage.getItem("FULL_NAME")
        document.getElementById("fullName-title-homepage2").innerHTML = storage.getItem("FULL_NAME")
        document.getElementById("role-title").innerHTML = storage.getItem("ROLE")
    })
});

function isLogIn() {
    if (storage.getItem("ID")) {
        return true;
    }
    return false;
}

function logOut() {
    storage.removeItem("ID")
    storage.removeItem("LAST_NAME")
    storage.removeItem("USER_NAME")
    storage.removeItem("FULL_NAME")
    storage.removeItem("ROLE")
    storage.removeItem("FIRST_NAME")
    storage.removeItem("PASS_WORD")
        // Redirect to login page
    window.location.replace("http://127.0.0.1:5501/html/loginFinalExam.html?#");
}