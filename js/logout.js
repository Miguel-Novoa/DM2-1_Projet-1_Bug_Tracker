export function logout(btn){
    btn.addEventListener('click', ()=>{
        localStorage.removeItem('user');
        window.location.href = `/index.html`;
    });
};