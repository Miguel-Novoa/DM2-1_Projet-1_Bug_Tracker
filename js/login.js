const url = 'http://127.0.0.1:5500';

const loginBtn = document.getElementById('loginBtn');
const username = document.getElementById('username');
const password = document.getElementById('password');
const alert = document.getElementById('alert');


loginBtn.addEventListener('click', ()=>{
    alert.style.display = 'none';
    
    fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/login/${username.value}/${password.value}`)
    .then((res)=>res.json())
    .then((response)=>{
        if(response.result.status === 'done'){
            localStorage.setItem('user', JSON.stringify({
                "id" : response.result.id,
                "token" : response.result.token
            }));

            window.location.href = `${url}/pages/bugsList.html`;

        }else if(response.result.status === 'failure'){
            alert.innerHTML = `Le nom d'utilisateur ou le mot de passe est incorrect !`;
            alert.style.display = 'block';
            
        }else if(response.result.length === 0){
            alert.innerHTML = `Veuillez entrer votre mot de passe !`;
            alert.style.display = 'block';
        }
        console.log(response);
    })
    .catch((error)=>{
        console.log(error)
    });
});