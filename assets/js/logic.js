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
var mealsRemaining = 0;
var mealsDamaged = 0;
var mealsLeftover = 0;
var addlMealsNeeded = 0;
var mealsUtilized = 0;

var secondExceeds = "Second Meals cannot exceed First Meals";
var firstExceeds = "First Meals must exceed Second Meals";
var noMeals = "No meals remaining to serve";
var ready ="Ready to serve!";

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

// $(".secondary-cards").toggleClass('d-none');

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
    $("#card1-siteMealInfo").toggleClass('d-none');
    $("#card2-mealsAvailable").toggleClass('d-none')
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

function sumMealsAvail() {
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

  if (mealsAvailable > 0) {
    document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-success");
  } else {
    document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-danger");
  }
};

function sumMeals() {
  mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
  mealsRemaining = mealsAvailable - mealsServed - mealsDamaged;
  $(".mealsAvailable").text(mealsAvailable);
  $(".firstMeals").text(firstMeals);
  $(".secondMeals").text(secondMeals);
  $(".progAdultMeals").text(progAdultMeals);
  $(".nonProgAdultMeals").text(nonProgAdultMeals);
  $(".mealsServed").text(mealsServed);
  $(".mealsRemaining").text(mealsRemaining);
  $(".mealsDamaged").text(mealsDamaged);
  $(".mealsLeftover").text(mealsLeftover);

}

function inputDamaged() {

  mealsDamaged = document.getElementById("mealsDamaged").value;
  mealsLeftover = mealsAvailable - mealsServed - mealsDamaged;
  $(".mealsLeftover").text(mealsLeftover)
  if (mealsDamaged >= mealsAvailable - mealsServed) {
    $("#mealsDamaged-invalidFeedback").toggleClass('d-none');
    setTimeout(function() {
      $("#mealsDamaged-invalidFeedback").toggleClass('d-none');
    }, 1500);

  }
  console.log(`INPUT DAMAGED`);
  console.log(`mealsAvailable: ${mealsAvailable}`);
  console.log(`mealsServed: ${mealsServed}`);
  console.log(`mealsRemaining: ${mealsRemaining}`);
  console.log(`mealsDamaged-: ${mealsDamaged}`);
  console.log(`mealsLeftover-: ${mealsLeftover}`);
  console.log(`------------------------`);
}

$("#startCounting-btn").click(function(event) {
  // Fetch form to apply custom Bootstrap validation
  var form = $("#meals-available-form")
  if (mealsAvailable == 0 ) {
    event.preventDefault()
    event.stopPropagation()
    $("#noMeals-invalidFeedback").toggleClass('d-none')
    setTimeout(function() {
      $("#noMeals-invalidFeedback").toggleClass('d-none');
    }, 3000);
  } else if (mealsAvailable < (mealsServed + mealsDamaged)) {
    event.preventDefault()
    event.stopPropagation()
    $("#servedExceeds-invalidFeedback").toggleClass('d-none')
    setTimeout(function() {
      $("#servedExceeds-invalidFeedback").toggleClass('d-none');
    }, 3000);
  } else if (form[0].checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  } else if (form[0].checkValidity() == true) {
    event.preventDefault();
    sumMeals();
    $(".mealsAvailable").text(mealsAvailable);
    $("#notify").val(ready);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
    $("#card2-mealsAvailable").toggleClass('d-none')
    $("#card3-mainCounters").toggleClass('d-none');
    console.log(`mealsAvailable: ${mealsPrevious} prev + ${mealsNew} new = ${mealsAvailable}`);
  }
  form.addClass('was-validated');
});

$('#doneCounting-btn').click(function(e) {
  // mealsLeftover = mealsAvailable - (mealsServed + mealsDamaged);
  mealsLeftover = mealsRemaining;
  $(".mealsLeftover").text(mealsLeftover);
  $("#mealsDamaged").attr({
    "max": mealsAvailable - mealsServed
  });
  $("#card3-mainCounters").toggleClass('d-none');
  $("#card4-addlMeals").toggleClass('d-none');
  console.log(`DONE COUNTING`);
  console.log(`mealsAvailable: ${mealsAvailable}`);
  console.log(`mealsServed: ${mealsServed}`);
  console.log(`mealsRemaining: ${mealsRemaining}`);
  console.log(`mealsDamaged-: ${mealsDamaged}`);
  console.log(`mealsLeftover-: ${mealsLeftover}`);
  console.log(`------------------------`);
});

