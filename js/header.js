import { checkLogged } from "./checkLogged.js";
import { logout } from "./logout.js";

const ul = document.querySelector('#headerList');
const user = JSON.parse(localStorage.getItem('user'));
const logoutBtn = document.getElementById('logout');

logout(logoutBtn);
checkLogged(user);

fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/list/${user.token}/0`)
.then((res)=>res.json())
.then((response) =>{
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
}).catch((error)=>{
    console.log(error)
});


window.addEventListener('resize', function (e) {
    let burger = document.getElementById('burger');
    let nav = document.querySelector('nav');
    let back = document.getElementById('back');

    if (document.body.clientWidth < 890) {
        burger.style.display = 'block';
        nav.style.display = 'none';

        burger.addEventListener('click', () => {
            burger.style.display = 'none';
            nav.classList.add('mobileNav');
            nav.style.display = 'flex';
            back.style.display = 'block';
        });

        back.addEventListener('click', () => {
            burger.style.display = 'block';
            nav.style.display = 'none';
            back.style.display = 'none';
            nav.classList.remove('mobileNav');
        });
    } else if (document.body.clientWidth > 890) {
        burger.style.display = 'none';
        nav.style.display = 'flex';
        back.style.display = 'none';
    }
});