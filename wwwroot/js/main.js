//check login user data
var Logindata = JSON.parse(localStorage.getItem("user_info"));
//console.log("Logindata data on Home js----->", Logindata);
if (!Logindata) {
  window.location.href = "../Login";
}

var roles_menus = {
  //admin role
  1: [
    {
      Report: "Reports",
      CreateUser: "Users",
      roles: "Role",
      departments: "Departments",
      locations: "Locations",
      Itemmaterials: "Item materials",
      special_materials: "Special materials",
      workflow: "Workflow",
      wbs: "WBS Number",
      assets: "Assets",
      cost_centers: "Cost centers",
      // Workflow_details: "Workflow_details",
      // Test: "Test",
    },
  ],
  //Indent manager role = 2
  2: [
    {
      Report: "Reports",
      MyProfile: "My Profile",
      MyRequests: "My Approvals",
      NewIndent: "New Indent",
      Itemmaterials: "Item Materials",
      returns: "Returns",
      NewPurchaseReq: "New Material Request",
      Servicerequest: "Service request",
      Vendors: "Vendors",
      Notifications: "Notifications",
      // Test: "Test",
    },
  ],

  //Indent user role = 3
  3: [
    {
      Report: "Reports",
      MyProfile: "My Profile",
      MyRequests: "My Requests",
      NewIndent: "New Indent",
      NewPurchaseReq: "New Material Request",
      Servicerequest: "Service Request",
      Vendors: "Vendors",
      Notifications: "Notifications",
    },
  ],
  //Store Manager role = 4
  4: [
    {
      Report: "Reports",
      MyProfile: "MyProfile",
      NewProductList: "New Material Request",
      Itemmaterials: "Item materials",
    },
  ],
  //Issue manager role = 5
  5: [
    {
      Report: "Reports",
      MyProfile: "MyProfile",
      MyRequests: "Approvals",
      NewIndent: "Cretate STO",
      Itemmaterials: "Item materials",
      Notifications: "Notifications",
    },
  ],

  //HOD role = 7
  7: [
    {
      Report: "Reports",
      MyProfile: "MyProfile",
      MyRequests: "MyRequests",
      NewIndent: "NewIndent",
      Itemmaterials: "Item materials",
      returns: "returns",
      NewPurchaseReq: "new material request",
      Servicerequest: "Service request",
      Vendors: "Vendors",
      Notifications: "Notifications",
    },
  ],
  //MD role = 8
  8: [
    {
      Report: "Reports",
      MyProfile: "MyProfile",
      MyRequests: "My Approvals",
      NewIndent: "NewIndent",
      Itemmaterials: "Item materials",
      returns: "returns",
      NewPurchaseReq: "new material request",
      Servicerequest: "Service request",
      Vendors: "Vendors",
      Notifications: "Notifications",
    },
  ],
  // requestmanager Role =11
  11: [
    {
      Report: "Reports",
      MyProfile: "MyProfile",
      MyRequests: "MyApprovals",
      Itemmaterials: "Item materials",
      Notifications: "Notifications",
    },
  ],
  // Planning Manager Role =12
  12: [
    {
      Report: "Reports",
      MyProfile: "MyProfile",
      Pr_materials: "Consolidate Indents",
      NewPurchaseReq: "Purchase Request",
      Servicerequest: "Service request",
      Itemmaterials: "Item materials",
      Notifications: "Notifications",
    },
  ],
  // Return Manager Role = 13
  13: [
    {
      Report: "Reports",
      MyProfile: "MyProfile",
      returnsdata: "returns",
      Itemmaterials: "Item materials",
      Notifications: "Notifications",
    },
  ],

  //Super admin role = 14
  14: [
    {
      Report: "Reports",
      MyProfile: "MyProfile",
    },
  ],
  //SUBHOD role = 19
  19: [
    {
      Report: "Reports",
      MyProfile: "MyProfile",
      MyRequests: "MyRequests",
      NewIndent: "NewIndent",
      Itemmaterials: "Item materials",
      returnsdata: "returns",
      NewPurchaseReq: "New material request",
      Servicerequest: "Service request",
      Vendors: "Vendors",
      Notifications: "Notifications",
    },
  ],
};

var User_id = Logindata.user[0].id;
var User_role = Logindata.user[0].role_id;
var User_name = Logindata.user[0].first_name;

function getuserdata() {
  $.ajax({
    url: user_details_API,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      user_id: User_id,
      role_id: User_role,
    }),
    success: function (response) {
      localStorage.setItem("user_info", response);
    },
    error: function (error) {
      console.error("Error creating data :->>", error);
    },
  });
}
// var User_id = 589;
// var User_role = 2;
// var User_name = "Testing";

var notification_Payload = { user_id: User_id };

if (
  User_role == 1 ||
  User_role == 4 ||
  User_role == 13 ||
  User_role == 12 ||
  User_role == 14 ||
  User_role == 11
) {
  document.getElementById("notification").style.display = "none";
  document.getElementById("shopping_cart").style.display = "none";
}

