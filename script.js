document.getElementById('submitBtn').addEventListener('click', function() {
    // Hide the button in the PDF using the 'hide-in-pdf' class
    document.getElementById('submitBtn').classList.add('hide-in-pdf');

    // The element you want to convert to PDF (in this case, the entire form)
    const element = document.querySelector('.container'); // Adjust this if needed

    // Options for the PDF generation
    const options = {
        margin:       0,           // Set margins to zero to avoid extra space
        filename:     'Calibration_Report_Gauge.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 5 }, // Reduce the scale to fit content better
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate the PDF and download
    html2pdf().from(element).set(options).save().then(() => {
        // Remove the 'hide-in-pdf' class after the PDF has been generated
        document.getElementById('submitBtn').classList.remove('hide-in-pdf');
    });
});


// Get all the checkboxes within the table container
document.querySelectorAll('.container input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            // Uncheck all other checkboxes in the container
            document.querySelectorAll('.container input[type="checkbox"]').forEach((otherCheckbox) => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});



function syncDropdown(targetId, value) {
    document.getElementById(targetId).value = value;
}

document.addEventListener('DOMContentLoaded', function() {
    // Function to calculate percentage error for before and after calibration
    function calculateError(beforeValue, expectedValue, expectedOutput1, expectedOutput5) {
        if (expectedValue !== 0 && expectedOutput5 !== expectedOutput1) {
            return ((beforeValue - expectedValue) / (expectedOutput5 - expectedOutput1)) * 100;
        }
        return 0; // Prevent division by zero or invalid range
    }

    // Function to update errors based on the row number
    function updateErrors(rowNumber) {
        // Get input values for before and after calibration
        let beforeIncr = parseFloat(document.querySelector(`input[name="before_incr_${rowNumber}"]`)?.value) || 0;
        let afterIncr = parseFloat(document.querySelector(`input[name="after_incr_${rowNumber}"]`)?.value) || 0;
        let expectedOutput = parseFloat(document.querySelector(`input[name="expected_output_${rowNumber}"]`)?.value) || 0;
        let expectedOutput1 = parseFloat(document.querySelector(`input[name="expected_output_1"]`)?.value) || 0;
        let expectedOutput5 = parseFloat(document.querySelector(`input[name="expected_output_5"]`)?.value) || 0;

        // Calculate errors using the new formula
        let errorBeforeCal = calculateError(beforeIncr, expectedOutput, expectedOutput1, expectedOutput5);
        let errorAfterCal = calculateError(afterIncr, expectedOutput, expectedOutput1, expectedOutput5);

        // Update the error values in the display
        if (document.getElementById(`error_before_cal_${rowNumber}`)) {
            document.getElementById(`error_before_cal_${rowNumber}`).textContent = errorBeforeCal.toFixed(2);
        }
        if (document.getElementById(`error_after_cal_${rowNumber}`)) {
            document.getElementById(`error_after_cal_${rowNumber}`).textContent = errorAfterCal.toFixed(2);
        }
    }

    // Add event listeners to input fields to update errors on input change
    for (let i = 1; i <= 5; i++) {
        const beforeIncrField = document.querySelector(`input[name="before_incr_${i}"]`);
        const afterIncrField = document.querySelector(`input[name="after_incr_${i}"]`);

        if (beforeIncrField) {
            beforeIncrField.addEventListener('input', function() {
                updateErrors(i);
            });
        }
        if (afterIncrField) {
            afterIncrField.addEventListener('input', function() {
                updateErrors(i);
            });
        }
    }

    // Generate PDF functionality
    /*const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const container = document.querySelector('.container');
            if (container) {
                html2pdf().from(container).save('Calibration_Report.pdf');
            }
        });
    }*/
});



    


