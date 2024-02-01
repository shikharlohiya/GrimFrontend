var headers = [
  { text: "", align: "centre", value: "" },
  { text: "S NO", align: "centre", value: "" },

  { text: "Indent ID", align: "centre", value: "id" },
  { text: "Indentor", align: "centre", value: "first_name" },
  {
    text: "Status",
    align: "centre",
    value: "statuss",
  },
  { text: "Item Name", align: "centre", value: "product_name" },
  {
    text: "Image",
    align: "centre",
    value: "image_url",
  },
  {
    text: "Quote",
    align: "centre",
    value: "quote",
  },
  { text: "Qty", align: "centre", value: "product_unit" },
  { text: "Priority", align: "centre", value: "urgency_days" },
  { text: "Date", align: "centre", value: "createdat" },
  { text: "Location", align: "centre", value: "location" },
  // { text: "Vendor", align: "centre", value: "vendor_id" },
  { text: "Actions", value: "", sortable: !1 },
];
var material_types = [];
var material_groups = [];
var newPurchaseRequests = [];
var totalCount = 0;
var pagination;
var store_locations = [
  {
    id: 1,
    locations: [],
  },
];
var js = jQuery.noConflict(true);

// Add table headers using jQuery
var table = js("#NewProductList");
var headerRow = table.find("thead tr");

js.each(headers, function (index, header) {
  headerRow.append("<th>" + header.text + "</th>");
});
// console.log("Logindata", Logindata);
var user_details = Logindata.user;

function material_type() {
  js.ajax({
    url: host + path + "material_type_sync",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      material_types = response;
    },
    error: function (err) {
      alert(err);
    },
  });
}

function material_group() {
  js.ajax({
    url: host + path + "item_group",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      material_groups = response.item_group;
    },
    error: function (err) {
      alert(err);
    },
  });
}

