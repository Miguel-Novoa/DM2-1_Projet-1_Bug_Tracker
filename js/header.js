//import { checkLogged } from "./checkLogged.js";
import { logout } from "./logout.js";

const ul = document.querySelector('#headerList');
const user = JSON.parse(localStorage.getItem('user'));

logout(logoutBtn, url);

fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/list/${user.token}/0`)
.then((res)=>res.json())
.then((response) =>{
    console.log(response)
    let bugs = response.result.bug;
    let covered = 0;
    let inProgress = 0;
    let uncovered = 0;
    for(let i=0; i< bugs.length; i++){
        switch (bugs[i].state){
            case '2':
                covered = covered + 1;
                break;
            case '1':
                inProgress = inProgress + 1;
                break;
            default :
                uncovered = uncovered + 1;
                break;
        };
    };
    ul.innerHTML += `
                    <li>${uncovered} non traités</li>
                    <li>${inProgress} en cours</li>
                    <li>${covered} traitrés</li>`
})