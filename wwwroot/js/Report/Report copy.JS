//new code report page
var nav_link = "";
var classList;
let reportlist;
var totalItems;

if (
  User_role === 1 ||
  User_role === 4 ||
  User_role === 7 ||
  User_role === 8 ||
  User_role === 9 ||
  User_role === 11 ||
  User_role === 12 ||
  User_role === 14
) {
  if (User_role == 5 || User_role == 1 || User_role == 14) {
    reportlist = {
      Indent_Status: "Indent Status",
      Indent_Reports: "Indent Reports",
      User_Reports: "User Reports",
      Material_Reports: "Material Reports",
      PR_PO_GRN_Reports: "PR/PO/GRN Reports",
      Stock_Reserved_Reports: "Stock Reserved Reports",
      Cost_Reports: "Cost Reports",
      STO_Reports: "STO Reports",
    };
  } else if (User_role === 4) {
    reportlist = {
      Indent_Status: "Indent Status",
      Indent_Reports: "Indent Reports",
      User_Reports: "User Reports",
      Material_Reports: "Material Reports",
      PR_PO_GRN_Reports: "PR/PO/GRN Reports",
      Stock_Reserved_Reports: "Stock Reserved Reports",
      Cost_Reports: "Cost Reports",
    };
  } else {
    reportlist = {
      Indent_Status: "Indent Status",
      Indent_Reports: "Indent Reports",
      User_Reports: "User Reports",
      Material_Reports: "Material Reports",
      PR_PO_GRN_Reports: "PR/PO/GRN Reports",
      Stock_Reserved_Reports: "Stock Reserved Reports",
    };
  }
  // for othes role
} else {
  if (User_role === 5) {
    reportlist = {
      Indent_Status: "Indent Status",
      Indent_Reports: "Indent Reports",
      User_Reports: "User Reports",
      Material_Reports: "Material Reports",
      PR_PO_GRN_Reports: "PR/PO/GRN Reports",
      Stock_Reserved_Reports: "Stock Reserved Reports",
      STO_Reports: "STO Reports",
    };
  } else {
    reportlist = {
      Indent_Status: "Indent Status",
      Indent_Reports: "Indent Reports",
      User_Reports: "User Reports",
      Material_Reports: "Material Reports",
      PR_PO_GRN_Reports: "PR/PO/GRN Reports",
      Stock_Reserved_Reports: "Stock Reserved Reports",
    };
  }
}
// report menu list
for (const key in reportlist) {
  let active = "";
  key === "Indent_Status" ? (active = "active") : (active = "");
  nav_link += `
  <a
    class="nav-link mb-3 p-3 Custom-btn shadow ${active}"
    id="v-pills-${key}-tab"
    data-toggle="pill"
    href="#v-pills-${key}"
    role="tab"
    onclick="${key}()"
    aria-controls="v-pills-${key}"
    aria-selected="true"
  >
    <span class="font-weight-bold small text-uppercase">${reportlist[key]}</span>
  </a>`;
}

document.getElementById("v-pills-tab").innerHTML = nav_link;

var headers = [
  { text: "S NO", value: "", visibility: 1 },
  {
    text: "Department Name",
    value: "department_name",
    sortable: true,
    visibility: 1,
  },
  { text: "Total Cost Utilized ", value: "amount", visibility: 0 },
  {
    text: "Cost Utilized %",
    value: "",
    sortable: true,
    visibility: 1,
  },
  { text: "Total Budget Allocated", value: "", visibility: 1 },
];

var sto_headers = [
  { text: "S NO", value: "", visibility: 1 },
  {
    text: "Indent Date",
    value: "created_at",
    sortable: true,
    visibility: 1,
  },
  { text: "Indent No", value: "order_id", sortable: true, visibility: 1 },
  { text: "Material Status", value: "status", visibility: 0 },
  {
    text: "Indent Line Item No",
    value: "s_no",
    sortable: true,
    visibility: 1,
  },
  { text: "Material No", value: "product_sap_id", visibility: 1 },
  {
    text: "Material Category",
    value: "material_type_sap_id",
    visibility: 1,
  },
  {
    text: "Material Group",
    value: "material_group_sap_id",
    visibility: 1,
  },
  { text: "Material Name", value: "product_name", visibility: 1 },
  { text: "Material Qty", value: "intial_qty", visibility: 2 },
  {
    text: "Material UOM",
    value: "base_unit",
    visibility: 1,
  },
  { text: "Price", value: "price", visibility: 1 },
  {
    text: "Store Location Code",
    value: "order.store_address",
    visibility: 1,
  },
  {
    text: "Store Location Name",
    value: "order.store_address",
    visibility: 1,
  },
  { text: "Approved By", value: "manager_name", visibility: 1 },
  {
    text: "Approval Date",
    value: "created_at",
    visibility: 1,
  },
  { text: "Department Name", value: "department", visibility: 1 },
  {
    text: "Request Location Code",
    value: "order.address",
    visibility: 1,
  },
  {
    text: "Request Location Name",
    value: "order.address",
    visibility: 1,
  },
  {
    text: "WBS No",
    value: "order.WBS_NO",
    visibility: 1,
  },
  { text: "Indentre Mail ID", value: "email", visibility: 1 },
  { text: "Indenter Mobile No", value: "mobile_no", visibility: 1 },
  {
    text: "Tracking Plant",
    value: "tracking_no",
    sortable: true,
    visibility: 1,
  },
  { text: "Where in Plant", value: "section", sortable: true, visibility: 1 },
  { text: "Reason", value: "reason", sortable: true, visibility: 1 },
  { text: "Where Used", value: "where_used", sortable: true, visibility: 1 },
];

var orderheaders = [
  { text: "S NO", value: "", visibility: 1 },
  {
    text: "Indent Date",
    value: "created_at",
    sortable: true,
    visibility: 1,
  },
  { text: "Indent No", value: "id", sortable: true, visibility: 1 },
  { text: "Indent Status", value: "", visibility: 1 },
  {
    text: "Indent Total Quantity",
    value: "total_quantity",
    visibility: 1,
  },
  { text: "Indent Price", value: "total", visibility: 1 },
  {
    text: "Indent Location",
    value: "address",
    visibility: 1,
  },
  {
    text: "Indent Raised By",
    value: "first_name",
    visibility: 1,
  },
  { text: "Approved By", value: "manager_name", visibility: 1 },
  { text: "Approval Date ", value: "created_at", visibility: 2 },
  {
    text: "dispatch location",
    value: "store_address",
    visibility: 1,
  },
  { text: "Department Name", value: "department", visibility: 1 },
  { text: "Indentre Mail ID", value: "email", visibility: 1 },
  { text: "Indenter Mobile No", value: "mobile_no", visibility: 1 },
];

/* fillters code  */
var output = {
  from_date: "",
  to_date: "",
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

  // Get all the span elements inside the dropdown-content class
  const options = document.querySelectorAll(".dropdown-content span");

  // Add a click event listener to each span
  options.forEach((option) => {
    option.addEventListener("click", () => {
      // Remove the active class from all spans

      options.forEach((option) => {
        option.classList.remove("active");
        console.log(option);
      });
      // Add the active class to the clicked span
      option.classList.add("active");
    });
  });

  const dates = getSelectedDates("Last 365 Days");
  $("#selected-dates").val(dates);
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
      var thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Get the last day of the current month
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
  }

  return formatDate(output.from_date) + " - " + formatDate(output.to_date);
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}
/* fillters code end  */
var js = jQuery.noConflict(true);
// Get the current date

var start = moment().subtract(364, "days");
var end = moment();

from_date = start.format("YYYY-MM-DD");
to_date = end.format("YYYY-MM-DD");

// console.log("var from_date = " + start.format("YYYY-MM-DD"));
// console.log("var to_date = " + end.format("YYYY-MM-DD"));

let chart;
var current_page;

var chart_output = {
  location_id: [],
  from_date: to_date,
  to_date: to_date,
  indent_status: [],
};

var outputs = {
  location_id: [],
  from_date: to_date,
  to_date: to_date,
  indent_status: [],
};

var locations = [];
var indent_status = [];
var page = 1;
var npp = 10;

var fillters = {
  location_id: [],
  from_date: from_date,
  to_date: to_date,
  indent_status: [],
  page: page,
  npp: npp,
};

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
  const dropdown1Values = $("#locations").val();
  const dropdown2Values = $("#indent_status").val();
  fillters.location_id = dropdown1Values;
  fillters.indent_status = dropdown2Values;
  fillters.npp = 10;
  fillters.page = 1;
  fillters.from_date = formatDate_output(output.from_date);
  fillters.to_date = formatDate_output(output.to_date);
  console.log("new_date", fillters.from_date);
  console.log("new_date", fillters.to_date);

  console.log("outputs", fillters);
  console.log("outputs", current_page);
  // Check if the function exists and is a function
  if (typeof window[current_page] === "function") {
    window[current_page](); // Call the function dynamically
  } else {
    console.log(current_page + " function does not exist");
  }
  // and same for othes.
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
}

function resetForm() {
  $("#locations").selectpicker("deselectAll");
  $("#indent_status").selectpicker("deselectAll");
  $("#locations").selectpicker("refresh");
  $("#indent_status").selectpicker("refresh");
  outputs.locations = [];
  outputs.indent_status = [];
  var start = moment().subtract(364, "days");
  var end = moment();

  from_date = start.format("YYYY-MM-DD");
  to_date = end.format("YYYY-MM-DD");
  outputs.from_date = from_date;
  outputs.to_date = to_date;
  // Check if the function exists and is a function
  if (typeof window[current_page] === "function") {
    window[current_page](); // Call the function dynamically
  } else {
    console.log(current_page + " function does not exist");
  }
  //i_ordershow(pagination, search, API);
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
}
//get User_loaction data for dropdown.
function user_locations() {
  var url;
  if (User_role == 1) {
    url = "https://grim.co.in:3002/api/v4/store_locations";
  } else {
    url = user_locations_APi;
  }
  js.ajax({
    url: url,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      addinDropdown(data);
    },
    error: function (err) {
      alert(err);
    },
  });
  function addinDropdown(data) {
    var dropdown = $("#locations");
    //dropdown.append(`<option value="0">locations</option>`);
    data.locations.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.id,
        text:
          element.plant_id +
          " - " +
          element.storage_loc +
          " - " +
          element.plant_name,
      });
      dropdown.append(optionElement);
    });
  }
}

function order_status() {
  js.ajax({
    url: order_status_APi,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      addinDropdown(data);
    },
    error: function (err) {
      alert(err);
    },
  });

  function addinDropdown(data) {
    var dropdown = $("#indent_status");
    //dropdown.append(`<option value="0">Indent Status</option>`);
    data.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.id,
        text: element.description,
      });
      dropdown.append(optionElement);
    });
  }
}

offcanvas("Report");
order_status();
user_locations();

$("#locations").dropdown({
  onChange: function (value, text, $selectedItems) {
    locations = value;
    console.log("locations Values: ", locations);
  },
});

$("#indent_status").dropdown({
  onChange: function (value, text, $selectedItems) {
    indent_status = value;
    console.log("indent_status Values: ", indent_status);
  },
});

$(".fsubmit").on("click", function () {
  outputs.location_id = locations;
  outputs.indent_status = indent_status;
  // Print output to console
  console.log("output->", outputs);
  // Check if the function with the given name exists
  if (typeof window[current_page] === "function") {
    // If it exists, call the function dynamically
    window[current_page]();
    // Get a reference to the button element using its ID
    const myButton = document.getElementById("Closebtn");
    // Simulate a click on the button
    myButton.click();
  } else {
    console.log("Function not found or is not a function.");
  }
});

$(".no.label.ui.dropdown").dropdown({
  useLabels: false,
});

