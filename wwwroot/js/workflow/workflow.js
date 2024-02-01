var js = jQuery.noConflict(true);

// Function to adjust table columns based on Request Type
var urgentFlagHeader_show;
var amountHeader_show;
function adjustTableColumns() {
  var requestType = $("#request-type").val();
  var amountHeader = $("#amountHeader");
  var urgentFlagHeader = $("#urgentFlagHeader");

  // Reset headers and hide/show columns based on Request Type
  amountHeader.hide();
  urgentFlagHeader.hide();

  urgentFlagHeader_show = false;
  amountHeader_show = false;

  if (requestType === "1" || requestType === "5") {
    // Show the "Amount" column
    amountHeader.show();
    amountHeader_show = true;
  } else if (requestType === "2") {
    // Show the "Urgent Flag" column
    $("#urgentFlagHeader").css("display", "table-cell");
    urgentFlagHeader_show = true;
  }
}

// Define an array of options
// var roleOptions = [
//   { value: "2", label: "Indent Manager" },
//   { value: "4", label: "Store Manager" },
//   // Add more options here
// ];
// Function to generate a new row in the table
function addTableRow() {
  var table = $("#editTable tbody");
  var rowCount = table.find("tr").length;
  var newRow = "<tr>" + "<td>" + (rowCount + 1) + "</td>" + "<td>";

  // Add a select dropdown with options from an array
  newRow += '<select class="form-control role" name="role_id" required>';

  //Generate options based on the array
  for (var i = 0; i < roleOptions.length; i++) {
    newRow +=
      '<option value="' +
      roleOptions[i].value +
      '">' +
      roleOptions[i].label +
      "</option>";
  }

  newRow += "</select> </td>";

  if (urgentFlagHeader_show === true) {
    newRow +=
      "<td>" +
      '<input type="checkbox" class="form-check-input" name="urgent_flag">' +
      "</td>";
  } else if (amountHeader_show === true) {
    newRow +=
      "<td>" +
      '<input type="number" class="form-control" name="amount" required oninput="checkInput(this, 10)">' +
      "<span>0/10</span>" +
      "</td>";
  } else {
    newRow += ""; // Empty cell
  }

  newRow +=
    "<td>" +
    '<input type="number" class="form-control tat_hrs" name="TAT" required oninput="checkInput(this, 2)">' +
    "<span>0/2</span>" +
    "</td>" +
    "<td>";
  if (rowCount != 0) {
    newRow +=
      '<span role="button" class="material-symbols-rounded delete" style="color: red;">delete</span>' +
      "  ";
  }
  if (rowCount === 0) {
    newRow +=
      '<span role="button" class="material-symbols-rounded addRowBtn" style="color: blue;">add</span>';
  }
  newRow += "</td>" + "</tr>";

  table.append(newRow);
}

// Event listener for adding new rows when clicking the "add" button
$("#editTable tbody").on("click", ".addRowBtn", function () {
  if (ifedit) {
    // debugger;
    addActionRow(dropdown_id.service_id);
  } else {
    addTableRow();
  }
});

// Function to delete a row and renumber the "Sr No." column
function deleteTableRow(row) {
  $(row).remove(); // Remove the row

  // Update "Sr No." column numbers
  var table = $("#editTable tbody");
  var rows = table.find("tr");
  rows.each(function (index) {
    $(this)
      .find("td:first")
      .text(index + 1);
  });
}

// Event listener for deleting rows when clicking the "delete" span
$("#editTable tbody").on("click", ".delete", function () {
  Swal.fire({
    title: "Do you really want to remove?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes",
    cancelButtonText: "No", // Add "No" button
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTableRow($(this).closest("tr"));
    }
  });
});

// Event listener for "Next" button in Step 1
$("#nextBtn").on("click", function () {
  // Validate Step 1 input fields
  if (validateStep1()) {
    $("#step1").hide();
    $("#step2").show();
    $("#prevBtn").show();
    $("#nextBtn").hide();
    $("#saveBtn").show();
    if (ifedit != true) {
      var table = $("#editTable tbody");
      table.empty();
      addTableRow(); // Add the initial row when transitioning to Step 2
    }
  }
});

