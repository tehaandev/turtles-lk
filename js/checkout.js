console.info('/js/checkout.js loaded');

document.addEventListener('alpine:init', () => {
  Alpine.data('checkout', () => ({
    selectedTimeTxt: (localStorage.getItem('selectedTimeTxt') || '').split(','),
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    confirmEmail: document.getElementById('confirmEmail'),
    gender: document.getElementById('gender'),

    goToCheckout() {
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
var phoneValtidity = phone_input.isValidNumber();
window.intlTelInput(phoneInput, {
  preferredCountries: ["lk"],
  nationalMode: false,
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
});

// Validations
var email = document.getElementById('email');
var confirmEmail = document.getElementById('confirmEmail');
document.getElementById('confirmEmail').addEventListener('focusout', function () {
  if (email.value != confirmEmail.value) {
    alert("Emails do not match");
    confirmEmail.value = "";
    email.value = "";
  }
});

document.getElementById('phone').addEventListener('focusout', function () {
  if (phoneValtidity == false) {
    alert("Invalid phone number");
    phoneInput.value = "";
  } else {
    localStorage.setItem('phone', phone_input.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL));
  }
});



