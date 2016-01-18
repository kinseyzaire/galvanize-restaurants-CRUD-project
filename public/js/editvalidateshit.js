// $("#addKnopf").attr("disabled", "disabled");
var inputs = $("#name, #city, #state, #cuisine, #description");
​
$("#image").change(function() {
    $("#clickmeclickme").attr("src", $("#image").val());
})
​
var validateInputs = function(inputs) {
  var validForm = true;
  inputs.each(function(index) {
    var input = $(this);
    if (!input.val() || (input.type === "radio" && !input.is(':checked'))) {
        if(input.id !== "image") {
      $("#clickmeclickme").attr("disabled", "disabled");
      validForm = false;
        }
    }
  });
  return validForm;
}
​
​
inputs.change(function() {
  if (validateInputs(inputs)) {
    $("#clickmeclickme").removeAttr("disabled");
  }
});
