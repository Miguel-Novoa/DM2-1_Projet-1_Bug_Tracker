import { checkLogged } from "./checkLogged.js";
import { logout } from "./logout.js";

const url = 'http://127.0.0.1:5500';
const user = localStorage.getItem('user');
const logoutBtn = document.getElementById('logout');

checkLogged(user, url);
logout(logoutBtn, url);