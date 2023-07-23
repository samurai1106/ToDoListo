const inpt = document.querySelector('#task-inpt');
const AddBtn = document.querySelector('.second-btn');
const tasksContainer = document.querySelector('.tasks-container');
const OverSizeMsg = document.querySelector('.over-size-msg');
const EmptyFildMsg = document.querySelector('.empty-field-msg');
const RepeatedMsg = document.querySelector('.repeated-msg');
const SetIcon = document.querySelector('.settings-icon');
const SetBar = document.querySelector('.settings-bar');
const SettingIcons = document.querySelectorAll('.settings-bar i');
const SettingBars = document.querySelectorAll('.settings-bar .bars'); 
const ThemeColors = document.querySelectorAll('.color-theme ul li');
const root = document.querySelector(':root');
const AboutContainer = document.querySelector('.about-container');
const AboutCloseBtn = document.querySelector('.close-btn');
const CheckBox = document.querySelector('.check-box');
let TaskCount = 0;
let tasks = [];

inpt.focus(); // Starting with focusing on input field

if(inpt.value !== '') { // Reseting the input field after page refresh
    inpt.value = '';
}

// close About pop up
AboutCloseBtn.addEventListener('click',() => {
    AboutContainer.style.display = 'none'
})


// Check if localStorage contain save key 
if(localStorage.getItem('save')) {
    if(localStorage.getItem('save') === 'yes') {
        CheckBox.classList.add('save')
        if(localStorage.getItem('tasks')){
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
    }
    else {
        CheckBox.classList.remove('save')
        if(localStorage.getItem('tasks')){
            tasks = [];
        }
    }
}

getDataFromLocalStorage()

function CreatTask(taskTxt) {
    if(inpt.value.length > 150) { 
        OverSizeMsg.style.opacity = '1';
        setTimeout(() => {
        OverSizeMsg.style.opacity = '0';
        },1250)
        console.log(tasks)
    }
    else {
        const TaskObj = {
            title: taskTxt,
            id: null,
        }
        tasks.push(TaskObj);
        AutoNumSet(TaskObj);
        CheckRepeat(tasks);
        AddTaskCard(tasks);
        AddTaskToLocalStorage(tasks);
        console.log(tasks);
    }
}

// Creating the full card element
function AddTaskCard(tasks) {
    tasksContainer.innerHTML = '';
    tasks.forEach((task) => {
        let taskCard = document.createElement('div');
        taskCard.classList.add('task');
        taskCard.setAttribute('data-id',task.id);
        let taskNum = document.createElement('div');
        taskNum.classList.add('task-number');
        taskNum.append(document.createTextNode(task.id))
        let CardContent = document.createElement('p');
        CardContent.appendChild(document.createTextNode(task.title));
        let deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.id = 'dlt-btn';
        let XBtn = document.createElement('button');
        XBtn.appendChild(document.createTextNode('x'))
        XBtn.id = 'dlt-btn-2'
        taskCard.appendChild(CardContent);
        taskCard.appendChild(deleteBtn);
        taskCard.appendChild(XBtn);
        taskCard.appendChild(taskNum);
        tasksContainer.appendChild(taskCard);
    })
}

// Adding tasks to local storage
function AddTaskToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Setting automatically the numbers of tasks
function AutoNumSet(TaskObj) {
    for(let i = 0 ; i < tasks.length ; i++){ 
        TaskObj.id = i + 1;
    }
}

// Making sure the task is not repeated
function CheckRepeat(tasks) {
    if(TaskCount > 0){ 
        for (let i = 0; i < tasks.length-1; i++) {
            if(tasks[i].title === tasks[tasks.length-1].title){
                    tasks.pop();
                    RepeatedMsg.style.opacity = '1';
                    setTimeout(() => {
                        RepeatedMsg.style.opacity = '0';
                    },1250)
                    break;
                }
        } 
    }
}

// Assign tasks to taskContainer
function getDataFromLocalStorage() {
    if(localStorage.getItem('save') === 'yes') { //Check if save key value equal to yes
        let data = window.localStorage.getItem("tasks");
        if (data) {
          tasks = JSON.parse(data);
          AddTaskCard(tasks);
        }
    }
}

// Delete Task from delete btn
function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id != taskId);
    AddTaskToLocalStorage(tasks);
}

AddBtn.addEventListener('click',() => {
    // Making sure that the input field is not empty
    if(inpt.value !== ''){  
        CreatTask(inpt.value);
        inpt.value = '';
        inpt.focus();
        TaskCount++;
    }
    else {
        EmptyFildMsg.style.opacity = '1';
        setTimeout(() => {
            EmptyFildMsg.style.opacity = '0';
        },1250)
    }
})