$("#dateRangeSelectChartOnly").on("change", function () {
  var selectedValue = $(this).val();
  var output = {};

  if (selectedValue === "Today") {
    var today = new Date().toISOString().slice(0, 10);
    output.from_date = today;
    output.to_date = today;
  } else if (selectedValue === "Yesterday") {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    output.from_date = yesterday.toISOString().slice(0, 10);
    output.to_date = output.from_date;
  } else if (selectedValue === "Last 7 Days") {
    var last7DaysEnd = new Date().toISOString().slice(0, 10);
    var last7DaysStart = new Date();
    last7DaysStart.setDate(last7DaysStart.getDate() - 6);
    output.from_date = last7DaysStart.toISOString().slice(0, 10);
    output.to_date = last7DaysEnd;
  } else if (selectedValue === "Last 30 Days") {
    var last30DaysEnd = new Date().toISOString().slice(0, 10);
    var last30DaysStart = new Date();
    last30DaysStart.setDate(last30DaysStart.getDate() - 29);
    output.from_date = last30DaysStart.toISOString().slice(0, 10);
    output.to_date = last30DaysEnd;
  } else if (selectedValue === "This Month") {
    var thisMonthEnd = new Date().toISOString().slice(0, 10);
    var thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    output.from_date = thisMonthStart.toISOString().slice(0, 10);
    output.to_date = thisMonthEnd;
  } else if (selectedValue === "Last Month") {
    var lastMonthEnd = new Date();
    lastMonthEnd.setDate(0);
    var lastMonthStart = new Date(lastMonthEnd);
    lastMonthStart.setDate(1);
    output.from_date = lastMonthStart.toISOString().slice(0, 10);
    output.to_date = lastMonthEnd.toISOString().slice(0, 10);
  } else if (selectedValue === "Custom Range") {
    $("#customRangeInputsChartOnly").show();
    return; // Exit the function and wait for user to click "Apply" button
  }

  // Print output to console
  console.log(output);
  chart_output.from_date = output.from_date;
  chart_output.to_date = output.to_date;
  Indent_Status();
});

$("#applyCustomRangeChartOnly").on("click", function () {
  var customFromDate = $("#customFromDateChartOnly").val();
  var customToDate = $("#customToDateChartOnly").val();

  var output = {
    from_date: customFromDate,
    to_date: customToDate,
  };

  // Print output to console
  console.log(output);
  chart_output.from_date = output.from_date;
  chart_output.to_date = output.to_date;
  $("#customRangeInputsChartOnly").hide();
  Indent_Status();
});

$("#dateRangeSelect").on("change", function () {
  var selectedValue = $(this).val();
  var output = {};

  if (selectedValue === "Today") {
    var today = new Date().toISOString().slice(0, 10);
    output.from_date = today;
    output.to_date = today;
  } else if (selectedValue === "Yesterday") {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    output.from_date = yesterday.toISOString().slice(0, 10);
    output.to_date = output.from_date;
  } else if (selectedValue === "Last 7 Days") {
    var last7DaysEnd = new Date().toISOString().slice(0, 10);
    var last7DaysStart = new Date();
    last7DaysStart.setDate(last7DaysStart.getDate() - 6);
    output.from_date = last7DaysStart.toISOString().slice(0, 10);
    output.to_date = last7DaysEnd;
  } else if (selectedValue === "Last 30 Days") {
    var last30DaysEnd = new Date().toISOString().slice(0, 10);
    var last30DaysStart = new Date();
    last30DaysStart.setDate(last30DaysStart.getDate() - 29);
    output.from_date = last30DaysStart.toISOString().slice(0, 10);
    output.to_date = last30DaysEnd;
  } else if (selectedValue === "This Month") {
    var thisMonthEnd = new Date().toISOString().slice(0, 10);
    var thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    output.from_date = thisMonthStart.toISOString().slice(0, 10);
    output.to_date = thisMonthEnd;
  } else if (selectedValue === "Last Month") {
    var lastMonthEnd = new Date();
    lastMonthEnd.setDate(0);
    var lastMonthStart = new Date(lastMonthEnd);
    lastMonthStart.setDate(1);
    output.from_date = lastMonthStart.toISOString().slice(0, 10);
    output.to_date = lastMonthEnd.toISOString().slice(0, 10);
  } else if (selectedValue === "Custom Range") {
    $("#customRangeInputs").show();
    return; // Exit the function and wait for user to click "Apply" button
  }

  // Print output to console
  outputs.from_date = output.from_date;
  outputs.to_date = output.to_date;
});

$("#applyCustomRange").on("click", function () {
  var customFromDate = $("#customFromDate").val();
  var customToDate = $("#customToDate").val();

  var output = {
    from_date: customFromDate,
    to_date: customToDate,
  };

  // Print output to console
  console.log(output);
  from_date = output.from_date;
  to_date = output.to_date;
  $("#customRangeInputs").hide();
  Indent_Status();
});
var temp;
function setsomeevent() {
  if (current_page == "Material_Reports") {
    updateDisplay();
    updateDisplay_1();
  } else {
    updateDisplay();
  }
  //alert(current_page);

  $(document).on("change", "#choices_" + current_page, function () {
    // Get the selected value
    selectedValue = parseInt($(this).val()); // Parse the selected value to an integer
    fillters.npp = selectedValue;
    fillters.page = 1;
    left_no = 1;
    right_no = 0;

    // Check if the function exists and is a function
    if (typeof window[current_page] === "function") {
      window[current_page](); // Call the function dynamically
    } else {
      console.log(current_page + " function does not exist");
    }

    // Update right_no based on the new selectedValue
    right_no = left_no + selectedValue - 1;

    updateDisplay();

    // Update the <span> with the selected value
    $("#selectedValue").text(selectedValue);
  });

  $(document).on("change", "#choices_" + current_page + "_1", function () {
    //debugger;
    // Get the selected value
    selectedValue = parseInt($(this).val()); // Parse the selected value to an integer
    fillters.npp = selectedValue;
    fillters.page = 1;
    left_no = 1;
    right_no = 0;

    Material_Summerised_Report_call();

    // Update right_no based on the new selectedValue
    right_no = left_no + selectedValue - 1;

    updateDisplay_1();

    // Update the <span> with the selected value
    $("#selectedValue").text(selectedValue);
  });

  // Get all the span elements inside the dropdown-content class
  const options = document.querySelectorAll(".dropdown-content span");

  // Function to remove active class from all spans
  function removeActiveClass() {
    options.forEach((option) => {
      option.classList.remove("active");
    });
  }

  // check npp and page and filtter date
  if (temp != current_page) {
    temp = current_page;
    selectedValue = 10;
    left_no = 1;
    right_no = selectedValue;
    if (
      current_page == "Indent_Reports" ||
      current_page == "Material_Reports" ||
      current_page == "Stock_Reserved_Reports" ||
      current_page == "STO_Reports"
    ) {
      //365days
      $("#locations").selectpicker("deselectAll");
      $("#indent_status").selectpicker("deselectAll");
      $("#locations").selectpicker("refresh");
      $("#indent_status").selectpicker("refresh");
      outputs.locations = [];
      outputs.indent_status = [];
      var start = moment().subtract(364, "days");
      var end = moment();

      from_date = start.format("YYYY-MM-DD");
      to_date = end.format("YYYY-MM-DD");
      outputs.from_date = from_date;
      outputs.to_date = to_date;

      const defaultDataRangeKey = "Last 365 Days";
      options.forEach((option) => {
        // Check if the current option has the desired data-range-key attribute value
        if (option.getAttribute("data-range-key") === defaultDataRangeKey) {
          removeActiveClass();
          option.classList.add("active");
        }
      });
      const dates = getSelectedDates(defaultDataRangeKey);
      $("#selected-dates").val(dates);

      fillters.location_id = [];
      fillters.from_date = outputs.from_date;
      fillters.to_date = outputs.to_date;
      fillters.indent_status = [];
      fillters.page = 1;
      fillters.npp = 10;
      $("#form-indent_status").css("display", "block");
      $(".form-group").css("display", "block");
    } else if (current_page == "User_Reports") {
      //7 days
      $("#indent_status").selectpicker("deselectAll");
      $("#locations").selectpicker("refresh");
      $("#indent_status").selectpicker("refresh");
      outputs.locations = [];
      outputs.indent_status = [];
      var start = moment().subtract(6, "days");
      var end = moment();

      from_date = start.format("YYYY-MM-DD");
      to_date = end.format("YYYY-MM-DD");
      outputs.from_date = from_date;
      outputs.to_date = to_date;
      fillters.npp = 10;
      fillters.page = 1;

      const defaultDataRangeKey = "Last 7 Days";
      options.forEach((option) => {
        // Check if the current option has the desired data-range-key attribute value
        if (option.getAttribute("data-range-key") === defaultDataRangeKey) {
          removeActiveClass();
          option.classList.add("active");
        }
      });
      const dates = getSelectedDates(defaultDataRangeKey);
      $("#selected-dates").val(dates);

      fillters.location_id = [];
      fillters.from_date = outputs.from_date;
      fillters.to_date = outputs.to_date;
      fillters.indent_status = [];
      fillters.page = 1;
      fillters.npp = 10;
      $(".form-group").css("display", "block");
      $("#form-indent_status").css("display", "block");
    } else if (current_page == "PR_PO_GRN_Reports") {
      //7 days
      $("#indent_status").selectpicker("deselectAll");
      $("#locations").selectpicker("refresh");
      $("#indent_status").selectpicker("refresh");
      outputs.locations = [];
      outputs.indent_status = [];
      var start = moment().subtract(6, "days");
      var end = moment();

      from_date = start.format("YYYY-MM-DD");
      to_date = end.format("YYYY-MM-DD");
      outputs.from_date = from_date;
      outputs.to_date = to_date;

      const defaultDataRangeKey = "Last 7 Days";
      options.forEach((option) => {
        // Check if the current option has the desired data-range-key attribute value
        if (option.getAttribute("data-range-key") === defaultDataRangeKey) {
          removeActiveClass();
          option.classList.add("active");
        }
      });
      const dates = getSelectedDates(defaultDataRangeKey);
      $("#selected-dates").val(dates);

      fillters.location_id = [];
      fillters.from_date = outputs.from_date;
      fillters.to_date = outputs.to_date;
      fillters.indent_status = [];
      fillters.page = 1;
      fillters.npp = 5;
      $(".form-group").css("display", "block");
      $("#form-indent_status").css("display", "none");
    } else if (current_page == "Cost_Reports") {
      //7 days
      $("#indent_status").selectpicker("deselectAll");
      $("#locations").selectpicker("refresh");
      $("#indent_status").selectpicker("refresh");
      outputs.locations = [];
      outputs.indent_status = [];
      var start = moment().subtract(6, "days");
      var end = moment();

      from_date = start.format("YYYY-MM-DD");
      to_date = end.format("YYYY-MM-DD");
      outputs.from_date = from_date;
      outputs.to_date = to_date;

      const defaultDataRangeKey = "Last 7 Days";
      options.forEach((option) => {
        // Check if the current option has the desired data-range-key attribute value
        if (option.getAttribute("data-range-key") === defaultDataRangeKey) {
          removeActiveClass();
          option.classList.add("active");
        }
      });
      const dates = getSelectedDates(defaultDataRangeKey);
      $("#selected-dates").val(dates);

      fillters.location_id = [];
      fillters.from_date = outputs.from_date;
      fillters.to_date = outputs.to_date;
      fillters.indent_status = [];
      fillters.page = 1;
      fillters.npp = 5;
      $(".form-group").css("display", "none");
    }
  }
}

var selectedValue = 10;
// debugger;
if (totalItems == undefined) {
  var left_no = 0;
  var right_no = 0;
} else {
  var left_no = 1;
  var right_no = selectedValue;
}

// Initial display

function chevron_left() {
  if (totalItems == right_no) {
    fillters.page--;
    left_no -= selectedValue;
    right_no = totalItems - (totalItems - left_no + 1) + selectedValue;
    updateDisplay();
  } else if (left_no > 1) {
    fillters.page--;
    left_no -= selectedValue;
    right_no -= selectedValue;
    updateDisplay();
  }
  // Check if the function exists and is a function
  if (typeof window[current_page] === "function") {
    window[current_page](); // Call the function dynamically
  } else {
    console.log(current_page + " function does not exist");
  }
  // Enable the right button since we're moving left
  $("#nextButton_" + current_page).prop("disabled", false);

  // Disable the left button if we're at the beginning
  if (left_no === 1) {
    $("#prevButton_" + current_page).prop("disabled", true);
  }
}
function chevron_left_1() {
  if (totalItems == right_no) {
    fillters.page--;
    left_no -= selectedValue;
    right_no = totalItems - (totalItems - left_no + 1) + selectedValue;
    updateDisplay_1();
  } else if (left_no > 1) {
    fillters.page--;
    left_no -= selectedValue;
    right_no -= selectedValue;
    updateDisplay_1();
  }
  Material_Summerised_Report_call();
  // Enable the right button since we're moving left
  $("#nextButton_" + current_page + "_1").prop("disabled", false);

  // Disable the left button if we're at the beginning
  if (left_no === 1) {
    $("#prevButton_" + current_page + "_1").prop("disabled", true);
  }
}

