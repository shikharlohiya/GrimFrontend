function ServicerequestGETAPI(API, type) {
  $.ajax({
    url: API,
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      console.log(type, response);
      if (response.success === true) {
        if (type == "user_locations") {
          plant_dropdown(response.locations);
        } else if (type == "service_nos") {
          service_no_dropdown(response.service_nos);
        } else if (type == "uom_API") {
          uom_dropdown(response.unit_of_measure);
        } else if (type == "gl_accounts_API") {
          gl_accounts_dropdown(response.gl_accounts);
        } else if (type == "service_groups") {
          service_groups_dropdown(response.service_groups);
        }
      }
      if (type == "purchase_group_API") {
        purchase_group_dropdown(response);
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
      console.error("Error :->>", error);
    },
  });
}

function wbs_numbers_API(id) {
  $.ajax({
    url: wbs_numbers_plant_id_API + id,
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      if (response.success === true) {
        console.log(id, response.wbs_numbers);
        wbs_numbers_new(response);
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
      console.error("Error :->>", error);
    },
  });
}

function wbs_numbers_new(res) {
  var dropdown = $("#WBS_Number");
  dropdown.empty();
  dropdown.append(`<option value="0">WBS Number</option>`);
  if (res == "") {
    const optionElement = $("<option>", {
      value: 0,
      text: "no data",
    });
    dropdown.append(optionElement);
  } else {
    res.wbs_numbers.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.display_name,
        text: element.display_name,
      });
      dropdown.append(optionElement);
    });
  }
}

ServicerequestGETAPI(user_locations_API, "user_locations");
ServicerequestGETAPI(service_groups_API, "service_groups");
ServicerequestGETAPI(service_no_API, "service_nos");
ServicerequestGETAPI(uom_API, "uom_API");
ServicerequestGETAPI(gl_accounts_API, "gl_accounts_API");
ServicerequestGETAPI(purchase_group_API, "purchase_group_API");

var selectedId;
$("#searchPlant").change(function () {
  selectedValue = $(this).val();
  var selectedOption = $(this).find("option:selected");
  // Get the value of the data-id attribute
  selectedId = selectedOption.data("id");
  // Print the data-id value
  wbs_numbers_API(selectedValue);
});

function service_groups_dropdown(res) {
  var dropdown = $("#serviceGroup");
  dropdown.empty();
  dropdown.append(`<option value="0">Service Group</option>`);
  res.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.display_name,
      text: element.display_name,
    });
    dropdown.append(optionElement);
  });
}

function plant_dropdown(res) {
  var dropdown = $("#searchPlant");
  dropdown.empty();
  dropdown.append(`<option value="0">Search Plant</option>`);
  res.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.plant_id,
      text:
        element.plant_id +
        "-" +
        element.storage_loc +
        "-" +
        element.storage_location_desc,
      "data-id": element.id,
    });
    dropdown.append(optionElement);
  });
}

function gl_accounts_dropdown(res) {
  var dropdown = $("#glAccount");
  dropdown.empty();
  dropdown.append(`<option value="0" >G/L Account</option>`);
  res.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.display_name,
      text: element.display_name,
    });
    dropdown.append(optionElement);
  });
}

function uom_dropdown(res) {
  var dropdown = $("#UOM");
  dropdown.empty();
  dropdown.append(`<option value="0">UOM</option>`);
  res.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.uom,
      text: element.uom,
    });
    dropdown.append(optionElement);
  });
}

function purchase_group_dropdown(res) {
  var dropdown = $("#PurchaseGroup");
  dropdown.empty();
  dropdown.append(`<option value="0">Purchase Group</option>`);
  res.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.dispaly_name,
      text: element.dispaly_name,
    });
    dropdown.append(optionElement);
  });
}

function service_no_dropdown(res) {
  var dropdown = $("#serviceNo");
  dropdown.empty();
  dropdown.append(`<option value="0">Service No</option>`);
  res.forEach((element) => {
    const optionElement = $("<option>", {
      value: element.display_name,
      text: element.display_name,
    });
    dropdown.append(optionElement);
  });
}

