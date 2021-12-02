// USER ==============================================================================================

$("#login").click(function () {
    if ($.trim($("#email").val()) == "" || $.trim($("#contrasena").val()) == "") {
        alert("Por favor ingrese el correo y la contraseña");
    } else {
        let datos = {
            email: $("#email").val(),
            contrasena: $("#contrasena").val()
        }
        $.ajax({
            url: "http://localhost:8080/api/user/" + datos.email + "/" + datos.contrasena,
            method: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response);
                validarUsuario(response)
            }
        });
    }
});

function validarUsuario(response) {
    if (response.id != null) {
        location.href = "usuarios.html";
        alert("¡Bienvenido! " + response.name);
    } else {
        alert("Usuario no registrado :/");
    }
}


$("#guardar").click(function () {
    if ($.trim($("#emailRegistro").val()) == "" || $.trim($("#usuarioRegistro").val()) == "" || $.trim($("#contrasenaRegistro").val()) == "" || $.trim($("#contrasenaRegistro2").val()) == "") {
        alert("Por favor ingrese todos los campos");
    } else {
        if ($("#contrasenaRegistro").val() == $("#contrasenaRegistro2").val()) {
            let datos = {
                id: $('#id').val(),
                identification: $('#id').val(),
                name: $("#usuarioRegistro").val(),
                address: "",
                cellPhone: "",
                email: $("#emailRegistro").val(),
                password: $("#contrasenaRegistro").val(),
                zone: "",
                type: ""
            }
            datos = JSON.stringify(datos);
            $.ajax({
                url: "http://localhost:8080/api/user/new",
                method: "POST",
                dataType: "JSON",
                data: datos,
                contentType: "application/json",
                success: function (response) {
                    console.log(response);
                },
                statusCode: {
                    201: function (response) {
                        console.log(response);
                        alert("Registrado Correctamente");
                    }
                }
            });
        } else {
            alert("Las contraseñas no coinciden :c");
            $("#contrasenaRegistro").val("");
            $("#contrasenaRegistro2").val("");
        }
    }
});


function validarEmail() {
    let datos = {
        email: $("#emailRegistro").val()
    }
    $.ajax({
        url: "http://localhost:8080/api/user/emailexist/" + datos.email,
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });
}

$("#guardarUsuario").click(function () {
    if ($.trim($("#identificacionRegistro").val()) == "" || $.trim($("#nombreRegistro").val()) == "" || $.trim($("#addressRegistro").val()) == "" || $.trim($("#cellphoneRegistro").val()) == "" || $.trim($("#emailRegistro").val()) == "" || $.trim($("#passwordRegistro").val()) == "" || $.trim($("#zoneRegistro").val()) == "" || $.trim($("#typeRegistro").val()) == "") {
        alert("Por favor ingrese todos los campos");
    } else {
        let datos = {
            id: $("#identificacionRegistro").val(),
            identification: $("#identificacionRegistro").val(),
            name: $("#nombreRegistro").val(),
            address: $("#addressRegistro").val(),
            cellPhone: $("#cellphoneRegistro").val(),
            email: $("#emailRegistro").val(),
            password: $("#passwordRegistro").val(),
            zone: $("#zoneRegistro").val(),
            type: $("#typeRegistro").val()
        }
        $.ajax({
            url: "http://localhost:8080/api/user/new",
            method: "POST",
            dataType: "JSON",
            data: JSON.stringify(datos),
            contentType: "application/json",
            Headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function (response) {
                    console.log(response);
                    alert("Registrado Correctamente");
                    $("#miTabla").empty();
                    consultarUsuario();
                    $('#ventanaRegistrar').modal('hide');
                }
            }
        });
    }
});

function consultarUsuario() {
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTabla").empty();
            mostrarTabla(response);
            console.log(response);
        }
    });
}