function getNewPurchaseProducts() {
  var role;
  var methode;
  var url;

  //   var data = {
  //     user_id: user_details[0].id,
  //     npp: pagination.rowsPerPage,
  //     page: pagination.page,
  //   };
  var data = {
    user_id: user_details[0].id,
    npp: 10,
    page: 1,
  };

  if (user_details[0].role_id == 2) {
    role = "manager";
    methode = "POST";
    url = "/new_material_reqs";
  } else if (user_details[0].role_id == 3) {
    role = "indent";
    methode = "POST";
    url = "/new_material_reqs";
  } else if (user_details[0].role_id == 5 || user_details[0].role_id == 11) {
    role = "storeUser";
    methode = "POST";
    url = `/new_material_reqs?user_id=${data.user_id}`;
  } else if (user_details[0].role_id == 4) {
    role = "storeUser";
    methode = "POST";
    url = `/new_material_reqs`;
  } else if (user_details[0].role_id == 7 || user_details[0].role_id == 9) {
    role = "hod";
    methode = "POST";
    url = "/new_material_reqs";
  }

  js.ajax({
    url: "" + host + path + role + url,
    method: methode,
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      user_id: User_id,
      role_id: User_role,
    }),
    success: function (response) {
      if (response.success == true) {
        newPurchaseRequests = response.new_material_reqs.result;
        // totalCount = response.new_material_reqs.pagination.total;
        // pagination.totalItems = response.new_material_reqs.pagination.total;
        // console.log("newPurchaseRequests", newPurchaseRequests);
        Display_newPurchaseRequests();
        //   setTimeout(() => {
        //     spinner(false);
        //   }, 300);
      } else {
        console.log("error", response);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      //   setTimeout(() => {
      //     spinner(false);
      //   }, 300);
      toast("warning", "Api failed. Please try again.");
    },
    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        // setTimeout(() => {
        //   spinner(false);
        // }, 300);
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

var NewProductList;
function Display_newPurchaseRequests() {
  var dataarray = [];
  if (newPurchaseRequests == null || newPurchaseRequests == undefined) {
    // $("#NewMaterialReqs").html(
    //   "<tr><td colspan='12' class='text-center'>No Data Found</td></tr>"
    // );
  } else {
    newPurchaseRequests.forEach((item, index) => {
      var check_box;
      var editbtn = "";
      var deletebtn = "";
      if (
        (user_details[0].role_id == 2 && props.item.statuss == "pending") ||
        user_details[0].role_id == 4 ||
        checkApproval(props.item.indent_approvals) ||
        (user_details[0].role_id == 11 &&
          (props.item.status == 2 || props.item.status == "Hold") &&
          props.item.approval_finish == "1" &&
          props.item.rm_approval == "0")
      ) {
        check_box = "";
      }
      var statuss = checkApprovalStatus(item.indent_approvals); //item.statuss

      var showPdfButton =
        "<button id='showPdfButton" +
        index +
        "' onclick='showPdf(" +
        item.quote +
        "," +
        index +
        ")' style='display: none; font-size: 20px; color: blue;' > &#128065; </button>";

      var downloadLink =
        "<a id='downloadLink' style='display: none; font-size: 20px; color: red;' download>&#128193;</a>";
      if (item.statuss == "pending") {
        // ${item.id},${element.id}
        editbtn = ` <span onclick="editpopshow()"
      data-toggle="modal"
        data-target="#indentApprovaledit">
        <span class="material-symbols-rounded">edit</span>
        </span>
        &nbsp;&nbsp;&nbsp;`;
        // ${item.id},${element.id}
        deletebtn = `
        <span class="redicon" onclick="deletealert()">
        <span class="material-symbols-rounded delete">delete</span>
        </span>`;
      }
      var action = `
    <div>
    <p class='timeline-text-modal' style="display: flex;justify-content: space-around;" onclick='onepopshow(${orders.id})'data-toggle='modal' data-target='#indent-timeline-modal'>
    <span class='material-symbols-rounded'>visibility</span>TIMELINE</p>
            <p class='timeline-text-modal' style="display: flex;justify-content: space-around;" onclick='twopopshow(${orders.id})' data-toggle='modal' data-target='#indentApproval'>
                <span class='material-symbols-rounded'>visibility</span>Approval Flow   </p>
                <p>${editbtn}${deletebtn}</p></div>`;

      dataarray.push([
        check_box,
        index + 1,
        item.id,
        item.first_name,
        statuss,
        item.product_name,
        getArrayOfImages(item.image_url),
        showPdfButton + " " + downloadLink,
        item.product_unit,
        item.urgency_days,
        moment(item.createdat).format("DD-MMM-YYYY"),
        item.location.plant_id +
          " - " +
          item.location.storage_loc +
          " - " +
          item.location.storage_location_desc,
        action,
      ]);
    });
  }
  if (NewProductList) {
    NewProductList.clear().destroy();
  }
  // console.log("dataarray", dataarray);
  NewProductList = js("#NewProductList").DataTable({
    retrieve: true,
    // bAutoWidth: true,
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
    //scrollCollapse: true,
    scrollX: true,
    paging: true,
    data: dataarray,
    // dom: "Bfrtip",
    // buttons: ["excel"],
  });
}

function showPdf(itemQuote, index) {
  if (itemQuote !== null) {
    var showPdfButton = document.getElementById("showPdfButton" + index);
    var downloadLink = document.getElementById("downloadLink" + index);

    // Show the download button
    downloadLink.href = itemQuote;
    downloadLink.style.display = "block";

    // Hide the "show PDF" button
    showPdfButton.style.display = "none";
  }
}

function getArrayOfImages(imageString) {
  if (imageString != null) {
    return imageString.split(",");
  }
}
function getLocations() {
  var userId = user_details[0].id;
  js.ajax({
    type: "GET",
    url: host + path + "user_locations?id=" + userId, // Replace with your API endpoint
    success: function (response) {
      store_locations[0].locations = response.locations;
    },
    error: function (error) {
      console.log(error);
    },
  });
}
  
function checkApprovalStatus(approvals) {
  var status = null;
  if (approvals != null) {
    for (var i = 0; i < approvals.length; i++) {
      if (approvals[i].finish == "0") {
        if (approvals[i].role_id == user_details[0].role_id) {
          status = "( Your Approval Pending )";
        } else {
          status = `( Approval Pending From ${approvals[i].role_name} )`;
        }
        break;
      }
    }
  }
  return status;
}

// material_type();
material_group();
getNewPurchaseProducts();
getLocations();