function checkUserRole() {
  var url = window.location.href;
  var parts = url.split("/");
  var lastPart = parts[parts.length - 1];

  //console.log(parts);
  var path = new URL(url).pathname;
  var pathParts = path.split("/"); // Split the path into parts

  if (pathParts.length >= 2) {
    var firstName = pathParts[2]; // Get the second part (index 1)
    // console.log(firstName);
  } else {
    //console.log("Invalid URL format");
  }

  if (lastPart === "Cart") {
    // Assuming User_role is defined somewhere
    if (User_role === 1) {
      alert("Admin role not allowed to access Cart page.");
      // Redirect to the error page
      window.location.href = "../Error/HandleError";
      return;
    } else {
      //console.log("No error and redirect for Cart page.");
      return;
    }
  }

  // Assuming roles_menus is defined somewhere
  for (var roleId in roles_menus) {
    if (User_role == roleId) {
      var roleMenuItems = roles_menus[roleId][0];
      //debugger;
      if (
        firstName === "IndentDetails" ||
        firstName === "Workflow_details" ||
        parts[4] === "MyRequests#moyen" ||
        parts[4] === "MyProfile"
      ) {
        //console.log("Access allowed for page: " + lastPart);
      } else if (!roleMenuItems.hasOwnProperty(lastPart)) {
        //console.log("Error found for page: " + lastPart);
        // Redirect to the error page
        window.location.href = "../Error/HandleError";
        return;
      }
    }
  }

  //console.log("Access allowed for page: " + lastPart);
}

if (Logindata.user[0].store_previlages != null) {
  if (Logindata.user[0].store_roles.length != 1) {
    if (
      Logindata.user[0].role_id === 12 || //planning Manager
      Logindata.user[0].role_id === 5 || //issue Manager
      Logindata.user[0].role_id === 13 || //return Manager
      Logindata.user[0].role_id === 11 || //request Manager
      Logindata.user[0].role_id ==
        Logindata.user[0].store_previlages.filter((item) => item == 3) //inden manager
    ) {
      for (const item of Logindata.user[0].store_roles) {
        //console.log("this", item);
        if (item.id === User_role) {
          //console.log("Match found! Role:", item.role);
          role = item.role;
          break; // Assuming IDs are unique, you can break the loop once a match is found
        }
      }
      document.getElementById("roleinfo").innerHTML =
        "<span style='font-size: 0.6em;'>Current Role: " +
        role +
        " </span>" +
        "<button class='lable_button Custom-btn lightblue'  onclick='showCustomAlert()' style='font-size: 0.6em; padding: 6px;'>Change Role </button>";
    }
  }
}

function showCustomAlert() {
  var html;
  var button = "";
  var data = JSON.parse(localStorage.getItem("user_info"));
  var store_roles = data.user[0].store_roles;
  //console.log(store_roles);
  store_roles.forEach((element) => {
    button += ` <button onclick="changeRole(${element.id})" class="swal-custom-button">
                    <img src="/images/store-room.jpg" alt="Success" />
                    <p class="button-label">${element.role}</p>
                </button>`;
  });
  var html = `
        <div class="swal-close">
            <button class="swal-close-button" aria-label="Close">
            <span  aria-hidden="true"class="material-symbols-rounded">close</span>
            </button>
        </div>
        <div class="swal-image-buttons">
            ${button}
        </div>`;

  Swal.fire({
    title: "Select Role",
    html: html,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      popup: "custom-swal-popup",
    },
  });

  document
    .querySelector(".swal-close-button")
    .addEventListener("click", function () {
      Swal.close();
    });
}

function changeRole(id) {
  Swal.close();
  // console.log("Performing action for role id:", id);
  var userDetails = JSON.parse(localStorage.getItem("user_info"));
  // console.log(userDetails, "------------------------------------");
  userDetails.user[0].role_id = id;
  userDetails = JSON.stringify(userDetails);
  localStorage.setItem("user_info", userDetails);
  localStorage.removeItem("sidemenu");
  setTimeout(() => {
    window.location.href = "../Home/MyProfile";
  }, 500);
}

checkUserRole();
// if you want to change API host and path her and rest.js page

// var host = "https://172.16.1.69:3002";

//// host 1
//var host = "https://grim.co.in:3002";
//var path = "/api/v4/";
//// host 2
//var host1 = "https://grim.co.in:3003";
//var path1 = "/api/";

// var host1 = window.BaseUrl + wind

var host = window.BaseUrl + window.Port1;
var host1 = window.BaseUrl + window.Port1;
var path = window.Endpoint1;
var path1 = window.Endpoint2;

/*console.log("host", host, host1);*/

// for path1 use like this: host1+path1+"something"
/* origin -> https://grim.co.in:3003/api/movement_type?_where=(type,eq,RMT)*/