function chevron_right() {
  if (right_no != totalItems) {
    fillters.page++;
    left_no += selectedValue;
    right_no += selectedValue;

    if (right_no > totalItems) {
      right_no = totalItems;
    }
    updateDisplay();

    // Enable the left button since we're moving right
    $("#prevButton_" + current_page).prop("disabled", false);

    // Disable the right button if we've reached or exceeded totalItems
    // if (right_no === totalItems) {
    //   $("#nextButton").prop("disabled", true);
    // }
    // Check if the function exists and is a function
    if (typeof window[current_page] === "function") {
      window[current_page](); // Call the function dynamically
    } else {
      console.log(current_page + " function does not exist");
    }
  }
}
function chevron_right_1() {
  if (right_no != totalItems) {
    fillters.page++;
    left_no += selectedValue;
    right_no += selectedValue;

    if (right_no > totalItems) {
      right_no = totalItems;
    }
    updateDisplay_1();

    // Enable the left button since we're moving right
    $("#prevButton_" + current_page + "_1").prop("disabled", false);

    Material_Summerised_Report_call();
  }
}
var tempnew = 0;
function updateDisplay() {
  $("#entries_" + current_page).text(left_no + "-" + right_no);
}
function updateDisplay_1() {
  debugger;
  $("#entries_" + current_page + "_1").text(left_no + "-" + right_no);
}

$("#show-table").click(function () {
  $("#table_chartbox").toggle();

  // Update the button text based on the div's visibility
  if ($("#table_chartbox").is(":visible")) {
    $(this).text("Hide");
  } else {
    $(this).text("Show table");
  }
});
var example_indent_status_table;
function Indent_Status() {
  spinner(true);
  current_page = "Indent_Status";

  setsomeevent();
  js.ajax({
    url: Dashboard_API,
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      user_id: User_id,
      from_date: chart_output.from_date,
      to_date: chart_output.to_date,
    }),
    async: false,
    success: function (data) {
      if (data.orders != "") {
        chartdata(data);
        tableshow(data);
      } else {
        chartdata("Nodata");
      }
      setTimeout(() => {
        spinner(false);
      }, 500);
    },
    error: function (err) {
      alert(err);
    },
  });

  function tableshow(data) {
    if (example_indent_status_table) {
      example_indent_status_table.clear().destroy();
    }
    example_indent_status_table = js("#example_indent_status").DataTable({
      data: data.orders,
      bAutoWidth: false,
      scrollCollapse: true,
      // scrollX: true,
      dom: "Bfrtip",
      buttons: [
        {
          extend: "excelHtml5",
          title: "indent-status",
        },
        {
          extend: "csvHtml5",
          title: "indent-status",
        },
      ],
      initComplete: function (settings, json) {
        $("#example_indent_status").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
      searching: false,
      paging: false,
      info: false,
      columns: [
        { data: "address" },
        { data: "Pending", type: "numeric" },
        { data: "Approved", type: "numeric" },
        { data: "Rejected", type: "numeric" },
        { data: "Dispatched", type: "numeric" },
        { data: "Completed", type: "numeric" },
        { data: "PRRaised", type: "numeric" },
        { data: "PORaised", type: "numeric" },
        { data: "GRNDone", type: "numeric" },
        { data: "Return", type: "numeric" },
        { data: "ReturnApproved", type: "numeric" },
        { data: "ReturnCompleted", type: "numeric" },
      ],
    });
  }

  function chartdata(data) {
    // console.log("data->", data);
    var labels_Data = [];
    var datasets = [];
    var obj = {};
    var backgroundColor = [
      "rgb(44 175 254 / 70%)",
      "rgb(84 79 197 / 70%)",
      "rgb(0 226 114 / 70%)",
      "rgb(254 106 53 / 70%)",
      "rgb(213 104 251 / 70%)",
      "rgb(46 224 202 / 70%)",
      "rgb(250 75 66 / 70%)",
      "rgb(0 159 255)",
      "rgb(44 175 254 / 70%)",
      "rgb(145 232 225 / 70%)",
      "rgb(102 102 102 / 70%)",
    ];
    var borderColor = [
      "rgb(44, 175, 254)",
      "rgb(84, 79, 197)",
      "rgb(0, 226, 114)",
      "rgb(254, 106, 53)",
      "rgb(213, 104, 251)",
      "rgb(46, 224, 202)",
      "rgb(250, 75, 66)",
      "rgb(107, 138, 188)",
      "rgb(44, 175, 254)",
      "rgb(145, 232, 225)",
    ];
    if (data !== "Nodata") {
      data.orders.forEach((order) => {
        labels_Data.push(order.address);
        for (const key in order) {
          if (key !== "address") {
            if (!obj[key]) {
              obj[key] = [];
            }
            obj[key].push(order[key]);
          }
        }
      });

      for (const key in obj) {
        datasets.push({
          label: key,
          data: obj[key],
          borderWidth: 1,
          backgroundColor: [backgroundColor[Object.keys(obj).indexOf(key)]],
          borderColor: [borderColor[Object.keys(obj).indexOf(key)]],
        });
      }

      const ctx = document.getElementById("myChart");

      // const dynamicDataLabelPlugin = {
      //   id: "dynamicDataLabel",
      //   afterDatasetsDraw: function (chart, args, options) {
      //     const {
      //       ctx,
      //       scales: { y },
      //     } = chart;

      //     chart.data.datasets.forEach((dataset, datasetIndex) => {
      //       const meta = chart.getDatasetMeta(datasetIndex);
      //       const isVisible = !meta.hidden;

      //       if (isVisible) {
      //         dataset.data.forEach((dataPoint, index) => {
      //           const yValue = meta.data[index].y;
      //           if (yValue > 0) {
      //             const label = options.getLabel(datasetIndex, index);
      //             ctx.save();
      //             ctx.font = "bold 12px sans-serif";
      //             ctx.textAlign = "center";
      //             ctx.fillStyle = options.color || "black";
      //             ctx.fillText(label, meta.data[index].x, yValue - 12);
      //             ctx.restore();
      //           }
      //         });
      //       }
      //     });
      //   },
      // };

      const bgColor = {
        id: "bgColor",
        beforeDraw: (chart, options) => {
          const { ctx, width, height } = chart;
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        },
      };

      const config = {
        type: "bar",
        data: {
          labels: labels_Data,
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
              grace: 4,
            },
          },
          plugins: {
            datalabels: {},
            dynamicDataLabelPlugin: {
              color: "red", // Customize the color here if needed
              getLabel: function (datasetIndex, index) {
                const dataset = config.data.datasets[datasetIndex];
                return dataset.data[index];
              },
            },
          },
        },
        plugins: [ChartDataLabels, bgColor, dynamicDataLabelPlugin],
      };

      if (chart) {
        chart.destroy();
      }

      // Create a new chart instance
      chart = new Chart(ctx, config);
    } else {
      if (chart) {
        chart.destroy();
      }
    }
  }
  // Add an event listener to the button for exporting to PDF
  document
    .getElementById("download-pdf")
    .addEventListener("click", function () {
      // Select the chart canvas element
      const chartCanvas = document.getElementById("myChart");
      console.log(chartCanvas);

      // create image
      const canvaslmage = chartCanvas.toDataURL("image/jpeg", 1.0);
      console.log(canvaslmage);

      const pdf = new jsPDF("landscape");
      pdf.setFontSize(20);
      pdf.addImage(canvaslmage, "JPEG", 15, 15, 280, 150);
      pdf.text(15, 15, "Indent Status");
      pdf.save("chart.pdf");
    });

  // Add an event listener to the download PNG button
  document
    .getElementById("download-png")
    .addEventListener("click", function () {
      // Select the chart canvas element
      const chartCanvas = document.getElementById("myChart");

      // Get the chart's base64 PNG representation
      const chartDataUrl = chart.toBase64Image("image/png");

      // Create a temporary anchor element for downloading
      const downloadLink = document.createElement("a");
      downloadLink.href = chartDataUrl;
      downloadLink.download = "chart.png";
      downloadLink.click();
    });

  // Add an event listener to the download JPG button
  document
    .getElementById("download-jpg")
    .addEventListener("click", function () {
      // Select the chart canvas element
      const chartCanvas = document.getElementById("myChart");

      // Get the chart's base64 JPG representation
      const chartDataUrl = chart.toBase64Image("image/jpeg", 1.0); // 1.0 is the image quality (0.0 to 1.0)

      // Create a temporary anchor element for downloading
      const downloadLink = document.createElement("a");
      downloadLink.href = chartDataUrl;
      downloadLink.download = "chart.jpg";
      downloadLink.click();
    });

  // Add an event listener to the download SVG button

  document
    .getElementById("download-svg")
    .addEventListener("click", function () {
      // Select the chart canvas element
      const chartCanvas = document.getElementById("myChart");

      // Convert the canvas content to an SVG Blob
      chartCanvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "chart.svg";
        downloadLink.click();

        // Release the URL object
        URL.revokeObjectURL(url);
      }, "image/svg+xml");
    });

  // Add an event listener to the download CSV button
  // document
  //   .getElementById("download-csv")
  //   .addEventListener("click", function () {
  //     // Your data array (example)
  //     const data = [
  //       ["Name", "Age", "City"],
  //       ["John", 30, "New York"],
  //       ["Alice", 25, "Los Angeles"],
  //       ["Bob", 35, "Chicago"],
  //     ];

  //     // Convert data to CSV format
  //     const csvContent =
  //       "data:text/csv;charset=utf-8," +
  //       data.map((row) => row.join(",")).join("\n");

  //     // Create a data URI for the CSV content
  //     const encodedUri = encodeURI(csvContent);

  //     // Create a temporary anchor element for downloading
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = encodedUri;
  //     downloadLink.download = "data.csv";
  //     downloadLink.click();
  //   });

  // Add an event listener to the download XLS button
  // Add an event listener to the download XLS button
  // document
  //   .getElementById("download-xls")
  //   .addEventListener("click", function () {
  //     // Your data array (example)
  //     const data = [
  //       ["Name", "Age", "City"],
  //       ["John", 30, "New York"],
  //       ["Alice", 25, "Los Angeles"],
  //       ["Bob", 35, "Chicago"],
  //     ];

  //     // Create a new workbook
  //     const workbook = XLSX.utils.book_new();

  //     // Add a worksheet to the workbook
  //     const worksheet = XLSX.utils.aoa_to_sheet(data);

  //     // Set the worksheet name
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  //     // Write the XLS data as an ArrayBuffer
  //     const xlsBuffer = XLSX.write(workbook, {
  //       bookType: "xlsx",
  //       type: "arraybuffer",
  //     });

  //     // Create a Blob from the ArrayBuffer
  //     const blob = new Blob([xlsBuffer], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });

  //     // Create a URL for the Blob
  //     const url = URL.createObjectURL(blob);

  //     // Create a temporary anchor element for downloading
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = url;
  //     downloadLink.download = "data.xlsx";
  //     downloadLink.click();
  //   });
}

let Indent_Summerised_Report;
let Indent_Report;