$('#first-plus-btn').click(function(e) {
  if (mealsRemaining == 0) {
    $("#notify").val(noMeals);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  } else if (mealsRemaining >= 1) {
    firstMeals++;
    sumMeals();
  } else {
    $("#notify").val(noMeals);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  }
  console.log(`FIRST PLUS`);
  console.log(`mealsAvailable: ${mealsAvailable}`);
  console.log(`firstMeals: ${firstMeals}`);
  console.log(`secondMeals: ${secondMeals}`);
  console.log(`mealsRemaining: ${mealsRemaining}`);
  console.log(`mealsDamaged: ${mealsDamaged}`);
  console.log(`mealsLeftover: ${mealsLeftover}`);
  console.log(`------------------------`);
});

$('#first-minus-btn').click(function(e) {
 if (firstMeals >= 1 && firstMeals > secondMeals) {
    firstMeals--;
    sumMeals();
  } else if (firstMeals = secondMeals) {
    $("#notify").val(firstExceeds);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  }
  console.log(`FIRST MINUS`);
  console.log(`mealsAvailable: ${mealsAvailable}`);
  console.log(`firstMeals: ${firstMeals}`);
  console.log(`secondMeals: ${secondMeals}`);
  console.log(`mealsRemaining: ${mealsRemaining}`);
  console.log(`mealsDamaged: ${mealsDamaged}`);
  console.log(`mealsLeftover: ${mealsLeftover}`);
  console.log(`------------------------`);
});

$('#second-plus-btn').click(function(e) {
  if (mealsRemaining == 0){
   $("#notify").val(noMeals);
   setTimeout(function() {
     $("#notify").val("");
   }, 3000);
 }else if (mealsRemaining >= 1 && secondMeals < firstMeals) {
    secondMeals++;
    sumMeals();
  } else if (secondMeals == firstMeals) {
    $("#notify").val(secondExceeds);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  }

 console.log(`SECOND PLUS`);
 console.log(`mealsAvailable: ${mealsAvailable}`);
 console.log(`firstMeals: ${firstMeals}`);
 console.log(`secondMeals: ${secondMeals}`);
 console.log(`mealsRemaining: ${mealsRemaining}`);
 console.log(`mealsDamaged: ${mealsDamaged}`);
 console.log(`mealsLeftover: ${mealsLeftover}`);
 console.log(`------------------------`);
});

$('#second-minus-btn').click(function(e) {
  if (secondMeals >= 1) {
    secondMeals--;
    sumMeals();
    // mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    // mealsRemaining = mealsAvailable - mealsServed;
    // $('.mealsRemaining').text(mealsRemaining);
    // $('.secondMeals').text(secondMeals);
    // console.log(`mealsAvailable: ${mealsAvailable}`);
    // console.log(`firstMeals-: ${firstMeals}`);
    // console.log(`mealsServed: ${mealsServed}`);
    // console.log(`mealsRemaining: ${mealsRemaining}`);
    // console.log(`------------------------`);
  }
  console.log(`SECOND MINUS`);
  console.log(`mealsAvailable: ${mealsAvailable}`);
  console.log(`firstMeals: ${firstMeals}`);
  console.log(`secondMeals: ${secondMeals}`);
  console.log(`mealsRemaining: ${mealsRemaining}`);
  console.log(`mealsDamaged: ${mealsDamaged}`);
  console.log(`mealsLeftover: ${mealsLeftover}`);
  console.log(`------------------------`);
});

$('#progAdultMeals-plus-btn').click(function(e) {
  if (mealsRemaining > 0) {
    progAdultMeals++;
    sumMeals();
    // mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    // mealsRemaining = mealsAvailable - mealsServed;
    // $('.mealsRemaining').text(mealsRemaining);
    // $('.progAdultMeals').text(progAdultMeals);
  }
});

