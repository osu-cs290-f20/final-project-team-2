function insertNewTask(title, points, time, category) {
    var context = {
        time: time,
        points: points,
        title: title
    };

    var taskHTML = Handlebars.templates.task(context);
    console.log("==taskHTML:", taskHTML);

    if(category == 'daily') {
        var taskSection = document.getElementById('tasks');
    } else {
        var taskSection = document.getElementById('miscTasks')
    }
    taskSection.insertAdjacentHTML('beforeEnd', taskHTML);

    var taskCheckBoxes = document.getElementsByClassName('task-check');
    for (var i = 0; i < taskCheckBoxes.length; i++) {
        taskCheckBoxes[i].addEventListener('click', removeTask);
    }   
    addTasksToArray();
}

var allTasks = [];

function handleModalAcceptClick() {
    var title = document.getElementById('task-title-input').value;
    var points = document.getElementById('task-point-input').value;
    var time = document.getElementById('task-time-input').value;
    var category = document.querySelector('#task-category-fieldset input:checked').value;

    if(!title || !points || !time) {
        alert("You must fill out all of the fields!");
    } else {
        insertNewTask(title, points, time, category);
        hideNewTaskModal();
    }
}

function showNewTaskModal() {
    var newTaskModal = document.getElementById('new-task-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    newTaskModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
}

function clearNewTaskModalInputs() {
    var taskTestInputElements = [
        document.getElementById('task-title-input'),
        document.getElementById('task-point-input'),
        document.getElementById('task-time-input')
    ];

    taskTestInputElements.forEach(function (inputElem) {
        inputElem.value = '';
    })

    var checkedTaskCategoryButton = document.querySelector('#task-category-fieldset input[checked]');
    checkedTaskCategoryButton.checked = true;
}

function hideNewTaskModal() {
    var newTaskModal = document.getElementById('new-task-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    newTaskModal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');

    clearNewTaskModalInputs();
}

window.addEventListener('DOMContentLoaded', function() {
    addTasksToArray();

    var newTaskButton = document.getElementById('new-task-button');
    if(newTaskButton) {
        newTaskButton.addEventListener('click', showNewTaskModal);
    }

    var modalAcceptButton = document.getElementById('modal-accept');
    if(modalAcceptButton) {
        modalAcceptButton.addEventListener('click', handleModalAcceptClick);
    }

    var modalHideButtons = document.getElementsByClassName('modal-hide-button');
    for (var i = 0; i < modalHideButtons.length; i++) {
        modalHideButtons[i].addEventListener('click', hideNewTaskModal);
    }

    var taskCheckBoxes = document.getElementsByClassName('task-check');
    for (var i = 0; i < taskCheckBoxes.length; i++) {
        taskCheckBoxes[i].addEventListener('click', removeTask);
    }   
});

function removeTask(){
    console.log("clicked");
    var tasksContainer = document.getElementById('tasks');
    var tasks = tasksContainer.getElementsByClassName('task-check');

    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].checked){
            tasks[i].parentNode.parentNode.remove();
            addTasksToArray();
        }
    }

    var miscTasksContainer = document.getElementById('miscTasks');
    var miscTasks = miscTasksContainer.getElementsByClassName('task-check');

    for(var i = 0; i < miscTasks.length; i++) {
        if(miscTasks[i].checked) {
            miscTasks[i].parentNode.parentNode.remove();
            addTasksToArray();
        }
    }
}

function addTasksToArray() {
    for(var i = allTasks.length - 1; i >= 0; i--) {
        allTasks.pop();
    }

    var dailyTaskContainer = document.getElementById('tasks');
    var dailyTasks = dailyTaskContainer.getElementsByClassName('task');

    for(var i = 0; i < dailyTasks.length; i++) {
        allTasks.push({
            title: dailyTasks[i].getAttribute('data-description'),
            points: dailyTasks[i].getAttribute('data-points'),
            time: dailyTasks[i].getAttribute('data-time'),
            category: 'daily'
        });
        console.log(JSON.stringify(allTasks));
    }

    var miscTasksContainer = document.getElementById('miscTasks');
    var miscTasks = miscTasksContainer.getElementsByClassName('task');

    for(var i = 0; i < miscTasks.length; i++) {
        allTasks.push({
            title: miscTasks[i].getAttribute('data-description'),
            points: miscTasks[i].getAttribute('data-points'),
            time: dailyTasks[i].getAttribute('data-time'),
            category: 'misc'
        });
        console.log(JSON.stringify(allTasks));
    }

}