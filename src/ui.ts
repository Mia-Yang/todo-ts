import {
    postItemIntoServer,
} from './request'

const todoList:HTMLElement = document.querySelector(".todo-list") as HTMLElement;
const inputText:HTMLInputElement = document.querySelector(".inputbox") as HTMLInputElement;

interface todo {
    id: number,
    text: string,
    completed: boolean
}

export function renderItem(item: todo): void {
    const todoItem: HTMLElement = document.createElement("li");

    if (item.completed === true) {
        todoItem.setAttribute("class", "finished")
    }
    todoItem.setAttribute("id", `${item.id}`)

    let isChecked: string = item.completed ? "checked" : "";
    let canEdit: string = item.completed ? "false" : "true";

    todoItem.innerHTML =
        `<input type="checkbox" onclick="toggleTodo(${item.id})" ${isChecked}> 
    <span id="text-${item.id}" onfocus="editTodo(${item.id})" class="single-line" contenteditable="${canEdit}" > ${item.text} </span>
    <button class="del" onclick="removeTodo(${item.id})">✖️</button>`;
    todoList.appendChild(todoItem);
}

export function addItem(): void {
    const textContent:string = inputText.value.trim();
    inputText.value = '';

    let newTodo:todo = {
        id: new Date().getTime(),
        text: textContent,
        completed: false,
    }

    if (textContent.length !== 0) {
        renderItem(newTodo);
        postItemIntoServer(newTodo);
    }
}

