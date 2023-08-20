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
      if (this.inputAvailability == true && cardValid == true && expDateValid == true && cvvValid == true && nameOnCardValid == true) {
        localStorage.setItem('card', document.getElementById('card').value);
        localStorage.setItem('expDate', document.getElementById('expDate').value);
        localStorage.setItem('cvv', document.getElementById('cvv').value);
        window.location.href = "/tickets/confirmation.html";
      }
    }
  }))
});

// Card number validation
cardValid = false;
document.getElementById('card').addEventListener("input", function (event) {
  const input = event.target;
  const value = input.value.replace(/\D/g, '');

  const formattedValue = formatCardNumber(value);
  input.value = formattedValue;

  if (document.getElementById('card').value.length != 19) {
    document.getElementById('card').style.borderColor = "red";
    document.getElementById('cardInvalid').innerHTML = "Invalid card number";
    cardValid = false;
  } else {
    document.getElementById('card').style.borderColor = "#E2E8F0";
    document.getElementById('cardInvalid').innerHTML = "";
    cardValid = true;
  }
});

document.getElementById('card').addEventListener('keydown', function (event) {

  if (event.key === 'Backspace') {
    const input = event.target;
    const cursorPosition = input.selectionStart;

    if (cursorPosition % 5 === 0 && cursorPosition > 0) {
      event.preventDefault();
      const newValue = input.value.substring(0, cursorPosition - 1) +
        input.value.substring(cursorPosition);
      input.value = formatCardNumber(newValue);
      input.selectionStart = cursorPosition - 1;
      input.selectionEnd = cursorPosition - 1;
    }
  }
});

function formatCardNumber(cardNumber) {
  const chunks = [];
  for (let i = 0; i < cardNumber.length; i += 4) {
    chunks.push(cardNumber.slice(i, i + 4));
  }
  return chunks.join(' ');
}

expDateValid = false;
expDate = document.getElementById('expDate');
expDate.addEventListener("input", function (event) {
  const input = event.target;
  const value = input.value.replace(/\D/g, '');

  const formattedValue = formatExpirationDate(value);
  input.value = formattedValue;

  if (document.getElementById('expDate').value.length == 2) {
    document.getElementById('expDate').value += "/";
  }

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
    document.getElementById('expDateInvalid').innerHTML = "Invalid expiry date (Ex. MM/YY).";
    expDateValid = false;
  } else if (expMonth < 1 || expMonth > 12) {
    document.getElementById('expDate').style.borderColor = "red";
    document.getElementById('expDateInvalid').innerHTML = "Invalid expiry date (Ex. MM/YY).";
    expDateValid = false;
  } else if (expYear < currentYearLastDigits) {
    document.getElementById('expDate').style.borderColor = "red";
    document.getElementById('expDateInvalid').innerHTML = "Invalid expiry date (Ex. MM/YY).";
    expDateValid = false;
  } else if (expYear == currentYearLastDigits && expMonth < currentMonth) {
    document.getElementById('expDate').style.borderColor = "red";
    document.getElementById('expDateInvalid').innerHTML = "Invalid expiry date (Ex. MM/YY).";
    expDateValid = false;
  } else {
    document.getElementById('expDate').style.borderColor = "#E2E8F0";
    document.getElementById('expDateInvalid').innerHTML = "";
    expDateValid = true;
  }
});

expDate.addEventListener('keydown', function (event) {
  if (event.key === 'Backspace') {
    const input = event.target;
    const cursorPosition = input.selectionStart;

    if (cursorPosition % 3 === 0 && cursorPosition > 0) {
      event.preventDefault();
      const newValue = input.value.substring(0, cursorPosition - 1) + input.value.substring(cursorPosition);
      input.value = formatExpirationDate(newValue);
      input.selectionStart = cursorPosition - 1;
      input.selectionEnd = cursorPosition - 1;
    }
  }
});

function formatExpirationDate(expirationDate) {
  const month = expirationDate.slice(0, 2);
  const year = expirationDate.slice(2, 4);

  if (month) {
    return month + (year ? '/' + year : '');
  }

  return '';
}

// CVV validation
cvvValid = false;
document.getElementById('cvv').addEventListener('input', function () {
  const cvv = document.getElementById('cvv').value;
  if (cvv.length != 3 || isNaN(cvv)) {
    document.getElementById('cvv').style.borderColor = "red";
    document.getElementById('cvvInvalid').innerHTML = "Invalid CVV";
    cvvValid = false;
  } else {
    document.getElementById('cvv').style.borderColor = "#E2E8F0";
    document.getElementById('cvvInvalid').innerHTML = "";
    cvvValid = true;
  }

});

// Name on card validation
nameOnCardValid = false;
document.getElementById('nameOnCard').addEventListener('input', function () {
  const nameOnCard = document.getElementById('nameOnCard').value;
  if (nameOnCard == "" || !isNaN(nameOnCard)) {
    document.getElementById('nameOnCard').style.borderColor = "red";
    document.getElementById('nameOnCardInvalid').innerHTML = "Invalid name";
    nameOnCardValid = false;
  } else {
    document.getElementById('nameOnCard').style.borderColor = "#E2E8F0";
    document.getElementById('nameOnCardInvalid').innerHTML = "";
    nameOnCardValid = true;
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