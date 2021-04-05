$(document).ready(function(){
    debugger;
    let token = localStorage.getItem("token");
    if (token === null) {
        return
    }else{
        let rol_id = localStorage.getItem("rol");
        if (rol_id === 1) {
            location.href ="http://www.localhost:8000/home";
        }
        else{
            location.href ="http://www.localhost:8000/usuario-home";
        }
    }
    
});