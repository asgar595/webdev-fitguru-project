var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
function validateForm() {
  if (
    age.value == "" ||
    height.value == "" ||
    weight.value == "" ||
    (male.checked == false && female.checked == false)
  ) {
    alert("All fields are required!");
    document.getElementById("submit").removeEventListener("click", countBmi);
  } else {
    countBmi();
  }
}
document.getElementById("submit").addEventListener("click", validateForm);
function countBmi() {
  var p = [age.value, height.value, weight.value];
  if (male.checked) {
    p.push("male");
  } else if (female.checked) {
    p.push("female");
  }
  form.reset();
  var bmi = Number(p[2]) / (((Number(p[1]) / 100) * Number(p[1])) / 100);
  var result = "";

  // Determine the result and set the appropriate page to redirect
  var redirectPage = "";
  if (bmi < 18.5) {
    result = "Underweight";
    redirectPage = "underweight.html"; // Change to the actual URL for the underweight page
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = "Healthy";
    redirectPage = "healthy.html"; // Change to the actual URL for the healthy page
  } else if (25 <= bmi) {
    result = "Overweight";
    redirectPage = "overweight.html"; // Change to the actual URL for the overweight page
  }

  localStorage.setItem("bmiResult", result);

  // Display the result after a 2-second delay
  setTimeout(function () {
    var h1 = document.createElement("h1");
    var h2 = document.createElement("h2");
    var t = document.createTextNode(result);
    var b = document.createTextNode("BMI: ");
    var r = document.createTextNode(parseFloat(bmi).toFixed(2));
    h1.appendChild(t);
    h2.appendChild(b);
    h2.appendChild(r);
    document.body.appendChild(h1);
    document.body.appendChild(h2);

    // Redirect to the appropriate page after displaying the result
    setTimeout(function () {
      window.location.href = redirectPage;
    }, 2000); // 2000 milliseconds = 2 seconds
  }, 2000); // 2000 milliseconds = 2 seconds

  document.getElementById("submit").removeEventListener("click", countBmi);
  document.getElementById("submit").removeEventListener("click", validateForm);
}


document.getElementById("submit").addEventListener("click", countBmi);