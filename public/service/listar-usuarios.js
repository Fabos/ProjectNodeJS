
$(document).ready( function () {
    token = localStorage.getItem("token");

    $('#myTable').DataTable({
      responsive:true,
      autowidth:true
    });

        $.ajax('/api/usuarios/admin',{
            'type': 'GET',
            'headers':{
                "x-token":token
            },
            'processData': false,
            'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
        })
            .done(function (data, textStatus, jqXHR) {
                debugger;
                console.log(data.usuarios);
                var html = '';
                var i;
                data.usuarios.forEach(usuario => {
                    console.log(usuario.Usuario);
                    var buttons = '<a href="" onclick="editarCategoria('+usuario.Usuario.id+')" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-edit"></i></a>';
                    buttons += '<a href="" onclick="eliminarCategoria('+usuario.Usuario.id+')" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a>';

                    html += '<tr>' ;
                    html +='<td>'+usuario.Usuario.id+' </td>' ;
                    html +='<td> '+usuario.Usuario.nombre+'</td>' ;
                    html +='<td> '+usuario.Usuario.email+'</td>' ;
                    if (usuario.Usuario.estado == true) {
                        html +='<td> <i class="fas fa-check-circle" style="color:green"></i></td>' ;
                    }
                    else{
                        html +='<td> <i class="fas fa-times-circle" style="color:red"></i></td>' ;
                    }
                    html +='<td> '+usuario.promedio+'</td>' ;

                    html +='</tr>';

                    
                });

                debugger;
                $('#DataResult').html(html);


            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                debugger;
                if (errorThrown == "Unauthorized") {
                    localStorage.clear();

                    return location.href ="http://www.localhost:8000/";
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



