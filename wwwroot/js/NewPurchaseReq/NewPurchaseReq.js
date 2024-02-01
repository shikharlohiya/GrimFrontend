$(document).ready(function () {
  // Add event listener to form submission
  $("form").submit(function (event) {
    // Prevent form submission
    event.preventDefault();

    // Perform validation
    var isValid = true;

    $("input, select, textarea", this).each(function () {
      if ($(this).val().trim() === "") {
        $(this).addClass("error");
        isValid = false;
      } else {
        $(this).removeClass("error");
      }

      if ($(this).is("select") && $(this).val() === "0") {
        $(this).addClass("error");
        isValid = false;
      }
    });

    // If any field is empty or has a select value of 0, stop form submission
    if (!isValid) {
      return;
    }

    // If all validation passes, submit the form
    //this.submit();
    callnewPurchReq();
  });
});

$("#Materialgroup").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#UnitOfMeasure").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#SelectLocation").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

function callnewPurchReq() {
  //alert("callnewPurchReq");
  var newProductRequestObj = {
    product_name: $("#MaterialName").val(),
    product_description: $("#MaterialDescription").val(),
    status: 1,
    user_id: User_id,
    location: parseInt($("#SelectLocation").val()),
    product_group_id: $("#Materialgroup").val(),
    base_unit: $("#UnitOfMeasure").val(),
    role_id: User_role,
    batch_management: $("#checkbox_b").prop("checked"),
    moving_price: $("#Movingprice").val(),
  };

  $.ajax({
    // url: "https://grim.co.in:3002/api/v4/code_creation",
    url: host + path + "code_creation",
    method: "POST",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify(newProductRequestObj),
    success: function (response) {
      if (response.success === true) {
        service_requests(response);
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      setTimeout(() => {
        // spinner(false);
      }, 300);
      toast("warning", "Api failed. Please try again.");
    },
    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        setTimeout(() => {
          // spinner(false);
        }, 300);
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

var item_group = "https://grim.co.in:3002/api/v4/item_group";
var Unitofmeasure = "https://grim.co.in:3002/api/v4/uom";
var user_locations = "https://grim.co.in:3002/api/v4/user_locations?id=";

function NewPurchaseReq_API(API, name) {
  $.ajax({
    url: API,
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      if (response.success === true) {
        if (name == "item_group") {
          item_group_dropdown(response);
        } else if (name == "uom") {
          UnitOfMeasure_dropdown(response);
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
      console.error("Error :->>", error);
    },
  });
}

NewPurchaseReq_API(item_group, "item_group");
NewPurchaseReq_API(Unitofmeasure, "uom");

function item_group_dropdown(res) {
  //console.log(val.material_group_sap_description);
  var dropdown = $("#Materialgroup");
  dropdown.empty();
  dropdown.append(`<option value="0">Group of Material</option>`);
  res.item_group.forEach((val) => {
    const optionElement = $("<option>", {
      value: val.material_group_sap_id,
      text: val.material_group_sap_description,
    });
    dropdown.append(optionElement);
  });
}

function UnitOfMeasure_dropdown(res) {
  var dropdown = $("#UnitOfMeasure");
  dropdown.empty();
  dropdown.append(`<option value="0">Unit Of Measure</option>`);
  res.unit_of_measure.forEach((val) => {
    const optionElement = $("<option>", {
      value: val.uom_description,
      text: val.uom_description + "(" + val.uom + ")",
    });
    dropdown.append(optionElement);
  });
}

function call() {
  $.ajax({
    url: user_locations + User_id,
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      if (response.success === true) {
        //console.log("response", response);
        user_locations_dropdown(response);
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
      console.error("Error :->>", error);
    },
  });
}
call();

function user_locations_dropdown(res) {
  var dropdown = $("#SelectLocation");
  dropdown.empty();
  dropdown.append(`<option value="0"> Select Location</option>`);
  res.locations.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.id,
      text:
        element.plant_id +
        "-" +
        element.storage_loc +
        "-" +
        element.storage_location_desc,
    });
    dropdown.append(optionElement);
  });
}
