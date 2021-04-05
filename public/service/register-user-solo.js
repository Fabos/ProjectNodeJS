function registrarUsuario(){
    event.preventDefault();
    
    let nombre = document.getElementById('inputNombreCompleto').value;
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;

    $.ajax('/api/usuarios',{
        'data': JSON.stringify({nombre:nombre, email:email, password:password}), //{action:'x',params:['a','b','c']}
        'type': 'POST',
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(jqXHR.responseJSON);
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