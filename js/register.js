const url = 'http://127.0.0.1:5500';

let subscribeBtn = document.getElementById('subscribeBtn');
let username = document.getElementById('usernameInput');
let password = document.getElementById('passwordInput');
let confirmPassword = document.getElementById('confirmPasswordInput');
let passwordAlert = document.getElementById('passwordAlert');
let confirmPasswordAlert = document.getElementById('confirmPasswordAlert');
let usernameAlert = document.getElementById('usernameAlert');

let checkPasswords = (pass1, pass2) =>{
    if(pass1 == ''){
        passwordAlert.innerHTML = 'Veuillez entrer un mot de passe !';
        passwordAlert.style.display = 'block';
    }else if(pass2 == ''){
        confirmPasswordAlert.innerHTML = 'Veuillez confirmer le mot de passe !';
        confirmPasswordAlert.style.display = 'block';    
    }else if(pass1 !== pass2){
        confirmPasswordAlert.innerHTML = 'Les mots de passe ne sont pas identiques !';
        confirmPasswordAlert.style.display = 'block';  
        return false;
    }else{
        return true;
    };
};

let checkUsername = (userValue, pass) =>{
    fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/signup/${userValue}/${pass}`)
    .then((res) => res.json())
    .then((response) =>{
        if(response.result.message === 'this login is not available'){
            usernameAlert.style.display = 'block';
        }else if(response.result.message === `${userValue} is signed up with success`){
            Swal.fire(
                'Succès !',
                'Vous êtes désormais inscrit !',
                'success'
            ).then(()=>{
                window.location.href = `${url}/index.html`;
            });
        };
    })
    .catch((error)=>{
        console.log(error)
    });
};

subscribeBtn.addEventListener('click', ()=>{
    passwordAlert.style.display = 'none';
    confirmPasswordAlert.style.display = 'none';
    username.style.display = 'none';

    if(checkPasswords(password.value, confirmPassword.value)){
        checkUsername(username.value, password.value)
    };
});