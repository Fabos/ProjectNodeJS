
$(document).ready( function (e) {
    debugger;
    let token = localStorage.getItem("token");

    $.ajax('/api/publicaciones',{
        'type': 'GET',
        'headers':{
            "x-token":token
        },
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(data);

            var html = '';
            data.publicacion.forEach(publicacion => {

                html+=`<div class="tab-content">
                  <div class="active tab-pane" id="activity">
                    <!-- Post -->
                    <div class="post">
                      <div class="user-block">
                        <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                        <span class="username">
                          <a href="#">${publicacion.Usuario.nombre}</a>
                        </span>
                        <span class="description">Publicado - ${publicacion.createdAt}</span>
                        <span class="description">Categoria - ${publicacion.Categoria.categoria}</span>
                      </div>
                      <!-- /.user-block -->
                      <p>
                        ${publicacion.publicacion}
                      </p>

                      <p>
                      <div class="form-group">
                      <label for="exampleFormControlSelect1">Puntaje</label>
                      <select class="form-control" id="enviarVoto${publicacion.Usuario.id}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <button type="button" class="btn btn-success" onclick="enviarVoto(${publicacion.Usuario.id})">Votar</button>
                        <span class="float-right">

                        </span>
                      </p>
                    </div>`;
            });
            debugger;
            $('#postInicio').html(html);

            let token = localStorage.getItem("token");

            $.ajax('/api/publicaciones/usuario/32',{
                'type': 'GET',
                'headers':{
                    "x-token":token
                },
                'processData': false,
                'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
            })
                .done(function (data, textStatus, jqXHR) {
                    debugger;
                    console.log(data);
        
                    var html = '';
                    data.publicacion.forEach(publicacion => {
        
                        html+=`<div class="tab-content">
                          <div class="active tab-pane" id="activity">
                            <!-- Post -->
                            <div class="post">
                              <div class="user-block">
                                <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                                <span class="username">
                                  <a href="#">${publicacion.Usuario.nombre}</a>
                                  <a href="" onclick="borrarPublicacion(${publicacion.id})" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                                </span>
                                <span class="description">Publicado - ${publicacion.createdAt}</span>
                                <span class="description">Categoria - ${publicacion.Categoria.categoria}</span>
                              </div>
                              <!-- /.user-block -->
                              <p>
                                ${publicacion.publicacion}
                              </p>
        
                              <p>
                              <div class="form-group">
                              <label for="exampleFormControlSelect1">Puntaje</label>
                              <select class="form-control" id="enviarVoto${publicacion.Usuario.id}">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            </div>
                            <button type="button" class="btn btn-success" onclick="enviarVoto(${publicacion.Usuario.id})">Votar</button>
                                <span class="float-right">
        
                                </span>
                              </p>
                            </div>`;
                    });
                    debugger;
                    $('#postPerfil').html(html);

                    token = localStorage.getItem("token");


                    $.ajax('/api/categorias',{
                        'type': 'GET',
                        'headers':{
                            "x-token":token
                        },
                        'processData': false,
                        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
                    })
                        .done(function (data, textStatus, jqXHR) {
                            debugger;
                            console.log(data);
                
                            var html = '';
                            var htmlCategorias = '';
                            data.categoria.forEach(category => {
                
                                html+= `<li class="nav-item">
                                        <a href="" onclick="filtrarCategoria(${category.id})" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>${category.categoria}</p>
                                        </a>
                                    </li>`

                                htmlCategorias+=`<option value="${category.id}">${category.categoria}</option>\n`;

                            });
                            debugger;
                            $('#categoriaLista').html(html);
                            $('#categoriaIdListar').html(htmlCategorias);



                            
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


function filtrarCategoria(idCategoria){

    event.preventDefault();
    token = localStorage.getItem("token");

    debugger;
    $.ajax('/api/publicaciones/categoria/'+idCategoria,{
        'type': 'GET',
        'headers':{
            "x-token":token
        },
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(data);

            var html = '';
            data.publicacion.forEach(publicacion => {

                html+=`<div class="tab-content">
                  <div class="active tab-pane" id="activity">
                    <!-- Post -->
                    <div class="post">
                      <div class="user-block">
                        <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                        <span class="username">
                          <a href="#">${publicacion.Usuario.nombre}</a>
                        </span>
                        <span class="description">Publicado - ${publicacion.createdAt}</span>
                        <span class="description">Categoria - ${publicacion.Categoria.categoria}</span>
                      </div>
                      <!-- /.user-block -->
                      <p>
                        ${publicacion.publicacion}
                      </p>

                      <p>
                      <div class="form-group">
                      <label for="exampleFormControlSelect1">Puntaje</label>
                      <select class="form-control" id="enviarVoto${publicacion.Usuario.id}">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    </div>
                    <button type="button" class="btn btn-success" onclick="enviarVoto(${publicacion.Usuario.id})">Votar</button>
                        <span class="float-right">

                        </span>
                      </p>
                    </div>`;
            });
            debugger;
            $('#postInicio').html(html);

            token = localStorage.getItem("token");

            $.ajax('/api/publicaciones/usuario/32',{
                'type': 'GET',
                'headers':{
                    "x-token":token
                },
                'processData': false,
                'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
            })
                .done(function (data, textStatus, jqXHR) {
                    debugger;
                    console.log(data);
        
                    var html = '';
                    data.publicacion.forEach(publicacion => {
        
                        html+=`<div class="tab-content">
                          <div class="active tab-pane" id="activity">
                            <!-- Post -->
                            <div class="post">
                              <div class="user-block">
                                <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                                <span class="username">
                                  <a href="#">${publicacion.Usuario.nombre}</a>
                                  <a href="" onclick="borrarPublicacion(${publicacion.id})"  class="float-right btn-tool"><i class="fas fa-times"></i></a>
                                </span>
                                <span class="description">Publicado - ${publicacion.createdAt}</span>
                                <span class="description">Categoria - ${publicacion.Categoria.categoria}</span>
                              </div>
                              <!-- /.user-block -->
                              <p>
                                ${publicacion.publicacion}
                              </p>
        
                              <p>
                              <div class="form-group">
                              <label for="exampleFormControlSelect1">Puntaje</label>
                              <select class="form-control" id="enviarVoto${publicacion.Usuario.id}">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            </div>
                            <button type="button" class="btn btn-success" onclick="enviarVoto(${publicacion.Usuario.id})">Votar</button>
                                <span class="float-right">
        
                                </span>
                              </p>
                            </div>`;
                    });
                    debugger;
                    $('#postPerfil').html(html);

                    token = localStorage.getItem("token");
                    $.ajax('/api/categorias',{
                        'headers':{
                            "x-token":token
                        },
                        'type': 'GET',
                        'processData': false,
                        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
                    })
                        .done(function (data, textStatus, jqXHR) {
                            debugger;
                            console.log(data);
                
                            var html = '';
                            var htmlCategorias = '';

                            data.categoria.forEach(category => {
                
                                html+= `<li class="nav-item">
                                <a href="" onclick="filtrarCategoria(${category.id})" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>${category.categoria}</p>
                                        </a>
                                    </li>`

                                htmlCategorias+=`<option value="${category.id}">${category.categoria}</option>\n`;


                            });
                            debugger;
                            $('#categoriaLista').html(html);
                            $('#categoriaIdListar').html(htmlCategorias);

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

function enviarVoto(id){

    event.preventDefault();
    debugger;
    let voto = document.getElementById('enviarVoto'+id).value;
    let token = localStorage.getItem("token");


    $.ajax('/api/usuarios/voto',{
        'headers':{
            "x-token":token
        },
        'data': JSON.stringify({puntaje:voto, usuarioId:id}), //{action:'x',params:['a','b','c']}
        'type': 'POST',
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(jqXHR.responseJSON);

            Swal.fire({
                title: 'Voto Enviado',
                Text: 'Su voto se registró correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })


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

function crearPublicacion(){

    event.preventDefault();
    let publicacion = document.getElementById('publicacionIdListar').value;
    let categoria = document.getElementById('categoriaIdListar').value;
    let token = localStorage.getItem("token");


    $.ajax('/api/publicaciones',{
        'headers':{
            "x-token":token
        },
        'data': JSON.stringify({publicacion:publicacion, categoria:categoria}), //{action:'x',params:['a','b','c']}
        'type': 'POST',
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
    })
        .done(function (data, textStatus, jqXHR) {
            debugger;
            console.log(jqXHR.responseJSON);
            location.href ="http://www.localhost:8000/usuario-home";


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

function borrarPublicacion(id){
    event.preventDefault();
    debugger;
    token = localStorage.getItem("token");

    debugger;
    $.ajax('/api/publicaciones/'+id,{
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