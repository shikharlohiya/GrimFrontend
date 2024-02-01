// var any thikng
var auto_pr_count;
var sto_count;
var indent_count;
var wbs_numbers;
var Consolidate_Indents_data;
var selected_wbs;
var PRMaterials;
var store_plants = [];
var user_store_locations;
var js = jQuery.noConflict(true);
var role_id = User_role;
var id = User_id;
var selected = [];
var STOselected = [];

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
  { text: "" },
  { text: "S No", value: "" },
  { text: "ID", value: "id" },
  { text: "Indent ID", value: "order_id" },
  { text: "User ID", value: "user_id" },
  { text: "Name", value: "first_name" },
  { text: "Quantity", value: "quantity" },
  { text: "Status", value: "status" },
  { text: "Plant", value: "Plant" },
  { text: "Where Used", value: "Where Used" },
  { text: "Reason", value: "Reason" },
  { text: "Where in plant", value: "Where in plant" },
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
    text: "<input  type='checkbox' class='form-check-input' id='selectAll'>",
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
  {
    text: "<input  type='checkbox' class='form-check-input' id='STOselectAll'>",
  },
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
      toast_PRMaterials("error", "Network error. Please try again later.");
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
      Consolidate_Indents_data = response.data.result;
      setdropdownvalue();
      getPRMaterials();
    },
    error: function (err) {
      toast_PRMaterials("error", "Network error. Please try again later.");
    },
  });
}

function setdropdownvalue() {
  var dropdown = $("#dropdown_Pr_materials");
  //   dropdown.append(`<option value="">locations</option>`);
  wbs_numbers.forEach((element) => {
    const optionElement = $("<option>", {
      value: element,
      text: element,
    });
    dropdown.append(optionElement);
  });
  var selectedOption = dropdown.find(`option[value="WBS_GENERAL"]`);
  selected_wbs = selectedOption.val();
  if (selectedOption.length) {
    selectedOption.prop("selected", true);
  }
}

$("#dropdown_Pr_materials").change(function () {
  selected_wbs = $(this).val();
  getPRMaterials();
});

var table_js;
var exportData = [];
function readyExcalfileExport(data) {
  data.forEach((element) => {
    exportData.push([
      element.material.material_sap_id,
      element.material.base_unit,
      element.material.name,
      element.quantity,
      element.wbs,
      element.wbs_desc,
      JSON.stringify(element.indents),
    ]);
  });
  if (table_js) {
    table_js.clear().destroy();
  }
  table_js = js("#Consolidate_Indents_data").DataTable({
    //scrollX: true,
    data: exportData,
    dom: "Bfrtip", // Specify the buttons you want to show
    buttons: [
      {
        extend: "excelHtml5", // Use the Excel button
        title: "ConsolidateIndents",
        text: "ConsolidateIndents",
        className: "btn-primary", // Optional: Add a custom class to the button
      },
    ],
    paging: false, // Optional: Disable pagination
    ordering: false, // Optional: Disable sorting
    info: false, // Optional: Hide table information
    searching: false, // Optional: Disable searching
  });
}
$(".ConsolidateIndents").on("click", function () {
  // Trigger DataTables button to export to Excel
  table_js.button(".buttons-excel").trigger();
});

function getPRMaterials(type = 0) {
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
      readyExcalfileExport(response.data.result);
    },
    error: function (err) {
      //alert(err);
      toast_PRMaterials("error", "Network error. Please try again later.");
    },
  });
}

// Function to generate table headers based on the headers array
function generateTableHeaders(headers) {
  return headers.map((header) => `<th>${header.text}</th>`).join("");
}

function setheader(check = true) {
  var pr_materials_table = $(".pr_materials_table");
  pr_materials_table.empty();
  if (check) {
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
  } else {
    const table = `
  <table id='main_headers'>
    <thead>
        <tr id="headers">
        ${generateTableHeaders(STO_headers)}
        </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  `;
    pr_materials_table.append(table);
  }
}

var type_no;

