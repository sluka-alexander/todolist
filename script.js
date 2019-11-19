const date = document.getElementById("date");
const grey = document.getElementById('grey');
const form_task = document.getElementById('form');
const check_items = document.getElementById('check_items');

// const block_select = document.getElementById('container_sort');
const title = document.getElementById('title');
const tasks_doing = document.getElementById('tasks_doing');
const tasks_done = document.getElementById('tasks_done');
const sort_tasks = document.getElementById('sort_tasks');

const text = document.getElementById('text');
const button = document.getElementById('add_new_task');
const button_cleaner = document.getElementById('cleaner');


let list = [];
let list_done = [];
let id = 1;
let label = ' ';
let id_task_change = 0;
let task_change = '';

if (localStorage.getItem('todo') != undefined) {

    list = JSON.parse(localStorage.getItem('todo'));

    list = list.filter((e) => {
        return e !== null;
    });

    id = JSON.parse(localStorage.getItem('id'));
    list_done = JSON.parse(localStorage.getItem('todo_done'));
    list_done = list_done || [];
    list_done = list_done.filter((e) => {
        return e !== null;
    });

    out_all_task();
}

function clean_all_tasks() {
    button_cleaner.addEventListener('click', () => {
        localStorage.clear();
        window.location.reload();
    })
}

function add_task_html(title, text, id_task, color_label, way) {
    const item = `<div class="content" id="task_${id_task}" draggable="true" ondragstart="dragstart(event,this)" ondragend="dragend(this)">
        <div class="content_outside">
            <div class="label ${color_label}"></div>
            <div class="circle-border"></div>
            <div class="item">
                <div class="title_item" id="title_item">
                    <div class="title">${title}</div>
                    <div class="delete" id="${id_task}"></div>
                </div>
            </div>
            <div class="text">${text}</div>
        </div>
    </div>`;
    const position = 'beforeend';
    way.insertAdjacentHTML(position, item);
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
        sort_tasks.innerHTML = "";
        add_task_html(title.value, text.value, list.length + 1, label, tasks_doing);
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
    if (event.keyCode == 13 && title.value && text.value) {
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
        add_task_html(list[i].title, list[i].text, id_task, list[i].label, tasks_doing);
        id_task++;
    }
    let id_task_done = 1;
    for (let i in list_done) {
        add_task_html(list_done[i].title, list_done[i].text, 'done_' + id_task_done, list_done[i].label, tasks_done);
        id_task_done++;
    }
}

function date_today() {
    const options = {weekday: "short", month: "short", day: "numeric"};
    const today = new Date();

    date.innerHTML = today.toLocaleDateString("eng-ENG", options);
}

date_today();
clean_all_tasks()



