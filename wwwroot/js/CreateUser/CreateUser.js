var user_details = JSON.parse(localStorage.getItem("user_info"));

var store_locations = [
  {
    id: 1,
    locations: [],
  },
];
var plants = [
  {
    id: 1,
    plant_details: [],
  },
];
var delivery_locations = [
  {
    id: 1,
    locations: [],
  },
];
var roles = [
  {
    id: 1,
    user_roles: [],
  },
];
var departments = [
  {
    id: 1,
    user_departments: [],
  },
];
var privilegess = [
  {
    id: 1,
    privileges: [],
  },
];
var managers = [
  {
    id: 1,
    manager_details: [],
  },
];
var statusses = [
  {
    id: 1,
    status: [
      { id: 1, name: "Active" },
      { id: 0, name: "InActive" },
    ],
  },
];
var user = {
  location_id: null,
  locations: [],
  manager_id: null,
};
var store_user = false;
var maxdates = undefined;
var showUpdateDialog = false;

var edit_user = true;
var multipleCancelButton;
var User_Location;
var Store_Location;
var Delivery_Locations;
var STO_Accesss_Stores;
var multipledepartments;
var multiple_Select_a_Role;
var multiple_Status;

var start = moment().subtract(29, "days");
var end = moment();

var from_date = start.format("YYYY-MM-DD");
var to_date = end.format("YYYY-MM-DD");

// console.log("var from_date = " + start.format("YYYY-MM-DD"));
// console.log("var to_date = " + end.format("YYYY-MM-DD"));

var outputs = {
  role_id: [],
  from_date: to_date,
  to_date: to_date,
  department: [],
  role_id: [],
  status: [],
};

var locations = [];
var indent_status = [];

var fillters = {
  role_id: [],
  from_date: from_date,
  to_date: to_date,
  department: [],
  role_id: [],
  status: [],
};

var js = jQuery.noConflict(true);

offcanvas("CreateUser");
var table_data;
var get_user_data;
// var get_users = "https://grim.co.in:3002/api/v4/admin/get_users";
function Add() {
  var array = [];
  $.ajax({
    url: host + path + "admin/get_users",
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      status: fillters.status,
      role_id: fillters.role_id,
      department: fillters.department,
      from_date: fillters.from_date,
      to_date: fillters.to_date,
    }),
    async: false,
    success: function (dataall) {
      console.log(dataall);
      get_user_data = dataall;
      dataall.users.forEach((data, index) => {
        if (data.status == "active") {
          var d_btn = `<button class="NewBtn Custom-btn common-red-button" onclick="deleteItem(${data.id})">DISABLE</button>`;
        } else {
          var d_btn = `<button class="NewBtn Custom-btn common-blue-button" onclick="deleteItem(${data.id})">ENABLE</button>`;
        }
        const btn = `<div class="Userlist_action"><button class="NewBtn Custom-btn common-blue-button" onclick="editItem(${data.id})" value="${data.id}">EDIT</button>&nbsp;&nbsp;<br> ${d_btn}</div>`;
        if (data.delivery_plants != undefined) {
          var delivery_plants = data?.delivery_plants
            .map(
              (element) =>
                `${element.plant_id}-${element.storage_location}-${element.storage_location_desc}`
            )
            .join(", ");
        } else {
          var delivery_plants = "-";
        }
        if (data.store_plants.length > 0) {
          var store_plants = data.store_plants
            .map(
              (element) =>
                `${element.plant_id}-${element.storage_location}-${element.storage_location_desc}`
            )
            .join(", ");
        } else {
          var store_plants = "-";
        }

        array.push([
          index + 1,
          data.id,
          data.first_name,
          data.last_name,
          data.role,
          data.department_name,
          data.email,
          data.status,
          delivery_plants,
          store_plants,
          formatDate(data.created_at),
          btn,
        ]);
      });
      spinnercreatepage(false);
    },
    error: function (err) {
      spinnercreatepage(false);
      toast("error", "Network error. Please try again later.");
    },
  });
  if (table_data) {
    table_data.clear().destroy();
  }
  table_data = js("#Userlist").DataTable({
    data: array,
    bAutoWidth: false,
    fixedColumns: {
      left: 0,
      right: 1,
    },
    scrollCollapse: true,
    scrollX: true,
    dom: "Bfrtip",
    // buttons: ["copy", "csv", "excel", "pdf", "print"],
    buttons: [
      {
        extend: "excelHtml5",
        title: "Users",
      },
    ],
    pageLength: 10,
    // paging: false,
    // searching: false,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, "Todos"],
    ],
    initComplete: function (settings, json) {
      $("#Userlist").wrap(
        "<div style='overflow:auto; width:100%;position:relative;'></div>"
      );
    },
  });
}
$(".Userlist").click(function () {
  table_data.buttons(0).trigger(); // Trigger the Excel button click
});

function spinnercreatepage(isloading) {
  if (isloading == true) {
    document.getElementById("spinnerbody").style.display = "block";
  } else {
    document.getElementById("spinnerbody").style.display = "none";
  }
}
function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

// 9/8/23

function resetFieldStyles() {
  // Remove the 'is-invalid' class from all form fields
  $(".form-control").removeClass("is-invalid");
}

