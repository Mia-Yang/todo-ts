import "@babel/polyfill"
import {
    getListFromServer,
} from './request'

import {
    renderItem,
    addItem
} from './ui'

interface todo {
    id: number,
    text: string,
    completed: boolean
}

// add eventListenter
window.addEventListener('load', initialize)
document.querySelector(".add-btn").addEventListener('click', addTodo);

async function initialize(){
    const historyList: Array<todo> = await getListFromServer();
    historyList.forEach(item => renderItem(item))
}

function addTodo(e: any): void {
    e.preventDefault();
    addItem();
}
