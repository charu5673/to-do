import './style.css';
import logo from './assets/images/to_do_logo.png';
import * as objects from './objects.js';
import * as domUpdates from './domUpdates.js';
import * as popUp from './popUp.js';
import * as sidebar from './sidebar.js'
const fns=require("date-fns");

var defaultTask=createDefaultTask();
export let projects=[];
export let currentProject=null;

function initialize()
{
    let logoElement=document.querySelector("#logo");
    logoElement.src=logo;
    createDefaultProject();
}
initialize();

function createDefaultTask()
{
    let date=new Date(2024,7,10,5,30);
    let defaultTask=objects.todoObj(
        "Demo Task","This is a demo task",date,fns.format(date,"p"),"You can add notes here",true,"mid",[]
    );
    return defaultTask;
}

function createDefaultProject()
{
    var defaultProject=objects.projectObj("Project 1",[defaultTask]);
    domUpdates.addProject(defaultProject);
    domUpdates.displayProject(defaultProject);
    projects.push(defaultProject);
    currentProject=0;
}



// event handlers


export function createTodoHandler()
{
    document.querySelector(".create_new_todo").addEventListener("click",function(e){
        if(currentProject==null)
        createDefaultProject();
        popUp.createTodoPopup();
    });
}
createTodoHandler();

document.querySelector("#todos_display").addEventListener("click",function(){
    let side=document.querySelector("#side");
    if(side.classList.contains("extended"))
    sidebar.removeSidebar();
});
