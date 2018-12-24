var siteName = "";
var siteAddress = "";
var siteSupervisor = "";

var mealType = "";
var mealPlural = "";

var totalMealsStart = 0;
var firstMeals = 0;
var secondMeals = 0
var progAdultMeals = 0;
var nonProgAdultMeals = 0;
var mealsServed = 0;
var numMealsRemain = 0;
var addlMealsNeeded = 0;

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
      $(".siteName-current").text(siteName);
      // document.getElementsByClassName("siteName-current").value = localStorage.getItem("mealCounter-siteName");
      // $("#site-meal-card").toggleClass('d-none');
      // $("#meals-available-card").toggleClass('d-none')
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
    $(".mealType-current").text(mealType);
  console.log(`${siteName}-${shortDate}-${mealType}`);
}

function sumMeals() {
  if (mealsReceived != "" && mealsLeftover != "" && totalMealsStart >= 1) {
    document.getElementById("startcounting-btn").setAttribute("class", "btn-lg w-100 btn-success");
    $("#invalid-feedback-nomeals").addClass('d-none')
  }
  else {
    document.getElementById("startcounting-btn").setAttribute("class", "btn-lg w-100 btn-danger");
    // $("#invalid-feedback-nomeals").addClass('d-none')
  }

  var mealsReceived = document.getElementById("meals-received").value;
  var mealsLeftover = document.getElementById("meals-leftover").value;
  if (mealsReceived == "") {mealsReceived=0};
  if (mealsLeftover == "") {mealsLeftover=0};
  totalMealsStart = parseInt(mealsReceived) + parseInt(mealsLeftover);
  var totalMealsText = totalMealsStart.toString();
  document.getElementById("total-meals-start").value = totalMealsStart;
  console.log(`totalMealsStart: ${totalMealsStart}`);
  // if (mealsReceived >= 0 && mealsLeftover >= 0 && totalMealsStart >= 1) {
  //   document.getElementById("startcounting-btn").setAttribute("class", "btn-lg w-100 btn-success");
  //   $("#invalid-feedback-nomeals").addClass('d-none')
  // }
  // else {
  //   document.getElementById("startcounting-btn").setAttribute("class", "btn-lg w-100 btn-danger");
  //   // $("#invalid-feedback-nomeals").addClass('d-none')
  // }
}


$("#startcounting-btn").click(function(event) {
  // Fetch form to apply custom Bootstrap validation
  var form = $("#meals-available-form")
  if (totalMealsStart == 0) {
    event.preventDefault()
    event.stopPropagation()
    $("#invalid-feedback-nomeals").toggleClass('d-none')
  }
  else if (form[0].checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  }
  else if (form[0].checkValidity() == true) {
      event.preventDefault()
      numMealsRemain = totalMealsStart - mealsServed;
      $(".meals-available").text(numMealsRemain);
      // $("#meals-available-card").toggleClass('d-none')
      // $("#meal-count-card").toggleClass('d-none');
}
  form.addClass('was-validated');
});

// var quantity=0;
   $('#plus-btn').click(function(e){
     console.log("clickplus");
     firstMeals ++
     mealsServed ++;
     numMealsRemain --;
     console.log(firstMeals);
          $('.meals-available').val(numMealsRemain);
          $('.first-meals').text(firstMeals);
    });

     $('.quantity-left-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());

        // If is not undefined

            // Increment
            if(quantity>0){
            $('#quantity').val(quantity - 1);
            }
    });
