// var any thikng
var auto_pr_count;
var sto_count;
var indent_count;
var wbs_numbers;
var selected_wbs;
var PRMaterials;
var store_plants;
var user_store_locations;
var js = jQuery.noConflict(true);
var role_id = User_role;
var id = User_id;

const userheaders = [
  { text: "" },
  { text: "S No", value: "" },
  { text: "ID", value: "id" },
  { text: "Indent ID", value: "order_id" },
  { text: "User ID", value: "user_id" },
  { text: "Name", value: "first_name" },
  { text: "Quantity", value: "quantity" },
  { text: "Remarks", value: "remarks" },
  { text: "Status", value: "status" },
  { text: "Plant", value: "Plant" },
  { text: "Where Used", value: "Where Used" },
  { text: "Reason", value: "Reason" },
  { text: "Where in plant", value: "Where in plant" },
  { text: "Created At", value: "created_at" },
  { text: "Request Manager Remarks", value: "Request_Manager_Remarks" },
];

const sto_userheaders = [
  {},
  { text: "S No", value: "" },
  { text: "ID", value: "id" },
  { text: "Indent ID", value: "order_id" },
  { text: "User ID", value: "user_id" },
  { text: "Name", value: "first_name" },
  { text: "Quantity", value: "quantity" },
  { text: "Status", value: "status" },
  { text: "Created At", value: "created_at" },
];

const deliveryPriorities = [
  {
    id: 1,
    priorities: [
      {
        name: "High",
        id: 1,
      },
      {
        name: "Medium",
        id: 2,
      },
      {
        name: "Low",
        id: 3,
      },
    ],
  },
];

const headers = [
  {
    text: "<input  type='checkbox' class='form-check-input' id='selectAll' style='position: relative;left: 16px;'>",
  },
  { text: "S No", value: "" },

  // {
  //   text: "WBS Element No",
  //   value: "wbs"
  // },
  { text: "Material Name", value: "material.name" },
  { text: "Base Unit", value: "material.base_unit" },

  { text: "Quantity", value: "quantity" },
  { text: "Purchase Quantity", value: "" },

  { text: "Actions", value: "", sortable: false },
];

const STO_headers = [
  { text: "S No", value: "" },
  { text: "Material Name", value: "material.name" },
  { text: "Base Unit", value: "material.base_unit" },

  { text: "Quantity", value: "quantity" },
  // { text: "Price", value: "price" },
  { text: "Delivery Priority", value: "delivery_priority" },
  { text: "Priority Days", value: "priority_days" },
  { text: "Tracking Plant", value: "tracking_plant" },
  { text: "Where in Plant", value: "where_in_plant" },
  { text: "Reason", value: "reason" },
  { text: "Where Used", value: "where_used" },

  { text: "Actions", value: "", sortable: false },
];
// functions

function get_indent_count() {
  var role = "";
  if (User_role == 2) {
    role = "manager";
  } else if (User_role == 3) {
    role = "indent";
  } else if (User_role == 5 || User_role == 12) {
    role = "storeUser";
  }
  var data = {
    user_id: User_id,
  };

  js.ajax({
    url: host + path + role + "/indent_count",
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify(data),
    async: false,
    success: function (response) {
      indent_count = response.count;
      if (User_role == 5) {
        auto_pr_count = response.auto_pr_count;
        sto_count = response.sto_count;
      }
      setTimeout(() => {
        spinner(false);
      }, 500);
    },
    error: function (err) {
      alert(err);
      console.log(err);
    },
  });
}

function getWBSMaterials() {
  var data = {
    user_id: User_id,
  };
  js.ajax({
    url:
      host + path + "storeUser/auto_pr_materials_wbs?user_id=" + data.user_id,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      wbs_numbers = response.data.wbs;
      if (wbs_numbers.length > 0) {
        selected_wbs = wbs_numbers[0];
      }
      setdropdownvalue();
      getPRMaterials();
    },
    error: function (err) {
      alert(err);
      console.log(err);
    },
  });
}

function setdropdownvalue() {
  var dropdown = $("#dropdown");
  //   dropdown.append(`<option value="">locations</option>`);
  const optionElement = $("<option>", {
    value: selected_wbs,
    text: selected_wbs,
  });
  dropdown.append(optionElement);
}

function getPRMaterials(type = 1) {
  var data = {
    user_id: User_id,
  };

  js.ajax({
    url:
      host +
      path +
      "storeUser/auto_pr_materials?user_id=" +
      data.user_id +
      "&wbs_no=" +
      selected_wbs,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      PRMaterials = response.data.result;
      setPRMaterialsvalue(type);
    },
    error: function (err) {
      alert(err);
      console.log(err);
    },
  });
}

