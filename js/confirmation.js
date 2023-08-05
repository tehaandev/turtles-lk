console.info('/js/confirmation.js loaded');

document.addEventListener('alpine:init', () => {
    Alpine.data('confirmation', () => ({
      selectedTimeTxt: (localStorage.getItem('selectedTimeTxt') || '').split(','),
      goToWebsite() {
        window.location.href = '/index.html';
        localStorage.clear();
    }
    }))
});

const adult_LK_total = localStorage.getItem('adult_LK_total');
const child_LK_total = localStorage.getItem('child_LK_total');
const adult_FR_total = localStorage.getItem('adult_FR_total');
const child_FR_total = localStorage.getItem('child_FR_total');
const infant_total = localStorage.getItem('infant_total');

const peakCount = localStorage.getItem('peakCount');
const offPeakCount = localStorage.getItem('offPeakCount');
var totalCount = parseInt(peakCount) + parseInt(offPeakCount);

const name = localStorage.getItem('name');
const phone = localStorage.getItem('phone');
const email = localStorage.getItem('email');

const selectedDate = localStorage.getItem('selectedDate');
const selectedTime = localStorage.getItem('selectedTime');
const adult_LK_count = localStorage.getItem('adult_LK_count');
const child_LK_count = localStorage.getItem('child_LK_count');
const adult_FR_count = localStorage.getItem('adult_FR_count');
const child_FR_count = localStorage.getItem('child_FR_count');
const infant_count = localStorage.getItem('infant_count');
const total = localStorage.getItem('total');

const startTime = localStorage.getItem('startTime');
const endTime = localStorage.getItem('endTime');

document.getElementById('name').innerHTML = name;
document.getElementById('email').innerHTML = email;
document.getElementById('phone').innerHTML = phone;

document.getElementById('summary_date').innerHTML = selectedDate;
document.getElementById('adult_LK_count').innerHTML = adult_LK_count;
document.getElementById('child_LK_count').innerHTML = child_LK_count;
document.getElementById('adult_FR_count').innerHTML = adult_FR_count;
document.getElementById('child_FR_count').innerHTML = child_FR_count;
document.getElementById('infant_count').innerHTML = infant_count;
document.getElementById('total').innerHTML = total;

document.getElementById('offPeakCount').innerHTML = offPeakCount;
document.getElementById('peakCount').innerHTML = peakCount;
document.getElementById('totalCount').innerHTML = totalCount;

document.getElementById('startTime').innerHTML = startTime;
document.getElementById('endTime').innerHTML = endTime;


