function dragstart(ev, el) {
    ev.dataTransfer.setData("task", ev.target.id);
    setTimeout(() => {
        el.className = 'invisible'
    }, 0);
    id_task_change = Number(ev.target.id.replace(/\D+/g, ''));
    task_change = ev.target.id.replace(/[^a-z]/g, '');
}

function dragend(el) {
    el.className = 'content'
}

function allowDraw(ev) {
    ev.preventDefault();
}

function drop(ev, block, arr_add, arr_del, stat) {
    list_done = list_done || [];
    ev.preventDefault();
    let data = ev.dataTransfer.getData("task");
    block.appendChild(document.getElementById(data));
    block.className = 'tasks';
    if (task_change == stat) {
        arr_add.push(arr_del[id_task_change - 1]);
        delete arr_del[id_task_change - 1];
        localStorage.setItem('todo', JSON.stringify(list));
        localStorage.setItem('todo_done', JSON.stringify(list_done));
    }
}

function dragenter(el) {
    el.className = 'dragenter';
}

function dragleave(el) {
    el.className = 'tasks'
}