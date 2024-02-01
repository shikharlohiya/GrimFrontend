var data = JSON.parse(localStorage.getItem("user_info"));
if (data) {
  window.location.href = "/Home/NewIndent";
}
// main.js
//debugger
//console.log('API URL 1 from main.js:', window.apiUrl1); //https://grim.co.in:3002/api/v4/
//console.log('API URL 2 from main.js:', window.apiUrl2); //https://grim.co.in:3003/api/

//Host URl
// var hostlogin = "https://172.16.1.69:3002";
//var hostlogin = "https://grim.co.in:3002";

//console.log("Object", window.ApiUrl1);

var hostlogin = window.ApiUrl1;
var block = "block";
var none = "none";

function CheckAll() {
  document.getElementById("Error-show").style.display = "none";
  var email = document.forms["My_Form"]["email"].value;
  var Password = document.forms["My_Form"]["Password"].value;

  // Perform client-side validation (optional)

  if (email === "" || password === "") {
    displayNotification("Please fill in all fields");
  }
  if (email == null || email == "") {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg").innerHTML = "Please enter email";
  }
  if (Password == null || Password == "") {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg").innerHTML = "Please enter password";
  }

  var notification = $(".notification");

  spinner(true);
  // Make AJAX request to the server
  $.ajax({
    //url: hostlogin + "/api/v4/login",
    url: hostlogin + "login",
    method: "POST",
    dataType: "json",
    data: {
      email: $("#email").val(),
      password: $("#password").val(),
      sap_id: "",
    },
    success: function (response) {
      debugger;

      if (
        response.success != false &&
        response.user[0].is_password_changed != "NO"
      ) {
        localStorage.setItem("user_info", JSON.stringify(response));
      } else if (
        response.success != false &&
        response.user[0].is_password_changed == "NO"
      ) {
        const user = JSON.stringify(response.user);
        localStorage.setItem("user_reset_details", user);
      }

      if (response.success === true) {
        if (response.user[0].role_id == 1) {
          document.getElementById("Error-show").style.display = "none";
          document.getElementById("error-msg").innerHTML = "";
          spinner(false);
          toastlogin("success", " Login successful!");
          localStorage.setItem("sidemenu", "CreateUser");
          window.location.href = "/Home/CreateUser";
        } else {
          if (response.user[0].is_password_changed == "NO") {
            //if (true) {
            window.location.href = "/Login/reset_password";
          } else {
            document.getElementById("Error-show").style.display = "none";
            document.getElementById("error-msg").innerHTML = "";
            spinner(false);
            toastlogin("success", " Login successful!");
            if (
              response.user[0].role_id == 2 ||
              response.user[0].role_id == 7 ||
              response.user[0].role_id == 8 ||
              response.user[0].role_id == 9 ||
              response.user[0].role_id == 19
            ) {
              localStorage.setItem("sidemenu", "MyRequests");
              window.location.href = "/Home/MyRequests";
            } else if (response.user[0].role_id == 3) {
              window.location.href = "/Home/NewIndent";
            } else if (response.user[0].role_id == 5) {
              localStorage.setItem("sidemenu", "MyRequests");
              window.location.href = "/Home/NewIndent";
            } else if (response.user[0].role_id == 6) {
              localStorage.setItem("sidemenu", "MyRequests");
              window.location.href = "/Home/NewIndent";
            } else if (response.user[0].role_id == 11) {
              localStorage.setItem("sidemenu", "Report");
              window.location.href = "/Home/Report";
            } else if (response.user[0].role_id == 12) {
              localStorage.setItem("sidemenu", "Pr_materials");
              window.location.href = "/Home/Pr_materials";
            } else {
              //alert("this role page not");
              window.location.href = "/Home/Report";
              localStorage.setItem("sidemenu", "Report");
            }
          }
        }
      } else {
        spinner(false);
        document.getElementById("Error-show").style.display = "block";
        document.getElementById("error-msg").innerHTML =
          "Incorrect Email Or Password ";
        //toastlogin("error", "Incorrect Email Or Password");
        toastlogin("error", response.message);
      }
    },

    error: function (xhr, status, error) {
      spinner(false);
      // Handle login error
      console.log("Error: " + error);
      // alert("Login failed. Please try again.");
      toastlogin("warning", "Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      spinner(false);
      if (status === "error" || !xhr.responseText) {
        // Handle network or server error
        // alert("Network error. Please try again later.");
        toastlogin("error", "Network error. Please try again later.");
      }
    },
  });

  function displayNotification(message) {
    notification.text(message);
    notification.fadeIn().delay(3000).fadeOut();
  }
  return false;
}

function forgot() {
  document.getElementById("popup-forgot-pass").style.display = "block";
}
function popClose() {
  document.getElementById("popup-forgot-pass").style.display = "none";
}

function forgot_password() {
  // Get the email input value
  const email = document.getElementById("forgot-email").value;

  // Validate the email format using a regular expression
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    document.getElementById("forgot-email").style.border = "1px solid red";
    alert("Please enter a valid email address.");
    return;
  }
  document.getElementById("forgot-email").style.border = "none";

  // Call the function to send the reset password request
  sendResetPasswordRequest(email);
}

function sendResetPasswordRequest(email) {
  let api_url_forgot = hostlogin + "forgot_password";

  $.ajax({
    url: api_url_forgot,
    method: "POST",
    dataType: "json",
    data: { email: email },

    success: function (response) {
      // Handle successful login
      console.log("password send to your mail successful!");
      toastlogin("success", response.message);
      toastlogin("success", "password send to your mail successful!");
      popClose();
    },

    error: function (xhr, status, error) {
      if (status === "error") {
        spinner(false);
        // Handle login error
        console.log("Error: " + error, status, xhr);
        // toastlogin("warning", error);
        toastlogin("warning", xhr.responseJSON.message);
      }
    },

    complete: function (xhr, status) {
      spinner(false);
      if (!xhr.responseText) {
        // Handle network or server error
        // alert("Network error. Please try again later.");
        toastlogin("error", "Network error. Please try again later.");
      }
    },
  });
}

function spinner(isloading) {
  if (isloading == true) {
    document.getElementById("spinnerbody").style.display = "block";
  } else {
    document.getElementById("spinnerbody").style.display = none;
  }
}

// toast function
function toastlogin(action, msg) {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  Command: toastr[action](msg);
}
