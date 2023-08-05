console.info('/js/payment.js loaded');

document.addEventListener('alpine:init', () => {
    Alpine.data('payment', () => ({
      selectedTimeTxt: (localStorage.getItem('selectedTimeTxt') || '').split(','),
      goToConfirmation() {
        localStorage.setItem('card', document.getElementById('card').value);
        localStorage.setItem('expDate', document.getElementById('expDate').value);
        localStorage.setItem('cvv', document.getElementById('cvv').value);
        window.location.href = "/tickets/confirmation.html";
      }
    }))
});

// Card number validation
card = document.getElementById('card');
card.addEventListener('input', function (e) {
  const input = e.target.value;
  const inputLength = input.length;
  if (inputLength == 4 || inputLength == 9 || inputLength == 14) {
    e.target.value = input + " ";
  }
  
  if (card.length > 19) {
    alert("Please enter a valid card number");
    document.getElementById('card').value = '';
  }
});
card.addEventListener('focusout', function () {
  const card = document.getElementById('card').value;
  const cardArray = card.split(" ");
  const card1 = cardArray[0];
  const card2 = cardArray[1];
  const card3 = cardArray[2];
  const card4 = cardArray[3];

  if (card1.length != 4 || card2.length != 4 || card3.length != 4 || card4.length != 4) { 
    alert("Please enter a valid card number");
    document.getElementById('card').value = '';
  }
  // Checks if all inputs are numerals
  for (item in cardArray) {
    if (isNaN(cardArray[item])) {
      alert("Please enter a valid card number");
      document.getElementById('card').value = '';
    }
  }
});



// Expiry date validation
expDate = document.getElementById('expDate');
expDate.addEventListener('input', function (e) {
  const input = e.target.value;
  const inputLength = input.length;
  if (inputLength == 2) {
    e.target.value = input + "/";
  }
});
expDate.addEventListener('focusout', function () {
  const expDate = document.getElementById('expDate').value;
  const expDateArray = expDate.split("/");
  const expMonth = expDateArray[0];
  const expYear = expDateArray[1];
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  if (expMonth < 1 || expMonth > 12) {
    alert("Please enter a valid month");
    document.getElementById('expDate').value = '';
  }
});

// CVV validation
cvv = document.getElementById('cvv');
cvv.addEventListener('focusout', function () {
  const cvv = document.getElementById('cvv').value;
  if (cvv.length != 3) {
    alert("Please enter a valid CVV");
    document.getElementById('cvv').value = '';
  }
  // Checks if all inputs are numerals
  if (isNaN(cvv)) {
    alert("Please enter a valid CVV");
    document.getElementById('cvv').value = '';
  }
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
document.getElementById('totalBtn').innerHTML = "$" + total;