function Indent_Reports() {
  spinner(true);
  current_page = "Indent_Reports";
  setsomeevent();

  let array = [];
  let array1 = [];

  setTimeout(() => {
    js.ajax({
      url: indent_report_API,
      type: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        user_id: User_id,
        location_id: fillters.location_id,
        from_date: fillters.from_date,
        to_date: fillters.to_date,
        page: fillters.page,
        npp: fillters.npp,
        indent_status: fillters.indent_status,
      }),
      async: false,
      success: function (data) {
        //console.log("data.orders-->>>>", data);
        totalItems = data.orders.totalItems;
        $("#total_Indent_Reports").text(data.orders.totalItems);
        data.orders.order_result.forEach((data, index) => {
          // Indent_Summerised_Report
          array.push([
            index + 1,
            moment(data.created_at).format("Do MMM YYYY, h:mm:ss a"),
            data.id,
            checkStatusNew(data.order_items, "custom_red"),
            data.total_quantity,
            data.total,
            data.address.plant_id +
              "-" +
              data.address.storage_location +
              "-" +
              data.address.name1,
            data.first_name,
            data.order_items[0].manager_name,
            data.store_address.plant_id +
              "-" +
              data.store_address.storage_location +
              "-" +
              data.store_address.name1,
            data.department,
            data.email,
            data.mobile_no,
          ]);
        });
        // Indent Report
        data.orders.result.forEach((data, index) => {
          const btn =
            "<button class='lable_button " +
            removeSpaceFromColor(data.color) +
            "'>" +
            data.status +
            "</button>";
          array1.push([
            data.order_id,
            data.s_no,
            moment(data.created_at).format("Do MMM YYYY, h:mm:ss a"),
            // data.id,
            data.product_sap_id,
            data.product_name,
            data.base_unit,
            data.quantity,
            data.material_group_sap_id,
            data.material_type_sap_id,
            data.price,
            btn,
            data.manager_name,
            data.manager_approved_at == null
              ? ""
              : moment(data.manager_approved_at).format(
                  "Do MMM YYYY, h:mm:ss a"
                ),
            data.sub_hod_name,
            data.sub_hod_approved_at == null
              ? ""
              : moment(data.sub_hod_approved_at).format(
                  "Do MMM YYYY, h:mm:ss a"
                ),
            data.hod_name,
            data.hod_approved_at == null
              ? ""
              : moment(data.hod_approved_at).format("Do MMM YYYY, h:mm:ss a"),
            data.req_manager_approved_at == null
              ? ""
              : moment(data.req_manager_approved_at).format(
                  "Do MMM YYYY, h:mm:ss a"
                ),
            data.req_manager_approved_remarks == null
              ? ""
              : data.req_manager_approved_remarks,
            data.req_manager_hold_at == null
              ? ""
              : moment(data.req_manager_hold_at).format(
                  "Do MMM YYYY, h:mm:ss a"
                ),
            data.req_manager_hold_remarks == null
              ? ""
              : data.req_manager_hold_remarks,
            data.req_manager_rejected_at == null
              ? ""
              : data.req_manager_rejected_at,
            data.req_manager_rejected_remarks == null
              ? ""
              : data.req_manager_rejected_remarks,
            data.pr_requested_at == null ? "" : data.pr_requested_at,
            data.pr_requested_qty == null ? "" : data.pr_requested_qty,
            data.pr_requested_remarks == null ? "" : data.pr_requested_remarks,
            data.pr_cancelled_at == null ? "" : data.pr_cancelled_at,
            data.pr_cancelled_remarks == null ? "" : data.pr_cancelled_remarks,
            data.pr_rejected_at == null ? "" : data.pr_rejected_at,
            data.pr_rejected_remarks == null ? "" : data.pr_rejected_remarks,
            data.pr_number == null ? "" : data.pr_number,
            data.pr_created_at == null ? "" : data.pr_created_at,
            data.PO_number == null ? "" : data.PO_number,
            data.PO_created_at == null ? "" : data.PO_created_at,
            data.GRN == null ? "" : data.GRN,
            data.GRN_created_at == null ? "" : data.GRN_created_at,
            data.diaspatched_at == null ? "" : data.diaspatched_at,
            data.issued_qty == null ? "" : data.issued_qty,
            data.document_ids == null ? "" : data.document_ids,
            data.document_ids == null ? "" : data.document_ids,
            data.document_ids == null ? "" : data.document_ids,
            data.document_ids == null ? "" : data.document_ids,
            data.order.store_address.plant_id == null
              ? ""
              : data.order.store_address.plant_id,
            data.order.store_address.storage_location == null
              ? ""
              : data.order.store_address.storage_location,
            data.order.address.plant_id == null
              ? ""
              : data.order.store_address.plant_id,
            data.order.address.storage_location == null
              ? ""
              : data.order.address.storage_location,
            data.tracking_no,
            data.first_name,
            data.department,
            data.mobile_no,
            data.email,
            data.section,
            data.reason,
            data.where_used,
          ]);
        });
        IsLoaderFalse();
        //console.log("array1->", array1);
      },
      error: function (err) {
        console.log(err);
        toast("warning", err);
        IsLoaderFalse();
      },
    });
    // Clear the existing Indent_Report DataTable if it exists
    if (Indent_Summerised_Report) {
      Indent_Summerised_Report.clear().destroy();
    }

    Indent_Summerised_Report = js("#Indent_Summerised_Report").DataTable({
      retrieve: true,
      bAutoWidth: true,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      //scrollCollapse: true,
      // scrollX: true,
      paging: true,
      data: array,
      dom: "Bfrtip",
      // buttons: ["copy", "csv", "excel", "pdf", "print"],
      buttons: [
        {
          extend: "excelHtml5",
          title: "Indent Summerised Report ",
        },
      ],
      initComplete: function (settings, json) {
        $("#Indent_Summerised_Report").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });

    // Clear the existing Indent_Report DataTable if it exists
    if (Indent_Report) {
      Indent_Report.clear().destroy();
    }
    Indent_Report = js("#Indent_Report").DataTable({
      retrieve: true,
      bAutoWidth: true,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      //scrollCollapse: true,
      //scrollX: true,
      paging: true,
      dom: "Bfrtip",
      data: array1,

      // buttons: ["copy", "csv", "excel", "pdf", "print"],
      buttons: [
        {
          extend: "excelHtml5",
          title: "Indent Report ",
        },
      ],
      order: [[2, "desc"]],
      initComplete: function (settings, json) {
        $("#Indent_Report").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });

    var array_id = ["Indent_Report", "Indent_Summerised_Report"];
    array_id.forEach((element) => {
      js("#" + element)
        .DataTable()
        .columns()
        .every(function () {
          const column = this;
          column.nodes().to$().css("white-space", "normal", "User_Report");

          if (column.index() === column.columns().indexes().length - 1) {
            column.nodes().to$().addClass("sticky-cell");
            column.nodes().to$().css("background-color", "#efe9e9");
          }
        });
    });
  }, 1000);
}

let table_User_Reports;
let table_User_Summerised_Report;

function User_Reports() {
  spinner(true);
  current_page = "User_Reports";
  setsomeevent();
  var User_Report = [];
  var User_Summerised_Report = [];
  let table_users;
  var users = [];
  setTimeout(() => {
    //User_Report
    js.ajax({
      url: indent_line_item_report_API,
      type: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        user_id: User_id,
        location_id: fillters.location_id,
        from_date: fillters.from_date,
        to_date: fillters.to_date,
        page: fillters.page,
        npp: fillters.npp,
        indent_status: fillters.indent_status,
      }),
      async: false,
      success: function (data) {
        //console.log("data.orders-->>>>", data.orders);
        totalItems = data.orders.totalItems;
        $("#total_User_Reports").text(data.orders.totalItems);
        data.orders.result.forEach((data, index) => {
          //  data.color,
          const btn =
            "<button class='lable_button " +
            removeSpaceFromColor(data.color) +
            "'>" +
            data.status +
            "</button>";
          User_Report.push([
            index + 1,
            data.first_name,
            data.created_by,
            moment(data.created_at).format("Do MMM YYYY"),
            data.order_id,
            btn,
            data.s_no,
            data.product_sap_id,
            data.material_type_sap_id,
            data.material_group_sap_id,
            data.product_name,
            data.intial_qty,
            data.base_unit,
            data.price,
            data.order.store_address.plant_id,
            data.order.store_address.storage_location,
            data.manager_name,
            moment(data.created_at).format("Do MMM YYYY"),
            data.department,
            data.order.address.plant_id,
            data.order.address.storage_location,
            data.order.WBS_NO,
            data.email,
            data.mobile_no,
          ]);
        });
        IsLoaderFalse();
        //console.log("User_Reports-->", User_Report);
      },
      error: function (err) {
        console.log(err);
        toast("warning", err);
        IsLoaderFalse();
      },
    });

    //User_Summerised_Report and users
    js.ajax({
      url: user_report_API,
      type: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        user_id: User_id,
        location_id: fillters.location_id,
        from_date: fillters.from_date,
        to_date: fillters.to_date,
        page: 1,
        npp: 5,
        indent_status: fillters.indent_status,
      }),
      async: false,
      success: function (data) {
        //console.log("data.orders-->>>>", data.orders);
        data.userIndents.forEach((data, index) => {
          User_Summerised_Report.push([
            index + 1,
            data.first_name,
            data.user_id,
            data.indent_count,
            data.total_materials,
            data.Pending,
            data.Approved,
            data.Rejected,
            data.Dispatched,
            data.PRRaised,
            data.PORaised,
            data.GRNDone,
            data.PRRejected,
            data.PRCancelled,
            data.Completed,
            data.Return,
            data.ReturnApproved,
            data.ReturnCompleted,
            data.STORaised,
            data.STODispatched,
            data.STOReceived,
          ]);
        });
        //console.log("User_Summerised_Report-->", User_Summerised_Report);

        data.users.forEach((data, index) => {
          users.push([
            index + 1,
            moment(data.created_at).format("Do MMM YYYY, h:mm:ss"),
            getParseLocation(data.user_location),
            data.first_name,
            data.id,
            data.department_name,
            data.last_login != null
              ? moment(data.last_login).format("Do MMM YYYY, h:mm:ss")
              : "-",
            data.last_logout != null
              ? moment(data.last_logout).format("Do MMM YYYY, h:mm:ss")
              : "-",
          ]);
        });
        //console.log("users-->", users);
      },
      error: function (err) {
        console.log(err);
        toast("warning", err);
        IsLoaderFalse();
      },
    });

    if (table_User_Reports) {
      table_User_Reports.clear().destroy();
    }

    table_User_Reports = js("#User_Reports").DataTable({
      retrieve: true,
      bAutoWidth: false,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      scrollCollapse: true,
      // scrollX: true,
      dom: "Bfrtip",
      paging: true,
      data: User_Report,
      // buttons: ["copy", "csv", "excel", "pdf", "print"],
      buttons: [
        {
          extend: "excelHtml5",
          title: "User Report",
        },
      ],
      initComplete: function (settings, json) {
        $("#User_Reports").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });

    if (table_User_Summerised_Report) {
      table_User_Summerised_Report.clear().destroy();
    }
    table_User_Summerised_Report = js("#User_Summerised_Report").DataTable({
      retrieve: true,
      bAutoWidth: false,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      scrollCollapse: true,
      //scrollX: true,
      paging: true,
      dom: "Bfrtip",
      data: User_Summerised_Report,
      // buttons: ["copy", "csv", "excel", "pdf", "print"],
      buttons: [
        {
          extend: "excelHtml5",
          title: "User Summerised Report",
        },
      ],
      initComplete: function (settings, json) {
        $("#User_Summerised_Report").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });
    if (table_users) {
      table_users.clear().destroy();
    }
    table_users = js("#users").DataTable({
      retrieve: true,
      bAutoWidth: false,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      scrollCollapse: true,
      // scrollX: true,
      paging: true,
      dom: "Bfrtip",
      data: users,
      // buttons: ["copy", "csv", "excel", "pdf", "print"],
      buttons: [
        {
          extend: "excelHtml5",
          title: "Users",
        },
      ],
      initComplete: function (settings, json) {
        $("#users").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });
    var array_id = ["User_Reports", "User_Summerised_Report", "users"];
    array_id.forEach((element) => {
      js("#" + element)
        .DataTable()
        .columns()
        .every(function () {
          const column = this;
          column.nodes().to$().css("white-space", "normal", "User_Report");

          if (column.index() === column.columns().indexes().length - 1) {
            column.nodes().to$().addClass("sticky-cell");
            column.nodes().to$().css("background-color", "#efe9e9");
          }
        });
    });
  }, 1000);
}

let Table_Material_Report;
let Table_Material_Summerised_Report;

function Material_Reports() {
  spinner(true);
  current_page = "Material_Reports";
  setsomeevent();

  setTimeout(() => {
    Material_Report_call();
    Material_Summerised_Report_call();
  }, 1000);
}

