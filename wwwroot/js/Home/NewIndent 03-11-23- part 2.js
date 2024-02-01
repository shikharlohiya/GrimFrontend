window.onpopstate = function (e) {
  // console.log("Page reload");
  location.reload(true);
};

// document.addEventListener("visibilitychange", function () {
//   // Check if the page is visible
//   //debugger;
//   if (document.visibilityState === "visible") {
//     // Reload the page when it becomes visible again
//     location.reload();
//   }
// });

var user_loc_response;
var plant_id = JSON.parse(localStorage.getItem("plant_id"));
// debugger;
if (plant_id) {
  var selectedValue = plant_id.id;
}

var fillters = {
  Group_of_Material: [],
  Type_of_Material: [],
};

//ajax of user_store_locations_api start
function user_loc() {
  spinner(true);
  $.ajax({
    url: user_store_locations_api,
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      //console.log(" loc js -> Data created successfully:", response);
      user_loc_response = response;
      if (plant_id == null) {
        //console.log("response-->>", user_loc_response);

        localStorage.setItem(
          "plant_id",
          JSON.stringify(user_loc_response.locations[0])
        );
        plant_id = JSON.parse(localStorage.getItem("plant_id"));

        // user_loc_response.locations.forEach((element, index) => {
        //   if (index == 1) {
        //     localStorage.setItem("plant_id", JSON.stringify(element));
        //     plant_id = JSON.parse(localStorage.getItem("plant_id"));
        //   }
        // });
      }
      dropdownlist(response);
    },
    error: function (error) {
      console.error("Error creating data on user_store_locations:->>", error);
    },
  });

  //Get material_type_sync data from Api
  $.ajax({
    // url: "https://grim.co.in:3003/api/material_type_sync",
    url: host1 + path1 + "material_type_sync",
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      //console.log(" material_type_sync GET data successfully:", response);
      set_material_type_sync_data(response);
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      setTimeout(() => {
        spinner(false);
      }, 300);
      //toast("warning", "Api failed. Please try again.");
    },
    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        setTimeout(() => {
          spinner(false);
        }, 300);
        //toast("error", "Network error. Please try again later.");
      }
    },
  });

  //Get item_group data from Api
  $.ajax({
    // url: "https://grim.co.in:3002/api/v4/item_group",
    url: host + path + "item_group",
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      //console.log(" item_group GET data successfully:", response);
      item_group(response.item_group);
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      setTimeout(() => {
        spinner(false);
      }, 300);
      //toast("warning", "Api failed. Please try again.");
    },
    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        setTimeout(() => {
          spinner(false);
        }, 300);
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}
user_loc();

function set_material_type_sync_data(data) {
  var dropdown = $("#Type_of_Material");
  //  dropdown.append(`<option value="">Type of Material</option>`);
  data.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.material_type_sap_id,
      text:
        element.material_type_sap_id +
        " - " +
        element.material_type_sap_description,
    });
    dropdown.append(optionElement);
  });
}

function item_group(data) {
  var dropdown = $("#Group_of_Material");
  // dropdown.append(`<option value="">Group of Material</option>`);
  data.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.material_group_sap_id,
      text:
        element.material_group_sap_id +
        " - " +
        element.material_group_sap_description,
    });
    dropdown.append(optionElement);
  });
  setTimeout(() => {
    onetimecall();
  }, 1000);
}

var Type_of_Material = [];
var Group_of_Material = [];

$(".fsubmit").on("click", function () {
  fillters.Type_of_Material = Type_of_Material;
  fillters.Group_of_Material = Group_of_Material;
  // Print output to console
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
  //console.log("fillters->", fillters);
  // close canvas
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
});

// Reset button click event
$(".fclear").on("click", function () {
  // Restore dropdown defaults
  $(".dropdown").dropdown();

  // Reset the output object
  fillters.location_id = [];
  fillters.indent_status = [];
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
  // Print output to console
  //console.log(fillters);
  // close canvas
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
});

//ajax of user_store_locations_api end

//dropdownlist display method start

function dropdownlist(data) {
  if (data.success === true) {
    var locations = data.locations;
    // console.log("plant_id", locations, plant_id);

    var dropdown = $("#myDropdown1");

    locations.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.id,
        text:
          element.plant_id +
          " - " +
          element.storage_loc +
          " - " +
          element.storage_location_desc,
      });
      if (element.id === plant_id.id) {
        optionElement.attr("selected", "selected");
      }
      dropdown.append(optionElement);
    });
  }
  pagenumber = 1;
  cardshow(plant_id.id, user_loc_response, sort_by, search, pagenumber);
}
//dropdownlist display method end