function setPRMaterialsvalue(type) {
  // console.log("PRMaterials", PRMaterials);
  switch (type) {
    case 0:
      type_no = 1;
      selected = [];
      AllPRMaterials();
      isChecked_Arr();
      break;

    case 1:
      checkType();
      type_no = 1;
      isChecked_Arr();
      break;

    case 2:
      checkType();
      type_no = 2;
      isChecked_Arr();
      break;

    case 3:
      checkType();
      type_no = 3;
      isChecked_Arr();
      break;

    case 5:
      checkType();
      type_no = 5;
      isChecked_Arr();
      break;

    case 4:
      type_no = 4;
      selected = [];
      STOPRMaterials();
      isChecked_Arr();
      break;

    default:
      alert("bad method call");
      break;
  }
}

function checkType() {
  if (type_no == 4) {
    selected = [];
    AllPRMaterials();
  }
}
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

function formatRowDetailsSTO(data, dataindex) {
  var $alldata = $("<div>");
  for (let index = 0; index < data.length; index++) {
    // Define the additional table structure
    var $html = $("<table>")
      .addClass("expanded-details")
      .attr("id", "STOsubtable" + dataindex);
    var $thead = $("<thead>");
    var $tr = $("<tr>");
    // Append the table header to the table
    $html.append(
      $thead.append($tr.append(generateTableHeaders(sto_userheaders)))
    );

    // Create a wrapping div and append the table to it
    $alldata.append($html);
  }
  //  console.log($alldata, "======================================");
  return $alldata;
}

