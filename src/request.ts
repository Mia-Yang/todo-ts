const headers:Headers = new Headers({'Content-Type': 'application/json'});
const url:string = "http://localhost:3000/todos";

interface todo {
    id: number,
    text: string,
    completed: boolean
}

export const getListFromServer = async function():Promise<any>{
    try {
        const response = await fetch(url, { method: 'GET' });
        const result = response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
  }

export const getItemFromServer = async function(id?:number):Promise<any>{
    try {
        const response = await fetch(`${url}/${id}`, { method: 'GET' });
        const result = response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
  }

export function postItemIntoServer(item:todo):void{
    fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(item),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Post Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// update list on json-server 
export function updateItemInServer(item:todo):void {
    fetch(`${url}/${item.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(item),
        })
       .then(res => res.json())
        .then(data => {
            console.log('Update Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// DELETE item in json-server 
export function deleteItemInServer(id:number):void {
    fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(result => {
            console.log('Delete Success');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

  