$("#myDropdown1").change(function () {
  var item = JSON.parse(localStorage.getItem("cart"));
  if (item) {
    if (item.length > 0) {
      Swal.fire({
        title: "Replace Cart material",
        text: "Your Cart contains materials Do you want to discard the selection and add materials from storage_location ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          pagenumber = 1;
          selectedValue = $(this).val();
          //console.log("Selected value: ", selectedValue);
          localStorage.removeItem("cart");
          cartcount();
          // Call cardshow function here on change dropdown
          // console.log("plan_id---------->>>>>>", user_loc_response);
          cardshow(
            selectedValue,
            user_loc_response,
            sort_by,
            search,
            pagenumber
          );
          localStorage.removeItem("cart");
          spinner(true);
        }
      });
    }
  } else {
    pagenumber = 1;
    selectedValue = $(this).val();
    //console.log("Selected value: ", selectedValue);
    localStorage.removeItem("cart");
    cartcount();
    // Call cardshow function here on change dropdown
    // console.log("plan_id---------->>>>>>", user_loc_response);
    cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
    localStorage.removeItem("cart");
    spinner(true);
  }
});
//dropdownlist display method end

$("#myDropdown2").change(function () {
  spinner(true);
  sort_by = $(this).val();
  //console.log("sort_by: " + selectedValue);
  // Call cardshow function here on change dropdown
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
});

// $("#searchIndent").on("input", function (event) {
//   search = $(this).val();
//   pagenumber = 1;
//   console.log("search--->", search);
//   document.getElementById("paginationlist").innerHTML = "";
//   cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
// });

// Event listener for the input field
$("#searchIndent").on("input", function (event) {
  // Clear the previous timer to avoid multiple calls during rapid typing
  clearTimeout($(this).data("timer"));

  // Get the search value entered by the user
  const searchValue = $(this).val();

  // Set a new timer to call the search function after 1 second
  $(this).data(
    "timer",
    setTimeout(() => {
      // Call the search function with the entered search value
      performSearch(searchValue);
    }, 1000)
  );
});

function performSearch(searchValue) {
  // Set the necessary variables and call your search logic here
  pagenumber = 1;

  // For demonstration purposes, we'll just log the search value to the console
  //console.log("Search Value: ", searchValue);
  search = searchValue;

  // After completing the search logic, call the writer function
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
}
//cardshow function and product APi call hear

function cardshow(plan_id, user_loc_response, sort_by, search, pagenumber) {
  // debugger;
  document.getElementById("cardbody").innerHTML = "";
  // console.log("plan_id", plan_id);
  user_loc_response.locations.forEach((element) => {
    if (element.id == plan_id) {
      // alert("found");
      plant = element;
      localStorage.setItem("plant_id", JSON.stringify(plant));
    }
  });
  if (plant == undefined) {
    plant = user_loc_response.locations[0];
  }

  //payload data
  var Payload = {
    page: pagenumber,
    npp: 12,
    sort_by: sort_by,
    search: search,
    material_group_id: fillters.Group_of_Material,
    material_type_id: fillters.Type_of_Material,
    plant: plant,
  };

  if (search != "") {
    const NewPayload = {
      page: pagenumber,
      npp: 12,
      sort_by: sort_by,
      search: search,
      material_group_id: [],
      material_type_id: [],
      plant: plant,
      // search_type: "all_plants",
    };
    cardshow2(plan_id, user_loc_response, sort_by, search, pagenumber);
    Payload = NewPayload;
  }
  // Post products_APi call hear
  $.ajax({
    url: Product_API,
    type: "POST",
    data: JSON.stringify(Payload),
    contentType: "application/json",
    success: function (response) {
      // console.log(" Home js -> Data created successfully:", response);
      products_result = response.products.result;
      products_pagination = response.products.pagination;
      //console.log("result ajax in Home js ->>>>>", response);
      homepagecards(products_result, products_pagination);
      spinner(false);
    },
    error: function (error) {
      console.error("Error creating data:", error);
      spinner(false);
    },
  });
}

