var siteName = "";
var siteAddress = "";
var siteSupervisor = "";

var mealType = "";
var mealPlural = "";

var dt = new Date();
var dateOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};
var longDate = dt.toLocaleDateString('en-us', dateOptions);
var shortDate = dt.toISOString().slice(0, 10); //return YYYY-MM-DD
$(".long-date").text(longDate);

document.getElementById("siteName-input").value = localStorage.getItem("mealCounter-siteName");
document.getElementById("siteAddress-input").value = localStorage.getItem("mealCounter-siteAddress");
document.getElementById("siteSupervisor-input").value = localStorage.getItem("mealCounter-siteSupervisor");

function selectMeal(meal) {
  siteName = document.getElementById("siteName-input").value;
  siteAddress = document.getElementById("siteAddress-input").value;
  siteSupervisor = document.getElementById("siteSupervisor-input").value;
  console.log(siteName);
  localStorage.setItem("mealCounter-siteName", siteName);
  localStorage.setItem("mealCounter-siteAddress", siteAddress);
  localStorage.setItem("mealCounter-siteSupervisor", siteSupervisor);

  if (meal == "bkfst") {
    mealType = "Breakfast";
    mealPlural = "Breakfasts";
  } else if (meal == "lunch") {
    mealType = "Lunch";
    mealPlural = "Lunches";
  } else if (meal == "snack") {
    mealType = "Snack";
    mealPlural = "Snacks";
  } else if (meal == "supper") {
    mealType = "Supper";
    mealPlural = "Suppers";
  }
  console.log(mealType);
}
// https://www.codeply.com/go/LYdmkkTZUS/bootstrap-4-validation-example
$("#meal-type").click(function(event) {
  // Fetch form to apply custom Bootstrap validation
  var form = $("#site-meal-form")
  var meal = document.activeElement.getAttribute('value');
  if (form[0].checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  }
  else if (form[0].checkValidity() == true) {
      event.preventDefault()
      selectMeal(meal)
      $("#site-meal-info").toggleClass('d-none');
      $("#meals-available").toggleClass('d-none')
}
  form.addClass('was-validated');
});

$("#startcounting-btn").click(function(event) {
  // Fetch form to apply custom Bootstrap validation
  var form = $("#meals-available-form")
  
  if (form[0].checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  }
  else if (form[0].checkValidity() == true) {
      event.preventDefault()

      $("#meals-available").toggleClass('d-none')
      $("#meal-counter").toggleClass('d-none');
}
  form.addClass('was-validated');
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
// (function() {
//   'use strict';
//   window.addEventListener('load', function() {
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     var forms = document.getElementsByClassName('needs-validation');
//     // Loop over them and prevent submission
//     var validation = Array.prototype.filter.call(forms, function(form) {
//       form.addEventListener('submit', function(event) {
//         if (form.checkValidity() === false) {
//           event.preventDefault();
//           event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//       }, false);
//     });
//   }, false);
// })();
