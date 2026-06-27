// ===============================
// INITIALIZE DASHBOARD
// ===============================

document.addEventListener("DOMContentLoaded", initializeDashboard);


// ===============================
// MAIN INITIALIZER
// ===============================

function initializeDashboard() {

    const student = getCurrentStudent();

    // Authentication Guard
    if (!student) {
        window.location.href = LOGIN_PAGE;
        return;
    }

    renderDashboard(student);
    renderProfile(student);
    renderAttendance(student);
    renderCourses(student);
    renderResults(student);
    renderFees(student);
    renderTimetable(student);
    renderAnnouncements(student);
    renderAcademicSummary(student);

    setupNavigation();
    setupLogout();
    displayCurrentDate();

}


// ===============================
// RENDER DASHBOARD
// ===============================

function renderDashboard(student) {

    // Top Bar
    const welcomeMessage = document.getElementById("welcome-message");

    // Sidebar
    const studentName = document.getElementById("student-name");
    const studentDepartment = document.getElementById("student-department");
    const studentLevel = document.getElementById("student-level");

    // Student Information
    const matricNoDisplay = document.getElementById("matricNo-display");
    const departmentDisplay = document.getElementById("department-display");
    const levelDisplay = document.getElementById("level-display");
    const semesterDisplay = document.getElementById("semester-display");

    // Academic Information
    const cgpaDisplay = document.getElementById("cgpa-display");
    const feesDisplay = document.getElementById("fees-display");

    // Dashboard Cards
    const cgpaCard = document.getElementById("cgpa-card");
    const feesCard = document.getElementById("fees-card");
    const attendanceCard =  document.getElementById("attendance-card");
    const resultsCard = document.getElementById("results-card");
    const coursesCard = document.getElementById("courses-card");
    const announcementsCard = document.getElementById("announcements-card");



    // Top Bar
   const fullName = `${student.firstName} ${student.lastName}`;

   welcomeMessage.textContent = `Welcome, ${fullName}`;



    // Sidebar
    studentName.textContent = fullName;
    studentDepartment.textContent = student.department;
    studentLevel.textContent = student.level;



    // Student Information
    matricNoDisplay.textContent = student.matricNo;
    departmentDisplay.textContent = student.department;
    levelDisplay.textContent = student.level;
    semesterDisplay.textContent = student.semester;



    // Academic Information
    cgpaDisplay.textContent = student.cgpa;
    feesDisplay.textContent = student.fees.status;



    // Dashboard Cards
    cgpaCard.textContent = student.cgpa;
    feesCard.textContent = student.fees.status;
    coursesCard.textContent = student.courses.length;
    announcementsCard.textContent = student.announcements.length;

    const attendancePercentage =
        (
            student.attendance.attended /
            student.attendance.totalClasses
        ) * 100;
        attendanceCard.textContent = `${attendancePercentage.toFixed(0)}%`;
        const passedCourses =
            student.results.filter(
                result => result.score >= 40
            ).length;
            resultsCard.textContent = `${passedCourses} Passed`;


}
function renderAcademicSummary(student) {
const passedCourses = document.getElementById("dashboard-passed-courses");
const failedCourses = document.getElementById("dashboard-failed-courses");
const averageScore = document.getElementById("dashboard-average-score");
const attendanceRate = document.getElementById("dashboard-attendance-rate");

   const passed =
    student.results.filter(
        result => result.score >= 40
    ).length;
    const failed =
    student.results.filter(
            result => result.score < 40
        ).length;
    const totalScore =
    student.results.reduce(
    (sum, result) => sum + result.score,
                0
            );
    const average =
    totalScore / student.results.length;
     const attendancePercentage =
                    (
      student.attendance.attended /
      student.attendance.totalClasses
       ) * 100;

      passedCourses.textContent = passed;

      failedCourses.textContent = failed;

      averageScore.textContent =
          average.toFixed(1);

      attendanceRate.textContent =
          `${attendancePercentage.toFixed(0)}%`;

}
function renderProfile(student) {

    const fullName =
        `${student.firstName} ${student.lastName}`;

    document.getElementById("profile-name").textContent =
        fullName;

    document.getElementById("profile-matric").textContent =
        student.matricNo;

    document.getElementById("profile-email").textContent =
        student.email;

    document.getElementById("profile-phone").textContent =
        student.phone;

    document.getElementById("profile-faculty").textContent =
        student.faculty;

    document.getElementById("profile-department").textContent =
        student.department;

    document.getElementById("profile-level").textContent =
        student.level;

    document.getElementById("profile-semester").textContent =
        student.semester;
}
function renderAttendance(student) {

    const attendance = student.attendance;

    document.getElementById("attendance-total")
        .textContent = attendance.totalClasses;

    document.getElementById("attendance-attended")
        .textContent = attendance.attended;

    document.getElementById("attendance-missed")
        .textContent = attendance.missed;

    const percentage =
        (attendance.attended / attendance.totalClasses) * 100;

    document.getElementById("attendance-rate")
        .textContent = `${percentage.toFixed(1)}%`;

    const tableBody =
        document.getElementById("attendance-table-body");

    tableBody.innerHTML = "";

    attendance.records.forEach(record => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.course}</td>
            <td>
                <span class="status-${record.status.toLowerCase()}">
                    ${record.status}
                </span>
            </td>
        `;

        tableBody.appendChild(row);

    });

}
function renderCourses(student) {

    const tableBody =
        document.getElementById("courses-table-body");

    tableBody.innerHTML = "";

    student.courses.forEach(course => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.unit}</td>
            <td>${course.lecturer}</td>
        `;

        tableBody.appendChild(row);

    });
}
function renderResults(student) {

    const tableBody =
        document.getElementById("results-table-body");

    tableBody.innerHTML = "";

    let totalScore = 0;
    let passedCourses = 0;
    let failedCourses = 0;

    student.results.forEach(result => {

        totalScore += result.score;
          if (result.grade === "F") {
                failedCourses++;
             } else {
                passedCourses++;
             }
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${result.course}</td>
            <td>${result.score}</td>
            <td>
            <span class ="grade-${result.grade.toLowerCase()}">
            ${result.grade}
            </span>
            </td>
        `;

        tableBody.appendChild(row);

    });
     document.getElementById("result-total-courses")
            .textContent = student.results.length;

        const average =
            totalScore / student.results.length;

        document.getElementById("result-average-score")
            .textContent = average.toFixed(2);
         document.getElementById("result-passed-courses")
             .textContent = passedCourses;

         document.getElementById("result-failed-courses")
             .textContent = failedCourses;
    }

    function renderFees(student) {

        const fees = student.fees;

        document.getElementById("fees-total")
            .textContent = `${fees.totalAmount.toLocaleString()}`

        document.getElementById("fees-paid")
            .textContent = `${fees.totalAmount.toLocaleString()}`

        document.getElementById("fees-outstanding")
            .textContent =`${fees.totalAmount.toLocaleString()}`

       document.getElementById("fees-status").innerHTML = `
           <span class="status-${fees.status
               .toLowerCase()
               .replace(/\s+/g, "-")}">
               ${fees.status}
           </span>
       `;
    }
    function renderTimetable(student) {

        const timetableBody =
            document.getElementById("timetable-body");

        timetableBody.innerHTML = "";

        student.timetable.forEach(entry => {

            timetableBody.innerHTML += `
                <tr>
                    <td>${entry.day}</td>
                    <td>${entry.course}</td>
                    <td>${entry.time}</td>
                    <td>${entry.venue}</td>
                </tr>
            `;

        });

    }
    function renderAnnouncements(student) {

        const container = document.getElementById("announcements-container");

        container.innerHTML = "";

        student.announcements.forEach(announcement => {
     const formattedDate =
                            new Date(announcement.date)
                                .toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    }
                                );
            container.innerHTML += `
                <div class="announcement-card">

                    <div class="announcement-header">

                        <h3>${announcement.title}</h3>

      <span class="announcement-date">
          ${formattedDate}
      </span>


                    </div>

                    <p class="announcement-message">
                        ${announcement.message}
                    </p>

                </div>
            `;

        });

    }




// ===============================
// NAVIGATION
// ===============================


function showPage(pageName, pages) {
    pages.forEach(page => page.hidden = true);
    const page = document.getElementById(`${pageName}-page`);
    if (page) {
        page.hidden = false;
    }
}
function setupNavigation() {

    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            this.classList.add("active");

            const pageName = this.dataset.page;

            showPage(pageName, pages);

        });

    });

} // <-- MISSING



// ===============================
// LOGOUT
// ===============================


function setupLogout() {

    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", logout);

}


// ===============================
// CURRENT DATE
// ===============================

function displayCurrentDate() {

    const currentDate = document.getElementById("current-date");

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    currentDate.textContent =
        today.toLocaleDateString("en-US", options);
}