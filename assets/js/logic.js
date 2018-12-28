var siteName = "";
var siteAddress = "";
var siteSupervisor = "";

var mealType = "";

var mealsNew;
var mealsPrevious;
var mealsAvailable = 0;
var firstMeals = 0;
var secondMeals = 0
var progAdultMeals = 0;
var nonProgAdultMeals = 0;
var mealsServed = 0;
var mealsDamaged = 0;
var mealsUtilized = 0;
var mealsLeftover = 0;
var addlMealsNeeded = 0;


var secondExceeds = "Second Meals cannot exceed First Meals";
var firstExceeds = "First Meals must exceed Second Meals";
var noMeals = "No meals remaining to serve";
var ready = "Ready to serve!";

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
    selectSiteMeal(meal);
    $(".siteName").text(siteName);
    $("#card1-siteMealInfo").toggleClass('d-none');
    $("#card2-mealsAvailable").toggleClass('d-none')
  }
  form.addClass('was-validated');
});

function selectSiteMeal(meal) {
  siteName = document.getElementById("siteName-input").value;
  siteAddress = document.getElementById("siteAddress-input").value;
  siteSupervisor = document.getElementById("siteSupervisor-input").value;
  localStorage.setItem("mealCounter-siteName", siteName);
  localStorage.setItem("mealCounter-siteAddress", siteAddress);
  localStorage.setItem("mealCounter-siteSupervisor", siteSupervisor);
  switch (meal) {
    case "b":
      mealType = "Breakfast";
      break;
    case "l":
      mealType = "Lunch";
      break;
    case "sn":
      mealType = "Snack";
      break;
    case "su":
      mealType = "Supper";
      break;
  }
  $(".mealType").text(mealType);
  console.log(`${siteName}-${shortDate}-${mealType}`);
}

function sumMealsAvail() {
  mealsNew = document.getElementById("mealsNew").value;
  mealsPrevious = document.getElementById("mealsPrevious").value;
  var mealsTotal = 0;
  mealsTotal += numNan(mealsNew);
  mealsTotal += numNan(mealsPrevious);
  mealsAvailable = mealsTotal;
  $('.mealsAvailable').val(mealsAvailable);
  if (mealsAvailable > 0 && (mealsNew != "" && mealsPrevious != "")) {
    document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-success");
  } else {
    document.getElementById("startCounting-btn").setAttribute("class", "btn-lg w-100 btn-danger");
  }
};

//allows calculation of NaN without console error or setting variable to zero
//https://stackoverflow.com/questions/7540397/convert-nan-to-0-in-javascript
function numNan(str) {
  return /[0-9]*\.?[0-9]+/.test(str) ? parseFloat(str) : 0;
}

function sumMeals() {
  mealsServed = firstMeals + secondMeals + progAdultMeals + nonProgAdultMeals;
  mealsUtilized = mealsServed + mealsDamaged;
  mealsLeftover = mealsAvailable - mealsUtilized;
  $(".mealsAvailable").text(mealsAvailable);
  $(".firstMeals").text(firstMeals);
  $(".secondMeals").text(secondMeals);
  $(".progAdultMeals").text(progAdultMeals);
  $(".nonProgAdultMeals").text(nonProgAdultMeals);
  $(".mealsServed").text(mealsServed);
  $(".mealsDamaged").text(mealsDamaged);
  $(".mealsUtilized").text(mealsUtilized);
  $(".mealsLeftover").text(mealsLeftover);
}

function inputDamaged() {
  mealsDamaged = document.getElementById("mealsDamaged").value;
  mealsDamaged = numNan(mealsDamaged);
  console.log(mealsDamaged);
  sumMeals();
  if (mealsLeftover <= -1) {
    mealsDamaged = parseInt(document.getElementById("mealsDamaged").value);
    $("#mealsDamaged-invalidFeedback").toggleClass('d-none');
    setTimeout(function() {
      $("#mealsDamaged-invalidFeedback").toggleClass('d-none');
    }, 2500);

  }
};

