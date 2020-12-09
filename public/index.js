function insertNewTask(title, points, time) {
    var context = {
        time: time,
        points: points,
        title: title
    };

    var taskHTML = Handlebars.templates.task(context);
    console.log("==taskHTML:", taskHTML);

    var taskSection = document.getElementById('tasks');
    taskSection.insertAdjacentHTML('beforeEnd', taskHTML);


      // Create the containing <div> element.
//   var taskDiv = document.createElement('div');
//   taskDiv.classList.add('task');
//   taskDiv.setAttribute('data-time', time);
//   taskDiv.setAttribute('data-points', points);

//   /*
//    * Create the task-info-container <div> and all of its contents and add
//    * them into the task-contents <div>.
//    */
//   var taskInfoContainerDiv = document.createElement('div');
//   taskInfoContainerDiv.classList.add('task-info-container');
//   taskDiv.appendChild(taskInfoContainerDiv);

//   var taskCheck = document.createElement('input');
//   taskCheck.type = 'checkbox';
//   taskInfoContainerDiv.appendChild(taskCheck);

//   var spaceText1 = document.createTextNode(' ');
//   taskInfoContainerDiv.appendChild(spaceText1);

//   var taskDescriptionSpan = document.createElement('span');
//   taskDescriptionSpan.id = 'task-description';
//   taskDescriptionSpan.textContent = title;
//   taskInfoContainerDiv.appendChild(taskDescriptionSpan);

//   var spaceText2 = document.createTextNode(' ');
//   taskInfoContainerDiv.appendChild(spaceText2);

//   var taskPointsSpan = document.createElement('span');
//   taskPointsSpan.id = 'task-points';
//   taskPointsSpan.textContent = '(' + points + ' points)';
//   taskInfoContainerDiv.appendChild(taskPointsSpan);

//   /*
//    * Add the new task element into the DOM at the end of the tasks <section>.
//    */
//   var tasksSection = document.getElementById('tasks');
//   tasksSection.appendChild(taskDiv);

}

var allTasks = [];

function handleModalAcceptClick() {
    var title = document.getElementById('task-title-input').value;
    var points = document.getElementById('task-point-input').value;
    var time = document.getElementById('task-time-input').value;

    if(!title || !points || !time) {
        alert("You must fill out all of the fields!");
    } else {
        allTasks.push({
            title: title,
            points: points,
            time: time
        });
    }
    generateTasks();
    hideNewTaskModal();
}

function generateTasks() {
    var taskContainer = document.getElementById('tasks');
    while(taskContainer.lastChild) {
        taskContainer.removeChild(taskContainer.lastChild);
    }

    allTasks.forEach(function (post) {
        insertNewTask(post.title, post.points, post.time);
    });
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
}

function hideNewTaskModal() {
    var newTaskModal = document.getElementById('new-task-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    newTaskModal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');

    clearNewTaskModalInputs();
}

window.addEventListener('DOMContentLoaded', function() {
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
});
