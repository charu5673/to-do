import './style.css';
import logo from './assets/images/to_do_logo.png';
import * as objects from './objects.js';
import * as domUpdates from './domUpdates.js';
import * as popUp from './popUp.js';

var defaultTask;
export let projects=[];
export let currentProject=null;

function initialize()
{
    let logoElement=document.querySelector("#logo");
    logoElement.src=logo;
    defaultTask=objects.todoObj(
        "Demo Task","This is a demo task",new Date(2024,7,10,5,30),"You can add notes here",true,"mid",[]
    );
    createDefaultProject();
}
initialize();

function createDefaultProject()
{
    var defaultProject=objects.projectObj("Project 1",[defaultTask]);
    domUpdates.addProject(defaultProject);
    domUpdates.displayProject(defaultProject);
    projects.push(defaultProject);
    currentProject=0;
}



// event handlers

document.querySelector(".create_new_todo").addEventListener("click",function(e){
    if(currentProject==null)
    createDefaultProject();
    popUp.createTodoPopup();
});


