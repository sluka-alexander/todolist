const date = document.getElementById("date");
const grey = document.getElementById('grey');
const form_task = document.getElementById('form');
const check_items = document.getElementById('check_items');

// const block_select = document.getElementById('container_sort');
const sort_tasks = document.getElementById('sort_tasks');

const title = document.getElementById('title');
const tasks = document.getElementById('tasks');
const text = document.getElementById('text');
const button = document.getElementById('add_new_task');
const button_cleaner = document.getElementById('cleaner');

let list = [];
let id = 1;
let label = ' ';

if (localStorage.getItem('todo') != undefined) {
    list = JSON.parse(localStorage.getItem('todo'));
    id = JSON.parse(localStorage.getItem('id'));
    console.log(list);
    out_all_task();
}

function clean_all_tasks() {
    button_cleaner.addEventListener('click', () => {
        localStorage.clear();
        window.location.reload();
    })
}

function add_task_html(title, text, id_task, color_label) {
    const item = `<div class="content">
        <div class="content_outside">
            <div class="label ${color_label}"></div>
            <div class="circle-border"></div>
            <div class="item">
                <div class="title_item">
                    <div class="title">${title}</div>
                    <div class="delete" id="${id_task}"></div>
                </div>
            </div>
            <div class="text">${text}</div>
        </div>
    </div>`;
    const position = 'beforeend';
    tasks.insertAdjacentHTML(position, item);
}

form_task.addEventListener("click", (event) => {
    let id_task = event.target.id;
    if (event.target.className != 'radio_button') return;
    label = id_task;
    console.log(label);
});

function add_task() {
    const title_value = title.value;
    const text_value = text.value;
    if (title_value && text_value) {
        add_task_html(title.value, text.value, list.length + 1, label);
        list.push({
            title: title.value,
            text: text.value,
            id: id,
            label: label
        });
        console.log(list);
        grey.style.display = 'none';
        form_task.style.display = 'none';
        check_items.style.display = 'none';
        title.value = '';
        text.value = '';
    } else {
        check_items.style.display = 'block';
    }
    id++;
    localStorage.setItem('todo', JSON.stringify(list));
    localStorage.setItem('id', JSON.stringify(id));
}

button.addEventListener('click', add_task);

document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        add_task();
    }
});

function show_form(state) {
    form_task.style.display = state;
    grey.style.display = state;
    check_items.style.display = 'none';
}

function out_all_task() {
    let id_task = 1;
    for (let i in list) {
        add_task_html(list[i].title, list[i].text, id_task, list[i].label);
        id_task++;
    }
}

function date_today() {
    const options = {weekday: "short", month: "short", day: "numeric"};
    const today = new Date();

    date.innerHTML = today.toLocaleDateString("eng-ENG", options);
}

tasks.addEventListener('click', (event) => {
    if (event.target.className != 'delete') return;
    let content = event.target.closest('.content');
    content.remove();
    let id_task = event.target.id;
    list.splice(id_task - 1, 1);
    localStorage.setItem('todo', JSON.stringify(list));
});
date_today();
clean_all_tasks()

// ------------------------Sort------------------------
const red = document.getElementById('red_sort');
const green = document.getElementById('green_sort');
const blue = document.getElementById('blue_sort');

red.addEventListener("click", () => {
    sort_task_func('red');
});
green.addEventListener("click", () => {
    sort_task_func('green');
});
blue.addEventListener("click", () => {
    sort_task_func('blue');
});

function sort_task_func(color) {
    sort_tasks.innerHTML = "";
    let sort_tasks_arr = list.filter((el) => {
        return el.label == color;
    })
    out_all_sort_task(sort_tasks_arr);
}

function out_all_sort_task(sort_tasks_arr) {
    let id_task = 0;
    for (let i in sort_tasks_arr) {
        add_sort_task_html(sort_tasks_arr[i].title, sort_tasks_arr[i].text, sort_tasks_arr[i].label);
        id_task++;
    }
}
function add_sort_task_html(title, text, color) {
    const item = `<div class="content_sort">
            <div class="content_outside">
                <div class="title">
                    ${title}
                </div>
                <div class="line ${color}"></div>
                <div class="text">
                    ${text}
                </div>
            </div>
        </div>`;
    const position = 'beforeend';
    sort_tasks.insertAdjacentHTML(position, item);
}

// block_select.addEventListener('click', event => {
//     if (event.target.className != 'button_sort') return;
//     let id_label = ''
//     id_label = event.target.id.replace('_sort', ' ');
//     let id = 0;
//     for (let i in list){
//         if (list.label == id_label){
//             id++
//         }
//     }
//     console.log(id)
//     // let sort_list = list.filter((value) => {
//     //     return value.label == id_label;
//     // });
// });
