import './style.css';
import * as objects from './objects.js';
import * as index from './index.js';
const fns=require("date-fns");

export function createTodoPopup()
{
    var div=document.createElement("div");
    div.id="todo_popup";
    div.addEventListener("click",function(e){
        div.remove();
    });
    div.innerHTML='<div id="create_todo_popup_box"><label for="create_todo_name">Name</label><input type="text" id="create_todo_name"><label for="create_todo_description">Description</label><textarea id="create_todo_description"></textarea><label for="create_todo_date">Due date</label><input id="create_todo_date" type="date"><label for="create_todo_time">Due time</label><input type="time" id="create_todo_time"><label>Priority</label><input type="radio" class="create_todo_priority" name="create_todo_priority" value="high" style="background-color: #D56161;"><input type="radio" class="create_todo_priority" name="create_todo_priority" value="mid" style="background-color: #D5D061;"><input type="radio" class="create_todo_priority" name="create_todo_priority" value="low" style="background-color: #63D561;"><label for="create_todo_notes">Notes</label><textarea id="create_todo_notes"></textarea><div id="create_todo_checklist"><label>Checklist</label><button class="addCheck">+</button></div><div class="create_todo_checklist 1"><input type="text"><button class="removeCheck">-</button></div><button class="create_todo edit_todo">Create</button></div>';
    var body=document.querySelector("body");
    body.insertBefore(div,body.firstChild);
    document.querySelector("#create_todo_popup_box").addEventListener("click",function(e){
        e.stopPropagation();
    });
    addAddHandler();
    addRemoveHandler(document.querySelector(".removeCheck"));
    addCreateHandler();
}

export function editTodoPopup(todo)
{
    var div=document.createElement("div");
    div.id="todo_popup";
    div.addEventListener("click",function(e){
        div.remove();
    });
    div.innerHTML='<div id="create_todo_popup_box"><label for="create_todo_name">Name</label><input type="text" id="create_todo_name"><label for="create_todo_description">Description</label><textarea id="create_todo_description"></textarea><label for="create_todo_date">Due date</label><input id="create_todo_date" type="date"><label for="create_todo_time">Due time</label><input type="time" id="create_todo_time"><label>Priority</label><input type="radio" class="create_todo_priority" name="create_todo_priority" value="high" style="background-color: #D56161;"><input type="radio" class="create_todo_priority" name="create_todo_priority" value="mid" style="background-color: #D5D061;"><input type="radio" class="create_todo_priority" name="create_todo_priority" value="low" style="background-color: #63D561;"><label for="create_todo_notes">Notes</label><textarea id="create_todo_notes"></textarea><div id="create_todo_checklist"><label>Checklist</label><button class="addCheck">+</button></div><div class="create_todo_checklist 1"><input type="text"><button class="removeCheck">-</button></div><button class="create_todo edit_todo">Edit</button></div>';
    var body=document.querySelector("body");
    body.insertBefore(div,body.firstChild);
    document.querySelector("#create_todo_popup_box").addEventListener("click",function(e){
        e.stopPropagation();
    });
    addAddHandler();
    addRemoveHandler(document.querySelector(".removeCheck"));
    var input=document.querySelector("#create_todo_name");
    input.value=todo.name;
    input=document.querySelector("#create_todo_description");
    input.textContent=todo.description;
    input=document.querySelector("#create_todo_date");
    input.value=fns.format(todo.due,"yyyy-MM-dd");
    input=document.querySelector("#create_todo_time");
    input.value=fns.format(todo.due,"HH:mm:ss.SSS");
    input=document.querySelectorAll(".create_todo_priority");
    if(todo.priority=="high")
    input[0].checked=true;
    else if(todo.priority=="mid")
    input[1].checked=true;
    else if(todo.priority=="low")
    input[2].checked=true;
    input=document.querySelector("#create_todo_notes");
    input.textContent=todo.notes;
}

export function addCheckList(i)
{
    let div=document.createElement("div");
    div.classList.add("create_todo_checklist",""+i);
    let input=document.createElement("input");
    input.type="text";
    let button=document.createElement("button");
    button.textContent="-";
    addRemoveHandler(button);
    div.appendChild(input);
    div.appendChild(button);
    let a=document.querySelector(".create_todo");
    let box=document.querySelector("#create_todo_popup_box");
    box.insertBefore(div,a);
}

function addAddHandler()
{
    let button=document.querySelector(".addCheck");
    button.addEventListener("click",function(){
        addCheckList(document.querySelectorAll(".create_todo_checklist").length+1);
    });
}

function addRemoveHandler(button)
{
    button.addEventListener("click",function(e){
        let div=e.target.parentElement;
        div.remove();
        div=document.querySelectorAll(".create_todo_checklist");
        for(var i=0;i<div.length;i++)
        {
            div[i].className="create_todo_checklist";
            div[i].classList.add(""+(i+1));
        }
    });
}

function addCreateHandler()
{
    document.querySelector(".create_todo").addEventListener("click",function(e){
        let flag=true;
        let name=document.querySelector("#create_todo_name");
        let description=document.querySelector("#create_todo_description").textContent;
        let date=document.querySelector("#create_todo_date");
        let time=document.querySelector("#create_todo_time").value;
        let notes=document.querySelector("#create_todo_notes").textContent;
        let p=document.querySelectorAll(".create_todo_priority"),priority=null;
        for(var i=0;i<p.length;i++)
        {
            if(p[i].checked)
            {
                priority=p[i];
                break;
            }
        }
        let checklist=document.querySelectorAll(".create_todo_checklist");
        if(priority==null||priority==undefined)
        {
            flag=false;
            p.forEach((i)=>{i.style.borderBottom="3px solid #FF0000"});
        }
        if(name.value==undefined||name.value==null||name.value=="")
        {
            flag=false;
            name.style.border="3px solid #FF0000";
        }
        else
        name=name.value;
        if(date.value==undefined||date.value==null||date.value=="")
        {
            flag=false;
            date.style.border="3px solid #FF0000";
        }
        else
        date=date.value;

        if(flag)
        {
            let c=[];
            for(var i=0;i<checklist.length;i++)
            {
                let s=checklist[i].firstChild.textContent;
                if(s==""||s==null||s==undefined)
                continue;
                c.push(s);
            }
            let newTask=objects.todoObj(
            name,
            description,
            date,
            notes,
            time,
            priority.value,
            c);
            index.projects[index.currentProject].todos.push(newTask);
            document.querySelector("#todo_popup").remove();
            let a=2;
        }
        else
        {
            e.target.style.backgroundColor="#FF0000";
            p=document.createElement("p");
            p.textContent="Please fill the required values.";
            p.style.color="#FF0000";
            document.querySelector("#create_todo_popup_box").insertBefore(p,document.querySelector("#create_todo_popup_box").firstChild);
        }
    });
}
