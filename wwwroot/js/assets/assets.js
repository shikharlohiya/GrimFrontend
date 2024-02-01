var js = jQuery.noConflict(true);
js(document).ready(function () {
  Add();
});

var assets = "https://grim.co.in:3002/api/v4/assets";
function Add() {
  var array = [];
  $.ajax({
    url: assets,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      data.assets.forEach((data, index) => {
        array.push([
          index + 1,
          data.asset_num,
          data.asset_sub_num,
          data.asset_desc,
          data.company_code,
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
    data: array,
    bAutoWidth: false,
    fixedColumns: {
      left: 0,
      right: 1,
    },
    scrollCollapse: true,
    scrollX: true,
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
