$(document).ready(function(){
        uid = localStorage.getItem("uid");
        token = localStorage.getItem("token");


        debugger;
        $.ajax('/api/usuarios/'+uid,{
            'type': 'GET',
            'headers':{
                "x-token":token
            },
            'processData': false,
            'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
        })
            .done(function (data, textStatus, jqXHR) {
                debugger;
                console.log(data.categoria);
    
                document.getElementById('idUsuario').value = data.usuarios.id;
                document.getElementById('inputNombre').value = data.usuarios.nombre;
                document.getElementById('inputEmail').value = data.usuarios.email;
    
    
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                debugger;
                if (errorThrown == "Unauthorized") {
                    localStorage.clear();

                    location.href ="http://www.localhost:8000/";
                }
    
                    let errors="";
                    jqXHR.responseJSON.errors.forEach(function(error, index){
                        errors+="* "+error.msg+" <br> ";
                    });
    
                    if (console && console.log) {
                        Swal.fire({
                            title: 'Error!',
                            html: errors,
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
    
                    
                    // console.log(jqXHR.responseJSON.errors[0].msg);
    
                    
                    console.log("La solicitud a fallado: " + textStatus);
                }
            });
});


function editarUsuario(){
    debugger;
    event.preventDefault();

    let idUsuario = document.getElementById('idUsuario').value;
    let nombre = document.getElementById('inputNombre').value;
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    let token = localStorage.getItem("token");
    let usuario = {}

    if (password === "") {
             usuario = {
            nombre:nombre,
            email,email,
        }
    }else{
             usuario = {
            nombre:nombre,
            email,email,
            password:password
        }

    }



    $.ajax('/api/usuarios/'+idUsuario,{
        'type': 'PUT',
        'headers':{
            "x-token":token
        },
        'processData': false,
        'data': JSON.stringify(usuario), //{action:'x',params:['a','b','c']}
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(data);
            location.reload();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            debugger;
            if (errorThrown == "Unauthorized") {
                localStorage.clear();

                location.href ="http://www.localhost:8000/";
            }

                let errors="";
                jqXHR.responseJSON.errors.forEach(function(error, index){
                    errors+="* "+error.msg+" <br> ";
                });

                if (console && console.log) {
                    Swal.fire({
                        title: 'Error!',
                        html: errors,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })

                
                // console.log(jqXHR.responseJSON.errors[0].msg);

                
                console.log("La solicitud a fallado: " + textStatus);
            }
        });

}

function borrarUsuario(){
    event.preventDefault();
    debugger;
    token = localStorage.getItem("token");
    let idUsuario = document.getElementById('idUsuario').value;
    let nombre = document.getElementById('inputNombre').value;
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;

    debugger;
    $.ajax('/api/usuarios/'+idUsuario,{
        'type': 'DELETE',
        'headers':{
            "x-token":token
        },
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(data);
            location.href ="http://www.localhost:8000/";

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            debugger;
            if (errorThrown == "Unauthorized") {
                localStorage.clear();

                location.href ="http://www.localhost:8000/";
            }

                let errors="";
                jqXHR.responseJSON.errors.forEach(function(error, index){
                    errors+="* "+error.msg+" <br> ";
                });

                if (console && console.log) {
                    Swal.fire({
                        title: 'Error!',
                        html: errors,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })

                
                // console.log(jqXHR.responseJSON.errors[0].msg);

                
                console.log("La solicitud a fallado: " + textStatus);
            }
        });
}