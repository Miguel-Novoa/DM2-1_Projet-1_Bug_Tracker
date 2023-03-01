export function logout(btn, url){
    btn.addEventListener('click', ()=>{
        localStorage.removeItem('user');
        window.location.href = `${url}/index.html`;
    });
};