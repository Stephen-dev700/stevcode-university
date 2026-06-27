const form = document.getElementById("login-form");
const matricNo = document.getElementById("matric-No-id");
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
    e.preventDefault();

    let isValid = true;

    studentError.textContent = "";
    passwordError.textContent = "";
    loginError.textContent = "";

    if (matricNo.value.trim() === "") {
        studentError.textContent = "Matric No is required";
        isValid = false;
    }

    if (passwordInput.value.trim() === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    }

    if (!isValid) return;

    loginBtn.classList.add("loading");
    loginBtn.textContent = "Logging in...";
    loginBtn.disabled = true;

    setTimeout(() => {

        loginBtn.classList.remove("loading");
        loginBtn.textContent = "Login";
        loginBtn.disabled = false;

        const student = authenticate(
            matricNo.value.trim(),
            passwordInput.value
        );

        if (!student) {
            loginError.textContent = "Invalid Student ID or Password.";
            return;
        }

        saveStudent(student);

       window.location.href = DASHBOARD_PAGE;

    }, 2000);
});