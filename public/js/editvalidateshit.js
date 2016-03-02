var inputs = $("#name, #city, #state, #cuisine, #description");

var validateInputs = function(inputs) {
  var validForm = true;
  inputs.each(function(index) {
    var input = $(this);
    if (!input.val() || (input.type === "radio" && !input.is(':checked'))) {
      $("#editclickme").attr("disabled", "disabled");
      validForm = false;
    }
  });
  return validForm;
}

inputs.change(function() {
  if (validateInputs(inputs)) {
    $("#editclickme").removeAttr("disabled");
  }
});
