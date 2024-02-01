var user_details = JSON.parse(localStorage.getItem("user_info"));
if (user_details) {
  getuserdata();
}
function getuserdata() {
  $.ajax({
    url: user_details_API,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      user_id: user_details.user[0].id,
      role_id: user_details.user[0].role_id,
    }),
    success: function (response) {
      userdatashow(response);
    },
    error: function (error) {
      console.error("Error creating data on user_store_locations:->>", error);
    },
  });
}

function userdatashow(res) {
  //console.log("res->>", res);
  $("#profile-banner1").text(
    res.user[0].sap_user_id == null
      ? ""
      : res.user[0].sap_user_id + "-" + res.user[0].first_name
  );
  $("#profile-banner2").text(res.user[0].designation);
  $("#profile-banner3").text(res.user[0].department_name);

  $("#user-role").text(res.user[0].role);
  $("#user-mobile_no").text(res.user[0].mobile_no);
  $("#user-email").text(res.user[0].email);

  const joining_date = formatDate(res.user[0].created_at);

  $("#user-joining_date").text(joining_date);
  $("#user-sap_user_id").text(res.user[0].sap_user_id);
  if (res.user[0].reporting_to != null) {
    $("#user-manager_id").text(
      res.user[0].manager_id + "-" + res.user[0].reporting_to
    );
  } else {
    $("#user-manager_idshowbox").css("display", "none");
  }
  var store_loc1 = $("#store_loc1");
  //console.log("res.user[0].store_plants->", res.user[0].store_plants);
  if (user_details.user[0].role_id != 1) {
    store_loc1.append(`<h2 class="profile-title">Store Location</h2>`);
    res.user[0].store_plants.forEach((store_plant) => {
      const location_wrap = `
        <div class="location-wrap">
            <div class="location-item-wrap">
                <span class="bg-green material-symbols-rounded">my_location</span>
                <span>${
                  store_plant.plant_id +
                  "-" +
                  store_plant.storage_location +
                  "-" +
                  store_plant.storage_location_desc
                }</span>
            </div>
        </div>
    `;
      store_loc1.append(location_wrap);
    });
  }

  var store_loc2 = $("#store_loc2");

  if (res.user[0].delivery_plants != null) {
    if (
      user_details.user[0].role_id == 3 ||
      user_details.user[0].role_id == 2 ||
      user_details.user[0].role_id == 7 ||
      user_details.user[0].role_id == 8 ||
      user_details.user[0].role_id == 9 ||
      user_details.user[0].role_id == 19
    ) {
      store_loc2.append(`<h2 class="profile-title">Delivery Location</h2>`);
      res.user[0].delivery_plants.forEach((delivery_plant) => {
        const location_wrap = `
          <div class="location-wrap">
              <div class="location-item-wrap">
                  <span class="bg-green material-symbols-rounded">my_location</span>
                  <span>${
                    delivery_plant.plant_id +
                    "-" +
                    delivery_plant.storage_location +
                    "-" +
                    delivery_plant.plant_name
                  }</span>
              </div>
          </div>
      `;
        store_loc2.append(location_wrap);
      });
    }
  }
  if (user_details.user[0].role_id == 5) {
    //debugger;
    store_loc2.append(`<h2 class="profile-title">STO Access Locations</h2>`);
    res.user[0].sto_plants.forEach((delivery_plant) => {
      const location_wrap = `
        <div class="location-wrap">
            <div class="location-item-wrap">
                <span class="bg-green material-symbols-rounded">my_location</span>
                <span>${
                  delivery_plant.plant_id +
                  "-" +
                  delivery_plant.storage_location +
                  "-" +
                  delivery_plant.plant_name
                }</span>
            </div>
        </div>
    `;
      store_loc2.append(location_wrap);
    });
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = `${day}${suffix} ${month} ${year}`;
  return formattedDate;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  const lastDigit = day % 10;

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