/*check which roleId*/
var role;
switch (User_role) {
  case 1:
    role = "Admin/";
    break;

  case 2:
    role = "manager/";
    break;

  case 3:
    role = "indent/";
    break;

  case 4:
    role = "storeUser/";
    break;

  case 5:
    role = "storeUser/";
    break;

  case 7:
    role = "hod/";
    break;

  case 8:
    role = "md/";
    break;

  case 18:
    role = "hod/";
    break;

  case 19:
    role = "manager/";
    break;

  case 11:
    role = "storeUser/";
    break;

  case 12:
    role = "storeUser/";
    break;

  case 13:
    role = "storeUser/";
    break;

  case 14:
    role = "admin/";
    break;

  default:
    alert("role not found for APi ->" + User_role);
    break;
}

//check which role are API

//Dashboard
var Dashboard_API = host + path + role + "dashboard";

var i_orders_pending_API = host + path + "indent/i_orders";
var i_orders_p_API = host + path + "/i_orders";
var i_orders_API = host + path + role + "i_orders";

var user_locations_APi = host + path + "user_locations?id=" + User_id;
// var order_status_APi = host1 + "/api/order_status"; 
// var order_status_where =
//   host1 + "/api/order_status?_where=(created_by,eq,1)&_size=100";

  var order_status_where =  host1 +"/api/v4/order_status?created_by=1";
  
     
var indent_report_API = host + path + role + "indent_report";
var indent_line_item_report_API =
  host + path + role + "indent_line_item_report";
var user_report_API = host + path + role + "user_report";
var material_report_API = host + path + role + "material_report";
var pr_report_API = host + path + role + "pr_report";
// All API URL

//notification API
var notification_API = host + path + "notification_logs";
var user_store_locations_api;
if (User_role == 5) {
  user_store_locations_api =
    host + path + "user_sto_store_locations?id=" + User_id;
} else {
  user_store_locations_api = host + path + "user_store_locations?id=" + User_id;
}

//cart Page API
var Product_API = host + path + "products";
var user_locations_Api = host + path + "user_locations" + "?id=" + User_id;
var WBS_Element_Number_API = host + path + "wbs_numbers?plant_id=";
var create_orders_API = host + path + "create_orders";

// Myrequests page
var approval_count_API = host + path + "approval_count";
var status_history_API = host + path + "status_history";
var approvals_details_API = host + path + "approvals_details?id=";
var service_requests_API = host + path + role + "service_requests";
var service_status_history_API = host + path + "service_status_history";
var update_order_status_API = host + path + "update_order_status";
var company_codes_API = host + path + "company_codes";
//profile API
var user_details_API = host + path + "user_details";

//indent_report API
var indent_report_API = host + path + "manager/indent_report";
var download_indent_report = host + path + "indent/indent_report";

//Servicerequest APi
var user_locations_API = host + path + "user_locations?id=" + User_id;
var service_groups_API = host + path + "service_groups";
var service_no_API = host + path + "service_nos";
var uom_API = host + path + "uom";
var gl_accounts_API = host + path + "gl_accounts";
var purchase_group_API = host1 + "/api/purchase_group";
var wbs_numbers_plant_id_API = host + path + "wbs_numbers?plant_id=";

var locations_API = host + path + "locations";
var return_items_API = host + path + "manager/return_items";

//vendors API
var vendors_form_API = host1 + "/api/vendors";
var vendors_Get_API = host + path + "indent/vendors";
var vendors_Edit_Delete_API = host1 + "/api/vendors";

//Logout path API
var logout_API = host + path + "logout";

// NewPurchaseReq API
var NewPurchaseReq = "";
// var NewPurchaseReq =
//   "/vendors?_where=(user_id,eq," + User_id + ")&_fields=id,name";
// indent_report API
var indent_report_API = host + path + role + "indent_report";

//admin side page
var wbs_numbers = host + path + "wbs_numbers";

//received_materials_API
var received_materials_API = host + path + "received_materials?id=";

//var url = window.location.href;
// Check if the URL is the error URL
// if (url === "chrome-error://chromewebdata/") {
//   console.log(
//     "Invalid URL encountered. Redirecting to home page or error page."
//   );
//   window.location.href = "../Home"; // Replace with the appropriate home page URL or error page URL
// }
var sap_user_id =
  Logindata.user[0].sap_user_id == null
    ? ""
    : "(" + Logindata.user[0].sap_user_id + ")";

document.getElementById("username").innerHTML =
  Logindata.user[0].first_name + sap_user_id;

document.getElementById("username1").innerHTML =
  Logindata.user[0].first_name + sap_user_id;

var sort_by = "alphabetically";
var search = "";
var plant;
var products_result;
var selectedValue;
var products_pagination;
var pagenumber = 1;
var search_type = false;
// var addtocart = [];

// var notification_Payload = { user_id: User_id };
// // notification_logs Api call hear

