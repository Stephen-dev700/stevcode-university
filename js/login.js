const form = document.getElementById("login-form");
const studentId = document.getElementById("student-id");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");
const loginError = document.getElementById("login-error");
const studentError = document.getElementById("student-id-error")
const passwordError = document.getElementById("password-error");
const loginBtn = document.getElementById("login-btn");

// Password toggle
togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
    }
});

// Form validation
form.addEventListener("submit", (e) => {
    e.preventDefault(); // STOP PAGE RELOAD
    let isValid = true;

    // Clear previous errors
    studentError.textContent = "";
    passwordError.textContent = "";

    // Student ID check
    if (studentId.value.trim() === "") {
        studentError.textContent = "Student ID is required";
        isValid = false;
    }

    // Password check
    if (passwordInput.value.trim() === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    }

    if (!isValid) return;

       // START LOADING STATE
       loginBtn.classList.add("loading");
       loginBtn.textContent = "Logging in...";
       loginBtn.disabled = true;

       // FAKE SERVER DELAY
      setTimeout(() => {

          loginBtn.classList.remove("loading");
          loginBtn.textContent = "Login";
          loginBtn.disabled = false;

          const students = authenticate(
              studentId.value.trim(),
              passwordInput.value
          );

          if (!students) {
              loginError.textContent = "Invalid Student ID or Password.";
              return;
          }

          saveStudent(students);

          window.location.href = "dashboard.html";

      }, 2000);
      });