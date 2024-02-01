var js = jQuery.noConflict(true);
js(document).ready(function () {
  call();
});
var obj;
// var departments = "https://grim.co.in:3002/api/v4/departments";
function call() {
  var array = [];
  $.ajax({
    url: host + path + "departments",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      obj = data.departments;
      data.departments.forEach((data, index) => {
        if (data.status == "1") {
          var d_btn = `<button class="NewBtn Custom-btn common-red-button" onclick="deleteItem(${data.id})">DISABLE</button>`;
        } else {
          var d_btn = `<button class="NewBtn Custom-btn common-blue-button" onclick="deleteItem(${data.id})">Enable</button>`;
        }
        const btn = `<button class="NewBtn Custom-btn common-blue-button" onclick="editDepartment(${data.id})">EDIT</button>&nbsp;&nbsp;${d_btn}`;
        var Active;
        data.status == 1 ? (Active = "Active") : (Active = "Disable");
        array.push([
          index + 1,
          data.department_name,
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
    bDestroy: true,
    scrollCollapse: true,
    scrollX: true,
    dom: "Bfrtip",
    // buttons: ["copy", "csv", "excel", "pdf", "print"],
    buttons: ["excel"],
    pageLength: 100,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, "Todos"],
    ],
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

// for create Department
function addDepartment() {
  Swal.fire({
    title: "Add New Department",
    html:
      '<form class="form" style="display: block;text-align: inherit;">' +
      '<div class="mb-3">' +
      '<label for="itemDepartment">Department*</label>' +
      '<input id="itemDepartment" class="form-control"  placeholder="Department" value="">' +
      "</div>" +
      '<div class="mb-3">' +
      '<label for="itemDescription" class="form-label">Description*</label>' +
      '<textarea class="form-control" placeholder="Description" id="itemDescription" rows="1"></textarea>' +
      "</div>" +
      '<div class="mb-3">' +
      '<label for="itemStatus" class="form-label">Select a Status*</label>' +
      '<select id="itemStatus" class="form-control">' +
      '<option value="1">Active</option>' +
      '<option value="0">Inactive</option>' +
      "</select>" +
      "</div>" +
      "</form>",
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    focusConfirm: false,
    preConfirm: () => {
      const itemDepartment =
        Swal.getPopup().querySelector("#itemDepartment").value;
      const itemDescription =
        Swal.getPopup().querySelector("#itemDescription").value;
      const itemStatus = Swal.getPopup().querySelector("#itemStatus").value;

      if (!itemDepartment.match(/^[a-zA-Z ]*$/)) {
        Swal.showValidationMessage("Department name must be alphabates only");
      } else if (!itemDepartment || !itemDescription) {
        Swal.showValidationMessage("Please fill in all fields");
      }

      return {
        itemDepartment: itemDepartment,
        itemDescription: itemDescription,
        itemStatus: itemStatus,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      var newDepartment = {};
      var text = "Success, Department Added Successfully";
      var url = host1 + "/api/departments";
      // You can access the entered values here:
      newDepartment.department_name = result.value.itemDepartment;
      newDepartment.description = result.value.itemDescription;
      newDepartment.status = parseInt(result.value.itemStatus);
      newDepartment.created_by = 1;
      // console.log(newDepartment);
      $.ajax({
        url: url,
        method: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(newDepartment),
        success: function (response) {
          toast("success", text);
          setTimeout(() => {
            call();
          }, 1500);
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error);
          toast("warning", "Api failed. Please try again.");
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

// for edit Department
function editDepartment(id) {
  // console.log(obj);
  var m_obj = obj.find((item) => item.id === id);
  // console.log("datatatat", m_obj, id);
  var descriptionvalue = m_obj.description === null ? "" : m_obj.description;
  Swal.fire({
    title: "Edit Department details",
    html:
      '<form class="form" style="display: block;text-align: inherit;">' +
      '<div class="mb-3">' +
      '<label for="itemDepartment">Department*</label>' +
      '<input id="itemDepartment" class="form-control" value="' +
      m_obj.department_name +
      '"  placeholder="Department" value="">' +
      "</div>" +
      '<div class="mb-3">' +
      '<label for="itemDescription" class="form-label">Description*</label>' +
      '<textarea class="form-control" placeholder="Description" id="itemDescription" rows="1">' +
      descriptionvalue +
      "</textarea>" +
      "</div>" +
      "</form>",
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    focusConfirm: false,
    preConfirm: () => {
      const itemDepartment =
        Swal.getPopup().querySelector("#itemDepartment").value;
      const itemDescription =
        Swal.getPopup().querySelector("#itemDescription").value;

      if (!itemDepartment.match(/^[a-zA-Z ]*$/)) {
        Swal.showValidationMessage("Department name must be alphabates only");
      } else if (!itemDepartment || !itemDescription) {
        Swal.showValidationMessage("Please fill in all fields");
      }

      return {
        itemDepartment: itemDepartment,
        itemDescription: itemDescription,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      var newDepartment = {};
      var text = "Success, Department Update Successfully";
      var url = host1 + "/api/departments/" + id;
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

      var editedDepartmentRequestObj = {
        description: result.value.itemDescription,
        department_name: result.value.itemDepartment,
        updated_at: dateTime,
        updated_by: 1,
      };
      // console.log(newDepartment);

      $.ajax({
        url: url,
        method: "patch",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(editedDepartmentRequestObj),
        success: function (response) {
          toast("success", text);
          setTimeout(() => {
            call();
          }, 1500);
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error);
          toast("warning", "Api failed. Please try again.");
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

// for deleteItem Department
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

  var item = obj.find((item) => item.id === id);
  // console.log("datatatat", m_obj, id);
  if (item.status == "1") {
    var status = "Disabled";
    var status_value = 0;
    var text = "Disabled Successfully...!";
  } else {
    var status = "Enabled";
    var status_value = 1;
    var text = "Enabled Successfully...!";
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
      var text = "Success, Department Update Successfully";
      var url = host1 + "/api/departments/" + id;

      var editedDepartmentRequestObj = {
        status: status_value,
        updated_at: dateTime,
        updated_by: 1,
      };

      $.ajax({
        url: url,
        method: "patch",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(editedDepartmentRequestObj),
        success: function (response) {
          toast("success", text);
          setTimeout(() => {
            call();
          }, 1500);
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error);
          toast("warning", "Api failed. Please try again.");
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