// Event listener for "Previous" button in Step 2
$("#prevBtn").on("click", function () {
  $("#step2").hide();
  $("#step1").show();
  $("#prevBtn").hide();
  $("#nextBtn").show();
  $("#saveBtn").hide();
});

function clear_data() {
  // debugger;
  ifedit = false;
  $("#name").val("");
  $("#request-type").val("");
  $("#status").val("");
  $("#description").val("");
  $("#nextBtn").prop("disabled", true);
  $("#workflowModalLabel").text("Create Workflow Details");

  //for rest step
  $("#step2").hide();
  $("#step1").show();
  $("#prevBtn").hide();
  $("#nextBtn").show();
  $("#saveBtn").hide();

  $("#saveBtn").text("Save");
  $("#request-type").prop("disabled", false);
}
var ifedit = false;
var edit_data;
var actionData;
function editItem(id) {
  var table = $("#editTable tbody");
  table.empty();
  //for rest step
  $("#step2").hide();
  $("#step1").show();
  $("#prevBtn").hide();
  $("#nextBtn").show();
  $("#saveBtn").hide();

  ifedit = true;
  $("#workflowModalLabel").text("Edit Workflow Details");
  $("#saveBtn").text("Update");
  const data = service_details_data.filter((obj) => obj.id === id);
  edit_data = data;
  // console.log("data-", data);
  // debugger;
  $("#nextBtn").prop("disabled", false);
  $("#request-type").prop("disabled", true);
  data.forEach((element) => {
    $("#name").val(element.name);
    $("#request-type").val(element.service_id).change();
    $("#status").val(element.status);
    $("#description").val(element.description);
    //set in table data
    element.actions.forEach((actionData) => {
      addActionRow(actionData);
      dropdown_id = actionData;
    });
  });
}

// Function to add a row to the table with action data
function addActionRow(actionData) {
  // debugger;
  // console.log("actionData", typeof actionData);
  const obj = typeof actionData;
  if (obj == "object") {
    var table = $("#editTable tbody");
    var rowCount = table.find("tr").length;

    var newRow = "<tr>" + "<td>" + (rowCount + 1) + "</td>" + "<td>";

    // Assuming 'role_id' is a property in the actionData object
    newRow += '<select class="form-control role" name="role_id" required>';

    // Generate options based on the array of roleOptions
    for (var i = 0; i < roleOptions.length; i++) {
      // Check if the role_id matches the selected value
      var isSelected =
        roleOptions[i].value === actionData.role_id ? "selected" : "";
      newRow +=
        '<option value="' +
        roleOptions[i].value +
        '" ' +
        isSelected +
        ">" +
        roleOptions[i].label +
        "</option>";
    }

    newRow += "</select></td>";
    if (actionData.service_id == 2) {
      // Check if 'urgent_flag' is true in the actionData object
      if (actionData.urgent_flag) {
        newRow +=
          '<td><input type="checkbox" class="form-check-input" name="urgent_flag" checked> </td>';
      } else {
        newRow +=
          '<td><input type="checkbox" class="form-check-input" name="urgent_flag"> </td>';
      }
    } else if (actionData.service_id == 1 || actionData.service_id == 5) {
      // Check if 'amount' is present in the actionData object
      if (actionData.amount !== undefined) {
        newRow +=
          '<td><input type="number" class="form-control amount" name="amount" value="' +
          actionData.amount +
          '" oninput="checkInput(this, 10)" required><span>0/10</span></td>';
      } else {
        newRow +=
          '<td><input type="number" class="form-control amount" name="amount" oninput="checkInput(this, 10)" required><span>0/10</span></td>';
      }
    }

    newRow +=
      "<td>" +
      '<input type="number" class="form-control tat_hrs" name="TAT" value="' +
      actionData.TAT +
      '" required  oninput="checkInput(this, 2)">' +
      "<span>0/2</span>" +
      "</td>" +
      "<td>";
    if (rowCount != 0) {
      newRow +=
        '<span role="button" class="material-symbols-rounded delete" style="color: red;">delete</span>' +
        "  ";
    } else {
      newRow +=
        '<span role="button" class="material-symbols-rounded addRowBtn" style="color: blue;">add</span>';
    }
    newRow += "</td>" + "</tr>";

    table.append(newRow);
  } else {
    // if not a object
    var table = $("#editTable tbody");
    var rowCount = table.find("tr").length;

    var newRow = "<tr>" + "<td>" + (rowCount + 1) + "</td>" + "<td>";

    // Assuming 'role_id' is a property in the actionData object
    newRow += '<select class="form-control role" name="role_id" required>';

    // Generate options based on the array of roleOptions
    for (var i = 0; i < roleOptions.length; i++) {
      // Check if the role_id matches the selected value
      var isSelected =
        roleOptions[i].value === actionData.role_id ? "selected" : "";
      newRow +=
        '<option value="' +
        roleOptions[i].value +
        '" ' +
        isSelected +
        ">" +
        roleOptions[i].label +
        "</option>";
    }

    newRow += "</select></td>";
    if (actionData == 2) {
      // Check if 'urgent_flag' is true in the actionData object
      if (actionData.urgent_flag) {
        newRow +=
          '<td><input type="checkbox" class="form-check-input" name="urgent_flag" checked> </td>';
      } else {
        newRow +=
          '<td><input type="checkbox" class="form-check-input" name="urgent_flag"> </td>';
      }
    } else if (actionData == 1 || actionData == 5) {
      // Check if 'amount' is present in the actionData object
      if (actionData.amount !== undefined) {
        newRow +=
          '<td><input type="number" class="form-control amount" name="amount" value="' +
          actionData.amount +
          '" oninput="checkInput(this, 10)" required><span>0/10</span></td>';
      } else {
        newRow +=
          '<td><input type="number" class="form-control amount" name="amount" oninput="checkInput(this, 10)" required><span>0/10</span></td>';
      }
    }

    newRow +=
      "<td>" +
      '<input type="number" class="form-control tat_hrs" name="TAT" value="' +
      actionData.TAT +
      '" required  oninput="checkInput(this, 2)">' +
      "<span>0/2</span>" +
      "</td>" +
      "<td>";
    if (rowCount != 0) {
      newRow +=
        '<span role="button" class="material-symbols-rounded delete" style="color: red;">delete</span>' +
        "  ";
    } else {
      newRow +=
        '<span role="button" class="material-symbols-rounded addRowBtn" style="color: blue;">add</span>';
    }
    newRow += "</td>" + "</tr>";

    table.append(newRow);
  }
}

