document.getElementById('gymForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Clear previous error messages
    clearErrors();
  
    // Get form values
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var height = parseFloat(document.getElementById('height').value.trim()); // Convert to float
    var weight = parseFloat(document.getElementById('weight').value.trim()); // Convert to float
    var membership = document.getElementById('membership').value.trim();
  
    // Validate form fields
    var valid = true;
  
    if (name === '') {
      showError('nameError', 'Please enter your name.');
      valid = false;
    }
  
    if (email === '') {
      showError('emailError', 'Please enter your email address.');
      valid = false;
    }
  
    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('emailError', 'Please enter a valid email address.');
      valid = false;
    }
  
    if (phone === '') {
      showError('phoneError', 'Please enter your phone number.');
      valid = false;
    }
  
    // Validate phone format (simple check for numeric characters and length)
    if (!(/^\d+$/.test(phone)) || phone.length !== 10) {
      showError('phoneError', 'Please enter a valid 10-digit phone number.');
      valid = false;
    }
  
    if (isNaN(height) || height <= 0) {
      showError('heightError', 'Please enter a valid height.');
      valid = false;
    }
  
    if (isNaN(weight) || weight <= 0) {
      showError('weightError', 'Please enter a valid weight.');
      valid = false;
    }
  
    if (membership === '') {
      showError('membershipError', 'Please select a membership type.');
      valid = false;
    }
  
    if (valid) {
      // Calculate BMI
      var bmi = calculateBMI(weight, height);
  
      // Determine BMI category
      var category;
      if (bmi < 18.5) {
        category = 'Underweight';
      } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
      } else if (bmi >= 24.9 && bmi < 29.9) {
        category = 'Overweight';
      } else {
        category = 'Obese';
      }
  
      // If all validations pass, provide feedback and redirect to success page
      var message = 'Form submitted successfully!\n';
      message += 'Name: ' + name + '\n';
      message += 'Email: ' + email + '\n';
      message += 'Phone: ' + phone + '\n';
      message += 'Height: ' + height + ' cm\n';
      message += 'Weight: ' + weight + ' kg\n';
      message += 'BMI: ' + bmi.toFixed(2) + '\n';
      message += 'BMI Category: ' + category + '\n';
      message += 'Membership Type: ' + membership;
  
      alert(message);
  
      // Redirect to success page
      window.location.href = 'succes.html'; // Change 'success.html' to your actual success page URL
    }
  });
  
  function showError(id, message) {
    var errorElement = document.getElementById(id);
    errorElement.innerHTML = message;
    var inputElement = document.getElementById(id.replace('Error', ''));
    inputElement.classList.add('invalid-input');
  }
  
  function clearErrors() {
    var errors = document.getElementsByClassName('error');
    for (var i = 0; i < errors.length; i++) {
      errors[i].innerHTML = '';
    }
  
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove('invalid-input');
    }
  }
  
  function calculateBMI(weight, height) {
    return weight / ((height / 100) * (height / 100));
  }
  