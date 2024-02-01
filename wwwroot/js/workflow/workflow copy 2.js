// <!-- jQuery Code to Enable Continue Button -->
$("#workflow-form input, #workflow-form select, #workflow-form textarea").on(
  "input",
  function () {
    if (
      $("#name").val() !== "" &&
      $("#request-type").val() !== "" &&
      $("#status").val() !== "99999" &&
      $("#status").val() !== "0"
      //  && $("#description").val() !== ""
    ) {
      $("#continue-btn").prop("disabled", false);
    } else {
      $("#continue-btn").prop("disabled", true);
    }
  }
);

var middele_t = "";
$("#request-type").on("input", function () {
  // debugger;
  var val = $("#request-type").val().trim();
  if (val == "1" || val == "5") {
    //set input type number 10
    middele_td = `<td>
                      <div>
                          <input type="number" name="amount" class="form-control" max="1000000000" value="" required>
                          <p class="word-count1">0 / 20</p>
                      </div>
                  </td>`;
    $("#middele_td").show().text("Amount");
  } else if (val == "2") {
    //set check box
    middele_td = `<td>
                      <div>
                      <input type="checkbox" name="urgent_flag" class="form-check-input">
                      </div>
                  </td>`;
    $("#middele_td").show().text("Urgent Flag");
  } else if (val == "3" || val == "4") {
    // set none
    middele_td = "";
    $("#middele_td").hide();
  }
});

var Edit = false;
document.getElementById("continue-btn").addEventListener("click", function () {
  var body = $("#Add_Workflow");
  // debugger;
  body.empty();
  if (Edit == false) {
    var table_body = ` <tr>
    <td><span id="sr_num"></span></td>
    <td>
                          <div>
                              <select class="role" name="role_id" form-control" id="role" required>
                              </select>
                              </div>
                      </td>
                      ${middele_td}
                      <td>
                      <div>
                              <input type="number" class="form-control" name="TAT" maxlength="20" value="" required>
                              <p class="word-count1">0 / 20</p>
                              </div>
                              </td>
                              <td>
                              <div>
                              <span role="button" class="material-symbols-rounded delete" style="color: red;">
                              delete
                              </span>
                              <span role="button" class="material-symbols-rounded ml-3 add" onclick="additem()" style="color: blue;">
                              add
                          </span>
                          </div>
                      </td>
                      </tr>`;
    body.append(table_body);
    dropdown_role(drop_role);
    $("#sr_num").text(1);
  }
});

function additem() {
  debugger;
  var currentRow = $(".add").closest("tr"); // Get the current table row
  var newRow = currentRow.clone(); // Clone the current row

  // Clear any user input or update necessary values for the new row
  newRow.find("select").val(""); // Clear the dropdown selection
  newRow.find("input").val(""); // Clear the dropdown selection
  // Get the current value of the input element
  var currentValue = newRow.find("#sr_num").text();

  // Convert the current value to a number (assuming it's a numeric value)
  var numericValue = parseFloat(currentValue);

  // Check if the conversion was successful and numericValue is a valid number
  if (!isNaN(numericValue)) {
    // Increment the numeric value
    numericValue++;

    // Set the updated value back to the input element
    newRow.find("#sr_num").text(numericValue);
  } else {
    // Handle the case where the current value is not a valid number
    console.log("The current value is not a valid number.");
  }

  // You can make additional updates here if needed
  currentRow.find(".add").remove();

  // Append the new row after the current row
  currentRow.after(newRow);
}

$(document).on("click", ".delete", function () {
  var currentRow = $(this).closest("tr"); // Get the current table row
  var previousRow = currentRow.prev("tr"); // Get the row above the current row

  // Remove the current row
  currentRow.remove();
  // Reorder the "sr_num" values in the remaining rows
  $("table tr").each(function (index) {
    // Skip the header row if needed
    if (index === 0) return;

    // Update the "sr_num" value
    var numericValue = index;
    $(this).find("#sr_num").text(numericValue);
  });

  // Add both "add" and "delete" icons to the row above
  previousRow
    .find(".material-symbols-rounded")
    .removeClass("add")
    .addClass("delete add");
});

