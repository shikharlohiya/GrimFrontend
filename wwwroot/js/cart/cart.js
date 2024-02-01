let plantdata = JSON.parse(localStorage.getItem("plant_id"));
if (plantdata) {
  document.getElementById("plant_name").innerHTML =
    plantdata.plant_id +
    "-" +
    plantdata.storage_loc +
    "-" +
    plantdata.storage_location_desc;
}

//ajax of user_store_locations_api start
$.ajax({
  url: user_locations_Api,
  type: "GET",
  contentType: "application/json",
  success: function (response) {
    dropdownfor_user_loc(response);
  },
  error: function (error) {
    console.error("Error creating data on user_store_locations:->>", error);
  },
});

function dropdownfor_user_loc(data) {
  if (data.success === true) {
    var locations = data.locations;
    // console.log("plant_id", locations, plant_id);

    var dropdown = $("#sel2");
    dropdown.append(`<option value="0">Select Delivery Location</option>`);
    locations.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.plant_id,
        text:
          element.plant_id +
          " - " +
          element.storage_loc +
          " - " +
          element.plant_name,
        "data-id": element.id,
      });
      dropdown.append(optionElement);
    });
    setTimeout(() => {
      onetimecall_cart();
    }, 1000);
  }
}

var selectedId;
$("#sel2").change(function () {
  selectedValue = $(this).val();
  var selectedOption = $(this).find("option:selected");
  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    // Remove the first option
    selectedOption.remove();
  } else {
    // Get the value of the data-id attribute
    selectedId = selectedOption.data("id");
    // Print the data-id value

    // console.log("selectedId->>", selectedId);
    // console.log("selectedValue->>", selectedValue);
    WBS_Element_Number(selectedValue);
  }
});

function onetimecall_cart() {
  $("#sel2").selectpicker("deselectAll");
  $("#sel2").selectpicker("refresh");
  $("#sel3").selectpicker("deselectAll");
  $("#sel3").selectpicker("refresh");
}

function WBS_Element_Number(no) {
  spinner(true);
  if (no != "0") {
    $.ajax({
      url: WBS_Element_Number_API + no,
      type: "GET",
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        if (response.success === true) {
          var dropdown = $("#sel3");
          // Remove all existing options from the dropdown  WBS_GENERAL
          dropdown.empty();
          dropdown.append(`<option value="WBS_GENERAL">Search WBS</option>`);

          if (response.wbs_numbers.length > 0) {
            response.wbs_numbers.forEach((element) => {
              const optionElement = $("<option>", {
                value: element.wbs_number,
                text: element.display_name,
              });

              dropdown.append(optionElement);
            });
          } else {
            const optionElement = $("<option>", {
              value: "",
              text: "No data found...",
            });
            dropdown.append(optionElement);
          }
          setTimeout(() => {
            spinner(false);
            onetimecall_cart();
          }, 300);
        }
      },
      error: function (error) {
        console.error("Error creating data on user_store_locations:->>", error);
      },
    });
  } else {
    var dropdown = $("#sel3");
    dropdown.empty();
    const optionElement = $("<option>", {
      value: "",
      text: "No data found...",
    });
    dropdown.append(optionElement);
  }
}

cartshow();

