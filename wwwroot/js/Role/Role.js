var js = jQuery.noConflict(true);
js(document).ready(function () {
  call();
});
var obj;
// var user_roles = "https://grim.co.in:3003/api/user_roles";
function call() {
  var array = [];
  $.ajax({
    // url: host1 + path1 + "user_roles",
    url : host1 + "/api/v4/user_roles",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      let index = 1;
      obj = data.User_role;
      console.log(data.User_role, '---------data');
      data.User_role.forEach((data) => {
        if (data.id != 1) {
          if (data.status == "1") {
            var d_btn = `<button class="NewBtn Custom-btn common-red-button" onclick="deleteItem(${data.id})">DISABLE</button>`;
          } else {
            var d_btn = `<button class="NewBtn Custom-btn common-blue-button" onclick="deleteItem(${data.id})">ENABLE</button>`;
          }
          const btn = `<button class="NewBtn Custom-btn common-blue-button" onclick="editrole(${data.id})">EDIT</button>&nbsp;&nbsp;${d_btn}`;
          var Active;
          data.status == 1 ? (Active = "Active") : (Active = "Disable");
          array.push([
            index,
            data.role,
            data.description,
            formatDate(data.created_at),
            Active,
            btn,
          ]);
          index++;
        }
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
// for create role
function addrole() {
  Swal.fire({
    title: "Add New Role",
    html:
      '<form class="form" style="display: block;text-align: inherit;">' +
      '<div class="mb-3">' +
      '<label for="itemRole">Role*</label>' +
      '<input id="itemRole" class="form-control"  placeholder="Role" value="">' +
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
      const itemRole = Swal.getPopup().querySelector("#itemRole").value;
      const itemDescription =
        Swal.getPopup().querySelector("#itemDescription").value;
      const itemStatus = Swal.getPopup().querySelector("#itemStatus").value;

      if (!itemRole.match(/^[a-zA-Z ]*$/)) {
        Swal.showValidationMessage("Role name must be alphabates only");
      } else if (!itemRole || !itemDescription) {
        Swal.showValidationMessage("Please fill in all fields");
      }

      return {
        itemRole: itemRole,
        itemDescription: itemDescription,
        itemStatus: itemStatus,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      var newRole = {};
      var text = "Success, Role Added Successfully";
      var url = host1 + "/api/user_roles";
      // You can access the entered values here:
      newRole.role = result.value.itemRole;
      newRole.description = result.value.itemDescription;
      newRole.status = result.value.itemStatus;
      //console.log(newRole);
      $.ajax({
        url: url,
        method: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(newRole),
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

// for edit role
function editrole(id) {
  var m_obj = obj.find((item) => item.id === id);
  // console.log("datatatat", m_obj, id);
  var descriptionvalue = m_obj.description === null ? "" : m_obj.description;
  Swal.fire({
    title: "Edit Role details",
    html:
      '<form class="form" style="display: block;text-align: inherit;">' +
      '<div class="mb-3">' +
      '<label for="itemRole">Role*</label>' +
      '<input id="itemRole" class="form-control" value="' +
      m_obj.role +
      '"  placeholder="Role" value="">' +
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
      const itemRole = Swal.getPopup().querySelector("#itemRole").value;
      const itemDescription =
        Swal.getPopup().querySelector("#itemDescription").value;

      if (!itemRole.match(/^[a-zA-Z ]*$/)) {
        Swal.showValidationMessage("Role name must be alphabates only");
      } else if (!itemRole || !itemDescription) {
        Swal.showValidationMessage("Please fill in all fields");
      }

      return {
        itemRole: itemRole,
        itemDescription: itemDescription,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      var newRole = {};
      var text = "Success, Role Update Successfully";
      var url = host1 + "/api/user_roles/" + id;
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

      var editedRoleRequestObj = {
        description: result.value.itemDescription,
        role: result.value.itemRole,
        updated_at: dateTime,
        updated_by: 1,
      };
      //console.log(newRole);

      $.ajax({
        url: url,
        method: "patch",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(editedRoleRequestObj),
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
      var text = "Success, Role Update Successfully";
      var url = host1 + "/api/user_roles/" + id;

      var editedRoleRequestObj = {
        status: status_value,
        updated_at: dateTime,
        updated_by: 1,
      };

      $.ajax({
        url: url,
        method: "patch",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(editedRoleRequestObj),
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