// function Notifications() {
//   document.getElementById("noticationbody").innerHTML = "";
//   $.ajax({
//     url: notification_API,
//     type: "POST",
//     contentType: "application/json",
//     data: JSON.stringify(notification_Payload),
//     success: function (response) {
//       if (response.success === true) {
//         // console.log("notification_logs js ->Get successfully:", response);
//         document.getElementById("notifications_no").innerHTML = "";
//         console.log(response.notification_logs.length);
//         document.getElementById("notifications_no").innerHTML =
//           response.notification_logs.length;
//         document.getElementById("noticationbody").innerHTML = "";
//         response.notification_logs.forEach((element) => {
//           var inputTimestamp = new Date(element.created_at);
//           const formattedTime = getTimeAgo(inputTimestamp);
//           document.getElementById("noticationbody").innerHTML += `
//                     <div class="notification-wrap">
//                         <div class="notification-inner">
//                             <div class="user-img"><img src="/images/profile.28fb3626.jpg"></div>
//                             <div class="user-info">
//                             <h3 onclick="handleClick(${element.order_id},${
//             element.id
//           })">${element.message}</h3>
//                                   <p>(${
//                                     element.product_id + "-" + element.name
//                                   })</p>
//                                 <p>${formattedTime}</p>
//                             </div>
//                         </div>
//                     </div>`;
//         });
//       }
//     },
//     error: function (xhr, status, error) {
//       if (status === "error") {
//         spinner(false);
//         console.log("Error: " + error);
//         toast("warning", error);
//       }
//     },
//     error: function (error) {
//       toast("error", error);
//       toast("error", "Network error. Please try again later.");
//       console.error("Error creating data on user_store_locations:->>", error);
//     },
//   });
// }
// if (User_role != 13) {
//   // if (User_role != 12) {
//   Notifications();
//   // }
// }

function handleClick(id, notification_id) {
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

  var editedRequestObj = {
    read_notification: "0",
    updated_at: dateTime,
  };
  //var api =
  //  "https://grim.co.in:3003/api/notification_user_logs/" + notification_id;

  $.ajax({
    url: host1 + path1 + "notification_user_logs/" + notification_id,
    type: "PATCH",
    contentType: "application/json",
    data: JSON.stringify(editedRequestObj),
    success: function (response) {
      debugger;
      window.location.href = "/Home/IndentDetails/" + id;
    },
    error: function (xhr, status, error) {
      if (status === "error") {
        spinner(false);
        console.log("Error: " + error);
        //toast("warning", error);
      }
    },
    error: function (error) {
      toast("error", error);
      toast("error", "Network error. Please try again later.");
      console.error("Error creating data on user_store_locations:->>", error);
    },
  });
}

// notification_logs Api call end hear

// cart notifications

function cartcount() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    if (cart.length == 0) {
      document.getElementById("notifications_cart").style.display = "none";
    } else {
      document.getElementById("notifications_cart").style.display = "block";
      document.getElementById("notifications_cart").innerHTML = cart.length;
    }
  } else {
    document.getElementById("notifications_cart").style.display = "none";
  }
}
cartcount();

// display pagination btn method global start

