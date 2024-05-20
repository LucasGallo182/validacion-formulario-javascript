//Firebase
import "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore-compat.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDafZdiDo18Y78oto2vRRlYsg0T-IxFL58",
    authDomain: "datos-formulario-10a5c.firebaseapp.com",
    projectId: "datos-formulario-10a5c",
    storageBucket: "datos-formulario-10a5c.appspot.com",
    messagingSenderId: "399009746346",
    appId: "1:399009746346:web:22bf98dad0698e9a2b2fd3",
    measurementId: "G-6G45Z6DRST"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

//Escuchador de eventos en el boton SUBMIT
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault() //previene que el form actue como HTML, necesitamos que actue con JS

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') { //trim borra espacios vacios al costado
        errorNombre.textContent = 'Por favor introduce tu nombre'
        errorNombre.classList.add('error-message') //error-message es una clase ya hecha en CSS
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //Validar campo correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //patrón de validación básico

    if (!emailPattern.test(emailEntrada.value)) { //test es para probar, si es negativo va por la primera condicion, false + false = positivo
        emailError.textContent = 'Por favor introduce un email válido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //Validar campo contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, numeros, mayúsculas y minúsculas y caracteres espciales'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }


    //Si todos los campos son validos enviar formulario
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        //backend que reciba la informacion
        // Add a new document in collection "cities"
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
            .then((docRef) => {
                alert('El formulario se ha enviado con éxito', docRef.id);
                document.getElementById('formulario').reset();
            })
            .catch((error) => {
                alert(error);
            });

        alert('El formulario se ha enviado con éxito')
        document.getElementById('formulario').reset() //Se limpia el formulario
    }

})