function cardshow2(plan_id, user_loc_response, sort_by, search, pagenumber) {
  // debugger;
  document.getElementById("cardbody").innerHTML = "";
  // console.log("plan_id", plan_id);
  user_loc_response.locations.forEach((element) => {
    if (element.id == plan_id) {
      // alert("found");
      plant = element;
      localStorage.setItem("plant_id", JSON.stringify(plant));
    }
  });
  if (plant == undefined) {
    plant = user_loc_response.locations[0];
  }

  //payload data
  var Payload = {
    page: pagenumber,
    npp: 12,
    sort_by: sort_by,
    search: search,
    material_group_id: fillters.Group_of_Material,
    material_type_id: fillters.Type_of_Material,
    plant: plant,
  };

  if (search != "") {
    const NewPayload = {
      page: pagenumber,
      npp: 100,
      sort_by: sort_by,
      search: search,
      material_group_id: [],
      material_type_id: [],
      plant: plant,
      search_type: "all_plants",
    };
    Payload = NewPayload;
  }
  // Post products_APi call hear
  $.ajax({
    url: Product_API,
    type: "POST",
    data: JSON.stringify(Payload),
    contentType: "application/json",
    success: function (response) {
      // console.log(" Home js -> Data created successfully:", response);
      products_result = response.products.result;
      products_pagination = response.products.pagination;
      //console.log("result ajax in Home js ->>>>>", response);
      homepagecards(products_result, products_pagination);
      spinner(false);
    },
    error: function (error) {
      console.error("Error creating data:", error);
      spinner(false);
    },
  });
}
var instock;
var cart = JSON.parse(localStorage.getItem("cart"));

let loadedItems = 0;
const itemsPerPage = 100;
let isLoading = false;
//home page cards function
var products_result;
var E_stock;
// new code
var check_plant_not_same = false;
var Index = 0;
function renderProductCard(element) {
  //console.log("tbody_", element);
  // debugger;
  let labcolor = "";
  if (element.valution_type === "NEW") {
    labcolor = "bg-blue";
  } else if (element.valution_type === "REFURBISH") {
    labcolor = "bg-yellow";
  } else if (element.valution_type === "VEH NEW") {
    labcolor = "bg-yellow";
  }
  E_stock = element.stock - element?.bag;
  const instock =
    E_stock === 0
      ? "<span class='error'> Stock not available</span>"
      : "<span> In Stock</span>";

  const cartquan =
    cart?.find((cartobj) => cartobj.id === element.id)?.quantity || 0;
  const totelstock = Math.max(E_stock - cartquan, 0).toFixed(2);
  var tech_spec = "";
  if (element.tech_spec != "" && element.tech_spec != null) {
    tech_spec = `<p><span>Technical Specification</span>: ${element.product.tech_spec}</p>`;
  }
  if (check_plant_not_same) {
    return `
      <div class="col-sm-6 col-md-6 col-lg-3 card-cut-col">
        <div class="product-card">
          <img class="product-img" src="${element.image_url}">
          <div class="product-text">
            <p>${element.name}</p>
            <div class="product-title">
              <b>Store Location: ${element.plant_id}-${element.storage_loc}-${element.storage_loc_desc}</b>
              <span class="${labcolor}">${element.valution_type}</span>
            </div>
            <p><span>material Id</span>: ${element.material_sap_id}</p>
            <p><span>material Type</span>: ${element.material_type} </p>
            <p><span>material Group</span>:  ${element.material_group}</p>
            <p><span>Base Unit</span>: ${element.base_unit} </p>
            ${tech_spec}
          </div>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="col-sm-6 col-md-6 col-lg-3 card-cut-col">
        <div class="product-card">
          <img class="product-img" src="${element.image_url}">
          <div class="product-text">
            <div class="product-title">
              <h6><b>${element.name}</b></h6>
              <span class="${labcolor}">${element.valution_type}</span>
            </div>
            <p><span>material Id</span>: ${element.material_sap_id}</p>
            <p><span>material Type</span>: ${element.material_type} </p>
            <p><span>material Group</span>:  ${element.material_group}</p>
            <p><span>Base Unit</span>: ${element.base_unit} </p>
             ${tech_spec}
          </div>
          <div class="product-cart">
            <div class="stockcountbox">
              <input class="stockcount" type="text" value="${totelstock}" disabled />${instock}
            </div>
            <div>
              <div class="wrap">
                <button type="button" class="sub" data-index="${element.id}"><span class="material-symbols-rounded">remove</span></button>
                <input class="count" type="number" step="0.1" data-val="${E_stock}"  data-index="${element.id}" value="${cartquan}" min="1" max="1000" />
                <button type="button" class="add" data-index="${element.id}"><span class="material-symbols-rounded">add</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  Index++;
}

function renderProductCards(products) {
  // debugger;
  const cardBody = document.getElementById("cardbody");
  cardBody.innerHTML = "";
  // debugger;
  if (check_plant_not_same) {
    cardBody.innerHTML += `<div style='display: flex;flex-direction: row;justify-content: center;align-items: center;'>
      <b><h3>Material '${search}' Available in Following Storage Locations</h3></b>
    </div>`;
  }
  cardBody.innerHTML += products.map(renderProductCard).join("");
}

function homepagecards(products_result, products_pagination) {
  plant_id = JSON.parse(localStorage.getItem("plant_id"));
  //debugger;
  const cardBody = document.getElementById("cardbody");
  const paginationList = document.getElementById("paginationlist");

  cardBody.innerHTML = "";
  paginationList.innerHTML = "";

  if (products_result.length == 0) {
    cardBody.innerHTML += `<div class="cardimgbody">
      <div class="notfoundimg">
        <img src="../images/no_results_found.ff4ae51d.jpeg">
      </div>
    </div>`;
    return;
  }
  // debugger;

  const filteredProducts = products_result.filter(
    (obj) =>
      obj.storage_loc === plant_id.storage_loc &&
      obj.plant_id === plant_id.plant_id
    // obj.storage_loc_desc === plant_id.storage_location_desc
  );

  if (filteredProducts.length === 0) {
    // debugger;
    check_plant_not_same = true;
    // cardBody.innerHTML += `<div style='display: flex;flex-direction: row;justify-content: center;align-items: center;'>
    //   <b><h3>Material '${search}' Available in Following Storage Locations</h3></b>
    // </div>`;
    //loadMoreItems(products_result);
    renderProductCards(products_result);
  } else {
    check_plant_not_same = false;
    if (filteredProducts.length > 0) {
      renderProductCards(filteredProducts.slice(0, 12));
      paginationlist(
        products_pagination.current,
        products_pagination.total,
        products_pagination.next,
        products_pagination.perPage,
        "NewIndent"
      );
    } else {
      cardBody.innerHTML += `<div class="cardimgbody">
        <div class="notfoundimg">
          <img src="../images/no_results_found.ff4ae51d.jpeg">
        </div>
      </div>`;
    }
  }
}

