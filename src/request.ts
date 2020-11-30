const headers:Headers = new Headers({'Content-Type': 'application/json'});
const url:string = "http://localhost:3000/todos";
function setconfig(method:string, item?:any) {
    return {
        method: method,
        headers,
        body: JSON.stringify(item),
    }  
}

interface todo {
    id: number,
    text: string,
    completed: boolean
}

export const getListFromServer = async function(id?:number):Promise<any>{
    let getFromUrl = id ? `${url}/${id}` : url;
    try {
        const response = await fetch(getFromUrl, { method: 'GET' });
        const result = response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
  }

export function postItemIntoServer(item:todo):void{
    fetch(url, setconfig('POST',item))
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
    fetch(`${url}/${item.id}`, setconfig('PUT', item))
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
    fetch(`${url}/${id}`, setconfig('DELETE'))
        .then(result => {
            console.log('Delete Success');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

  