console.info('/js/checkout.js loaded');

document.addEventListener('alpine:init', () => {
  Alpine.data('checkout', () => ({
    selectedTimeTxt: (localStorage.getItem('selectedTimeTxt') || '').split(','),
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    confirmEmail: document.getElementById('confirmEmail'),
    gender: document.getElementById('gender'),
    phone: document.getElementById('phone'),

    goToCheckout() {
      var nameValue = false;
      var phoneValue = false;
      var emailValue = false;
      
      if (this.email.value == "" || this.confirmEmail.value == "" || validEmail == false || validConfirmEmail == false) {
        document.getElementById('email').style.borderColor = "red";
        document.getElementById('emailInvalid').innerHTML = "Please enter your email.";
        document.getElementById('confirmEmail').style.borderColor = "red";
        document.getElementById('emailMismatch').innerHTML = "Please enter your email.";
        document.getElementById('email').scrollIntoView();
      } else {
        emailValue = true
      }

      if (this.phone.value == "" || phoneValid == false) {
        document.getElementById('phone').style.borderColor = "red";
        document.getElementById('phoneInvalid').innerHTML = "Please enter your phone number.";
        document.getElementById('phone').scrollIntoView();
      } else {
        phoneValue = true
      }

      if (this.name.value == "") {
        document.getElementById('name').style.borderColor = "red";
        document.getElementById('nameInvalid').innerHTML = "Please enter your name.";
        document.getElementById('name').scrollIntoView();
      } else {
        nameValue = true
      }

      if (nameValue == true && phoneValue == true && emailValue == true && validEmail == true && validConfirmEmail == true && phoneValid == true) {
        localStorage.setItem('name', this.name.value);
        localStorage.setItem('email', this.email.value);
        localStorage.setItem('gender', this.gender.value);
        window.location.href = "/tickets/payment.html";
      }

    }
  }))
});

const selectedDate = localStorage.getItem('selectedDate');
const selectedTime = localStorage.getItem('selectedTime');
const adult_LK_count = localStorage.getItem('adult_LK_count');
const child_LK_count = localStorage.getItem('child_LK_count');
const adult_FR_count = localStorage.getItem('adult_FR_count');
const child_FR_count = localStorage.getItem('child_FR_count');
const infant_count = localStorage.getItem('infant_count');
const total = localStorage.getItem('total');

document.getElementById('summary_date').innerHTML = selectedDate;
document.getElementById('adult_LK_count').innerHTML = adult_LK_count;
document.getElementById('child_LK_count').innerHTML = child_LK_count;
document.getElementById('adult_FR_count').innerHTML = adult_FR_count;
document.getElementById('child_FR_count').innerHTML = child_FR_count;
document.getElementById('infant_count').innerHTML = infant_count;
document.getElementById('total').innerHTML = total;





var phoneInput = document.querySelector("#phone");
var phone_input = intlTelInput(phoneInput);
window.intlTelInput(phoneInput, {
  preferredCountries: ["lk"],
  nationalMode: false,
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
});

// Validations
fname = document.getElementById('name');
document.getElementById('name').addEventListener('input', function () {
  if (fname.value.length > 3) {
    document.getElementById('name').style.borderColor = "#E2E8F0";
    document.getElementById('nameInvalid').innerHTML = "";
  }
});

var email = document.getElementById('email');
var confirmEmail = document.getElementById('confirmEmail');
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

validEmail = false;
document.getElementById('email').addEventListener('input', function () {
  const userEmail = document.getElementById('email').value;
  if (validateEmail(userEmail)) {
    document.getElementById('email').style.borderColor = "#E2E8F0";
    document.getElementById('emailInvalid').innerHTML = "";
    validEmail = true;
  } else {
    document.getElementById('email').style.borderColor = "red";
    document.getElementById('emailInvalid').innerHTML = "Invalid email (Ex:JohnDoe@gmail.com).";
    validEmail = false;
  }
});

validConfirmEmail = false;
document.getElementById('confirmEmail').addEventListener('input', function () {
  emailLC = email.value.toLowerCase();
  confirmEmailLC = confirmEmail.value.toLowerCase();
  if (emailLC != confirmEmailLC) {
    email.style.borderColor = "red";
    confirmEmail.style.borderColor = "red";
    document.getElementById('emailMismatch').innerHTML = "Emails do not match.";
    validConfirmEmail = false;
  } else {
    email.style.borderColor = "#E2E8F0";
    confirmEmail.style.borderColor = "#E2E8F0";
    document.getElementById('emailMismatch').innerHTML = "";
    validConfirmEmail = true;
  }
});


phoneValid = false;
document.getElementById('phone').addEventListener('input', function () {
  var phoneValtidity = phone_input.isValidNumber();
  if (phoneValtidity == false) {
    phoneInput.style.borderColor = "red";
    document.getElementById('phoneInvalid').innerHTML = "Invalid phone number (Ex: +94771234567).";
    phoneValid = false;
  } else {
    phoneInput.style.borderColor = "#E2E8F0";
    document.getElementById('phoneInvalid').innerHTML = "";
    localStorage.setItem('phone', phone_input.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL));
    phoneValid = true;
  }
});



