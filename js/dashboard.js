if (!isStudentLoggedIn()) {
    window.location.href = "index.html";
}
const student = getCurrentStudent();
document.getElementById("welcome-message").textContent =
    `Welcome, ${student.name}`;

document.getElementById("student-id").textContent = student.studentId;
document.getElementById("department").textContent = student.department;
document.getElementById("level").textContent = student.level;
document.getElementById("cgpa").textContent = student.cgpa;
document.getElementById("fees").textContent = student.fees;
document.getElementById("semester").textContent = student.semester;

document.getElementById("cgpa-card").textContent = student.cgpa;
document.getElementById("fees-card").textContent = student.fees;

document
    .getElementById("logout-btn")
    .addEventListener("click", logout);
    document
        .getElementById("logout-btn")
        .addEventListener("click", logout);