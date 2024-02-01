const data = [
  { id: 0, text: "Vue.js" },
  { id: 1, text: "React.js" },
  { id: 2, text: "Angular" },
];

// $(function () {
//   const select = $("#demo");
//   const selectedId = $("#selectedId");
//   select
//     .select2({
//       placeholder: "Select an option",
//       data: data,
//     })
//     .on("change", (event) => {
//       const selecions = select
//         .select2("data")
//         .map((element) => parseInt(element.id, 10));
//       selectedId.text(selecions.join(", "));
//     });
// });

var Itemmaterials_global_elem;
var Itemmaterials_plan_id;
var response_data;

if (User_role == 5) {
  var datas = {
    id: User_id,
  };
  var store_locations = host + path + "user_sto_store_locations?id=" + datas.id;
} else {
  var store_locations = host + path + "store_locations";
}
function getstore_locations() {
  spinner(true);
  $.ajax({
    url: store_locations,
    method: "GET",
    contentType: "application/json;charset=UTF-8",

    success: function (response) {
      if (response.success === true) {
        //console.log("response-> ", response.locations);
        response_data = response;
        showlist(response.locations);
        spinner(false);
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

getstore_locations();

function showlist(res) {
  var dropdown = $("#dropdown");
  Itemmaterials_global_elem = res[0];
  Itemmaterials_plan_id = res[0].plan_id;
  res.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.id,
      text:
        element.plant_id +
        " - " +
        element.storage_loc +
        " - " +
        element.storage_location_desc,
    });
    dropdown.append(optionElement);
  });
  showtable_data(pagenumber, sort_by, search);
}

$("#dropdown").change(function () {
  pagenumber = 1;
  Itemmaterials_plan_id = $(this).val();
  //console.log("Itemmaterials_plan_id->", Itemmaterials_plan_id);
  showtable_data(pagenumber, sort_by, search);
});

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
  // console.log("Search Value: ", searchValue);
  search = searchValue;

  // After completing the search logic, call the writer function
  showtable_data(pagenumber, sort_by, search);
}

$("#dropdown2").change(function () {
  sort_by = $(this).val();
  showtable_data(pagenumber, sort_by, search);
});

// $("#searchIndent").on("input", function (event) {
//   search = $(this).val();
//   pagenumber = 1;
//   console.log("search--->", search);
//   showtable_data(pagenumber, sort_by, search);
// });
var pagination = {
  rowsPerPage: 99,
};

function getSNo(index) {
  return index + 1 + pagination.rowsPerPage * (pagenumber - 1);
}

function showtable_data(pagenumber, sort_by, search) {
  //console.log("Itemmaterials_global_elem->>>", Itemmaterials_global_elem);
  // console.log("response_data-->", response_data);
  response_data.locations.forEach((element) => {
    if (element.id == Itemmaterials_plan_id) {
      Itemmaterials_global_elem = element;
    }
  });

  $.ajax({
    url: host + path + "special_products",
    method: "POST",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      page: pagenumber,
      npp: 100,
      sort_by: sort_by,
      search: search,
      plant: Itemmaterials_global_elem,
    }),

    success: function (response) {
      if (response.success === true) {
        //console.log("response new -> ", response);
        tableprint(response);
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

function Add_Special_Materials() {
  // Array to store added materials
  const materialsArray = [];

  // Function to update the displayed list
  function updateList() {
    const listHtml = materialsArray
      .map((material, index) => {
        return `<div class="material-item">
                ${material}
                <button class="remove-material" data-index="${index}">&times;</button>
              </div>`;
      })
      .join("");

    $(".materials-list").html(listHtml);
  }

  Swal.fire({
    title: "Add Special Materials",
    html: `<input id="materialInput" class="swal2-input" placeholder="Type Material SAP ID">
           <button id="addMaterialBtn" class="swal2-confirm swal2-styled" onclick="addMaterialToList()">Add</button>
           <div class="materials-list"></div>`,
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: () => {
      // Return the materialsArray when saving
      return materialsArray;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const specialMaterials = result.value;
      console.log("specialMaterials", specialMaterials);
      // You can handle the specialMaterials array as needed (e.g., send it to the server).
      $.ajax({
        url: host + path + "add_special_products",
        method: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          special_materials: specialMaterials,
        }),
        success: function (response) {
          if (response.success === true) {
            Swal.fire(
              "Saved!",
              "Special Materials added successfully",
              "success"
            );
          }
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error);
          //toast("warning", "Api failed. Please try again.");
        },
        complete: function (xhr, status) {
          if (status === "error" || !xhr.responseText) {
            toast("error", "Network error. Please try again later.");
          }
        },
      });
    }
  });

  // Function to handle adding material to the list
  window.addMaterialToList = function () {
    const materialInputValue = $("#materialInput").val();
    if (materialInputValue) {
      materialsArray.push(materialInputValue);
      updateList();
      $("#materialInput").val(""); // Clear the input after adding
    } else {
      Swal.showValidationMessage("Material SAP ID is required");
    }
  };

  // Event delegation to handle removing materials from the list
  $(".materials-list").on("click", ".remove-material", function () {
    const index = $(this).data("index");
    materialsArray.splice(index, 1);
    updateList();
  });
}

function tableprint(res) {
  const tableBody = $("#myTable tbody");
  tableBody.empty();
  //console.log("res", res.products.result);
  if (res.products.result != "") {
    // Create a new row element
    res.products.result.forEach((element, count) => {
      document.getElementById("notfound").innerHTML = "";
      const newRow = $("<tr>");
      //console.log(count + 1, element);

      // Create table cells (td) and add content to them
      const cell1 = $("<td>").text(getSNo(count));
      const cell2 = $("<td>").text(element.material_sap_id);
      const cell3 = $("<td>").text(element.name);
      const cell4 = $("<td>").text(element.material_type);
      const cell5 = $("<td>").text(element.material_group);
      const cell6 = $("<td>").text(element.price);
      const cell7 = $("<td>").text(element.stock);
      const cell8 = $("<td>").text(element.bag);
      const cell9 = $("<td>").text(element.base_unit);
      const cell10 = $("<td>").text(element.tech_spec);
      const cell11 = $("<td>").text(element.valution_flag);
      const cell12 = $("<td>").text(element.batch_flag);
      const cell13 = $("<td>").text(element.serial_no_flag);
      const cell14 = $("<td>").text(formatDate(element.created_at));
      const cell15 = $("<td>").text(formatDate(element.updated_at));

      // Append the cells to the row
      newRow.append(
        cell1,
        cell2,
        cell3,
        cell4,
        cell5,
        cell6,
        cell7,
        cell8,
        cell9,
        cell10,
        cell11,
        cell12,
        cell13,
        cell14,
        cell15
      );
      // Append the row to the table body
      tableBody.append(newRow);
    });

    paginationlist(
      res.products.pagination.current,
      res.products.pagination.total,
      res.products.pagination.next,
      res.products.pagination.perPage,
      "Itemmaterials"
    );
  } else {
    document.getElementById("paginationlist").innerHTML = "";
    document.getElementById("notfound").innerHTML = `
          <div class="cardimgbody">
              <div class="notfoundimg">
                  <h4>No data available</h4>
              </div>
          </div>`;
  }
}

function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}
