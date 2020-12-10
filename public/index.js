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
    // addTasksToArray();
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
        //Start of new js
        if (category === "daily"){
            var reqURL = '/addTask';
        }
        else if(category === 'misc'){
            var reqURL = '/addTaskMisc'
        }
        else {
            alert("Category is wrong!")
        }
        var taskRequest = new XMLHttpRequest();
        taskRequest.open('POST', reqURL);

        var reqBody = JSON.stringify({
            time: time,
            points: points,
            title: title,
            category: category
        });

        taskRequest.setRequestHeader('Content-type', 'application/json');
        taskRequest.addEventListener('load', function (event) {
            if (event.target.status === 200) {
                insertNewTask(title, points, time, category);
            }
            else {
                alert("Error storing task in database: " + event.target.response);
            }
        });
        taskRequest.send(reqBody);
        hideNewTaskModal();
        //Start of old js
        /*insertNewTask(title, points, time, category);
        hideNewTaskModal();*/
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
    // addTasksToArray();

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
            // New changes
            var titleToRemove = tasks[i].parentNode.parentNode.getAttribute("data-description");
            var categoryToRemove = "daily";
            console.log("== titleToRemove:", titleToRemove);
            console.log("== categoryToRemove:", categoryToRemove);
            console.log(tasks[i].parentNode.parentNode.getAttribute('data-points'));
            // End new changes
            updateExperience(tasks[i].parentNode.parentNode.getAttribute('data-points'));
            tasks[i].checked = false;
            tasks[i].parentNode.parentNode.remove();
            // addTasksToArray();
        }
    }

    var miscTasksContainer = document.getElementById('miscTasks');
    var miscTasks = miscTasksContainer.getElementsByClassName('task-check');

    for(var i = 0; i < miscTasks.length; i++) {
        if(miscTasks[i].checked) {
            // New changes
            var titleToRemove = miscTasks[i].parentNode.parentNode.getAttribute("data-description");
            var categoryToRemove = "misc";
            console.log("== titleToRemove:", titleToRemove);
            console.log("== categoryToRemove:", categoryToRemove);
            console.log(miscTasks[i].parentNode.parentNode.getAttribute('data-points'));
            // End new changes
            updateExperience(miscTasks[i].parentNode.parentNode.getAttribute('data-points'));
            miscTasks[i].checked = false;
            miscTasks[i].parentNode.parentNode.remove();
            // addTasksToArray();
        }
    }
    // New changes
    var removeRequest = new XMLHttpRequest();
    var removeURL = '/removeTask';
    removeRequest.open('POST', removeURL);

    var reqBody = JSON.stringify({
        titleToRemove: titleToRemove,
        categoryToRemove: categoryToRemove
    });

    removeRequest.setRequestHeader('Content-type', 'application/json');
    removeRequest.addEventListener('load', function (event) {
        if (event.target.status === 200) {
            // If stuff breaks, uncomment this, and the following addTasksToArrayFunction
            // addTasksToArray()
        }
        else {
            alert("Error removing task from database: " + event.target.response);
        }
    });
    console.log("== reqBody:", reqBody);
    removeRequest.send(reqBody);
    // End new changes

}

function updateExperience(points) {
    var statsDiv = document.getElementById('stats');

    var levelSpan = document.getElementById('level');
    var level = levelSpan.getAttribute('data-level');

    var experienceSpan = document.getElementById('experience');
    var experience = Number(experienceSpan.getAttribute('data-experience'));

    experience += Number(points);

    while(experience >= 100) {
        level++;
        experience -= 100;
    }

    var context = {
        level: level,
        experience: experience
    };

    var updateUserURL = '/updateUser'
    var userUpdateRequest = new XMLHttpRequest();
    userUpdateRequest.open('POST', updateUserURL);
    userUpdateRequest.setRequestHeader('Content-type', 'application/json');
    userUpdateRequest.addEventListener('load', function (event) {
        if (event.target.status === 200) {
            var statsHTML = Handlebars.templates.user(context);

            levelSpan.remove();
            experienceSpan.remove();

            statsDiv.insertAdjacentHTML('beforeend', statsHTML);
        }
        else {
            alert("Error updating user data: " + event.target.response);
        }
    });
    userUpdateRequest.send(JSON.stringify(context));

}