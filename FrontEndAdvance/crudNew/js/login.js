function Login() {
    // Get username password
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;

    // Validate and call API
    isValid(userName, password);

}

var error_message = "The username or password that you've entered is incorrect."

function isValid(userName, password) {
    if (!userName || !password) {
        hideFieldErrorMessage("errMess", error_message);

        return false;
    } else if (userName && password) {
        // Call API

        callLoginAPI(userName, password);
        return true;
    }
}

function callLoginAPI(userName, password) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/auth/login',
        type: 'GET',
        // contentType: "application/json",
        dataType: 'json', // body
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(userName + ":" + password));
        },
        success: function(data, textStatus, xhr) {
            console.log(data);
            hideFieldErrorMessage("errMess", error_message);

            // Save data to Storage
            // Check rememberMe checkbox true or false
            var isRememberMe = document.getElementById("rememberMe").checked;
            // Save to storage : local or session
            storage.saveRememberMe(isRememberMe);

            storage.setItem("ID", data.id);
            storage.setItem("USER_NAME", userName);
            storage.setItem("PASS_WORD", password);
            storage.setItem("FULL_NAME", data.fullName);
            storage.setItem("FIRST_NAME", data.firstName);
            storage.setItem("LAST_NAME", data.lastName);
            storage.setItem("ROLE", data.role);

            window.location.replace("http://127.0.0.1:5501/html/index.html?#");
        },
        error(jqXHR, textStatus, errorThrown) {

            if (jqXHR.status == 401) {
                showFieldErrorMessage("errMess", error_message);
            } else {

                alert("Error when loading data");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
}

function showFieldErrorMessage(messageId, message) {
    document.getElementById(messageId).innerHTML = message;
    document.getElementById(messageId).style.display = "block";
    document.getElementById(messageId).style.color = "red";
}

function hideFieldErrorMessage(messageId) {
    document.getElementById(messageId).style.display = "none";
}