function AllPRMaterials() {
  setheader();
  var PRMaterialsMainArr = [];
  PRMaterials.forEach((item, index) => {
    var main_checkbox =
      "<input type='checkbox' data-id='" +
      index +
      "' class='form-check-inputx rowCheckbox'  id='select_" +
      index +
      "' data-obj='" +
      item.id +
      "' />";

    var text_field =
      "<div class='table-input'> <input id='quantity_" +
      item.id +
      "' type='number' min='10' step='0.01' required /></div>";
    // var text_field =
    //   "<div class='table-input'> <input id='quantity_" +
    //   item.id +
    //   "' type='number' min='10' max='" +
    //   Math.floor(item.quantity) +
    //   "'required /></div>";

    const Addbutton = `
    <button class="action-button toggle-button" data-index="${index}" id="toggleButton${index}">
      <span class="material-symbols-rounded">
          expand_all
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

      var remark_textfield =
        "<div class='table-input" +
        index1 +
        "'> <input type='text' id='remark_" +
        item.id +
        "_" +
        item_i.id +
        "' value='' class='form-control' required /></div>";

      var created_at = moment(item_i.created_at).format("Do MMM YYYY");
      var sub_checkbox =
        "<input type='checkbox' data-id='" +
        index1 +
        "' class='form-check-input rowCheckboxInside'" +
        "data-checkStatus='" +
        item_i.checkStatus +
        "'" +
        "id='select_" +
        index +
        "_" +
        index1 +
        "' />";
      PRMaterialsSubArr.push([
        sub_checkbox,
        index1 + 1,
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
      debugger;
      var miniSelctor = $(this)
        .attr("id")
        .replace("_" + index, "")
        .replace(index, "");

      var tr = $(this).closest("tr");
      var toggleButton = tr.find("#toggleButton" + index);

      if (miniSelctor == "select") {
        // console.log("select-> ", miniSelctor);
        if ($(this).is(":checked")) {
          if (!toggleButton.hasClass("expanded")) {
            callnow();
          }
        }
      } else {
        callnow();
        console.log("toggleButton-> ", miniSelctor);
      }

      //console.log(miniSelctor);
      function callnow() {
        if (toggleButton.hasClass("expanded")) {
          tr.next().remove();
          //$("tr.expanded-row").remove();
          toggleButton.removeClass("expanded");
          if ($("#select_" + index).is(":checked")) {
            $("#select_" + index).prop("checked", false);
          }
        } else {
          tr.after(
            '<tr class="expanded-row"><td colspan="7">' +
              formatRowDetails(item.indents, index)[0].innerHTML +
              "</td></tr>"
          );
          toggleButton.addClass("expanded");
          toggleButton.addClass("action-icons");
          // }
        }

        js("#subtable" + index).DataTable({
          paging: false, // Disable pagination for simplicity
          data: PRMaterialsSubArr,
          searching: false,
          info: false,
        });
      }
      isChecked_Arr();
    });
    // set button condetion
    // v-if="selected.length > 0 && user_details[0].role_id == 5"
  });

  $(document).on("click", "[type='checkbox']", function () {
    var id = this.id;
    var idParts = this.id.split("_");
    var desiredValue = idParts[1]; // Access the second part (index 1)
    var main_id = idParts[0] + "_" + desiredValue;

    // if main check box check
    if (idParts.length === 2 && idParts[0] === "select") {
      const isCheckedMain = $("#" + main_id).is(":checked");
      var m_obj = PRMaterials.find(
        (item) => item.id === $("#" + main_id).data("obj")
      );
      if (isCheckedMain) {
        isChecked_Arr();
        var id = $("#" + main_id).attr("id");
        // this for loop for check all sub checkbox
        for (let i = 0; i < m_obj.indents.length; i++) {
          $(`#${id}_${i}`).prop("checked", true);
          m_obj.indents[i].checkStatus = true;
          sendIndentToSelected(m_obj, true);
        }
      } else {
        var id = $("#" + main_id).attr("id");
        // console.log("uncheck", id);
        var total_sub = m_obj.indents.length;

        //  this for loop for uncheck all sub checkbox
        for (let i = 0; i < total_sub; i++) {
          $(`#${id}_${i}`).prop("checked", false);
          m_obj.indents[0].checkStatus = false;
          sendIndentToSelected(m_obj, false);
        }
      }
    }

    // Sub checkbox event
    if (idParts.length === 3 && idParts[0] === "select") {
      //const isCheckedsub = $("#" + id).is(":checked");

      var index = parseInt(idParts[1]);
      var subindex = parseInt(idParts[2]);
      var main_id = idParts[0] + "_" + index;
      var sub_id = main_id + "_" + subindex;

      const isCheckedSub = $("#" + sub_id).is(":checked");
      // const isCheckedMain = $("#" + main_id).is(":checked");
      var m_obj = PRMaterials.find(
        (item) => item.id === $("#" + main_id).data("obj")
      );
      if (isCheckedSub) {
        // console.log(  "new",   $("#" + main_id).data("obj"),  $("#" + sub_id).data("checkstatus"));
        m_obj.indents[0].checkStatus = true;
        // console.log("new", "0", m_obj);
        sendIndentToSelected(m_obj, true);
      } else {
        // console.log(  "new",   $("#" + main_id).data("obj"),  $("#" + sub_id).data("checkstatus"));
        m_obj.indents[0].checkStatus = false;
        // console.log("new", "0", m_obj);
        sendIndentToSelected(m_obj, false);
      }
      isChecked_Arr();
      // // set check in main
      var id = this.id;
      const isChecked = $("#" + id).is(":checked");
      if (!isChecked) {
        $(`#${main_id}`).prop("checked", false);
      } else {
        $(`#${main_id}`).prop("checked", true);
      }
      // console.log("isChecked", isChecked);
      // console.log("index->", index, "subindex->", subindex);
      // console.log(
      //   "============================================================================================="
      // );
    }
    isChecked_Arr();
  });

  $("#selectAll").on("change", function () {
    // console.log("PRMaterials", PRMaterials);
    var obj = PRMaterials;
    if ($(this).is(":checked")) {
      $(".toggle-button").removeClass("action-icons");
      selected = [];
      obj.forEach((element) => {
        element.indents.forEach((e) => {
          e.checkStatus = true;
        });
        sendIndentToSelected(element, true);
      });
      $(".rowCheckbox").prop("checked", true);
      $(".rowCheckboxInside").prop("checked", true);
    } else {
      obj.forEach((element) => {
        element.indents.forEach((e) => {
          e.checkStatus = false;
        });
        sendIndentToSelected(element, false);
      });
      $(".rowCheckbox").prop("checked", false);
      $(".rowCheckboxInside").prop("checked", false);
      selected = [];
    }
    isChecked_Arr();
  });

  $(".rowCheckbox").on("change", function () {
    const id = $(this).attr("id");
    if ($(this).is(":checked")) {
      $(".rowCheckboxInside").prop("checked", true);
    } else {
      $(".rowCheckboxInside").prop("checked", false);
    }
  });

  js("#main_headers").DataTable({
    paging: false, // Disable pagination for simplicity
    data: PRMaterialsMainArr,
    bDestroy: true,
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

function STOPRMaterials() {
  setheader(false);
  var STOPRMaterialsMainArr = [];
  PRMaterials.forEach((item, index) => {
    var main_checkbox =
      "<input type='checkbox' data-id='" +
      index +
      "' class='form-check-inputx rowCheckbox'  id='STOselect_" +
      index +
      "' data-obj='" +
      item.id +
      "' />";

    // Math.floor(item.quantity)
    var tracking_no = `<textarea class="form-control" id="FormControlTextarea1_${item.id}" rows="1" maxlength="20"></textarea>`;
    var section = `<textarea class="form-control" id="FormControlTextarea2_${item.id}" rows="1" maxlength="50"></textarea>`;
    var reason = `<textarea class="form-control" id="FormControlTextarea3_${item.id}" rows="1" maxlength="100"></textarea>`;
    var where_used = `<textarea class="form-control" id="FormControlTextarea4_${item.id}" rows="1"maxlength="100"></textarea>`;

    const Addbutton = `
      <button class="action-button toggle-button" data-index="${index}" id="STOtoggleButton${index}">
          <span class="material-symbols-rounded">
              expand_all
          </span>
      </button>`;

    var dropdown = `
            <select class="form-select dropdown${index}" id="dropdown${item.id}" aria-label="Default select example">
              <option value="0" selected></option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
    `;
    var priority_days =
      "<div class='table-input'> <input class='quantity_" +
      index +
      "' id='quantity_" +
      item.id +
      "' type='number' min='1' max='2' required disabled /></div>";

    $(document).on("change", ".dropdown" + index, function () {
      const selectedOption = $(this).find("option:selected");
      // Check if it is the first option with a value of 0
      if (selectedOption.index() === 0 && selectedOption.val() === "0") {
        // Remove the first option
        selectedOption.remove();
      }
      // Set the value of the input element to the selected option's value
      if (selectedOption.val() == "High") {
        $(".quantity_" + index).val(3);
      } else if (selectedOption.val() == "Medium") {
        $(".quantity_" + index).val(6);
      } else if (selectedOption.val() == "Low") {
        $(".quantity_" + index).val(15);
      }
    });

    STOPRMaterialsMainArr.push([
      main_checkbox,
      index + 1,
      item.material.material_sap_id + " - " + item.material.name,
      item.material.base_unit,
      item.quantity.toFixed(2),
      dropdown,
      priority_days,
      tracking_no,
      section,
      reason,
      where_used,
      Addbutton,
    ]);

    var PRMaterialsSubArrSTO = [];

    item.indents.forEach((item_i, index1) => {
      var Request_Manager_Remarks = "";
      var status =
        "<button class='lable_button " +
        removeSpaceFromColor(item_i.color) +
        "'>" +
        item_i.status +
        "</button>";

      var created_at = moment(item_i.created_at).format("Do MMM YYYY");
      var sub_checkbox =
        "<input type='checkbox' data-id='" +
        index1 +
        "' class='form-check-input rowCheckboxInside'" +
        "data-checkStatus='" +
        item_i.checkStatus +
        "'" +
        "id='STOselect_" +
        index +
        "_" +
        index1 +
        "' />";
      PRMaterialsSubArrSTO.push([
        sub_checkbox,
        index1,
        item_i.id,
        item_i.order_id,
        item_i.user_id,
        item_i.first_name,
        item_i.quantity,
        status,
        item_i.plant_id,
        item_i.where_used,
        item_i.reason,
        item_i.section,
        created_at,
      ]);
    });

    // Add event listener for the "Add" button to toggle additional rows
    var selector = "#STOtoggleButton" + index + " , #STOselect_" + index;

    $(document).on("click", selector, function () {
      var miniSelctor = $(this)
        .attr("id")
        .replace("_" + index, "")
        .replace(index, "");

      var tr = $(this).closest("tr");
      var toggleButton = tr.find("#STOtoggleButton" + index);

      if (miniSelctor == "STOselect") {
        // console.log("select-> ", miniSelctor);
        if ($(this).is(":checked")) {
          if (!toggleButton.hasClass("expanded")) {
            callnow();
          }
        }
        // console.log("STOtoggleButton1-> ", miniSelctor);
      } else {
        callnow();
        // console.log("STOtoggleButton2-> ", miniSelctor);
      }

      //console.log(miniSelctor);
      function callnow() {
        if (toggleButton.hasClass("expanded")) {
          tr.next().remove();
          //$("tr.expanded-row").remove();
          toggleButton.removeClass("expanded");
          if ($("#STOselect_" + index).is(":checked")) {
            $("#STOselect_" + index).prop("checked", false);
          }
        } else {
          tr.after(
            '<tr class="expanded-row"><td colspan="12">' +
              formatRowDetailsSTO(item.indents, index)[0].innerHTML +
              "</td></tr>"
          );
          toggleButton.addClass("expanded");
          toggleButton.addClass("action-icons");
          // }
        }

        js("#STOsubtable" + index).DataTable({
          paging: false, // Disable pagination for simplicity
          data: PRMaterialsSubArrSTO,
          searching: false,
          info: false,
        });
      }
      isChecked_Arr();
    });
    // set button condetion
    // v-if="selected.length > 0 && user_details[0].role_id == 5"
  });
  // any check box event
  $(document).on("click", "[type='checkbox']", function () {
    var id = this.id;
    var idParts = this.id.split("_");
    var desiredValue = idParts[1]; // Access the second part (index 1)
    var main_id = idParts[0] + "_" + desiredValue;
    // console.log("id->>>..>.", main_id, idParts);
    // if main check box check
    if (idParts.length === 2 && idParts[0] === "STOselect") {
      const isCheckedMain = $("#" + main_id).is(":checked");
      var m_obj = PRMaterials.find(
        (item) => item.id === $("#" + main_id).data("obj")
      );
      if (isCheckedMain) {
        isChecked_Arr();
        var id = $("#" + main_id).attr("id");
        var total_sub = m_obj.indents.length;

        // console.log("new", id, i, total_sub);

        // this for loop for check all sub checkbox
        for (let i = 0; i < total_sub; i++) {
          $(`#${id}_${i}`).prop("checked", true);
          m_obj.indents[i].checkStatus = true;
          sendIndentToSelected(m_obj, true);
        }
      } else {
        var id = $("#" + main_id).attr("id");
        // console.log("uncheck", id);
        var total_sub = m_obj.indents.length;
        // console.log("total", total_sub, "main", desiredValue);

        //  this for loop for uncheck all sub checkbox
        for (let i = 0; i < total_sub; i++) {
          $(`#${id}_${i}`).prop("checked", false);
          m_obj.indents[0].checkStatus = false;
          sendIndentToSelected(m_obj, false);
        }
      }
    }

    // Sub checkbox event
    if (idParts.length === 3 && idParts[0] === "STOselect") {
      //const isCheckedsub = $("#" + id).is(":checked");

      var index = parseInt(idParts[1]);
      var subindex = parseInt(idParts[2]);
      var main_id = idParts[0] + "_" + index;
      var sub_id = main_id + "_" + subindex;

      const isCheckedSub = $("#" + sub_id).is(":checked");
      // const isCheckedMain = $("#" + main_id).is(":checked");
      var m_obj = PRMaterials.find(
        (item) => item.id === $("#" + main_id).data("obj")
      );
      if (isCheckedSub) {
        // console.log(  "new",   $("#" + main_id).data("obj"),  $("#" + sub_id).data("checkstatus"));
        m_obj.indents[0].checkStatus = true;
        // console.log("new", "0", m_obj);
        sendIndentToSelected(m_obj, true);
      } else {
        // console.log(  "new",   $("#" + main_id).data("obj"),  $("#" + sub_id).data("checkstatus"));
        m_obj.indents[0].checkStatus = false;
        // console.log("new", "0", m_obj);
        sendIndentToSelected(m_obj, false);
      }
      isChecked_Arr();
      // // set check in main
      var id = this.id;
      const isChecked = $("#" + id).is(":checked");
      if (!isChecked) {
        $(`#${main_id}`).prop("checked", false);
      } else {
        $(`#${main_id}`).prop("checked", true);
      }
      // console.log("isChecked", isChecked);
      // console.log("index->", index, "subindex->", subindex);
      // console.log(
      //   "============================================================================================="
      // );
    }
    isChecked_Arr();
  });

  $("#STOselectAll").on("change", function () {
    // console.log("PRMaterials", PRMaterials);
    var obj = PRMaterials;
    if ($(this).is(":checked")) {
      $(".toggle-button").removeClass("action-icons");
      selected = [];
      obj.forEach((element) => {
        element.indents.forEach((e) => {
          e.checkStatus = true;
        });
        sendIndentToSelected(element, true);
      });
      $(".rowCheckbox").prop("checked", true);
      $(".rowCheckboxInside").prop("checked", true);
    } else {
      obj.forEach((element) => {
        element.indents.forEach((e) => {
          e.checkStatus = false;
        });
        sendIndentToSelected(element, false);
      });
      $(".rowCheckbox").prop("checked", false);
      $(".rowCheckboxInside").prop("checked", false);
      selected = [];
    }
    isChecked_Arr();
  });

  $(".rowCheckbox").on("change", function () {
    const id = $(this).attr("id");
    if ($(this).is(":checked")) {
      $(".rowCheckboxInside").prop("checked", true);
    } else {
      $(".rowCheckboxInside").prop("checked", false);
    }
  });

  js("#main_headers").DataTable({
    paging: false, // Disable pagination for simplicity
    data: STOPRMaterialsMainArr,
    bDestroy: true,
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
      // console.log("data p", store_plants);
      Setdropdwon(store_plants, "store_plants");
    },
    error: function (err) {
      toast_PRMaterials("error", "Network error. Please try again later.");
    },
  });
}
function getUserStoreLocations() {
  var geturl = host + path + "user_store_locations?id=" + User_id;
  js.ajax({
    url: geturl,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (response) {
      user_store_locations = response.locations;
      Setdropdwon(user_store_locations, "user_store_locations");
    },
    error: function (err) {
      toast_PRMaterials("error", "Network error. Please try again later.");
    },
  });
}

function Setdropdwon(data, id) {
  var dropdown = $("#" + id);
  dropdown.append(`<option value="0">select ${id}</option>`);
  data.forEach((e) => {
    const optionElement = $("<option>", {
      value: e.id,
      text: e.plant_id + " - " + e.storage_location_desc,
    });
    dropdown.append(optionElement);
  });
}
var buttonName = {
  1: "Request for PR",
  2: "Reject PR",
  3: "Cancel PR",
  4: "Raise STO",
  5: "Hold PR",
};
var buttonName2 = {
  1: "RequestforPR",
  2: "RejectPR",
  3: "CancelPR",
  4: "RaiseSTO",
  5: "HoldPR",
};
function isChecked_Arr() {
  // check selected for buttons
  console.log("selected: ", selected);
  var value = buttonName[type_no];
  var t_value_without_spaces = buttonName2[type_no];
  if (type_no == 4 && selected.length > 0) {
    $("#dropdownlist").css("display", "block");
  } else {
    $("#dropdownlist").css("display", "none");
  }
  var IsHold = "";
  console.log("hold type_no", type_no);
  //PR Hold
  if (
    selected.some((item) =>
      item.indents.some((indent) => indent.status === "PR Hold")
    ) &&
    type_no === 5
  ) {
    IsHold = "disabled";
  } else {
    IsHold = "";
  }

  if (selected.length > 0) {
    $(".PRbutton").css("display", "flex");
    $(".PRbutton").empty();
    // store_plants disabled
    if (type_no == 4) {
      $(".PRbutton").html(
        '<button type="submit" ' +
          IsHold +
          ' id="disabled_btn" class=" btn common-button Custom-btn common-blue-button " onclick="allPR(\'' +
          String(t_value_without_spaces) +
          "')\" >" +
          value +
          "</button>"
      );
    } else {
      $(".PRbutton").html(
        '<button type="submit" ' +
          IsHold +
          ' class="btn common-button Custom-btn common-blue-button" onclick="allPR(\'' +
          String(t_value_without_spaces) +
          "')\">" +
          value +
          "</button>"
      );
    }
  } else {
    $(".PRbutton").css("display", "none");
  }
}
var val1 = false;
var val2 = false;
$("#user_store_locations").on("change", function () {
  const selectedOption = $(this).find("option:selected");
  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    // Remove the first option
    selectedOption.remove();
  }

  if (selectedOption.val() != "0") {
    val1 = true;
  } else {
    val1 = false;
  }
  checkdrop(val1, val2);
});

