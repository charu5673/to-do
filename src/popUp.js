import './style.css';
const fns=require("date-fns");

export function createTodoPopup()
{
    var div=document.createElement("div");
    div.id="todo_popup";
    div.innerHTML='<div id="create_todo_popup_box"><label for="create_todo_name">Name</label><input type="text" id="create_todo_name"><label for="create_todo_description">Description</label><textarea id="create_todo_description"></textarea><label for="create_todo_date">Due date</label><input id="create_todo_date" type="date"><label for="create_todo_time">Due time</label><input type="time" id="create_todo_time"><label>Priority</label><input type="radio" class="create_todo_priority" value="high" style="background-color: #D56161;"><input type="radio" class="create_todo_priority" value="mid" style="background-color: #D5D061;"><input type="radio" class="create_todo_priority" value="low" style="background-color: #63D561;"><label for="create_todo_notes">Notes</label><textarea id="create_todo_notes"></textarea><div id="create_todo_checklist"><label>Checklist</label><button>+</button></div><div class="create_todo_checklist 1"><input type="text"><button>-</button></div><button class="create_todo edit_todo">Create</button></div>';
    var body=document.querySelector("body");
    body.insertBefore(div,body.firstChild);
}

export function editTodoPopup(todo)
{
    var div=document.createElement("div");
    div.id="todo_popup";
    div.innerHTML='<div id="create_todo_popup_box"><label for="create_todo_name">Name</label><input type="text" id="create_todo_name"><label for="create_todo_description">Description</label><textarea id="create_todo_description"></textarea><label for="create_todo_date">Due date</label><input id="create_todo_date" type="date"><label for="create_todo_time">Due time</label><input type="time" id="create_todo_time"><label>Priority</label><input type="radio" class="create_todo_priority" value="high" style="background-color: #D56161;"><input type="radio" class="create_todo_priority" value="mid" style="background-color: #D5D061;"><input type="radio" class="create_todo_priority" value="low" style="background-color: #63D561;"><label for="create_todo_notes">Notes</label><textarea id="create_todo_notes"></textarea><div id="create_todo_checklist"><label>Checklist</label><button>+</button></div><div class="create_todo_checklist 1"><input type="text"><button>-</button></div><button class="create_todo edit_todo">Edit</button></div>';
    var body=document.querySelector("body");
    body.insertBefore(div,body.firstChild);
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













