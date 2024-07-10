import './style.css';
import * as storage from './storage.js';

export function todoObj(name, description, date, time, notes, done, priority, checklist)
{
    var checklistStatus=[];
    for(var i=0;i<checklist.length;i++)
    checklistStatus.push(false);
    return {
        name: name,
        description: description,
        created: new Date(),
        date: date,
        time: time,
        notes: notes,
        done: done,          // wether the task is done
        priority: priority,
        checklist: checklist,
        checklistStatus: checklistStatus,   // status of checklist tasks
    };
}

export function projectObj(name, todos)
{
    return{
        name: name,
        todos: todos,        // array of todo objects
    };
}