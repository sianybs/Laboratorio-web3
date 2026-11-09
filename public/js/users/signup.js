
// JavaScript Document
// create local database firestore variable
var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

// create local from webpage inputs
const txtNombre = document.querySelector('#txtNombre');
const txtEmail = document.querySelector('#txtEmail');
const txtContra = document.querySelector('#txtContra');

// Nuevos campos de fecha
const txtFechaCreacion = document.querySelector('#txtFechaCreacion');
const txtUltAcceso = document.querySelector('#txtUltAcceso');

// create local insert button
const btnInsUser = document.querySelector('#btnInsUser');

// Mostrar fecha y hora actual en el formulario
function obtenerFechaLocal() {
    const fecha = new Date();
    const local = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
}

txtFechaCreacion.value = obtenerFechaLocal();
txtUltAcceso.value = obtenerFechaLocal();

// assign button listener
btnInsUser.addEventListener('click', function () {

    if (txtNombre.value.trim() === '' ||
        txtEmail.value.trim() === '' ||
        txtContra.value === '') {
        alert("Complete todos los campos.");
        return;
    }

    btnInsUser.disabled = true;

    auth.createUserWithEmailAndPassword(txtEmail.value, txtContra.value)
        .then((userCredential) => {

            const user = userCredential.user;

            // Fecha de creación y primer acceso
            const fechaActual = new Date();

            db.collection("datosUsuarios").add({
                "idemp": user.uid,
                "usuario": txtNombre.value,
                "email": user.email,
                "fecCreacion": fechaActual,
                "ultAcceso": fechaActual

            }).then(function (docRef) {

                alert("Usuario agregado satisfactoriamente");
                limpiar();

            }).catch(function (FirebaseError) {

                alert("Error al registrar datos del usuario. " + FirebaseError.message);

            }).finally(function () {
                btnInsUser.disabled = false;
            });

        })
        .catch((error) => {

            alert("Error al agregar el nuevo usuario: " + error.message);
            btnInsUser.disabled = false;

        });
});

// Limpiar formulario
function limpiar() {
    txtNombre.value = '';
    txtEmail.value = '';
    txtContra.value = '';

    txtFechaCreacion.value = obtenerFechaLocal();
    txtUltAcceso.value = obtenerFechaLocal();

    txtNombre.focus();
}
