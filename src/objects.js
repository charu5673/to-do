import './style.css';

function todoObj(name, description, due, notes, done, priority,checklist)
{
    return {
        name: name,
        description: description,
        created: new Date(),
        due: due,
        notes: notes,
        done: done,          // wether the task is done
        priority: priority,
        checklist: checklist,
    };
}

function projectObj(name, todos)
{
    return{
        name: name,
        todos: todos,        // array of todo objects
    };
}

export { todoObj, projectObj };