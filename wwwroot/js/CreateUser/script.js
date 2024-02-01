$(document).ready(function () {
    function updateStatus(label, result) {
      if (!result.length) {
        label.html('Select Options');
      }
    }
  
    $('.dropdown').each(function () {
      var $list = $(this).find('.dropdown-list'),
        $label = $(this).find('.dropdown-label'),
        $checkAll = $(this).find('.check-all'),
        $inputs = $(this).find('.check'),
        defaultChecked = $(this).find('input[type=checkbox]:checked'),
        selectedValues = [];
  
      updateStatus($label, selectedValues);
  
      if (defaultChecked.length) {
        defaultChecked.each(function () {
          selectedValues.push($(this).next().text());
          $label.html(selectedValues.join(", "));
        });
      }
  
      function getSelectedValues() {
        return selectedValues;
      }
  
      function setSelectedValues(values) {
        selectedValues = values;
        $inputs.prop('checked', false);
        values.forEach(function (value) {
          $inputs.filter(function () {
            return $(this).next().text() === value;
          }).prop('checked', true);
        });
        $label.html(values.join(", "));
        updateStatus($label, selectedValues);
      }
  
      $label.on('click', function () {
        $(this).toggleClass('open');
      });
  
      $checkAll.on('change', function () {
        var checked = $(this).is(':checked');
        var checkedText = $(this).next().text();
        selectedValues = [];
        if (checked) {
          selectedValues.push(checkedText);
          $label.html(selectedValues);
          $inputs.prop('checked', false);
        } else {
          $label.html(selectedValues);
        }
        updateStatus($label, selectedValues);
      });
  
      $inputs.on('change', function () {
        var checked = $(this).is(':checked');
        var checkedText = $(this).next().text();
        if ($checkAll.is(':checked')) {
          selectedValues = [];
        }
        if (checked) {
          selectedValues.push(checkedText);
          $label.html(selectedValues.join(", "));
          $checkAll.prop('checked', false);
        } else {
          let index = selectedValues.indexOf(checkedText);
          if (index >= 0) {
            selectedValues.splice(index, 1);
          }
          $label.html(selectedValues.join(", "));
        }
        updateStatus($label, selectedValues);
      });
  
      $(document).on('click touchstart', function (e) {
        if (!$(e.target).closest('.dropdown').length) {
          $('.dropdown').removeClass('open');
        }
      });
  
      // Public methods for getting and setting selected values
      $(this).data('getSelectedValues', getSelectedValues);
      $(this).data('setSelectedValues', setSelectedValues);
    });
  });
  
  // Example usage:
  
  // Get selected values
  var selectedValues1 = $('#dropdown1').data('getSelectedValues');
  console.log(selectedValues1);
  
  // Set selected values
  $('#dropdown2').data('setSelectedValues')(['Selection 2', 'Selection 4']);
  