console.info('/js/payment.js loaded');

document.addEventListener('alpine:init', () => {
  Alpine.data('payment', () => ({
    selectedTimeTxt: (localStorage.getItem('selectedTimeTxt') || '').split(','),
    inputAvailability: false,
    inputAvailability() {
      if (document.getElementById('card').value == "") {
        document.getElementById('card').style.borderColor = "red";
        document.getElementById('cardInvalid').innerHTML = "Please enter your card number";
      } else if (document.getElementById('expDate').value == "") {
        document.getElementById('expDate').style.borderColor = "red";
        document.getElementById('expDateInvalid').innerHTML = "Please enter your card expiry date";
      } else if (document.getElementById('cvv').value == "") {
        document.getElementById('cvv').style.borderColor = "red";
        document.getElementById('cvvInvalid').innerHTML = "Please enter your CVV";
      } else if (document.getElementById('nameOnCard').value == "") {
        document.getElementById('nameOnCard').style.borderColor = "red";
        document.getElementById('nameOnCardInvalid').innerHTML = "Please enter your name";
      } else {
        document.getElementById('card').style.borderColor = "#E2E8F0";
        document.getElementById('cardInvalid').innerHTML = "";
        document.getElementById('expDate').style.borderColor = "#E2E8F0";
        document.getElementById('expDateInvalid').innerHTML = "";
        document.getElementById('cvv').style.borderColor = "#E2E8F0";
        document.getElementById('cvvInvalid').innerHTML = "";
        document.getElementById('nameOnCard').style.borderColor = "#E2E8F0";
        document.getElementById('nameOnCardInvalid').innerHTML = "";
        this.inputAvailability = true;
      }

    },

    goToConfirmation() {
      this.inputAvailability();
      if (this.inputAvailability == true) {
        localStorage.setItem('card', document.getElementById('card').value);
        localStorage.setItem('expDate', document.getElementById('expDate').value);
        localStorage.setItem('cvv', document.getElementById('cvv').value);
        window.location.href = "/tickets/confirmation.html";
      }
    }
  }))
});

// Card number validation
document.getElementById('card').addEventListener('input', function (e) {
  const input = e.target.value;
  const inputLength = input.length;
  if (inputLength == 4 || inputLength == 9 || inputLength == 14) {
    e.target.value = input + " ";
  }

  if (inputLength > 19) {
    document.getElementById('card').style.borderColor = "red";
    document.getElementById('cardInvalid').innerHTML = "Invalid card number";
  } else {
    document.getElementById('card').style.borderColor = "#E2E8F0";
    document.getElementById('cardInvalid').innerHTML = "";
  } 
});

document.getElementById('card').addEventListener('focusout', function () {
  const card = document.getElementById('card').value;
  const cardArray = card.split(" ");
  const card1 = cardArray[0];
  const card2 = cardArray[1];
  const card3 = cardArray[2];
  const card4 = cardArray[3];

  if (card1.length != 4 || card2.length != 4 || card3.length != 4 || card4.length != 4) {
    document.getElementById('card').style.borderColor = "red";
    document.getElementById('cardInvalid').innerHTML = "Invalid card number";
  } else {
    document.getElementById('card').style.borderColor = "#E2E8F0";
    document.getElementById('cardInvalid').innerHTML = "";
  }

  for (item in cardArray) {
    if (isNaN(cardArray[item])) {
      document.getElementById('card').style.borderColor = "red";
      document.getElementById('cardInvalid').innerHTML = "Input should only contain numbers";
    } else {
      document.getElementById('card').style.borderColor = "#E2E8F0";
      document.getElementById('cardInvalid').innerHTML = "";
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
expDate.addEventListener('input', function () {
  const expDate = document.getElementById('expDate').value;
  const expDateArray = expDate.split("/");
  const expMonth = parseInt(expDateArray[0]);
  const expYear = parseInt(expDateArray[1]);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const currentYearLastDigits = currentYear.toString().substr(-2);
  if (isNaN(expMonth) || isNaN(expYear)) {
    document.getElementById('expDate').style.borderColor = "red";
    document.getElementById('expDateInvalid').innerHTML = "Invalid expiry date";
  } else if (expMonth < 1 || expMonth > 12) {
    document.getElementById('expDate').style.borderColor = "red";
    document.getElementById('expDateInvalid').innerHTML = "Invalid expiry date";
  } else if (expYear < currentYearLastDigits) {
    document.getElementById('expDate').style.borderColor = "red";
    document.getElementById('expDateInvalid').innerHTML = "Invalid expiry date";
  } else if (expYear == currentYearLastDigits && expMonth < currentMonth) {
    document.getElementById('expDate').style.borderColor = "red";
    document.getElementById('expDateInvalid').innerHTML = "Invalid expiry date";
  } else {
    document.getElementById('expDate').style.borderColor = "#E2E8F0";
    document.getElementById('expDateInvalid').innerHTML = "";
  }
});

// CVV validation
document.getElementById('cvv').addEventListener('input', function () {
  const cvv = document.getElementById('cvv').value;
  if (cvv.length != 3 || isNaN(cvv)) {
    document.getElementById('cvv').style.borderColor = "red";
    document.getElementById('cvvInvalid').innerHTML = "Invalid CVV";
  } else {
    document.getElementById('cvv').style.borderColor = "#E2E8F0";
    document.getElementById('cvvInvalid').innerHTML = ""; 
  }
    
});

// Name on card validation
document.getElementById('nameOnCard').addEventListener('input', function () {
  const nameOnCard = document.getElementById('nameOnCard').value;
  if (nameOnCard == "" || !isNaN(nameOnCard)) {
    document.getElementById('nameOnCard').style.borderColor = "red";
    document.getElementById('nameOnCardInvalid').innerHTML = "Invalid name";
  } else {
    document.getElementById('nameOnCard').style.borderColor = "#E2E8F0";
    document.getElementById('nameOnCardInvalid').innerHTML = "";
  }
});

// Summary table values
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