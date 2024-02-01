var url = window.location.href;
var parts = url.split("/");
var id = parts[parts.length - 1];
// console.log(id);
var indents;
let pagination = 1;
var statusbtn = "Pending";
var search = "";
var search_sto = "";
var tempobj;
var API;
var returnItem;
var obj;
var js = jQuery.noConflict(true);
let selected = []; // Initialize an array to store objects
var sto = false;
var movement_types = [
  {
    id: 1,
    movement_details: [],
  },
];
var return_reasons = [
  {
    id: 1,
    return_reasons_details: [],
  },
];

returnheaders = [
  { text: "SI NO", value: "" },

  { text: "Quantity", value: "qty" },
  { text: "STO", value: "sto" },
  { text: "Document No", value: "document" },
  { text: "Document Year", value: "document_year" },
  { text: "Actions", value: "" },
];

function getIndents() {
  //console.log(vm.order_id, "--------------");
  var APi = host + path + "order_details";
  var data = {
    user_id: User_id,
    order_id: id.toString(),
  };

  js.ajax({
    url: APi,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (response) {
      if (response.success == true) {
        indents = response.orders;
        // console.log("indents", indents);
        showaccordion(response);
      } else {
        console.log("error", response.orders);
        toast("warning", "error on order_details api ");
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
      console.error("Error creating data on user_store_locations:->>", error);
    },
  });
}

getIndents();

function IndentDetails(indents) {}

// set Headers
var headers = [
  {
    text: "",
    value: "",
    visibility: 1,
  },
  {
    text: "S NO",
    value: "",
    visibility: 1,
  },
  {
    text: "Material Name",
    value: "product_name",
    visibility: 1,
  },
  {
    text: "Base Unit",
    value: "base_unit",
    visibility: 1,
  },
  {
    text: "Stock",
    value: "stock",
    visibility: 0,
  },
  {
    text: "Status",
    value: "status",
    visibility: 1,
  },
  {
    text: "Demand Qty",
    value: "intial_qty",
    visibility: 1,
  },
  {
    text: "Issue Qty",
    value: "issued_qty",
    visibility: 1,
  },
  {
    text: "Pending Qty",
    value: "",
    visibility: 1,
  },
  {
    text: "Rejected Qty",
    value: "",
    visibility: 1,
  },
  {
    text: "Return Qty",
    value: "return_qty",
    visibility: 1,
  },
  {
    text: "Close",
    value: "closed",
    visibility: 2,
  },
  {
    text: "Total Price",
    value: "total_price",
    sortable: true,
    visibility: 1,
  },
  {
    text: "Delivery Date",
    value: "delivery_date",
    sortable: true,
    visibility: 1,
  },

  {
    text: "Tracking Plant",
    value: "tracking_no",
    sortable: true,
    visibility: 1,
  },
  {
    text: "Where in Plant",
    value: "section",
    sortable: true,
    visibility: 1,
  },
  {
    text: "Reason",
    value: "reason",
    sortable: true,
    visibility: 1,
  },
  {
    text: "Where Used",
    value: "where_used",
    sortable: true,
    visibility: 1,
  },
  {
    text: "Delivery Priority",
    sortable: true,
    value: "delivery_priority",
    visibility: 1,
  },
  {
    text: "Quality Check By",
    sortable: true,
    value: "Quality_Check_By",
    visibility: 1,
  },
  {
    text: "Actions",
    value: "",
    sortable: !1,
    visibility: 1,
  },

  // for visibility 3
  {
    text: "",
    value: "",
    visibility: 3,
  },
  {
    text: "S NO",
    value: "",
    visibility: 3,
  },
  {
    text: "Material Name",
    value: "product_name",
    visibility: 3,
  },
  {
    text: "Base Unit",
    value: "base_unit",
    visibility: 3,
  },
  {
    text: "Stock",
    value: "stock",
    visibility: 3,
  },
  {
    text: "Status",
    value: "status",
    visibility: 3,
  },
  {
    text: "Demand Qty",
    value: "intial_qty",
    visibility: 3,
  },
  {
    text: "Issue Qty",
    value: "issued_qty",
    visibility: 3,
  },
  {
    text: "Batch Id",
    value: "Batch_Id",
    visibility: 3,
  },
  {
    text: "Serial Numbers",
    value: "Serial_number",
    visibility: 3,
  },
  {
    text: "Pending Qty",
    value: "",
    visibility: 3,
  },
  {
    text: "Rejected Qty",
    value: "",
    visibility: 3,
  },
  {
    text: "Return Qty",
    value: "return_qty",
    visibility: 3,
  },
  {
    text: "Close",
    value: "closed",
    visibility: 3,
  },
  {
    text: "Total Price",
    value: "total_price",
    sortable: true,
    visibility: 3,
  },
  {
    text: "Delivery Date",
    value: "delivery_date",
    sortable: true,
    visibility: 3,
  },

  {
    text: "Tracking Plant",
    value: "tracking_no",
    sortable: true,
    visibility: 3,
  },
  {
    text: "Where in Plant",
    value: "section",
    sortable: true,
    visibility: 3,
  },
  {
    text: "Reason",
    value: "reason",
    sortable: true,
    visibility: 3,
  },
  {
    text: "Where Used",
    value: "where_used",
    sortable: true,
    visibility: 3,
  },
  {
    text: "Delivery Priority",
    sortable: true,
    value: "delivery_priority",
    visibility: 3,
  },
  {
    text: "Quality Check By",
    sortable: true,
    value: "Quality_Check_By",
    visibility: 3,
  },
  {
    text: "Actions",
    value: "",
    sortable: !1,
    visibility: 3,
  },

  // for visibility 4
  {
    text: "",
    value: "",
    visibility: 4,
  },
  {
    text: "S NO",
    value: "",
    visibility: 4,
  },
  {
    text: "Material Name",
    value: "product_name",
    visibility: 4,
  },
  {
    text: "Base Unit",
    value: "base_unit",
    visibility: 4,
  },
  {
    text: "Stock",
    value: "stock",
    visibility: 4,
  },
  {
    text: "Demand Qty",
    value: "intial_qty",
    visibility: 4,
  },
  {
    text: "Issue Qty",
    value: "issued_qty",
    visibility: 4,
  },
  {
    text: "Batch Id",
    value: "Batch_Id",
    visibility: 4,
  },
  {
    text: "Serial Numbers",
    value: "Serial_number",
    visibility: 4,
  },
  {
    text: "Pending Qty",
    value: "",
    visibility: 4,
  },
  {
    text: "Rejected Qty",
    value: "",
    visibility: 4,
  },
  {
    text: "Return Qty",
    value: "return_qty",
    visibility: 4,
  },
  {
    text: "Close",
    value: "closed",
    visibility: 4,
  },
  {
    text: "Total Price",
    value: "total_price",
    sortable: true,
    visibility: 4,
  },
  {
    text: "Tracking Plant",
    value: "tracking_no",
    sortable: true,
    visibility: 4,
  },
  {
    text: "Where in Plant",
    value: "section",
    sortable: true,
    visibility: 4,
  },
  {
    text: "Reason",
    value: "reason",
    sortable: true,
    visibility: 4,
  },
  {
    text: "Where Used",
    value: "where_used",
    sortable: true,
    visibility: 4,
  },
  {
    text: "Delivery Priority",
    sortable: true,
    value: "delivery_priority",
    visibility: 4,
  },
  {
    text: "Status",
    value: "status",
    visibility: 4,
  },
  {
    text: "Actual Indents",
    sortable: true,
    value: "Actual Indents",
    visibility: 4,
  },
  {
    text: "Actions",
    value: "",
    sortable: !1,
    visibility: 4,
  },
];

function computedHeaders() {
  if (User_role === 3) {
    return headers.filter((header) => header.visibility === 1);
  } else if (User_role === 5 && sto == true) {
    return headers.filter((header) => header.visibility === 4);
  } else if (User_role === 5) {
    return headers.filter((header) => header.visibility === 3);
  } else if (
    User_role === 2 ||
    User_role === 7 ||
    User_role === 8 ||
    User_role === 9 ||
    User_role === 19 ||
    User_role === 11
  ) {
    return headers.filter(
      (header) =>
        header.visibility !== 2 &&
        header.visibility !== 3 &&
        header.visibility !== 4
    );
  } else if (User_role === 8) {
    return headers.filter(
      (header) =>
        header.visibility !== 2 &&
        header.text !== "Actions" &&
        header.visibility !== 3 &&
        header.visibility !== 4
    );
  } else {
    return headers;
  }
}

function showaccordion(data) {
  console.log(data);
  let mainArray = [];
  if (data.orders.result == "") {
    if (sto == true) {
      var printContainer = document.getElementById("faq_sto");
      printContainer.innerHTML = `<div style="display: flex; justify-content: center; align-items: center;"><h4>No STO yet</h4></div>`;
    } else {
      var printContainer = document.getElementById("faq");
      printContainer.innerHTML = `<div style="display: flex; justify-content: center; align-items: center;"><h4>No Indents yet</h4></div>`;
    }
  } else {
    // Logindata.user[0].role_id;

    if (sto == true) {
      var printContainer = document.getElementById("faq_sto");
    } else {
      var printContainer = document.getElementById("faq");
    }

    tempobj = data.orders;
    printContainer.innerHTML = "";
    var status_no;

    data.orders.forEach((element, index) => {
      // check and set button color and text
      // debugger;
      var Indent_status = checkStatusNew(element.order_items);
      var indent_btn =
        "<button class='lable_button " +
        checkStatusColor(element.order_items) +
        "'>" +
        Indent_status +
        "</button>";

      // check urgent_flag
      let urgent_flag;
      element.urgent_flag == 1
        ? (urgent_flag = `<div class="urgent-img-wrap"><img src="../images/urgent.png"></div>`)
        : (urgent_flag = "");

      let return_btn;
      if (
        checkStatusNew(element.order_items) == "Close" &&
        User_id == element.user_id &&
        sto != true
      ) {
        //console.log("element->>>", element);
        var arg = JSON.stringify(element);
        // console.log(arg);
        return_btn =
          "<buttons class='common-button common-blue-button return_btn' onclick='repeatIndent(" +
          arg +
          ")'><span class='material-symbols-rounded'>repeat</span>Repeat</buttons>";
      } else {
        return_btn = "";
      }

      var delivery_type = "";
      if (sto != true) {
        delivery_type = `
          <button class="common-button common-blue-button">
            ${element.delivery_type}
          </button>
        `;
      }
      // indent_approvals
      var card_header;
      if (!sto) {
        card_header = `
        <div class="card-header" id="faqhead${index}">
            <a class="btn btn-header-link collapsed"
                data-toggle="collapse" data-target="#faq${index}"
                aria-expanded="true" aria-controls="faq${index}">
                <div>
                    <div class="row">
                        <div class="col-md-2 cust-border-wrap">
                          ${urgent_flag}
                            <div class="date-time-wrap">
                                <h3>${dateconvert(element.created_at)}</h3>
                                <div class="mb-4">
                                    ${indent_btn}
                                </div>
                                <div class="mb-4">
                                    ${return_btn}
                                </div>
                                <div>
                                    ${delivery_type}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <p><b>indent id :</b> <span>${element.id}</span></p>
                            <p><b> indentor name :</b> <span>${
                              element.first_name
                            }</span></p>
                            <p> <b>Store address :</b>
                                <span>${
                                  element.store_address.plant_id +
                                  "-" +
                                  element.store_address.storage_location +
                                  "-" +
                                  element.store_address.name1
                                }</span>
                            </p>
                            <p><b> Delivery Address : </b> ${
                              element.address.plant_id +
                              "-" +
                              element.address.storage_location +
                              "-" +
                              element.address.name1
                            }
                            </p>
                        </div>
                        <div class="col-md-4">
                            <div class="amount-info">
                                <p><b>WBS Elementor No :</b>
                                    <span>${element.WBS_NO}</span>
                                </p>
                                <p><b>Total amount:</b>
                                    <span> ${currencyFormatter.format(
                                      element.total
                                    )}</span>
                                </p>
                                <p><b> Total item:</b> <span>${
                                  element.total_items == undefined
                                    ? ""
                                    : element.total_items
                                }</span></p>
                                <p><b>total Quntity:</b> <span>${
                                  element.total_quantity == undefined
                                    ? ""
                                    : element.total_quantity
                                }</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
          </div>`;
      } else {
        card_header = `
        <div class="card-header" id="faqhead_sto${index}">
            <a class="btn btn-header-link collapsed"
                data-toggle="collapse" data-target="#faq${index}"
                aria-expanded="true" aria-controls="faq${index}">
                <div>
                    <div class="row">
                        <div class="col-md-2 cust-border-wrap">
                          ${urgent_flag}
                            <div class="date-time-wrap">
                                <h3>${dateconvert(element.created_at)}</h3>
                                <div class="mb-4">
                                    ${indent_btn}
                                </div>
                                <div class="mb-4">
                                    ${return_btn}
                                </div>
                                <div>
                                    ${delivery_type}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <p><b>indent id :</b> <span>${element.id}</span></p>
                            <p><b> indentor name :</b> <span>${
                              element.first_name
                            }</span></p>
                            <p> <b>Store address :</b>
                                <span>${
                                  element.store_address.plant_id +
                                  "-" +
                                  element.store_address.storage_location +
                                  "-" +
                                  element.store_address.name1
                                }</span>
                            </p>
                            <p><b> Delivery Address : </b> ${
                              element.address.plant_id +
                              "-" +
                              element.address.storage_location +
                              "-" +
                              element.address.name1
                            }
                            </p>
                        </div>
                        <div class="col-md-4">
                            <div class="amount-info">
                                <p><b>WBS Elementor No :</b>
                                    <span>${element.WBS_NO}</span>
                                </p>
                                <p><b>Total amount:</b>
                                    <span> ${currencyFormatter.format(
                                      element.total
                                    )}</span>
                                </p>
                                <p><b> Total item:</b> <span>${
                                  element.total_items == undefined
                                    ? ""
                                    : element.total_items
                                }</span></p>
                                <p><b>total Quntity:</b> <span>${
                                  element.total_quantity == undefined
                                    ? ""
                                    : element.total_quantity
                                }</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
          </div>`;
      }

      var tr = "";

      var tr_data_array = [];
      var temp_orders = [];
      var order_data = [];
      element.order_items?.forEach((orders, o_index) => {
        //console.log("orders", orders);
        var v_type;
        var disabled = "";

        // if (User_role == 2 || User_role == 5) {
        //   disabled = "";
        // } else {
        //   disabled = "disabled";
        // }
        if (sto != true) {
          if (
            (User_role == 11 &&
              (orders.status == "approved" || orders.status == "Hold") &&
              orders.approval_finish == "1" &&
              orders.rm_approval == "0") ||
            (User_role == 5 &&
              orders.status != "pending" &&
              orders.status != "rejected" &&
              orders.status != "PR Rejected" &&
              orders.rm_approval == "1" &&
              orders.close == 0) ||
            (User_role == 3 &&
              orders.actual_issued_qty - orders.received_qty > 0) ||
            ((User_role == 2 ||
              User_role == 7 ||
              User_role == 8 ||
              User_role == 9) &&
              orders.actual_issued_qty - orders.received_qty > 0 &&
              orders.created_by == User_id) ||
            checkApproval(orders.indent_approvals)
          ) {
            disabled = "";
          } else {
            disabled = "disabled";
          }
        } else {
          //sto
          //debugger;
          console.log("orders:sto ", orders);
          if (
            (User_id == element.user_id &&
              (orders.status == "pending" ||
                orders.actual_issued_qty - orders.received_qty <= 0)) ||
            (User_id != element.user_id &&
              (orders.stock == 0 || orders.close == 1))
          ) {
            disabled = "disabled";
          } else {
            //debugger;
            disabled = "";
          }
        }
        //console.log("disabled--->>>", disabled);
        //debugger;
        var editbtn = "";
        var deletebtn = "";
        if (orders.status == "pending" || orders.status == "Hold") {
          if (User_role != 5 && orders.created_by == User_id) {
            editbtn = ` <span onclick="editpopshow(${orders.id},${element.id})"
              data-toggle="modal"
              data-target="#indentApprovaledit">
              <span class="material-symbols-rounded">edit</span>
              </span>
              &nbsp;&nbsp;&nbsp;`;
          }
        }
        const ordersObj = JSON.stringify(orders);
        if (editbtn == "") {
          if (
            orders.status != "pending" &&
            orders.status != "approved" &&
            User_role != 5 &&
            User_id == element.user_id
          ) {
            //console.log("Data received:", obj);
            editbtn =
              "<span data-bs-toggle='modal' data-bs-target='#return_alert' onclick='return_alert(" +
              ordersObj +
              ")'><span class='material-symbols-rounded' style='color: green;cursor: pointer;'>keyboard_return</span></span>";
          }
        }
        if (sto == true) {
          if (
            orders.status != "pending" &&
            orders.status != "STO Dispatched" &&
            User_id == element.user_id
          ) {
            editbtn =
              "<span data-bs-toggle='modal' data-bs-target='#return_alert' onclick='return_alert(" +
              ordersObj +
              ")'><span class='material-symbols-rounded' style='color: green;cursor: pointer;'>keyboard_return</span></span>";
          }
        }

        if (
          orders.status == "pending" &&
          User_role != 5 &&
          orders.created_by == User_id
        ) {
          deletebtn = `
          <span class="redicon" onclick="deletealert(${orders.id},${element.id})">
          <span class="material-symbols-rounded delete">delete</span>
          </span>`;
        }

        if (orders.valution_type != 0 && orders.valution_type != undefined) {
          v_type = `<p class="cust-badge">
                      ${orders.valution_type}
                    </p>`;
        } else {
          v_type = "";
        }
        // console.log("orders->", orders);
        // console.log("tempobj->", tempobj);
        var check_box =
          "<div class='form-check'><input type='checkbox' data-index='" +
          index +
          "' data-obj='" +
          orders.id +
          "' data-mainId='" +
          element.id +
          //JSON.stringify(orders) +
          "' class='form-check-input checkbox'" +
          disabled +
          " " +
          "id='checkbox_" +
          index +
          "_" +
          o_index +
          "'></div>";

        var order_id = `<div><p>${
          orders.product_sap_id + "-" + orders.product_name
        }</p>${v_type}</div>`;

        var action = "";

        if (sto != true) {
          action = `
          <div>
            <p class='timeline-text-modal' style="display: flex;justify-content: space-around;" onclick='onepopshow(${orders.id})'data-toggle='modal' data-target='#indent-timeline-modal'>
                <span class='material-symbols-rounded'>visibility</span>TIMELINE</p>
            <p class='timeline-text-modal' style="display: flex;justify-content: space-around;" onclick='twopopshow(${orders.id})' data-toggle='modal' data-target='#indentApproval'>
                <span class='material-symbols-rounded'>visibility</span>Approval Flow   </p>
          <p>${editbtn}${deletebtn}</p></div>`;
        } else {
          action = `
          <div>
            <p class='timeline-text-modal' style="display: flex;justify-content: space-around;" onclick='onepopshow(${orders.id})'data-toggle='modal' data-target='#indent-timeline-modal'>
                <span class='material-symbols-rounded'>visibility</span></p>
            <p>${editbtn}</p>
          </div>`;
        }

        var stock = "";
        if (User_role != 3) {
          stock = orders.stock.toFixed(2);
        }
        var status_bar;

        var status_text =
          checkApprovalStatus(orders.indent_approvals) == null
            ? orders.status
            : checkApprovalStatus(orders.indent_approvals);

        if (orders.status == "PR Raised" && orders.is_pr_raised == "0") {
          status_bar =
            "<button class='lable_button " +
            removeSpaceFromColor(orders.color) +
            "'>" +
            "PR Requested" +
            "</button>";
        } else if (orders.status == "approved") {
          status_bar =
            "<button class='lable_button " +
            removeSpaceFromColor(orders.color) +
            "'>" +
            status_text +
            "</button>";
        } else {
          // alert(orders.status);
          status_bar =
            "<button class='lable_button " +
            removeSpaceFromColor(orders.color) +
            "'>" +
            orders.status +
            "</button>";
        }

        var issued_qty;
        if (User_role != 5) {
          issued_qty = orders.issued_qty.toFixed(2);
        }
        // i have to check below code
        var issued_qty;
        if (User_role == 5 && selected != true) {
          issued_qty = orders.issued_qty.toFixed(2);
        }
        var closed;
        if (User_role == 5 && sto != true) {
          // console.log("item.closed", orders.closed);
          let isChecked = orders.closed === 1 ? "checked" : "";

          //console.log("item.closed ------", isChecked); // Conditionally set checked attribute ${isChecked}
          // if (orders.closed === 1) {
          closed =
            "<label class='pure-material-switch'>" +
            "<input  type='checkbox' class='checkbox_m_" +
            orders.id +
            "' id='checkbox_m_" +
            index +
            "_" +
            o_index +
            "'" +
            "value='" +
            orders.closed +
            "'disabled>" +
            "<span></span>" +
            "</label>";
        } else if (User_role == 5) {
          /// this is sto code
          // console.log("item.closed", orders.closed);
          let isChecked = orders.closed === 1 ? "checked" : "";

          //console.log("item.closed ------", isChecked); // Conditionally set checked attribute ${isChecked}
          // if (orders.closed === 1) {
          closed =
            "<label class='pure-material-switch'>" +
            "<input  type='checkbox' class='checkbox_m_" +
            orders.id +
            "' id='checkbox_m_s_" +
            index +
            "_" +
            o_index +
            "'" +
            "value='" +
            orders.closed +
            "'disabled>" +
            "<span></span>" +
            "</label>";
        }
        var total_price =
          "<i> &#8377; </i>" + orders.total_price.toLocaleString();

        var batch_id = "";

        if (orders && orders.batch_ids && orders.batch_ids.length > 0) {
          batch_id = `<select name="batch_ids" id="batch_ids_${orders.id}" data-id="${index}">`;
          batch_id += `<option value="0"></option>`;
          orders.batch_ids.forEach(function (item) {
            batch_id += `<option value="${item.batch_id}">
                  ${item.batch_id} (${item.stock})
                </option>`;
          });
          batch_id += `</select>`;
        } else {
          batch_id = "---";
        }

        var serial_number;
        if (
          orders &&
          orders.serial_numbers &&
          orders.serial_numbers.length > 0
        ) {
          serial_number = orders.serial_numbers
            .map(function (value) {
              return value;
            })
            .join(", ");
        } else {
          serial_number = "---";
        }

        var issued_qty = `<input id="quantity_${orders.id}" data-id="${index}" min="0" max="${orders.stock}" value="${orders.issued_qty}" type="number" style="border: none;outline: none;"disabled required>`;
        // store in array
        if (User_role == 3) {
          tr_data_array.push([
            check_box,
            o_index + 1,
            order_id,
            orders.base_unit,
            status_bar,
            orders.intial_qty.toFixed(2),
            orders.issued_qty.toFixed(2),
            orders.remaining_qty.toFixed(2),
            orders.rejected_qty.toFixed(2),
            orders.return_qty.toFixed(2),
            total_price,
            moment(orders.delivery_date).format("Do MMM YYYY"),
            orders.tracking_no,
            orders.section,
            orders.reason,
            orders.where_used,
            orders.delivery_priority,
            orders.quality_check_by == undefined
              ? "---"
              : orders.quality_check_by,
            action,
          ]);
        } else if (User_role == 5 && sto == true) {
          tr_data_array.push([
            check_box,
            o_index + 1,
            order_id,
            orders.base_unit,
            orders.stock.toFixed(2),
            orders.intial_qty.toFixed(2),
            issued_qty,
            batch_id,
            serial_number,
            orders.remaining_qty.toFixed(2),
            orders.rejected_qty.toFixed(2),
            orders.return_qty.toFixed(2),
            closed,
            total_price,
            //moment(orders.delivery_date).format("Do MMM YYYY"),
            orders.tracking_no,
            orders.section,
            orders.reason,
            orders.where_used,
            orders.delivery_priority,
            status_bar,
            orders.actual_indents,
            action,
          ]);
        } else if (User_role == 5) {
          tr_data_array.push([
            check_box,
            o_index + 1,
            order_id,
            orders.base_unit,
            orders.stock.toFixed(2),
            status_bar,
            orders.intial_qty.toFixed(2),
            issued_qty,
            batch_id,
            serial_number,
            orders.remaining_qty.toFixed(2),
            orders.rejected_qty.toFixed(2),
            orders.return_qty.toFixed(2),
            closed,
            total_price,
            moment(orders.delivery_date).format("Do MMM YYYY"),
            orders.tracking_no,
            orders.section,
            orders.reason,
            orders.where_used,
            orders.delivery_priority,
            orders.quality_check_by == undefined
              ? "---"
              : orders.quality_check_by,
            action,
          ]);
        } else {
          tr_data_array.push([
            check_box,
            o_index + 1,
            order_id,
            orders.base_unit,
            (stock = orders.stock.toFixed(2)),
            status_bar,
            orders.intial_qty.toFixed(2),
            orders.issued_qty.toFixed(2),
            orders.remaining_qty.toFixed(2),
            orders.rejected_qty.toFixed(2),
            orders.return_qty.toFixed(2),
            total_price,
            moment(orders.delivery_date).format("Do MMM YYYY"),
            orders.tracking_no,
            orders.section,
            orders.reason,
            orders.where_used,
            orders.delivery_priority,
            orders.quality_check_by == undefined
              ? "---"
              : orders.quality_check_by,
            action,
          ]);
        }

        console.log("length", tr_data_array);
        order_data.push(tr_data_array);
        selected.push(orders);
      });
      mainArray.push(order_data);
      // var o_obj = JSON.stringify(orders);

      // console.log("temp_orders", selected);
      var remark_input;
      var remark_btn;
      var dropdown;
      if (
        selected.length > 0 &&
        (User_role == 2 ||
          User_role == 7 ||
          User_role == 8 ||
          User_role == 9 ||
          User_role == 19 ||
          User_role == 11) &&
        selected.created_by != User_id
      ) {
        remark_input =
          "<label for='comment'>Remark</label>" +
          "<textarea class='form-control comment" +
          index +
          "' name='remark' data-index='" +
          index +
          "' rows='3' id='comment" +
          index +
          "' required></textarea>" +
          "<span class='Error-show error-msg" +
          index +
          "'></span>";

        var hold_btn = "";
        if (User_role == 11) {
          hold_btn =
            "<button class='btn common-button common-flex-icon-btn common-blue-button' onclick='approveItem(22)' disabled id='btn_hold" +
            index +
            "'>Hold<span class='material-symbols-rounded'>pause_circle</span></button>";
        }

        remark_btn =
          "<div class='fromgroup-btn'>" +
          "<button class='btn common-button common-flex-icon-btn common-blue-button' id='btn_approve" +
          index +
          "' data-index='" +
          index +
          "' onclick='approveItem(2)' disabled>APPROVE<span class='material-symbols-rounded' >check</span></button>" +
          hold_btn +
          "<button class='btn common-button common-flex-icon-btn common-red-button' disabled onclick='approveItem(3)" +
          "' id='btn_reject" +
          index +
          "'>REJECT<span class='material-symbols-rounded'>close</span></button>" +
          "</div>";
      }

      if (selected.length > 0 && User_role == 3) {
        remark_input =
          "<label for='comment'>Remark</label>" +
          "<textarea maxlength='300' class='form-control remark_input comment" +
          index +
          "' name='remark' data-index='" +
          index +
          "' rows='3' id='comment" +
          index +
          "' required></textarea>" +
          "<span class='Error-show error-msg" +
          index +
          "'></span><br>" +
          "<select class='form-select movement_type movement_type" +
          index +
          "' id='movement_type' aria-label='Disabled select example' disabled> </select>";
        remark_btn =
          "<div class='fromgroup-btn'>" +
          "<button class='btn common-button common-flex-icon-btn common-green-button remark_btn' disabled id='btn_Received" +
          index +
          "' onclick='approveItem(11)" +
          "'>Received<span class='material-symbols-rounded'>check</span></button>" +
          "</div>";
      }

      if (
        selected.length > 0 &&
        User_role == 2 &&
        selected[0].created_by == User_id
      ) {
        remark_input =
          "<label for='comment'>Remark</label>" +
          "<textarea class='form-control remark_input comment" +
          index +
          "' name='remark' data-index='" +
          index +
          "' rows='3' id='comment" +
          index +
          "' required></textarea>" +
          "<span class='Error-show error-msg" +
          index +
          "'></span><br>" +
          "<select class='form-select movement_type movement_type" +
          index +
          "' id='movement_type' aria-label='Disabled select example' disabled> </select>";
        remark_btn =
          "<div class='fromgroup-btn'>" +
          "<button class='btn common-button common-flex-icon-btn common-green-button remark_btn' disabled id='btn_Received" +
          index +
          "' onclick='approveItem(11)" +
          "'>Received<span class='material-symbols-rounded'>check</span></button>" +
          "</div>";
      }

      //for role 5 -> selected.length > 0 && user_details[0].role_id == 5 is working on
      var movement_types = "";
      var wbs_E_number = "";
      var company_codes = "";
      var Remark = "";

      if (selected.length > 0 && User_role == 5 && sto == true) {
        movement_types =
          '<b><label for="movement_types' +
          index +
          '">Select a Movement Type*</label></b>' +
          '<select class="form-select form-select movement_type" id="movement_types' +
          index +
          '" aria-label=".form-select-sm example" disabled></select>';
        Remark =
          "<b><label for='comment_sto'>Remark</label></b>" +
          "<textarea class='form-control' name='remark' rows='1' id='comment_sto" +
          index +
          "' required></textarea>" +
          "<span class='Error-show error-msg" +
          index +
          "'></span>";

        remark_input =
          '<div class="row">' +
          '<div class="col-md-6">' +
          Remark +
          "</div>" +
          '<div class="col-md-6">' +
          movement_types +
          "</div>" +
          "</div>";
        if (selected.length > 0 && User_id != element.user_id) {
          remark_btn = `<div class="fromgroup-btn">
              <button class="btn common-button common-flex-icon-btn common-blue-button" id="btn_approve_sto${index}" data-index="${index}"
              onclick="VerifyissueQty('${element.WBS_NO}')" disabled>STO ISSUE<span class="material-symbols-rounded" >check</span></button>

              <button class="btn common-button common-flex-icon-btn common-red-button" disabled onclick="approveItem(3)" id="btn_reject_sto${index}">
              REJECT<span class="material-symbols-rounded">close</span></button></div>
              `;
        }
        if (selected.length > 0 && User_id == element.user_id) {
          remark_btn = `<div class="fromgroup-btn">
          <button class="btn common-button common-flex-icon-btn common-blue-button" id="btn_approve_sto${index}" data-index="${index}"
          onclick="approveItem(21)" disabled>STO Received<span class="material-symbols-rounded" >check</span></button>
          `;
        }
      } else if (selected.length > 0 && User_role == 5) {
        movement_types =
          '<b><label for="movement_types' +
          index +
          '">Select a Movement Type*</label></b>' +
          '<select class="form-select form-select-sm movement_type" id="movement_types' +
          index +
          '" aria-label=".form-select-sm example"></select>';
        // if (indent.wbs_check == 0) {// }
        wbs_E_number =
          '<b><label for="wbs_E_number' +
          index +
          '">WBS Element Number</label></b>' +
          '<select class="form-select form-select-sm" id="wbs_E_number' +
          index +
          '" aria-label=".form-select-sm example"></select>';
        var options = "";
        options += `<option value="0">Select a Cost Center</option>`;
        element.cost_centers?.forEach((c) => {
          options += `<option value="${c.cost_center}">${c.cost_center}</option>`;
        });
        company_codes =
          '<b><label for="company_codes' +
          index +
          '">Select a Cost Center</label></b>' +
          '<select class="form-select form-select-sm" id="company_codes' +
          index +
          '" aria-label=".form-select-sm example">' +
          options +
          "</select>";

        Remark =
          "<b><label for='comment'>Remark</label></b>" +
          "<textarea class='form-control' name='remark' rows='1' id='comment" +
          index +
          "' required></textarea>" +
          "<span class='Error-show error-msg" +
          index +
          "'></span>";

        remark_input =
          '<div class="row">' +
          '<div class="col-md-3">' +
          Remark +
          "</div>" +
          '<div class="col-md-3">' +
          movement_types +
          "</div>" +
          '<div class="col-md-3">' +
          wbs_E_number +
          "</div>" +
          '<div class="col-md-3">' +
          company_codes +
          "</div>" +
          "</div>";

        var wbs = element.WBS_NO;
        remark_btn = `<div class="fromgroup-btn">
                <button class="btn common-button common-flex-icon-btn common-blue-button" id="btn_approve${index}" data-index="${index}"
                onclick="VerifyissueQty('${wbs}')" disabled>Issue<span class="material-symbols-rounded" >check</span></button>

                <button class="btn common-button common-flex-icon-btn common-red-button" disabled onclick="approveItem(3)" id="btn_reject${index}">
                REJECT<span class="material-symbols-rounded">close</span></button></div>
                `;

        // "<div class='fromgroup-btn'>" +
        // "<button class='btn common-button common-flex-icon-btn common-blue-button' id='btn_approve" +
        // index +
        // "' data-index='" +
        // index +
        // "' onclick='VerifyissueQty(" +
        // element.WBS_NO +
        // ")' disabled>Issue<span class='material-symbols-rounded' >check</span></button>" +
        // "<button class='btn common-button common-flex-icon-btn common-red-button' disabled onclick='approveItem(3)" +
        // "' id='btn_reject" +
        // index +
        // "'>REJECT<span class='material-symbols-rounded'>close</span></button>" +
        // "</div>";
      }

      if (sto != true) {
        var inputbox_remark = `
          <div class="form-group" id="remarksection${index}" style="display: none;" >
          ${remark_input}${remark_btn}
          </div>`;
      } else {
        var inputbox_remark = `
          <div class="form-group" id="remarksection_sto${index}" style="display: none;" >
          ${remark_input}${remark_btn}
          </div>`;
      }

      // change event

      $(document).on("change", ".movement_type", function () {
        selectedValue = $(this).val();
        var selectedOption = $(this).find("option:selected");
        // Check if it is the first option with a value of 0
        if (selectedOption.index() === 0 && selectedOption.val() === "0") {
          // Remove the first option
          selectedOption.remove();
        } else {
          // Get the value of the data-id attribute
          selectedId = selectedOption.data("id");
        }
      });

      $(document).on("change", "#wbs_E_number" + index, function () {
        selectedValue = $(this).val();
        var selectedOption = $(this).find("option:selected");
        // Check if it is the first option with a value of 0
        if (selectedOption.index() === 0 && selectedOption.val() === "0") {
          // Remove the first option
          selectedOption.remove();
        } else {
          // Get the value of the data-id attribute
          selectedId = selectedOption.data("id");
        }
      });

      $(document).on("change", "#company_codes" + index, function () {
        selectedValue = $(this).val();
        var selectedOption = $(this).find("option:selected");
        // Check if it is the first option with a value of 0
        if (selectedOption.index() === 0 && selectedOption.val() === "0") {
          // Remove the first option
          selectedOption.remove();
        } else {
          // Get the value of the data-id attribute
          selectedId = selectedOption.data("id");
        }
      });

      if (sto === true) {
        var collapse = `
                                <div id="faq${index}" class="collapse showx" aria-labelledby="faqhead1"
                                    data-parent="#faq">
                                    <div class="card-body">
                                        <div>
                                            <div id="table-scroll"
                                                class="table-scroll table-scroll-wrap">
                                                <table id="main-table_sto${index}" class="main-table" cellspacing="0" width="100%">
                                                    <thead>
                                                        <tr>
                                                            ${generateTableHeaders(
                                                              index
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbody${index}${
          element.id
        }">
                                                        ${tr}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div id="remark_box${index}">
                                                ${inputbox_remark}
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
      } else {
        var collapse = `
                                <div id="faq${index}" class="collapse showx" aria-labelledby="faqhead1"
                                data-parent="#faq">
                                <div class="card-body">
                                    <div>
                                        <div id="table-scroll"
                                            class="table-scroll table-scroll-wrap">
                                            <table id="main-table${index}" class="main-table" cellspacing="0" width="100%">
                                                <thead>
                                                    <tr>
                                                        ${generateTableHeaders(
                                                          index
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody id="tbody${index}${
          element.id
        }">
                                                    ${tr}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="remark_box${index}">
                                            ${inputbox_remark}
                                        </div>
                                    </div>
                                    </div>
                                    </div>`;
      }

      // Function to generate dynamic table headers based on computedHeaders
      function generateTableHeaders(index) {
        var headerHTML = "";
        var computedHeadersList = computedHeaders();
        var count = 0;
        $.each(computedHeadersList, function (_, header) {
          if (header.text == "Status") {
            status_no = count;
          }
          count++;
          headerHTML += `<th>${header.text}</th>`;
        });

        return headerHTML;
      }

      var card = `
        <div class="card">
            ${card_header + collapse}
        </div>`;
      // add all data in page
      printContainer.innerHTML += card;

      //valiadtion code
      $(document).on(
        "change",
        ".comment" + index,
        ".movement_type" + index,
        function () {
          //console.log("comment index---", index);
          if ($(this).val().trim() !== "") {
            // Enable the button
            $("#btn_approve" + index).prop("disabled", false);
            $("#btn_reject" + index).prop("disabled", false);
            $("#btn_hold" + index).prop("disabled", false);
            $("#btn_Received" + index).prop("disabled", false);
            $("#btn_approve" + index).prop("disabled", false);
            $("#btn_approve_sto" + index).prop("disabled", false);
            $("#btn_reject_sto" + index).prop("disabled", false);
          } else {
            // Disable the button
            $("#btn_approve" + index).prop("disabled", true);
            $("#btn_reject" + index).prop("disabled", true);
            $("#btn_hold" + index).prop("disabled", true);
            $("#btn_Received" + index).prop("disabled", true);
            $("#btn_approve" + index).prop("disabled", true);
            $("#btn_approve_sto" + index).prop("disabled", true);
            $("#btn_reject_sto" + index).prop("disabled", true);
          }
        }
      );

      $(document).on("keyup", "#comment" + index, function () {
        //console.log("index---", index);
        if ($(this).val().trim() !== "") {
          // Enable the button
          if (User_role != 5) {
            $("#btn_approve" + index).prop("disabled", false);
          }
          $("#btn_hold" + index).prop("disabled", false);
          $("#btn_reject" + index).prop("disabled", false);
          $("#btn_reject_sto" + index).prop("disabled", false);
          $("#btn_approve_sto" + index).prop("disabled", false);
        } else {
          // Disable the button
          if (User_role != 5) {
            $("#btn_approve" + index).prop("disabled", true);
          }
          $("#btn_hold" + index).prop("disabled", true);
          $("#btn_reject" + index).prop("disabled", true);
          $("#btn_reject_sto" + index).prop("disabled", true);
          $("#btn_approve_sto" + index).prop("disabled", true);
        }
      });
      $(document).on("keyup", "#comment_sto" + index, function () {
        //console.log("index---", index);
        if ($(this).val().trim() !== "") {
          // Enable the button
          // $("#btn_approve" + index).prop("disabled", false);
          $("#btn_reject" + index).prop("disabled", false);
          $("#btn_reject_sto" + index).prop("disabled", false);
          $("#btn_approve_sto" + index).prop("disabled", false);
        } else {
          // Disable the button
          // $("#btn_approve" + index).prop("disabled", true);
          $("#btn_reject" + index).prop("disabled", true);
          $("#btn_reject_sto" + index).prop("disabled", true);
          $("#btn_approve_sto" + index).prop("disabled", true);
        }
      });

      $(document).on("change", "#movement_types" + index, function () {
        if ($(this).val().trim() !== "") {
          // Enable the button
          $("#btn_approve" + index).prop("disabled", false);
          // $("#btn_reject" + index).prop("disabled", false);
        } else {
          // Disable the button
          $("#btn_approve" + index).prop("disabled", true);
          // $("#btn_reject" + index).prop("disabled", true);
        }
      });

      $(document).on("click", "#faqhead" + index, function () {
        // Add your code here to perform actions when the button is clicked wbs_numbers api call
        Get_wbs_numbers(element.address.plant_id, index);
        // data.orders.result.forEach((element, one) => {
        if (User_role == 5) {
          element.order_items?.forEach((order, two) => {
            if (order.closed == 1) {
              //console.log("filter", "checkbox_m_" + index + "_" + two);
              var check = "checkbox_m_" + index + "_" + two;
              $("#" + check).prop("checked", true);
            }
          });
        }
        //});
      });
      $(document).on("click", "#faqhead_sto" + index, function () {
        // Add your code here to perform actions when the button is clicked wbs_numbers api call
        debugger;
        Get_wbs_numbers(element.address.plant_id, index);
        // data.orders.result.forEach((element, one) => {
        if (User_role == 5 && sto) {
          element.order_items?.forEach((order, two) => {
            if (order.closed == 1) {
              //console.log("filter", "checkbox_m_" + index + "_" + two);
              let check = "checkbox_m_s_" + index + "_" + two;
              $("#" + check).prop("checked", true);
            }
          });
        }
        //});
      });
    });
    //console.log("mainArray->>>>", mainArray);
    // $("#checkbox_m_" + index).prop("checked", true);
    mainArray.forEach((data, index1) => {
      //console.log("element:--", element);
      //console.log("mainArray->>>>", data);
      data.forEach((element, index2) => {
        // console.log("mainArray->>>>", count);
        //console.log("mainArray->>>>", element);
        if (sto === true) {
          js("#main-table_sto" + index1).DataTable({
            //scrollX: true,
            data: element,
            retrieve: true,
            // sScrollX: "100%",
            // sScrollXInner: "110%",
            // bScrollCollapse: true,
            // bAutoWidth: false,
            fixedColumns: {
              left: 0,
              right: 1,
              // scrollX: false,
            },
            fixedHeader: {
              header: true,
              footer: true,
              // scrollX: false,
            },
            initComplete: function (settings, json) {
              $("#main-table_sto" + index1).wrap(
                "<div style='overflow:auto; width:100%;position:relative;'></div>"
              );
            },

            //
            // scrollCollapse: true,

            // autoWidth: true,
            //dom: "Bfrtip",
            // data: tr_data_array,
            // buttons: ["copy", "csv", "excel", "pdf", "print"],
            // buttons: ["excel"],
          });
          var targetColumnIndex = status_no;
          js("#main-table_sto" + index1)
            .DataTable()
            .columns()
            .every(function () {
              const column = this;
              if (column.index() != targetColumnIndex) {
                column
                  .nodes()
                  .to$()
                  .css("white-space", "normal", "User_Report");
              }
              if (column.index() === column.columns().indexes().length - 1) {
                column.nodes().to$().addClass("sticky-cell");
                column.nodes().to$().css("background-color", "#efe9e9");
              }
            });
          //check_box_event
        } else {
          js("#main-table" + index1).DataTable({
            //scrollX: true,
            data: element,
            retrieve: true,
            // sScrollX: "100%",
            // sScrollXInner: "110%",
            // bScrollCollapse: true,
            // bAutoWidth: false,
            fixedColumns: {
              left: 0,
              right: 1,
              // scrollX: false,
            },
            fixedHeader: {
              header: true,
              footer: true,
              // scrollX: false,
            },
            paging: false,
            initComplete: function (settings, json) {
              $("#main-table" + index1).wrap(
                "<div style='overflow:auto; width:100%;position:relative;'></div>"
              );
            },

            //
            // scrollCollapse: true,

            // autoWidth: true,
            //dom: "Bfrtip",
            // data: tr_data_array,
            // buttons: ["copy", "csv", "excel", "pdf", "print"],
            // buttons: ["excel"],
          });
          var targetColumnIndex = status_no;
          js("#main-table" + index1)
            .DataTable()
            .columns()
            .every(function () {
              const column = this;
              if (column.index() != targetColumnIndex) {
                column
                  .nodes()
                  .to$()
                  .css("white-space", "normal", "User_Report");
              }
              if (column.index() === column.columns().indexes().length - 1) {
                column.nodes().to$().addClass("sticky-cell");
                column.nodes().to$().css("background-color", "#efe9e9");
              }
            });
          //check_box_event
        }
      });
    });

    setTimeout(() => {}, 1000);

    getMovementTypes();
  }

  // setTimeout(() => {
  //   if (User_role == 5) {
  //     console.log("new data", data);
  //     data.orders.result.forEach((element, i) => {
  //       element.order_items.forEach((o, index) => {
  //         console.log("new data", o.closed, index);
  //         console.log("new data", "checkbox_m_" + i + "_" + index);
  //         if (o.closed == 1) {
  //           $("#checkbox_m_" + i + "_" + index).prop("checked", false);
  //         } else {
  //           $("#checkbox_m_" + i + "_" + index).prop("checked", true);
  //         }
  //       });
  //     });
  //   }
  // }, 2000);
}
// return method..

function Get_wbs_numbers(id, index) {
  //console.log("id", id);
  $.ajax({
    // url: "https://grim.co.in:3002/api/v4/wbs_numbers?plant_id=" + id,
    url: host + path + "wbs_numbers?plant_id=" + id,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      addinDropdown(data);
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      //toast("warning", "Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });

  function addinDropdown(data) {
    var dropdown = $("#wbs_E_number" + index);
    dropdown.empty();
    dropdown.append(`<option value="0">Select WBS</option>`);
    data.wbs_numbers.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.wbs_number,
        text: element.display_name,
      });
      dropdown.append(optionElement);
    });
  }
}

var tempreturndata;
function return_alert(data) {
  //$("#return_alert").modal("show");
  var API_return;
  // if (sto) {
  //   API_return = host + path + "received_materials?id=" + data.id + "&type=STO";
  // } else {
  API_return = received_materials_API + data.id;
  //}
  $.ajax({
    url: API_return,
    method: "GET",
    dataType: "json",
    async: false,
    success: function (response) {
      showPopupTable(response.data);
      returnItem = data;
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      //toast("warning", "received_materials_API failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
  var table_js;

  function showPopupTable(datas, index) {
    var table = $("#return_alert_table");
    var headerRow = table.find("thead tr");
    // Empty the existing headers
    headerRow.empty();
    $.each(returnheaders, function (index, header) {
      headerRow.append("<th>" + header.text + "</th>");
    });
    //console.log("showPopupTable", datas);
    var Array = [];
    datas.forEach((data, index) => {
      console.log("data", data);
      var disabled = getdisableStatus(data);
      tempreturndata = data;
      var btn =
        "<button class='btn btn-danger' onclick='openreturnDialog1(" +
        data.id +
        ")' " +
        disabled +
        " >Return</button>";
      Array.push([
        index + 1,
        data.qty,
        data.sto,
        data.document,
        data.document_year,
        btn,
      ]);
    });
    if (table_js) {
      table_js.clear().destroy();
    }
    table_js = js("#return_alert_table").DataTable({
      retrieve: true,
      bAutoWidth: false,
      fixedColumns: {
        left: 0,
        right: 1,
      },
      columnDefs: [
        {
          defaultContent: "-",
          targets: "_all",
        },
      ],
      // scrollCollapse: true,
      // scrollX: true,
      dom: "Bfrtip",
      paging: true,
      data: Array,
      // buttons: ["copy", "csv", "excel", "pdf", "print"],
      buttons: [""],
      initComplete: function (settings, json) {
        $("#return_alert_table").wrap(
          "<div style='overflow:auto; width:100%;position:relative;'></div>"
        );
      },
    });
  }
}
var tempreturnobj;
function openreturnDialog1(id) {
  var item = tempreturndata.id == id ? tempreturndata : tempreturndata;
  getReturnReasons();
  returnQuantity = item.qty;
  maxreturnQuantity = item.qty;
  returnItem.ref_id = item.id;

  if (item.movement_type == 351) {
    movetype = 351;
    disableMovetype = true;
  } else if (item.movement_type == 301) {
    movetype = 302;
    disableMovetype = true;
  } else if (item.movement_type == 311) {
    movetype = 312;
    disableMovetype = true;
  } else if (item.movement_type == 201) {
    movetype = 202;
    disableMovetype = true;
  } else if (item.movement_type == 221) {
    movetype = 222;
    disableMovetype = true;
  } else if (item.movement_type == 241) {
    disableMovetype = true;
    movetype = 242;
  }
  returndialog1 = true;
  showSweetAlert();
}
var return_reasons_obj = {};
function showSweetAlert() {
  var select = "";
  var moment_disabled = "";
  select += ` <label for="reasonTypeSelect">Select a Reason Type*</label>
  <select id="reasonTypeSelect" class="form-control mb-3">`;
  select += `<option value="0">Select a Reason Type*</option>`;
  return_reasons[0].return_reasons_details.forEach((element) => {
    select += `<option value="${element.reason}" >${element.reason}</option>`;
  });
  select += `</select>`;
  if (disableMovetype) {
    moment_disabled = "disabled";
  }
  var dropdown_val = movement_types[0].movement_details.filter((val) => {
    return movetype == val.movement_type;
  });
  //console.log("3. dropdown_val", dropdown_val);
  Swal.fire({
    title: "Please Give Reason?",
    html: `   
            <div class="mainbox">
              <div class="form-group">
                  <label for="numberInput">Return Quantity*</label>
                  <input id="numberInput" class="form-control mb-3" disabled value="${returnQuantity}" min="1" max="${maxreturnQuantity}" placeholder="Enter quantity" type="number">
              </div>
              <div class="form-group">
                  <label for="remarkInput">Remarks*</label>
                  <textarea id="remarkInput" required="required" maxlength="300" rows="3" class="form-control mb-3" placeholder="Enter remarks"></textarea>
              </div>
              <div class="form-group">
              ${select}
              </div>
              <div class="form-group">
                  <label for="movementTypeSelect">Select a Movement Type</label>
                  <select id="movementTypeSelect" class="form-control mb-3" ${moment_disabled}>
                      <option value="${
                        movetype + " - " + dropdown_val[0].movement_description
                      }">${
      movetype + " - " + dropdown_val[0].movement_description
    }</option>
                  </select>
              </div>
            </div>
          `,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    showConfirmButton: true,
    confirmButtonText: "Return",
    customClass: {
      container: "swal-lg", // Set the width to large (lg)
    },
    preConfirm: () => {
      const numberInputValue = document.getElementById("numberInput").value;
      const remarkInputValue = document.getElementById("remarkInput").value;
      const reasonTypeValue = document.getElementById("reasonTypeSelect").value;
      const movementTypeValue =
        document.getElementById("movementTypeSelect").value;
      // console.log("Return Quantity:", numberInputValue);
      // console.log("Remarks:", remarkInputValue);
      // console.log("Reason Type:", reasonTypeValue);
      // console.log("Movement Type:", movementTypeValue);
      return_reasons_obj.remarks = remarkInputValue;
      return_reasons_obj.returnQuantity = numberInputValue;
      return_reasons_obj.reason = reasonTypeValue;
      // Validation checks
      if (
        !numberInputValue ||
        numberInputValue <= 0 ||
        numberInputValue > maxreturnQuantity
      ) {
        Swal.showValidationMessage("Invalid return quantity");
      } else if (!remarkInputValue) {
        Swal.showValidationMessage("Remarks cannot be empty");
      } else if (!reasonTypeValue || reasonTypeValue == 0) {
        Swal.showValidationMessage("Please select a reason type");
      } else if (!movementTypeValue && !moment_disabled) {
        Swal.showValidationMessage("Please select a movement type");
      } else {
        // All fields are valid, you can proceed with the form submission
        returnItemfunc();
      }
    },
  });
}

function returnItemfunc() {
  var indent = returnItem;
  var editedProductRequestObjreturn = {
    order_id: indent.order_id,
    indent_id: indent.id,
    status: 12,
    remarks: return_reasons_obj.remarks,
    product_id: indent.product_sap_id,
    quantity: indent.quantity,
    created_at: indent.created_at,
    return_quantity: parseInt(return_reasons_obj.returnQuantity),
    total_price: indent.price * return_reasons_obj.returnQuantity,
    role_id: User_role,
    user_id: User_id,
    first_name: User_name,
    indentUser_id: indent.created_by,
    manager_id: indent.manager_id,
    movetype: movetype,
    s_no: indent.s_no,
    ref_id: indent.ref_id,
    reason: return_reasons_obj.reason,
  };
  //console.log(editedProductRequestObjreturn);

  $.ajax({
    url: host + path + "/api/v4/update_order_status",
    method: "PUT",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify(editedProductRequestObjreturn),
    success: function (response) {
      toast("success", "Return Successfully!");
      Swal.fire({
        title: "Return Successfully!",
        //text: "Your Reason Type is: " + return_reasons_obj.reason,
        icon: "success",
      });
      setTimeout(() => {
        //reload page code hear
        i_ordershow(pagination);
        $("#return_alert").modal("hide");
      }, 1000);
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      //toast("warning", error + "Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Something went wrong !, Please try again !");
      }
    },
  });
}
function getdisableStatus(item) {
  if (
    item.returned_or_not == "1" ||
    (item.document == null && item.sto == null)
  ) {
    return true;
  } else {
    return false;
  }
}

function getReturnReasons() {
  $.ajax({
    url: host + path + "return_reasons",
    method: "GET",
    dataType: "json",
    async: false,
    success: function (response) {
      return_reasons[0].return_reasons_details = response.return_reasons;
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      //toast("warning", "return_reasons_API failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}
//return end

function repeatIndent(indent) {
  // console.log(indent);
  //console.log("indent-->", indent);
  var items = [];
  localStorage.setItem("plant_id", JSON.stringify(items));
  localStorage.setItem("cart", JSON.stringify(items));
  //localStorage.setItem("plant_id", JSON.stringify());
  //var plant_id111 = JSON.parse(localStorage.getItem("plant_id"));

  // var plant_id = indent.address;
  var storeLocation = indent.store_address;
  const temp_loc = {
    id: storeLocation.id,
    name1: storeLocation.plant_name,
    plant_id: storeLocation.plant_id,
    storage_loc: storeLocation.storage_location,
    storage_location_desc: storeLocation.storage_location_desc,
  };
  localStorage.setItem("plant_id", JSON.stringify(temp_loc));
  //storeLocation.storage_loc = indent.store_address.storage_location;
  //vm.addPlantOfProductToCart(storeLocation);

  indent.order_items.forEach(function (product, index) {
    // console.log(product);
    var temp = {
      id: product.product_id,
      name: product.product_name,
      price: product.price,
      stock: product.stock,
      i_stock: product.stock,
      bag: "undefined",
      quantity: product.quantity,
      status: "Pending",
      p_delivery_priority: product.delivery_priority,
      priority_days: product.priority_days,
      tracking_no: product.tracking_no,
      section: product.section,
      reason: product.reason,
      where_used: product.where_used,
      sap_id: "SAP123456",
      base_unit: product.base_unit,
      valution_type: product.valution_type,
    };

    var addtocart = JSON.parse(localStorage.getItem("cart"));
    if (!addtocart) {
      addtocart = [];
    }

    addtocart.push(temp);
    var result_added = removeDuplicatesAndUpdate(addtocart);

    //store data
    localStorage.setItem("cart", JSON.stringify(result_added));
    cartcount();
    //vm.addRepeatProductToCart(item, product.intial_qty);
    //console.log("result_added", result_added);
  });
  window.location.href = "../Home/Cart";
}

function removeDuplicatesAndUpdate(arr) {
  var uniqueObjects = {};
  for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];
    var objId = obj.id;
    if (uniqueObjects.hasOwnProperty(objId)) {
      var existingObj = uniqueObjects[objId];
      if (!isEqual(obj, existingObj)) {
        $.extend(existingObj, obj);
      }
    } else {
      uniqueObjects[objId] = obj;
    }
  }
  return Object.values(uniqueObjects);
}

function checkStatusNew(order_items) {
  var Indent_status;
  if (order_items.every((element) => element.status == "pending")) {
    Indent_status = "New";
  } else if (order_items.some((element) => element.remaining_qty > 0)) {
    Indent_status = "Open";
  } else {
    Indent_status = "Close";
  }
  return Indent_status;
}

function checkStatusColor(order_items) {
  var color;
  if (order_items.every((element) => element.status == "pending")) {
    color = "lightblue";
  } else if (order_items.some((element) => element.remaining_qty > 0)) {
    color = "orange";
  } else {
    color = "green";
  }
  return color;
}

function dateconvert(date) {
  var dateObject = new Date(date);
  var day = dateObject.getDate();
  var month = dateObject.toLocaleString("default", { month: "short" });
  var year = dateObject.getFullYear();
  return day + "th " + month + " " + year;
}

function checkApproval(approvals) {
  var found = false;
  if (approvals != null) {
    for (var i = 0; i < approvals.length; i++) {
      if (approvals[i].finish == "0" && approvals[i].role_id == User_role) {
        if (i == 0) {
          found = true;
        } else if (i > 0) {
          if (approvals[i - 1].finish == "1") {
            found = true;
          }
        }
        break;
      }
    }
  }
  return found;
}

function checkApprovalStatus(approvals) {
  var status = null;
  if (approvals != null) {
    for (var i = 0; i < approvals.length; i++) {
      if (approvals[i].finish == "0") {
        if (approvals[i].role_id == User_role) {
          status = "(Your Approval Pending )";
        } else {
          status = `(Approval Pending From ${approvals[i].role_name} )`;
        }
        break;
      }
    }
  }
  return status;
}

function getColor(status) {
  var color;
  if (status == 1) {
    color = "green";
  } else {
    color = "lightyellow";
  }
  return color;
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR", // Using Indian Rupee (INR) currency code
});

function onepopshow(id) {
  spinner(true);
  //console.log("call", id);
  //   $("#indent-timeline-modal").show();
  $.ajax({
    url: status_history_API,
    method: "POST",
    dataType: "json",
    data: {
      id: id,
    },
    success: function (response) {
      if (response.success === true) {
        console.log(response);
        var one = "";
        $("#timelinebody").addClass("timeline");
        document.getElementById("timeline").innerHTML = "";
        response.status_history.forEach((item, index) => {
          // var status = item.status;
          // var msg = item.role;
          // var Remarks = "<b>Remarks:</b> " + item.remarks;

          var status;
          var qty;
          var msg = "";

          var Remarks = "";
          var STO = "";
          var Document = "";
          var SAP_Document_ID = "";

          if (item.status == "PR Raised" && item.sap_ref_id == null) {
            status = "PR Requested";
            qty = item.qty;
          } else {
            status = getCaps(item.status);
            qty = item.qty;
          }

          if (item.status == "PR Raised") {
            if (item.sap_ref_id != "" && item.sap_ref_id != null) {
              const role = item.role == null ? " " : item.role;
              var name = item.name == null ? " " : item.name;
              msg =
                " PR Requested by " +
                " <b> " +
                role +
                " </b> " +
                name +
                " At " +
                moment(item.created_at).format("Do MMM YYYY , h:mm:ss a");
            } else {
              const role = item.role == null ? " " : item.role;
              const name = item.name == null ? " " : item.name;
              msg =
                "PR Requested by " +
                " <b> " +
                role +
                " </b> " +
                name +
                " At " +
                moment(item.created_at).format("Do MMM YYYY , h:mm:ss a");
            }
          } else {
            if (item.status == "pending") {
              // status = "Indent Created ";
              const role = item.role == null ? "" : item.role;
              const name = item.name == null ? "" : item.name;
              msg =
                " Placed by " +
                " <b> " +
                role +
                " </b> " +
                name +
                " At " +
                moment(item.created_at).format("Do MMM YYYY , h:mm:ss a");
            } else {
              if (item.status == "cancelled") {
                if (item.role == "admin") {
                  // const role = item.role == null ? "" : item.role;
                  msg =
                    " Cancelled At " +
                    moment(item.created_at).format("Do MMM YYYY , h:mm:ss a");
                } else {
                  const role = item.role == null ? "" : item.role;
                  const name = item.name == null ? "" : item.name;
                  msg =
                    getCaps(item.status) +
                    " by " +
                    " <b> " +
                    role +
                    " </b> " +
                    name +
                    " At " +
                    moment(item.created_at).format("Do MMM YYYY , h:mm:ss a");
                }
              } else {
                const role = item.role == null ? "" : item.role;
                const name = item.name == null ? "" : item.name;
                msg =
                  getCaps(item.status) +
                  " by " +
                  " <b> " +
                  role +
                  " </b> " +
                  name +
                  " At " +
                  moment(item.created_at).format("Do MMM YYYY , h:mm:ss a");
              }
            }
          }
          // for remarks set
          if (item.remarks != null && item.remarks != "") {
            Remarks = "<strong>Remarks: </strong>" + item.remarks;
          }

          // for sto set
          if (item.sto != null && item.sto != "") {
            STO = "<strong>STO: </strong> " + item.sto;
          }

          // for document set
          if (item.document != null && item.document != "") {
            Document = "</bt><strong>Document: </strong>" + item.document;
          }

          //fro sap_ref_id set
          if (item.sap_ref_id != null && item.sap_ref_id != "") {
            const sap_ref_id =
              getSapIds(item.sap_ref_id) == null
                ? ""
                : getSapIds(item.sap_ref_id);
            SAP_Document_ID =
              "<strong>SAP Document ID: </strong> " +
              sap_ref_id +
              " " +
              moment(item.updated_at).format("Do MMM YYYY , h:mm:ss a");
          }

          // var all = ``;
          document.getElementById("timeline").innerHTML += `
          <div class="timeline-container ${convertSpacesToHyphens(item.color)}">
              <div class="timeline-icon">
                  <i class="far fa-grin-wink"></i>
              </div>
              <div class="timeline-body">
                  <h4 class="timeline-title">
                      <span class="badge">${status}</span>
                      <span class="badge">Quantity: ${qty} </span>
                  </h4>
                  <p>${msg}</p>
                  <p>${Remarks}</p>
                  <p>${STO}</p>
                  <p>${Document}</p>
                  <p>${SAP_Document_ID}</p>
              </div>
          </div>
          `;
        });
        /* <p class="timeline-subtitle">1 Hours A   go</p> */
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      //toast("warning", "Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
  spinner(false);
}

function getCaps(item) {
  return item.charAt(0).toUpperCase() + item.slice(1);
}

function getSapIds(str) {
  str = Array.from(new Set(str.split(", "))).toString();
  str = Array.from(new Set(str.split(","))).toString();
  return str;
}

function twopopshow(id) {
  //console.log("call", id);
  //   $("#indentApproval").show();
  $.ajax({
    url: approvals_details_API + id,
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response.success === true) {
        // console.log("test->>>", response);
        document.getElementById("timelinebody").innerHTML = "";
        response.approvals_details.forEach((item, index) => {
          var text;
          if (item.finish == 1) {
            text =
              "Approved by <b> " +
              item.role +
              "</b> " +
              item.approver_name +
              "<p>On " +
              moment(item.updated_at).format("Do MMM YYYY , h:mm:ss a") +
              "</p>";
          }
          if (item.finish == 0) {
            text =
              "Requires approval from <b>" +
              item.role +
              "</b>" +
              item.approver_name;
          }
          document.getElementById("timelinebody").innerHTML += `
                <div class="timeline-container ${getColor(item.finish)}">
                    <div class="timeline-icon ${getColor(item.finish)}">
                        <i class="far fa-grin-wink">${index + 1}</i>
                    </div>
                    <div class="timeline-body item${getColor(item.finish)}">
                        <p>
                        ${text}
                        </p>
                    </div>
                </div>
            `;
        });
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      //toast("warning", "Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

$("#delivery_priority").change(function () {
  selectedValue = $(this).val();
  if (selectedValue == "High") {
    $("#priority_days").val(3);
  } else if (selectedValue == "Medium") {
    $("#priority_days").val(6);
  } else if (selectedValue == "Low") {
    $("#priority_days").val(15);
  }
});

function editpopshow(orders_id, item_id) {
  var tempid;
  var tempordersprice;
  // $("#timelinebody").removeClass("timeline");
  tempobj.forEach((data) => {
    if (data.id == item_id) {
      data.order_items.forEach((orders) => {
        if (orders.id == orders_id) {
          // console.log("edit->> id ", orders_id);
          // console.log("edit->> id ", data);
          $("#product_name").val(orders.product_name);
          $("#intial_qty").val(orders.intial_qty);
          $("#delivery_priority").val(orders.delivery_priority);
          $("#priority_days").val(orders.priority_days);
          $("#tracking_no").val(orders.tracking_no);
          $("#section").val(orders.section);
          $("#reason").val(orders.reason);
          $("#where_used").val(orders.where_used);
          tempid = orders_id;
          tempordersprice = orders.price;
        }
      });
    }
  });

  $("#update").click(function () {
    spinner(true);
    var temp = {
      item: {
        id: tempid,
        delivery_priority: $("#delivery_priority").val(),
        quantity: $("#intial_qty").val(),
        reason: $("#reason").val(),
        where_used: $("#where_used").val(),
        section: $("#section").val(),
        tracking_no: $("#tracking_no").val(),
        priority_days: $("#priority_days").val(),
        total_price: $("#intial_qty").val() * tempordersprice,
        updated_at: getcurrentdate(),
        first_name: User_name,
        indentUser_id: User_id,
        role_id: User_role,
      },
    };

    // $("#indentApproval").show();
    $.ajax({
      url: host + path + "edit_indent",
      method: "PUT",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify(temp),
      success: function (response) {
        if (response.success === true) {
          toast("success", response.message);
          i_ordershow(pagination, search, API);
        }
      },

      error: function (xhr, status, error) {
        console.log("Error: " + error);
        spinner(false);
        toast("warning", "Login failed. Please try again.");
      },

      complete: function (xhr, status) {
        if (status === "error" || !xhr.responseText) {
          spinner(false);
          toast("error", "Network error. Please try again later.");
        }
      },
    });
  });
}

function deletealert(orders_id, item_id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    var temp;
    if (result.isConfirmed) {
      tempobj.forEach((data) => {
        if (data.id == item_id) {
          data.order_items.forEach((order) => {
            if (order.id == orders_id) {
              // console.log(order);
              temp = order;
            }
          });
        }
      });
      var payload = { order_id: orders_id, item: temp };
      $.ajax({
        url: host + path + "delete_indent",
        method: "delete",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(payload),
        success: function (response) {
          if (response.success === true) {
            // Swal.fire("Deleted!", "Your request has been deleted.", "success");
            toast("success", response.message);
            i_ordershow(pagination, search, API);
            spinner(true);
          }
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

function formatted_datetime(input) {
  // Parse the timestamp
  var timestamp = new Date(input);

  // Convert to the desired format
  var day = timestamp.getDate();
  var month = timestamp.toLocaleString("default", { month: "short" });
  var year = timestamp.getFullYear();

  var hours = timestamp.getHours();
  var minutes = timestamp.getMinutes();
  var seconds = timestamp.getSeconds();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var formatted_date = day + "th " + month + " " + year;
  var formatted_time = hours + ":" + minutes + ":" + seconds + " " + ampm;

  return formatted_date + ", " + formatted_time;
}

function convertSpacesToHyphens(str) {
  return str.replace(/ /g, "-");
}

function getcurrentdate() {
  // Create a new Date object
  const currentDate = new Date();

  // Extract the components of the date and time
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Combine the components into the desired format
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

function getMovementTypes() {
  var vm = this;
  var url = "";
  if (User_role == 5) {
    // url = host1 + path1 + "movement_type?_where=(type,eq,DMT)";
    // http://10.0.0.206:3003/api/
    url = "http://10.0.0.206:3001/api/movement_type?type=DMT";
                          
  } else if (
    User_role == 2 ||
    User_role == 3 ||
    User_role == 7 ||
    User_role == 8 ||
    User_role == 9
  ) {
    url = host1 + path1 + "movement_type?_where=(type,eq,RMT)";
  }
  if (url != "") {
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      async: false,
      success: function (response) {
        movement_types[0].movement_details = response;
        //console.log(response);
        setdropdownvalue(response);
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error);
        //toast("warning", " movement_type failed. Please try again.");
      },

      complete: function (xhr, status) {
        if (status === "error" || !xhr.responseText) {
          toast("error", "Network error. Please try again later.");
        }
      },
    });
  }
}
function setdropdownvalue(data) {
  //console.log("datat", data);
  if (sto != true) {
    var dropdown = $(".movement_type");
    dropdown.append(`<option value="0">Select a Movement Type*</option>`);
    data.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.movement_type,
        text: element.movement_type + " - " + element.movement_description,
      });
      dropdown.append(optionElement);
    });
  } else {
    var dropdown = $(".movement_type");
    dropdown.append(`<option value="0">Select a Movement Type*</option>`);
    data.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.movement_type,
        text: element.movement_type + " - " + element.movement_description,
      });
      dropdown.append(optionElement);
    });
  }
}

getMovementTypes();

companyCodes();
$(document).on("click", ".btn", function () {
  // Uncheck all checkboxes
  uncheckAllCheckboxes();
});

function uncheckAllCheckboxes() {
  // alert("call");
  if (sto != true) {
    for (let i = 0; i < 7; i++) {
      $("#remarksection" + i).hide();
      $("#comment" + i).val("");
    }
    $("input[type='checkbox']").prop("checked", false);
  } else {
    for (let i = 0; i < 7; i++) {
      $("#remarksection_sto" + i).hide();
      $("#comment_sto" + i).val("");
    }
    $("input[type='checkbox']").prop("checked", false);
  }
}

var temp;
var temp_id_checkbox = [];

$(document).on("click", "[type='checkbox']", function () {
  if (sto != true) {
    // var index = parseInt(this.id.replace("checkbox", ""));
    // var subindex = parseInt(this.id.replace("checkbox" + index, ""));
    setMoveType();
    var id = this.id;
    // console.log("item.closed", id);
    var idParts = this.id.split("_");
    // checkbox_m
    if (idParts[0] + "_" + idParts[1] === "checkbox_m") {
      //alert('yes');
      if ($("#" + id).is(":checked")) {
        //alert("yes");
        // $(this).prop("checked", true);
      } else {
        // $(this).prop("checked", false);
      }
    } else if (idParts.length === 3 && idParts[0] === "checkbox") {
      // checkbox_m_0
      var index = parseInt(idParts[1]);
      var subindex = parseInt(idParts[2]);
      if (temp != index) {
        clearArray();
        //$("[type='checkbox']").not(this).prop("checked", false);
      }
      temp = index;
      // console.log("checkbox Index:", index);
      // console.log("checkbox Subindex:", subindex);
      // console.log("checkbox temp", temp);
      // console.log("checkbox id", id);
      //debugger;
      var targetDiv = $("#remarksection" + index);
      var tempid = $(this).attr("data-mainId");
      var objid = $(this).attr("data-obj");
      //console.log("temp:id", tempid);
      var obj = [];
      var maindata = tempobj.filter((data) => {
        return data?.id == tempid;
      });
      obj = maindata[0].order_items.filter((obj) => {
        return obj.id == objid;
      });
      //console.log("obj", obj);
      //= JSON.parse($(this).attr("data-obj"));
      var textareaidnumber = $("#comment" + index).attr("data-index");

      // Uncheck other checkboxes and hide all content divs
      // $("[type='checkbox']").not(this).prop("checked", false);
      // $(".checkbox-content").hide();

      if ($(this).prop("checked")) {
        targetDiv.show();
        $("#quantity_" + obj[0].id).prop("disabled", false);
        $("#quantity_" + obj[0].id).css("border-bottom", "1px solid");
        $("#checkbox_m_" + index + "_" + subindex).prop("disabled", false);
        if (!approveArraydata.some((item) => item.id === obj[0].id)) {
          obj[0].textareaidnumber = textareaidnumber;
          approveArraydata.push(obj[0]);
          //temp_id_checkbox.push(id);
          //console.log("checkbox checked");
        }
      } else {
        approveArraydata = approveArraydata.filter(
          (item) => item.id !== obj[0].id
        );
        if (approveArraydata.length == 0) {
          targetDiv.hide();
        }
        $("#quantity_" + obj[0].id).prop("disabled", true);
        $("#quantity_" + obj[0].id).css("border", "none");
        $("#checkbox_m_" + index + "_" + subindex).prop("disabled", true);
        //console.log("checkbox unchecked");
      }

      if ((approveArraydata.length > 0 && User_role == 3) || User_role == 2) {
        debugger;
        movetype = 101;
      }
      Setdropdwon(movetype, index);
      // console.log("checkbox approveArraydata = ", approveArraydata); // Print the array for debugging
      // console.log(
      //   "checkbox -------------------------------------------------------------------------------------------------------------------"
      // );
    }
  } else {
    // this one is sto code
    // var index = parseInt(this.id.replace("checkbox", ""));
    // var subindex = parseInt(this.id.replace("checkbox" + index, ""));
    var tempgetid = $(this).attr("data-mainId");
    var tempsetdata = tempobj.filter((data) => {
      return data?.id == tempgetid;
    });
    setMoveType(tempsetdata[0]?.user_id);
    var id = this.id;
    // console.log("item.closed", id);
    var idParts = this.id.split("_");
    // checkbox_m
    if (idParts[0] + "_" + idParts[1] === "checkbox_m") {
      //alert('yes');
      if ($("#" + id).is(":checked")) {
        //alert("yes");
        // $(this).prop("checked", true);
      } else {
        // $(this).prop("checked", false);
      }
    } else if (idParts.length === 3 && idParts[0] === "checkbox") {
      // checkbox_m_0
      var index = parseInt(idParts[1]);
      var subindex = parseInt(idParts[2]);
      if (temp != index) {
        clearArray();
        //$("[type='checkbox']").not(this).prop("checked", false);
      }
      temp = index;

      var targetDiv = $("#remarksection_sto" + index);
      var tempid = $(this).attr("data-mainId");
      var objid = $(this).attr("data-obj");
      //console.log("temp:id", tempid);
      var obj = [];
      var maindata = tempobj.filter((data) => {
        return data?.id == tempid;
      });
      obj = maindata[0].order_items.filter((obj) => {
        return obj.id == objid;
      });
      console.log("obj", obj);
      //var textareaidnumber = $("#comment_sto" + index).attr("data-index");
      var textareaidnumber = index;

      // Uncheck other checkboxes and hide all content divs
      // $("[type='checkbox']").not(this).prop("checked", false);
      // $(".checkbox-content").hide();

      if ($(this).prop("checked")) {
        targetDiv.show();
        $("#quantity_" + obj[0].id).prop("disabled", false);
        $("#quantity_" + obj[0].id).css("border-bottom", "1px solid");
        // $("#checkbox_m_" + index + "_" + subindex).prop("disabled", false);
        console.log("checkbox_m_s_", index, "_", subindex);
        $("#checkbox_m_s_" + index + "_" + subindex).prop("disabled", false);
        //checkbox_m_0_0
        if (!approveArraydata.some((item) => item.id === obj[0].id)) {
          obj[0].textareaidnumber = textareaidnumber;
          approveArraydata.push(obj[0]);
          //temp_id_checkbox.push(id);
          //console.log("checkbox checked");
        }
      } else {
        approveArraydata = approveArraydata.filter(
          (item) => item.id !== obj[0].id
        );
        if (approveArraydata.length == 0) {
          targetDiv.hide();
        }
        $("#quantity_" + obj[0].id).prop("disabled", true);
        $("#quantity_" + obj[0].id).css("border", "none");
        // $("#checkbox_m_" + index + "_" + subindex).prop("disabled", true);
        $("#checkbox_m_s_" + index + "_" + subindex).prop("disabled", true);
        //console.log("checkbox unchecked");
      }

      if ((approveArraydata.length > 0 && User_role == 3) || User_role == 2) {
        movetype = 101;
      }
      // console.log("checkbox approveArraydata = ", approveArraydata); // Print the array for debugging
      // console.log(
      //   "checkbox -------------------------------------------------------------------------------------------------------------------"
      // );
      Setdropdwon(movetype, index);
    }
  }
});

function clearArray() {
  approveArraydata.splice(0, approveArraydata.length);
  // You can also use myArray = [] to clear the array
}

function setMoveType(user_id = null) {
  if (sto != true) {
    if (
      (approveArraydata.length > 0 && User_role == 3) ||
      User_role == 19 ||
      User_role == 2
    ) {
      movetype = 101;
    }
  } else {
    if (approveArraydata.length >= 0 && User_id == user_id) {
      movetype = 101;
    } else {
      movetype = 351;
    }
  }
}

function VerifyissueQty(wbs) {
  var wbs;

  var idArray = approveArraydata.map(function (item) {
    return item.id;
  });
  var data_val_check;
  var check_stock;
  var check_issue_qty;
  idArray.forEach((element) => {
    //debugger;
    var issue_qty = $("#quantity_" + element).val();
    var index = $("#quantity_" + element).data("id");
    wbs = $("#wbs_E_number" + index).val();
    var checkbox_close =
      $(".checkbox_m_" + element).prop("checked") == true ? 1 : 0;

    approveArraydata.forEach((data) => {
      // console.log("data");
      if (data.id == element) {
        data.issue_qty = issue_qty;
        data.closed = checkbox_close;
        data.textareaidnumber = index;
        data.selected_batch_id = ""; //?
        data.selected_serial_numbers = ""; //?
        data.valution_type = ""; //?
        debugger;
        if (data.stock == 0) {
          alert("Stock is not available");
          check_stock = false;
        } else {
          check_stock = true;
          if (issue_qty == "0" || issue_qty == "") {
            alert("Please enter Issue Qty");
            check_issue_qty = false;
          } else {
            //data.stock >= data.intial_qty &&
            if (data.intial_qty >= issue_qty) {
              check_issue_qty = true;
              if (data.stock >= issue_qty) {
                data_val_check = true;
              } else {
                data_val_check = false;
              }
            } else {
              alert(
                "Issue quantity must be equal or less than pending quantity and please check the stock..!"
              );
              data_val_check = false;
            }
          }
        }
      }
    });
  });
  // console.log(approveArraydata);
  if (check_stock && check_issue_qty) {
    if (data_val_check) {
      if (check_stock) {
        if (sto != true) {
          approveItem(5, wbs);
        } else {
          approveItem(20, wbs);
        }
      } else {
        toast("info", "Stock must be greater than 0..!");
      }
    } else {
      toast(
        "info",
        "Issue quantity must be equal or less than pending quantity and please check the stock..!"
      );
    }
  } else {
    // toast("info", "Stock and issue quantity must be greater than 0..!");
    toast(
      "info",
      "Issue quantity must be equal or less than pending quantity and please check the stock..!"
    );
  }
}

var approveArraydata = [];
var movetype = null;
var company_code = [];
var asset_number = null;
var asset_description = null;
var asset_subnumber = null;
var cost_center = null;
var remarks = "";

function companyCodes() {
  $.ajax({
    url: company_codes_API,
    method: "GET",
    dataType: "json",
    success: function (response) {
      company_code = response.company_codes;
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      //toast("warning", "companyCodes API failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

function Setdropdwon(movetype, index) {
  if (sto) {
    $("#movement_types" + index + ' option[value="' + movetype + '"]').prop(
      "selected",
      true
    );
    // Disable the entire select element
    $("#movement_types" + index).prop("disabled", true);
  } else {
    //debugger;
    $(".movement_type" + index + ' option[value="' + movetype + '"]').prop(
      "selected",
      true
    );
    // Disable the entire select element
    $(".movement_type" + index).prop("disabled", true);
  }
}

function approveItem(status, wbs) {
  // console.log('------------yyy');
  if (wbs == undefined || wbs == "0") {
    wbs = "WBS_GENERAL";
  }

  var itemstatus = status;
  var approveArray = approveArraydata;
  var index = approveArraydata[0].textareaidnumber;
  debugger;
  if (!sto) {
    remarks = $("#comment" + index).val();
  } else {
    remarks = $("#comment_sto" + index).val();
  }
  if ($("#movement_types" + index).val() != null) {
    movetype = parseInt(
      $("#movement_types" + index)
        .val()
        .trim()
    );
  }
  if ($("#company_codes" + index).val() != null) {
    var cost_center_val = $("#company_codes" + index)
      .val()
      .trim();
    if (cost_center_val == "0") {
      cost_center = null;
    }
  }
  company_code = null;

  // console.log(approveArray);
  for (var j = 0; j < approveArray.length; j++) {
    if (approveArray[j].closed == 1) {
      var closed = 1;
    } else {
      if (
        approveArray[j].remaining_qty == parseFloat(approveArray[j].issue_qty)
      ) {
        var closed = 1;
      } else {
        var closed = 0;
      }
    }
    console.log("approveArray", approveArray);
    if (!sto) {
      var editedProductRequestObj = {
        order_id: approveArray[j].order_id,
        indent_id: approveArray[j].id,
        status: itemstatus,
        remarks: remarks,
        product_id: approveArray[j].product_sap_id,
        quantity: approveArray[j].quantity,
        base_unit: approveArray[j].base_unit,
        price: approveArray[j].price,
        created_at: approveArray[j].created_at,
        delivery_priority: approveArray[j].delivery_priority,
        issue_qty:
          parseFloat(approveArray[j].issue_qty).toFixed(2) ||
          approveArray[j].quantity,
        total_price:
          (parseFloat(approveArray[j].issue_qty).toFixed(2) ||
            approveArray[j].quantity) * approveArray[j].price,
        role_id: User_role,
        user_id: User_id,
        first_name: User_name,
        indentUser_id: approveArray[j].created_by,
        manager_id: approveArray[j].manager_id,
        movetype: movetype,
        company_code: company_code,
        asset_number: asset_number,
        asset_description: asset_description,
        asset_subnumber: asset_subnumber,
        cost_center: cost_center,
        closed: closed,
        valution_type: "",
        selected_batch_id: "",
        selected_serial_numbers: "",
        issued_qty:
          approveArray[j].actual_issued_qty - approveArray[j].received_qty,
        s_no: approveArray[j].s_no,
        WBS_NO: wbs,
      };
    } else {
      var editedProductRequestObj = {
        order_id: approveArray[j].order_id,
        indent_id: approveArray[j].id,
        status: itemstatus,
        remarks: remarks,
        product_id: approveArray[j].product_sap_id,
        quantity: approveArray[j].quantity,
        price: approveArray[j].price,
        created_at: approveArray[j].created_at,
        delivery_priority: approveArray[j].delivery_priority,
        issue_qty:
          parseFloat(approveArray[j].issue_qty).toFixed(2) ||
          approveArray[j].quantity,
        total_price:
          (parseFloat(approveArray[j].issue_qty).toFixed(2) ||
            approveArray[j].quantity) * approveArray[j].price,
        role_id: User_role,
        user_id: User_id,
        first_name: User_name,
        indentUser_id: approveArray[j].created_by,
        manager_id: approveArray[j].manager_id,
        movetype: movetype,
        company_code: company_code,
        asset_number: asset_number,
        asset_description: asset_description,
        asset_subnumber: asset_subnumber,
        cost_center: cost_center,
        closed: closed,
        valution_type: "",
        selected_batch_id: "",
        selected_serial_numbers: "",
        issued_qty:
          approveArray[j].actual_issued_qty - approveArray[j].received_qty,
        s_no: approveArray[j].s_no,
        WBS_NO: wbs,
      };
    }

    console.log("editedProductRequestObj", editedProductRequestObj);
    //alert("api call testing");
    $.ajax({
      url: update_order_status_API,
      method: "PUT",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify(editedProductRequestObj),
      success: function (response) {
        if (response.success === true) {
          if (approveArray.length == j) {
            if (itemstatus == 2) {
              toast("success", "Approved Successfully!");
            } else if (itemstatus == 3) {
              toast("success", "Rejected Successfully!");
            } else if (itemstatus == 5) {
              toast("success", "Issued Successfully!");
            } else if (itemstatus == 11) {
              toast("success", "Received Successfully!");
            } else if (itemstatus == 22) {
              toast("success", "Hold Successfully!");
            } else if (itemstatus == 20) {
              toast("success", "STO Dispatched Successfully!");
            } else if (itemstatus == 21) {
              toast("success", "STO Received Successfully!");
            }

            approveArraydata = [];
            remarks = null;
            asset_number = null;
            asset_description = null;
            asset_subnumber = null;
            company_code = null;
            cost_center = null;
            movetype = null;
            setTimeout(() => {
              //reload page code hear
              i_ordershow(pagination);
            }, 1000);
          }
        }
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error);
        //toast("warning", error + "Please try again.");
      },

      complete: function (xhr, status) {
        if (status === "error" || !xhr.responseText) {
          toast("error", "Something went wrong !, Please try again !");
        }
      },
    });
  }
}