function loadMoreItems(products_result) {
  if (!isLoading && loadedItems < products_result.length) {
    isLoading = true;
    const itemsToLoad = Math.min(
      itemsPerPage,
      products_result.length - loadedItems
    );
    const items = products_result.slice(loadedItems, loadedItems + itemsToLoad);

    renderProductCards(items);

    loadedItems += itemsToLoad;
    isLoading = false;
  }
}

// Attach scroll event listener to trigger loading more items
$(window).on("scroll", function () {
  // console.log("scrolled");
  const scrollPosition = $(window).scrollTop();
  const windowHeight = $(window).height();
  const documentHeight = $(document).height();

  if (
    scrollPosition + windowHeight >= documentHeight - 200 &&
    loadedItems < products_result.length
  ) {
    loadMoreItems(products_result);
  }
});

// end hear

// add click btn
// Define the stock variable

// input on val
$(document).on("input", ".count", function () {
  var enteredValue = $(this).val();
  var stock = $(this).data("val");
  var index = $(this).data("index");
  let val = $(this)
    .parent()
    .parent()
    .siblings(".stockcountbox")
    .find(".stockcount");
  // Check if the entered value is a number
  if ($.isNumeric(enteredValue)) {
    if (enteredValue === "0" || enteredValue.trim() === "") {
      // Set default value to 1
      $(this).val("0");
      enteredValue = 0; // Update the enteredValue variable
    }

    // Check if enteredValue is less than stock
    if (parseInt(enteredValue) > stock) {
      alert("Entered value is less than stock.");
      stock - enteredValue >= 0 ? val.val(stock - enteredValue) : val.val(0);
    } else {
      //console.log("Number entered:", enteredValue);
      stock - enteredValue >= 0 ? val.val(stock - enteredValue) : val.val(0);
    }
    const data = products_result.filter((obj) => obj.id === index);
    var temp = {
      id: data[0].id,
      name: data[0].name,
      price: data[0].price,
      stock: data[0].stock,
      i_stock: 1,
      bag: data[0].bag,
      quantity: enteredValue,
      plant_id: data[0].plant_id,
      status: "Pending",
      p_location: "",
      p_remarks: "", //?
      wbs_element_number: "WBS123456",
      sap_id: "SAP123456", //?
      base_unit: data[0].base_unit,
      valution_type: data[0].valution_type,
    };
    var subtocart = JSON.parse(localStorage.getItem("cart"));
    if (!subtocart) {
      subtocart = [];
    }
    if (temp.quantity == 0) {
      subtocart.forEach((element, tempindex) => {
        if (element.id == data[0].id) {
          subtocart.splice(tempindex, 1);
        }
      });
    } else {
      subtocart.push(temp);
    }
    var result_added = removeDuplicatesAndUpdate(subtocart);

    localStorage.setItem("cart", JSON.stringify(result_added));
    cartcount();
    toast("success", "Prodect added into the cart successfuly");
  }
});

