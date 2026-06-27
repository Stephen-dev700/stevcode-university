// Protect the page
protectPage();

// Get the logged-in student
const student = getCurrentUser();

// Display summary
document.getElementById("totalClasses").textContent =
    student.attendance.totalClasses;

document.getElementById("attendedClasses").textContent =
    student.attendance.attended;

document.getElementById("missedClasses").textContent =
    student.attendance.missed;

// Calculate percentage
const percentage =
    (
        student.attendance.attended /
        student.attendance.totalClasses
    ) * 100;

document.getElementById("attendancePercentage").textContent =
    percentage.toFixed(1) + "%";

// Populate attendance table
const table = document.getElementById("attendanceTable");

student.attendance.records.forEach(record => {

    table.innerHTML += `
        <tr>
            <td>${record.date}</td>
            <td>${record.course}</td>
            <td>${record.status}</td>
        </tr>
    `;

});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    logout();
});