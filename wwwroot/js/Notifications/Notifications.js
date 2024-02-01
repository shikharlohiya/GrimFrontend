$.ajax({
  url: notification_API,
  type: "POST",
  contentType: "application/json",
  data: JSON.stringify(notification_Payload),
  success: function (response) {
    if (response.success === true) {
      // console.log("notification_logs js ->Get successfully:", response);
      document.getElementById("Notificationsfullbody").innerHTML = "";
        if(response.notification_logs.length ==0){
          $("#notifications_no").hide();
        }else{
          document.getElementById("notifications_no").innerHTML = response.notification_logs.length;
        }
      }
      var timestamps = [];
      if (response.notification_logs.length != 0) {
        response.notification_logs.forEach((element) => {
          // console.log(element.created_at);
          var inputTimestamp = new Date(element.created_at);

          var formattedTime = getTimeAgo(inputTimestamp);
          //date get only in hour and day i have isues in mins
          // console.log(formattedTime);

          document.getElementById("Notificationsfullbody").innerHTML += `
        <div class="col-md-6">
                <div class="notification-wrap">
                    <div class="notification-inner">
                        <div class="user-img"><img src="../images/profile.28fb3626.jpg"></div>
                        <div class="user-info">
                            <h3 onclick="handleClick(${element.order_id},${
            element.id
          })">${element.message}</h3>
                            <p>(${element.product_id + "-" + element.name})</p>
                            <p>${formattedTime}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        });
      } else {
        document.getElementById(
          "Notificationsfullbody"
        ).innerHTML = `<div style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 20px;
    ">
          You have no new notifications!
          </div>`;
      }
    }
  },
  error: function (xhr, status, error) {
    if (status === "error") {
      spinner(false);
      console.log("Error: " + error);
      toast("warning", error);
    }
  },
  error: function (error) {
    toast("error", error);
    toast("error", "Network error. Please try again later.");
    console.error("Error creating data on user_store_locations:->>", error);
  },
});

function getTimeAgo(timestamp) {
  var currentTime = new Date();
  var timeDifference = Math.floor((currentTime - timestamp) / 1000); // Time difference in seconds

  var hours = Math.floor(timeDifference / 3600); // Convert seconds to hours
  var minutes = Math.floor(timeDifference / 60); // Convert seconds to minutes
  var days = Math.floor(hours / 24); // Convert hours to days

  if (days >= 1) {
    if (days === 1) {
      return "1 day ago";
    } else {
      return days + " days ago";
    }
  } else if (hours >= 1) {
    if (hours === 1) {
      return "1 hour ago";
    } else {
      return hours + " hours ago";
    }
  } else if (minutes >= 1) {
    if (minutes === 1) {
      return "1 minute ago";
    } else {
      return minutes + " minutes ago";
    }
  } else {
    return "Just now";
  }
}

function handleClick(id, notification_id) {
  var da = new Date();
  var dateTime =
    da.getFullYear() +
    "-" +
    ("0" + (da.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + da.getDate()).slice(-2) +
    " " +
    ("0" + da.getHours()).slice(-2) +
    ":" +
    ("0" + da.getMinutes()).slice(-2) +
    ":" +
    ("0" + da.getSeconds()).slice(-2);

  var editedRequestObj = {
    read_notification: "0",
    updated_at: dateTime,
  };

  // var api =
  //   "https://grim.co.in:3003/api/notification_user_logs/" + notification_id;

  $.ajax({
    url: host1 + path1 + "notification_user_logs/" + notification_id,
    type: "PATCH",
    contentType: "application/json",
    data: JSON.stringify(editedRequestObj),
    success: function (response) {
      window.location.href = "./IndentDetails/" + id;
    },
    error: function (xhr, status, error) {
      if (status === "error") {
        spinner(false);
        console.log("Error: " + error);
        toast("warning", error);
      }
    },
    error: function (error) {
      toast("error", error);
      toast("error", "Network error. Please try again later.");
      console.error("Error creating data on user_store_locations:->>", error);
    },
  });
}
