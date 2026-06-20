

function authenticate(studentId, password) {
    return students.find(student =>
        student.studentId === studentId &&
        student.password === password
    ) || null;
}

function getCurrentStudent() {
    return JSON.parse(localStorage.getItem("loggedInStudent"));
}

function isStudentLoggedIn() {
    const student = getCurrentStudent();

    if (!student) {
        return false;
    }

    const validStudent = authenticate(
        student.studentId,
        student.password
    );

    if (!validStudent) {
        logout();
        return false;
    }

    return true;
}

function logout() {
    localStorage.removeItem("loggedInStudent");
    window.location.href = "index.html";
}