// Function to adjust table columns based on Request Type
function adjustTableColumns() {
  var requestType = $("#request-type").val();
  var amountHeader = $("#amountHeader");
  var urgentFlagHeader = $("#urgentFlagHeader");

  // Reset headers and hide/show columns based on Request Type
  amountHeader.hide();
  urgentFlagHeader.hide();

  urgentFlagHeader_show = false;
  amountHeader_show = false;

  if (requestType === "1" || requestType === "5") {
    // Show the "Amount" column
    amountHeader_show = true;
    amountHeader.show();
  } else if (requestType === "2") {
    // Show the "Urgent Flag" column
    urgentFlagHeader_show = true;
    urgentFlagHeader.show();
  }
}

// Function to validate Step 1 input fields
function validateStep1() {
  var isNameValid = $("#name").val().trim() !== "";
  var isRequestTypeValid = $("#request-type").val() !== "";
  var isStatusValid = $("#status").val() !== "99999";

  return isNameValid && isRequestTypeValid && isStatusValid;
}

// Add event listener to "Request Type" dropdown for dynamic table columns
$("#request-type").on("change", function () {
  adjustTableColumns();
});

// Event listener for "Next" button in Step 1
$("#nextBtn").on("click", function () {
  // Validate Step 1 input fields
  if (validateStep1()) {
    $("#step1").hide();
    $("#step2").show();
    $("#prevBtn").show();
    $("#nextBtn").hide();
    $("#saveBtn").show();
  }
});

// Event listener for "Previous" button in Step 2
$("#prevBtn").on("click", function () {
  $("#step2").hide();
  $("#step1").show();
  $("#prevBtn").hide();
  $("#nextBtn").show();
  $("#saveBtn").hide();
});

