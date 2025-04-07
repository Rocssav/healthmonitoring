function toggleForms(formId) {
    document.querySelectorAll("form").forEach(form => form.style.display = "none");
    document.getElementById(formId).style.display = "block";
}
function togglePassword(fieldId, eyeIcon) {
    const field = document.getElementById(fieldId);
    field.type = field.type === "password" ? "text" : "password";
    eyeIcon.classList.toggle("fa-eye-slash");
}
function generateCaptcha() {
    document.getElementById("captchaText").innerText = Math.random().toString(36).substr(2, 6);
}

function generateForgotCaptcha() {
    document.getElementById("forgotCaptchaText").innerText = Math.random().toString(36).substr(2, 6);
}

// Signup Validation
function validateSignup(event) {
    event.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;
    const captchaInput = document.getElementById("captchaInput").value;
    const captchaText = document.getElementById("captchaText").innerText;

    if (password !== confirmPassword) return alert("Passwords do not match!");
    if (captchaInput !== captchaText) return alert("Captcha incorrect!");

    localStorage.setItem("userName", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    alert("Signup Successful!");
    toggleForms("loginForm");
}

// Login Validation
function validateLogin(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
      

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    const storedName = localStorage.getItem("userName");

    if (email === localStorage.getItem("email") && password === localStorage.getItem("password")) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login Successful!");
        window.location.replace("index.html");
    } else {
        alert("Invalid Credentials!");
    }
   

}

// Forgot Password Captcha Validation
function verifyForgotCaptcha() {
    const email = document.getElementById("forgotEmail").value;
    const captchaInput = document.getElementById("forgotCaptchaInput").value;
    const captchaText = document.getElementById("forgotCaptchaText").innerText;

    if (email !== localStorage.getItem("email")) return alert("Email not registered!");
    if (captchaInput !== captchaText) return alert("Captcha incorrect!");

    document.getElementById("newPasswordSection").style.display = "block";
}

// Reset Password
function resetPassword(event) {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;

    if (newPassword !== confirmNewPassword) return alert("Passwords do not match!");
    
    localStorage.setItem("password", newPassword);
    alert("Password Reset Successful!");
    toggleForms("loginForm");
}

window.onload = function() {
    generateCaptcha();
    generateForgotCaptcha();
};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;

    // Get stored credentials
    let storedEmail = localStorage.getItem("userEmail");
    let storedPassword = localStorage.getItem("userPassword");
    let storedName = localStorage.getItem("userName");

    if (loginEmail === storedEmail && loginPassword === storedPassword) {
        // ✅ Set login status and name for dashboard use
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUserName", storedName); // Optional: use a separate key if you prefer

        alert("Login Successful! Redirecting to Dashboard...");
        window.location.replace("index.html");
    } else {
        alert("Invalid email or password. Please try again.");
    }
});

