$(function() {
    document.getElementById('id01').style.display = 'block';
})

let users = [];

function User(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
}

function getUserList() {
    $.get("https://61f9d3ca31f9c2001759658e.mockapi.io/users", function(data, status) {
        if (status == "error") {
            alert("Error when loading data");
            return;
        }
        users = [];
        parseData(data);
        let password = document.getElementById('password').value;
        let username = document.getElementById('username').value;
        let loggedIn = false;
        users.forEach(element => {
            if (username == element.username && password == element.password) {
                window.location.href = "http://127.0.0.1:5500/html/program.html";
                loggedIn = true;
            }
        });
        if (loggedIn == false) {
            $('#incorrect-mess').css('display', 'block');
        }
    });
}

function parseData(data) {
    data.forEach(element => {
        users.push(new User(element.id, element.username, element.password));
    });
}

function login() {
    getUserList();
}