/* fillters code  */
var output = {
  from_date: from_date,
  to_date: to_date,
};
$(document).ready(function () {
  $(".dropdown-content span").click(function () {
    const selectedRange = $(this).data("range-key");
    //console.log("selectedRange", selectedRange);
    if (selectedRange === "Custom Range") {
      $("#custom-range-container").css("display", "flex");
    } else {
      $("#custom-range-container").css("display", "none");
      const dates = getSelectedDates(selectedRange);
      //console.log("-<<<>>>>", output);
      $("#selected-dates").val(dates);
    }
    //console.log("output", output);
  });

  $("#apply-custom-range").click(function () {
    const from_date = $("#from-date").val();
    const to_date = $("#to-date").val();
    output.from_date = from_date;
    output.to_date = to_date;
    //console.log(output);
    const customDates = formatDate(from_date) + " - " + formatDate(to_date);
    $("#selected-dates").val(customDates);
    $("#custom-range-container").css("display", "none");
  });

  function getSelectedDates(rangeKey) {
    const today = new Date();

    switch (rangeKey) {
      case "Today":
        output.from_date = today;
        output.to_date = today;
        break;

      case "Yesterday":
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        output.from_date = yesterday;
        output.to_date = yesterday;
        break;

      case "Last 7 Days":
        var last7DaysEnd = today;
        var last7DaysStart = new Date(today);
        last7DaysStart.setDate(today.getDate() - 6);
        output.from_date = last7DaysStart;
        output.to_date = last7DaysEnd;
        break;

      case "Last 30 Days":
        var last30DaysEnd = today;
        var last30DaysStart = new Date(today);
        last30DaysStart.setDate(today.getDate() - 29);
        output.from_date = last30DaysStart;
        output.to_date = last30DaysEnd;
        break;

      case "This Month":
        var thisMonthEnd = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        ); // Get the last day of the current month
        var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        output.from_date = thisMonthStart;
        output.to_date = thisMonthEnd;
        break;

      case "Last Month":
        var lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        var lastMonthStart = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        output.from_date = lastMonthStart;
        output.to_date = lastMonthEnd;
        break;

      case "This Year":
        output.from_date = new Date(today.getFullYear(), 0, 1);
        output.to_date = new Date(today.getFullYear(), 11, 31);
        break;

      case "Last 365 Days":
        var last365DaysStart = new Date(today);
        last365DaysStart.setDate(today.getDate() - 364);
        output.from_date = last365DaysStart;
        output.to_date = today;
        break;

      case "Last Year":
        var lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
        var lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
        output.from_date = lastYearStart;
        output.to_date = lastYearEnd;
        break;
      case "All":
        var AllEnd = new Date(2020, 0, 1); // Year 2020, month 0 (January), day 1
        output.from_date = AllEnd;
        output.to_date = today;
        break;
    }

    return formatDate(output.from_date) + " - " + formatDate(output.to_date);
  }

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  // Get all the span elements inside the dropdown-content class
  const options = document.querySelectorAll(".dropdown-content span");

  // Add a click event listener to each span
  options.forEach((option) => {
    option.addEventListener("click", () => {
      // Remove the active class from all spans

      options.forEach((option) => {
        option.classList.remove("active");
      });

      // Add the active class to the clicked span
      option.classList.add("active");
    });
  });
  const dates = getSelectedDates("Last 30 Days");
  $("#selected-dates").val(dates);
});

function formatDate_output(inputDateString) {
  // Parse the input date string into a Date object
  var dateObj = new Date(inputDateString);

  // Extract year, month, and day components
  var year = dateObj.getFullYear();
  var month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so add 1
  var day = dateObj.getDate().toString().padStart(2, "0");

  // Format the components into the desired format
  return year + "-" + month + "-" + day;
}

//  22-08-23
function submitForm() {
  const dropdown1Values = $("#Select_a_Role").val();
  const dropdown2Values = $("#departments").val();
  const dropdown3Values = $("#Status").val();
  fillters.role_id = dropdown1Values;
  fillters.department = dropdown2Values;
  fillters.status = dropdown3Values;
  fillters.from_date = formatDate_output(output.from_date);
  fillters.to_date = formatDate_output(output.to_date);
  // console.log("new_date", fillters.from_date);
  // console.log("new_date", fillters.to_date);
  spinnercreatepage(true);
  setTimeout(() => {
    Add();
    let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
    closeCanvas.click();
  }, 500);
}

function resetForm() {
  $("#departments").selectpicker("deselectAll");
  $("#departments").selectpicker("refresh");

  $("#Select_a_Role").selectpicker("deselectAll");
  $("#Select_a_Role").selectpicker("refresh");

  $("#Status").selectpicker("deselectAll");
  $("#Status").selectpicker("refresh");

  $("#Select_a_Role").val("");
  $("#departments").val("");

  outputs.locations = [];
  outputs.indent_status = [];
  outputs.status = [];
  var start = moment().subtract(29, "days");
  var end = moment();

  from_date = start.format("YYYY-MM-DD");
  to_date = end.format("YYYY-MM-DD");
  outputs.from_date = from_date;
  outputs.to_date = to_date;
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
  Add();
  //addinDropdownfilter();
}

function AddUser(type) {
  // debugger;
  if (type == 1) {
    $("#myModal").modal("show");
    $(".modal-title").text("Add User");
    $("#STO_Accesss_Stores_div").hide();
    $("#showpassword").show();
    $("#Select_a_Status").show();
    $("#Select_a_Status_div").show();
    $("#Select_a_Manager_show").show();
    $("#User_Location_show").show();
    $("#Store_Location_show").show();
    edit_user = false;
    $("#submitForm").show();
    $("#UpdateForm").hide();
  } else {
    checked = true;
    edit_user = false;
    $(".modal-title").text("Add Store User");
    $("#STO_Accesss_Stores_div").show();
    $("#myModal").modal("show");
    $("#Select_a_Manager_show").show();
    $("#User_Location_show").show();
    $("#Store_Location_show").show();
    $("#submitForm").show();
    $("#UpdateForm").hide();
  }
  storage_location_User_Location_method();
  resetDropdown();
}

function modelclose() {
  $("#myModal").modal("hide");
}

// for deleteItem role
function deleteItem(id) {
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
  var item = get_user_data.users.filter((obj) => obj.id === id)[0];
  // console.log("datatatat", m_obj, id);
  var status_value;
  if (item.status == "active") {
    var status = "Disabled";
    status_value = 0;
  } else {
    var status = "Enabled";
    status_value = 1;
  }
  Swal.fire({
    title: "Do you really want to " + status + " ?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      var text = "Success, User Update Successfully";
      var editedRoleRequestObj = {
        user_id: item.id,
        status: status_value,
      };
      $.ajax({
        // url: "https://grim.co.in:3002/api/v4/admin/users",
        url: host + path + "admin/users",
        method: "DELETE",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(editedRoleRequestObj),
        success: function (response) {
          toast("success", response.message);
          setTimeout(() => {
            Add();
            get_managers();
          }, 1000);
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error);
          //toast("warning", "Api failed. Please try again.");
        },
        complete: function (xhr, status) {
          if (status === "error" || !xhr.responseText) {
            toast("error", "Network error. Please try again later.");
          }
        },
      });
    }
  });
}

