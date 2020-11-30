import "@babel/polyfill"
import {
    getListFromServer,
    deleteItemInServer,
    updateItemInServer,
} from './request'

import {
    renderItem,
    addItem,
    removeItem,
    toggleItem,
    editItem,
    clearItems
} from './ui'

// add a property to window
declare global {
    interface Window {
      removeTodo: any;
      toggleTodo: any;
      editTodo: any;
      clearTodos: any;
    }
}

window.removeTodo = removeTodo;
window.toggleTodo = toggleTodo;
window.editTodo = editTodo;

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

// toggle todo
function toggleTodo(id: number): any {
    const spanElement:HTMLElement = document.getElementById("text-" + id);
    getListFromServer(id)
    .then(result => {updateItemInServer({...result, completed: !result.completed });
                     result.completed ? spanElement.setAttribute("contentEditable", "true") : spanElement.setAttribute("contentEditable", "false");})
    .then(() => toggleItem(id))
}

// edit todo
function editTodo(id: number):any {
    const textSpan: HTMLElement = document.getElementById("text-" + id);

    textSpan.addEventListener('blur', function() {
        const newText: string = textSpan.innerText.trim()
        if (newText.length) {
            getListFromServer(id).then(result => updateItemInServer({...result, text: newText }))
         }
    })
    editItem(id); 
}

// clear todos
document.querySelector(".clear").onclick = async function(): Promise<any> {
    clearItems();
    const historyList:Array<todo> = await getListFromServer();
    historyList.map(item => item.id).forEach(id => deleteItemInServer(id));
}

