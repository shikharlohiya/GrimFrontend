function checkvendor() {
  var isValid = true;

  // Clear previous error styles and messages
  $(".error-msg").hide();
  $("errmsg").removeClass("error");

  // Validate Vendor Name
  var vendorName = $("input[name='name']").val();
  if (vendorName.trim() === "") {
    $(".error-msg1").addClass("error");
    $(".error-msg1").text("Vendor Name is required.").show();
    isValid = false;
  } else if (vendorName.trim().length < 2) {
    $(".error-msg1").text("Vendor Name must be at least 2 characters.").show();
    $(".error-msg1").addClass("error");
    isValid = false;
  } else {
    $(".error-msg1").removeClass("error");
    $(".error-msg1").css("display", "none");
  }

  // Validate Contact Name
  var contactName = $("input[name='contactname']").val();
  if (contactName.trim() === "") {
    $(".error-msg2").text("Contact Name is required.").show();
    $(".error-msg2").addClass("error");
    isValid = false;
  } else if (contactName.trim().length < 2) {
    $(".error-msg2").text("Contact Name must be at least 2 characters.").show();
    $(".error-msg2").addClass("error");
    isValid = false;
  } else {
    $(".error-msg2").removeClass("error");
    $(".error-msg2").css("display", "none");
  }

  // Validate Mobile Number
  var phoneNumber = $("input[name='phone']").val();
  if (phoneNumber.trim() === "") {
    $(".error-msg3").text("Mobile Number is required.").show();
    $(".error-msg3").addClass("error");
    isValid = false;
  } else if (!/^\d+$/.test(phoneNumber)) {
    $(".error-msg3").text("Mobile Number should only contain numbers.").show();
    $(".error-msg3").addClass("error");
    isValid = false;
  } else if (phoneNumber.length !== 10) {
    $(".error-msg3").text("Mobile Number must be 10 digits.").show();
    $(".error-msg3").addClass("error");
    isValid = false;
  } else {
    $(".error-msg3").removeClass("error");
    $(".error-msg3").css("display", "none");
  }

  // Validate Address
  var address = $("textarea[name='address']").val();
  if (address.trim() === "") {
    $(".error-msg4").text("Address is required.").show();
    $(".error-msg4").addClass("error");
    isValid = false;
  } else if (address.trim() === vendorName.trim()) {
    $(".error-msg4")
      .text("Address should be different from Vendor Name.")
      .show();
    $(".error-msg4").addClass("error");
    isValid = false;
  } else {
    $(".error-msg4").removeClass("error");
    $(".error-msg4").css("display", "none");
  }

  // Validate Remark (optional)
  var remark = $("textarea[name='remark']").val();

  // Return validation result
  return isValid;
}

$("#submit-form").click(function () {
  var newVendorRequestObj;
  if (checkvendor()) {
    console.log("valid");
    vendor_API();
  } else {
    console.log("error");
  }
});

function vendor_API() {
  //debugger;
  $.ajax({
    url: vendors_form_API,
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      user_id: User_id,
      name: document.getElementById("name").value,
      vendor_name: document.getElementById("contactname").value,
      mobile_no: document.getElementById("phone").value,
      address: document.getElementById("Address").value,
      remarks: document.getElementById("Remark").value,
      is_verified: "0",
      created_by: User_id,
    }),
    success: function (response) {
      // Handle the success response here
      console.log("Form submitted successfully!");
      toast("success", "Vendor Details Added Successfully");
      setTimeout(() => {
        location.reload(true);
      }, 1000);
      // You can also display a success message to the user
    },
    error: function (xhr, status, error) {
      // Handle the error response here
      console.error("Form submission failed: " + error);
      toast("error", error);
      // You can display an error message to the user if needed
    },
  });
}

var js = jQuery.noConflict(true);
var vendor_resp;
function vendor() {
  js.ajax({
    url: vendors_Get_API,
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      user_id: User_id,
    }),
    async: false,
    success: function (data) {
      // console.log("data-->>>>", data);
      vendor_resp = data;
      vendor_display(data);
    },
    error: function (err) {
      console.log(err);
      toast("error", error);
    },
  });
}

let Vendor = [];
function vendor_display(data) {
  Vendor = [];
  data.vendors.forEach((data, index) => {
    const btn =
      "<button class='lable_button " +
      removeSpaceFromColor(data.color) +
      "'>" +
      data.status +
      "</button>";
    var icon_edit = "-";
    var icon_delete = "-";
    if (data.status == "pending") {
      icon_edit =
        "<span class='material-symbols-rounded' style='cursor: pointer;' onclick='edit(" +
        data.id +
        ")'>edit</span>";
      icon_delete =
        "<span class='material-symbols-rounded' style='cursor: pointer;' onclick='delete_v(" +
        data.id +
        ")'>delete</span>";
    }
    Vendor.push([
      data.name,
      data.vendor_name,
      data.mobile_no,
      data.address,
      moment(data.created_at).format("Do MMM YYYY, h:mm:ss a"),
      btn,
      icon_edit + "&nbsp;&nbsp;" + icon_delete,
      ,
    ]);
  });

  js("#main-table").DataTable({
    // retrieve: true,
    // bAutoWidth: false,
    // bLengthChange: false,
    fixedColumns: {
      left: 0,
      right: 1,
    },
    scrollCollapse: true,
    searching: false,
    info: false,
    scrollX: true,
    data: Vendor,
    // fixedHeader: true,
    //dom: "Bfrtip",
    // buttons: ["copy", "csv", "excel", "pdf", "print"],
    //buttons: ["excel"],
  });
}

