import * as index from './index.js'

export function setLocalStorage()
{
    localStorage.setItem("projects",JSON.stringify(index.projects));
}

export function getLocalStorage()
{
    return JSON.parse(localStorage.getItem("projects"));
}