function mostrarTabla(response) {
    let rows = '<tr>';
    for (i = 0; i < response.length; i++) {
        rows += '<th scope="row">' + response[i].id + '</th>';
        rows += '<td>' + response[i].identification + '</td>';
        rows += '<td>' + response[i].name + '</td>';
        rows += '<td>' + response[i].address + '</td>';
        rows += '<td>' + response[i].cellPhone + '</td>';
        rows += '<td>' + response[i].email + '</td>';
        rows += '<td>' + response[i].password + '</td>';
        rows += '<td>' + response[i].zone + '</td>';
        rows += '<td>' + response[i].type + '</td>';
        rows += '<td> <button class="btn btn-primary fa fa-pencil" onclick="buscarPorIDUsuario(' + response[i].id + ')"></button><button style="margin-left:10px"class="btn btn-danger fa fa-remove" onclick="eliminarUsuario(' + response[i].id + ')"></button></td>';
        rows += '</tr>';
    }

    $("#miTabla").append(rows);
}

$("#editarUsuario").click(function() {
    let datos = {
        id: $("#identificacionRegistro").val(),
        identification: $("#identificacionRegistro").val(),
        name: $("#nombreRegistro").val(),
        address: $("#addressRegistro").val(),
        cellPhone: $("#cellphoneRegistro").val(),
        email: $("#emailRegistro").val(),
        password: $("#passwordRegistro").val(),
        zone: $("#zoneRegistro").val(),
        type: $("#typeRegistro").val()
    }

    var dataToSend = JSON.stringify(datos);
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        contentType: 'application/json',
        url: "http://localhost:8080/api/user/update",
        type: 'PUT',
        success: function (response) {
            console.log(response);
            alert("Actualizado Correctamente :D");
            $("#ventanaRegistrar").modal("hide");
            $("#miTabla").empty();
            consultarUsuario();
        },
    });
});

function buscarPorIDUsuario(idItem) {
    $.ajax({
        url: "http://localhost:8080/api/user/" + idItem,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            $("#ventanaRegistrar").modal("show");
            $("#identificacionRegistro").val(response.id);
            $("#nombreRegistro").val(response.name);
            $("#addressRegistro").val(response.address);
            $("#cellphoneRegistro").val(response.cellPhone);
            $("#emailRegistro").val(response.email);
            $("#passwordRegistro").val(response.password);
            $("#zoneRegistro").val(response.zone);
            $("#typeRegistro").val(response.type);
        }
    });
}

function eliminarUsuario(idElemento) {
    let elemento = {
      id: idElemento,
    }
    let datoEnvio = JSON.stringify(elemento);
    console.log(datoEnvio);
    $.ajax({
      url: "http://localhost:8080/api/user/" + idElemento,
      type: "DELETE",
      data: datoEnvio,
      datatype: "json",
      contentType: 'application/json',
      success: function (respuesta) {
        alert("Eliminado correctamente :)");
        $("#miTabla").empty();
        consultarUsuario();
      }
    });
  }



// INVENTARIO ==============================================================================================

$("#guardarInventario").click(function () {
    if ($.trim($("#brandRegistro").val()) == "" || $.trim($("#procesorRegistro").val()) == "" || $.trim($("#osRegistro").val()) == "" || $.trim($("#descriptionRegistro").val()) == "" || $.trim($("#memoryRegistro").val()) == "" || $.trim($("#hardDriveRegistro").val()) == "" || $.trim($("#availabilityRegistro").val()) == "" || $.trim($("#priceRegistro").val()) == "" || $.trim($("#quantityRegistro").val()) == "" || $.trim($("#photographyRegistro").val()) == "") {
        alert("Por favor ingrese todos los campos");
    } else {
        let datos = {
            id: $("#idInventario").val(),
            brand: $("#brandRegistro").val(),
            procesor: $("#procesorRegistro").val(),
            os: $("#osRegistro").val(),
            description: $("#descriptionRegistro").val(),
            memory: $("#memoryRegistro").val(),
            hardDrive: $("#hardDriveRegistro").val(),
            availability: $("#availabilityRegistro").val(),
            price: $("#priceRegistro").val(),
            quantity: $("#quantityRegistro").val(),
            photography: $("#photographyRegistro").val()
        }
        $.ajax({
            url: "http://localhost:8080/api/clone/new",
            method: "POST",
            dataType: "JSON",
            data: JSON.stringify(datos),
            contentType: "application/json",
            Headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function (response) {
                    console.log(response);
                    alert("Registrado Correctamente");
                    $("#miTablaInventario").empty();
                    consultarInventario();
                    $('#ventanaRegistrarInventario').modal('hide');
                }
            }
        });
    }
});

