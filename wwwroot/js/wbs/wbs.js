var js = jQuery.noConflict(true);
js(document).ready(function () {
  Add();
});

function Add() {
  var array = [];
  $.ajax({
    url: wbs_numbers,
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      data.wbs_numbers.forEach((data, index) => {
        array.push([
          index + 1,
          data.wbs_number,
          data.wbs_desc,
          data.plant_id,
          data.budget,
          data.actual,
          data.balance,
          formatDate(data.created_at),
          formatDate(data.updated_at),
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