function array(data) {
  var newArray = data.map(function (item) {
    return item?.toString(); // or String(item);
  });
  return newArray;
}

function editItem(id) {
  showUpdateDialog = true;
  edit_user = true;
  const data = get_user_data.users.filter((obj) => obj.id === id);
  console.log("obj", data);
  //debugger;
  $(".modal-title").text("Edit User");
  $("#submitForm").hide();
  $("#UpdateForm").show();
  debugger;
  $("#UpdateForm").attr("data-id", id); // set id
  $("#myModal").modal("show");
  $("#showpassword").hide();
  $("#Select_a_Status").hide();
  $("#Select_a_Status_div").hide();
  $("#STO_Accesss_Stores_div").hide();

  $("#first_name").val(data[0].first_name);
  $("#last_name").val(data[0].last_name);
  $("#mo_num").val(data[0].mobile_no);
  $("#email").val(data[0].email);
  $("#spa_id").val(data[0].sap_id);
  $("#designation").val(data[0].designation);

  roles.forEach(function (role) {
    // Perform operations with the 'role' variable here
    console.log(role);
    if (
      data[0].role_id == 5 ||
      data[0].role_id == 11 ||
      data[0].role_id == 12 ||
      data[0].role_id == 13
    ) {
      //for multiple Select a Role*
      //use this user.store_previlages
    } else {
      //for single Select a Role*
      //use this user.role_id
    }
  });

  var defaultValues = array(data[0].store_previlages);

  if (multipleCancelButton) {
    multipleCancelButton.destroy();
  }
  addinDropdown_user_roles_parameters(data[0].store_previlages);
  multipleCancelButton = new Choices("#Select_a_Role_1", {
    removeItemButton: true,
    maxItemCount: 990, // Set to 3 for selecting up to 3 tags
    searchResultLimit: 999,
    renderChoiceLimit: 999,
  });

  // Get selected values and store in an array
  $("#Select_a_Role_1").on("change", function () {
    var selectedValues = multipleCancelButton.getValue(true);
    console.log("Select_a_Role_1", selectedValues);
  });

  //===========================================================================================
  //debugger;
  managers.forEach(function (manager) {
    // Perform operations with the 'manager' variable here
    console.log(manager);
    if (
      data[0].role_id == 2 ||
      data[0].role_id == 3 ||
      data[0].role_id == 7 ||
      data[0].role_id == 9
    ) {
      //for multiple Select a Role*
      //use this managers[0].manager_details
      $("#Select_a_Manager_show").show();
    } else {
      $("#Select_a_Manager_show").hide();
    }
  });
  departments.forEach(function (department) {
    // Perform operations with the 'department' variable here
    console.log(department);
    //use this departments[0].user_departments
  });

  $("#Select_a_Manager").val(array([data[0].manager_id]));
  $("#Select_a_Sub_HOD").val(array([data[0].manager2]));
  $("#Select_a_HOD").val(array([data[0].hod]));
  $("#Select_a_Department").val(array([data[0].department]));
  //debugger;
  $("#Date_Of_Joining").val(data[0].doj);
  //===============================================================================================================================
  //User Location*
  if (
    data[0].role_id == 3 ||
    data[0].role_id == 2 ||
    data[0].role_id == 7 ||
    data[0].role_id == 8 ||
    data[0].role_id == 9 ||
    data[0].role_id == 11 ||
    data[0].role_id == 12 ||
    data[0].role_id == 13 ||
    data[0].role_id == 19 ||
    data[0].role_id == 5
  ) {
    //data[0].location_id
    //use this delivery_locations[0].locations
    $("#User_Location_show").show();
    User_Location_dropdown_peramiter(data[0].location_id);
  } else {
    $("#User_Location_show").hide();
  }
  //===============================================================================================================================
  //Store Locations*
  if (
    data[0].role_id == 3 ||
    data[0].role_id == 2 ||
    data[0].role_id == 7 ||
    data[0].role_id == 8 ||
    data[0].role_id == 9 ||
    data[0].role_id == 11 ||
    data[0].role_id == 5 ||
    data[0].role_id == 12 ||
    data[0].role_id == 13 ||
    data[0].role_id == 19 ||
    data[0].role_id == 4
  ) {
    //use this store_locations[0].locations
    // user.store_locations
    //Store_Location method
    $("#Store_Location_show").show();
    if (Store_Location) {
      Store_Location.destroy();
    }
    storage_location_Store_Location_method_parameters(data[0].store_locations);
    Store_Location = new Choices("#Store_Location", {
      removeItemButton: true,
      maxItemCount: 999, // Set to 3 for selecting up to 3 tags
      searchResultLimit: 999,
      renderChoiceLimit: 999,
    });
  } else {
    $("#Store_Location_show").hide();
  }

  //===============================================================================================================================
  //STO ACCESS STORES
  if (
    data[0].role_id == 11 ||
    data[0].role_id == 5 ||
    data[0].role_id == 12 ||
    data[0].role_id == 13
  ) {
    //use this store_locations[0].locations
    // $("#STO_Accesss_Stores").selectpicker("val", array(data[0].sto_stores));
    $("#STO_Accesss_Stores_div").show();
    //STO_Accesss_Stores method
    if (STO_Accesss_Stores) {
      STO_Accesss_Stores.destroy();
    }
    storage_location_STO_Accesss_Stores_method_parameters(data[0].sto_stores);

    STO_Accesss_Stores = new Choices("#STO_Accesss_Stores", {
      removeItemButton: true,
      maxItemCount: 999, // Set to 3 for selecting up to 3 tags
      searchResultLimit: 999,
      renderChoiceLimit: 999,
    });

    // Get selected values and store in an array
    $("#STO_Accesss_Stores").on("change", function () {
      var selectedValues = STO_Accesss_Stores.getValue(true);
      console.log("STO_Accesss_Stores", selectedValues);
    });
  } else {
    $("#STO_Accesss_Stores_div").hide();
  }
  //===============================================================================================================================
  //Delivery Locations*
  if (
    data[0].role_id == 3 ||
    data[0].role_id == 2 ||
    data[0].role_id == 7 ||
    data[0].role_id == 8 ||
    data[0].role_id == 19 ||
    data[0].role_id == 9
  ) {
    //v-model="user.delivery_locations"
    //:items="delivery_locations[0].locations"
    $("#Delivery_Locations_show").show();
    //Delivery_Locations method
    if (Delivery_Locations) {
      Delivery_Locations.destroy();
    }
    setDelivery_Locationsdropdown1_peramiter(data[0].delivery_locations);

    Delivery_Locations = new Choices("#Delivery_Locations", {
      removeItemButton: true,
      maxItemCount: 999, // Set to 3 for selecting up to 3 tags
      searchResultLimit: 999,
      renderChoiceLimit: 999,
    });

    // Get selected values and store in an array
    $("#Delivery_Locations").on("change", function () {
      var selectedValues = Delivery_Locations.getValue(true);
      console.log("Delivery_Locations", selectedValues);
    });
  } else {
    $("#Delivery_Locations_show").hide();
  }

  //===============================================================================================================================

  // Get selected values and store in an array
  $("#Store_Location").on("change", function () {
    var selectedValues = Store_Location.getValue(true);
    console.log("Store_Location", selectedValues);
  });
}