$("#store_plants").on("change", function () {
  const selectedOption = $(this).find("option:selected");
  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    // Remove the first option
    selectedOption.remove();
  }
  if (selectedOption.val() != "0") {
    val2 = true;
  } else {
    val2 = false;
  }
  checkdrop(val1, val2);
});

function checkdrop(val1, val2) {
  if (val1 == true && val2 == true) {
    $("#disabled_btn").removeAttr("disabled");
    $("#disabled_btn").css("background-color", "rgb(66 66 66)");
  } else {
    $("#disabled_btn").prop("disabled", true);
    $("#disabled_btn").css("background-color", "rgb(220 220 220)");
  }
}

// new code
function sendIndentToSelected(material, indent) {
  // console.log("new", material, indent);
  var indexcheck = $.map(selected, function (e) {
    return e;
  }).indexOf(material);

  if (indexcheck == -1) {
    selected.push(material);
  }
  //console.log("new", "1", selected);
  checkAllIndents(material, indent);
}

function checkAllIndents(material, indent) {
  //debugger;
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
  // console.log("new", "2", selected);
}

function checkIndents(item, checkedornot, propss) {
  if (checkedornot) {
    var indexcheck = $.map(selected, function (e) {
      return e;
    }).indexOf(item);

    $.each(selected[indexcheck].indents, function (index, item) {
      item.checkStatus = true;
      // propss.expanded = true;
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
getStoreLocations();
getUserStoreLocations();

function allPR(type_PR) {
  var url;
  var user_details = JSON.parse(localStorage.getItem("user_info"));
  switch (type_PR) {
    case "RequestforPR":
      url = host + path + "storeUser/purchase_request";
      var data = {
        user_id: user_details.user[0].id,
        sap_id: user_details.user[0].sap_user_id,
        requests: selected,
      };
      // console.log(data, "--------------------------");
      break;

    case "RejectPR":
      url = host + path + "storeUser/pr_reject";
      var data = {
        user_id: user_details.user[0].id,
        requests: selected,
      };
      // console.log(data, "--------------------------");
      break;

    case "HoldPR":
      url = host + path + "storeUser/pr_hold";
      var data = {
        user_id: user_details.user[0].id,
        requests: selected,
      };
      // console.log(data, "--------------------------");
      break;

    case "CancelPR":
      url = host + path + "storeUser/pr_cancel";
      var data = {
        user_id: user_details.user[0].id,
        requests: selected,
      };
      // console.log(data, "--------------------------");
      break;

    case "RaiseSTO":
      url = host + path + "storeUser/purchase_request";
      var data = {
        user_id: user_details.user[0].id,
        sap_id: user_details.user[0].sap_user_id,
        requests: selected,
      };
      // console.log(data, "--------------------------");
      break;

    default:
      alert("bad method call");
      break;
  }
  if (type_PR != "RaiseSTO") {
    if (indRemarks()) {
      // console.log("output", selected);
      selected.forEach((item) => {
        item.indents.forEach((element, index) => {
          if (element.checkStatus == false) {
            item.indents.splice(index, 1);
          }
        });
      });
      // console.log("data--> s", selected);

      js.ajax({
        url: url,
        method: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (response) {
          if (response.success === true) {
            toast_PRMaterials("success", response.message);
            selected = [];
            setTimeout(() => {
              //getWBSMaterials();
              location.reload(true);
            }, 1000);
          }
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error);
          setTimeout(() => {
            spinner(false);
          }, 300);
          //toast_PRMaterials("warning", "Api failed. Please try again.");
        },
        complete: function (xhr, status) {
          if (status === "error" || !xhr.responseText) {
            setTimeout(() => {
              spinner(false);
            }, 300);
            toast_PRMaterials(
              "error",
              "Network error. Please try again later."
            );
          }
        },
      });
    }
  } else {
    if (formvalidate()) {
      // alert("formvalidate done");
      selected.forEach((item) => {
        item.indents.forEach((element, index) => {
          if (element.checkStatus == false) {
            item.indents.splice(index, 1);
          }
        });
      });
      var plant = store_plants.find(
        (item) => item.id == $("#store_plants").val()
      );
      // console.log("data--> p", plant);

      var data = {
        order: {
          user_id: user_details.user[0].id,
          plant: plant,
          address: $("#user_store_locations").val(),
          total: 1000,
          WBS_NO: selected_wbs,
          items: selected,
        },
      };
      // console.log("data-->", data);

      js.ajax({
        url: url,
        method: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (response) {
          if (response.success === true) {
            toast_PRMaterials("success", response.message);
            selected = [];
            plant = undefined;
            address = undefined;
            getPRMaterials();
          }
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error);
          setTimeout(() => {
            spinner(false);
          }, 300);
          //toast_PRMaterials("warning", "Api failed. Please try again.");
        },
        complete: function (xhr, status) {
          if (status === "error" || !xhr.responseText) {
            setTimeout(() => {
              spinner(false);
            }, 300);
            toast_PRMaterials(
              "error",
              "Network error. Please try again later."
            );
          }
        },
      });
    }
  }
}

function indRemarks() {
  var check = true;
  selected.forEach((item) => {
    item.indents.forEach((element) => {
      if (element.checkStatus == true) {
        // get id remark and quantity
        var quantity = $("#quantity_" + item.id).val();
        var remarks = $("#remark_" + item.id + "_" + element.id).val();
        // console.log("output->", quantity.val(), remarks.val());
        if (type_no == 2 || type_no == 3 || type_no == 5) {
          if (remarks.trim() == "" || remarks.trim() == undefined) {
            toast_PRMaterials(
              "warning",
              "In " +
                item.material.material_sap_id +
                "-" +
                item.material.name +
                "- Please fill out remarks field"
            );
            check = false;
            return check;
          }
          element.remarks = remarks;
          item.pr_quantity = quantity;
        } else {
          if (quantity >= item.quantity) {
            if (remarks.trim() == "" || remarks.trim() == undefined) {
              var err =
                "In " +
                item.material.material_sap_id +
                "-" +
                item.material.name +
                "-  Please fill out remarks field ";
              alert(err);
              toast_PRMaterials("warning", err);
              check = false;
              return check;
            }
            element.remarks = remarks;
            item.pr_quantity = quantity;
          } else {
            var err =
              "In " +
              item.material.material_sap_id +
              "-" +
              item.material.name +
              "-  value must be greater then or equal to " +
              item.quantity;
            toast_PRMaterials("warning", err);
            check = false;
            return check;
          }
        }
      }
    });
  });
  return check;
}

function formvalidate() {
  debugger;
  var check = true;
  selected.forEach((item) => {
    item.indents.forEach((element) => {
      if (element.checkStatus == true) {
        // get id remark and quantity
        var dropdown = $("#dropdown" + item.id);
        dropdown.css("border-color", "");
        if (dropdown.val() == "0") {
          var err =
            "In " +
            item.material.material_sap_id +
            "-" +
            item.material.name +
            "-  Please fill out Dropdown field ";
          toast_PRMaterials("warning");
          dropdown.css("border-color", "red");
          check = false;
        } else {
          dropdown.css("border-color", "");
          item.priority_days = $("#quantity_" + item.id).val();
          item.delivery_priority = dropdown.val();
        }

        for (let i = 1; i < 5; i++) {
          $("#FormControlTextarea" + i + "_" + item.id).css("border-color", "");
          if (
            $("#FormControlTextarea" + i + "_" + item.id)
              .val()
              .trim() == "" ||
            $("#FormControlTextarea" + i + "_" + item.id)
              .val()
              .trim() == undefined
          ) {
            var err =
              "In " +
              item.material.material_sap_id +
              "-" +
              item.material.name +
              "-  Please fill out Textarea field ";
            toast_PRMaterials("warning", err);
            $("#FormControlTextarea" + i + "_" + item.id).css(
              "border-color",
              "red"
            );
            check = false;
          } else {
            $("#FormControlTextarea" + i + "_" + item.id).css(
              "border-color",
              ""
            );
          }
        }
        item.tracking_no = $("#FormControlTextarea1_" + item.id).val();
        item.section = $("#FormControlTextarea2_" + item.id).val();
        item.reason = $("#FormControlTextarea3_" + item.id).val();
        item.where_used = $("#FormControlTextarea4_" + item.id).val();
      }
    });
    // return check;
  });
  return check;
}

function toast_PRMaterials(action, msg) {
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  Command: toastr[action](msg);
}

function printpage(id) {
  setTimeout(() => {
    var divToPrint = document.getElementById(id);
    var newWin = window.open("", "Print-Window");

    newWin.document.open();

    // Link to external CSS file
    newWin.document.write(
      '<html><head><link rel="stylesheet" type="text/css" href="/css/print.css" />' +
        '<style type="text/css">' +
        "@media print {" +
        ".printBody { /* Add your additional print styles here if needed */ }" +
        "}" +
        '</style></head><body class="printBody" onload="window.print()" id="main">' +
        divToPrint.innerHTML +
        "</body></html>"
    );

    newWin.document.close();

    setTimeout(function () {
      newWin.close();
    }, 10);
  }, 500);
}
