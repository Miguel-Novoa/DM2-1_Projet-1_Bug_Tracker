export function deleteBug (token, bugId){
    fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/delete/${token}/${bugId}`)
    .then((res) => res.json())
    .then((response) =>{
        if(response.result.status === 'done'){
            Swal.fire(
                'Succès !',
                'Le bug a bien été supprimé !',
                'success'
            ).then(()=>{
                window.location.reload();
            });
        };
    });
};