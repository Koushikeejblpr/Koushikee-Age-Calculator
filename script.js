// Get references to all necessary DOM elements
const dobInput = document.getElementById('dob');

const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');

const totalMonthsSpan = document.getElementById('total-months');
const totalWeeksSpan = document.getElementById('total-weeks');
const totalDaysSpan = document.getElementById('total-days');
const totalHoursSpan = document.getElementById('total-hours');
const totalMinutesSpan = document.getElementById('total-minutes');
const totalSecondsSpan = document.getElementById('total-seconds');

const resultsContainer = document.getElementById('results-container');
const errorMessage = document.getElementById('error-message');

/**
 * Calculates the age based on the selected date of birth and updates the UI.
 */
function calculateAge() {
    const dobValue = dobInput.value;
    // If no date is selected, reset the UI and exit
    if (!dobValue) {
        resetUI();
        return;
    }

    const birthDate = new Date(dobValue);
    const today = new Date();

    // If the selected date is in the future, show an error and exit
    if (birthDate > today) {
        showError();
        return;
    }

    // Hide any previous error messages
    hideError();
    
    // --- Core age calculation (Years, Months, Days) ---
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust days and months if the current day/month is less than the birth day/month
    if (days < 0) {
        months--;
        // Get the last day of the previous month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Update the primary age display
    yearsSpan.textContent = years;
    monthsSpan.textContent = months;
    daysSpan.textContent = days;
    
    // --- Detailed breakdown calculation ---
    const diffInMs = today.getTime() - birthDate.getTime();
    const diffInSeconds = diffInMs / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(diffInDays / 7);

    // Update the detailed breakdown display with formatted numbers
    totalMonthsSpan.textContent = totalMonths.toLocaleString();
    totalWeeksSpan.textContent = totalWeeks.toLocaleString();
    totalDaysSpan.textContent = Math.floor(diffInDays).toLocaleString();
    totalHoursSpan.textContent = Math.floor(diffInHours).toLocaleString();
    totalMinutesSpan.textContent = Math.floor(diffInMinutes).toLocaleString();
    totalSecondsSpan.textContent = Math.floor(diffInSeconds).toLocaleString();
    
    // Make the results container visible
    resultsContainer.classList.remove('hidden');
}

/**
 * Resets the UI to its initial state, clearing all results.
 */
function resetUI() {
    resultsContainer.classList.add('hidden');
    hideError();
    const defaultText = '--';
    yearsSpan.textContent = defaultText;
    monthsSpan.textContent = defaultText;
    daysSpan.textContent = defaultText;
    totalMonthsSpan.textContent = defaultText;
    totalWeeksSpan.textContent = defaultText;
    totalDaysSpan.textContent = defaultText;
    totalHoursSpan.textContent = defaultText;
    totalMinutesSpan.textContent = defaultText;
    totalSecondsSpan.textContent = defaultText;
}

/**
 * Hides the results and shows the error message.
 */
function showError() {
    resultsContainer.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

/**
 * Hides the error message.
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

// Add an event listener to the date input to trigger the calculation on change
dobInput.addEventListener('input', calculateAge);