function Material_Report_call() {
  let Material_Report = [];
  //Material_Reports
  js.ajax({
    url: indent_line_item_report_API,
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      user_id: User_id,
      location_id: fillters.location_id,
      from_date: fillters.from_date,
      to_date: fillters.to_date,
      page: fillters.page,
      npp: fillters.npp,
      indent_status: fillters.indent_status,
    }),
    async: false,
    success: function (data) {
      //console.log("Material_Reports-->>>>", data);
      totalItems = data.orders.totalItems;
      $("#total_Material_Reports").text(data.orders.totalItems);
      data.orders.result.forEach((data, index) => {
        //  data.color,
        const btn =
          "<button class='lable_button " +
          removeSpaceFromColor(data.color) +
          "'>" +
          data.status +
          "</button>";
        Material_Report.push([
          index + 1,
          moment(data.order.created_at).format("Do MMM YYYY"),
          data.order_id,
          btn,
          data.s_no,
          data.product_sap_id,
          data.material_type_sap_id,
          data.material_group_sap_id,
          data.product_name,
          data.intial_qty,
          data.base_unit,
          data.price,
          data.order.store_address.plant_id,
          data.order.store_address.storage_location,
          data.manager_name,
          moment(data.created_at).format("Do MMM YYYY"),
          data.department,
          data.order.address.plant_id,
          data.order.address.storage_location,
          data.order.WBS_NO,
          data.email,
          data.mobile_no,
        ]);
      });
      IsLoaderFalse();
      //console.log("Material_Report-->", Material_Report);
    },
    error: function (err) {
      console.log(err);
      toast("warning", err);
      IsLoaderFalse();
    },
  });

  if (Table_Material_Report) {
    Table_Material_Report.clear().destroy();
  }

  Table_Material_Report = js("#Material_Report").DataTable({
    retrieve: true,
    bAutoWidth: false,
    fixedColumns: {
      left: 0,
      right: 1,
    },
    columnDefs: [
      {
        defaultContent: "-",
        targets: "_all",
      },
    ],
    scrollCollapse: true,
    //scrollX: true,
    dom: "Bfrtip",
    data: Material_Report,
    buttons: [
      {
        extend: "excelHtml5",
        title: "Material Report",
      },
    ],
    initComplete: function (settings, json) {
      $("#Material_Report").wrap(
        "<div style='overflow:auto; width:100%;position:relative;'></div>"
      );
    },
  });
  var array_id = ["Material_Report"];

  array_id.forEach((element) => {
    js("#" + element)
      .DataTable()
      .columns()
      .every(function () {
        const column = this;
        column.nodes().to$().css("white-space", "normal", "User_Report");

        if (column.index() === column.columns().indexes().length - 1) {
          column.nodes().to$().addClass("sticky-cell");
          column.nodes().to$().css("background-color", "#efe9e9");
        }
      });
  });
}
//Material_Summerised_Report
function Material_Summerised_Report_call() {
  let Material_Summerised_Report = [];
  js.ajax({
    url: material_report_API,
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      user_id: User_id,
      location_id: fillters.location_id,
      from_date: fillters.from_date,
      to_date: fillters.to_date,
      page: fillters.page,
      npp: fillters.npp,
      indent_status: fillters.indent_status,
    }),
    async: false,
    success: function (data) {
      // console.log("Material_Summerised_Report-->>>>", data);
      $("#total_Material_Reports_1").text(data.totalItems);
      data.products.forEach((data, index) => {
        Material_Summerised_Report.push([
          index + 1,
          data.product_sap_id,
          data.product_name,
          data.store_location.plant_id +
            "-" +
            data.store_location.storage_loc +
            "-" +
            data.store_location.name1,
          data.stock,
          moment(data.stock_updated_at).format("DD-MMM-YYYY HH:mm:ss"),
          data.material_type_sap_id,
          data.material_group_sap_id,
          data.quantity,
          data.base_unit,
          data.price,
          data.indent_quantity,
          moment(data.last_indent_created_at).format("DD-MMM-YYYY HH:mm:ss"),
          data.max_qty,
          data.min_qty,
        ]);
      });
      //console.log("Material_Summerised_Report-->", Material_Summerised_Report);
    },
    error: function (err) {
      console.log(err);
      toast("warning", err);
      IsLoaderFalse();
    },
  });
  if (Table_Material_Summerised_Report) {
    Table_Material_Summerised_Report.clear().destroy();
  }

  Table_Material_Summerised_Report = js(
    "#Material_Summerised_Report"
  ).DataTable({
    retrieve: true,
    bAutoWidth: false,
    fixedColumns: {
      left: 0,
      right: 1,
    },
    scrollCollapse: true,
    //scrollX: true,
    dom: "Bfrtip",
    data: Material_Summerised_Report,
    buttons: [
      {
        extend: "excelHtml5",
        title: "Material Summerised Report",
      },
    ],
    initComplete: function (settings, json) {
      $("#Material_Summerised_Report").wrap(
        "<div style='overflow:auto; width:100%;position:relative;'></div>"
      );
    },
  });

  var array_id = ["Material_Summerised_Report"];

  array_id.forEach((element) => {
    js("#" + element)
      .DataTable()
      .columns()
      .every(function () {
        const column = this;
        column.nodes().to$().css("white-space", "normal", "User_Report");

        if (column.index() === column.columns().indexes().length - 1) {
          column.nodes().to$().addClass("sticky-cell");
          column.nodes().to$().css("background-color", "#efe9e9");
        }
      });
  });
}

// i have to checked this method
let Table_PR_PO_GRN_Reports;
let Table_Material_Wise_PR_PO_GRN_Report;

function PR_PO_GRN_Reports() {
  spinner(true);
  // debugger;
  // offcanvas("PR_PO_GRN_Reports");
  current_page = "PR_PO_GRN_Reports";
  setsomeevent();
  let PR_PO_GRN_Reports = [];
  let Material_Wise_PR_PO_GRN_Report = [];

  setTimeout(() => {
    //PR_PO_GRN_Reports
    js.ajax({
      url: pr_report_API,
      type: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        user_id: User_id,
        location_id: [],
        from_date: fillters.from_date,
        //from_date: fillters.from_date,
        to_date: fillters.to_date,
        page: 1,
        npp: 5,
        indent_status: [],
      }),
      async: false,
      success: function (Alldata) {
        console.log("Material_Summerised_Report-->>>>", Alldata);
        // debugger;
        Alldata.result.forEach((data, index) => {
          // if (data.pr_data?.material_sap_id) {
          // console.log(
          //   index,
          //   data?.pr_data ? data.pr_data?.material_sap_id : ">>>"
          // );
          // }

          PR_PO_GRN_Reports.push([
            // getSNo(props.index)
            index + 1,
            moment(data.created_at).format("DD-MMM-YYYY"),
            data.order_id,
            data.s_no,
            data?.pr_data ? data.pr_data?.material_sap_id : "",
            data?.pr_data ? data.pr_data?.material_type_sap_id : "",
            data?.pr_data ? data.pr_data?.material_group_sap_id : "",
            data?.pr_data ? data.pr_data?.name : "",
            data.intial_qty,
            data?.pr_data ? data.pr_data?.base_unit : "",
            data.price,
            data.store_location.plant_id,
            data.store_location.plant_name,
            data.first_name,
            data.manager_name,
            data.department_name,
            data.delivery_location.plant_id,
            data.delivery_location.plant_name,
            data?.pr_data
              ? data.pr_data?.sap_pr_created_at != null
                ? data.pr_data?.sap_pr_created_at
                : ""
              : "",
            data.pr_qty,
            data?.pr_data ? data.pr_data?.sap_pr_no : "",
            data?.pr_data ? data.pr_data?.PO_number : "",
            data?.pr_data ? data.pr_data?.PO_created_at : "",
            data?.pr_data ? data.pr_data?.GRN : "",
            data?.pr_data ? data.pr_data?.GRN_created_at : "",
          ]);
        });
        //console.log("PR_PO_GRN_Reports-->", PR_PO_GRN_Reports);

        //Material_Wise_PR_PO_GRN_Report
        Alldata.result.forEach((data, index) => {
          Material_Wise_PR_PO_GRN_Report.push([
            // getSNo(props.index)
            index + 1,
            data?.pr_data ? data.pr_data?.material_sap_id : "",
            data?.pr_data ? data.pr_data?.name : "",
            data?.pr_data ? data.pr_data?.sap_pr_no : "",
            data?.pr_data ? data.pr_qty : "",
            data?.pr_data ? data.pr_data?.base_unit : "",
            moment(data.created_at).format("DD-MMM-YYYY"),
            data?.pr_data
              ? data.pr_data?.sap_pr_created_at != null
                ? data.pr_data?.sap_pr_created_at
                : ""
              : "",
            data?.pr_data ? data.pr_data?.PO_number : "",
            data?.pr_data ? data.pr_data?.PO_created_at : "",
            data?.pr_data ? data.pr_data?.GRN : "",
            data?.pr_data ? data.pr_data?.GRN_created_at : "",
            data.store_location.plant_id,
            data.store_location.plant_name,
            data.where_used,
            data.remarks,
            data.delivery_priority,
            data.reason,
            data.tracking_no,
          ]);
        });
      },
      error: function (err) {
        console.log(err);
        toast("warning", err);
      },
    });
    if (Table_PR_PO_GRN_Reports) {
      Table_PR_PO_GRN_Reports.clear().destroy();
    }
    Table_PR_PO_GRN_Reports = js("#PR_PO_GRN_Reports").DataTable({
      retrieve: true,
      bAutoWidth: false,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      pageLength: 5,
      //scrollCollapse: true,
      //scrollX: true,
      dom: "Bfrtip",
      data: PR_PO_GRN_Reports,
      buttons: [
        {
          extend: "excelHtml5",
          title: "Indent Wise PR PO GRN Report",
        },
      ],
      initComplete: function (settings, json) {
        $("#PR_PO_GRN_Reports").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });

    //Material_Wise_PR_PO_GRN_Report
    if (Table_Material_Wise_PR_PO_GRN_Report) {
      Table_Material_Wise_PR_PO_GRN_Report.clear().destroy();
    }

    Table_Material_Wise_PR_PO_GRN_Report = js(
      "#Material_Wise_PR_PO_GRN_Report"
    ).DataTable({
      retrieve: true,
      bAutoWidth: false,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      pageLength: 5,
      scrollCollapse: true,
      // scrollX: true,
      dom: "Bfrtip",
      data: Material_Wise_PR_PO_GRN_Report,
      buttons: [
        {
          extend: "excelHtml5",
          title: "Material Wise PR PO GRN Report",
        },
      ],
      initComplete: function (settings, json) {
        $("#Material_Wise_PR_PO_GRN_Report").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });

    var array_id = ["Material_Wise_PR_PO_GRN_Report", "PR_PO_GRN_Reports"];
    array_id.forEach((element) => {
      js("#" + element)
        .DataTable()
        .columns()
        .every(function () {
          const column = this;
          column.nodes().to$().css("white-space", "normal", "User_Report");

          if (column.index() === column.columns().indexes().length - 1) {
            column.nodes().to$().addClass("sticky-cell");
            column.nodes().to$().css("background-color", "#efe9e9");
          }
        });
    });
    IsLoaderFalse();
  }, 2000);
}

let Table_Stock_Reserved_Reports;

function Stock_Reserved_Reports() {
  spinner(true);
  // offcanvas("Stock_Reserved_Reports");
  current_page = "Stock_Reserved_Reports";
  setsomeevent();
  let Stock_Reserved_Reports = [];
  setTimeout(() => {
    //Stock_Reserved_Reports
    js.ajax({
      url: indent_line_item_report_API,
      type: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        user_id: User_id,
        location_id: fillters.location_id,
        from_date: fillters.from_date,
        to_date: fillters.to_date,
        page: fillters.page,
        npp: fillters.npp,
        indent_status: fillters.indent_status,
      }),
      async: false,
      success: function (data) {
        //console.log("Stock_Reserved_Reports-->>>>", data);
        totalItems = data.orders.totalItems;
        $("#total_Stock_Reserved_Reports").text(data.orders.totalItems);
        data.orders.result.forEach((data, index) => {
          //  data.color,
          const btn =
            "<button class='lable_button " +
            removeSpaceFromColor(data.color) +
            "'>" +
            data.status +
            "</button>";
          Stock_Reserved_Reports.push([
            index + 1,
            data.days,
            moment(data.created_at).format("DD-MMM-YYYY"),
            data.order_id,
            data.s_no,
            btn,
            data.product_sap_id,
            data.material_type_sap_id,
            data.material_group_sap_id,
            data.product_name,
            data.remaining_qty,
            // data.intial_qty,
            data.base_unit,
            data.price,
            data.order.store_address.plant_id,
            data.order.store_address.storage_location,
            data.first_name,
            data.manager_name,
            moment(data.created_at).format("DD-MMM-YYYY"),
            data.department,
            data.order.address.plant_id,
            data.order.address.storage_location,
            data.order.WBS_NO,
            data.email,
            data.mobile_no,
          ]);
        });
        //console.log("Stock_Reserved_Reports-->", Stock_Reserved_Reports);
        IsLoaderFalse();
      },
      error: function (err) {
        console.log(err);
        toast("warning", err);
        IsLoaderFalse();
      },
    });
    if (Table_Stock_Reserved_Reports) {
      Table_Stock_Reserved_Reports.clear().destroy();
    }

    Table_Stock_Reserved_Reports = js("#Stock_Reserved_Reports").DataTable({
      retrieve: true,
      bAutoWidth: false,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      scrollCollapse: true,
      //scrollX: true,
      dom: "Bfrtip",
      data: Stock_Reserved_Reports,
      buttons: [
        {
          extend: "excelHtml5",
          title: "Stock Reserved Report ",
        },
      ],
      initComplete: function (settings, json) {
        $("#Stock_Reserved_Reports").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });

    var array_id = ["Stock_Reserved_Reports"];
    array_id.forEach((element) => {
      js("#" + element)
        .DataTable()
        .columns()
        .every(function () {
          const column = this;
          column.nodes().to$().css("white-space", "normal", "User_Report");

          if (column.index() === column.columns().indexes().length - 1) {
            column.nodes().to$().addClass("sticky-cell");
            column.nodes().to$().css("background-color", "#efe9e9");
          }
        });
    });
  }, 1000);
}

