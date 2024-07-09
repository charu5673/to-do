import './style.css';
import * as indexjs from './index.js'
import * as popup from './popUp.js'
const fns=require("date-fns");

export function bringSidebar(e)
{
    let sidebar=document.querySelector("#side");
    if(sidebar.classList.contains("extended"))
    removeSidebar();
    if(!e.currentTarget.classList.contains("selected"))
    e.target.classList.add("selected");
    sidebar.classList.add("extended");
    let display=document.querySelector("#todos_display");
    display.classList.add("reduced");
    sidebar.innerHTML='<div id="sideTodoName"><p class="sideTodoName">Task 1</p><svg class="editTodo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#224B58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#224B58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg><svg class="deleteTodo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#224B58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#224B58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#224B58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#224B58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#224B58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div><p id="sideTodoCreated">Created on: 1/11/11 11:11 pm</p><p id="sideTodoDue">Due on: 1/11/11 11:11 pm</p><p id="sideTodoDescription">vrevr gtrrg rvwfrrrrrrrr rgggggggggg rffffffffffffff rfffffffff rfrf  rf e rg gr gt4r tgr t rg trg tgf t</p><p id="sideTodoNotes">Notes<br>rvwe ecvrd ec dwbjfev  ver rev vre rev rev rv e e rv</p><div id="sideTodoChecklist"><p>Checklist</p></div><div id="sideTodoPriority"><p>Priority</p><div class="sidePriorityBox"></div></div>';
    let index=Array.prototype.indexOf.call(display.children,e.currentTarget);
    let todo=indexjs.projects[indexjs.currentProject].todos[index];
    let todoName=document.querySelector(".sideTodoName");
    todoName.textContent=todo.name;
    let todoCreated=document.querySelector("#sideTodoCreated");
    todoCreated.textContent="Created on: "+fns.format(todo.created,"Pp");
    let todoDue=document.querySelector("#sideTodoDue");
    todoDue.textContent="Due on: "+fns.format(todo.date,"P")+" "+todo.time;
    let todoDescription=document.querySelector("#sideTodoDescription");
    todoDescription.textContent=todo.description;
    let todoNotes=document.querySelector("#sideTodoNotes");
    todoNotes.innerHTML="Notes<br>"+todo.notes;
    let todoPriority=document.querySelector(".sidePriorityBox");
    if(todo.priority=="high")
    todoPriority.style.backgroundColor="#D56161";
    else if(todo.priority=="mid")
    todoPriority.style.backgroundColor="#D5D061";
    else
    todoPriority.style.backgroundColor="#63D561";
    let todoChecklist=document.querySelector("#sideTodoChecklist");
    let edit=document.querySelector(".editTodo");
    let delet=document.querySelector(".deleteTodo");
    addEditHandler(edit);
    addDeletHandler(delet);
    if(todo.checklist.length==0)
    todoChecklist.remove();
    else
    {
        for(var i=0;i<todo.checklist.length;i++)
        {
            let div=document.createElement("div");
            div.className="sideCheckList";
            let input=document.createElement("input");
            input.className="checklist_checkbox";
            input.type="checkbox";
            if(todo.checklistStatus[i])
            input.checked=true;
            let p=document.createElement("p");
            p.textContent=todo.checklist[i];
            p.className="checklist_text";
            if(todo.checklistStatus[i])
            p.classList.add("done");
            addChecklistHandler(input);
            div.appendChild(input);
            div.appendChild(p);
            todoChecklist.appendChild(div);
        }
    }
}

export function removeSidebar()
{
    let sidebar=document.querySelector("#side");
    sidebar.innerHTML='<button class="create_new_todo">Create new task +</button>';
    sidebar.classList.remove("extended");
    let d=document.querySelector("#todos_display");
    d.classList.remove("reduced");
    indexjs.createTodoHandler();
    for(var i=0;i<d.children.length;i++)
    {
        if(d.children[i].classList.contains("selected"))
        d.children[i].classList.remove("selected");
    }
}

function addChecklistHandler(input)
{
    input.addEventListener("click",function(e){
        let index;
        let d=document.querySelector("#todos_display");
        for(var i=0;i<d.children.length;i++)
        {
            if(d.children[i].classList.contains("selected"))
            {
                index=i;
                break;
            }
        }
        let todo=indexjs.projects[indexjs.currentProject].todos[index];
        if(todo.checklistStatus[Array.prototype.indexOf.call(e.target.parentNode.parentNode.children,e.target.parentNode)-1])
        {
            e.target.checked=false;
            e.target.parentNode.lastChild.classList.remove("done");
            indexjs.projects[indexjs.currentProject].todos[index].checklistStatus[Array.prototype.indexOf.call(e.target.parentNode.parentNode.children,e.target.parentNode)-1]=false;
        }
        else
        {
            e.target.checked=true;
            e.target.parentNode.lastChild.classList.add("done");
            indexjs.projects[indexjs.currentProject].todos[index].checklistStatus[Array.prototype.indexOf.call(e.target.parentNode.parentNode.children,e.target.parentNode)-1]=true;
        }
    });
}

function addEditHandler(edit)
{
    edit.addEventListener("click",function()
    {
        let d=document.querySelector("#todos_display");
        for(var i=0;i<d.children.length;i++)
        {
            if(d.children[i].classList.contains("selected"))
            break;
        }
        popup.editTodoPopup(indexjs.projects[indexjs.currentProject].todos[i]);
    });
}

function addDeletHandler(delet)
{
    delet.addEventListener("click",function(){

    });
}