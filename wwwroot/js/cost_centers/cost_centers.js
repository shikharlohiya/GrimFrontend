var js = jQuery.noConflict(true);
js(document).ready(function () {
  Add();
});

// var cost_centers = "https://grim.co.in:3002/api/v4/cost_centers";
function Add() {
  var array = [];
  $.ajax({
    url: host + path + "cost_centers",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      data.cost_centers.forEach((data, index) => {
        array.push([
          index + 1,
          data.controlling_area,
          data.cost_center,
          data.plant,
          data.valid_to,
          data.description,
          formatDate(data.created_at),
        ]);
      });
      //console.log("array->", array);
    },
    error: function (err) {
      alert(err);
    },
  });

  js("#Userlist").DataTable({
    bAutoWidth: false,
    fixedColumns: {
      left: 0,
      right: 1,
    },
    scrollCollapse: true,
    scrollX: true,
    data: array,
    dom: "Bfrtip",
    // buttons: ["copy", "csv", "excel", "pdf", "print"],
    buttons: ["excel"],
    pageLength: 25,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, "Todos"],
    ],
  });
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