vendor();

function delete_v(id) {
  Swal.fire({
    title: "Are you sure you want to delete?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "red",
    confirmButtonText: "delete!",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Your file has been deleted." + id);
      $.ajax({
        url: vendors_Edit_Delete_API + "/" + id,
        type: "delete",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
          // Handle the success response here
          toast("success", "Vendor Details Successfully Deleted");
          setTimeout(() => {
            location.reload(true);
          }, 1000);
          // You can also display a success message to the user
        },
        error: function (xhr, status, error) {
          // Handle the error response here
          console.error("Form submission failed: " + error);
          toast("error", error);
          // You can display an error message to the user if needed
        },
      });
    }
  });
}

function edit(id) {
  let edit_data;
  // console.log("vendor_resp", vendor_resp);
  vendor_resp.vendors.forEach((data, index) => {
    if (data.id === id) {
      edit_data = data;
      //console.log("RESOLVED", edit_data, data.address, data.manager_remarks);
      $("#Address_edit").val(edit_data.address);
      $("#Remark_edit").val(edit_data.manager_remarks);
    }
  });
  Swal.fire({
    title: "Vendor Edit",
    html: ` <div>
              <div class="form-group-m">
                  <label for="usr">Vendor Name<span>*</span></label>
                  <input type="text" name="name" value="${
                    edit_data.name
                  }" class="form-control" id="name_edit" required>
                  <span class="errmsg error-msg1"></span>
              </div><br>
              <div class="form-group-m">
                  <label for="usr">Contact Name<span>*</span></label>
                  <input type="text" name="contactname" value="${
                    edit_data.vendor_name
                  }" class="form-control" id="contactname_edit" required>
                  <span class="errmsg error-msg2"></span>
              </div><br>
              <div class="form-group-m">
                  <label for="number">Mobile Number<span>*</span></label>
                  <input type="tel" name="phone" id="phone_edit" value="${
                    edit_data.mobile_no
                  }" name="phone" class="form-control" required>
                  <span class="errmsg error-msg3"></span>
              </div><br>
              <div class="form-group-m">
                  <label for="comment">Address<span>*</span></label>
                  <textarea class="form-control" name="address" rows="3" id="Address_edit" required>${
                    edit_data.address
                  }</textarea>
                  <span class="errmsg error-msg4"></span>
              </div><br>
              <div class="form-group-m">
                  <label for="comment">Remark</label>
                  <textarea class="form-control" name="remark" rows="3" id="Remark_edit">${
                    edit_data.manager_remarks == null
                      ? ""
                      : edit_data.manager_remarks
                  }</textarea>
                  <span class="errmsg error-msg5"></span>
              </div>
            </div>`,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    focusConfirm: false,
  }).then(function (result) {
    if (result.value) {
      // console.log("good", edit_data);
      var vendorName = $("#name_edit").val();
      var contactPerson = $("#contactname_edit").val();
      var mobileNumber = $("#phone_edit").val();
      var address = $("#Address_edit").val();
      var remark = $("#Remark_edit").val();
      const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
      var valid = true;
      // Check if required fields are not empty
      if (vendorName === "") {
        alert("Please enter a valid vendor name.");
        valid = false;
      }

      if (contactPerson === "") {
        alert("Please enter a valid contact person name.");
        valid = false;
      }

      if (mobileNumber === "") {
        alert("Please enter a valid mobile number.");
        valid = false;
      }

      if (address === "") {
        alert("Please enter a valid address.");
        valid = false;
      }
      if (remark === "") {
        alert("Please enter a valid remark.");
        valid = false;
      }
      if (valid) {
        $.ajax({
          url: vendors_Edit_Delete_API + "/" + id,
          type: "patch",
          contentType: "application/json;charset=utf-8",
          dataType: "json",
          data: JSON.stringify({
            address: address,
            name: vendorName,
            vendor_name: contactPerson,
            remarks: remark,
            mobile_no: mobileNumber,
            updated_by: User_id,
            updated_at: currentDateTime,
          }),
          success: function (response) {
            // Handle the success response here
            console.log("Form submitted successfully!");
            toast("success", "Vendor Details Successfully updated");
            setTimeout(() => {
              location.reload(true);
            }, 1000);
            // You can also display a success message to the user
          },
          error: function (xhr, status, error) {
            // Handle the error response here
            console.error("Form submission failed: " + error);
            toast("error", error);
            // You can display an error message to the user if needed
          },
        });
      }
    } else if (result.dismiss == "cancel") {
      console.log("cancel");
    }
  });
}