function paginationlist(current, total, next, perPage, pagename) {
  var Arrow_Right = "";
  var Arrow_left = "";
  document.getElementById("paginationlist").innerHTML = "";

  current != 0
    ? (Arrow_left = `onclick="page(${current},'${pagename}')"`)
    : (Arrow_left = "");

  current != total - 1
    ? (Arrow_Right = `onclick="page(${next + 1},'${pagename}')"`)
    : (Arrow_Right = "");

  document.getElementById("paginationlist").innerHTML += `
    <li ${Arrow_left} class="page-item">
      <a class="page-link prev" aria-label="Previous">
          <span aria-hidden="true" >&#10094;</span>
          <span class="sr-only" >Previous</span>
      </a>
    </li>`;

  var current_active;
  var paginationHTML = "";

  if (total > 7) {
    var startPage = 1;
    var endPage = total;

    if (total > 8) {
      // Calculate the range for the page numbers to display
      startPage = Math.max(current - 2, 1);
      endPage = Math.min(current + 5, total);

      // Handle duplicate first or last page numbers
      if (startPage === 3) {
        startPage = 2;
      } else if (startPage <= 2) {
        startPage = 1;
      }

      if (endPage === total - 2) {
        endPage = total - 1;
      } else if (endPage >= total - 1) {
        endPage = total;
      }

      // Add first page number if not active and not duplicate
      if (current > 0 && startPage !== 1) {
        paginationHTML += `
          <li onclick="page(1,'${pagename}')" class="page-item">
            <a class="page-link">1</a>
          </li>`;
      }

      // Add an ellipsis if there are numbers to skip on the left side
      if (startPage > 2) {
        paginationHTML += `
        <li class="page-item">
          <a class="page-link">...</a>
        </li>`;
      }

      // Add page numbers within the range (startPage to endPage)
      for (var page = startPage; page <= endPage; page++) {
        if (page === current + 1) {
          current_active = "active";
        } else {
          current_active = "";
        }
        paginationHTML += `
          <li onclick="page(${page},'${pagename}')" class="page-item ${current_active}">
            <a class="page-link">${page}</a>
          </li>`;
      }

      // Add an ellipsis if there are numbers to skip on the right side
      if (endPage < total - 1) {
        paginationHTML += `
        <li class="page-item">
          <a class="page-link">...</a>
        </li>`;
      }

      // Add last page number if not active and not duplicate
      if (current < total - 1 && endPage !== total) {
        paginationHTML += `
          <li onclick="page(${total},'${pagename}')" class="page-item">
            <a class="page-link">${total}</a>
          </li>`;
      }
    } else {
      // Display all pages if total is less than or equal to 8
      for (var page = startPage; page <= endPage; page++) {
        if (page === current + 1) {
          current_active = "active";
        } else {
          current_active = "";
        }
        paginationHTML += `
          <li onclick="page(${page},'${pagename}')" class="page-item ${current_active}">
            <a class="page-link">${page}</a>
          </li>`;
      }
    }
  } else {
    // Display all pages if total is less than or equal to 7
    for (var page = 1; page <= total; page++) {
      if (page === current + 1) {
        current_active = "active";
      } else {
        current_active = "";
      }
      paginationHTML += `
        <li onclick="page(${page},'${pagename}')" class="page-item ${current_active}">
          <a class="page-link">${page}</a>
        </li>`;
    }
  }

  document.getElementById("paginationlist").innerHTML += paginationHTML;

  document.getElementById("paginationlist").innerHTML += ` <!--Numbers-->
    <li class="page-item" ${Arrow_Right}>
      <a class="page-link next"
        aria-label="Next">
        <span aria-hidden="true">&#10095;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>`;
}
function paginationlist_sto(current, total, next, perPage, pagename) {
  var Arrow_Right = "";
  var Arrow_left = "";
  document.getElementById("paginationlist_sto").innerHTML = "";

  current != 0
    ? (Arrow_left = `onclick="page(${current},'${pagename}')"`)
    : (Arrow_left = "");

  current != total - 1
    ? (Arrow_Right = `onclick="page(${next + 1},'${pagename}')"`)
    : (Arrow_Right = "");

  document.getElementById("paginationlist").innerHTML += `
    <li ${Arrow_left} class="page-item">
      <a class="page-link prev" aria-label="Previous">
          <span aria-hidden="true" >&#10094;</span>
          <span class="sr-only" >Previous</span>
      </a>
    </li>`;

  var current_active;
  var paginationHTML = "";

  if (total > 7) {
    var startPage = 1;
    var endPage = total;

    if (total > 8) {
      // Calculate the range for the page numbers to display
      startPage = Math.max(current - 2, 1);
      endPage = Math.min(current + 5, total);

      // Handle duplicate first or last page numbers
      if (startPage === 3) {
        startPage = 2;
      } else if (startPage <= 2) {
        startPage = 1;
      }

      if (endPage === total - 2) {
        endPage = total - 1;
      } else if (endPage >= total - 1) {
        endPage = total;
      }

      // Add first page number if not active and not duplicate
      if (current > 0 && startPage !== 1) {
        paginationHTML += `
          <li onclick="page(1,'${pagename}')" class="page-item">
            <a class="page-link">1</a>
          </li>`;
      }

      // Add an ellipsis if there are numbers to skip on the left side
      if (startPage > 2) {
        paginationHTML += `
        <li class="page-item">
          <a class="page-link">...</a>
        </li>`;
      }

      // Add page numbers within the range (startPage to endPage)
      for (var page = startPage; page <= endPage; page++) {
        if (page === current + 1) {
          current_active = "active";
        } else {
          current_active = "";
        }
        paginationHTML += `
          <li onclick="page(${page},'${pagename}')" class="page-item ${current_active}">
            <a class="page-link">${page}</a>
          </li>`;
      }

      // Add an ellipsis if there are numbers to skip on the right side
      if (endPage < total - 1) {
        paginationHTML += `
        <li class="page-item">
          <a class="page-link">...</a>
        </li>`;
      }

      // Add last page number if not active and not duplicate
      if (current < total - 1 && endPage !== total) {
        paginationHTML += `
          <li onclick="page(${total},'${pagename}')" class="page-item">
            <a class="page-link">${total}</a>
          </li>`;
      }
    } else {
      // Display all pages if total is less than or equal to 8
      for (var page = startPage; page <= endPage; page++) {
        if (page === current + 1) {
          current_active = "active";
        } else {
          current_active = "";
        }
        paginationHTML += `
          <li onclick="page(${page},'${pagename}')" class="page-item ${current_active}">
            <a class="page-link">${page}</a>
          </li>`;
      }
    }
  } else {
    // Display all pages if total is less than or equal to 7
    for (var page = 1; page <= total; page++) {
      if (page === current + 1) {
        current_active = "active";
      } else {
        current_active = "";
      }
      paginationHTML += `
        <li onclick="page(${page},'${pagename}')" class="page-item ${current_active}">
          <a class="page-link">${page}</a>
        </li>`;
    }
  }

  document.getElementById("paginationlist_sto").innerHTML += paginationHTML;

  document.getElementById("paginationlist_sto").innerHTML += ` <!--Numbers-->
    <li class="page-item" ${Arrow_Right}>
      <a class="page-link next"
        aria-label="Next">
        <span aria-hidden="true">&#10095;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>`;
}