// Add form validation logic here
function checkServicerequst() {
  // Perform your validation checks here
  var isValid = true;

  // Validate Acct PR Type Service
  var PRTypeService = $("#PRTypeService").val();
  if (PRTypeService === "") {
    $("#PRTypeService").addClass("error");
    isValid = false;
  } else {
    $("#PRTypeService").removeClass("error");
  }

  // Validate Acct Item category D-Service
  var ItemcategoryD_Service = $("#ItemcategoryD-Service").val();
  if (ItemcategoryD_Service === "") {
    $("#ItemcategoryD-Service").addClass("error");
    isValid = false;
  } else {
    $("#ItemcategoryD-Service").removeClass("error");
  }

  // Validate Acct Assignment Cart
  var acctAssignment = $("#acctAssignment").val();
  if (acctAssignment == 0) {
    $("#acctAssignment").addClass("error");
    isValid = false;
  } else {
    $("#acctAssignment").removeClass("error");
  }

  // Validate Search Plant
  var searchPlant = $("#searchPlant").val();
  if (searchPlant == 0) {
    $("#searchPlant").addClass("error");
    isValid = false;
  } else {
    $("#searchPlant").removeClass("error");
  }

  // // Validate Service Group
  // var serviceGroup = $("#serviceGroup").val();
  // if (serviceGroup == 0) {
  //   $("#serviceGroup").addClass("error");
  //   isValid = false;
  // } else {
  //   $("#serviceGroup").removeClass("error");
  // }

  // Validate Quantity
  var Quantity = $("#Quantity").val();
  if (Quantity === "") {
    $("#Quantity").addClass("error");
    isValid = false;
  } else {
    $("#Quantity").removeClass("error");
  }

  // // Validate UOM
  // var uom = $("#UOM").val();
  // if (uom == 0) {
  //   $("#UOM").addClass("error");
  //   isValid = false;
  // } else {
  //   $("#UOM").removeClass("error");
  // }

  // //Validate G/L Account
  // var glAccount = $("#glAccount").val();
  // if (glAccount == 0) {
  //   $("#glAccount").addClass("error");
  //   isValid = false;
  // } else {
  //   $("#glAccount").removeClass("error");
  // }

  // // Validate Cost Center
  // var costCenter = $("#costCenter").val();
  // if (costCenter == 0) {
  //   $("#costCenter").addClass("error");
  //   isValid = false;
  // } else {
  //   $("#costCenter").removeClass("error");
  // }

  // //Validate Purchase Group
  // var purchaseGroup = $("#PurchaseGroup").val();
  // if (purchaseGroup == 0) {
  //   $("#PurchaseGroup").addClass("error");
  //   isValid = false;
  // } else {
  //   $("#PurchaseGroup").removeClass("error");
  // }

  // //Validate WBS_Number
  if (show) {
    var WBS_Number = $("#WBS_Number").val();
    if (WBS_Number == 0 || WBS_Number == null) {
      $("#WBS_Number").addClass("error");
      isValid = false;
    } else {
      $("#WBS_Number").removeClass("error");
    }
  }

  // Validate Purchase Organization

  var purchaseOrg = $("#purchaseOrg").val();
  if (purchaseOrg == "") {
    $("#purchaseOrg").addClass("error");
    isValid = false;
  } else {
    $("#purchaseOrg").removeClass("error");
  }
  // Validate Short Text
  var ShortText = $("#ShortText").val();
  if (ShortText == "") {
    $("#ShortText").addClass("error");
    isValid = false;
  } else {
    $("#ShortText").removeClass("error");
  }
  // Validate Reason
  var Reason = $("#Reason").val();
  if (Reason == "") {
    $("#Reason").addClass("error");
    isValid = false;
  } else {
    $("#Reason").removeClass("error");
  }
  return isValid;
  // If all validation checks pass, submit the form
}

$(".WBS_Numbershow").hide();
var show = false;
$("#acctAssignment").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
  if ("P- project (With WBS)" === selectedOption.val()) {
    $(".WBS_Numbershow").show();
    show = true;
  } else {
    $(".WBS_Numbershow").hide();
    show = false;
  }
});

$("#searchPlant").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#WBS_Number").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#serviceGroup").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#UOM").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#glAccount").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#PurchaseGroup").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#costCenter").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

// $(document).ready(function () {
//   $("#submit-form").submit(function (event) {
//     event.preventDefault(); // Prevent the default form submission
//   });
// });

