//var host = "https://grim.co.in:3002";
//var host1 = "https://grim.co.in:3003";
//var path = "/api/v4/";

var host = window.BaseUrl + window.Port1;
var host1 = window.BaseUrl + window.Port2;
var path = window.Endpoint1;

var Logindata = JSON.parse(localStorage.getItem("user_info"));
// console.log("Logindata data on Home js----->", Logindata);
if (Logindata) {
  window.location.href = "/Home/NewIndent";
}

function checkExpiry() {
  //debugger;
  var token = window.location.href.split("token=")[1];
  token = decodeURIComponent(token).split(" ").join("+");

  var data = {
    token: token,
    type: "check",
  };

  $.ajax({
    url: host + path + "updatePasswordViaEmail",
    method: "POST",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify(data),
    success: function (response) {
      if (response.success == true && response.message == "OK") {
        showResetPassword(true);
      } else {
        showResetPassword(false);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      toast("warning", "Api failed. Please try again.");
    },
    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}
checkExpiry();

function showResetPassword(bool) {
  if (bool) {
    $("#restpassword").show().css({ display: "" });
    $("#restpasswordMsg").hide().css({ display: "none" });
  } else {
    $("#restpassword").hide().css({ display: "none" });
    $("#restpasswordMsg").show().css({ display: "" });
  }
}

function onResetPassword() {
  if (validator()) {
    var token = window.location.href.split("token=")[1];
    token = decodeURIComponent(token).split(" ").join("+");
    var data = {
      token: token,
      type: "update",
      new_password: $("#exampleInputPassword1").val(),
    };
    //i have to test
    $.ajax({
      url: host + path + "updatePasswordViaEmail",
      method: "POST",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify(data),
      success: function (response) {
        toast("success", "success update pass");
        setTimeout(() => {
          window.location.href = "..";
        }, 2000);
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error);
        toast("warning", "Api failed. Please try again.");
      },
      complete: function (xhr, status) {
        if (status === "error" || !xhr.responseText) {
          toast("error", "Network error. Please try again later.");
        }
      },
    });
  } else {
    console.log("err", "check password");
  }
}

function validator() {
  valid = true;
  var password = $("#exampleInputPassword1").val();
  var confirmPassword = $("#exampleInputPasswor1-confirmation").val();
  var validationMessage = $("#validationMessage");

  validationMessage.text("");
  if (password === "" || confirmPassword === "") {
    validationMessage.text("Password fields cannot be empty.");
    valid = false;
  } else if (password.length > 16 || password.length < 8) {
    validationMessage.text(
      "Password length must be between 8 and 16 characters."
    );
    valid = false;
  } else if (!validatePassword(password)) {
    validationMessage.text(
      "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)"
    );
    valid = false;
  } else if (password === confirmPassword) {
    toast("success", "Password and confirm password are valid.");
  } else {
    valid = false;
    toast("warning", "Password and confirm password are not valid.");
  }
  return valid;

  function validatePassword(password) {
    var uppercaseRegex = /[A-Z]/;
    var lowercaseRegex = /[a-z]/;
    var numberRegex = /[0-9]/;
    var specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    if (
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

$("#togglePassword").click(function () {
  var passwordField = $("#password");
  var confirmPasswordField = $("#exampleInputPassword1");

  if (confirmPasswordField.attr("type") == "password") {
    passwordField.attr("type", "text");
    confirmPasswordField.attr("type", "text");
  } else {
    passwordField.attr("type", "password");
    confirmPasswordField.attr("type", "password");
  }
});

$("#togglePassword1").click(function () {
  var passwordField = $("#password");
  var reConfirmPasswordField = $("#exampleInputPasswor1-confirmation");
  if (reConfirmPasswordField.attr("type") === "password") {
    passwordField.attr("type", "text");
    reConfirmPasswordField.attr("type", "text");
  } else {
    passwordField.attr("type", "password");
    reConfirmPasswordField.attr("type", "password");
  }
});
// toast function
function toast(action, msg) {
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
                          