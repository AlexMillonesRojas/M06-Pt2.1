const { response } = require("express");

$(document).ready(() => {

    //------------------------------ DATEPICKER ------------------------------

    //COnfiguracion del datapicker apra cambiar la region a catalán. Añadiendole los nombre de los meses i dias en catalán.
    $.datepicker.regional['ca'] = {
        closeText: 'Tancar',
        prevText: 'Prv',
        nextText: 'Seg',
        currentText: 'Avui',
        monthNames: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
        monthNamesShort: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
        dayNames: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
        dayNamesShort: ['Dug', 'Dln', 'Dmt', 'Dmc', 'Djs', 'Dvn', 'Dsb'],
        dayNamesMin: ['Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        maxDate: -1,
        isRTL: false,
        changeMonth: true,
        changeYear: true,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ca']);
    $(() => {
        $('.datepicker').datepicker({
            showAnim: 'blind'
        });
    });

    //------------------------------------------------------------------------------

    $('.DNIClient').focusout(() => {
        validarDNI();
        //validarAmount();
        //validarNombre();
    });
    $('.fullNameClient').focusout(() => {
        //validarDNI();
        //validarAmount();
        validarNombre();
    });
    $('.amount').focusout(() => {
        //validarDNI();
        validarAmount();
        //validarNombre();
    });
});

//------------------------------ PETICION CON METODO AJAX ----------------

//peticion ajax metodo get 
//le pedira los datos a el servidor node le pasara los datos de la base de datos 
// https://www.arkaitzgarro.com/jquery/capitulo-7.html

//Metodo ajax para la base de datos y cración de la tabla de forma dinámica
$.ajax({
    type: "GET",
    url: "http://localhost:3000/api/login",
    //data: "data",
    dataType: "json",
    success: function (response) {
        console.log(response);
        const table = $(`
        <table>
            <tr>
                <th>DNI</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Client type</th>
                <th>Entry Date</th>
            </tr>
        </table>
        `)
        //Bucle que sirve para crear inputs dentro de la tabla y muestra los datos de la base de datos
        for (let i = 0; i < response.length; i++) {
            let dni = '<input type="text" id="dni' + i + '" class="DNIClient form-control form-control-sm" value="' + response[i].DNI + '" maxlength="9"">';
            let name = '<input type="text" id="name' + i + '" class="fullNameClient form-control form-control-sm" value="' + response[i].Name + '">';
            let amount = '<input type="text" id="amount' + i + '" class="amount form-control form-control-sm" value="' + response[i].Amount + ' €">';
            if (response[i].Amount > 100000) {
                var clientType = '<input type="text" id="clientType' + i + '" class="clientType form-control form-control-sm" value="Very rich client">';
            } else if (response[i].Amount > 10000 && response[i].Amount < 100000) {
                var clientType = '<input type="text" id="clientType' + i + '" class="clientType form-control form-control-sm" value="Normal client">';
            } else {
                var clientType = '<input type="text" id="clientType' + i + '" class="clientType form-control form-control-sm" value="Poor client">';
            }
            var date = new Date(response[i]['Entry date']);
            let dateFormat = date.toLocaleDateString('es-ES', { timeZone: "UTC" });
            let entryDate = '<input type="text" id="entryDate' + i + '" class="datepicker form-control form-control-sm" value="' + dateFormat + '">';
            $("#div1").append(table);
            //Asignación de los datos en sus campos correspondientes 
            table.append(`
            <tr>
            <td>${dni}</td>
            <td>${name}</td>
            <td>${amount}</td>
            <td>${clientType}</td>
            <td>${entryDate}</td>
            </tr>
            `)
            inicializeObj();
        }
    }
});

//------------------------------- OBJETOS ------------------------------

//Funcion para inicializar los objetos
function inicializeObj() {
    client_type_account = new accountTypeObj(response.id, response.type);
    client_type = new clientTypeObj(response.id, response.type, response.description);
    account = new accountObj(
        response.DNIClient,
        response.fullNameClient,
        response.amount,
        response.entryDate,
        clientType,
        accountType,
    );
}

//------------------------------ VALIDACIONES ------------------------------

//Funcion para validar el DNI 
function validarDNI() {
    // Validación de DNI: Comprueba si el DNI es correcto.
    if ($('.DNIClient').val().length > 0) {
        //Recogemos el valor del DNI en una variable.
        var dni = $('.DNIClient').val();
        // En caso que ponga el DNI con guión, se suprime.
        if ((dni.length == 10) && (dni.indexOf('-') != -1)) {
            dni = dni.replace('-', '');
        }
        // En caso que ponga el guión pero le faltan números de identificación
        if (((dni.length < 10) || (dni.length > 10)) && (dni.indexOf('-') != -1)) {
            $("#errorDNI").text("Debe de escribir un DNI correcto");
            return false;
        }
        //Se separan los números de la letra
        var letraDNI = dni.substring(8, 9).toUpperCase();
        var numDNI = parseInt(dni.substring(0, 8));

        //Se calcula la letra correspondiente al número
        var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
        var letraCorrecta = letras[numDNI % 23];

        if (letraDNI != letraCorrecta) {
            $("#errorDNI").text("Debe de escribir un DNI correcto");
            return false;
        }
    } else if (dni == null) {
        $("#errorDNI").text("Falta por rellenar el campo DNI");
        return false;
    }
    else {
        $("#errorDNI").text("");
    }
}

//------------------------------------------------------------------------------
//Funcion para validar el nombre
function validarNombre() {
    // Validación del nombre del cliente: Comprueba si el dato ha sido introducido y si cumple con el patrón indicado.
    var patronCP = /^[a-zA-Z ]+$/;
    var nombre = $(".fullNameClient").val();
    if (nombre.length > 30) {
        $("#errorDNI").text("Nombre demasiado largo");
        return false;
    }
    else if (!(patronCP.test(nombre))) {
        $("#errorDNI").text("Nombre no valido");
        return false;
    }
    else {
        $("#errorName").text("");
        return true;
    }
}

//------------------------------------------------------------------------------
//Funcion para validar la cantidad
function validarAmount() {
    // Validación del Amount: Comprueba si el dato ha sido introducido y si cumple con el patrón indicado.
    var pattern = /[0-9 $]/g;
    var cantidad = $('.amount').val();
    if (cantidad.length < 0) {
        $("#errorAmount").text("No puede ser una cantidad inferior a 0");
        return false;
    }
    else if (!(pattern.test($('.amount').val()))) {
        $("#errorAmount").text("Cantidad no valida");
        return false;
    }
    else {
        $("#errorName").text("");
        return true;
    }
}


function ShowLoading(interval) {
    $(".container-fluid").css("display", "none");
    $("#loader").css("display", "block");
    setInterval(function () { location.reload() }, 1200);
    alert("Data inserted Correctly")

}