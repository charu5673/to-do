import './style.css';
import logo from './assets/images/to_do_logo.png';
import * as objects from './objects.js';
import * as domUpdates from './domUpdates.js';
import * as popUp from './popUp.js';
import * as storage from './storage.js';
import * as sidebar from './sidebar.js'
const fns=require("date-fns");

export let projects=[];
export let currentProject=null;

if(localStorage.getItem("projects"))
{
    projects=storage.getLocalStorage();
    currentProject=0;
}

function initialize()
{
    let logoElement=document.querySelector("#logo");
    logoElement.src=logo;
    if(projects.length==0)
    {
        let defaultProject=createDefaultProject();
        domUpdates.addProject(defaultProject);
        domUpdates.displayProject(defaultProject);
        projects.push(defaultProject);
        storage.setLocalStorage();
        currentProject=0;
    }
    initializeDropDown();
    domUpdates.displayProject(projects[0]);
}
initialize();

function initializeDropDown()
{
    let d=document.querySelector("#projects_list");
    d.innerHTML="";
    for(var i=0;i<projects.length;i++)
    {
        domUpdates.addProject(projects[i]);
    }
}

function createDefaultTask()
{
    let date=new Date(2024,7,10,5,30);
    let defaultTask=objects.todoObj(
        "Demo Task","This is a demo task",date,fns.format(date,"p"),"You can add notes here",true,"mid",["Checklist item 1","Checklist item 2"]
    );
    return defaultTask;
}

export function createDefaultProject()
{
    var defaultProject=objects.projectObj("Project 1",[createDefaultTask()]);
    currentProject=0;
    return defaultProject;
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

export function deletProjectHandler()
{
    document.querySelector(".delet_project").addEventListener("click",function(e){
        popUp.addDeletProjectHandler();
    });
}
deletProjectHandler();

document.querySelector("#create_project").addEventListener("click",function(){
    popUp.createProjectPopup();
});

document.querySelector("#projects_list").addEventListener("input",function(e){
    sidebar.removeSidebar({target:document.querySelector(".todo.selected")});
    for(var i=0;i<projects.length;i++)
    {
        if(projects[i].name==e.target.value)
        break;
    }
    if(projects[i].todos.length==0)
    {
        projects[i].todos.push(createDefaultTask());
        storage.setLocalStorage();
    }
    domUpdates.displayProject(projects[i]);
    currentProject=i;
});
