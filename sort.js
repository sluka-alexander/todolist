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
        return el.label === color;
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