let Table_Cost_Reports;
function Cost_Reports() {
  // offcanvas("Cost_Reports");
  spinner(true);
  // offcanvas("Stock_Reserved_Reports");
  current_page = "Cost_Reports";
  setsomeevent();
  let Cost_Reports = [];
  setTimeout(() => {
    //Stock_Reserved_Reports
    var url;
    if (User_role == 1) {
      url = "https://grim.co.in:3002/api/v4/admin/cost_report";
    } else {
      url = "https://grim.co.in:3002/api/v4/admin/cost_report";
    }
    js.ajax({
      url: url,
      type: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        user_id: User_id,
        location_id: fillters.location_id,
        from_date: fillters.from_date,
        to_date: fillters.to_date,
        page: fillters.page,
        npp: fillters.npp,
        indent_status: fillters.indent_status,
      }),
      async: false,
      success: function (data) {
        data.result.forEach((data, index) => {
          const tableRow = "-";
          Cost_Reports.push([
            index + 1,
            data.department_name,
            data.amount,
            tableRow,
            tableRow,
          ]);
        });
        //console.log("Stock_Reserved_Reports-->", Stock_Reserved_Reports);
        IsLoaderFalse();
      },
      error: function (err) {
        console.log(err);
        toast("warning", err);
        IsLoaderFalse();
      },
    });
    if (Table_Cost_Reports) {
      Table_Cost_Reports.clear().destroy();
    }

    Table_Cost_Reports = js("#Cost_Reports").DataTable({
      retrieve: true,
      bAutoWidth: true,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      //scrollCollapse: true,
      //scrollX: true,
      paging: true,
      data: Cost_Reports,
      dom: "Bfrtip",
      buttons: [
        {
          extend: "excelHtml5",
          title: "Department Wise Cost Report ",
        },
      ],
      initComplete: function (settings, json) {
        $("#Cost_Reports").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });

    var array_id = ["Cost_Reports"];
    array_id.forEach((element) => {
      js("#" + element)
        .DataTable()
        .columns()
        .every(function () {
          const column = this;
          column.nodes().to$().css("white-space", "normal", "Cost_Reports");

          if (column.index() === column.columns().indexes().length - 1) {
            column.nodes().to$().addClass("sticky-cell");
            column.nodes().to$().css("background-color", "#efe9e9");
          }
        });
    });
  }, 1000);
}
let Table_STO_Report;
let Table_STO_Summerised_Report;

function STO_Reports() {
  // offcanvas("STO_Reports");
  // STO_Summerised_Report;
  // STO_Report;
  spinner(true);
  // offcanvas("Stock_Reserved_Reports");
  current_page = "STO_Reports";
  setsomeevent();
  let STO_Summerised_Report = [];
  let STO_Report = [];
  setTimeout(() => {
    //Stock_Reserved_Reports
    var url;
    if (User_role == 1) {
      url = "https://grim.co.in:3002/api/v4/admin/indent_report";
    } else {
      url = "https://grim.co.in:3002/api/v4/admin/indent_report";
    }

    js.ajax({
      url: url,
      type: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        user_id: User_id,
        location_id: fillters.location_id,
        from_date: fillters.from_date,
        to_date: fillters.to_date,
        page: fillters.page,
        npp: fillters.npp,
        indent_status: fillters.indent_status,
        type: "STO",
      }),
      async: false,
      success: function (data) {
        totalItems = data.orders.totalItems;
        $("#total_STO_Reports").text(data.orders.totalItems);
        data.orders.order_result.forEach((item, index) => {
          const btn =
            "<button class='lable_button " +
            removeSpaceFromColor(item.color) +
            "'>" +
            item.status +
            "</button>";
          STO_Summerised_Report.push([
            //getSNo(index),
            index + 1,
            moment(item.created_at).format("DD-MMM-YYYY"),
            item.id,
            checkStatusNew(item.order_items, "custom_red"),
            item.total_quantity,
            item.total,
            item.store_address.plant_id +
              " - " +
              item.store_address.storage_location +
              " - " +
              item.store_address.name1,
            item.first_name,
            item.order_items[0].manager_name,
            // moment(item.created_at).format("DD-MMM-YYYY"),
            item.store_address.plant_id +
              " - " +
              item.store_address.storage_location +
              " - " +
              item.store_address.name1,
            item.department,
            item.email,
            item.mobile_no,
          ]);
        });
        data.orders.result.forEach((item, index) => {
          const btn =
            "<button class='lable_button " +
            removeSpaceFromColor(item.color) +
            "'>" +
            item.status +
            "</button>";
          STO_Report.push([
            //getSNo(index),
            index + 1,
            moment(item.created_at).format("DD-MMM-YYYY"),
            item.order_id,
            btn,
            item.s_no,
            item.product_sap_id,
            item.material_type_sap_id,
            item.material_group_sap_id,
            item.product_name,
            item.intial_qty,
            item.base_unit,
            item.price,
            item.order.address.plant_id,
            item.order.address.storage_location,
            item.manager_name,
            // moment(item.created_at).format("DD-MMM-YYYY"),
            item.department,
            item.order.address.plant_id,
            item.order.address.storage_location,
            item.order.WBS_NO,
            item.email,
            item.mobile_no,
            item.tracking_no,
            item.section,
            item.reason,
            item.where_used,
          ]);
        });
        //console.log("Stock_Reserved_Reports-->", Stock_Reserved_Reports);
        IsLoaderFalse();
      },
      error: function (err) {
        console.log(err);
        toast("warning", err);
        IsLoaderFalse();
      },
    });

    if (Table_STO_Report) {
      Table_STO_Report.clear().destroy();
    }

    Table_STO_Report = js("#STO_Report").DataTable({
      retrieve: true,
      bAutoWidth: true,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      pageLength: 5,
      //scrollCollapse: true,
      //scrollX: true,

      paging: true,
      data: STO_Report,
      dom: "Bfrtip",
      buttons: [
        {
          extend: "excelHtml5",
          title: "STO Report",
        },
      ],
      initComplete: function (settings, json) {
        $("#STO_Report").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
      lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, "All"],
      ],
    });

    if (Table_STO_Summerised_Report) {
      Table_STO_Summerised_Report.clear().destroy();
    }

    Table_STO_Summerised_Report = js("#STO_Summerised_Report").DataTable({
      retrieve: true,
      bAutoWidth: true,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      //scrollCollapse: true,
      //scrollX: true,
      paging: true,
      data: STO_Summerised_Report,
      dom: "Bfrtip",
      buttons: [
        {
          extend: "excelHtml5",
          title: "STO Summerised Report ",
        },
      ],
      initComplete: function (settings, json) {
        $("#STO_Summerised_Report").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });
    var array_id = ["STO_Report", "STO_Summerised_Report"];
    array_id.forEach((element) => {
      js("#" + element)
        .DataTable()
        .columns()
        .every(function () {
          const column = this;
          column.nodes().to$().css("white-space", "normal", "Cost_Reports");

          if (column.index() === column.columns().indexes().length - 1) {
            column.nodes().to$().addClass("sticky-cell");
            column.nodes().to$().css("background-color", "#efe9e9");
          }
        });
    });
  }, 1000);
}

function getSNo(index) {
  return index + 1 + pagination.rowsPerPage * (this.pagination.page - 1);
}

function checkStatusNew(order_items, color) {
  var Indent_status;
  if (order_items?.every((element) => element.status == "pending")) {
    Indent_status = "New";
  } else if (
    order_items?.every(
      (element) =>
        element.status == "approved" ||
        element.status == "dispatched" ||
        element.status == "PR Raised"
    )
  ) {
    Indent_status = "Open";
  } else if (order_items?.every((element) => element.status == "Received")) {
    Indent_status = "Close";
  } else if (order_items?.every((element) => element.status == "rejected")) {
    Indent_status = "Rejected";
  } else {
    Indent_status = "Open";
  }

  if (
    order_items?.some(
      (element) =>
        element.status == "Return" ||
        element.status == "Return Approved" ||
        element.status == "Return Completed"
    )
  ) {
    Indent_status = "Return";
  }

  //return Indent_status;
  return (
    //"<button class='lable_button " + color + "'>" + Indent_status + "</button>"
    "<button class='lable_button " +
    removeSpaceFromColor(color) +
    "'>" +
    Indent_status +
    "</button>"
  );
}

function getParseLocation(location) {
  var loc = JSON.parse(location);
  return `${loc.plant_id} - ${loc.storage_location} - ${loc.storage_location_desc}`;
}

var indent_API = host + path + role + "indent_report";
var storeUser_API = host + path + role + "indent_line_item_report";
var Material_API = host + path + role + "material_report";
var StockReserved = host + path + role + "indent_line_item_report";
var pr_report_API = host + path + role + "pr_report";
var indent_line_item_report_API_csv =
  host + path + role + "indent_line_item_report";

$(".Indent_Summerised_Report").on("click", function () {
  api_call(indent_API, "Indent_Summerised_Report");
});

// $(".Indent_Report").on("click", function () {
//   api_call(indent_API, "Indent_Report");
// });

// user_report
$(".User_Reports").on("click", function () {
  api_call(storeUser_API, "User_Reports");
});

$(".User_Summerised_Report").on("click", function () {
  api_call(storeUser_API, "User_Summerised_Report");
});

$(".users").on("click", function () {
  api_call(storeUser_API, "users");
});

$(".Material_Report").on("click", function () {
  api_call(indent_line_item_report_API_csv, "Material_Report");
});
$(".Material_Summerised_Report").on("click", function () {
  api_call(Material_API, "Material_Summerised_Report");
});
$(".PR_PO_GRN__Material_Report").on("click", function () {
  api_call(pr_report_API, "PR_PO_GRN__Material_Report");
});
$(".Stock_Reserved_Material_Report").on("click", function () {
  api_call(StockReserved, "Stock_Reserved_Material_Report");
});
$(".Cost_Reports").on("click", function () {
  api_call(Cost_Reports, "Cost_Reports");
});
$(".STO_Summerised_Report").on("click", function () {
  api_call_STO(indent_API, "STO_Summerised_Report");
});
$(".STO_Reports").on("click", function () {
  api_call_STO(indent_API, "STO_Reports");
});

