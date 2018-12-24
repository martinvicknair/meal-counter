var siteName = "";
var siteAddress = "";
var siteSupervisor = "";

var mealType = "";
var mealPlural = "";

var mealsAvailable = 0;
var firstMeals = 0;
var secondMeals = 0
var progAdultMeals = 0;
var nonProgAdultMeals = 0;
var mealsServed = 0;
var mealsRemaining = 0;
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
$(".longDate").text(longDate);

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
  if (mealsReceived != "" && mealsLeftover != "" && mealsAvailable >= 1) {
    // $(".startCounting-btn").setAttribute("class", "btn-lg w-100 btn-success")
    document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-success");
    $("#invalid-feedback-nomeals").addClass('d-none')
  } else {
    document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-danger");
    // $("#invalid-feedback-nomeals").addClass('d-none')
  }

  var mealsReceived = document.getElementById("meals-received").value;
  var mealsLeftover = document.getElementById("meals-leftover").value;
  if (mealsReceived == "") {
    mealsReceived = 0
  };
  if (mealsLeftover == "") {
    mealsLeftover = 0
  };
  mealsAvailable = parseInt(mealsReceived) + parseInt(mealsLeftover);
  // var totalMealsText = mealsAvailable.toString();
  $('.mealsAvailable').val(mealsAvailable);
  // document.getElementsByClassName("mealsAvailable").value = mealsAvailable;
  // console.log(`mealsAvailable: ${mealsAvailable}`);
  // if (mealsReceived >= 0 && mealsLeftover >= 0 && mealsAvailable >= 1) {
  //   document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-success");
  //   $("#invalid-feedback-nomeals").addClass('d-none')
  // }
  // else {
  //   document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-danger");
  //   // $("#invalid-feedback-nomeals").addClass('d-none')
  // }
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
    mealsRemaining = mealsAvailable - mealsServed;
    $(".mealsRemaining").text(mealsRemaining);
    $("#meals-available-card").toggleClass('d-none')
    $("#meal-count-card").toggleClass('d-none');
    console.log(`mealsAvailable: ${mealsAvailable}`);
  }
  form.addClass('was-validated');
});

$('#first-plus-btn').click(function(e) {
  if (mealsRemaining > 0) {
    firstMeals++;
    mealsServed++;
    mealsRemaining--;
    $('.mealsRemaining').text(mealsRemaining);
    $('.firstMeals').text(firstMeals);
    // console.log(`firstMeals+: ${firstMeals}`);
  }

});

$('#first-minus-btn').click(function(e) {
if (firstMeals > 0) {
  firstMeals--;
  mealsServed--;
  mealsRemaining++;
  $('.mealsRemaining').text(mealsRemaining);
  $('.firstMeals').text(firstMeals);
  // console.log(`firstMeals-: ${firstMeals}`);
}

});
// window.onbeforeunload = function (e) {
//       var e = e || window.event;
//        var msg = 'You may lose changes. Use the "Go Back" button in the app.'
//      // For IE and Fire[![enter image description here][1]][1]fox
//   if (e) {
//       e.returnValue = msg;
//   }
//
//   // For Safari / chrome
//   return msg;
// };
