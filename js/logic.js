var siteName = "";
var siteAddress = "";
var siteSupervisor = "";

var mealType = "";
var mealPlural = "";

var mealsNew = 0;
var mealsPrevious = 0;
var mealsAvailable = 0;
var firstMeals = 0;
var secondMeals = 0
var progAdultMeals = 0;
var nonProgAdultMeals = 0;
var mealsServed = 0;
var mealsRemaining = -1;
var addlMealsNeeded = 0;

var secondExceeds = "Second Meals cannot exceed First Meals"


var dt = new Date();
var dateOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};
var longDate = dt.toLocaleDateString('en-us', dateOptions);
var shortDate = dt.toISOString().slice(0, 10); //return YYYY-MM-DD
$(".longDate").text(longDate);
$(".shortDate").text(shortDate);

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
  } else if (form[0].checkValidity() == true) {
    event.preventDefault()
    var meal = document.activeElement.getAttribute('value');
    selectMeal(meal)
    $(".siteName").text(siteName);
    // document.getElementsByClassName("siteName").value = localStorage.getItem("mealCounter-siteName");
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
  $(".mealType").text(mealType);
  console.log(`${siteName}-${shortDate}-${mealType}`);
}

function sumMeals() {
  if (mealsNew != "" && mealsPrevious != "" && mealsAvailable >= 1) {
    // $(".startCounting-btn").setAttribute("class", "btn-lg w-100 btn-success")
    document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-success");
    $("#invalid-feedback-nomeals").addClass('d-none')
  } else {
    document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-danger");
    // $("#invalid-feedback-nomeals").addClass('d-none')
  }

  mealsNew = document.getElementById("mealsNew").value;
  mealsPrevious = document.getElementById("mealsPrevious").value;
  if (mealsNew == "") {
    mealsNew = 0
  };
  if (mealsPrevious == "") {
    mealsPrevious = 0
  };
  mealsAvailable = parseInt(mealsNew) + parseInt(mealsPrevious);
  $('.mealsAvailable').val(mealsAvailable);
}

$("#backToCard1").click(function() {
  $("#site-meal-card").toggleClass('d-none');
  $("#meals-available-card").toggleClass('d-none')
})

$("#backToCard2").click(function() {
  $("#meals-available-card").toggleClass('d-none');
  $("#meal-count-card").toggleClass('d-none')
})

$("#startCounting-btn").click(function(event) {
  // Fetch form to apply custom Bootstrap validation
  var form = $("#meals-available-form")
  if (mealsAvailable == 0) {
    event.preventDefault()
    event.stopPropagation()
    $("#invalid-feedback-nomeals").toggleClass('d-none')
  } else if (form[0].checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  } else if (form[0].checkValidity() == true) {
    event.preventDefault()
    $(".mealsAvailable").text(mealsAvailable);
    mealsRemaining = mealsAvailable - mealsServed;
    $(".mealsRemaining").text(mealsRemaining);
    $("#meals-available-card").toggleClass('d-none')
    $("#meal-count-card").toggleClass('d-none');
    console.log(`mealsAvailable: ${mealsPrevious} prev + ${mealsNew} new = ${mealsAvailable}`);
  }
  form.addClass('was-validated');
});

$('#first-plus-btn').click(function(e) {
if (mealsRemaining >= 1) {
    firstMeals++;
    mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    mealsRemaining = mealsAvailable - mealsServed;
    $('.mealsRemaining').text(mealsRemaining);
    $('.firstMeals').text(firstMeals);
  }
});

$('#first-minus-btn').click(function(e) {
  if (firstMeals >= 1 && firstMeals > secondMeals) {
    firstMeals--;
    mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    mealsRemaining = mealsAvailable - mealsServed;
    $('.mealsRemaining').text(mealsRemaining);
    $('.firstMeals').text(firstMeals);
  } else if (firstMeals = secondMeals) {
    $("#notify").val(secondExceeds);
    setTimeout(function() { $("#notify").val(""); }, 3000);
  }
});

$('#second-plus-btn').click(function(e) {
  if (mealsRemaining > 0 && secondMeals < firstMeals) {
    secondMeals++;
    mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    mealsRemaining = mealsAvailable - mealsServed;
    $('.mealsRemaining').text(mealsRemaining);
    $('.secondMeals').text(secondMeals);
  } else {
    $("#notify").val(secondExceeds);
    setTimeout(function() { $("#notify").val(""); }, 3000);
  }
});

$('#second-minus-btn').click(function(e) {
  if (secondMeals >= 1) {
    secondMeals--;
    mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    mealsRemaining = mealsAvailable - mealsServed;
    $('.mealsRemaining').text(mealsRemaining);
    $('.secondMeals').text(secondMeals);
    console.log(`mealsAvailable: ${mealsAvailable}`);
    console.log(`firstMeals-: ${firstMeals}`);
    console.log(`mealsServed: ${mealsServed}`);
    console.log(`mealsRemaining: ${mealsRemaining}`);
    console.log(`------------------------`);
  }
});

$('#progAdultMeals-plus-btn').click(function(e) {
  if (mealsRemaining > 0 ) {
    progAdultMeals++;
    mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    mealsRemaining = mealsAvailable - mealsServed;
    $('.mealsRemaining').text(mealsRemaining);
    $('.progAdultMeals').text(progAdultMeals);
  }
});

$('#progAdultMeals-minus-btn').click(function(e) {
  if (progAdultMeals >= 1) {
    progAdultMeals--;
    mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    mealsRemaining = mealsAvailable - mealsServed;
    $('.mealsRemaining').text(mealsRemaining);
    $('.progAdultMeals').text(progAdultMeals);
  }
});

$('#nonProgAdultMeals-plus-btn').click(function(e) {
  if (mealsRemaining > 0 ) {
    nonProgAdultMeals++;
    mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    mealsRemaining = mealsAvailable - mealsServed;
    $('.mealsRemaining').text(mealsRemaining);
    $('.nonProgAdultMeals').text(nonProgAdultMeals);
  }
});

$('#nonProgAdultMeals-minus-btn').click(function(e) {
  if (nonProgAdultMeals >= 1) {
    nonProgAdultMeals--;
    mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    mealsRemaining = mealsAvailable - mealsServed;
    $('.mealsRemaining').text(mealsRemaining);
    $('.nonProgAdultMeals').text(nonProgAdultMeals);
  }
});
