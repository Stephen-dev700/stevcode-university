// ===============================
// INITIALIZE DASHBOARD
// ===============================

document.addEventListener("DOMContentLoaded", initializeDashboard);
let currentResults = [];
let currentCourses = [];
const pageAnimations = {
    dashboard: false,
    fees: false,
    attendance: false,
    results: false,
    courses: false
};
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
    renderAcademicSummary(student);
    setupNavigation(student);
    setupResultsControls();
    setupCourseSearch();
    setupTheme();
    renderPaymentHistory(student)



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
   animateCounter(
       document.getElementById("cgpa-card"),
       Number(student.cgpa),
       "decimal"
   );
    const feesCard = document.getElementById("fees-card");

    animateCounter(
        document.getElementById("courses-card"),
        student.courses.length
    );
    animateCounter(
        document.getElementById("announcements-card"),
        student.announcements.length
    );


 document.getElementById("student-avatar").src =
 student.profileImage || "assets/default-avatar.png";

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



    // Dashboard fees
    feesCard.textContent = student.fees.status;
}
function animateCounter(element, endValue, type = "number") {

    if (endValue <= 0) {

        switch (type) {

            case "currency":
                element.textContent = "₦0";
                break;

            case "decimal":
                element.textContent = "0.00";
                break;

            default:
                element.textContent = "0";

        }

        return;

    }

    let currentValue = 0;

    const increment = endValue / 50;

    const counter = setInterval(() => {

        currentValue += increment;

        if (currentValue >= endValue) {

            currentValue = endValue;

        }

        switch (type) {

            case "currency":

                element.textContent =
                    `₦${Math.floor(currentValue).toLocaleString()}`;

                break;

            case "decimal":

                element.textContent =
                    currentValue.toFixed(2);

                break;

            default:

                element.textContent =
                    Math.floor(currentValue);

        }

        if (currentValue >= endValue) {

            clearInterval(counter);

        }

    }, 20);

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
    const totalClasses = attendance.totalClasses;
    const attended = attendance.attended;
    const missed = totalClasses - attended;
    const attendanceRate = (attended / totalClasses) * 100;
    const attendancePercentage =
                        (
          student.attendance.attended /
          student.attendance.totalClasses
           ) * 100;
   animateCounter(
       document.getElementById("attendance-total-classes"),
       totalClasses
   );

   animateCounter(
       document.getElementById("attendance-attended"),
       attended
   );

   animateCounter(
       document.getElementById("attendance-missed"),
       missed
   );

   animateCounter(
       document.getElementById("attendance-rate"),
       attendanceRate,
       0
   );

  const attendanceProgressBar = document.getElementById("attendance-progress-bar");
  attendanceProgressBar.style.width = `${attendancePercentage}%`;


   if (attendancePercentage >= 80) {

      attendanceProgressBar.style.background = "#22c55e"; // Green

   } else if (attendancePercentage >= 50) {

      attendanceProgressBar.style.background = "#f59e0b"; // Orange

   } else {

     attendanceProgressBar.style.background = "#ef4444"; // Red

   }
   document.getElementById("attendance-progress-text")
       .textContent =
   `${attendance.attended} of ${attendance.totalClasses} Classes Attended (${attendancePercentage.toFixed(1)}%)`;

    const tableBody =
        document.getElementById("attendance-table-body");

    tableBody.innerHTML = "";
    if(student.attendance.records.length === 0){

        showEmptyState(
            tableBody,
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
function displayCourses(courses) {

    const tableBody = document.getElementById("courses-table-body");

    tableBody.innerHTML = "";

    if (courses.length === 0) {

        showEmptyState(
            tableBody,
            "📚 No courses available.",
            4
        );

        return;

    }

    courses.forEach(course => {

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
function renderCourses(student) {

    currentCourses = [...student.courses];

    displayCourses(currentCourses);

    animateCounter(

        document.getElementById("course-total-courses"),

        currentCourses.length

    );

    const totalUnits = currentCourses.reduce(

        (sum, course) => sum + course.unit,

        0

    );

    animateCounter(

        document.getElementById("course-total-units"),

        totalUnits

    );

    const lecturers = new Set(

        currentCourses.map(course => course.lecturer)

    );

    animateCounter(

        document.getElementById("course-total-lecturers"),

        lecturers.size

    );

}
function setupCourseSearch(){

    const searchInput =
        document.getElementById("courses-search");

    searchInput.addEventListener("input", () => {

        const searchText =
            searchInput.value.toLowerCase();

        const filteredCourses =
            currentCourses.filter(course =>

                course.code
                    .toLowerCase()
                    .includes(searchText)

                ||

                course.title
                    .toLowerCase()
                    .includes(searchText)

            );

        displayCourses(filteredCourses);

    });

}

function renderResults(student) {

    currentResults = [...student.results];


    let totalScore = 0;
    let passedCourses = 0;
    let failedCourses = 0;

    currentResults.forEach(result => {

        totalScore += result.score;

        if (result.grade === "F") {

            failedCourses++;

        } else {

            passedCourses++;

        }

    });

    displayResults(currentResults);

    const averageScore =
        totalScore / currentResults.length;
   document.getElementById("result-total-courses")
       .textContent = currentResults.length;
    document.getElementById("result-average-score")
        .textContent = averageScore.toFixed(1);

    document.getElementById("result-passed-courses")
        .textContent = passedCourses;

    document.getElementById("result-failed-courses")
        .textContent = failedCourses;

}
    function displayResults(results) {

        const tableBody =
            document.getElementById("results-table-body");

        tableBody.innerHTML = "";

        if (results.length === 0) {

            showEmptyState(
                tableBody,
                "🎓 No results available.",
                3
            );

            return;

        }

        results.forEach(result => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${result.course}</td>
                <td>${result.score}</td>
                <td>
                    <span class="grade-${result.grade.toLowerCase()}">
                        ${result.grade}
                    </span>
                </td>
            `;

            tableBody.appendChild(row);

        });
    }
function setupResultsControls() {

    const searchInput =
        document.getElementById("results-search");

    const gradeFilter =
        document.getElementById("results-filter");

    function filterResults() {

        const searchText =
            searchInput.value.toLowerCase();

        const selectedGrade =
            gradeFilter.value;

        const filteredResults =
            currentResults.filter(result => {

                const matchesSearch =
                    result.course
                        .toLowerCase()
                        .includes(searchText);

                const matchesGrade =
                    selectedGrade === "all" ||
                    result.grade === selectedGrade;

                return matchesSearch && matchesGrade;

            });

        displayResults(filteredResults);

    }

    searchInput.addEventListener(
        "input",
        filterResults
    );

    gradeFilter.addEventListener(
        "change",
        filterResults
    );

}
function shouldAnimate(pageName) {

    if (pageAnimations[pageName]) {

        return false;

    }

    pageAnimations[pageName] = true;

    return true;

}

    function renderFees(student) {

        const fees = student.fees;
        const percentage = (fees.paidAmount / fees.totalAmount) * 100;

      if (shouldAnimate("fees")) {
       animateCounter(
           document.getElementById("fees-total"),
           fees.totalAmount,
           "currency"
       );
           animateCounter(
               document.getElementById("fees-paid"),
               fees.paidAmount,
               "currency"
           );
            animateCounter(
                document.getElementById("fees-outstanding"),
                fees.outstandingAmount,
                "currency"
            );

       document.getElementById("fees-status").innerHTML = `
           <span class="status-${fees.status}
               .toLowerCase()
               .replace(/\s+/g, "-")">
               ${fees.status}
           </span>
       `;

       } else {

           document.getElementById("fee-total").textContent = totalFees;

           document.getElementById("fee-paid").textContent = paidFees;

           document.getElementById("fee-outstanding").textContent = outstandingFees;

           document.getElementById("fee-status").textContent = feeStatus;

       }
       document.getElementById("progress-bar").style.width =
       `${percentage}%`;

      document.getElementById("progress-text").textContent =
      `₦${fees.paidAmount.toLocaleString()} of ₦${fees.totalAmount.toLocaleString()} Paid (${percentage.toFixed(1)}%)`;
    }
    function renderPaymentHistory(student){

        const tbody = document.getElementById("payment-history");

        tbody.innerHTML = "";
        if(student.fees.history.length === 0){

            showEmptyState(
                tbody,
                "💳 No payment history available.",
                4
            );

            return;

        }
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
                timetableBody,
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
function renderPage(pageName, student) {

    switch (pageName) {

        case "dashboard":
            renderDashboard(student);
            break;

        case "profile":
            renderProfile(student);
            break;

        case "fees":
            renderFees(student);
            break;

        case "attendance":
            renderAttendance(student);
            break;

        case "results":
            renderResults(student);
            break;

        case "courses":
            renderCourses(student);
            break;

        case "timetable":
            renderTimetable(student);
            break;

        case "announcements":
            renderAnnouncements(student);
            break;

    }

}
function updateThemeIcon(isDarkMode, themeToggle) {

    themeToggle.textContent =
        isDarkMode ? "☀️" : "🌙";

}
function setupTheme() {

    const themeToggle =
        document.getElementById("theme-toggle");

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }

    updateThemeIcon(

        document.body.classList.contains("dark-mode"),

        themeToggle

    );

    themeToggle.addEventListener("click", () => {

        themeToggle.style.transform = "rotate(180deg)";

        setTimeout(() => {

            themeToggle.style.transform = "";

        }, 400);

        document.body.classList.toggle("dark-mode");

        const isDarkMode =
            document.body.classList.contains("dark-mode");

        if (isDarkMode) {

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            localStorage.removeItem("theme");

        }

        updateThemeIcon(

            isDarkMode,

            themeToggle

        );

    });

}

function setupNavigation(student) {

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

           renderPage(pageName, student);

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