// Function to validate table row data
function validateTableData() {
  //alert("validateTableData");
  // debugger;
  var isValid = true;
  $("#editTable tbody tr").each(function () {
    var row = $(this);
    var selectInput = row.find("select");
    var checkboxInput = row.find("input[type='checkbox']");
    var numberInput = row.find(".amount");
    var tat_hrs = row.find(".tat_hrs");

    // Example validation: Check if a select dropdown has a value selected
    if (selectInput.length > 0 && selectInput.val() === "") {
      isValid = false;
      alert("Please select a value in the dropdown.");
      return false; // Exit the loop if validation fails
    }

    // Example validation: Check if a number input is empty or not a number
    if (numberInput.length > 0) {
      var numberValue = parseFloat(numberInput.val());
      if (isNaN(numberValue) || numberValue < 0) {
        isValid = false;
        alert("Please enter a valid amount number.");
        return false; // Exit the loop if validation fails
      }
    }

    if (tat_hrs.length > 0) {
      var numberValue = parseFloat(tat_hrs.val());
      if (isNaN(numberValue) || numberValue < 0) {
        isValid = false;
        alert("Please enter a valid tat_hrs number.");
        return false; // Exit the loop if validation fails
      }
    }

    // Add more validations as needed
  });

  return isValid;
}

// Add event listener to "Save" button (Step 2)
$("#saveBtn").click(function () {
  // Perform save operation here
  var isValid = validateTableData();

  if (isValid) {
    var tableData = collectTableData();
    // Now, tableData contains all the values from the table rows as an array of objects
    // console.log("tableData", tableData);
    // You can perform further processing or send this data as needed
    if (ifedit == false) {
      var data_obj = {
        actions: tableData,
        description: $("#description").val(),
        status: parseInt($("#status").val()),
        service_id: parseInt($("#request-type").val()),
        name: $("#name").val(),
        created_by: 1,
      };
    } else {
      edit_data;
      edit_data.forEach((element) => {
        element.name = $("#name").val();
        element.description = $("#description").val();
        // element.updated_at = "";
        //debugger;
        element.status = $("#status").val();
        element.actions = tableData;
        element.actions.forEach((data, index) => {
          if (element.service_id == 1 || element.service_id == 5) {
            data.role_id = tableData[index].role_id;
            data.amount = tableData[index].amount;
            data.TAT = parseInt(tableData[index].TAT);
            data.updated_at = new Date().toISOString();
          } else if (element.service_id == 2) {
            data.role_id = tableData[index].role_id;
            data.urgent_flag = tableData[index].urgent_flag;
            data.TAT = parseInt(tableData[index].TAT);
            data.updated_at = new Date().toISOString();
          } else {
            data.updated_at = new Date().toISOString();
            data.TAT = parseInt(tableData[index].TAT);
          }
        });
      });
    }
    // debugger;
    //alert("Data saved successfully");
    //console.log("data_obj", data_obj);
    // console.log("edit_data", edit_data);
    if (ifedit) {
      //alert("final edit api call");
      var playLoad = edit_data[0];
      var mothod = "PUT";
    } else {
      var playLoad = data_obj;
      var mothod = "POST";
    }
    // alert("api call");
    // alert("api call");
    // alert("api call");
    js.ajax({
      // url: "https://grim.co.in:3002/api/v4/service_details",
      url: host + path + "service_details",
      type: mothod,
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify(playLoad),
      async: false,
      success: function (data) {
        // console.log("success");
        toast("success", data.message);
        setTimeout(() => {
          Add();
          //js("#addModal").hide();
          js("#addModal").modal({ backdrop: "static", keyboard: false });
          var cancelButton = document.getElementById("cancelModalBtn");
          if (cancelButton) {
            cancelButton.click(); // Trigger the click event on the Cancel button
          }

          // var modal = document.getElementById("addModal");
          // $(modal).modal("hide");
        }, 500);
      },
      error: function (err) {
        console.log(err);
        $("#addModal").hide();
        toast("error", err);
      },
    });
  }
  // You can perform further processing or send this data as needed
  // Close the modal or perform other actions as needed
  //$("#addModal").modal("hide");
});