$("#UpdateForm").click(function () {
  debugger;
  var id = parseInt($(this).attr("data-id"));
  let data = get_user_data.users.filter((obj) => obj.id === id);
  console.log("obj", data);
  data.forEach((user) => {
    // debugger;
    var stringArray = $("#Select_a_Role_1").val();
    user.store_previlages = $.map(stringArray, function (value) {
      return parseInt(value, 10);
    });

    user.user_id = user.id;
    if (user.store_previlages != null) {
      if (user.store_previlages.length > 0) {
        user.role_id = user.store_previlages[0];
      }
    }
    user.sto_stores = $("#STO_Accesss_Stores").val().map(Number);
    user.delivery_locations = $("#Delivery_Locations").val().map(Number);
    user.store_locations = $("#Store_Location").val().map(Number);
    user.location_id = parseInt($("#User_Location").val());
    user.doj = $("#Date_Of_Joining").val();
    // user.status = parseInt($("#Select_a_Status").val(), 10);
    user.department = parseInt($("#Select_a_Department").val(), 10);
    user.hod = parseInt($("#Select_a_HOD").val(), 10);
    user.manager2 = parseInt($("#Select_a_Sub_HOD").val(), 10);
    user.manager_id = parseInt($("#Select_a_Manager").val(), 10);
    //user.role_id = parseInt($("#Select_a_Role_1").val(), 10);
    user.designation = $("#designation").val().trim();
    user.sap_id = $("#spa_id").val().trim();
    user.email = $("#email").val().trim();
    user.mobile_no = $("#mo_num").val().trim();
    user.last_name = $("#last_name").val().trim();
    user.first_name = $("#first_name").val().trim();
    //user.store_roles = $("#Select_a_Role_1").val().map(Number);
  });
  var user_details = {
    user: data[0],
  };
  //console.log("edit", data);
  // debugger;
  const valid = true;
  if (valid) {
    $.ajax({
      // url: "https://grim.co.in:3002/api/v4/admin/users",
      url: host + path + "admin/users",
      method: "PUT",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(user_details),
      success: function (response) {
        toast("success", response.message);
        $("#myModal").modal("hide");
        setTimeout(() => {
          Add();
          get_managers();
        }, 1000);
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error);
        toast("error", "Network error. Please try again later.");
      },
      complete: function (xhr, status) {
        if (status === "error" || !xhr.responseText) {
          toast("error", "Network error. Please try again later.");
        }
      },
    });
  }
});

