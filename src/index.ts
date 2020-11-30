import "@babel/polyfill"
import {
    getListFromServer,
    deleteItemInServer
} from './request'

import {
    renderItem,
    addItem,
    removeItem,
} from './ui'

// add a property to window
declare global {
    interface Window {
      removeTodo: any;
    }
}
window.removeTodo = removeTodo;

interface todo {
    id: number,
    text: string,
    completed: boolean
}

// add eventListenter
window.addEventListener('load', initialize)
document.querySelector(".add-btn").addEventListener('click', addTodo);

// initialize history data
async function initialize(): Promise<void>{
    const historyList: Array<todo> = await getListFromServer();
    historyList.forEach(item => renderItem(item))
}

// add todo
function addTodo(e: any): void {
    e.preventDefault();
    addItem();
}

// delete todo 
function removeTodo(id: number): void {
    deleteItemInServer(id)
    removeItem(id);
}