function page(clickpagenumber, pagename) {
  pagenumber = clickpagenumber;
  switch (pagename) {
    case "MyRequests":
      i_ordershow(pagenumber);
      break;

    case "NewIndent":
      cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
      break;

    case "Itemmaterials":
      showtable_data(pagenumber, sort_by, search);
      break;

    default:
      alert("name not found");
      break;
  }
}

// display pagination btn method end

var v = 1;

function spinner(isloading) {
  if (isloading == true) {
    document.getElementById("spinnerbody").style.display = "block";
  } else {
    document.getElementById("spinnerbody").style.display = "none";
  }
}

var icons_list = {
  Report: '<span class="material-symbols-rounded">dashboard</span>',
  MyProfile: '<span class="material-symbols-rounded">assignment_ind</span>',
  MyRequests: '<span class="material-symbols-rounded">check_circle</span>',
  NewIndent: '<span class="material-symbols-rounded">assignment</span>',
  returns: '<span class="material-symbols-rounded">forward</span>',
  returnsdata: '<span class="material-symbols-rounded">forward</span>',
  NewPurchaseReq:
    '<span class="material-symbols-rounded">assignment_add</span>',
  Servicerequest: '<span class="material-symbols-rounded">settings</span>',
  Itemmaterials:
    '<span class="material-symbols-rounded">format_list_bulleted</span > ',
  Vendors: '<span class="material-symbols-rounded">group</span>',
  Notifications:
    '<span class="material-symbols-rounded">mark_chat_unread</span>',
  Newmaterialrequest:
    '<span class="material-symbols-rounded">assignment_add</span>',
  CretateSTO: '<span class="material-symbols-rounded">priority_high</span>',
  report: '<span class="material-symbols-rounded">dashboard</span>',
  CreateUser: '<span class="material-symbols-rounded">group</span>',
  roles: '<span class="material-symbols-rounded">diversity_3</span>',
  departments: '<span class="material-symbols-rounded">account_tree</span>',
  locations: '<span class="material-symbols-rounded">my_location</span>',
  item_materials:
    '<span class="material-symbols-rounded">format_align_left</span>',
  special_materials:
    '<span class="material-symbols-rounded">format_align_left</span>',
  workflow: '<span class="material-symbols-rounded">folder_managed</span>',
  wbs: '<span class="material-symbols-rounded">format_list_bulleted</span>',
  assets: '<span class="material-symbols-rounded">format_list_bulleted</span>',
  cost_centers:
    '<span class="material-symbols-rounded">format_list_bulleted</span>',
};

//else{icon='<span class="material-symbols-rounded">priority_high</span>'}

// toast function
function toast(action, msg) {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "3500",
    extendedTimeOut: "3000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  Command: toastr[action](msg);
}

function getTimeAgo(timestamp) {
  var currentTime = new Date();
  var timeDifference = Math.floor((currentTime - timestamp) / 1000); // Time difference in seconds

  var hours = Math.floor(timeDifference / 3600); // Convert seconds to hours
  var days = Math.floor(hours / 24); // Convert hours to days

  if (days >= 1) {
    if (days === 1) {
      return "1 day ago";
    } else {
      return days + " days ago";
    }
  } else {
    return hours + " hours ago";
  }
}

function popClose(name) {
  $("#" + name).modal("hide");
}

function showModal(bodyContent, title, popname, otherMessage, color) {
  const modal = $("#customModalCenter");
  const bgcolor = modal.find(".modal-header");
  const modalTitle = modal.find(".modal-title");
  const modalBody = modal.find(".modal-body");
  const modalbtnyes = modal.find(".common-blue-button");
  bgcolor.addClass(color);
  modalTitle.text(title);
  modalBody.text(bodyContent);
  var count = "";
  switch (popname) {
    case "s_p_delete":
      modalbtnyes.on("click", function () {
        var getcart = JSON.parse(localStorage.getItem("cart"));
        var filteredArray = getcart.filter(function (obj) {
          return obj.id !== otherMessage;
        });
        // console.log("filteredArray->>>", filteredArray);
        localStorage.setItem("cart", JSON.stringify(filteredArray));
        toast("error", "prodect deleted");
        cartshow();
        cartcount();
        modal.modal("hide");
      });
      break;

    case "clearcart":
      modalbtnyes.on("click", function () {
        localStorage.removeItem("cart");
        toast("error", "all prodect clear");
        cartshow();
        cartcount();
        modal.modal("hide");
      });
      break;

    case "PR_raised":
      modal.find(".common-blue-button").text("Approve");
      modal.find(".common-red-button").text("Cancel");
      modalbtnyes.on("click", function () {
        // console.log("PR_raised");
        modal.modal("hide");
      });
      break;

    case "myrequestdelete":
      modal.find(".common-blue-button").text("Yes");
      modal.find(".common-red-button").text("Cancel");
      modalbtnyes.on("click", function () {
        // console.log("myrequestdelete");
        modal.modal("hide");
        //console.log(count);
        count++;
        //console.log(count);
        i_ordershow(1);
      });
      break;

    default:
      break;
  }

  modal.modal("show");
}