// Function to collect table row values into an object
function collectTableData() {
  // debugger;
  var tableData = [];
  $("#editTable tbody tr").each(function () {
    var rowData = {};
    $(this)
      .find("select, input[type='checkbox'], input[type='number']")
      .each(function () {
        var name = $(this).attr("name");
        var value = $(this).val();
        if ($(this).is(":checkbox")) {
          value = $(this).is(":checked");
        }
        if (name == "role_id") {
          value = parseInt(value);
        }
        rowData[name] = value;
      });
    tableData.push(rowData);
  });
  return tableData;
}

// Example code for enabling/disabling "Next" button based on validation
$("#name, #request-type, #status").on("input change", function () {
  // Validate your input fields here
  var isNameValid = $("#name").val().trim() !== "";
  var isRequestTypeValid = $("#request-type").val() !== "";
  var isStatusValid = $("#status").val() !== "99999";

  // Enable or disable "Next" button based on validation
  if (isNameValid && isRequestTypeValid && isStatusValid) {
    $("#nextBtn").prop("disabled", false);
  } else {
    $("#nextBtn").prop("disabled", true);
  }
});

js(document).ready(function () {
  Add();
  services();
  user_roles();
});
var service_details_data = [];
// var service_details = "https://grim.co.in:3002/api/v4/service_details";
var Userlist_table;
function Add() {
  var array = [];
  $.ajax({
    url: host + path + "service_details",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      service_details_data = data.services;
      data.services.forEach((data, index) => {
        const btn = `<button class="NewBtn Custom-btn common-blue-button" data-toggle="modal" data-target="#addModal" onclick="editItem(${data.id})" value="${data.id}">EDIT</button>&nbsp;&nbsp;<button class="NewBtn Custom-btn common-green-button" onclick="handleDETAILS(${data.service_id})" value="${data.id}">DETAILS</button>`;
        var Active;
        data.status == 1 ? (Active = "Active") : (Active = "Disable");
        array.push([
          index + 1,
          data.name,
          data.service_name,
          data.description,
          formatDate(data.created_at),
          Active,
          btn,
        ]);
      });
      //console.log("array->", array);
    },
    error: function (err) {
      alert(err);
    },
  });
  if (Userlist_table) {
    Userlist_table.clear().destroy();
  }
  Userlist_table = js("#Userlist").DataTable({
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
    buttons: ["excel"],
    pageLength: 5,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, "Todos"],
    ],
  });
}

function services() {
  // var services = "https://grim.co.in:3002/api/v4/services";
  $.ajax({
    url: host + path + "services",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      var selectDropdown = $("#request-type");
      selectDropdown.append(`<option value="">Select Request</option>`);
      response.services.forEach((element) => {
        selectDropdown.append(
          $("<option>", {
            value: element.id,
            text: element.service_name,
          })
        );
      });
    },
    error: function (err) {
      alert(err);
    },
  });
}

var drop_role;
function user_roles() {
  // var user_roles =
  //   "https://grim.co.in:3003/api/user_roles?_where=(status,eq,1)";
  $.ajax({
    url: host1 + path1 + "user_roles?_where=(status,eq,1)",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (response) {
      drop_role = response;
      dropdown_role();
    },
    error: function (err) {
      alert(err);
    },
  });
}
var roleOptions = [];
function dropdown_role() {
  var selectDropdown = $(".role");
  // selectDropdown.append(`<option value="">Select Role</option>`);
  drop_role.forEach((element) => {
    if (element.role != "admin" && element.role != "Indent User") {
      roleOptions.push({ value: element.id, label: element.role });
      selectDropdown.append(
        $("<option>", {
          value: element.id,
          text: element.role,
        })
      );
    }
  });
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

function handleDETAILS(id) {
  //alert("call");
  window.location.href = "./Workflow_details/" + id;
}

$("#request-type").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "") {
    selectedOption.remove();
  }
});

$("#status").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "99999") {
    selectedOption.remove();
  }
});

function checkInput(input, maxLength) {
  // Get the current value of the input field
  let value = input.value;

  // Limit the input to the specified maximum length
  if (value.length > maxLength) {
    value = value.substring(0, maxLength);
  }

  // Update the input field with the cleaned value
  input.value = value;

  // Update the character count
  const characterCount = value.length;
  const characterCountSpan = input.nextElementSibling;
  characterCountSpan.textContent = characterCount + "/" + maxLength;
}
