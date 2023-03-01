export function changeBugState(token, id, state){
    fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/state/${token}/${id}/${state}`)
    .then((res)=>res.json())
    .then((response)=>{
        console.log(response)
    })
};