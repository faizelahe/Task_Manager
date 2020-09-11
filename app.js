const ul = document.querySelector('.collection');
const addBtn = document.querySelector('.add-task');
const task = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

document.addEventListener('DOMContentLoaded', addFromLS);
task.addEventListener('keypress', capitalize);
filter.addEventListener('keyup', filterTasks);
addBtn.addEventListener('click', addFunc);
ul.addEventListener('click', removeFunc);
clearBtn.addEventListener('click', clearFunc);

function addFunc(e) {
    if (task.value === '') {
        alert('Please Enter A Value');
    } else {

        li = document.createElement('li');
        a = document.createElement('a');
        i = document.createElement('i');

        li.className = 'collection-item';
        li.textContent = task.value;
        a.className = 'delete-item secondary-content';
        i.className = 'fa fa-remove';

        a.appendChild(i);
        li.appendChild(a);
        ul.appendChild(li);

        let taskArr;

        if (localStorage.getItem('tasks') === null) {
            taskArr = [];
        } else {
            taskArr = JSON.parse(localStorage.getItem('tasks'));
        };

        taskArr.push(task.value);

        localStorage.setItem('tasks', JSON.stringify(taskArr));

    };

    task.value = '';

    e.preventDefault();
};

function addFromLS(e) {
    let taskArr;

    if (localStorage.getItem('tasks') === null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(localStorage.getItem('tasks'));
    };

    localStorage.setItem('tasks', JSON.stringify(taskArr));

    taskArr.forEach(function (taskItem) {
        li = document.createElement('li');
        a = document.createElement('a');
        i = document.createElement('i');

        li.className = 'collection-item';
        li.textContent = taskItem;
        a.className = 'delete-item secondary-content';
        i.className = 'fa fa-remove';
        a.appendChild(i);
        li.appendChild(a);
        ul.appendChild(li);
    });

    task.value = '';

    e.preventDefault();
};

function removeFunc(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        removeFromLS(e.target.parentElement.parentElement);
    };

    e.preventDefault();
};

function removeFromLS(item) {
    let taskArr;

    if (localStorage.getItem('tasks') === null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(localStorage.getItem('tasks'));
    };

    taskIndex = taskArr.indexOf(item.textContent);
    taskArr.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(taskArr));

};

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        };
    });
};

function clearFunc(e) {
    ul.innerHTML = '';

    localStorage.clear();

    e.preventDefault();
}

function capitalize(e) {
    if (task.value.length == 1) {
        task.value = task.value.toUpperCase();
    };
};