//import { checkLogged } from "./checkLogged.js";
import { logout } from "./logout.js";

const url = 'http://127.0.0.1:5500';
const user = JSON.parse(localStorage.getItem('user'));
const logoutBtn = document.getElementById('logout');
const table = document.querySelector('tbody');
const title = document.getElementById('tableTitle');

let devs;

//checkLogged(user, url);
logout(logoutBtn, url);

console.log(user)

const manageBugState = (state)=>{
    if(state === "0"){
        return `<option selected value='0'>Non traité</option>
                    <option value='1'>En cours</option>
                    <option value='2'>Traité</option>`
    }else if(state === "1"){
        return `<option value='0'>Non traité</option>
                    <option selected value='1'>En cours</option>
                    <option value='2'>Traité</option>`
    }else if(state === "2"){
        return `<option value='0'>Non traité</option>
                    <option value='1'>En cours</option>
                    <option selected value='2'>Traité</option>`
    };
};

const convertTimestampToDate = (time) =>{
    let completeDate = new Date(time);
    let shortDate = completeDate.getDate() + '/' + (completeDate.getMonth()+1) + '/' + completeDate.getFullYear();
    console.log(time)
    return shortDate;
}

const locationHandler = () =>{
    if(window.location.href === `${url}/pages/bugsList.html`){
        return 0;
    }else if(window.location.href === `${url}/pages/todo.html`){
        return user.id;
    }
}

const displayTable = ()=>{
    fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/list/${user.token}/${locationHandler()}`)
    .then((res)=>res.json())
    .then((response) =>{
        console.log(response)

        let bugs = response.result.bug;

        for(let i=0; i<bugs.length; i++){
            table.innerHTML += `
            <tr>
                <th class="largeCells">${bugs[i].title + ' ' + bugs[i].description}</th>
                <th class="mediumCells">${convertTimestampToDate(bugs[i].timestamp)}</th>
                <th class="mediumCells">${devs[bugs[i].user_id]}</th>
                <th class="mediumCells">
                    <select>
                        ${manageBugState(bugs[i].state)}
                    </select>
                </th>
                <td class="littleCells">
                    <button>❌</button>
                </td>
            </tr>
            `
        }
    })
    .catch((error)=>{
        console.log(error)
    });
};

fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/users/${user.token}`)
.then((res)=>res.json())
.then((response) =>{
    console.log(response)
    devs = response.result.user;
    if(locationHandler() === 0){
        title.innerHTML = `Liste complete des bugs`;
    }else{
        title.innerHTML = `Liste des bugs à corriger par ${devs[user.id]}`;
    }
}).then(()=>{
    displayTable();
})
.catch((error)=>{
    console.log(error)
});