function api_call(API, name) {
  alert("Please Wait… While data is being fetched from server.");
  // Show the progress bar when the button is clicked
  //$("#progress-bar-container").show();
  $("#progress-bar-container").css("visibility", "visible");

  if (name == "PR_PO_GRN__Material_Report") {
    // var start = moment().subtract(364, "days");
    fillters.from_date = moment().subtract(365, "days").format("YYYY-MM-DD");
  }
  $.ajax({
    url: API,
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      user_id: User_id,
      location_id: fillters.location_id,
      from_date: fillters.from_date,
      to_date: fillters.to_date,
      indent_status: fillters.indent_status,
    }),
    xhrFields: {
      onprogress: function (e) {
        if (e.lengthComputable) {
          var percentComplete = (e.loaded / e.total) * 100;
          $("#progress-bar").css("width", percentComplete + "%");
          $("#data-count").text(parseInt(percentComplete) + " %");
        }
      },
    },
    success: function (response) {
      indents_data = response;
      console.log("API response", response);
      setTimeout(function () {
        $("#progress-bar-container").css("visibility", "hidden");
        $("#progress-bar").css("width", "0");
      }, 500);
      excel_download(response, name);
    },
    error: function (err) {
      conslole(err);
      setTimeout(function () {
        $("#progress-bar-container").css("visibility", "hidden");
        $("#progress-bar").css("width", "0");
      }, 500);
    },
  });
}
function api_call_STO(API, name) {
  alert("Please Wait… While data is being fetched from server.");
  $("#progress-bar-container").css("visibility", "visible");
  if (name == "PR_PO_GRN__Material_Report") {
    // var start = moment().subtract(364, "days");
    fillters.from_date = moment().subtract(365, "days").format("YYYY-MM-DD");
  }
  $.ajax({
    url: API,
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      user_id: User_id,
      location_id: fillters.location_id,
      from_date: fillters.from_date,
      to_date: fillters.to_date,
      indent_status: fillters.indent_status,
      type: "STO",
    }),
    xhrFields: {
      onprogress: function (e) {
        if (e.lengthComputable) {
          var percentComplete = (e.loaded / e.total) * 100;
          $("#progress-bar").css("width", percentComplete + "%");
          $("#data-count").text(parseInt(percentComplete) + " %");
        }
      },
    },
    success: function (response) {
      indents_data = response;
      console.log("API response", response);
      setTimeout(function () {
        //$("#progress-bar-container").hide();
        $("#progress-bar-container").css("visibility", "hidden");
        $("#progress-bar").css("width", "0");
      }, 500);
      excel_download(response, name);
    },
    error: function (xhr, status, error) {
      spinner(false);
      // Handle login error
      console.log("Error: " + error);
      // alert("Login failed. Please try again.");
      toast("warning", "Login failed. Please try again.");
      setTimeout(function () {
        //$("#progress-bar-container").hide();
        $("#progress-bar-container").css("visibility", "hidden");
        $("#progress-bar").css("width", "0");
      }, 500);
    },

    complete: function (xhr, status) {
      spinner(false);
      if (status === "error" || !xhr.responseText) {
        // Handle network or server error
        // alert("Network error. Please try again later.");
        toast("error", "Network error. Please try again later.");
        setTimeout(function () {
          //$("#progress-bar-container").hide();
          $("#progress-bar-container").css("visibility", "hidden");
          $("#progress-bar").css("width", "0");
        }, 500);
      }
    },
  });
}

// for indent_API
// Sample field configuration - Replace this with your actual fields

function excel_download(data, name) {
  if (confirm("Please click on OK, to export the data.")) {
    console.log(data);
    console.log(name);
    var report_check = false;
    // debugger;
    switch (name) {
      case "Indent_Summerised_Report":
        Result = data.orders.order_result;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          //debugger;
          // /var json_fields_sr = Object.keys(Result[0]);
          var indentorders = data.orders.order_result;
          var json_fields_sr = {
            "Indent Date": "created_at",
            "Indent No": "id",
            "Indent Status": (value) => {
              return checkStatusNew_One(value.order_items);
            },
            "Indent Total Quantity": "total_quantity",
            "Indent Price": "total",
            "Indent Location": (value) => {
              return `${value.address.plant_id}-${value.address.storage_location}-${value.address.name1}`;
            },
            "Indent Raised By": "first_name",
            "Approved By": (value) => {
              return `${value.order_items[0].manager_name}`;
            },
            "Approval Date": "created_at",
            "dispatch location": (value) => {
              return `${value.store_address.plant_id}-${value.store_address.storage_location}-${value.store_address.name1}`;
            },
            "Department Name": "department",
            "Indentre Mail ID": "email",
            "Indenter Mobile No": "mobile_no",
          };
        }
        break;
      case "Indent_Report":
        report_check = true;
        Result = data.orders.result;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.orders.result;
          var json_fields_sr = {
            "Indent Date": "created_at",
            "indent No": "order_id",
            "Material Status": "status",
            "Material No": "product_sap_id",
            "Material Category": "material_type_sap_id",
            "Material Group": "material_group_sap_id",
            "Material Name": "product_name",
            "Material Qty": "intial_qty",
            "Material UOM": "base_unit",
            Price: "price",
            "Store Location Code": "order.store_address.plant_id",
            "Store Location Name": "order.store_address.storage_location",
            "Approved By": "manager_name",
            "Approval Date": "created_at",
            "Department Name": "department",
            "Request Location Code": "order.address.plant_id",
            "Request Location Name": "order.address.storage_location",
            "WBS No": "order.WBS_NO",
            "Indentre Mail ID": "email",
            "Indenter Mobile No": "mobile_no",
            "Tracking Plant": "tracking_no",
            "Where in Plant": "section",
            Reason: "reason",
            "Where Used": "where_used",
          };
        }
        break;
      case "User_Reports":
        Result = data.orders.result;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.orders.result;
          var json_fields_sr = {
            "User Name": "first_name",
            "User ID": "created_by",
            "Indent Date": "created_at",
            "indent No": "order_id",
            "Material Status": "status",
            "Material No": "product_sap_id",
            "Material Category": "material_type_sap_id",
            "Material Group": "material_group_sap_id",
            "Material Name": "product_name",
            "Material Qty": "intial_qty",
            "Material UOM": "base_unit",
            Price: "price",
            "Store Location Code": "order.store_address.plant_id",
            "Store Location Name": "order.store_address.storage_location",
            "Approved By": "manager_name",
            "Approval Date": "created_at",
            "Department Name": "department",
            "Request Location Code": "order.address.plant_id",
            "Request Location Name": "order.address.storage_location",
            "WBS No": "order.WBS_NO",
            "Indentre Mail ID": "email",
            "Indenter Mobile No": "mobile_no",
          };
        }
        break;
      case "User_Summerised_Report":
        Result = data.userIndents;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.userIndents;
          var json_fields_sr = {
            "Indenter User Name": "first_name",
            "Indenter User ID": "user_id",
            "Count Of Total Indent": "indent_count",
            "Count Of Total Materials": "total_materials",
            Pending: "Pending",
            Approved: "Approved",
            Rejected: "Rejected",
            Dispatched: "Dispatched",
            PRRaised: "PRRaised",
            "PO Raised": "PORaised",
            "GRN Done": "GRNDone",
            "PR Rejected": "PRRejected",
            Received: "Completed",
            Return: "Return",
            "Return Approved": "ReturnApproved",
            "Return Completed": "ReturnCompleted",
            "STO Raised": "STORaised",
            "STO Dispatched": "STODispatched",
            "STO Received": "STOReceived",
          };
        }
        break;
      case "users":
        Result = data.users;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.users;
          var json_fields_sr = {
            Date: "created_at",
            "Location Name /NO": {
              callback: (value) => {
                return this.getParseLocation(value.user_location);
              },
            },
            "User Name": "first_name",
            "User ID": "id",
            Department: "department_name",
            "Last Login Date/Time": "last_login",
            "Last Logout Date/Time": "last_logout",
          };
        }
        break;
      case "Material_Report":
        Result = data.orders.result;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.orders.result;
          var json_fields_sr = {
            "Indent Date": "created_at",
            "indent No": "order_id",
            "Material Status": "status",
            "Material No": "product_sap_id",
            "Material Category": "material_type_sap_id",
            "Material Group": "material_group_sap_id",
            "Material Name": "product_name",
            "Material Qty": "intial_qty",
            "Material UOM": "base_unit",
            Price: "price",
            "Store Location Code": "order.store_address.plant_id",
            "Store Location Name": "order.store_address.storage_location",
            "Approved By": "manager_name",
            "Approval Date": "created_at",
            "Department Name": "department",
            "Request Location Code": "order.address.plant_id",
            "Request Location Name": "order.address.storage_location",
            "WBS No": "order.WBS_NO",
            "Indentre Mail ID": "email",
            "Indenter Mobile No": "mobile_no",
          };
        }
        break;
      case "Material_Summerised_Report":
        Result = data.products;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.products;
          var json_fields_sr = {
            "Material No": "product_sap_id",
            "Material Name": "product_name",
            "Material Location": {
              callback: (value) => {
                return this.getParseLocation_csv(value.store_location);
              },
            },
            // "store_location.plant_id",
            "Material Current Stock": "stock",
            "Last Stock Update date/time": "stock_updated_at",
            "Material Category": "material_type_sap_id",
            "Material Group": "material_group_sap_id",
            "Material Indent Qty": "quantity",
            "Material UOM": "base_unit",
            Price: "price",
            "Count Of Indent": "indent_quantity",
            "Last Indent Date": "stock_updated_at",
            "Max Qty": "max_qty",
            "Min Qty": "min_qty",
          };
        }
        break;
      case "PR_PO_GRN__Material_Report":
        Result = data.result;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.result;
          var json_fields_sr = {
            "Indent Date": "created_at",
            "Indent No": "order_id",
            "Indent Line Item No": "s_no",
            "Material No": "pr_data.material_sap_id",
            "Material Category": "pr_data.material_type_sap_id",
            "Material Group": "pr_data.material_group_sap_id",
            "Material Name": "pr_data.name",
            "Material Qty": "intial_qty",
            "Material UOM": "pr_data.base_unit",
            Price: "price",
            "Store Location Code": "store_location.plant_id",
            "Store Location Name": "store_location.plant_name",
            "Indenter Name": "first_name",
            "Approved By": "manager_name",
            "Department Name": "department_name",
            "Request Location Code": "delivery_location.plant_id",
            "Request Location Name": "delivery_location.plant_name",
            "PR Date": "pr_data.sap_pr_created_at",
            "PR Quantity": "pr_qty",
            "PR Number": "pr_data.sap_pr_no",
            "PO Number ": "pr_data.PO_number",
            "PO Date ": "pr_data.PO_created_at",
            "GRN Number ": "pr_data.GRN",
            "GRN Date ": "pr_data.GRN_created_at",
          };
        }
        break;
      case "Stock_Reserved_Material_Report":
        Result = data.orders.result;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.orders.result;
          var json_fields_sr = {
            "Stock Reserved in days": "days",
            "Indent Date": "created_at",
            "indent No": "order_id",
            "Material Status": "status",
            "Material No": "product_sap_id",
            "Material Category": "material_type_sap_id",
            "Material Group": "material_group_sap_id",
            "Material Name": "product_name",
            "Material Qty": "intial_qty",
            "Material UOM": "base_unit",
            Price: "price",
            "Store Location Code": "order.store_address.plant_id",
            "Store Location Name": "order.store_address.storage_location",
            "Indenter Name": "first_name",
            "Approved By": "manager_name",
            "Approval Date": "created_at",
            "Department Name": "department",
            "Request Location Code": "order.address.plant_id",
            "Request Location Name": "order.address.storage_location",
            "WBS No": "order.WBS_NO",
            "Indentre Mail ID": "email",
            "Indenter Mobile No": "mobile_no",
          };
        }
        break;
      case "STO_Summerised_Report":
        Result = data.orders.order_result;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.orders.order_result;
          // var json_fields_sr = {
          //   "Indent Date": "created_at",
          //   "Indent No": "id",
          //   "Indent Status": {
          //     callback: (value) => {
          //       return this.checkStatusNew_One(value.order_items);
          //     },
          //   },
          //   "Indent Total Quantity": "total_quantity",
          //   "Indent Price": "total",
          //   "Indent Location": {
          //     callback: (value) => {
          //       return ` ${value.address.plant_id}-${value.address.storage_location}-${value.address.name1}`;
          //     },
          //   },
          //   "Indent Raised By": "first_name",
          //   "Approved By": {
          //     callback: (value) => {
          //       return ` ${value.order_items[0].manager_name}`;
          //     },
          //   },
          //   "Approval Date ": "created_at",
          //   "dispatch location": {
          //     callback: (value) => {
          //       return ` ${value.store_address.plant_id}-${value.store_address.storage_location}-${value.store_address.name1}`;
          //     },
          //   },
          //   "Department Name": "department",
          //   "Indentre Mail ID": "email",
          //   "Indenter Mobile No": "mobile_no",
          // };
          var json_fields_sr = {
            "Indent Date": "created_at",
            "Indent No": "id",
            "Indent Status": (value) => {
              return checkStatusNew_One(value.order_items);
            },
            "Indent Total Quantity": "total_quantity",
            "Indent Price": "total",
            "Indent Location": (value) => {
              return `${value.address.plant_id}-${value.address.storage_location}-${value.address.name1}`;
            },
            "Indent Raised By": "first_name",
            "Approved By": (value) => {
              return `${value.order_items[0].manager_name}`;
            },
            "Approval Date": "created_at",
            "dispatch location": (value) => {
              return `${value.store_address.plant_id}-${value.store_address.storage_location}-${value.store_address.name1}`;
            },
            "Department Name": "department",
            "Indentre Mail ID": "email",
            "Indenter Mobile No": "mobile_no",
          };
        }
        break;
      case "STO_Reports":
        Result = data.orders.result;
        if (Result.length === 0) {
          alert("No Data Found");
        } else {
          var indentorders = data.orders.result;
          var json_fields_sr = {
            "Indent Date": "created_at",
            "indent No": "order_id",
            "Material Status": "status",
            "Material No": "product_sap_id",
            "Material Category": "material_type_sap_id",
            "Material Group": "material_group_sap_id",
            "Material Name": "product_name",
            "Material Qty": "intial_qty",
            "Material UOM": "base_unit",
            Price: "price",
            "Store Location Code": "order.store_address.plant_id",
            "Store Location Name": "order.store_address.storage_location",
            "Approved By": "manager_name",
            "Approval Date": "created_at",
            "Department Name": "department",
            "Request Location Code": "order.address.plant_id",
            "Request Location Name": "order.address.storage_location",
            "WBS No": "order.WBS_NO",
            "Indentre Mail ID": "email",
            "Indenter Mobile No": "mobile_no",
            "Tracking Plant": "tracking_no",
            "Where in Plant": "section",
            Reason: "reason",
            "Where Used": "where_used",
          };
        }
        break;

      default:
        console.log(name);
        break;
    }
    // if (report_check) {
    //   generateCSV(indentorders, indentorders);
    // } else {
    // Generate CSV data
    // const csvContent = generateCSVData(indentorders, json_fields_sr);

    // // Create a Blob and trigger download
    // const encodedUri = encodeURI(csvContent);
    // const link = document.createElement("a");
    // link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
    // link.setAttribute("download", name + ".csv");
    // document.body.appendChild(link);
    // link.click();

    // Generate CSV data (you mentioned you have a function generateCSVData)

    // Function to convert CSV to XLSX
    function convertCSVtoXLSX(csvContent) {
      const csvArray = csvContent.split("\n").map((row) => row.split(","));
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(csvArray);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Create an XLSX file as an array buffer
      const xlsxArrayBuffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });

      // Convert the array buffer to a Blob
      const blob = new Blob([xlsxArrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      return blob;
    }

    // Assuming you have generated CSV content in csvContent
    const csvContent = generateCSVData(indentorders, json_fields_sr);

    // Convert CSV to XLSX
    const xlsxBlob = convertCSVtoXLSX(csvContent);

    // Create a Blob and trigger download for XLSX using FileSaver
    saveAs(xlsxBlob, name + ".xlsx");

    //}

    // Assuming csvContent contains your Excel data

    // Create a Blob with Excel MIME type (application/vnd.ms-excel)
    // var blob = new Blob([csvContent], { type: "application/vnd.ms-excel" });

    // // Create a download link for the Blob
    // var link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);

    // // Set the download attribute to specify the file name with .xls extension
    // link.download = name + ".xls";

    // // Trigger the download
    // link.click();
  }
}

