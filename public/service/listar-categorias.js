
$(document).ready( function () {
    token = localStorage.getItem("token");

    $('#myTable').DataTable({
      responsive:true,
      autowidth:true
    });

        $.ajax('/api/categorias/admin',{
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
                var html = '';
                var i;
                data.categoria.forEach(categoria => {
                    var buttons = '<a href="" onclick="editarCategoria('+categoria.id+')" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-edit"></i></a>';
                    buttons += '<a href="" onclick="eliminarCategoria('+categoria.id+')" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a>';

                    html += '<tr>' ;
                    html +='<td>'+categoria.id+' </td>' ;
                    html +='<td> '+categoria.categoria+'</td>' ;
                    html +='<td> '+categoria.createdAt+'</td>' ;
                    html +='<td> '+categoria.updatedAt+'</td>' ;
                    if (categoria.estado == true) {
                        html +='<td> <i class="fas fa-check-circle" style="color:green"></i></td>' ;
                    }
                    else{
                        html +='<td> <i class="fas fa-times-circle" style="color:red"></i></td>' ;
                    }
                    html +='<td> '+buttons+'</td>' ;
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


function editarCategoria(id){
    event.preventDefault();
    token = localStorage.getItem("token");

    debugger;
    $.ajax('/api/categorias/'+id,{
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

            document.getElementById("idCategoria").value = data.categoria.id;
            document.getElementById("inputCategoria").value = data.categoria.categoria;
            document.getElementById("inputEstado").checked = data.categoria.estado;;
            $("#modalEditar").modal("show");


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

function editarCategoriaEnviar(){
    event.preventDefault();
    token = localStorage.getItem("token");

    let id = document.getElementById("idCategoria").value;
    let categoria = document.getElementById("inputCategoria").value;
    let estado = document.getElementById("inputEstado").checked;

    debugger;
    $.ajax('/api/categorias/'+id,{
        'data': JSON.stringify({categoria:categoria, estado:estado}), //{action:'x',params:['a','b','c']}
        'type': 'PUT',
        'headers':{
            "x-token":token
        },
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(data.categoria);
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

function eliminarCategoria(id){
    event.preventDefault();
    debugger;
    token = localStorage.getItem("token");

    debugger;
    $.ajax('/api/categorias/'+id,{
        'type': 'DELETE',
        'headers':{
            "x-token":token
        },
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(data.categoria);
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

function nuevoRegistro(){
    event.preventDefault();
    let categoria = document.getElementById("inputCrearCategoria").value;
    let estado = document.getElementById("inputCrearEstado").checked;
    debugger;
    token = localStorage.getItem("token");

    debugger;
    $.ajax('/api/categorias/',{
        'data': JSON.stringify({categoria:categoria, estado:estado}), //{action:'x',params:['a','b','c']}
        'type': 'POST',
        'headers':{
            "x-token":token
        },
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(data.categoria);
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

