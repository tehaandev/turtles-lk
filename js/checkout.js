console.info('/js/checkout.js loaded');

document.addEventListener('alpine:init', () => {
  Alpine.data('checkout', () => ({
    selectedTimeTxt: (localStorage.getItem('selectedTimeTxt') || '').split(','),
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    confirmEmail: document.getElementById('confirmEmail'),
    gender: document.getElementById('gender'),

    goToCheckout() {
      if (this.name.value == "") {
        alert("Please enter your name");
        return;
      }
      if (this.email.value == "") {
        alert("Please enter your email");
        return;
      }
      localStorage.setItem('name', this.name.value);
      localStorage.setItem('email', this.email.value);
      localStorage.setItem('gender', this.gender.value);
      window.location.href = "/tickets/payment.html";
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
var email = document.getElementById('email');
var confirmEmail = document.getElementById('confirmEmail');
document.getElementById('confirmEmail').addEventListener('input', function () {
  if (email.value != confirmEmail.value) {
    email.style.borderColor = "red";
    confirmEmail.style.borderColor = "red";
    document.getElementById('emailMismatch').innerHTML = "Emails do not match";
  } else {
    email.style.borderColor = "#E2E8F0";
    confirmEmail.style.borderColor = "#E2E8F0";
    document.getElementById('emailMismatch').innerHTML = "";
  }
});

document.getElementById('phone').addEventListener('input', function () {
  var phoneValtidity = phone_input.isValidNumber();
  if (phoneValtidity == false) {
    phoneInput.style.borderColor = "red";
    document.getElementById('phoneInvalid').innerHTML = "Invalid phone number";
  } else {
    phoneInput.style.borderColor = "#E2E8F0";
    document.getElementById('phoneInvalid').innerHTML = "";
    localStorage.setItem('phone', phone_input.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL));
  }
});



