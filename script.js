const date = document.getElementById("date");

// Show todays date
function date_today() {
    const options = {weekday : "short", month:"short", day:"numeric"};
    const today = new Date();

    date.innerHTML = today.toLocaleDateString("eng-ENG", options);
}
date_today();