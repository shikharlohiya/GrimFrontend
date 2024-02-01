var headers = [
  {
    text: "",
    align: "left",
    value: "",
  },
  {
    text: "S NO",
    align: "left",
    value: "",
  },
  {
    text: "Name",
    align: "left",
    value: "first_name",
  },
  {
    text: "Material Name",
    align: "left",
    value: "product_name",
  },
  { text: "plant Id", value: "plant_id" },
  { text: "indent Id", value: "indent_id" },
  { text: "quantity", value: "quantity" },
  { text: "reason", value: "reason" },
  { text: "price", value: "price" },
  { text: "Movement", value: "movement_type" },
  { text: "STO", value: "sto" },
  { text: "Document No", value: "document" },
  { text: "Document Year", value: "document_year" },
  { text: "Status", value: "status" },
  { text: "Remarks", value: "remarks" },
  { text: "Created At", value: "created_at" },
];

var movement_types = [
  {
    id: 1,
    movement_details: [],
  },
];

var indent_stat = [];
var returns;
var movetype = 101;
var pagination = {
  sortBy: "name",
  rowsPerPage: 10,
};

var js = jQuery.noConflict(true);

// 19/09/23

offcanvas("returnsdata");

function submitForm() {
  const dropdown1Values = $("#indent_stat").val();
  fillters.indent_stat = dropdown1Values;
  // console.log("fillters", fillters);
  getReturns();
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
}

function resetForm() {
  $("#indent_stat").selectpicker("deselectAll");
  $("#indent_stat").selectpicker("refresh");

  fillters.indent_stat = [];
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
}