function cartshow() {
  spinner(true);
  document.getElementById("showmsg").innerHTML = "";
  document.getElementById("tbody").innerHTML = "";
  const cartdata = JSON.parse(localStorage.getItem("cart"));

  if (cartdata && cartdata.length > 0) {
    cartdata.forEach((element, index) => {
      tbody(element, index);
      $(document).on("input", ".input1-" + index, function () {
        const currentLength = $(this).val().length;
        const remainingLength = 20 - currentLength;
        const wordCountElement = $(".word-count1-" + index);
        wordCountElement.html(`${currentLength} / 20`);
      });
      $(document).on("input", ".input2-" + index, function () {
        const currentLength = $(this).val().length;
        const remainingLength = 50 - currentLength;
        const wordCountElement = $(".word-count2-" + index);
        wordCountElement.html(`${currentLength} / 50`);
      });
      $(document).on("input", ".input3-" + index, function () {
        const currentLength = $(this).val().length;
        const remainingLength = 100 - currentLength;
        const wordCountElement = $(".word-count3-" + index);
        wordCountElement.html(`${currentLength} / 100`);
      });
      $(document).on("input", ".input4-" + index, function () {
        const currentLength = $(this).val().length;
        const remainingLength = 50 - currentLength;
        const wordCountElement = $(".word-count4-" + index);
        wordCountElement.html(`${currentLength} / 50`);
      });
    });
  } else {
    document.getElementById("tableid").style.display = "none";
    document.getElementById(
      "showmsg"
    ).innerHTML += `<div class="showmsg">Your indent is currently empty.</div> `;
  }
  setTimeout(() => {
    spinner(false);
  }, 500);
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

function tbody(element, sr) {
  //console.log("tbody_", element, sr);
  document.getElementById("tbody").innerHTML += `  
  <tr id="getitem${sr}" data-itemid="${element.id}">
      <td class="vmiddle">
          <div>${sr + 1}</div>
      </td>
      <td class="vmiddle">
          <div>${element.name}</div>
      </td>
      <td> 
          <div>
              <input type="number" min="0.1" step="0.1" class="form-control quantity quantity${sr}" id="${sr}" value="${
    element.quantity
  }"required>
          </div>
      </td>
      <td class="vmiddle">
          <div>
              ₹&nbsp<span id="Tprice${sr}" data-price="${element.price}" >${(
    element.price * element.quantity
  ).toFixed(2)}</span>
          </div>
      </td>
      <td>
          <div>
              <input type="date" class="form-control minDate minDate${sr}" id="minDate${sr}" required>
          </div>
      </td>
      <td>
          <div>
              <div class="">
                  <select class="form-control DeliveryPriority DeliveryPriority${sr}" data-obj="${element}" placeholder="Delivery Priority*" id="${sr}">
                      <option value="0">Delivery Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                  </select>
              <span class="error-msg cartdropbox4" id="DeliveryPriority${sr}" style="display: none;">*The DeliveryPriority field is required.</span>
              </div>
          </div>
      </td>
      <td>
          <div>
              <input type="text" id="Delval${sr}" disabled name="input1" class="form-control" required>
              <p>0 / 2</p>
          </div>
      </td>     
      <td>
          <div>
              <input type="text" class="form-control input1-${sr}" maxlength="20" value="${
    element.tracking_no == undefined || element.tracking_no == null
      ? ""
      : element.tracking_no
  }"  required>
              <p class="word-count1-${sr}">0 / 20</p>
          </div>
      </td>
      <td>
          <div>
              <input type="text" class="form-control input2-${sr}" maxlength="50"  value="${
    element.section == undefined || element.section == null
      ? ""
      : element.section
  }"  required>
          </div>
          <p class="word-count2-${sr}" >0 / 50</p>
      </td>
      <td>
          <div>
              <textarea class="form-control input3-${sr}" rows="1" value=""  min="1" maxlength="100" required>${
    element.reason == undefined || element.reason == null ? "" : element.reason
  }</textarea>
              <p class="word-count3-${sr}"> 0 / 100</p>
          </div>
      </td>
      <td>
          <div>
              <textarea class="form-control input4-${sr}" rows="1" value="" min="1" maxlength="50" required>${
    element.where_used == undefined || element.where_used == null
      ? ""
      : element.where_used
  }</textarea>
              <p class="word-count4-${sr}">0 / 50</p>
          </div>
      </td>
      <td>
          <div>
              <div class="">
                  <select class="form-control Qualitycheckby Qualitycheckby${sr}" data-obj="${element}" placeholder="Quality Check By*"  required>
                      <option value="0">Quality Check By*</option>
                      <option value="User">User</option>
                      <option value="QA Team">QA Team</option>
                      <option value="stores">stores</option>
                  </select>
                <span class="error-msg cartdropbox3" id="Qualitycheckby${sr}" style="display: none;">*The QualityCheckBy field is required.</span>
              </div>
          </div>
      </td>
      <td>
          <div>
              <span><a><span id="${sr}" data-obj="${
    element.id
  }" class="material-symbols-rounded deleteicon">delete</span></a></span>
          </div>
      </td>
  </tr>
`;
}

var form = document.getElementById("formId");
function submitForm(event) {
  event.preventDefault();
}

form.addEventListener("submit", submitForm);

function Pordectorder() {
  var total = 0;

  if (validation()) {
    // get all data from cart page
    let itemsdata = [];
    let special_indent;
    var cartarray = JSON.parse(localStorage.getItem("cart"));
    cartarray.forEach((element, index) => {
      special_indent = element.special_indent ?? "0";
      // console.log(index, "-", $(".quantity" + index).val() * element.price);
      // console.log("up", total);
      total += $(".quantity" + index).val() * element.price;
      // console.log("down", total);
      let itemstempobj = {
        product_id: $("#getitem" + index).data("itemid"),
        product_name: element.name,
        quantity: $(".quantity" + index).val(),
        total_price: element.price * $(".quantity" + index).val(),
        price: element.price,
        delivery_priority: $(".DeliveryPriority" + index).val(),
        remarks: "",
        stock: element.stock,
        bag: element.bag,
        special_indent: element.special_indent ?? "0",
        reason: $(".input3-" + index).val(),
        where_used: $(".input4-" + index).val(),
        section: $(".input2-" + index).val(),
        tracking_no: $(".input1-" + index).val(),
        priority_days: parseInt($("#Delval" + index).val()),
        base_unit: element.base_unit,
        delivery_date: $(".minDate" + index).val(),
        quality_check_by: $(".Qualitycheckby" + index).val(),
        valution_type: element.valution_type,
      };
      itemsdata.push(itemstempobj);
    });
    console.log("total->>", total);

    var temporderobj = {
      order: {
        user_id: Logindata.user[0].id,
        first_name: Logindata.user[0].first_name,
        role_id: Logindata.user[0].role_id,
        plant: plantdata,
        items: itemsdata,
        total: total, //total from all prodects -> items
        address: selectedId,
        special_indent: special_indent,
        WBS_NO: $("#sel3").val(),
        urgent_flag: $("#urgent-indent").is(":checked"),
        delivery_type: $("#sel4").val(),
        ref: "", //??
        ticket_id: "", //??
      },
    };
    //console.log("itemsdata--->>", temporderobj);

    // api call
    $.ajax({
      url: create_orders_API,
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(temporderobj),

      success: function (response) {
        if (response.success === true) {
          toast("success", response.message);
          //console.log("response->>>", response);
          let plantname = JSON.parse(localStorage.getItem("plant_id"));
          setTimeout(() => {
            //remove localstorege cart data
            localStorage.removeItem("cart");
            cartcount1();
            cartshow();
            // Trigger SweetAlert2 dialog when the DOM is loaded
            Swal.fire({
              title: "Order Placed", // Set the title of the dialog
              html: `
              <h2>Hey, ${response.data.first_name}</h2>
              <div style="font-size: 1.4rem;">${
                "Your order id: " +
                response.data.id +
                " is placed and will be delivered from" +
                response.data.plant.plant_id +
                " - " +
                response.data.plant.storage_location_desc +
                " to " +
                plantname.plant_id +
                "-" +
                plantname.storage_location_desc
              }</div>`,
              showCloseButton: true, // Show the close button in the top-right corner
              showCancelButton: true, // Show the cancel button
              confirmButtonText: "Your Next Order", // Text for the first button
              cancelButtonText: "Track Your Order", // Text for the second button
              confirmButtonColor: "#3085d6", // Color for the first button
              cancelButtonColor: "#008000f7", // Color for the second button
              confirmButtonClass: "btn btn-primary", // Custom CSS class for the first button
              cancelButtonClass: "btn btn-success", // Custom CSS class for the second button
              buttonsStyling: true, // Enable the default button styling
              customClass: {
                confirmButton: "btn btn-primary", // Custom class for the first button
                cancelButton: "btn btn-success", // Custom class for the second button
              },
            });

            // Get the confirm button element
            const confirmButton = document.querySelector(".swal2-confirm");

            // Get the cancel button element
            const cancelButton = document.querySelector(".swal2-cancel");

            // Add event listener for the "Your Next Order" button
            confirmButton.addEventListener("click", function () {
              // Redirect to Your Next Order page
              window.location.href = "../Home/NewIndent";
            });

            // Add event listener for the "Track Your Order" button
            cancelButton.addEventListener("click", function () {
              // Redirect to Track Your Order page
              window.location.href = "../Home/MyRequests";
            });
          }, 500);
        }
      },

      error: function (xhr, status, error) {
        if (status === "error") {
          // spinner(false);
          // Handle login error
          console.log("Error: " + error);
          //toast("warning", error);
          toast("error", "Network error. Please try again later.");
        }
      },

      complete: function (xhr, status) {
        // spinner(false);
        if (!xhr.responseText) {
          //toast("error", "Network error. Please try again later.");
        }
      },
    });

    // setTimeout(() => {
    //   //remove localstorege cart data
    //   localStorage.removeItem("cart");
    //   cartcount1();
    //   cartshow();
    // }, 500);
  }
}

function validation() {
  let valid = true;

  if (!Deliverystoredorpdown()) {
    valid = false;
  }
  if (!DeliveryTypedorpdown()) {
    valid = false;
  }
  if (!DeliveryPriority()) {
    valid = false;
  }
  if (!Qualitycheckby()) {
    valid = false;
  }
  if (!minDate()) {
    valid = false;
  }

  return valid;
}

function Deliverystoredorpdown() {
  let Deliverystoredorpdown = $("#sel2").val();
  if (Deliverystoredorpdown != 0) {
    document.getElementById("cartdropbox1").style.display = "none";
    return true;
  } else {
    document.getElementById("cartdropbox1").style.display = "block";
    return false;
  }
}

function DeliveryTypedorpdown() {
  let DeliveryTypedorpdown = $("#sel4").val();
  if (DeliveryTypedorpdown != 0) {
    document.getElementById("cartdropbox2").style.display = "none";
    return true;
  } else {
    document.getElementById("cartdropbox2").style.display = "block";
    return false;
  }
}

function DeliveryPriority() {
  let valid;
  $(".DeliveryPriority").each(function (index) {
    let dorpdownvalDel = $(this).val();
    valid = checkerrormsg(dorpdownvalDel, index, "DeliveryPriority");
  });
  return valid;
}

function Qualitycheckby() {
  let valid;
  $(".Qualitycheckby").each(function (index) {
    let dorpdownvalQua = $(this).val();
    valid = checkerrormsg(dorpdownvalQua, index, "Qualitycheckby");
  });

  return valid;
}

function minDate() {
  var someDate = new Date();
  var numberOfDaysToAdd = 15;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  // console.log(someDate);
  someDate = someDate.toISOString().slice(0, 10);
  let valid = true;
  let date_val;
  $(".minDate").each(function (index) {
    date_val = $("#minDate" + index).val();
  });

  let urgentindent = document.getElementById("urgent-indent").checked
    ? true
    : false;
  console.log("urgentindent", urgentindent);

  if (date_val != "") {
    if (urgentindent) {
      if (
        confirm(
          "This indent will require the approval from operation Director and MD approval"
        )
      ) {
        valid = true;
      } else {
        valid = false;
      }
      // Swal.fire({
      //   title: "Urgent Indent.",
      //   text: "This indent will require the approval from operation Director and MD approval",
      //   icon: "warning",
      //   showCancelButton: true,
      //   confirmButtonText: "Ok",
      //   cancelButtonText: "Cancel",
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     valid = false;
      //   }
      // });
      console.log("urgentindent 1", valid);
    } else {
      if (date_val <= someDate) {
        alert(
          "You selected delivery date within 15 days from now onwards, So please mark it as Urgent Indent."
        );
        valid = false;
      }
    }
  } else {
    toast("error", "please select Delivery Date");
  }
  console.log("urgentindent 2", valid);
  return valid;
}

function checkerrormsg(dorpdownval, index, span_name) {
  let id = span_name + index;
  if (dorpdownval != 0) {
    document.getElementById(id).style.display = "none";
    return true;
  } else {
    document.getElementById(id).style.display = "block";
    return false;
  }
}

// set date forment
var today = new Date().toISOString().split("T")[0];
$(".minDate").each(function (index) {
  $("#minDate" + index).attr("min", today);
});

// on change in dropdown
$(".DeliveryPriority").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    // Remove the first option
    selectedOption.remove();
  }

  $(this).each(function (index) {
    let val = $(this).val();
    let id = $(this).attr("id");
    // console.log(val, id);
    if (val == "High") {
      $("#Delval" + id).val(3);
    } else if (val == "Medium") {
      $("#Delval" + id).val(6);
    } else if (val == "Low") {
      $("#Delval" + id).val(15);
    }
  });
});

