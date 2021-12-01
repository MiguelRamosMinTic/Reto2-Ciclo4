$("#login").click(function(){
    if($.trim($("#email").val()) == "" || $.trim($("#contrasena").val()) == ""){
        alert("Por favor ingrese el correo y la contraseña");
    }else{
        let datos = {
            email: $("#email").val(),
            contrasena: $("#contrasena").val()
        }
        $.ajax({
            url:"http://localhost:8080/api/user/"+datos.email+"/"+datos.contrasena,
            method:"GET",
            dataType:"json",
            success:function(response){
                console.log(response);
                validarUsuario(response)
            }
        });
    }
});

function validarUsuario(response) {
    if(response.id != null){
        location.href = "usuarios.html";
        alert("¡Bienvenido! "+ response.name);

        var bienvenida = document.getElementById("#bienvenido");
        var texto = document.createElement("P");
        texto.append("Hola");
        bienvenida.append(texto);
    }else{
        alert("Usuario no registrado :/");
    }
}


$("#guardar").click(function(){
    if($.trim($("#emailRegistro").val()) == "" || $.trim($("#usuarioRegistro").val()) == "" || $.trim($("#contrasenaRegistro").val()) == "" || $.trim($("#contrasenaRegistro2").val()) == ""){
        alert("Por favor ingrese todos los campos");
    }else{
        if($("#contrasenaRegistro").val() == $("#contrasenaRegistro2").val()){
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
            datos=JSON.stringify(datos);
            $.ajax({
                url:"http://localhost:8080/api/user/new",
                method:"POST",
                dataType:"JSON",
                data:datos,
                contentType:"application/json",
                success:function(response){
                    console.log(response);
                },
                statusCode: {
                    201: function(response){
                        console.log(response);
                        alert("Registrado Correctamente");
                    }
                }
            });
        }else{
            alert("Las contraseñas no coinciden :c");
            $("#contrasenaRegistro").val("");
            $("#contrasenaRegistro2").val("");
        }
    }
});


function validarEmail(){
    let datos = {
        email: $("#emailRegistro").val()
    }
    $.ajax({
        url:"http://localhost:8080/api/user/emailexist/"+datos.email,
        method:"GET",
        dataType:"json",
        success:function(response){
            console.log(response);
        }
    });
}


$("#guardarInventario").click(function(){
    if($.trim($("#brandRegistro").val()) == "" || $.trim($("#procesorRegistro").val()) == "" || $.trim($("#osRegistro").val()) == "" || $.trim($("#descriptionRegistro").val()) == "" || $.trim($("#memoryRegistro").val()) == "" || $.trim($("#hardDriveRegistro").val()) == "" || $.trim($("#availabilityRegistro").val()) == "" || $.trim($("#priceRegistro").val()) == "" || $.trim($("#quantityRegistro").val()) == "" || $.trim($("#photographyRegistro").val()) == ""){
        alert("Por favor ingrese todos los campos");
    }else{
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
                url:"http://localhost:8080/api/clone/new",
                method:"POST",
                dataType:"JSON",
                data:JSON.stringify(datos),
                contentType:"application/json",
                Headers:{
                    "Content-Type":"application/json"
                },
                statusCode: {
                    201: function(response){
                        console.log(response);
                        alert("Registrado Correctamente");
                    }
                }
            });
    }
});