function save() {
  var isValid = checkServicerequst();
  console.log(isValid);
  if (isValid) {
    if (checkfile()) {
      // alert("valid");
      save_api_call();
    }
  }
}
function save_api_call() {
  // debugger;
  if ($("#WBS_Number").val() == "0") {
    var newServiceRequestObj = {
      service: {
        pr_type: $("#PRTypeService").val(),
        item_category: "D- Service",
        purchase_organization: "1000",
        acc_assg_cat: $("#acctAssignment").val(),
        plant_id: selectedId,
        service_group: $("#serviceGroup").val(),
        service_no: $("#serviceNo").val(),
        quantity: $("#Quantity").val(),
        UOM: $("#UOM").val(),
        gross_price: $("#GrossPrice").val(),
        GLAccount: $("#glAccount").val(),
        cost_center: parseInt($("#costCenter").val()),
        purchase_group: $("#PurchaseGroup").val(),
        short_text: $("#ShortText").val(),
        reason: $("#Reason").val(),
        // WBS_NO: $("#WBS_Number").val(),
        image_url: [],
      },
      user_id: User_id,
      role_id: User_role,
      status: 1,
    };
  } else {
    var newServiceRequestObj = {
      service: {
        pr_type: $("#PRTypeService").val(),
        item_category: "D- Service",
        purchase_organization: "1000",
        acc_assg_cat: $("#acctAssignment").val(),
        plant_id: selectedId,
        service_group: $("#serviceGroup").val(),
        service_no: $("#serviceNo").val(),
        quantity: $("#Quantity").val(),
        UOM: $("#UOM").val(),
        gross_price: $("#GrossPrice").val(),
        GLAccount: $("#glAccount").val(),
        cost_center: parseInt($("#costCenter").val()),
        purchase_group: $("#PurchaseGroup").val(),
        short_text: $("#ShortText").val(),
        reason: $("#Reason").val(),
        WBS_NO: $("#WBS_Number").val(),
        image_url: [],
      },
      user_id: User_id,
      role_id: User_role,
      status: 1,
    };
  }

  // console.log(newServiceRequestObj);
  // debugger;
  $.ajax({
    url: host + path + "service_creation", // Replace with the URL to submit the form data
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify(newServiceRequestObj),
    success: function (response) {
      // Handle the success response here
      console.log("Form submitted successfully!");
      toast("success", "successfully");
      setTimeout(() => location.reload(), 1500);
      // You can also display a success message to the user
    },
    error: function (xhr, status, error) {
      // Handle the error response here
      console.error("Form submission failed: " + error);
      toast("error", error);
      // You can display an error message to the user if needed
    },
  });
}

// img and PDF drag and drop

const INPUT_FILE = document.querySelector("#files");
const FILES_LIST_CONTAINER = document.querySelector("#files-list-container");
const imageFiles = [];
const pdfFiles = [];
const FILES_PREVIEW_CONTAINER = document.querySelector(
  "#files-preview-container"
);
const FILE_LIST = [];
let UPLOADED_FILES = [];

const multipleEvents = (element, eventNames, listener) => {
  const events = eventNames.split(" ");

  events.forEach((event) => {
    element.addEventListener(event, listener, false);
  });
};

const previewFiles = () => {
  FILES_LIST_CONTAINER.innerHTML = "";
  FILES_PREVIEW_CONTAINER.innerHTML = "";

  if (FILE_LIST.length > 0) {
    FILE_LIST.forEach((addedFile, index) => {
      const content = `
        <div class="form__file-container js-remove-file" data-index="${index}">
          <p class="file-name">${addedFile.name}</p>
          <button class="remove-file-btn">Remove</button>
        </div>
      `;

      FILES_LIST_CONTAINER.insertAdjacentHTML("beforeEnd", content);

      const previewElement = document.createElement("div");
      previewElement.classList.add("form__file-preview");

      if (addedFile.type === "image") {
        const img = document.createElement("img");
        img.src = addedFile.url;
        previewElement.appendChild(img);
      } else if (addedFile.type === "pdf") {
        const pdfIcon = document.createElement("span");
        pdfIcon.textContent = "PDF";
        previewElement.appendChild(pdfIcon);
      }

      const deleteButton = document.createElement("div");
      deleteButton.classList.add("file-preview-delete");
      deleteButton.textContent = "✕";
      deleteButton.addEventListener("click", () => {
        FILE_LIST.splice(index, 1);
        previewFiles();
      });

      previewElement.appendChild(deleteButton);
      FILES_PREVIEW_CONTAINER.appendChild(previewElement);
    });
  } else {
    console.log("empty");
    INPUT_FILE.value = "";
  }
};