var boolcheck = true;
/* fillters code end  */
var checked = false;
function validateAndSaveForm() {
  // Reset field styles
  resetFieldStyles();

  var firstName = $("#first_name").val().trim();
  var lastName = $("#last_name").val().trim();
  var mobileNumber = $("#mo_num").val().trim();
  var email = $("#email").val().trim();
  var password = $("#pass").val().trim();
  var spaId = $("#spa_id").val().trim();
  var designation = $("#designation").val().trim();
  var dateOfJoining = $("#Date_Of_Joining").val();
  var isValid = true;

  // Regular expressions for email and mobile number validation
  var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  var mobileRegex = /^\d{10}$/;
  var alphabeticRegex = /^[A-Za-z\s]+$/;

  // Perform validation (you can add more validation rules)
  if (!firstName || !alphabeticRegex.test(firstName)) {
    $("#first_name").addClass("is-invalid");
    isValid = false;
  }
  if (!lastName) {
    $("#last_name").addClass("is-invalid");
    isValid = false;
  }
  if (!mobileNumber || !mobileRegex.test(mobileNumber)) {
    $("#mo_num").addClass("is-invalid");
    isValid = false;
  }
  if (!email || !emailRegex.test(email)) {
    $("#email").addClass("is-invalid");
    isValid = false;
  }
  if (!password) {
    $("#pass").addClass("is-invalid");
    isValid = false;
  }
  if (!spaId) {
    $("#spa_id").addClass("is-invalid");
    isValid = false;
  }
  if (!designation) {
    $("#designation").addClass("is-invalid");
    isValid = false;
  }
  // if (selectedLocations.length === 0) {
  //   $("#choices-multiple-remove-button").addClass("is-invalid");
  //   isValid = false;
  // }
  // if (singleChoiceLocation.length === 0) {
  //   $("#choices").addClass("is-invalid");
  //   isValid = false;
  // }

  if (dateOfJoining == "") {
    $("#Date_Of_Joining").addClass("is-invalid");
    isValid = false;
  }

  if ($("#Select_a_Role_1").val().length == 0) {
    toast("warning", "please select roles");
    isValid = false;
  }

  if ($("#Select_a_Manager").val().length == 0) {
    toast("warning", "please select_Manager");
    isValid = false;
  }

  if ($("#Select_a_Sub_HOD").val().length == 0) {
    toast("warning", "please select Sub HOD");
    isValid = false;
  }
  if ($("#Select_a_HOD").val() == "99999") {
    toast("warning", "please select HOD");
    isValid = false;
  }
  if ($("#Select_a_Department").val() == "99999") {
    toast("warning", "please select Department");
    isValid = false;
  }
  if (!edit_user) {
    if ($("#Select_a_Status").val() == "99999") {
      toast("warning", "please select Status");
      isValid = false;
    }
  }
  if ($("#Store_Location").val().length == 0) {
    toast("warning", "please select Store Location");
    isValid = false;
  }
  if ($("#User_Location").val().length == "99999") {
    toast("warning", "please select User Location");
    isValid = false;
  }
  if ($("#Delivery_Locations").val().length == 0) {
    toast("warning", "please select Delivery Locations");
    isValid = false;
  }
  if (checked) {
    if ($("#STO_Accesss_Stores").val().length == 0) {
      toast("warning", "please select STO Accesss Stores");
      isValid = false;
    }
  }
  if (!isValid) {
    // Validation failed, don't save and show error message if needed
    return;
  }

  //alert("Data saved successfully!");
  if (checked) {
    var obj = {
      user: {
        sto_stores: $("#STO_Accesss_Stores").val().map(Number),
        delivery_locations: $("#Delivery_Locations").val().map(Number),
        store_locations: $("#Store_Location").val().map(Number),
        location_id: parseInt($("#User_Location").val(), 10),
        doj: $("#Date_Of_Joining").val(),
        status: parseInt($("#Select_a_Status").val(), 10),
        department: parseInt($("#Select_a_Department").val(), 10),
        hod: parseInt($("#Select_a_HOD").val(), 10),
        manager2: parseInt($("#Select_a_Sub_HOD").val(), 10),
        manager_id: parseInt($("#Select_a_Manager").val(), 10),
        role_id: parseInt($("#Select_a_Role_1").val(), 10),
        designation: $("#designation").val().trim(),
        sap_id: $("#spa_id").val().trim(),
        password: $("#pass").val().trim(),
        email: $("#email").val().trim(),
        mobile_no: $("#mo_num").val().trim(),
        last_name: $("#last_name").val().trim(),
        first_name: $("#first_name").val().trim(),
        store_roles: $("#Select_a_Role_1").val().map(Number),
      },
    };
  } else {
    var obj = {
      user: {
        // sto_stores: $("#STO_Accesss_Stores").val().map(Number),
        delivery_locations: $("#Delivery_Locations").val().map(Number),
        store_locations: $("#Store_Location").val().map(Number),
        location_id: parseInt($("#User_Location").val(), 10),
        locations: [],
        doj: $("#Date_Of_Joining").val(),
        status: parseInt($("#Select_a_Status").val(), 10),
        department: parseInt($("#Select_a_Department").val(), 10),
        hod: parseInt($("#Select_a_HOD").val(), 10),
        manager2: parseInt($("#Select_a_Sub_HOD").val(), 10),
        manager_id: parseInt($("#Select_a_Manager").val(), 10),
        role_id: parseInt($("#Select_a_Role_1").val(), 10),
        designation: $("#designation").val().trim(),
        sap_id: $("#spa_id").val().trim(),
        password: $("#pass").val().trim(),
        email: $("#email").val().trim(),
        mobile_no: $("#mo_num").val().trim(),
        last_name: $("#last_name").val().trim(),
        first_name: $("#first_name").val().trim(),
        store_roles: $("#Select_a_Role_1").val().map(Number),
      },
    };
  }

  //console.log(obj);
  // apicall
  $.ajax({
    // url: "https://grim.co.in:3002/api/v4/create_user",
    url: host + path + "create_user",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(obj),
    success: function (response) {
      if (response.success == true) {
        toast("success", response.message);
        $("#myModal").modal("hide");
        //alert("Data saved successfully!");
        setTimeout(() => {
          location.reload(true);
        }, 1000);
      } else {
        toast("error", response.message);
      }
    },
    error: function (error) {
      console.error("Error creating data :->>", error);
      toast("error", "Network error. Please try again later.");
    },
  });
  //$("#myModal").modal("hide");
}
const today = new Date().toISOString().split("T")[0];
document.getElementById("Date_Of_Joining").setAttribute("max", today);

$(document).ready(function () {
  // Regular expressions for validation
  var firstNameRegex = /^[A-Za-z\s]+$/; // Alphabetic characters and spaces
  var mobileRegex = /^\d{10}$/; // 10-digit mobile number
  var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/; // Email format
  var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/; // Password with at least 8 characters, including uppercase, lowercase, and a digit

  // First Name validation
  $("#first_name").on("keyup", function () {
    var firstName = $(this).val().trim();
    var errorSpan = $(this).next(".error-message"); // Get the adjacent <span> for error message

    if (!firstNameRegex.test(firstName)) {
      errorSpan.text("Invalid first name"); // Display error message
      $(this).addClass("is-invalid");
    } else {
      errorSpan.text(""); // Clear error message
      $(this).removeClass("is-invalid");
    }
  });

  // Mobile Number validation
  $("#mo_num").on("keyup", function () {
    var mobileNumber = $(this).val().trim();
    var errorSpan = $(this).next(".error-message");

    if (!mobileRegex.test(mobileNumber)) {
      errorSpan.text("Invalid mobile number");
      $(this).addClass("is-invalid");
    } else {
      errorSpan.text("");
      $(this).removeClass("is-invalid");
    }
  });

  // Email validation
  $("#email").on("keyup", function () {
    var email = $(this).val().trim();
    var errorSpan = $(this).next(".error-message");

    if (!emailRegex.test(email)) {
      errorSpan.text("Invalid email");
      $(this).addClass("is-invalid");
    } else {
      errorSpan.text("");
      $(this).removeClass("is-invalid");
    }
  });

  // Password validation
  // $("#pass").on("keyup", function () {
  //   var password = $(this).val().trim();
  //   var errorSpan = $(this).next(".error-message");

  //   if (!passwordRegex.test(password)) {
  //     errorSpan.text("Invalid password");
  //     $(this).addClass("is-invalid");
  //   } else {
  //     errorSpan.text("");
  //     $(this).removeClass("is-invalid");
  //   }
  // });
});

