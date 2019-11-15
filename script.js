const date = document.getElementById("date");
const grey = document.getElementById('grey');
const form_task = document.getElementById('form');

const title = document.getElementById('title');
const tasks = document.getElementById('tasks');
const text = document.getElementById('text');
const button = document.getElementById('add_new_task');
const button_cleaner = document.getElementById('cleaner')


let list = [];
let id = 1;

if(localStorage.getItem('todo')!= undefined){
    list = JSON.parse(localStorage.getItem('todo'));
    id = JSON.parse(localStorage.getItem('id'));
    console.log(list);
    out_all_task();
}

function clean_all_tasks() {
    button_cleaner.addEventListener('click', ()=>{
        localStorage.clear();
        window.location.reload();
    })
}

function add_task_html(title, text, id_task) {
    const item = `<div class="content">
        <div class="content_outside">
            <div class="label"></div>
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

function add_task() {
    const title_value = title.value;
    const text_value = text.value;
    if (title_value && text_value) {
        add_task_html(title.value,text.value,id);
        list.push({
            title: title.value,
            text: text.value,
            id: id
        });
        console.log(list);
    }
    id++;
    localStorage.setItem('todo', JSON.stringify(list));
    localStorage.setItem('id', JSON.stringify(id));
    title.value = '';
    text.value = '';
    grey.style.display = 'none';
    form_task.style.display = 'none';
}

button.addEventListener('click', add_task);

document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        add_task();
    }
});

function show_form(state) {
    form_task.style.display = state;
    grey.style.display = state;
}
function out_all_task() {
    let id_task = 1;
    for (let i in list){
        add_task_html(list[i].title,list[i].text,id_task);
        id_task++;
    }
}

// Show todays date
function date_today() {
    const options = {weekday: "short", month: "short", day: "numeric"};
    const today = new Date();

    date.innerHTML = today.toLocaleDateString("eng-ENG", options);
}

tasks.addEventListener('click',(event)=>{
    if (event.target.className != 'delete') return;
    let content = event.target.closest('.content');
    content.remove();
    let id_task = event.target.id;
    list.splice(id_task -1 , 1);
    localStorage.setItem('todo', JSON.stringify(list));
});

date_today();
clean_all_tasks();