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
    getGreeting();
    renderProfile(student);
    renderAttendance(student);
    renderCourses(student);
    renderResults(student);
    renderFees(student);
    renderPaymentHistory(student)
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


  document.getElementById("student-avatar").src =
  student.profileImage;

 const greeting = getGreeting();
  const welcomeMessage = document.getElementById("welcome-message");
      const fullName = `${student.firstName} ${student.lastName}`;
     welcomeMessage.textContent = `${greeting}, ${student.firstName}!`;


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
}
function getGreeting() {

    const hour = new Date().getHours();

    if (hour < 12) {
        return "☀️ Good Morning";
    }

    if (hour < 18) {
        return "🌤️ Good Afternoon";
    }

    return "🌙 Good Evening";
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
    if(student.attendance.records.length === 0){

        showEmptyState(
            tbody,
            "📅 No attendance records found.",
            3
        );

        return;

    }
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
    if(student.courses.length === 0){

        showEmptyState(
            tbody,
            "📚 No registered courses yet.",
            4
        );

        return;

    }

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
    if(student.results.length === 0){

        showEmptyState(
            tbody,
            "🎓 No results available.",
            3
        );

        return;

    }
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
        const percentage = (fees.paidAmount / fees.totalAmount) * 100;

        document.getElementById("fees-total")
            .textContent = `${fees.totalAmount.toLocaleString()}`

        document.getElementById("fees-paid")
            .textContent = `${fees.paidAmount.toLocaleString()}`

        document.getElementById("fees-outstanding")
            .textContent =`${fees.outstandingAmount.toLocaleString()}`

       document.getElementById("fees-status").innerHTML = `
           <span class="status-${fees.status}
               .toLowerCase()
               .replace(/\s+/g, "-")">
               ${fees.status}
           </span>
       `;
       document.getElementById("progress-bar").style.width =
       `${percentage}%`;

       document.getElementById("progress-text").textContent =
       `${Math.round(percentage)}% Paid`;
    }
    function renderPaymentHistory(student){

        const tbody = document.getElementById("payment-history");

        tbody.innerHTML = "";

        student.fees.history.forEach(payment => {

            const formattedDate =
                new Date(payment.date).toLocaleDateString(
                    "en-GB",
                    {
                        day:"numeric",
                        month:"short",
                        year:"numeric"
                    }
                );
               const shortReference =
               `REF-${payment.reference.slice(-4)}`;
            tbody.innerHTML += `

                <tr>

                    <td>${formattedDate}</td>

                    <td>₦${payment.amount.toLocaleString()}</td>

                    <td>${payment.method}</td>

                   <td>${shortReference}</td>

                </tr>

            `;

        });

    }
    function renderTimetable(student) {

        const timetableBody =
            document.getElementById("timetable-body");

        timetableBody.innerHTML = "";
         if(student.timetable.length === 0){

             showEmptyState(
                 tbody,
                 "🗓️ No timetable available.",
                 4
             );

             return;

         }
        student.timetable.forEach(entry => {

            timetableBody.innerHTML += `
                <tr>
                    <td>${entry.day}</td>
                   <td>
                       <span class="course-code">
                           ${entry.course}
                       </span>
                   </td>
                   <td>
                   <span class="time-badge">

                   ${entry.time}

                   </span>

                   </td>
                   <td>
                   <span class="venue-badge">

                   ${entry.venue}

                   </span>

                   </td>
                </tr>
            `;

        });

    }
    function renderAnnouncements(student) {

        const container = document.getElementById("announcements-container");

        container.innerHTML = "";
        if(student.announcements.length === 0){

            showEmptyState(
                container,
                "Check back later for school announcements."
            );

            return;

        }
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
const logoutButton = document.querySelector(".logout");
const logoutModal = document.getElementById("logout-modal");
const cancelLogout =document.getElementById("cancel-logout");
const confirmLogout = document.getElementById("confirm-logout");

logoutButton.addEventListener("click", () => {

    logoutModal.classList.add("show");

});
cancelLogout.addEventListener("click", () => {

    logoutModal.classList.remove("show");

});
confirmLogout.addEventListener("click", () => {

    localStorage.removeItem("loggedInStudent");

    window.location.href = "index.html";

});
logoutModal.addEventListener("click", (event) => {

    if (event.target === logoutModal) {

        logoutModal.classList.remove("show");

    }

});


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
function showEmptyState(container, message, colspan = null) {

    if (colspan) {

        container.innerHTML = `
            <tr>
                <td colspan="${colspan}" class="empty-state">
                    ${message}
                </td>
            </tr>
        `;

    } else {

        container.innerHTML = `
            <div class="empty-card">

                <div class="empty-icon">📭</div>

                <h3>Nothing Here Yet</h3>

                <p>${message}</p>

            </div>
        `;

    }

}