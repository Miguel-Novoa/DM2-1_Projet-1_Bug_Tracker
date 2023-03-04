export function checkLogged(user){
    if(user === null){
        window.location.href = `/pages/404.html`;
    };
};