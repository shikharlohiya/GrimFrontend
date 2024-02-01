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
  console.log("PRMaterials", PRMaterials);
  switch (type) {
    case 1:
      type_no = 1;
      AllPRMaterials();
      isChecked_Arr();
      break;

    case 2:
      type_no = 2;
      AllPRMaterials();
      isChecked_Arr();
      break;

    case 3:
      type_no = 3;
      AllPRMaterials();
      isChecked_Arr();
      break;

    case 4:
      type_no = 4;
      STOPRMaterials();
      isChecked_Arr();
      break;

    default:
      alert("bad method call");
      break;
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
    var obj = JSON.stringify(item);
    var main_checkbox =
      "<input type='checkbox' data-id='" +
      index +
      "' class='form-check-inputx rowCheckbox'  id='select_" +
      index +
      "' data-obj='" +
      obj +
      "' />";

    var text_field =
      "<div class='table-input'> <input id='quantity_" +
      item.id +
      "' type='text' min='1' max='" +
      Math.floor(item.quantity) +
      "' required /></div>";

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

      var remark_textfield =
        "<div class='table-input" +
        index1 +
        "'> <input type='text' id='remark_" +
        item.id +
        "_" +
        item_i.id +
        "' value='' class='' required /></div>";

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

      var tr = $(this).closest("tr");
      var toggleButton = tr.find("#toggleButton" + index);

      if (miniSelctor == "select") {
        console.log("select-> ", miniSelctor);
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
      var m_obj = $("#" + main_id).data("obj");
      if (isCheckedMain) {
        isChecked_Arr();
        var id = $("#" + main_id).attr("id");
        var total_sub = $("#" + main_id).data("obj").indents.length;

        //console.log("new", id, total_sub);

        // this for loop for check all sub checkbox
        for (let i = 0; i < total_sub; i++) {
          $(`#${id}_${i}`).prop("checked", true);
          m_obj.indents[i].checkStatus = true;
          sendIndentToSelected(m_obj, true);
        }
      } else {
        var id = $("#" + main_id).attr("id");
        console.log("uncheck", id);
        var total_sub = $("#" + main_id).data("obj").indents.length;
        console.log("total", total_sub, "main", desiredValue);

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

      if (isCheckedSub) {
        // console.log(  "new",   $("#" + main_id).data("obj"),  $("#" + sub_id).data("checkstatus"));
        var m_obj = $("#" + main_id).data("obj");
        m_obj.indents[0].checkStatus = true;
        // console.log("new", "0", m_obj);
        sendIndentToSelected(m_obj, true);
      } else {
        // console.log(  "new",   $("#" + main_id).data("obj"),  $("#" + sub_id).data("checkstatus"));
        var m_obj = $("#" + main_id).data("obj");
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
      console.log("index->", index, "subindex->", subindex);
      console.log("main_id->", main_id, "sub_id", sub_id);
      console.log(
        "============================================================================================="
      );
    }
    isChecked_Arr();
  });

  $("#selectAll").on("change", function () {
    console.log("PRMaterials", PRMaterials);
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
    var obj = JSON.stringify(item);
    var main_checkbox =
      "<input type='checkbox' data-id='" +
      index +
      "' class='form-check-inputx rowCheckbox'  id='STOselect_" +
      index +
      "' data-obj='" +
      obj +
      "' />";

    // Math.floor(item.quantity)
    var tracking_no = `<textarea class="form-control" id="exampleFormControlTextarea1" rows="1" maxlength="20"></textarea>`;
    var section = `<textarea class="form-control" id="exampleFormControlTextarea1" rows="1" maxlength="50"></textarea>`;
    var reason = `<textarea class="form-control" id="exampleFormControlTextarea1" rows="1" maxlength="100"></textarea>`;
    var where_used = `<textarea class="form-control" id="exampleFormControlTextarea1" rows="1"maxlength="100"></textarea>`;

    const Addbutton = `
      <button class="action-button toggle-button" data-index="${index}" id="STOtoggleButton${index}">
          <span class="material-symbols-rounded material-add">
              add_circle
          </span>
          <span class="material-symbols-rounded  material-remove">
              do_not_disturb_on
          </span>
      </button>`;

    var dropdown = `
            <select class="form-select dropdown${index}" aria-label="Default select example">
              <option value="0" selected></option>
              <option value="3">High</option>
              <option value="6">Medium</option>
              <option value="15">Low</option>
            </select>
    `;
    var priority_days =
      "<div class='table-input'> <input class='quantity_" +
      index +
      "' id='quantity_" +
      item.id +
      "' type='text' min='1' max='2' required disabled /></div>";

    $(document).on("change", ".dropdown" + index, function () {
      const selectedOption = $(this).find("option:selected");
      // Check if it is the first option with a value of 0
      if (selectedOption.index() === 0 && selectedOption.val() === "0") {
        // Remove the first option
        selectedOption.remove();
      }
      // Set the value of the input element to the selected option's value
      $(".quantity_" + index).val($(this).val());
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

      if (miniSelctor == "select") {
        console.log("select-> ", miniSelctor);
        if ($(this).is(":checked")) {
          if (!toggleButton.hasClass("expanded1")) {
            callnow();
          }
        }
      } else {
        callnow();
        console.log("STOtoggleButton-> ", miniSelctor);
      }

      //console.log(miniSelctor);
      function callnow() {
        if (toggleButton.hasClass("expanded1")) {
          tr.next().remove();
          //$("tr.expanded-row").remove();
          toggleButton.removeClass("expanded1");
          if ($("#STOselect_" + index).is(":checked")) {
            $("#STOselect_" + index).prop("checked", false);
          }
        } else {
          tr.after(
            '<tr class="expanded-row"><td colspan="12">' +
              formatRowDetailsSTO(item.indents, index)[0].innerHTML +
              "</td></tr>"
          );
          toggleButton.addClass("expanded1");
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

  $(document).on("click", "[type='checkbox']", function () {
    var id = this.id;
    var idParts = this.id.split("_");
    var desiredValue = idParts[1]; // Access the second part (index 1)
    var main_id = idParts[0] + "_" + desiredValue;

    // if main check box check
    if (idParts.length === 2 && idParts[0] === "select") {
      const isCheckedMain = $("#" + main_id).is(":checked");
      var m_obj = $("#" + main_id).data("obj");
      if (isCheckedMain) {
        isChecked_Arr();
        var id = $("#" + main_id).attr("id");
        var total_sub = $("#" + main_id).data("obj").indents.length;

        //console.log("new", id, total_sub);

        // this for loop for check all sub checkbox
        for (let i = 0; i < total_sub; i++) {
          $(`#${id}_${i}`).prop("checked", true);
          m_obj.indents[i].checkStatus = true;
          sendIndentToSelected(m_obj, true);
        }
      } else {
        var id = $("#" + main_id).attr("id");
        console.log("uncheck", id);
        var total_sub = $("#" + main_id).data("obj").indents.length;
        console.log("total", total_sub, "main", desiredValue);

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

      if (isCheckedSub) {
        // console.log(  "new",   $("#" + main_id).data("obj"),  $("#" + sub_id).data("checkstatus"));
        var m_obj = $("#" + main_id).data("obj");
        m_obj.indents[0].checkStatus = true;
        // console.log("new", "0", m_obj);
        sendIndentToSelected(m_obj, true);
      } else {
        // console.log(  "new",   $("#" + main_id).data("obj"),  $("#" + sub_id).data("checkstatus"));
        var m_obj = $("#" + main_id).data("obj");
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
      console.log("index->", index, "subindex->", subindex);
      console.log("main_id->", main_id, "sub_id", sub_id);
      console.log(
        "============================================================================================="
      );
    }
    isChecked_Arr();
  });

  $("#STOselectAll").on("change", function () {
    console.log("PRMaterials", PRMaterials);
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
    },
    error: function (err) {
      alert(err);
      console.log(err);
    },
  });
}

var buttonName = {
  1: "Request for PR",
  2: "Reject PR",
  3: "Cancel PR",
  4: "Raise STO",
};
var buttonName2 = {
  1: "RequestforPR",
  2: "RejectPR",
  3: "CancelPR",
  4: "RaiseSTO",
};
function isChecked_Arr() {
  // check selected for buttons
  var value = buttonName[type_no];
  var t_value_without_spaces = buttonName2[type_no];
  if (selected.length > 0) {
    $(".PRbutton").css("display", "block");
    $(".PRbutton").empty();
    $(".PRbutton").html(
      '<button type="submit" class="common-button Custom-btn common-blue-button" onclick="allPR(\'' +
        String(t_value_without_spaces) +
        "')\">" +
        value +
        "</button>"
    );
  } else {
    $(".PRbutton").css("display", "none");
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
  console.log("new", "2", selected);
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
//getStoreLocations();
//getUserStoreLocations();

function allPR(type_PR) {
  var url;
  switch (type_PR) {
    case "RequestforPR":
      url = host + path + "storeUser/purchase_request";
      var user_details = JSON.parse(localStorage.getItem("user_info"));
      var data = {
        user_id: user_details.user[0].id,
        sap_id: user_details.user[0].sap_user_id,
        requests: selected,
      };
      console.log(data, "--------------------------");
      break;

    case "RejectPR":
      url = host + path + "storeUser/pr_reject";
      var user_details = JSON.parse(localStorage.getItem("user_info"));
      var data = {
        user_id: user_details.user[0].id,
        requests: selected,
      };
      console.log(data, "--------------------------");
      break;

    case "CancelPR":
      url = host + path + "storeUser/pr_cancel";
      var user_details = JSON.parse(localStorage.getItem("user_info"));
      var data = {
        user_id: user_details.user[0].id,
        requests: selected,
      };
      console.log(data, "--------------------------");
      break;

    case "RaiseSTO":
      url = host + path + "storeUser/purchase_request";
      var user_details = JSON.parse(localStorage.getItem("user_info"));
      var data = {
        user_id: user_details.user[0].id,
        sap_id: user_details.user[0].sap_user_id,
        requests: selected,
      };
      console.log(data, "--------------------------");
      break;

    default:
      alert("bad method call");
      break;
  }
  if (type_PR != "RaiseSTO") {
    if (indRemarks()) {
      console.log("output", selected);
      selected.forEach((item) => {
        item.indents.forEach((element, index) => {
          if (element.checkStatus == false) {
            item.indents.splice(index, 1);
          }
        });
      });
      // console.log(this.selected);

      // js.ajax({
      //   url: url,
      //   method: "POST",
      //   contentType: "application/json;charset=UTF-8",
      //   data: JSON.stringify(data),
      //   success: function (response) {
      //     if (response.success === true) {
      //       toast("success", response.message);
      //       selected = [];
      //       setInterval(() => {
      //         getPRMaterials();
      //       }, 1000);
      //     }
      //   },
      //   error: function (xhr, status, error) {
      //     console.log("Error: " + error);
      //     setTimeout(() => {
      //       spinner(false);
      //     }, 300);
      //     toast("warning", "Api failed. Please try again.");
      //   },
      //   complete: function (xhr, status) {
      //     if (status === "error" || !xhr.responseText) {
      //       setTimeout(() => {
      //         spinner(false);
      //       }, 300);
      //       toast("error", "Network error. Please try again later.");
      //     }
      //   },
      // });
    }
  } else {
    if (formvalidate()) {
      alert("formvalidate done");
      selected.forEach((item) => {
        item.indents.forEach((element, index) => {
          if (element.checkStatus == false) {
            item.indents.splice(index, 1);
          }
        });
      });

      var data = {
        order: {
          user_id: this.user_details[0].id,
          plant: this.plant,
          address: this.address,
          total: 1000,
          WBS_NO: this.selected_wbs,
          items: this.selected,
        },
      };
      // console.log(data, "----req");

      axios
        .post(
          "" + process.env.VUE_APP_HOST1 + "/api/v4/storeUser/create_sto",
          data
        )
        .then(function (response) {
          // console.log(response, "res");

          //  eventBus.$emit("getIndentCount");
          vm.get_indent_count();

          vm.selected = [];

          vm.getPRMaterials();
          // vm.PRMaterials();
          vm.text = response.data.message;
          vm.snackbar = true;
          vm.snackbarColor = "success";
          vm.plant = undefined;
          vm.address = undefined;
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
        if (quantity > item.quantity) {
          if (remarks.trim() == "" || remarks.trim() == undefined) {
            toast(
              "warning",
              "In " +
                item.material.material_sap_id +
                "-" +
                item.material.name +
                "-  Please fill out remarks field "
            );
            check = false;
            return check;
          }
          element.remarks = remarks.trim();
          item.pr_quantity = quantity.trim();
        } else {
          toast(
            "warning",
            "In " +
              item.material.material_sap_id +
              "-" +
              item.material.name +
              "-  value must be greater then or equal to " +
              item.quantity
          );
          check = false;
          return check;
        }
      }
    });
  });
  return check;
}

function formvalidate() {
  var check = true;
  // selected.forEach((item) => {
  //   item.indents.forEach((element) => {
  //     if (element.checkStatus == true) {
  //       // get id remark and quantity
  //       var quantity = $("#quantity_" + item.id).val();
  //       var remarks = $("#remark_" + item.id + "_" + element.id).val();
  //       // console.log("output->", quantity.val(), remarks.val());
  //       if (quantity > item.quantity) {
  //         if (remarks.trim() == "" || remarks.trim() == undefined) {
  //           toast(
  //             "error",
  //             "In " +
  //               item.material.material_sap_id +
  //               "-" +
  //               item.material.name +
  //               "-  Please fill out remarks field "
  //           );
  //           check = false;
  //           return check;
  //         }
  //         element.remarks = remarks.trim();
  //         item.pr_quantity = quantity.trim();
  //       } else {
  //         toast(
  //           "error",
  //           "In " +
  //             item.material.material_sap_id +
  //             "-" +
  //             item.material.name +
  //             "-  value must be greater then or equal to " +
  //             item.quantity
  //         );
  //         check = false;
  //         return check;
  //       }
  //     }
  //   });
  // });
  return check;
}
