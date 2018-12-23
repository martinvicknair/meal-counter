var siteName = "";
var siteAddress = "";
var siteSupervisor = "";

var mealType = "";
var mealPlural = "";

var totalMealsStart = "";

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

// https://getbootstrap.com/docs/4.2/components/forms/#validation
// https://www.codeply.com/go/LYdmkkTZUS/bootstrap-4-validation-example
$("#meal-type-btns").click(function(event) {
  // Fetch form to apply custom Bootstrap validation
  var form = $("#site-meal-form")
  if (form[0].checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  }
  else if (form[0].checkValidity() == true) {
      event.preventDefault()
      var meal = document.activeElement.getAttribute('value');
      selectMeal(meal)
      $("#site-meal-card").toggleClass('d-none');
      $("#meals-available-card").toggleClass('d-none')
}
  form.addClass('was-validated');
});

function selectMeal(meal) {
  siteName = document.getElementById("siteName-input").value;
  siteAddress = document.getElementById("siteAddress-input").value;
  siteSupervisor = document.getElementById("siteSupervisor-input").value;

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
  console.log(`${siteName}-${shortDate}-${mealType}`);
}

function sumMeals() {
  var mealsReceived = document.getElementById("meals-received").value;
  var mealsLeftover = document.getElementById("meals-leftover").value;
  if (mealsReceived == "") {mealsReceived=0};
  if (mealsLeftover == "") {mealsLeftover=0};
  totalMealsStart = parseInt(mealsReceived) + parseInt(mealsLeftover);
  var totalMealsText = totalMealsStart.toString();
  document.getElementById("total-meals-start").value = totalMealsStart;
  console.log(`totalMealsStart: ${totalMealsStart}`);
  if (totalMealsStart >= 1) {
    document.getElementById("startcounting-btn").setAttribute("class", "btn-lg w-100 btn-success");
  }
  else {
    document.getElementById("startcounting-btn").setAttribute("class", "btn-lg w-100 btn-danger");
    // document.getElementById("meals-available-form").setAttribute("class", "is-invalid");
  }
}

// function updateTotal() {
//     var left = document.getElementById("left").value;
//     var mDel = document.getElementById("mDel").value;
// 	if (left=="") {left=0;}
// 	if (mDel=="") { mDel=0; }
//     mTotal = parseInt(left) + parseInt(mDel);
//     var mTotalText = mTotal.toString();
//     document.getElementById("mTotl").value = mTotalText ;
//     var button = document.getElementById("button8");
//     button.style.display='inline-block';
// }

$("#startcounting-btn").click(function(event) {
  // Fetch form to apply custom Bootstrap validation
  var form = $("#meals-available-form")
  if (form[0].checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  }
  if (totalMealsStart == 0) {
    event.preventDefault()
    event.stopPropagation()
    form.removeClass('was-validated')
  }
  else if (form[0].checkValidity() == true) {
      event.preventDefault()
      $("#meals-available-card").toggleClass('d-none')
      $("#meal-count-card").toggleClass('d-none');
}
  form.addClass('was-validated');
});