// add click btn
$(document).on("click", ".add", function () {
  var index = $(this).data("index");
  // console.log("products_result[index]->", products_result[index]);

  var th = $(this).closest(".wrap").find(".count");
  var avaItems = $(this)
    .parent()
    .parent()
    .siblings(".stockcountbox")
    .find(".stockcount")
    .val();
  //pop show--->>>>   PR/STO Request.   ---> Material Stock is not available. Please approve to raised PR/STO request.
  if (avaItems == 0) {
    $(this)
      .parent()
      .parent()
      .siblings(".stockcountbox")
      .find("span")
      .addClass("error")
      .text("Stock not available");

    // showModal(
    //   "Material Stock is not available. Please approve to raised PR/STO request.",
    //   "PR/STO Request.",
    //   "PR_raised",
    //   "",
    //   "bg-blue"
    // );
    Swal.fire({
      title: "PR/STO Request.",
      text: "Material Stock is not available. Please approve to raised PR/STO request.",
      icon: "info",
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      confirmButtonText: "Apporve",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // debugger;
        th.val(+th.val() + 1);
        add_to_cart();
      }
    });
  } else {
    avaItems--;
    $(this)
      .parent()
      .parent()
      .siblings(".stockcountbox")
      .find(".stockcount")
      .val(avaItems);
    //console.log("input(+)--->", avaItems);
    th.val(+th.val() + 1);
    add_to_cart();
    toast("success", "Prodect added into the cart successfuly");
  }

  function add_to_cart() {
    const data = products_result.filter((obj) => obj.id === index);
    // debugger;
    var temp = {
      id: data[0].id,
      name: data[0].name,
      price: data[0].price,
      stock: data[0].stock,
      i_stock: 1,
      bag: data[0].bag,
      quantity: th.val(),
      plant_id: data[0].plant_id,
      status: "Pending",
      p_location: "",
      p_remarks: "", //?
      wbs_element_number: "WBS123456",
      sap_id: "SAP123456", //?
      base_unit: data[0].base_unit,
      valution_type: data[0].valution_type,
    };
    //debugger;
    var addtocart = JSON.parse(localStorage.getItem("cart"));
    if (!addtocart) {
      addtocart = [];
    }
    addtocart.push(temp);
    var result_added = removeDuplicatesAndUpdate(addtocart);

    //store data
    localStorage.setItem("cart", JSON.stringify(result_added));
    cartcount();
  }
});