function save_data() {
  var trId = "#Add_Workflow";
  var inputData = [];
  var isValid = true;

  // Validation function for the form fields
  function validateForm() {
    isValid = true; // Reset the validation flag

    // Validate the 'name' field
    var name = $("#name").val().trim();
    if (name === "") {
      alert("Name is required.");
      isValid = false;
    }

    // Validate the 'service_id' field
    var serviceId = $("#request-type").val().trim();
    if (serviceId === "") {
      alert("Service ID is required.");
      isValid = false;
    }

    // Validate the 'status' field
    var status = $("#status").val().trim();
    if (status === "") {
      alert("Status is required.");
      isValid = false;
    }

    // Additional validation rules can be added here if needed

    return isValid;
  }

  // Check form validation
  if (!validateForm()) {
    return; // Exit the function if validation fails
  }

  // Validate each <tr> within the table
  $("table tr").each(function () {
    var $tr = $(this);
    var inputObj = {};
    var isRowValid = true;

    $tr.find("input, select").each(function () {
      var inputName = $(this).attr("name");
      var inputValue;

      if ($(this).is(":checkbox")) {
        inputValue = $(this).is(":checked");
      } else {
        inputValue = $(this).val();
      }

      inputObj[inputName] = inputValue;

      // Additional validation for specific fields within each <tr>
      if (inputName === "some_field_name") {
        // Example validation for a specific field
        if (inputValue === "") {
          alert("Field is required for this row.");
          isRowValid = false;
        }
      }

      // You can add more field-specific validations here
    });

    if (isRowValid) {
      if (Object.keys(inputObj).length > 0) {
        inputData.push(inputObj);
      }
    } else {
      isValid = false; // Set the overall validation flag to false if any row is invalid
    }
  });

  if (!isValid) {
    return; // Exit the function if row-level validation fails
  }

  var obj = {
    actions: inputData,
    name: $("#name").val().trim(),
    service_id: $("#request-type").val().trim(),
    status: $("#status").val().trim(),
    description: $("#description").val(),
    created_by: User_id,
  };
  console.log(obj);
  // Make the API call only if validation passed
  $.ajax({
    url: "https://grim.co.in:3002/api/v4/service_details",
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify(obj_temp),
    async: false,
    success: function (data) {
      console.log("data", data);
    },
    error: function (err) {
      alert(err);
    },
  });
}

$(document).ready(function () {
  let currentStep = 1;

  // Show the current step
  function showStep(step) {
    $(".step").removeClass("active");
    $(`#step${step}`).addClass("active");
  }

  // Step 1: Continue to Step 2
  $("#continue-btn").click(function () {
    if (Edit) {
      currentStep = 2;
      showStep(currentStep);
    }
  });

  // Step 2: Go back to Step 1
  $("#prev-step-2").click(function () {
    currentStep = 1;
    showStep(currentStep);
  });

  // Enable Finish button in Step 2
  $('#step2 select, #step2 input[type="text"], #step2 textarea').on(
    "input",
    function () {
      const inputsFilled = $(
        '#step2 select, #step2 input[type="text"], #step2 textarea'
      )
        .toArray()
        .every((input) => $(input).val() !== "");
      if (inputsFilled) {
        $("#finish-step-2").prop("disabled", false);
      } else {
        $("#finish-step-2").prop("disabled", true);
      }
    }
  );
});