function resetFieldStyles() {
  // Remove is-invalid class and red border from all fields
  $(".form-control").removeClass("is-invalid");
}

function isValidDate(dateString) {
  // Check if the date string matches a valid date format (you can customize the format)
  var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  if (!pattern.test(dateString)) {
    return false;
  }

  // Check if the date is a valid date (e.g., February 30 is not valid)
  var parts = dateString.split("/");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[2], 10);

  if (year < 1900 || year > new Date().getFullYear() + 1) {
    return false;
  }

  var lastDayOfMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > lastDayOfMonth) {
    return false;
  }

  return true;
}
// Attach the click event handler to the "Save" button
$(function () {
  $("#submitForm").click(function () {
    validateAndSaveForm();
  });
});

function getLocations() {
  js.ajax({
    // url: "https://grim.co.in:3002/api/v4/store_locations",
    url: host + path + "store_locations",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      store_locations[0].locations = response.locations;
      storage_location_Store_Location_method();
      storage_location_STO_Accesss_Stores_method();
    },
    error: function (err) {
      toast("error", "Network error. Please try again later.");
    },
  });
}

// write now no use below method but as a ref.
function storage_location_User_Location_method_parameters(defaultValues1) {
  const selectDropdown1 = $("#User_Location");
  selectDropdown1.empty();
  //delivery_locations[0].locations.forEach((element) => {
  store_locations[0].locations.forEach((element) => {
    var val1 =
      defaultValues1 == "" ? false : defaultValues1.includes(element.id);
    if (element.store != "X") {
      selectDropdown1.append(
        $("<option>", {
          value: element.id,
          text:
            element.plant_id +
            "-" +
            //element.storage_loc +
            element.storage_loc +
            "-" +
            element.plant_name,
          selected: val1,
        })
      );
    }
    if (element.store == "X") {
      selectDropdown1.append(
        $("<option>", {
          value: element.id,
          text:
            element.plant_id +
            "-" +
            element.storage_loc +
            "-" +
            element.storage_location_desc,
          selected: val1,
        })
      );
    }
  });
}
function storage_location_User_Location_method() {
  const selectDropdown1 = $("#User_Location");
  selectDropdown1.empty();
  //delivery_locations[0].locations.forEach((element) => {
  store_locations[0].locations.forEach((element) => {
    if (element.store != "X") {
      selectDropdown1.append(
        $("<option>", {
          value: element.id,
          text:
            element.plant_id +
            "-" +
            element.storage_loc +
            "-" +
            element.plant_name,
        })
      );
    }
    if (element.store == "X") {
      selectDropdown1.append(
        $("<option>", {
          value: element.id,
          text:
            element.plant_id +
            "-" +
            //element.storage_location +
            element.storage_loc +
            "-" +
            element.storage_location_desc,
        })
      );
    }
  });
}
function storage_location_Store_Location_method_parameters(defaultValues) {
  const selectDropdown = $("#Store_Location");
  selectDropdown.empty();
  store_locations[0].locations.forEach((element) => {
    var val2 = defaultValues == "" ? false : defaultValues.includes(element.id);
    selectDropdown.append(
      $("<option>", {
        value: element.id,
        text:
          element.plant_id +
          "-" +
          element.storage_loc +
          "-" +
          element.storage_location_desc,
        selected: val2,
      })
    );
  });
  if (defaultValues.length > 0) {
    defaultValues.forEach((defaultValue, index) => {
      let option = selectDropdown.find("option[value='" + defaultValue + "']");
      option.prop("selected", true);

      // Update the text using the pattern 'index + text'
      //option.text(index + 1 + " " + option.text());
    });
  }
}
function storage_location_STO_Accesss_Stores_method_parameters(defaultValues3) {
  const selectDropdown3 = $("#STO_Accesss_Stores");
  selectDropdown3.empty();
  store_locations[0].locations.forEach((element) => {
    var val3 =
      defaultValues3 == "" ? false : defaultValues3.includes(element.id);
    selectDropdown3.append(
      $("<option>", {
        value: element.id,
        text:
          element.plant_id +
          "-" +
          element.storage_loc +
          "-" +
          element.storage_location_desc,
        selected: val3,
      })
    );
  });
  if (defaultValues3.length > 0) {
    defaultValues3.forEach((defaultValue, index) => {
      let option = selectDropdown3.find("option[value='" + defaultValue + "']");
      option.prop("selected", true);

      // Update the text using the pattern 'index + text'
      // option.text(index + 1 + " " + option.text());
    });
  }
}

