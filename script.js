const date = document.getElementById("date");
const grey = document.getElementById('grey');
const form_task = document.getElementById('form');

const title = document.getElementById('title');
const tasks = document.getElementById('tasks');
const text = document.getElementById('text');
const button = document.getElementById('add_new_task');

let list = [];
let id = 1;

function add_task() {
    const title_value = title.value;
    const text_value = text.value;
    if (title_value && text_value) {
        list.push({
            title: title.value,
            text: text.value,
            id: id
        });
        console.log(list);
    }
    id++;
    title.value = '';
    text.value = '';
}

button.addEventListener('click', add_task);


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

