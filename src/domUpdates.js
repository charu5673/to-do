import './style.css'
import * as indexjs from './index.js';
import * as sidebar from './sidebar.js';
import * as storage from './storage.js';
const fns = require('date-fns');

export function displayProject(project)
{
    let projectsList=document.querySelector("#projects_list");
    var selectedProject=null;
    for(var i=0;i<projectsList.options.length;i++)
    {
        if(projectsList.options[i].value==project.name)
        {
            selectedProject=i;
            projectsList.options[i].className="selected";
            break;
        }
    }
    if(selectedProject==null)
    console.log(project+"doesn't exist");
    else
    {
        projectsList.classList.remove("empty");
        projectsList.selectedIndex=selectedProject;
        let todosDisplay=document.querySelector("#todos_display");
        todosDisplay.innerHTML="";
        displayTodos(todosDisplay,project.todos);
        for(var i=0;i<projectsList.options.length;i++)
        {
            if(i!=selectedProject)
            projectsList.options[i].classList.remove("selected");
        }
    }
}

export function displayTodos(todosDisplay,todos)
{
    for(var i=0;i<todos.length;i++)
    {
        let todoDiv=createTodoDiv(todos[i]);
        if(todos[i].done)
        {
            todoDiv.classList.add("done");
            todoDiv.childNodes[0].childNodes[1].checked=true;
        }
        todosDisplay.appendChild(todoDiv);
    }
}

export function createTodoDiv(todo)
{
    let outerDiv=document.createElement("div");
    outerDiv.classList.add("todo","priority_"+todo.priority);
    let row1Div=document.createElement("div");
    row1Div.className=("todo_row1");
    let nameDiv=document.createElement("div");
    nameDiv.textContent=todo.name;
    nameDiv.className="todo_name";
    let checkInput=document.createElement("input");
    checkInput.type="checkbox";
    checkInput.className="todo_checkbox";
    addCheckHandler(checkInput);
    row1Div.appendChild(nameDiv);
    row1Div.appendChild(checkInput);
    outerDiv.appendChild(row1Div);
    let row2Div=document.createElement("div");
    row2Div.className="todo_row2";
    let created=document.createElement("div");
    created.className="todo_created";
    created.textContent="Created on: "+fns.format(todo.created,"P");
    let due=document.createElement("div");
    due.className="todo_due";
    due.textContent="Due on: "+fns.format(todo.date,"P");
    row2Div.appendChild(created);
    row2Div.appendChild(due);
    outerDiv.appendChild(row2Div);
    addSidebarHandler(outerDiv);
    return outerDiv;
}

export function addProject(project)
{
    let projectsList=document.querySelector("#projects_list");
    let option=document.createElement("option");
    option.value=project.name;
    option.textContent=project.name;
    projectsList.appendChild(option);
}

export function displayTodo(todo)
{
    let todosDisplay=document.querySelector("#todos_display");
    todosDisplay.appendChild(createTodoDiv(todo));
}

export function reDisplayTodo(todo,i)
{
    let todosDisplay=document.querySelector("#todos_display");
    let reqDiv=todosDisplay.children[i];
    todosDisplay.insertBefore(createTodoDiv(todo),reqDiv);
    reqDiv.remove();
}

function addCheckHandler(check)
{
    check.addEventListener("click",function(e){
        let parent=e.target.parentNode.parentNode;
        var index = Array.prototype.indexOf.call(parent.parentNode.children, parent);
        if(parent.classList.contains("done"))
        {
            parent.classList.remove("done");
            indexjs.projects[indexjs.currentProject].todos[index].done=false;
            storage.setLocalStorage();
        }
        else
        {
            parent.classList.add("done");
            indexjs.projects[indexjs.currentProject].todos[index].done=true;
            storage.setLocalStorage();
        }
        e.stopPropagation();
    });
}

function addSidebarHandler(div)
{
    div.addEventListener("click",function(e){
        let a=e.target;
        while(true)
        {
            if(a.classList.contains("todo"))
            {
                a.classList.add("selected");
                break;
            }
            a=a.parentElement;
        }
        sidebar.bringSidebar(e);
        e.stopPropagation();
    });
}