function storage_location_Store_Location_method() {
  const selectDropdown2 = $("#Store_Location");
  selectDropdown2.empty();
  store_locations[0].locations.forEach((element) => {
    selectDropdown2.append(
      $("<option>", {
        value: element.id,
        text:
          element.plant_id +
          "-" +
          element.storage_loc +
          "-" +
          element.storage_location_desc,
      })
    );
  });
}
function storage_location_STO_Accesss_Stores_method() {
  const selectDropdown3 = $("#STO_Accesss_Stores");
  selectDropdown3.empty();
  store_locations[0].locations.forEach((element) => {
    selectDropdown3.append(
      $("<option>", {
        value: element.id,
        text:
          element.plant_id +
          "-" +
          element.storage_loc +
          "-" +
          element.storage_location_desc,
      })
    );
  });
}
function getDeliveryLocations() {
  js.ajax({
    // url: "https://grim.co.in:3002/api/v4/delivery_locations",
    url: host + path + "delivery_locations",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      delivery_locations[0].locations = response.locations;
      setDelivery_Locationsdropdown();
      /// new line added
      storage_location_User_Location_method();
    },
    error: function (err) {
      toast("error", "Network error. Please try again later.");
    },
  });
}
function setDelivery_Locationsdropdown1_peramiter(defaultValues1) {
  var dropdown1 = $("#Delivery_Locations");
  dropdown1.empty();

  delivery_locations[0].locations.forEach((element) => {
    var val1 = false;
    if (defaultValues1.length > 0) {
      val1 = defaultValues1.includes(element.id);
    }
    const optionElement = $("<option>", {
      value: element.id,
      text:
        element.plant_id +
        " - " +
        element.storage_location +
        " - " +
        element.plant_name,
      selected: val1,
    });
    dropdown1.append(optionElement);
  });
  if (defaultValues1.length > 0) {
    defaultValues1.forEach((defaultValue, index) => {
      let option = dropdown1.find("option[value='" + defaultValue + "']");
      option.prop("selected", true);

      // Update the text using the pattern 'index + text'
      //option.text(index + 1 + " " + option.text());
    });
  }
}
function User_Location_dropdown_peramiter(defaultValues2) {
  //debugger;
  var dropdown2 = $("#User_Location");
  dropdown2.empty();
  //delivery_locations[0].locations.forEach((element) => {
  store_locations[0].locations.forEach((element) => {
    var val2 = false;
    if (defaultValues2 != "") {
      val2 = defaultValues2 == element.id ? true : false;
    }
    const optionElement = $("<option>", {
      value: element.id,
      text:
        element.plant_id +
        " - " +
        element.storage_loc +
        " - " +
        element.plant_name,
      selected: val2,
    });
    dropdown2.append(optionElement);
  });
}
function setDelivery_Locationsdropdown() {
  var dropdown1 = $("#Delivery_Locations");
  //var dropdown2 = $("#User_Location");
  dropdown1.empty();
  //dropdown2.empty();
  //delivery_locations[0].locations.forEach((element) => {
  store_locations[0].locations.forEach((element) => {
    if (element.store != "X") {
      const optionElement = $("<option>", {
        value: element.id,
        text:
          element.plant_id +
          " - " +
          //element.storage_location +
          element.storage_loc +
          " - " +
          element.plant_name,
      });
      dropdown1.append(optionElement);
    }
    if (element.store == "X") {
      const optionElement = $("<option>", {
        value: element.id,
        text:
          element.plant_id +
          " - " +
          //element.storage_location +
          element.storage_loc +
          " - " +
          element.plant_name,
      });
      dropdown1.append(optionElement);
    }
  });

  // delivery_locations[0].locations.forEach((element) => {
  //   if(element.store != 'X'){
  //     const optionElement = $("<option>", {
  //       value: element.id,
  //       text:
  //         element.plant_id +
  //         " - " +
  //         element.storage_location +
  //         " - " +
  //         element.plant_name,
  //     });
  //     dropdown2.append(optionElement);
  //   }
  //   if(element.store =='X'){
  //     const optionElement = $("<option>", {
  //       value: element.id,
  //       text:
  //         element.plant_id +
  //         " - " +
  //         element.storage_location +
  //         " - " +
  //         element.plant_name,
  //     });
  //     dropdown2.append(optionElement);
  //   }
  // });
}

function maxDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  maxdates = date.toISOString().substr(0, 10);
}

function getDepartments() {
  js.ajax({
    // url: "https://grim.co.in:3002/api/v4/departments",
    url: host + path + "departments",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      departments[0].user_departments = response.departments;
      addinDropdown_departments(response);
    },
    error: function (err) {
      toast("error", "Network error. Please try again later.");
    },
  });
  function addinDropdown_departments(data) {
    var dropdown = $("#Select_a_Department");
    dropdown.append(`<option value="99999">Select a Department</option>`);
    data.departments.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.id,
        text: element.department_name,
      });
      dropdown.append(optionElement);
    });

    var dropdown = $("#departments");
    dropdown.append(`<option value="99999">Select a Department</option>`);
    data.departments.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.id,
        text: element.department_name,
      });
      dropdown.append(optionElement);
    });
    // if (multipledepartments) {
    //   multipledepartments.destroy();
    // }
    // multipledepartments = new Choices("#departments", {
    //   removeItemButton: true,
    //   maxItemCount: 100, // Set to 3 for selecting up to 3 tags
    //   searchResultLimit: 100,
    //   renderChoiceLimit: 100,
    // });
  }
}

function get_managers() {
  js.ajax({
    // url: "https://grim.co.in:3002/api/v4/get_managers",
    url: host + path + "get_managers",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      addinDropdown_get_managers(response);
      managers[0].manager_details = response.data;
    },
    error: function (err) {
      toast("error", err);
    },
  });

  function addinDropdown_get_managers(data) {
    var dropdown1 = $("#Select_a_Manager");
    var dropdown2 = $("#Select_a_Sub_HOD");
    var dropdown3 = $("#Select_a_HOD");
    dropdown1.empty();
    dropdown2.empty();
    dropdown3.empty();
    // dropdown1.append(`<option value="99999" >Select a Manager</option>`);
    // dropdown2.append(`<option value="99999">Select a Sub HOD</option>`);
    // dropdown3.append(`<option value="99999">Select a HOD</option>`);
    data.data.forEach((element) => {
      const optionElement1 = $("<option>", {
        value: element.id,
        text: element.first_name + " - (" + element.sap_user_id + ")",
      });
      dropdown1.append(optionElement1);
      const optionElement2 = $("<option>", {
        value: element.id,
        text: element.first_name + " - (" + element.sap_user_id + ")",
      });
      dropdown2.append(optionElement2);
      const optionElement3 = $("<option>", {
        value: element.id,
        text: element.first_name + " - (" + element.sap_user_id + ")",
      });
      dropdown3.append(optionElement3);
    });
    //console.log("dropdown============", dropdown);
  }

  setTimeout(() => {
    onetimecall();
  }, 1000);
}
// "#Select_a_HOD","#departments","#Select_a_Status","#Select_a_Department",
$(document).on("change", "#Select_a_Manager", "#Select_a_Sub_HOD", function () {
  const selectedOption = $(this).find("option:selected");
  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "99999") {
    // Remove the first option
    //selectedOption.removeAttr("selected").prop("disabled", true);
    selectedOption.remove();
    onetimecall();
  }
});

$(document).on("change", "#Select_a_HOD", "#departments", function () {
  const selectedOption = $(this).find("option:selected");
  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "99999") {
    // Remove the first option
    selectedOption.removeAttr("selected").prop("disabled", true);
    // selectedOption.remove();
  }
});

