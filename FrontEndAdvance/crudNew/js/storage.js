var storage = {
    saveRememberMe(isRememberMe) {
        localStorage.setItem("IS_REMEMBER_ME", isRememberMe);
    },
    getRememberMe() {
        var isRememberString = localStorage.getItem("IS_REMEMBER_ME");

        // Must convert to boolean because localStorage gets String by default
        var isRememberMe = JSON.parse(isRememberString.toLowerCase());

        if (isRememberMe == null) {
            // By the first time login default want to remember me checked
            return true;
        }
        return isRememberMe;
    },

    setItem(key, value) {
        if (this.getRememberMe()) {
            localStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, value);
        }
    },
    getItem(key) {
        if (this.getRememberMe()) {
            return localStorage.getItem(key);
        } else {
            return sessionStorage.getItem(key);
        }
    },
    removeItem(key) {
        if (this.getRememberMe()) {
            localStorage.removeItem(key);
        } else {
            sessionStorage.removeItem(key);
        }
    }
};