var js = jQuery.noConflict(true);
js(document).ready(function () {
  Add();
  services();
  user_roles();
});
var service_details_data = [];
var service_details = "https://grim.co.in:3002/api/v4/service_details";
function Add() {
  var array = [];
  $.ajax({
    url: service_details,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      service_details_data = data.services;
      data.services.forEach((data, index) => {
        const btn = `<button class="NewBtn Custom-btn common-blue-button" data-toggle="modal" data-target="#workflowModal"  onclick="editItem(${data.id})" value="${data.id}">EDIT</button>&nbsp;&nbsp;<button class="NewBtn Custom-btn common-green-button" onclick="handleDETAILS(${data.service_id})" value="${data.id}">DETAILS</button>`;
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

  js("#Userlist").DataTable({
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
function clear_data() {
  Edit = false;
  // debugger;
  $("#name").val("");
  $("#request-type").val("");
  $("#status").val("");
  $("#description").val("");
  $("#continue-btn").prop("disabled", true);
  $("#workflowModalLabel").text("Create Workflow Details");
}
function editItem(id) {
  Edit = true;
  $("#workflowModalLabel").text("Edit Workflow Details");
  const data = service_details_data.filter((obj) => obj.id === id);
  console.log("data-", data);
  $("#continue-btn").prop("disabled", false);
  data.forEach((element) => {
    // debugger;
    $("#name").val(element.name);
    $("#request-type").val(element.service_id).change();
    $("#status").val(element.status);
    $("#description").val(element.description);
    var val = $("#request-type").val();
    var body = $("#Add_Workflow");
    body.empty();
    let lastElement = element.actions[element.actions.length - 1];
    element.actions.forEach((data, index) => {
      if (val == "1" || val == "5") {
        //set input type number 10
        middele_td = `<td>
                        <div>
                            <input type="number" name="amount" class="form-control" max="1000000000" value="" required>
                            <p class="word-count1">0 / 20</p>
                        </div>
                    </td>`;
        $("#middele_td").show().text("Amount");
      } else if (val == "2") {
        //set check box
        // debugger;
        if (data.urgent_flag == 1) {
          middele_td = `<td>
          <div>
            <input type="checkbox" id="checkbox${index}" name="urgent_flag" checked class="form-check-input">
            </div>
          </td>`;
        } else {
          middele_td = `<td>
                        <div>
                        <input type="checkbox" id="checkbox${index}" name="urgent_flag"  class="form-check-input">
                        </div>
                    </td>`;
        }

        $("#middele_td").show().text("Urgent Flag");
      } else if (val == "3" || val == "4") {
        // set none
        middele_td = "";
        $("#middele_td").hide();
      }
      var add_icon = "";
      if (lastElement == index) {
        add_icon =
          '<span role="button" class="material-symbols-rounded ml-3 add" onclick="additem()" style="color: blue;">add</span>';
      }
      var table_body = ` <tr>
                          <td>
                            <span id="sr_num">${index + 1}</span></td>
                          <td>
                            <div>
                                <select class="role" name="role_id" form-control" id="role${index}" required></select>
                                </div>
                                  </td>
                                    ${middele_td}
                                  <td>
                                <div>
                                <input type="number" class="form-control" name="TAT" maxlength="20" value="${
                                  data.TAT
                                }" required>
                                <p class="word-count1">0 / 20</p>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span role="button" class="material-symbols-rounded delete" style="color: red;">delete</span>
                             ${add_icon}
                            </div>
                          </td>
                        </tr>`;

      $("#role" + index)
        .val(data.role_id)
        .change();
      dropdown_role(drop_role);
      body.append(table_body);
    });
  });
}

function services() {
  var services = "https://grim.co.in:3002/api/v4/services";
  $.ajax({
    url: services,
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
  var user_roles =
    "https://grim.co.in:3003/api/user_roles?_where=(status,eq,1)";
  $.ajax({
    url: user_roles,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (response) {
      drop_role = response;
      dropdown_role(response);
    },
    error: function (err) {
      alert(err);
    },
  });
}

function dropdown_role(response) {
  var selectDropdown = $(".role");
  // selectDropdown.append(`<option value="">Select Role</option>`);
  response.forEach((element) => {
    if (element.role != "admin" && element.role != "Indent User") {
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

// $(document).on("change", "#request-type" + index, function () {
//   selectedValue = $(this).val();
//   var selectedOption = $(this).find("option:selected");
//   // Check if it is the first option with a value of 0
//   if (selectedOption.index() === 0 && selectedOption.val() === "0") {
//     // Remove the first option
//     selectedOption.remove();
//   } else {
//     // Get the value of the data-id attribute
//     selectedId = selectedOption.data("id");
//   }
// });

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