// Function to generate table headers based on the headers array
function generateTableHeaders(headers) {
  return headers.map((header) => `<th>${header.text}</th>`).join("");
}

function setPRMaterialsvalue(type) {
  console.log("PRMaterials", PRMaterials);
  var pr_materials_table = $(".pr_materials_table");
  pr_materials_table.html();
  const table = `
  <table id='main_headers'>
    <thead>
        <tr id="headers">
        ${generateTableHeaders(headers)}
        </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  `;
  pr_materials_table.append(table);

  if (type != 4) {
    AllPRMaterials();
  } else {
    STOPRMaterials();
  }
}

function AllPRMaterials() {
  var PRMaterialsMainArr = [];
  PRMaterials.forEach((item, index) => {
    var main_checkbox =
      "<input type='checkbox' class='form-check-inputx rowCheckbox' id='select_" +
      index +
      "' />";

    var text_field =
      "<div class='table-input'> <input type='text' value='" +
      Math.floor(item.quantity) +
      "' class='' /></div>";

    const Addbutton = `
    <button class="action-button toggle-button" data-index="${index}" id="toggleButton${index}">
        <span class="material-symbols-rounded material-add">
            add_circle
        </span>
        <span class="material-symbols-rounded  material-remove">
            do_not_disturb_on
        </span>
    </button>`;

    PRMaterialsMainArr.push([
      main_checkbox,
      index + 1,
      item.material.material_sap_id + " - " + item.material.name,
      item.material.base_unit,
      item.quantity.toFixed(2),
      text_field,
      Addbutton,
    ]);

    var PRMaterialsSubArr = [];

    item.indents.forEach((item_i, index1) => {
      var Request_Manager_Remarks = "";
      var status =
        "<button class='lable_button " +
        removeSpaceFromColor(item_i.color) +
        "'>" +
        item_i.status +
        "</button>";

      var sub_checkbox =
        "<input type='checkbox' class='form-check-inputx rowCheckboxInside' id='select_" +
        index +
        "_" +
        index1 +
        "' />";

      var remark_textfield =
        "<div class='table-input" +
        index1 +
        "'> <input type='text' value='' class='' /></div>";

      var created_at = moment(item_i.created_at).format("Do MMM YYYY");

      PRMaterialsSubArr.push([
        sub_checkbox,
        index1,
        item_i.id,
        item_i.order_id,
        item_i.user_id,
        item_i.first_name,
        item_i.quantity,
        remark_textfield,
        status,
        item_i.plant_id,
        item_i.where_used,
        item_i.reason,
        item_i.section,
        created_at,
        Request_Manager_Remarks,
      ]);
    });
    // Add event listener for the "Add" button to toggle additional rows
    var selector = "#toggleButton" + index + " , #select_" + index;
    $(document).on("click", selector, function () {
      var miniSelctor = $(this)
        .attr("id")
        .replace("_" + index, "")
        .replace(index, "");
      console.log(miniSelctor);
      var tr = $(this).closest("tr");

      var toggleButton = tr.find("#toggleButton" + index);
      if (toggleButton.hasClass("expanded")) {
        tr.next().remove();
        toggleButton.removeClass("expanded");
      } else {
        tr.after(
          '<tr class="expanded-row"><td colspan="7">' +
            formatRowDetails(item.indents, index)[0].innerHTML +
            "</td></tr>"
        );
        toggleButton.addClass("expanded");
        if (miniSelctor == "select") {
          toggleButton.addClass("action-icons");
        }
      }
      js("#subtable" + index).DataTable({
        paging: false, // Disable pagination for simplicity
        data: PRMaterialsSubArr,
        searching: false,
        info: false,
      });
    });

    // set button condetion
    // v-if="selected.length > 0 && user_details[0].role_id == 5"
  });
  //toggle-button
  /*$(document).on("click", ".toggle-button", function () {
    var index = $(this).attr("data-index");
    var tr = $(this).closest("tr");
    var toggleButton = tr.find(this);

    if (toggleButton.hasClass("expanded")) {
      tr.next().remove();
      toggleButton.removeClass("expanded");
    } else {
      tr.after(
        '<tr class="expanded-row"><td colspan="7">' +
          formatRowDetails(item.indents, index)[0].innerHTML +
          "</td></tr>"
      );
      toggleButton.addClass("expanded");
    }
    js("#subtable" + index).DataTable({
      paging: false, // Disable pagination for simplicity
      data: PRMaterialsSubArr,
      searching: false,
      info: false,
    });
  });*/
  var table = js("#main_headers").DataTable({
    paging: false, // Disable pagination for simplicity
    data: PRMaterialsMainArr,
    buttons: [
      {
        extend: "excelHtml5",
        text: "Download Excel",
        className: "btn btn-primary",
        filename: "data_export",
      },
    ],
  });
}

