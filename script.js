const date = document.getElementById("date");
const open_form = document.getElementById('open_form');
const grey = document.getElementById('grey');
const form_task = document.getElementById('form');

function show_form(state) {
        form_task.style.display = state;
        grey.style.display = state;
}

// Show todays date
function date_today() {
    const options = {weekday: "short", month: "short", day: "numeric"};
    const today = new Date();

    date.innerHTML = today.toLocaleDateString("eng-ENG", options);
}

date_today();