tasksContainer.addEventListener('click',(ev) => {
    if(ev.target.id === 'dlt-btn-2') {
        ev.target.parentElement.remove();
        deleteTask(ev.target.parentElement.getAttribute('data-id'))
    }
})

// Gear icon function
SetIcon.onmouseenter = function() {
    SetBar.style.height = '70px';
    SetBar.style.visibility = 'visible';
    SetBar.style.opacity = '1'
    SetIcon.style.transform = 'rotate(180deg)';
}

SetIcon.onmouseleave = function() {
    SetBar.style.height = '0';
    SetBar.style.visibility = 'hidden';
    SetBar.style.opacity = '0';
    SetIcon.style.transform = 'rotate(0deg)';
}

SetIcon.addEventListener('touchstart', () => {
    SetBar.style.height = '70px';
    SetBar.style.visibility = 'visible';
    SetBar.style.opacity = '1'
    SetIcon.style.transform = 'rotate(180deg)';
})
SetIcon.addEventListener('touchmove', () => {
    SetBar.style.height = '0';
    SetBar.style.visibility = 'hidden';
    SetBar.style.opacity = '0';
    SetIcon.style.transform = 'rotate(0deg)';
})
// Gear icon function

// Gear bar function
SetBar.onmouseenter = function() {
    SetBar.style.height = '70px';
    SetBar.style.visibility = 'visible';
    SetBar.style.opacity = '1';
    SetIcon.style.transform = 'rotate(180deg)';
}

SetBar.onmouseleave = function() {
    SetBar.style.height = '0';
    SetBar.style.visibility = 'hidden';
    SetBar.style.opacity = '0';
    SetIcon.style.transform = 'rotate(0deg)';
    SettingBars.forEach((el) => {
        el.style.width = '0';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
    })
}
// Gear bar function

// Color palette icone function
SettingIcons[0].onclick = function() {
    SettingBars[0].style.width = '105px';
    SettingBars[0].style.visibility = 'visible';
    SettingBars[0].style.opacity = '1';
}

SettingBars[0].onmouseleave = function() {
    SettingBars[0].style.width = '0';
    SettingBars[0].style.visibility = 'hidden';
    SettingBars[0].style.opacity = '0';
}

SettingIcons[0].addEventListener('touchstart', () => {
    SettingBars[0].style.width = '105px';
    SettingBars[0].style.visibility = 'visible';
    SettingBars[0].style.opacity = '1';;
})

SettingIcons[0].addEventListener('touchmove', () => {
    SettingBars[0].style.width = '0';
    SettingBars[0].style.visibility = 'hidden';
    SettingBars[0].style.opacity = '0';
})
// Check if doea local storage has keys
if(localStorage.getItem('main-color') || localStorage.getItem('background-color')) {
    // directly set theme color chosen before
    root.style.cssText = `--main-color: ${localStorage.getItem('main-color')}; --background-color: ${localStorage.getItem('background-color')}`
}

// Creat local storage and set theme color
ThemeColors.forEach((el) => {
    el.addEventListener('click' , (ev) => {
        // [1] Creat local storage
        localStorage.setItem('main-color',`${ev.currentTarget.dataset.mainc}`)
        localStorage.setItem('background-color',`${ev.currentTarget.dataset.backc}`)
        // [2] Change color stocked on css variables
        root.style.cssText = `--main-color: ${localStorage.getItem('main-color')}; --background-color: ${localStorage.getItem('background-color')}`
    })
})
// Color palette icone function

// Storage icone function
SettingIcons[1].onclick = function() {
    SettingBars[1].style.width = '105px';
    SettingBars[1].style.visibility = 'visible';
    SettingBars[1].style.opacity = '1';
}

SettingBars[1].onmouseleave = function() {
    SettingBars[1].style.width = '0';
    SettingBars[1].style.visibility = 'hidden';
    SettingBars[1].style.opacity = '0';
}

CheckBox.onclick = function() {
    CheckBox.classList.toggle('save');
    if(CheckBox.classList.contains('save')) {
        localStorage.setItem('save','yes');
    }
    else {
        localStorage.setItem('save','no');
    }
}

SettingIcons[1].addEventListener('touchstart', () => {
    SettingBars[1].style.width = '105px';
    SettingBars[1].style.visibility = 'visible';
    SettingBars[1].style.opacity = '1';
})

SettingIcons[1].addEventListener('touchmove', () => {
    SettingBars[1].style.width = '0';
    SettingBars[1].style.visibility = 'hidden';
    SettingBars[1].style.opacity = '0';
})
// Storage icone function

// About icone function
SettingIcons[2].onclick = function() {
    AboutContainer.style.display = 'block';
}
// About icone function