//  minus click btn
$(document).on("click", ".sub", function () {
  // debugger;
  var index = $(this).data("index");
  var data = products_result.filter((obj) => obj.id === index);
  // console.log("products_result[index]->", products_result[index]);
  var th = $(this).closest(".wrap").find(".count");

  var stockcount = $(this)
    .parent()
    .parent()
    .siblings(".stockcountbox")
    .find(".stockcount")
    .val();
  var value_get = $(this).siblings(".count").val();

  if (
    value_get == 1 ||
    Math.round(value_get) == 0 ||
    Math.round(value_get) == 1
  ) {
    Swal.fire({
      title: "Warning",
      text: "Do you really want to remove ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (th.val() > 0) {
          if (Math.round(th.val()) == 1 || Math.round(th.val()) == 0) {
            th.val(1 - 1);
          } else {
            th.val(+th.val() - 1);
          }
          if (data[0].stock != stockcount) {
            // debugger;
            stockcount = data[0].stock;
            $(this)
              .parent()
              .parent()
              .siblings(".stockcountbox")
              .find("span")
              .removeClass("error")
              .text("In Stock");
          }
        }
        // debugger;
        $(this)
          .parent()
          .parent()
          .siblings(".stockcountbox")
          .find(".stockcount")
          .val(stockcount);

        var temp = {
          id: data[0].id,
          name: data[0].name,
          price: data[0].price,
          stock: data[0].stock,
          i_stock: 1,
          bag: data[0].bag,
          quantity: th.val(),
          plant_id: data[0].plant_id,
          status: "Pending",
          p_location: "",
          p_remarks: "", //?
          wbs_element_number: "WBS123456",
          sap_id: "SAP123456", //?
          base_unit: data[0].base_unit,
          valution_type: data[0].valution_type,
        };

        var subtocart = JSON.parse(localStorage.getItem("cart"));
        if (temp.quantity == 0) {
          subtocart.forEach((element, tempindex) => {
            if (element.id == data[0].id) {
              subtocart.splice(tempindex, 1);
            }
          });
        } else {
          subtocart.push(temp);
        }
        var result_added = removeDuplicatesAndUpdate(subtocart);

        localStorage.setItem("cart", JSON.stringify(result_added));

        // console.log("input(-)--->", stockcount);
        // console.log("th(-)--->", th.val());
        cartcount();
      }
    });
  } else {
    if (th.val() > 0) {
      if (Math.round(th.val()) == 1 || Math.round(th.val()) == 0) {
        th.val(1 - 1);
      } else {
        th.val(+th.val() - 1);
      }
      // th.val(+th.val() - 1);
      if (data[0].stock != stockcount) {
        stockcount++;
        $(this)
          .parent()
          .parent()
          .siblings(".stockcountbox")
          .find("span")
          .removeClass("error")
          .text("In Stock");
      }
    }
    $(this)
      .parent()
      .parent()
      .siblings(".stockcountbox")
      .find(".stockcount")
      .val(stockcount);
    var temp = {
      id: data[0].id,
      name: data[0].name,
      price: data[0].price,
      stock: data[0].stock,
      i_stock: 1,
      bag: data[0].bag,
      quantity: th.val(),
      plant_id: data[0].plant_id,
      status: "Pending",
      p_location: "",
      p_remarks: "", //?
      wbs_element_number: "WBS123456",
      sap_id: "SAP123456", //?
      base_unit: data[0].base_unit,
      valution_type: data[0].valution_type,
    };

    var subtocart = JSON.parse(localStorage.getItem("cart"));
    if (temp.quantity == 0) {
      subtocart.forEach((element, tempindex) => {
        if (element.id == data[0].id) {
          subtocart.splice(tempindex, 1);
        }
      });
    } else {
      subtocart.push(temp);
    }
    var result_added = removeDuplicatesAndUpdate(subtocart);

    localStorage.setItem("cart", JSON.stringify(result_added));

    // console.log("input(-)--->", stockcount);
    // console.log("th(-)--->", th.val());
    cartcount();
  }
});

// });

const arrows = document.querySelectorAll(".arrow");
arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    const arrowParent = e.target.closest(".arrow").parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
});

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

// Helper function to compare two objects for equality
function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// new code

var fillters = {
  Group_of_Material: [],
  Type_of_Material: [],
};

offcanvas("NewIndent");

function submitForm() {
  const dropdown1Values = $("#Type_of_Material").val();
  const dropdown2Values = $("#Group_of_Material").val();
  fillters.Type_of_Material = dropdown1Values;
  fillters.Group_of_Material = dropdown2Values;
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
  //console.log(fillters);
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
}

function onetimecall() {
  $("#Type_of_Material").selectpicker("deselectAll");
  $("#Group_of_Material").selectpicker("deselectAll");
  $("#Type_of_Material").selectpicker("refresh");
  $("#Group_of_Material").selectpicker("refresh");
}

function resetForm() {
  $("#Type_of_Material").selectpicker("deselectAll");
  $("#Group_of_Material").selectpicker("deselectAll");
  $("#Type_of_Material").selectpicker("refresh");
  $("#Group_of_Material").selectpicker("refresh");
  fillters.Type_of_Material = [];
  fillters.Group_of_Material = [];
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
  let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
  closeCanvas.click();
}
