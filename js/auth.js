

const AUTH_KEY = "loggedInStudent";
const LOGIN_PAGE = "index.html";
const DASHBOARD_PAGE = "dashboard.html";

function authenticate(studentId, password) {
    return students.find(student =>
        student.matricNo === studentId &&
        student.password === password
    ) || null;
}

function saveStudent(student) {
    localStorage.setItem(
        AUTH_KEY,
        JSON.stringify(student)
    );
    console.log("Student saved:", student);
}

function getCurrentStudent() {
    const data = localStorage.getItem(AUTH_KEY);

    if (!data || data === "undefined") return null;

    try {
        return JSON.parse(data);
    } catch (e) {
        localStorage.removeItem(AUTH_KEY);
        return null;
    }
}

function isLoggedIn() {
    return getCurrentStudent() !== null;
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "index.html";
}