$('#progAdultMeals-minus-btn').click(function(e) {
  if (progAdultMeals >= 1) {
    progAdultMeals--;
    sumMeals();
    // mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    // mealsRemaining = mealsAvailable - mealsServed;
    // $('.mealsRemaining').text(mealsRemaining);
    // $('.progAdultMeals').text(progAdultMeals);
  }
});

$('#nonProgAdultMeals-plus-btn').click(function(e) {
  if (mealsRemaining > 0) {
    nonProgAdultMeals++;
    sumMeals();
    // mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    // mealsRemaining = mealsAvailable - mealsServed;
    // $('.mealsRemaining').text(mealsRemaining);
    // $('.nonProgAdultMeals').text(nonProgAdultMeals);
  }
});

$('#nonProgAdultMeals-minus-btn').click(function(e) {
  if (nonProgAdultMeals >= 1) {
    nonProgAdultMeals--;
    sumMeals();
    // mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
    // mealsRemaining = mealsAvailable - mealsServed;
    // $('.mealsRemaining').text(mealsRemaining);
    // $('.nonProgAdultMeals').text(nonProgAdultMeals);
  }
});

// $('#addlMealsNeeded-plus-btn').click(function(e) {
//   console.log("CLCK");
//     addlMealsNeeded++;
//     $('.addlMealsNeeded').text(addlMealsNeeded);
// });
$('#addlMealsNeeded-plus-btn').click(function(e) {
  console.log("click");
  addlMealsNeeded++;

  $('.addlMealsNeeded').text(addlMealsNeeded);

});

$('#addlMealsNeeded-minus-btn').click(function(e) {
  if (addlMealsNeeded >= 1) {
    addlMealsNeeded--;
    $('.addlMealsNeeded').text(addlMealsNeeded);
  }
});

function goBackTo1() {
  $("#card2-mealsAvailable").toggleClass('d-none');
  $("#card1-siteMealInfo").toggleClass('d-none');
};

function goBackTo2() {
  mealsUtilized = mealsServed + parseInt(mealsDamaged);
  $('#mealsUtilized').text(mealsUtilized);

  $("#mealsAvailable-input").attr({
    "min": mealsUtilized
  });

  $("#card3-mainCounters").toggleClass('d-none');
  $("#card2-mealsAvailable").toggleClass('d-none');
};

function goBackTo3() {
  mealsRemaining = mealsAvailable - mealsServed - mealsDamaged;
  $('.mealsRemaining').text(mealsRemaining);
  $("#card4-addlMeals").toggleClass('d-none');
  $("#card3-mainCounters").toggleClass('d-none');
  console.log(`GO BACK TO 3`);
  console.log(`mealsAvailable: ${mealsAvailable}`);
  console.log(`mealsServed: ${mealsServed}`);
  console.log(`mealsRemaining: ${mealsRemaining}`);
  console.log(`mealsDamaged-: ${mealsDamaged}`);
  console.log(`mealsLeftover-: ${mealsLeftover}`);
  console.log(`------------------------`);
};

function goBackTo4() {
  $("#card5-summary").toggleClass('d-none');
  $("#card4-addlMeals").toggleClass('d-none');
};

function goBackTo5() {
  $("#card6-done").toggleClass('d-none');
  $("#card5-signature").toggleClass('d-none');
};

function goToSign() {
  $("#card4-addlMeals").toggleClass('d-none');
  $("#card5-signature").toggleClass('d-none');
}
function goToDone() {
  $("#card5-signature").toggleClass('d-none');
  $("#card6-done").toggleClass('d-none');
}

function beforeUnload() {
  return 'Use the "Go Back" button, or you may lose your changes.';
}

function resetApp() {
  var x = confirm("Do you wish to clear all data and restart the Meal Counter app?")
  if (x == true) {
    localStorage.clear();
    // $(window).unbind('beforeunload');
    window.onbeforeunload = null;
    window.location.reload();
}
};

function restartApp() {
    window.onbeforeunload = null;
    window.location.reload();
}
