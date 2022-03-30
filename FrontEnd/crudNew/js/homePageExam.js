function handleClickHome() {
    $(".row.row_content").load("home-main.html", function() {
        document.getElementById("fullName-title-homepage1").innerHTML = storage.getItem("FULL_NAME")
        document.getElementById("fullName-title-homepage2").innerHTML = storage.getItem("FULL_NAME")
        document.getElementById("role-title").innerHTML = storage.getItem("ROLE")
    });
}