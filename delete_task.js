tasks_doing.addEventListener('click', (event) => {
    remove(list, 'todo');
});

tasks_done.addEventListener('click', (event) => {
    remove(list_done, 'todo_done');
});

function remove(array, localstorage) {
    sort_tasks.innerHTML = "";
    if (event.target.className != 'delete') return;
    let content = event.target.closest('.content');
    content.remove();
    let id_task = event.target.id.replace(/\D+/g, '');
    console.log(id_task);
    delete array[id_task - 1];
    localStorage.setItem(localstorage, JSON.stringify(array));
}