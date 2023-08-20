var field = document.getElementById('datepicker');

var picker = new Pikaday({
    field: document.getElementById('datepicker'),
    summary_field: document.getElementById('summary_date'),
    format: 'Do-MM-YYYY',
    firstDay: 1,
    minDate: new Date(),
    toString(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        dateString = `${day}-${month}-${year}`
        return dateString;
    },

    onSelect: function (date) {
        format = 'Do MM YYYY',
            field.value = picker.toString(date)
        var selectedDate = field.value.toString(date, format)
        localStorage.setItem('selectedDate', selectedDate)
        document.getElementById('summary_date').innerHTML = selectedDate;
    }
});


document.addEventListener('alpine:init', () => {
    Alpine.data('ticket', () => ({

        // Calculate method will be called when the user selects a time slot. 
        calculate() {
            adult_LK_count = parseInt(this.adult_LK_count);
            child_LK_count = parseInt(this.child_LK_count);
            adult_FR_count = parseInt(this.adult_FR_count);
            child_FR_count = parseInt(this.child_FR_count);
            infant_count = parseInt(this.infant_count);

            // Price list
            var adult_LK_price_peak = 6;
            var child_LK_price_peak = 3;
            var adult_FR_price_peak = 13;
            var child_FR_price_peak = 8;
            var infant_price_peak = 0;

            var adult_LK_price_offPeak = 4;
            var child_LK_price_offPeak = 2;
            var adult_FR_price_offPeak = 10;
            var child_FR_price_offPeak = 5;
            var infant_price_offPeak = 0;
            var total = 0;

            // Total price list
            var adult_LK_total = 0;
            var child_LK_total = 0;
            var adult_FR_total = 0;
            var child_FR_total = 0;

            var peakCount = 0;
            var offPeakCount = 0;

            if (this.selectedTime.length == 1) {
                // Peak Hours        
                if (this.selectedTime == 3 || this.selectedTime == 4 || this.selectedTime == 5 || this.selectedTime == 8 || this.selectedTime == 9 || this.selectedTime == 10) {
                    total = (adult_LK_count * adult_LK_price_peak) + (child_LK_count * child_LK_price_peak) + (adult_FR_count * adult_FR_price_peak) + (child_FR_count * child_FR_price_peak) + (infant_count * infant_price_peak);
                    document.getElementById('total').innerHTML = total;
                    adult_LK_total = adult_LK_count * adult_LK_price_peak;
                    child_LK_total = child_LK_count * child_LK_price_peak;
                    adult_FR_total = adult_FR_count * adult_FR_price_peak;
                    child_FR_total = child_FR_count * child_FR_price_peak;
                    peakCount++;
                }
                // Off Peak Hours
                else {
                    total = (adult_LK_count * adult_LK_price_offPeak) + (child_LK_count * child_LK_price_offPeak) + (adult_FR_count * adult_FR_price_offPeak) + (child_FR_count * child_FR_price_offPeak) + (infant_count * infant_price_offPeak);
                    document.getElementById('total').innerHTML = total;
                    adult_LK_total = adult_LK_count * adult_LK_price_offPeak;
                    child_LK_total = child_LK_count * child_LK_price_offPeak;
                    adult_FR_total = adult_FR_count * adult_FR_price_offPeak;
                    child_FR_total = child_FR_count * child_FR_price_offPeak;
                    offPeakCount++;
                }

            }
            // If the user has selected more than one time slot, the price will be calculated based on the number of peak and off peak hours selected. The number of peak and off peak hours are calculated using a FOR loop.
            else if (this.selectedTime.length > 1) {

                // add a for loop to calculate the number of peak and off peak hours
                for (id in this.selectedTime) {
                    if (this.selectedTime[id] == 3 || this.selectedTime[id] == 4 || this.selectedTime[id] == 5 || this.selectedTime[id] == 8 || this.selectedTime[id] == 9 || this.selectedTime[id] == 10) {
                        peakCount++;
                    } else {
                        offPeakCount++;
                    }
                }

                // Calculation of total price for 1 peak hour and 1 off peak hour
                var total_peak = (adult_LK_count * adult_LK_price_peak) + (child_LK_count * child_LK_price_peak) + (adult_FR_count * adult_FR_price_peak) + (child_FR_count * child_FR_price_peak) + (infant_count * infant_price_peak);

                var total_offPeak = (adult_LK_count * adult_LK_price_offPeak) + (child_LK_count * child_LK_price_offPeak) + (adult_FR_count * adult_FR_price_offPeak) + (child_FR_count * child_FR_price_offPeak) + (infant_count * infant_price_offPeak);

                // Calculation of total price for all peak hours and all off peak hours
                total = (total_peak * peakCount) + (total_offPeak * offPeakCount);

                adult_LK_total = adult_LK_count * adult_LK_price_peak * peakCount + adult_LK_count * adult_LK_price_offPeak * offPeakCount;
                child_LK_total = child_LK_count * child_LK_price_peak * peakCount + child_LK_count * child_LK_price_offPeak * offPeakCount;
                adult_FR_total = adult_FR_count * adult_FR_price_peak * peakCount + adult_FR_count * adult_FR_price_offPeak * offPeakCount;
                child_FR_total = child_FR_count * child_FR_price_peak * peakCount + child_FR_count * child_FR_price_offPeak * offPeakCount;
                document.getElementById('total').innerHTML = total;

                // Start time and end time
                startTimeID = this.selectedTime[0];
                endTimeID = parseInt(this.selectedTime[this.selectedTime.length - 1]);
                var startTime = '';
                var endTime = '';
                switch (parseInt(startTimeID)) {
                    case 0:
                        startTime = '7.00 AM';
                        break;
                    case 1:
                        startTime = '8.00 AM';
                        break;
                    case 2:
                        startTime = '9.00 AM';
                        break;
                    case 3:
                        startTime = '10.00 AM';
                        break;
                    case 4:
                        startTime = '11.00 AM';
                        break;
                    case 5:
                        startTime = '12.00 PM';
                        break;
                    case 6:
                        startTime = '1.00 PM';
                        break;
                    case 7:
                        startTime = '2.00 PM';
                        break;
                    case 8:
                        startTime = '3.00 PM';
                        break;
                    case 9:
                        startTime = '4.00 PM';
                        break;
                    case 10:
                        startTime = '5.00 PM';
                        break;
                }

                switch (parseInt(endTimeID)) {
                    case 0:
                        endTime = '8.00 AM';
                        break;
                    case 1:
                        endTime = '9.00 AM';
                        break;
                    case 2:
                        endTime = '10.00 AM';
                        break;
                    case 3:
                        endTime = '11.00 AM';
                        break;
                    case 4:
                        endTime = '12.00 PM';
                        break;
                    case 5:
                        endTime = '1.00 PM';
                        break;
                    case 6:
                        endTime = '2.00 PM';
                        break;
                    case 7:
                        endTime = '3.00 PM';
                        break;
                    case 8:
                        endTime = '4.00 PM';
                        break;
                    case 9:
                        endTime = '5.00 PM';
                        break;
                    case 10:
                        endTime = '6.00 PM';
                        break;
                }

            }

            // Start time and end time
            startTimeID = this.selectedTime[0];
            endTimeID = parseInt(this.selectedTime[0]) + 1;
            var startTime = '';
            var endTime = '';
            switch (parseInt(startTimeID)) {
                case 0:
                    startTime = '7.00 AM';
                    break;
                case 1:
                    startTime = '8.00 AM';
                    break;
                case 2:
                    startTime = '9.00 AM';
                    break;
                case 3:
                    startTime = '10.00 AM';
                    break;
                case 4:
                    startTime = '11.00 AM';
                    break;
                case 5:
                    startTime = '12.00 PM';
                    break;
                case 6:
                    startTime = '1.00 PM';
                    break;
                case 7:
                    startTime = '2.00 PM';
                    break;
                case 8:
                    startTime = '3.00 PM';
                    break;
                case 9:
                    startTime = '4.00 PM';
                    break;
                case 10:
                    startTime = '5.00 PM';
                    break;
            }

            switch (parseInt(endTimeID)) {
                case 0:
                    endTime = '8.00 AM';
                    break;
                case 1:
                    endTime = '9.00 AM';
                    break;
                case 2:
                    endTime = '10.00 AM';
                    break;
                case 3:
                    endTime = '11.00 AM';
                    break;
                case 4:
                    endTime = '12.00 PM';
                    break;
                case 5:
                    endTime = '1.00 PM';
                    break;
                case 6:
                    endTime = '2.00 PM';
                    break;
                case 7:
                    endTime = '3.00 PM';
                    break;
                case 8:
                    endTime = '4.00 PM';
                    break;
                case 9:
                    endTime = '5.00 PM';
                    break;
                case 10:
                    endTime = '6.00 PM';
                    break;
            }

            localStorage.setItem('total', total)
            localStorage.setItem('adult_LK_total', adult_LK_total)
            localStorage.setItem('child_LK_total', child_LK_total)
            localStorage.setItem('adult_FR_total', adult_FR_total)
            localStorage.setItem('child_FR_total', child_FR_total)
            localStorage.setItem('offPeakCount', offPeakCount)
            localStorage.setItem('peakCount', peakCount)
            localStorage.setItem('startTime', startTime)
            localStorage.setItem('endTime', endTime)

        },
    }))

    Alpine.store("ticket", {
        name: "Ticket Model",
        timeSlots: [
            {
                id: 0,
                time: "7.00 AM - 8.00 AM"
            },
            {
                id: 1,
                time: "8.00 AM - 9.00 AM"
            },
            {
                id: 2,
                time: "9.00 AM - 10.00 AM"
            },
            {
                // Peak Hour
                id: 3,
                time: "10.00 AM - 11.00 AM"
            },
            {
                // Peak Hour
                id: 4,
                time: "11.00 AM - 12.00 PM"
            },
            {
                // Peak Hour
                id: 5,
                time: "12.00 PM - 1.00 PM"
            },
            {
                id: 6,
                time: "1.00 PM - 2.00 PM"
            },
            {
                id: 7,
                time: "2.00 PM - 3.00 PM"
            },
            {
                // Peak Hour
                id: 8,
                time: "3.00 PM - 4.00 PM"
            },
            {
                // Peak Hour
                id: 9,
                time: "4.00 PM - 5.00 PM"
            },
            {
                // Peak Hour
                id: 10,
                time: "5.00 PM - 6.00 PM"
            }
        ]
    })

});



document.getElementById('datepicker').addEventListener('change', function () {
    document.getElementById('datepicker').style.borderColor = "#E2E8F0";
    document.getElementById('dateInvalid').innerHTML = "";
});