$(".quantity").change(function () {
  $(this).each(function (index) {
    let id = $(this).attr("id");
    let price = $("#Tprice" + id).data("price");
    let quantity = $(this).val();
    if (quantity == 0) {
      $(this).val(1); // Set the value to 1
      quantity = 1; // Update the quantity variable
    }
    var total = price * quantity;
    $("#Tprice" + id).text(total);
  });
});

$(".Qualitycheckby").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#sel4").change(function () {
  const selectedOption = $(this).find("option:selected");

  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#sel3").change(function () {
  const selectedOption = $(this).find("option:selected");

  if (selectedOption.index() === 0 && selectedOption.val() === "WBS_GENERAL") {
    selectedOption.remove();
  }
});
// var isChecked;
$("#urgent-indent").change(function () {
  // Get the checked status of the checkbox
  isChecked = $(this).is(":checked");
  console.log(isChecked);
});

//showModal("bodyContent","title","which pop name","otherMessage for id" )
$(document).on("click", ".deleteicon", function () {
  var index = $(this).attr("id");
  var objid = $(this).data("obj");
  console.log(index, objid);
  // showModal(
  //   "Do you really want to remove?",
  //   "Warning",
  //   "s_p_delete",
  //   objid,
  //   "bg-yellow"
  // );
  Swal.fire({
    title: "Do you really want to remove?",
    text: "",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Delete!",
  }).then((result) => {
    if (result.isConfirmed) {
      var getcart = JSON.parse(localStorage.getItem("cart"));
      var filteredArray = getcart.filter(function (obj) {
        return obj.id !== objid;
      });
      // console.log("filteredArray->>>", filteredArray);
      localStorage.setItem("cart", JSON.stringify(filteredArray));
      toast("success", "product removed");
      cartshow();
      cartcount1();
    }
  });
  var getcart = JSON.parse(localStorage.getItem("cart"));
  var filteredArray = getcart.filter(function (obj) {
    return obj.id !== otherMessage;
  });
  // console.log("filteredArray->>>", filteredArray);
  localStorage.setItem("cart", JSON.stringify(filteredArray));
  toast("success", "product removed");
  cartshow();
  cartcount1();
});

function clearcart() {
  // showModal(
  //   "Do you really want to clear the cart ?",
  //   "Clear Cart?",
  //   "clearcart",
  //   "",
  //   "bg-yellow"
  // );
  Swal.fire({
    title: "Do you really want to clear the cart ?",
    text: "",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Clear Cart?",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("cart");
      toast("success", "all product clear");
      cartshow();
      cartcount1();
    }
  });
}

function popClose(name) {
  $("#" + name).modal("hide");
}

function cartcount1() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    if (cart.length == 0) {
      document.getElementById("notifications_cart").style.display = "none";
    } else {
      document.getElementById("notifications_cart").style.display = "block";
      document.getElementById("notifications_cart").innerHTML = cart.length;
    }
  } else {
    document.getElementById("notifications_cart").style.display = "none";
  }
}
