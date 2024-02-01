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
  {},
  { text: "S No", value: "" },
  { text: "ID", value: "id" },
  { text: "Indent ID", value: "order_id" },
  { text: "User ID", value: "user_id" },
  { text: "Name", value: "first_name" },
  { text: "Quantity", value: "quantity" },
  { text: "Remarks", value: "remarks" },
  { text: "Status", value: "status" },
  { text: "Created At", value: "created_at" },
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
  // { text: "Id", value: "id" },
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

function getPRMaterials() {
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
    },
    error: function (err) {
      alert(err);
      console.log(err);
    },
  });
}

function getStoreLocations() {
  if (role_id == 5) {
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
    async: false,
    success: function (response) {
      store_plants = response.locations;
    },
    error: function (err) {
      alert(err);
      console.log(err);
    },
  });
}

function getUserStoreLocations() {
  js.ajax({
    url: host + path + "user_store_locations?id=" + id,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      user_store_locations = response.locations;
    },
    error: function (err) {
      alert(err);
      console.log(err);
    },
  });
}
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
getStoreLocations();
getUserStoreLocations();