function getMovementTypes() {
  if (User_role == 13) {
    //https://grim.co.in:3003/api/movement_type?_where=(type,eq,RMT)
    var url = host1 + path1 + "movement_type?_where=(type,eq,RMT)";
  } else if (
    User_role == 2 ||
    User_role == 7 ||
    User_role == 8 ||
    User_role == 9 ||
    User_role == 19 ||
    User_role == 3
  ) {
    var url = host1 + path1 + "movement_type?_where=(type,eq,RMT)";
  }

  js.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function (response) {
      //console.log(response, "--------------history");
      movement_types[0].movement_details = response;
      var dropdown = $("#dropdown_return");
      response.forEach((item) => {
        const optionElement = $("<option>", {
          value: item.movement_type,
          text: item.movement_type + " - " + item.movement_description,
        });
        dropdown.append(optionElement);
      });
      //console.log(movement_types, "--------------history");
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      toast("warning", "failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}
// for update this API https://grim.co.in:3002/api/v4/update_order_status
var fillters = {
  indent_stat: [13],
};
function getIntialIndentStatus() {
  if (
    User_role == 2 ||
    User_role == 7 ||
    User_role == 8 ||
    User_role == 19 ||
    User_role == 9
  ) {
    fillters = {
      indent_stat: [12],
    };
    indent_stat = [12];
  } else if (User_role == 13) {
    indent_stat = [13];
    fillters = {
      indent_stat: [13],
    };
  }
}

function getReturns() {
  var data = {
    user_id: User_id,
    status: indent_stat,
  };
  if (
    User_role == 2 ||
    User_role == 7 ||
    User_role == 9 ||
    User_role == 19 ||
    User_role == 8
  ) {
    var url = host + path + "manager/return_items";
    var data = {
      user_id: User_id,
      status: fillters.indent_stat,
      //indent_status: fillters.indent_status,
      npp: pagination.rowsPerPage,
      page: pagination.page,
    };
  } else {
    var url = host + path + "storeUser/return_items";
    var data = {
      user_id: User_id,
      status: fillters.indent_stat,
      // indent_status: fillters.indent_status,
    };
  }

  js.ajax({
    url: url,
    method: "POST",
    //dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify(data),
    success: function (response) {
      //console.log("return_items", response);
      returns = response.data.result;
      pagination.totalItems = response.data.pagination.totalCount;
      return_itemsshowintable(returns);
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      toast("warning", "failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

function computedHeaders() {
  if (User_role === 3) {
    return headers.filter((header) => header.visibility === 1);
  } else if (
    User_role === 2 ||
    User_role === 7 ||
    User_role === 8 ||
    User_role === 9 ||
    User_role === 19 ||
    User_role === 11
  ) {
    return headers.filter((header) => header.visibility !== 2);
  } else if (User_role === 8) {
    return headers.filter(
      (header) => header.visibility !== 2 && header.text !== "Actions"
    );
  } else {
    return headers;
  }
}

// Function to generate dynamic table headers based on computedHeaders
function generateTableHeaders(index) {
  var headerHTML = "";
  var computedHeadersList = computedHeaders();
  var count = 0;
  js.each(computedHeadersList, function (_, header) {
    if (header.text == "Status") {
      status_no = count;
    }
    count++;
    headerHTML += `<th>${header.text}</th>`;
  });

  return headerHTML;
}

// set html headers
var thead = document.getElementById("table-head");
thead.innerHTML = ` <tr> ${generateTableHeaders(1)} </tr>`;

var Returnsdata;

function return_itemsshowintable(returns) {
  //console.log(returns);
  var arr = [];
  var count = 1;
  returns.forEach((item, index) => {
    var date1 = new Date();
    var check;
    var disabled = "disabled";
    if (item.status == "Return Approved") {
      disabled = "";
    }
    if (
      ((User_role == 2 ||
        User_role == 7 ||
        User_role == 8 ||
        User_role == 9 ||
        User_role == 19) &&
        item.status == "Return") ||
      User_role == 13
    ) {
      check =
        "<input class='form-check-input checkbox_return' type='checkbox'" +
        disabled +
        " value='" +
        JSON.stringify(item) +
        "' id='myCheckbox" +
        index +
        "'style='position: relative;left: 12px;'/>";
      var status =
        "<button class='lable_button " +
        removeSpaceFromColor(item.color) +
        "'>" +
        item.status +
        "</button>";

      arr.push([
        check,
        count,
        item.first_name,
        item.product_id + "-" + item.product_name,
        item.plant_id,
        item.indent_id,
        item.quantity,
        item.reason,
        item.price.toFixed(2),
        item.movement_type,
        item.sto == null ? "" : item.sto,
        item.document,
        item.document_year,
        status,
        item.remarks,
        moment(item.created_at).format("Do MMM YYYY"),
      ]);
      count++;
    }
  });

  // console.log("datatbale ->", arr);
  var targetColumnIndex = status_no;
  if (Returnsdata) {
    Returnsdata.clear().destroy();
  }
  Returnsdata = js("#Returnsdata")
    .DataTable({
      retrieve: true,
      bAutoWidth: false,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      scrollCollapse: true,
      scrollX: true,
      autoWidth: true,
      //dom: "Bfrtip",
      data: arr,
    })
    .columns()
    .every(function () {
      const column = this;
      if (column.index() != targetColumnIndex) {
        column.nodes().to$().css("white-space", "normal", "Returnsdata");
      }
      if (column.index() === column.columns().indexes().length - 1) {
        column.nodes().to$().addClass("sticky-cell");
        column.nodes().to$().css("background-color", "#efe9e9");
      }
    });
}
//checkbox_return

$(document).on("change", ".checkbox_return", function () {
  var anyChecked = $(".checkbox_return:checked").length > 0;

  if (anyChecked) {
    if (User_role == 19) {
      $("#dropdown_return").hide();
    }
    $("#inputSection").show();
  } else {
    $("#inputSection").hide();
  }
});

$("#remark_return").on("input", function () {
  var remarkValue = $(this).val();
  if (remarkValue == "") {
    $(this).css("border", "1px red solid");
  } else {
    $(this).css("border", "");
  }
  $("#secondButton").prop("disabled", !remarkValue.trim());
});

$("#secondButton").click(function () {
  var approveArray = [];

  $(".checkbox_return:checked").each(function () {
    var value = JSON.parse($(this).val());
    var data = $(this).data("obj");
    approveArray.push(value);
  });

  var remark = $("#remark_return").val();
  var selectedOption = $("#dropdown_return").val();

  // console.log("Selected Data:", approveArray);
  // console.log("Remark:", remark);
  // console.log("Selected Option:", selectedOption);

  ///new code
  if (
    User_role == 2 ||
    User_role == 7 ||
    User_role == 8 ||
    User_role == 9 ||
    User_role == 19
  ) {
    var itemstatus = 13;
  }

  if (User_role == 13) {
    var itemstatus = 14;
  }

  for (var j = 0; j < approveArray.length; j++) {
    // var editedProductRequestObj = {
    //   status: itemstatus
    // };

    if (
      User_role == 2 ||
      User_role == 7 ||
      User_role == 8 ||
      User_role == 9 ||
      User_role == 19
    ) {
      movetype = approveArray[j].movement_type;
    } else {
      movetype = parseInt(selectedOption);
    }

    var msg = false;
    js.ajax({
      url: host + path + "update_order_status",
      type: "PUT",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        id: approveArray[j].id,
        order_id: approveArray[j].order_id,
        indent_id: approveArray[j].indent_id,
        indentUser_id: approveArray[j].created_by,
        created_at: approveArray[j].indent_created_at,
        status: itemstatus,
        remarks: remark,
        product_id: approveArray[j].product_id,
        quantity: approveArray[j].quantity,
        total_price: parseInt(approveArray[j].quantity) * approveArray[j].price,
        role_id: User_role,
        user_id: User_id,
        first_name: User_name,
        plant_id: approveArray[j].plant_id,
        manager_id: approveArray[j].manager_id,
        storage_location: approveArray[j].storage_location,
        movetype: movetype,
        s_no: approveArray[j].s_no,
        ref_id: approveArray[j].ref_id,
        approval_id: approveArray[j].approval_id,
        movement_type: approveArray[j].movement_type,
        sto: approveArray[j].sto,
        document: approveArray[j].document,
        document_year: approveArray[j].document_year,
      }),
      async: false,
      success: function (data) {
        toast("success", "Return Successfully!");
        setTimeout(() => {
          getReturns();
        }, 1500);
        msg = true;
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error);
        toast("warning", "failed. Please try again.");
      },

      complete: function (xhr, status) {
        if (status === "error" || !xhr.responseText) {
          toast("error", "Network error. Please try again later.");
        }
      },
    });
  }
  if (msg) {
    remark = null;
    selectedData = [];
    getReturns();
  }
});

// select filter

document.addEventListener("DOMContentLoaded", function () {
  var select = document.getElementById("indent_stat");
  var optionToSelect = "13"; // The value of the option you want to select (Return Approved)

  // Loop through the options and select the one with the specified value
  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].value === optionToSelect) {
      select.options[i].selected = true;
    }
  }
});

// call all function
getMovementTypes();
getIntialIndentStatus();
getReturns();