// $(document).on("change", "#select_1_0", function () {
//   var checkbox_id = $(this).attr(id);
//   alert(checkbox_id);
//   if (this.checked) {
//   }
// });
// Function to format the details for the expanded row
function formatRowDetails(data, dataindex) {
  var $alldata = $("<div>");
  for (let index = 0; index < data.length; index++) {
    // Define the additional table structure
    var $html = $("<table>")
      .addClass("expanded-details")
      .attr("id", "subtable" + dataindex);
    var $thead = $("<thead>");
    var $tr = $("<tr>");
    // Append the table header to the table
    $html.append($thead.append($tr.append(generateTableHeaders(userheaders))));

    // Create a wrapping div and append the table to it
    $alldata.append($html);
  }
  //  console.log($alldata, "======================================");
  return $alldata;
}

function STOPRMaterials() {}

function getStoreLocations() {
  if (role_id == 12) {
    var data = {
      id: id,
    };
    var geturl = host + path + "user_sto_store_locations?id=" + data.id;
  } else {
    var geturl = host + path + "store_locations";
  }
  js.ajax({
    url: geturl,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (response) {
      store_plants = response.locations;
    },
    error: function (err) {
      alert(err);
      console.log(err);
    },
  });
}

// function getUserStoreLocations() {
//   js.ajax({
//     url: host + path + "user_store_locations?id=" + id,
//     type: "GET",
//     contentType: "application/json;charset=utf-8",
//     dataType: "json",
//     async: false,
//     success: function (response) {
//       user_store_locations = response.locations;
//     },
//     error: function (err) {
//       alert(err);
//       console.log(err);
//     },
//   });
// }

// new code
function sendIndentToSelected(material, indent) {
  var indexcheck = $.map(selected, function (e) {
    return e;
  }).indexOf(material);

  if (indexcheck == -1) {
    selected.push(material);
  }

  checkAllIndents(material, indent);
}

function checkAllIndents(material, indent) {
  var indexcheck = $.map(selected, function (e) {
    return e;
  }).indexOf(material);

  if (indexcheck != -1) {
    if (
      selected[indexcheck].indents.every(function (element) {
        return element.checkStatus == false;
      })
    ) {
      selected.splice(indexcheck, 1);
    }
  }
}

function checkIndents(item, checkedornot, propss) {
  if (checkedornot) {
    var indexcheck = $.map(selected, function (e) {
      return e;
    }).indexOf(item);

    $.each(selected[indexcheck].indents, function (index, item) {
      item.checkStatus = true;
      propss.expanded = true;
    });
  } else {
    var indexcheck = $.map(PRMaterials.slice(), function (e) {
      return e;
    }).indexOf(item);

    $.each(PRMaterials[indexcheck].indents, function (index, item) {
      item.checkStatus = false;
    });
  }
}

get_indent_count();
getWBSMaterials();
//getStoreLocations();
//getUserStoreLocations();

$("#selectAll").on("change", function () {
  if ($(this).is(":checked")) {
    $(".rowCheckbox").prop("checked", true);
    $(".rowCheckboxInside").prop("checked", true);
  } else {
    $(".rowCheckbox").prop("checked", false);
    $(".rowCheckboxInside").prop("checked", false);
  }
});
$(".rowCheckbox").on("change", function () {
  if ($(this).is(":checked")) {
    $(".rowCheckboxInside").prop("checked", true);
  } else {
    $(".rowCheckboxInside").prop("checked", false);
  }
});

function raisePR() {
  var vm = this;

  if (this.indRemarks() == false) {
    vm.text = "please add remarks";
    vm.snackbarColor = "error";
    vm.snackbar = true;
  } else {
    this.start();
    this.selected.forEach((item) => {
      item.indents.forEach((element, index) => {
        if (element.checkStatus == false) {
          item.indents.splice(index, 1);
        }
      });
    });

    // console.log(this.selected);
    var data = {
      user_id: this.user_details[0].id,
      sap_id: this.user_details[0].sap_user_id,
      requests: this.selected,
    };
    // console.log(data, "-------------");

    axios
      .post(
        "" + process.env.VUE_APP_HOST1 + "/api/v4/storeUser/purchase_request",
        data
      )
      .then(function (response) {
        // eventBus.$emit("getIndentCount");
        vm.get_indent_count();

        vm.getPRMaterials();
        // vm.PRMaterials();
        vm.text = response.data.message;
        vm.snackbar = true;
        vm.snackbarColor = "success";
        // vm.roleAdddialog = false;
        vm.selected = [];
        // console.log(response);
        vm.finish();
      })
      .catch(function (error) {
        console.log(error);
        vm.fail();
        vm.text = "Something went wrong !, Please try again !";
        vm.snackbarColor = "error";
        vm.snackbar = true;
      });
  }
}
