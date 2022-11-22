$(document).ready(() => {

    //------------------------------ DATEPICKER ------------------------------

    //Configuration of the datepicker to change the region to Catalan. Adding the names of the months and days in Catalan.
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
        //maxDate: -1,
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

    $(".DNIClient").change(function () {
        validarDNI($(this));
      });

    $(".fullNameClient").change(function () {
        validarNombre($(this));
      });

    $(".amount").change(function () {
        validarAmount($(this));
      });

    $(".datepicker").change(function () {
        validateDate($(this));
    });      
});

//------------------------------ REQUEST WITH AJAX METHOD ----------------

//ajax request get method 
//it will ask the server for the data node will pass the data from the database 
//Ajax method for the database and creation of the table dynamically
$.ajax({
    type: "GET",
    url: "http://localhost:3000/api/login",
    dataType: "json",
    success: function (response) {
        console.log(response);
        const table = $(`
        <table>
            <tr>
                <th>DNI</th>
                <th>Name</th>
                <th>Account type</th>
                <th>Amount</th>
                <th>Client type</th>
                <th>Entry Date</th>
            </tr>
        </table>
        `)
        //Loop used to create entries within the table and display the data from the database
        for (let i = 0; i < response.length; i++) {
            let dni = '<input type="text" id="dni'+i+'" class="DNIClient form-control form-control-sm" value="'+response[i].DNI+'">';
            let name = '<input type="text" id="name'+i+'" class="fullNameClient form-control form-control-sm" value="'+response[i].NAME+'">';
            let account_options = [
                "Savings account",
                "Investement account",
                "Personal account",
                "Solidary account",
                "Individual Savings Account",
                "Fixed deposit account",
                "Tax-Free Savings Account",
              ];
            let accountType = '<select>';

            account_options.forEach((options,index)=>{
                if (response[i].ACCOUNT_TYPE === options) {
                    accountType += `<option value='${options}' selected >${options}</option>`;
                  } else {
                    accountType += `<option value='${options}'>${options}</option>`;
                  }
            });

            accountType += "</select></td>";

            let amount = '<input type="text" id="amount'+i+'" class="amount form-control form-control-sm" value="'+response[i].AMOUNT+'">';
            if(response[i].AMOUNT > 100000){
                var clientType = '<input type="text" id="clientType'+i+'" class="clientType form-control form-control-sm" value="Very rich client">';
            }else if(response[i].AMOUNT > 10000 && response[i].AMOUNT < 100000){
                var clientType = '<input type="text" id="clientType'+i+'" class="clientType form-control form-control-sm" value="Normal client">';
            }else{
                var clientType = '<input type="text" id="clientType'+i+'" class="clientType form-control form-control-sm" value="Poor client">';
            }
            //var date = new Date(response[i].ENTRY_DATE);
            //let dateFormat = date.toLocaleDateString('es-ES', { timeZone: "UTC" });
            let entryDate = '<input type="text" id="entryDate' + i + '" class="datepicker form-control form-control-sm" value="' + response[i].ENTRY_DATE + '">';
            $("#div1").append(table);
            //Asignación de los datos en sus campos correspondientes 
            table.append(`
            <tr>
            <td>${dni}</td>
            <td>${name}</td>
            <td>${accountType}</td>
            <td>${amount}</td>
            <td>${clientType}</td>
            <td>${entryDate}</td>
            </tr>
            `)
            //inicializeObj();
        }
    }
});

//------------------------------- OBJECTS ------------------------------

//Function to initialize objects
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

//------------------------------ VALIDATIONS ------------------------------

//Function to validate the DNI
function validarDNI(dni) {
    //We collect the value of the DNI in a variable.
    var dni = $(dni).val();

    if (dni.length == 0) {
        $("#errorDNI").text("Falta por rellenar el campo DNI");
        console.log("Falta por rellenar el campo DNI")
        return false;
    }
    else if (dni.length > 0) {
        // In case you put the DNI with a hyphen, it is deleted.
        if ((dni.length == 10) && (dni.indexOf('-') != -1)) {
            dni = dni.replace('-', '');
        }
        // In case you put the hyphen but you are missing identification numbers.
        if (((dni.length < 10) || (dni.length > 10)) && (dni.indexOf('-') != -1)) {
            $("#errorDNI").text("Debe de escribir un DNI correcto");
            console.log("Debe de escribir un DNI correcto")
            return false;
        }
        // Numbers are separated from the letter
        var letraDNI = dni.substring(8, 9).toUpperCase();
        var numDNI = parseInt(dni.substring(0, 8));

        // The letter corresponding to the number is calculated
        var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
        var letraCorrecta = letras[numDNI % 23];

        if (letraDNI != letraCorrecta) {
            $("#errorDNI").text("Debe de escribir un DNI correcto");
            console.log("Debe de escribir un DNI correcto")
            return false;
        }else{
    $("#errorDNI").text("");
    console.log("DNI correcto")
    }
}
    
}

//------------------------------------------------------------------------------
//Function to validate the name
function validarNombre(name) {
    // Validation of the client's name: Checks if the data has been entered and if it complies with the indicated pattern.
    var patronCP = /^[a-zA-Z ]+$/;
    var name = $(name).val();
    console.log(name);
    console.log(name.length);
    if (name.length > 30) {
        $("#errorDNI").text("Nombre demasiado largo");
        console.log("Nombre demasiado largo")
        return false;
    }
    else if (name.length == 0) {
        $("#errorDNI").text("Falta por rellenar el campo de Nombre");
        console.log("Falta por rellenar el campo de Nombre")
    }
    else if (!(patronCP.test(name))) {
        $("#errorDNI").text("Nombre no valido");
        console.log("Nombre no valido")
        return false;
    }
    else {
        $("#errorName").text("");
        console.log("El campo de Nombre es correcto")
        return true;
    }
}

//------------------------------------------------------------------------------
//Function to validate the quantity
function validarAmount(amount) {
    // Validation of the Amount: Checks if the data has been entered and if it complies with the indicated pattern.
    console.log("Funcion validar amount")
    var pattern = /^[0-9]+$/;
    var cantidad = $(amount).val();
    console.log(cantidad.length)
    if (cantidad < 0) {
        $("#errorAmount").text("No puede ser una cantidad inferior a 0");
        console.log("No puede ser una cantidad inferior a 0")
        return false;
    }
    else if (cantidad.length == 0) {
        $("#errorAmount").text("Falta por especificar una cantidad");
        console.log("Falta por especificar una cantidad")
    }
    else if (!(pattern.test(cantidad))) {
        $("#errorAmount").text("Cantidad no valida");
        console.log(pattern.test(cantidad))
        console.log("Cantidad no valida")
        return false;
    }
    else {
        $("#errorAmount").text("");
        console.log("cantidad correcta")
        return true;
    }
}

function validateDate(date){
    var date = $(date).val()
    console.log(date)
    let newDate = new Date(date);
    console.log(newDate)
    let today = new Date();
    console.log(today)
    let okDate = newDate.getTime() < today.getTime();
    if (okDate) {
        console.log("fecha correcta")
      } else {
        console.log("fecha incorrecta")
      }
}
function UpdateDB() {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/login",
      data: data,
      dataType: "json",
      success: function (response) {

      },
    });
  }

function ShowLoading(interval) {
    $(".container-fluid").css("display", "none");
    $("#loader").css("display", "block");
    setInterval(function () { location.reload() }, 1200);
    alert("Data inserted Correctly")

}