const fileUpload = () => {
  if (FILES_LIST_CONTAINER) {
    multipleEvents(INPUT_FILE, "click dragstart dragover", () => {
      INPUT_FILE.classList.add("active"); // Corrected from INPUT_CONTAINER
    });

    multipleEvents(INPUT_FILE, "dragleave dragend drop change blur", () => {
      INPUT_FILE.classList.remove("active"); // Corrected from INPUT_CONTAINER
    });

    INPUT_FILE.addEventListener("change", () => {
      const files = [...INPUT_FILE.files];
      console.log("changed");
      files.forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        const fileName = file.name;
        const fileType = file.type.split("/")[0]; // "image" or "application"

        if (fileType !== "image" && fileType !== "application") {
          alert(file.name + " is not an image or PDF");
          console.log(file.type);
        } else {
          const uploadedFile = {
            name: fileName,
            url: fileURL,
            type: fileType === "image" ? "image" : "pdf",
          };

          FILE_LIST.push(uploadedFile);
        }
      });

      console.log("FILE_LIST->>", FILE_LIST); // final list of uploaded files

      FILE_LIST.forEach((file) => {
        if (file.type === "image") {
          imageFiles.push(file);
        } else if (file.type === "pdf") {
          pdfFiles.push(file);
        }
      });

      previewFiles();
      UPLOADED_FILES = document.querySelectorAll(".js-remove-file");
      removeFile();
    });
  }
};

const removeFile = () => {
  UPLOADED_FILES = document.querySelectorAll(".js-remove-file");

  if (UPLOADED_FILES) {
    UPLOADED_FILES.forEach((fileContainer) => {
      fileContainer
        .querySelector(".remove-file-btn")
        .addEventListener("click", function () {
          const fileIndex = fileContainer.getAttribute("data-index");

          FILE_LIST.splice(fileIndex, 1);
          previewFiles();
          removeFile();
        });
    });
  } else {
    [...INPUT_FILE.files] = [];
  }
};

fileUpload();
removeFile();

// function checkfile() {
//   var valid = false;
//   console.log("Image Files:", imageFiles);
//   console.log("PDF Files:", pdfFiles);
//   return valid;
// }

function checkfile() {
  var valid = false;
  var images = imageFiles; // Replace this with your images array
  var image_url = []; // Replace this with your image_url array

  if (images.length > 0) {
    var imageCount = images.length;
    images.forEach(function (image, index) {
      var ImageURL = image.path;
      var block = ImageURL.split(";");
      var contentType = block[0].split(":")[1];
      var realData = block[1].split(",")[1];

      var blob = b64toBlob(realData, contentType);
      blob.name = image.name;

      let formData = new FormData();
      formData.append("uImage", blob, image.name);
      formData.append("user_id", User_id);

      // Assuming you're using jQuery for the ajax call, you should use $.ajax instead of js.ajax
      $.ajax({
        url: host + path + "uploadImage",
        method: "POST",
        processData: false, // Prevent jQuery from processing the FormData object
        contentType: false, // Let the browser set the content type
        data: formData,
        success: function (response) {
          //console.log("return_items", response);
          image_url = response.Location;
          // Consider handling the success case here
          valid = true;
        },
        error: function (xhr, status, error) {
          console.error("PDF upload failed");
          console.log("Error: " + error);
          toast("warning", "PDF upload failed.");
          // Handle the error case here
          valid = false;
        },
        complete: function (xhr, status) {
          if (status === "error" || !xhr.responseText) {
            toast("error", "Network error. Please try again later.");
            // Handle the network error case here
          }
        },
      });
    });
  } else {
    if (sendPdfToS3()) {
      valid = true;
    }
  }
  return valid;
}

function sendPdfToS3() {
  var valid = true;
  if (fileSk !== undefined && fileSk.length > 0) {
    let formData = new FormData();
    formData.append("pdfFile", fileSk);
    formData.append("user_id", User_id);

    // Assuming you're using jQuery for the ajax call, you should use $.ajax instead of js.ajax
    $.ajax({
      url: host + path + "uploadFileToS3",
      method: "POST",
      processData: false, // Prevent jQuery from processing the FormData object
      contentType: false, // Let the browser set the content type
      data: formData,
      success: function (response) {
        //console.log("return_items", response);
        file_url = response.Location;
        // Consider handling the success case here
      },
      error: function (xhr, status, error) {
        console.error("PDF upload failed");
        console.log("Error: " + error);
        toast("warning", "PDF upload failed.");
        valid = false;
        // Handle the error case here
      },
      complete: function (xhr, status) {
        if (status === "error" || !xhr.responseText) {
          toast("error", "Network error. Please try again later.");
          // Handle the network error case here
        }
      },
    });
  } else {
    valid = true;
  }
  return valid;
}

// Define any additional variables used in your code
var user_details = [{ id: 1 }]; // Replace this with your user_details data
var images = []; // Replace this with your images array
var fileSk = pdfFiles; // Replace this with your fileSk variable
var file_url; // Replace this with your file_url variable

// Define b64toBlob function
function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
