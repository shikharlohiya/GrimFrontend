function logout() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure you want to Logout?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#fd0607",
      confirmButtonColor: "#218838",
      // confirmButtonText: "Yes, Logout!",
      // cancelButtonText: "No, cancel!",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        logoutmethod();
      }
    });

  // Swal.fire({
  //   title: "Are you sure you want to Logout?",
  //   text: "",
  //   icon: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   confirmButtonText: "Ok",
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     logoutmethod();
  //   }
  // });
}

function logoutsession() {
  logoutmethod();
  alert("Your session is expired.");
}

var url = window.location.href;
var parts = url.split("/");
var id = parts[parts.length - 1];
// console.log("url:", url, "parts:", parts);
// console.log("parts:", parts[5]);
// console.log("parts:", parts[6]);
// console.log("parts:", parts[7]);
// console.log(parts[0] + location.host + "/Login");

function logoutmethod() {
  localStorage.removeItem("user_info");
  localStorage.removeItem("cart");
  localStorage.removeItem("sidemenu");
  localStorage.removeItem("plant_id");
  $.ajax({
    url: logout_API,
    method: "PUT",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      id: Logindata.user[0].id,
    }),
    success: function (response) {
      debugger;
      if (response.success === true) {
        toast("success", response.message);
        if (parts[5] === undefined) {
          window.location.href = "../Login";
        } else {
          if (parts[6] === undefined) {
            // Redirect to the Login page
            window.location.href = "/Login";
          } else {
            location.reload(true);
          }
        }
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      //toast("warning", "Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

function resetTimer() {
  clearTimeout(time);
  time = setTimeout(logoutsession, 3600000); //60 min
  //time = setTimeout(logoutsession, 5000); //60 min
  // 1000 milliseconds = 1 second
}

var time;
window.addEventListener("load", resetTimer, true);
var events = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart",
  "onclick",
];

events.forEach(function (name) {
  document.addEventListener(name, resetTimer, true);
});

// function route() {
//   window.location.href = "../Login";
// }
