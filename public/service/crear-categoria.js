function crearCategoria(){
    debugger;
    event.preventDefault();

    let estado = document.getElementById('inputEstado').checked;
    let categoria = document.getElementById('inputCategoria').value;


    $.ajax('/api/categorias/',{
        'type': 'POST',
        'processData': false,
        'data': JSON.stringify({estado:estado, categoria:categoria}), //{action:'x',params:['a','b','c']}
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(data);
            location.href ="http://www.localhost:8000/home";

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

