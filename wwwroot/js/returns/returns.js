var js = jQuery.noConflict(true);
js(document).ready(function () {
  Add();
});
function Add() {
  var array = [];
  var objBody;
  var empObj = {
    user_id: Logindata.user[0].id,
    status: [12],
    npp: 10,
  };

  $.ajax({
    url: return_items_API,
    data: JSON.stringify(empObj),
    type: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      //$.each(data.result, function (i, item) {
      // var editbtn = "<a class='btn btn-primary' value='Save'>Edit</a>";
      // var hdn = "<input type='hidden' value=" + item.id + "/>";
      // var action = editbtn + " " + hdn;
      //array.push([item.id, item.first_name, item.WBS_NO, item.total]);
      //});
      console.log("return_items_API res->", data);
      //console.log("array->", array);
    },
    error: function (err) {
      alert(err);
    },
  });
  js("#example").DataTable({
    data: array,
  });
}