function handleYes() {
  // Add your code here for the "Yes" button functionality
  // console.log("Yes button clicked");
  // close the modal
  $("#customModalCenter").modal("hide");
  return true;
}

//------------- Button Ripple effect -----------
var btn = document.querySelectorAll(".Custom-btn");
btn.forEach((el) => {
  el.style.position = "relative";
  el.style.overflow = "hidden";
  el.addEventListener("click", function (e) {
    var x = e.offsetX;
    var y = e.offsetY;

    var ripples = document.getElementsByClassName("ripple");

    if (ripples.length < 10) {
      // this restricts the user from creating lots of ripples
      var ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      this.appendChild(ripple);

      setTimeout(function () {
        ripple.remove();
      }, 1000);
    }
  });
});

//------------- Button Ripple effect end -----------

// function checkNumber(num) {
//   if (num > 99) {
//     return "99+";
//   } else {
//     return num;
//   }
// }

// today date
function currentdate(val) {
  // Create a new Date object
  var currentDate = new Date();

  if (val == 1) {
    // Subtract 1 year from the current date
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    // Add one day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Get the updated date components
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1 to get the correct month
  var day = currentDate.getDate();

  // Format the updated date as desired (e.g., YYYY-MM-DD)
  return (
    year +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0")
  );
}

function removeSpaceFromColor(colorName) {
  if (colorName == null) {
    return "light blue";
  }
  return colorName.replace(/\s+/g, "");
}

//28-08-23 start

function offcanvas(filtername) {
  // console.log("filtername", filtername);
  var option = $(".offcanvas-body");
  option.empty(); // Clear any existing content

  var html;

  switch (filtername) {
    case "NewIndent":
      html = `<div class="row">
              <div class="col-12">
              <div class="filter-form">
                <div class="form-group">
                    <label for="Type_of_Material">Type_of_Material</label><br>
                    <select id="Type_of_Material" class="selectpicker" multiple data-live-search="true">
                        
                    </select>
                </div>

                <div class="form-group">
                    <label for="Group_of_Material">Group_of_Material</label><br>
                    <select id="Group_of_Material" class="selectpicker" multiple data-live-search="true">
                        
                    </select>
                </div>

                <button type="button" class="btn btn-primary mt-3" onclick="submitForm()">Apply</button>
                <button type="button" class="btn btn-secondary mt-3" onclick="resetForm()">Reset</button>
                </div>
               </div>
              </div>`;
      break;

    case "MyRequests":
      html = `<div class="row">
          <div class="col-12">
              <div class="filter-form">
                  <div class="mb-3">
                      <div class="date-range-container">
                          <div class="dropdown">
                              <!-- <label for="selected-dates">Selected Range:</label> -->
                              <input type="text" class="dropbtn" id="selected-dates" readonly>
                              <div class="dropdown-content">
                                  <span data-range-key="Today">Today</span>
                                  <span data-range-key="Yesterday">Yesterday</span>
                                  <span data-range-key="Last 7 Days">Last 7 Days</span>
                                  <span data-range-key="Last 30 Days">Last 30 Days</span>
                                  <span data-range-key="This Month">This Month</span>
                                  <span data-range-key="Last Month">Last Month</span>
                                  <span data-range-key="This Year">This Year</span>
                                  <span data-range-key="Last 365 Days" class="active">Last 365 Days</span>
                                  <span data-range-key="Last Year">Last Year</span>
                                  <span data-range-key="Custom Range">Custom Range</span>
                              </div>
                          </div>
                      </div>
      
                      <div id="custom-range-container" style="display: none;">
                          <label for="from-date">From:</label>
                          <input type="date" id="from-date">
                          <label for="to-date">To:</label>
                          <input type="date" id="to-date">
                          <button id="apply-custom-range">Apply</button>
                      </div>
                  </div>
                  <div id="output"></div>
                  <div class="form-group">
                      <label for="locations">Locations</label><br>
                      <select id="locations" class="selectpicker" multiple data-live-search="true">
                      </select>
                  </div>
      
                  <div class="form-group">
                      <label for="indent_status">Indent Status</label><br>
                      <select id="indent_status" class="selectpicker" multiple data-live-search="true">
                      </select>
                  </div>
      
                  <button type="button" class="btn btn-primary mt-3" onclick="submitForm()">Apply</button>
                  <button type="button" class="btn btn-secondary mt-3" onclick="resetForm()">Reset</button>
              </div>
          </div>
      </div>`;
      break;

    case "Report":
      html = `<div class="row">
          <div class="col-12">
              <div class="filter-form">
                  <div class="mb-3">
                      <div class="date-range-container">
                          <div class="dropdown">
                              <!-- <label for="selected-dates">Selected Range:</label> -->
                              <input type="text" class="dropbtn" id="selected-dates" readonly>
                              <div class="dropdown-content">
                                  <span data-range-key="Today">Today</span>
                                  <span data-range-key="Yesterday">Yesterday</span>
                                  <span data-range-key="Last 7 Days">Last 7 Days</span>
                                  <span data-range-key="Last 30 Days">Last 30 Days</span>
                                  <span data-range-key="This Month">This Month</span>
                                  <span data-range-key="Last Month">Last Month</span>
                                  <span data-range-key="This Year">This Year</span>
                                  <span data-range-key="Last 365 Days" class="active">Last 365 Days</span>
                                  <span data-range-key="Last Year">Last Year</span>
                                  <span data-range-key="Custom Range">Custom Range</span>
                              </div>
                          </div>
                      </div>
      
                      <div id="custom-range-container" style="display: none;">
                          <label for="from-date">From:</label>
                          <input type="date" id="from-date">
                          <label for="to-date">To:</label>
                          <input type="date" id="to-date">
                          <button id="apply-custom-range">Apply</button>
                      </div>
                  </div>
                  <div id="output"></div>
                  <div class="form-group">
                      <label for="locations">Locations</label><br>
                      <select id="locations" class="selectpicker" multiple data-live-search="true">
                      </select>
                  </div>
      
                  <div class="form-group" id="form-indent_status">
                      <label for="indent_status">Indent Status</label><br>
                      <select id="indent_status" class="selectpicker" multiple data-live-search="true">
                      </select>
                  </div>
      
                  <button type="button" class="btn btn-primary mt-3" onclick="submitForm()">Apply</button>
                  <button type="button" class="btn btn-secondary mt-3" onclick="resetForm()">Reset</button>
              </div>
          </div>
      </div>`;
      break;

    case "CreateUser":
      html = `<div class="row">
              <div class="col-12">
                  <div class="filter-form">
                      <div class="mb-3">
                          <div class="date-range-container">
                              <div class="dropdown">
                                  <!-- <label for="selected-dates">Selected Range:</label> -->
                                  <input type="text" class="dropbtn" id="selected-dates" readonly>
                                  <div class="dropdown-content">
                                      <span data-range-key="All">All Users</span>
                                      <span data-range-key="Today">Today</span>
                                      <span data-range-key="Yesterday">Yesterday</span>
                                      <span data-range-key="Last 7 Days">Last 7 Days</span>
                                      <span data-range-key="Last 30 Days">Last 30 Days</span>
                                      <span data-range-key="This Month">This Month</span>
                                      <span data-range-key="Last Month">Last Month</span>
                                      <span data-range-key="This Year">This Year</span>
                                      <span data-range-key="Custom Range">Custom Range</span>
                                  </div>
                              </div>
                          </div>
          
                          <div id="custom-range-container" style="display: none;">
                              <label for="from-date">From:</label>
                              <input type="date" id="from-date">
                              <label for="to-date">To:</label>
                              <input type="date" id="to-date">
                              <button id="apply-custom-range">Apply</button>
                          </div>
                      </div>
                      <div id="output"></div>
                      <div class="form-group">
                          <label for="Select_a_Role">Select a Role</label><br>
                          <select id="Select_a_Role" class="selectpicker" multiple data-live-search="true"></select>
                      </div>
          
                      <div class="form-group" id="form-indent_status">
                          <label for="departments">Select a Department</label><br>
                          <select id="departments" class="selectpicker" multiple data-live-search="true"></select>
                      </div>
                      <div class="form-group" id="form-indent_status">
                          <label for="Status">Select a Status</label><br>
                          <select id="Status"  class="selectpicker" multiple data-live-search="true">
                            <option value="1">Active</option>
                            <option value="0">InActive</option>
                          </select>
                      </div>
          
                      <button type="button" class="btn btn-primary mt-3" onclick="submitForm()">Apply</button>
                      <button type="button" class="btn btn-secondary mt-3" onclick="resetForm()">Reset</button>
                  </div>
              </div>
          </div>`;
      break;

    case "returnsdata":
      html = `<div class="row">
                <div class="col-12">
                <div class="filter-form">
                  <div class="form-group">
                      <label for="indent_stat">Indent Status</label><br>
                      <select id="indent_stat" class="selectpicker" multiple> 
                      <option value="12" >Return</option>
                      <option value="13">Return Approved</option>
                      <option value="14">Return Completed</option>  
                      </select>
                  </div>
  
                  <button type="button" class="btn btn-primary mt-3" onclick="submitForm()">Apply</button>
                  <button type="button" class="btn btn-danger mt-3" onclick="resetForm()">Reset</button>
                  </div>
                 </div>
                </div>`;
      break;
    default:
      break;
  }

  option.append(html); // Insert the generated HTML into the .offcanvas-body element
}

//28-08-23 end
