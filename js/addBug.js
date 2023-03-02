const url = 'http://127.0.0.1:5500';
const user = JSON.parse(localStorage.getItem('user'));
const logoutBtn = document.getElementById('logout');
const title = document.getElementById('titleInput');
const description = document.getElementById('descriptionInput');
const btn = document.getElementById('saveBtn');
const titleAlert = document.getElementById('titleAlert');
const descriptionAlert = document.getElementById('descriptionAlert');


const postBug = () =>{
    fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/add/${user.token}/${user.id}`,{
        method: 'post',
        body: JSON.stringify({
            'title': title.value,
            'description': description.value
        })
    })
    .then((res)=>res.json())
    .then((response) =>{
        if(response.result.status === 'done'){
            Swal.fire(
                'Succès !',
                'Le bug a bien été ajouté à la liste !',
                'success'
            ).then(()=>{
                window.location.href = `${url}/pages/todo.html`;
            });
        };
    })
    .catch((error)=>{
        console.log(error)
    });
};

btn.addEventListener('click', ()=>{
    titleAlert.style.display = 'none';
    descriptionAlert.style.display = 'none';

    if(title.value === ''){
        titleAlert.style.display = 'block';
    }else if(description.value === ''){
        descriptionAlert.style.display = 'block';
    }else{
        postBug();
    };
});