$("#startCounting-btn").click(function(event) {
  var form = $("#meals-available-form")
  if (mealsAvailable == 0) {
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
    $("#notify").val(ready);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
    $("#card2-mealsAvailable").toggleClass('d-none')
    $("#card3-mainCounters").toggleClass('d-none');
  }
  form.addClass('was-validated');
});

$('#doneCounting-btn').click(function(e) {
  sumMeals();
  $("#mealsDamaged").attr({
    "max": mealsAvailable - mealsServed
  });
  $("#card3-mainCounters").toggleClass('d-none');
  $("#card4-addlMeals").toggleClass('d-none');
});

$('#first-plus-btn').click(function(e) {
  if (mealsLeftover == 0) {
    $("#notify").val(noMeals);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  } else if (mealsLeftover >= 1) {
    firstMeals++;
    sumMeals();
  } else {
    $("#notify").val(noMeals);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  }
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
});

$('#second-plus-btn').click(function(e) {
  if (mealsLeftover == 0) {
    $("#notify").val(noMeals);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  } else if (mealsLeftover >= 1 && secondMeals < firstMeals) {
    secondMeals++;
    sumMeals();
  } else if (secondMeals == firstMeals) {
    $("#notify").val(secondExceeds);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  }
});

$('#second-minus-btn').click(function(e) {
  if (secondMeals >= 1) {
    secondMeals--;
    sumMeals();
  }
});

$('#progAdultMeals-plus-btn').click(function(e) {
  if (mealsLeftover == 0) {
    $("#notify").val(noMeals);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  } else if (mealsLeftover > 0) {
    progAdultMeals++;
    sumMeals();
  }
});

$('#progAdultMeals-minus-btn').click(function(e) {
  if (progAdultMeals >= 1) {
    progAdultMeals--;
    sumMeals();
  }
});

$('#nonProgAdultMeals-plus-btn').click(function(e) {
  if (mealsLeftover == 0) {
    $("#notify").val(noMeals);
    setTimeout(function() {
      $("#notify").val("");
    }, 3000);
  } else if (mealsLeftover > 0) {
    nonProgAdultMeals++;
    sumMeals();
  }
});

$('#nonProgAdultMeals-minus-btn').click(function(e) {
  if (nonProgAdultMeals >= 1) {
    nonProgAdultMeals--;
    sumMeals();
  }
});

$('#addlMealsNeeded-plus-btn').click(function(e) {
  if (mealsLeftover > 0) {
    $("#addlMeals-invalidFeedback").toggleClass('d-none');
    setTimeout(function() {
      $("#addlMeals-invalidFeedback").toggleClass('d-none');
    }, 3000);
    console.log("have meals remaining");
  } else
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
  $("#mealsAvailable-input").attr({
    "min": mealsUtilized
  });
  $("#card3-mainCounters").toggleClass('d-none');
  $("#card2-mealsAvailable").toggleClass('d-none');
};

function goBackTo3() {
  $("#card4-addlMeals").toggleClass('d-none');
  $("#card3-mainCounters").toggleClass('d-none');
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

function resetApp() {
  var x = confirm("Do you wish to clear all data and restart the Meal Counter app?")
  if (x == true) {
    localStorage.clear();
    window.onbeforeunload = null;
    window.location.reload();
  }
};

function restartApp() {
  window.onbeforeunload = null;
  window.location.reload();
}

function beforeUnload() {
  return 'Use the "Go Back" button, or you may lose your changes.';
}

// console.log(`Meal Totals`);
// console.log(`mealsNew: ${mealsNew}`);
// console.log(`mealsPrevious: ${mealsPrevious}`);
// console.log(`mealsAvailable: ${mealsAvailable}`);
// console.log(`mealsServed: ${mealsServed}`);
// console.log(`mealsDamaged: ${mealsDamaged}`);
// console.log(`mealsLeftover: ${mealsLeftover}`);
// console.log(`mealsUtilized: ${mealsUtilized}`);
// console.log(`------------------------`);
