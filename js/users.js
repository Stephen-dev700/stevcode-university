

function saveStudent(user) {
    localStorage.setItem(
        "loggedInStudent",
        JSON.stringify(user)
    );
}

function getLoggedInStudent() {
    return JSON.parse(
        localStorage.getItem("loggedInStudent")
    );
}

function logout() {
    localStorage.removeItem("loggedInStudent");
}