function consultarInventario() {
    $.ajax({
        url: "http://localhost:8080/api/clone/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaInventario").empty();
            mostrarTablaInventario(response);
            console.log(response);
        }
    });
}

function mostrarTablaInventario(response) {
    let rows = '<tr>';
    for (i = 0; i < response.length; i++) {
        rows += '<th scope="row">' + response[i].id + '</th>';
        rows += '<td>' + response[i].brand + '</td>';
        rows += '<td>' + response[i].procesor + '</td>';
        rows += '<td>' + response[i].os + '</td>';
        rows += '<td>' + response[i].description + '</td>';
        rows += '<td>' + response[i].memory + '</td>';
        rows += '<td>' + response[i].hardDrive + '</td>';
        rows += '<td>' + response[i].availability + '</td>';
        rows += '<td>' + response[i].price + '</td>';
        rows += '<td>' + response[i].quantity + '</td>';
        rows += '<td>' + response[i].photography + '</td>';
        rows += '<td> <button class="btn btn-primary fa fa-pencil" onclick="buscarPorIDInventario(' + response[i].id + ')"></button><button style="margin-left:10px"class="btn btn-danger fa fa-trash" onclick="eliminarInventario(' + response[i].id + ')"></button></td>';
        rows += '</tr>';
    }

    $("#miTablaInventario").append(rows);
}

$("#editarInventario").click(function() {
    let datos = {
        id: $("#idInventario").val(),
        brand: $("#brandRegistro").val(),
        procesor: $("#procesorRegistro").val(),
        os: $("#osRegistro").val(),
        description: $("#descriptionRegistro").val(),
        memory: $("#memoryRegistro").val(),
        hardDrive: $("#hardDriveRegistro").val(),
        availability: $("#availabilityRegistro").val(),
        price: $("#priceRegistro").val(),
        quantity: $("#quantityRegistro").val(),
        photography: $("#photographyRegistro").val()
    }

    var dataToSend = JSON.stringify(datos);
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        contentType: 'application/json',
        url: "http://localhost:8080/api/clone/update",
        type: 'PUT',
        success: function (response) {
            console.log(response);
            alert("Actualizado Correctamente :D");
            $("#ventanaRegistrarInventario").modal("hide");
            $("#miTablaInventario").empty();
            consultarInventario();
        },
    });
});

function buscarPorIDInventario(idItem) {
    $.ajax({
        url: "http://localhost:8080/api/clone/" + idItem,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            $("#ventanaRegistrarInventario").modal("show");
            $("#idInventario").val(response.id);
            $("#brandRegistro").val(response.brand);
            $("#procesorRegistro").val(response.procesor);
            $("#osRegistro").val(response.os);
            $("#descriptionRegistro").val(response.description);
            $("#memoryRegistro").val(response.memory);
            $("#hardDriveRegistro").val(response.hardDrive);
            $("#availabilityRegistro").val(response.availability);
            $("#priceRegistro").val(response.price);
            $("#quantityRegistro").val(response.quantity);
            $("#photographyRegistro").val(response.photography);
        }
    });
}

function eliminarInventario(idElemento) {
    let elemento = {
      id: idElemento,
    }
    let datoEnvio = JSON.stringify(elemento);
    console.log(datoEnvio);
    $.ajax({
      url: "http://localhost:8080/api/clone/" + idElemento,
      type: "DELETE",
      data: datoEnvio,
      datatype: "json",
      contentType: 'application/json',
      success: function (respuesta) {
        alert("Eliminado correctamente :)");
        $("#miTablaInventario").empty();
        consultarInventario();
      }
    });
  }


window.onload = consultarUsuario();
window.onload = consultarInventario();