$(document).on(
  "change",
  "#Select_a_Status",
  "#Select_a_Department",
  function () {
    const selectedOption = $(this).find("option:selected");
    // Check if it is the first option with a value of 0
    if (selectedOption.index() === 0 && selectedOption.val() === "99999") {
      // Remove the first option
      selectedOption.removeAttr("selected").prop("disabled", true);
      //selectedOption.remove();
    }
  }
);
function getRolesItem(item) {
  return item.role !== "admin" && item.status === 1;
}
var addinDropdownresponse = [];

function getRoles() {
  js.ajax({
    // url: "https://grim.co.in:3003/api/user_roles?_where=(status,eq,1)",

    // url: host1 + path1 + "user_roles?_where=(status,eq,1)",

    url: host1 + "/api/v4/user_roles?status=1",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      roles[0].user_roles = response.filter(getRolesItem);
      addinDropdownresponse = response;
      addinDropdown_user_roles();
      addinDropdownfilter();
    },
    error: function (err) {
      toast("error", err);
    },
  });
}
function addinDropdown_user_roles_parameters(defaultValues) {
  debugger;
  var dropdown1 = $("#Select_a_Role_1");
  dropdown1.empty();
  addinDropdownresponse.forEach((element) => {
    if (element.role != "admin") {
      const optionElement = $("<option>", {
        value: element.id,
        text: element.role,
      });
      dropdown1.append(optionElement);
    }
  });

  if (defaultValues.length > 0) {
    defaultValues.forEach((defaultValue, index) => {
      let option = dropdown1.find("option[value='" + defaultValue + "']");
      option.prop("selected", true);

      // Update the text using the pattern 'index + text'
      option.text(index + 1 + " " + option.text());
    });
  }
  // defaultValues.forEach((el) => {
  //   /// hear i want set multiple selected value in order of defaultValues in dropdown1 selection  eg,optionElement.prop("selected", true);
  // });
}
function addinDropdown_user_roles() {
  //debugger;
  var dropdown1 = $("#Select_a_Role_1");
  dropdown1.empty();
  addinDropdownresponse.forEach((element) => {
    if (element.role != "admin") {
      const optionElement = $("<option>", {
        value: element.id,
        text: element.role,
      });
      dropdown1.append(optionElement);
    }
  });
}
function addinDropdownfilter() {
  //console.log(multiple_Select_a_Role);
  // if (multiple_Select_a_Role) {
  //   multiple_Select_a_Role.destroy();
  // }
  var dropdown2 = $("#Select_a_Role");
  dropdown2.empty();
  addinDropdownresponse.forEach((element) => {
    if (element.role != "admin") {
      const optionElement = $("<option>", {
        value: element.id,
        text: element.role,
      });
      dropdown2.append(optionElement);
    }
  });
  // multiple_Select_a_Role = new Choices("#Select_a_Role", {
  //   removeItemButton: true,
  //   maxItemCount: 100, // Set to 3 for selecting up to 3 tags
  //   searchResultLimit: 100,
  //   renderChoiceLimit: 100,
  // });
}

js(document).ready(function () {
  Add();
});
getDeliveryLocations();
getLocations();
maxDate();
getDepartments();
getRoles();
get_managers();

function onetimecall() {
  // $("#Select_a_Role_1").selectpicker("deselectAll");
  // $("#Select_a_Manager").selectpicker("deselectAll");
  // $("#Select_a_Sub_HOD").selectpicker("deselectAll");
  // $("#Select_a_HOD").selectpicker("deselectAll");
  // $("#Select_a_Department").selectpicker("deselectAll");
}

function resetDropdown() {
  $('#myModal input[type="text"]').val("");
  $('#myModal input[type="number"]').val("");
  $('#myModal input[type="email"]').val("");
  $('#myModal input[type="password"]').val("");
  //$("#Select_a_Role_1").selectpicker("val", []);

  $("#Select_a_Manager").val("");
  $("#Select_a_Sub_HOD").val("");
  $("#Select_a_HOD").val("");
  $("#Select_a_Department").val("");

  $("#User_Location").val("");

  $("#Date_Of_Joining").val("");

  // $("#User_Location").selectpicker("val", []);
  // $("#Store_Location").selectpicker("val", []);
  // $("#Delivery_Locations").selectpicker("val", []);
  // $("#STO_Accesss_Stores").selectpicker("val", []);

  if (multipleCancelButton) {
    multipleCancelButton.destroy();
  }
  if (Delivery_Locations) {
    Delivery_Locations.destroy();
  }
  if (Store_Location) {
    Store_Location.destroy();
  }
  if (STO_Accesss_Stores) {
    STO_Accesss_Stores.destroy();
  }
  //storage_location_User_Location_method();

  addinDropdown_user_roles();
  multipleCancelButton = new Choices("#Select_a_Role_1", {
    removeItemButton: true,
    maxItemCount: 99,
    searchResultLimit: 99,
    renderChoiceLimit: 99,
  });
  storage_location_Store_Location_method();
  Store_Location = new Choices("#Store_Location", {
    removeItemButton: true,
    maxItemCount: 999,
    searchResultLimit: 999,
    renderChoiceLimit: 999,
  });
  setDelivery_Locationsdropdown();
  Delivery_Locations = new Choices("#Delivery_Locations", {
    removeItemButton: true,
    maxItemCount: 999,
    searchResultLimit: 999,
    renderChoiceLimit: 999,
  });
  storage_location_STO_Accesss_Stores_method();
  STO_Accesss_Stores = new Choices("#STO_Accesss_Stores", {
    removeItemButton: true,
    maxItemCount: 999,
    searchResultLimit: 999,
    renderChoiceLimit: 999,
  });
}

// Attach an event listener to the close button in the modal header
$(".modal-header .close").click(function () {
  resetDropdown();
});

$(document).ready(function () {
  $("#myModal").modal({
    backdrop: "static",
    keyboard: false,
  });

  // if (multiple_Status) {
  //   multiple_Status.destroy();
  // }
  // multiple_Status = new Choices("#Status", {
  //   removeItemButton: true,
  //   maxItemCount: 3, // Set to 3 for selecting up to 3 tags
  //   searchResultLimit: 100,
  //   renderChoiceLimit: 100,
  // });
});
