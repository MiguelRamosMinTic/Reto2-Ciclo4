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

        var bienvenida = document.getElementById("#bienvenido");
        var texto = document.createElement("P");
        texto.append("Hola");
        bienvenida.append(texto);
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
                }
            }
        });
    }
});

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
                    consultar();
                    $('#ventanaRegistrar').modal('hide');
                }
            }
        });
    }
});

function consultar() {
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
            consultar();
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

            var editar= document.getElementById("#guardarUsuario");

        }
    });
}







window.onload = consultar();
