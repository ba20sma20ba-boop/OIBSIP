// =========================
// Register Form
// =========================

const registerForm =
  document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      const nameInput =
        document.getElementById("registerName");

      const emailInput =
        document.getElementById("registerEmail");

      const passwordInput =
        document.getElementById("registerPassword");

      const confirmPasswordInput =
        document.getElementById("confirmPassword");

      const message =
        document.getElementById("registerMessage");


      const name =
        nameInput.value.trim();

      const email =
        emailInput.value.trim().toLowerCase();

      const password =
        passwordInput.value;

      const confirmPassword =
        confirmPasswordInput.value;


      // =========================
      // Validation
      // =========================

      if (name === "") {

        message.textContent =
          "Please enter your full name.";

        message.style.color = "#dc2626";

        nameInput.focus();

        return;
      }


      if (email === "") {

        message.textContent =
          "Please enter your email address.";

        message.style.color = "#dc2626";

        emailInput.focus();

        return;
      }


      if (!emailInput.checkValidity()) {

        message.textContent =
          "Please enter a valid email address.";

        message.style.color = "#dc2626";

        emailInput.focus();

        return;
      }


      if (password === "") {

        message.textContent =
          "Please enter a password.";

        message.style.color = "#dc2626";

        passwordInput.focus();

        return;
      }


      if (password.length < 6) {

        message.textContent =
          "Password must be at least 6 characters.";

        message.style.color = "#dc2626";

        passwordInput.focus();

        return;
      }


      if (confirmPassword === "") {

        message.textContent =
          "Please confirm your password.";

        message.style.color = "#dc2626";

        confirmPasswordInput.focus();

        return;
      }


      if (password !== confirmPassword) {

        message.textContent =
          "Passwords do not match.";

        message.style.color = "#dc2626";

        confirmPasswordInput.focus();

        return;
      }


      // =========================
      // Get Existing Users
      // =========================

      let users =
        JSON.parse(
          localStorage.getItem("users")
        ) || [];


      // =========================
      // Check Existing Email
      // =========================

      const existingUser =
        users.find(function (user) {

          return user.email === email;

        });


      if (existingUser) {

        message.textContent =
          "This email is already registered.";

        message.style.color = "#dc2626";

        emailInput.focus();

        return;
      }


      // =========================
      // Create New User
      // =========================

      const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password

      };


      users.push(newUser);


      // Save Users

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );


      // Success Message

      message.textContent =
        "Account created successfully!";

      message.style.color = "#16a34a";


      // Clear Form

      registerForm.reset();


      // Redirect to Login

      setTimeout(function () {

        window.location.href =
          "./index.html";

      }, 1000);

    }
  );

}


// =========================
// Login Form
// =========================

const loginForm =
  document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const emailInput =
        document.getElementById("loginEmail");

      const passwordInput =
        document.getElementById("loginPassword");

      const rememberMe =
        document.getElementById("rememberMe");

      const message =
        document.getElementById("loginMessage");


      const email =
        emailInput.value.trim().toLowerCase();

      const password =
        passwordInput.value;


      // =========================
      // Validation
      // =========================

      if (email === "") {

        message.textContent =
          "Please enter your email address.";

        message.style.color = "#dc2626";

        emailInput.focus();

        return;
      }


      if (!emailInput.checkValidity()) {

        message.textContent =
          "Please enter a valid email address.";

        message.style.color = "#dc2626";

        emailInput.focus();

        return;
      }


      if (password === "") {

        message.textContent =
          "Please enter your password.";

        message.style.color = "#dc2626";

        passwordInput.focus();

        return;
      }


      // =========================
      // Get Users
      // =========================

      const users =
        JSON.parse(
          localStorage.getItem("users")
        ) || [];


      // =========================
      // Find User
      // =========================

      const user =
        users.find(function (item) {

          return (
            item.email === email &&
            item.password === password
          );

        });


      // =========================
      // Invalid Login
      // =========================

      if (!user) {

        message.textContent =
          "Invalid email or password.";

        message.style.color = "#dc2626";

        return;
      }


      // =========================
      // Logged In User
      // =========================

      const loggedInUser = {

        id: user.id,

        name: user.name,

        email: user.email

      };


      // =========================
      // Remember Me
      // =========================

      if (rememberMe.checked) {

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(loggedInUser)
        );

      } else {

        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify(loggedInUser)
        );

      }


      // Success Message

      message.textContent =
        "Login successful!";

      message.style.color = "#16a34a";


      // Redirect to Dashboard

      setTimeout(function () {

        window.location.href =
          "./dashboard.html";

      }, 700);

    }
  );

}


// =========================
// Dashboard
// =========================

const userName =
  document.getElementById("userName");

const userEmail =
  document.getElementById("userEmail");

const welcomeMessage =
  document.getElementById("welcomeMessage");

const logoutButton =
  document.getElementById("logoutButton");


if (
  userName &&
  userEmail &&
  welcomeMessage &&
  logoutButton
) {

  // Get Logged In User

  const loggedInUser =
    JSON.parse(
      localStorage.getItem("loggedInUser")
    ) ||
    JSON.parse(
      sessionStorage.getItem("loggedInUser")
    );


  // =========================
  // Check Authentication
  // =========================

  if (!loggedInUser) {

    window.location.href =
      "./index.html";

  } else {

    userName.textContent =
      loggedInUser.name;

    userEmail.textContent =
      loggedInUser.email;

    welcomeMessage.textContent =
      `Welcome back, ${loggedInUser.name}!`;

  }


  // =========================
  // Logout
  // =========================

  logoutButton.addEventListener(
    "click",
    function () {

      localStorage.removeItem(
        "loggedInUser"
      );

      sessionStorage.removeItem(
        "loggedInUser"
      );


      window.location.href =
        "./index.html";

    }
  );

}