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
        console.log("response-->>", user_loc_response);

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
    url: "https://grim.co.in:3003/api/material_type_sync",
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      console.log(" material_type_sync GET data successfully:", response);
      set_material_type_sync_data(response);
    },
    error: function (error) {
      console.error("Error data :->>", error);
    },
  });

  //Get item_group data from Api
  $.ajax({
    url: "https://grim.co.in:3002/api/v4/item_group",
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      console.log(" item_group GET data successfully:", response);
      item_group(response.item_group);
    },
    error: function (error) {
      console.error("Error creating data on item_group:->>", error);
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
  console.log("fillters->", fillters);
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
          console.log("Selected value: ", selectedValue);
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
    console.log("Selected value: ", selectedValue);
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
  console.log("sort_by: " + selectedValue);
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
  console.log("Search Value: ", searchValue);
  search = searchValue;

  // After completing the search logic, call the writer function
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
}
//cardshow function and product APi call hear

function cardshow(plan_id, user_loc_response, sort_by, search, pagenumber) {
  debugger;
  document.getElementById("cardbody").innerHTML = "";
  console.log("plan_id", plan_id);
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
      console.log("result ajax in Home js ->>>>>", response);
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
var products_result;
//home page cards function

function homepagecards(products_result, products_pagination) {
  products_result = products_result;
  //console.log("products_result", products_result);
  var plant_id = JSON.parse(localStorage.getItem("plant_id"));
  document.getElementById("cardbody").innerHTML = "";
  document.getElementById("paginationlist").innerHTML = "";

  // console.log(
  //   "products_result->",
  //   products_result[0].plant_id,
  //   "plant_id",
  //   plant_id.plant_id
  // );

  // Count the number of properties in the pagination object
  const totalCount = Object.keys(products_pagination).length;

  console.log("Total Count of products_pagination:", totalCount);
  if (products_result != "") {
    // const desiredStorageLoc = "CGEN";
    // const desiredPlantId = "NC01";
    // const desiredStorageLocDesc = "Central Gen Stor";

    // products_result = products_result.filter(
    //   (obj) =>
    //     obj.storage_loc === desiredStorageLoc &&
    //     obj.plant_id === desiredPlantId &&
    //     obj.storage_loc_desc === desiredStorageLocDesc
    // );
    if (products_result.length < 13000000) {
      // $("#myDropdown1").attr("disabled", false);
      // $("#myDropdown2").attr("disabled", false);
      if (products_result.length > 0) {
        debugger;
        // Use map to filter objects by plant_id
        products_result = products_result.slice(0, 12);
        products_result.forEach((element, Index) => {
          // check valution_type
          if (element.valution_type != "") {
            var labcolor;
            if (element.valution_type == "NEW") {
              labcolor = "bg-blue";
            } else if (element.valution_type == "REFURBISH") {
              labcolor = "bg-yellow";
            } else if (element.valution_type == "VEH NEW") {
              labcolor = "bg-orange";
            }
          }
          //check stock
          if (element.stock == 0) {
            instock = "<span class='error'> Stock not available</span>";
          } else {
            instock = "<span> In Stock</span>";
          }

          var cartquan = 0;
          var countstock = 0;
          // cartobj has 2 val or more
          if (cart != null) {
            cart.forEach((cartobj) => {
              if (cartobj.id == element.id) {
                cartquan = cartobj.quantity;
                cartobj.stock;
              }
            });
          }
          var totelstock =
            element.stock - cartquan >= 0 ? element.stock - cartquan : 0;

          // card detail store in body
          document.getElementById("cardbody").innerHTML += `
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
                </div>
                <div class="product-cart">
                  <div class="stockcountbox">
                    <input class="stockcount" type="text" value="${totelstock}" disabled />${instock}
                  </div>
                  <div>
                    <div class="wrap">
                      <button type="button" class="sub" data-index="${Index}"><span class="material-symbols-rounded">remove</span></button>
                      <input class="count" type="text" data-val="${element.stock}"  data-index="${Index}" value="${cartquan}" min="1" max="1000" />
                      <button type="button" class="add" data-index="${Index}"><span class="material-symbols-rounded">add</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
        paginationlist(
          products_pagination.current,
          products_pagination.total,
          products_pagination.next,
          products_pagination.perPage,
          "NewIndent"
        );
      } else {
        document.getElementById(
          "cardbody"
        ).innerHTML += `<div class="cardimgbody">
                    <div class="notfoundimg">
                       <img src="../images/no_results_found.ff4ae51d.jpeg">
                    </div>
                  </div>`;
        document.getElementById("paginationlist").innerHTML = "";
      }
    } else {
      if (products_result.length > 0) {
        // alert("call");
        document.getElementById("cardbody").innerHTML +=
          "<div style='display: flex;flex-direction: row;justify-content: center;align-items: center;'> <b><h3>" +
          "Material '" +
          search +
          "' Available in Following Storage Locations" +
          " </h3></b></div>";
        console.log("products_result->", products_result);
        //new code

        // Initial load of the first batch of items
        loadMoreItems(products_result);
      } else {
        document.getElementById(
          "cardbody"
        ).innerHTML += `<div class="cardimgbod  y">
                    <div class="notfoundimg">
                      <img src="../images/no_results_found.ff4ae51d.jpeg">
                    </div>
                  </div>`;
        document.getElementById("paginationlist").innerHTML = "";
      }
    }
  } else {
    document.getElementById("cardbody").innerHTML += `<div class="cardimgbody">
              <div class="notfoundimg">
                <img src="../images/no_results_found.ff4ae51d.jpeg">
              </div>
            </div>`;
    document.getElementById("paginationlist").innerHTML = "";
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
    // load data
    items.forEach((element, Index) => {
      // check valution_type
      if (element.valution_type != "") {
        var labcolor;
        if (element.valution_type == "NEW") {
          labcolor = "bg-blue";
        } else if (element.valution_type == "REFURBISH") {
          labcolor = "bg-yellow";
        }
      }
      //check stock
      if (element.stock == 0) {
        instock = "<span class='error'> Stock not available</span>";
      } else {
        instock = "<span> In Stock</span>";
      }

      var cartquan = 0;
      var countstock = 0;
      // cartobj has 2 val or more
      if (cart != null) {
        cart.forEach((cartobj) => {
          if (cartobj.id == element.id) {
            cartquan = cartobj.quantity;
            cartobj.stock;
          }
        });
      }
      var totelstock =
        element.stock - cartquan >= 0 ? element.stock - cartquan : 0;

      // card detail store in body
      document.getElementById("cardbody").innerHTML += `
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
            </div>
          </div>
        </div>
      `;
    });
    // document.getElementById("cardbody").innerHTML +=
    //   "<button id='paginationButton'>show more</button>";
    //homepagecards(items, null); // Assuming homepagecards function can handle pagination as well
    // $("#paginationButton").on("click", function () {
    //   loadMoreItems(products_result);
    // });
    loadedItems += itemsToLoad;
    isLoading = false;
  }
}
//debugger;
// Attach scroll event listener to trigger loading more items
$(window).on("scroll", function () {
  debugger;
  const scrollPosition = $(window).scrollTop();
  const windowHeight = $(window).height();
  const documentHeight = $(document).height();
  console.log("call");
  // Load more items when the user is near the bottom of the page and there are more items to load
  if (
    scrollPosition + windowHeight >= documentHeight - 200 &&
    loadedItems < products_result.length
  ) {
    loadMoreItems(products_result);
  }
});
// $(document).ready(function () {

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
      console.log("Number entered:", enteredValue);
      stock - enteredValue >= 0 ? val.val(stock - enteredValue) : val.val(0);
    }
    var temp = {
      id: products_result[index].id,
      name: products_result[index].name,
      price: products_result[index].price,
      stock: products_result[index].stock,
      i_stock: 1,
      bag: products_result[index].bag,
      quantity: parseInt(enteredValue),
      plant_id: products_result[index].plant_id,
      status: "Pending",
      p_location: "",
      p_remarks: "",
      //?
      wbs_element_number: "WBS123456",
      sap_id: "SAP123456",
      //?
      base_unit: products_result[index].base_unit,
      valution_type: products_result[index].valution_type,
    };
    var subtocart = JSON.parse(localStorage.getItem("cart"));
    if (temp.quantity == 0) {
      subtocart.forEach((element, tempindex) => {
        if (element.id == products_result[index].id) {
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

    showModal(
      "Material Stock is not available. Please approve to raised PR/STO request.",
      "PR/STO Request.",
      "PR_raised",
      "",
      "bg-blue"
    );
    th.val(1);
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
    toast("success", "Prodect added into the cart successfuly");
  }

  var temp = {
    id: products_result[index].id,
    name: products_result[index].name,
    price: products_result[index].price,
    stock: products_result[index].stock,
    i_stock: 1,
    bag: products_result[index].bag,
    quantity: parseInt(th.val()),
    plant_id: products_result[index].plant_id,
    status: "Pending",
    p_location: "",
    p_remarks: "", //?
    wbs_element_number: "WBS123456",
    sap_id: "SAP123456", //?
    base_unit: products_result[index].base_unit,
    valution_type: products_result[index].valution_type,
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
});

//  minus click btn
$(document).on("click", ".sub", function () {
  debugger;
  var index = $(this).data("index");
  // console.log("products_result[index]->", products_result[index]);

  var th = $(this).closest(".wrap").find(".count");

  var stockcount = $(this)
    .parent()
    .parent()
    .siblings(".stockcountbox")
    .find(".stockcount")
    .val();

  if (stockcount == 1) {
    Swal.fire({
      title: "Warning",
      text: "Do you really want to remove ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (th.val() > 0) {
          th.val(+th.val() - 1);
          if (products_result[index].stock != stockcount) {
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
          id: products_result[index].id,
          name: products_result[index].name,
          price: products_result[index].price,
          stock: products_result[index].stock,
          i_stock: 1,
          bag: products_result[index].bag,
          quantity: parseInt(th.val()),
          plant_id: products_result[index].plant_id,
          status: "Pending",
          p_location: "",
          p_remarks: "", //?
          wbs_element_number: "WBS123456",
          sap_id: "SAP123456", //?
          base_unit: products_result[index].base_unit,
          valution_type: products_result[index].valution_type,
        };

        var subtocart = JSON.parse(localStorage.getItem("cart"));
        if (temp.quantity == 0) {
          subtocart.forEach((element, tempindex) => {
            if (element.id == products_result[index].id) {
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
      th.val(+th.val() - 1);
      if (products_result[index].stock != stockcount) {
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
      id: products_result[index].id,
      name: products_result[index].name,
      price: products_result[index].price,
      stock: products_result[index].stock,
      i_stock: 1,
      bag: products_result[index].bag,
      quantity: parseInt(th.val()),
      plant_id: products_result[index].plant_id,
      status: "Pending",
      p_location: "",
      p_remarks: "", //?
      wbs_element_number: "WBS123456",
      sap_id: "SAP123456", //?
      base_unit: products_result[index].base_unit,
      valution_type: products_result[index].valution_type,
    };

    var subtocart = JSON.parse(localStorage.getItem("cart"));
    if (temp.quantity == 0) {
      subtocart.forEach((element, tempindex) => {
        if (element.id == products_result[index].id) {
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
  console.log(fillters);
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