// Sample callback function for "Indent Status"
function checkStatusNew_One(order_items) {
  var Indent_status;
  if (order_items.every((element) => element.status == "pending")) {
    Indent_status = "New";
  } else if (
    order_items.every(
      (element) =>
        element.status == "approved" ||
        element.status == "dispatched" ||
        element.status == "PR Raised"
    )
  ) {
    Indent_status = "Open";
  } else if (order_items.every((element) => element.status == "Received")) {
    Indent_status = "Close";
  } else if (order_items.every((element) => element.status == "rejected")) {
    Indent_status = "Rejected";
  } else {
    Indent_status = "Open";
  }

  if (
    order_items.some(
      (element) =>
        element.status == "Return" ||
        element.status == "Return Approved" ||
        element.status == "Return Completed"
    )
  ) {
    Indent_status = "Return";
  }

  return Indent_status;
}
// Function to generate CSV data
function generateCSVData(data, fields) {
  const csvRows = [];
  debugger;
  // Create header row
  const header = Object.keys(fields);
  csvRows.push(header.join(","));

  // Create data rows
  //console.log(data);
  data.forEach((item) => {
    const row = [];
    //debugger;
    for (const fieldName in fields) {
      const field = fields[fieldName];
      if (typeof field === "function") {
        row.push(field(item));
      } else {
        // debugger;
        if (typeof field === "object") {
          //row.push(item[field]);
          row.push(
            item.store_location?.plant_id +
              "-" +
              item.store_location?.storage_loc +
              "-" +
              item.store_location?.name1
          );
        } else if (typeof field === "string") {
          //debugger;
          // Handle nested fields like "order.store_address.plant_id"
          const fieldParts = field.split(".");
          let value = item;
          console.log(value);
          for (const part of fieldParts) {
            value = value[part];
          }
          row.push(value);
        }
        //row.push(item[field]);
      }
    }

    csvRows.push(row.join(","));
  });

  return csvRows.join("\n");
}

function generateCSV(data, fields) {
  // Create an array to store the CSV rows
  const csvRows = [];

  // Create the header row based on the fields mapping
  const headerRow = Object.keys(fields);
  csvRows.push(headerRow);

  // Iterate through the data and generate CSV rows
  data.forEach((item) => {
    const csvRow = headerRow.map((fieldName) => {
      const field = fields[fieldName];
      if (typeof field === "function") {
        return field(item);
      } else {
        // Split field names by "." to access nested properties
        const fieldNames = fieldName.split(".");
        let value = item;
        for (const name of fieldNames) {
          value = value[name];
        }
        return value;
      }
    });

    csvRows.push(csvRow.join(","));
  });

  // Combine CSV rows into a single string
  const csvContent = csvRows.join("\n");

  // Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  // Create a link to trigger the download
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "export.csv");
  document.body.appendChild(link);
  link.click();

  // Clean up the URL and link
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

function getParseLocation(location) {
  var loc = JSON.parse(location);
  return `${loc.plant_id} - ${loc.storage_location} - ${loc.storage_location_desc}`;
}
function getParseLocation_csv(location) {
  var loc = JSON.parse(location);
  return `${loc.plant_id} - ${loc.storage_loc} - ${loc.name1}`;
}
Indent_Status();
function IsLoaderFalse() {
  setTimeout(() => {
    spinner(false);
  }, 1500);
}
// Indent_Report_download

$(".Indent_Report").on("click", function () {
  var indent_API = host + path + role + "indent_report";
  alert("Please Wait… While data is being fetched from server.");
  $("#progress-bar-container").css("visibility", "visible");
  $.ajax({
    url: indent_API,
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      user_id: User_id,
      location_id: fillters.location_id,
      from_date: fillters.from_date,
      to_date: fillters.to_date,
      indent_status: fillters.indent_status,
    }),
    xhrFields: {
      onprogress: function (e) {
        if (e.lengthComputable) {
          var percentComplete = (e.loaded / e.total) * 100;
          $("#progress-bar").css("width", percentComplete + "%");
          $("#data-count").text(parseInt(percentComplete) + " %");
        }
      },
    },
    success: function (response) {
      console.log("API response", response);
      setTimeout(() => {
        $("#progress-bar-container").css("visibility", "hidden");
        $("#progress-bar").css("width", "0");
      }, 500);
      API_call_report(response);
    },
    error: function (err) {
      setTimeout(() => {
        $("#progress-bar-container").css("visibility", "hidden");
        $("#progress-bar").css("width", "0");
      }, 500);
      conslole(err);
    },
  });
  var array_report = [];
  var table;
  function API_call_report(data) {
    data.orders.result.forEach((data, index) => {
      const btn =
        "<button class='lable_button " +
        removeSpaceFromColor(data.color) +
        "'>" +
        data.status +
        "</button>";
      array_report.push([
        data.order_id,
        data.s_no,
        moment(data.created_at).format("Do MMM YYYY, h:mm:ss a"),
        // data.id,
        data.product_sap_id,
        data.product_name,
        data.base_unit,
        data.quantity,
        data.material_group_sap_id,
        data.material_type_sap_id,
        data.price,
        btn,
        data.manager_name,
        data.manager_approved_at == null
          ? ""
          : moment(data.manager_approved_at).format("Do MMM YYYY, h:mm:ss a"),
        data.sub_hod_name,
        data.sub_hod_approved_at == null
          ? ""
          : moment(data.sub_hod_approved_at).format("Do MMM YYYY, h:mm:ss a"),
        data.hod_name,
        data.hod_approved_at == null
          ? ""
          : moment(data.hod_approved_at).format("Do MMM YYYY, h:mm:ss a"),
        data.req_manager_approved_at == null
          ? ""
          : moment(data.req_manager_approved_at).format(
              "Do MMM YYYY, h:mm:ss a"
            ),
        data.req_manager_approved_remarks == null
          ? ""
          : data.req_manager_approved_remarks,
        data.req_manager_hold_at == null
          ? ""
          : moment(data.req_manager_hold_at).format("Do MMM YYYY, h:mm:ss a"),
        data.req_manager_hold_remarks == null
          ? ""
          : data.req_manager_hold_remarks,
        data.req_manager_rejected_at == null
          ? ""
          : data.req_manager_rejected_at,
        data.req_manager_rejected_remarks == null
          ? ""
          : data.req_manager_rejected_remarks,
        data.pr_requested_at == null ? "" : data.pr_requested_at,
        data.pr_requested_qty == null ? "" : data.pr_requested_qty,
        data.pr_requested_remarks == null ? "" : data.pr_requested_remarks,
        data.pr_cancelled_at == null ? "" : data.pr_cancelled_at,
        data.pr_cancelled_remarks == null ? "" : data.pr_cancelled_remarks,
        data.pr_rejected_at == null ? "" : data.pr_rejected_at,
        data.pr_rejected_remarks == null ? "" : data.pr_rejected_remarks,
        data.pr_number == null ? "" : data.pr_number,
        data.pr_created_at == null ? "" : data.pr_created_at,
        data.PO_number == null ? "" : data.PO_number,
        data.PO_created_at == null ? "" : data.PO_created_at,
        data.GRN == null ? "" : data.GRN,
        data.GRN_created_at == null ? "" : data.GRN_created_at,
        data.diaspatched_at == null ? "" : data.diaspatched_at,
        data.issued_qty == null ? "" : data.issued_qty,
        data.document_ids == null ? "" : data.document_ids,
        data.document_ids == null ? "" : data.document_ids,
        data.document_ids == null ? "" : data.document_ids,
        data.document_ids == null ? "" : data.document_ids,
        data.order.store_address.plant_id == null
          ? ""
          : data.order.store_address.plant_id,
        data.order.store_address.storage_location == null
          ? ""
          : data.order.store_address.storage_location,
        data.order.address.plant_id == null
          ? ""
          : data.order.store_address.plant_id,
        data.order.address.storage_location == null
          ? ""
          : data.order.address.storage_location,
        data.tracking_no,
        data.department,
        data.order.WBS_NO,
        data.email,
        data.mobile_no,
        // data.first_name,
        data.section,
        data.reason,
        data.where_used,
      ]);
    });
    if (table) {
      table.clear().destroy();
    }
    table = js("#Indent_Report_download").DataTable({
      data: array_report,
      dom: "Bfrtip", // Specify the buttons you want to show
      buttons: [
        {
          extend: "excelHtml5", // Use the Excel button
          title: "Indent Report",
          text: "Indent Report",
          className: "btn-primary", // Optional: Add a custom class to the button
        },
      ],
      paging: false, // Optional: Disable pagination
      ordering: false, // Optional: Disable sorting
      info: false, // Optional: Hide table information
      searching: false, // Optional: Disable searching
    });

    // Show the hidden table when clicking the Download Excel button
    if (confirm("Please click on OK, to export the data.")) {
      table.buttons(0).trigger(); // Trigger the Excel button click
    }
  }
});
