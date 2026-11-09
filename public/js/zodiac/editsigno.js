
// JavaScript Document
// create local database firestore variable
var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

// Obtener ID del signo seleccionado
const parametros = new URLSearchParams(window.location.search);
const idSigno = parametros.get('id');

// Campos del formulario
const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtElemento = document.querySelector('#txtElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');
const txtUrl = document.querySelector('#txtUrl');

const btnActualizar = document.querySelector('#btnActualizar');

// Desactivar botón hasta cargar el documento
btnActualizar.disabled = true;

// Cargar datos del signo
if (!idSigno) {
    alert('No se seleccionó ningún signo.');
    document.location.href = 'lista.html';
} else {

    db.collection('datosZodiaco').doc(idSigno).get()
        .then(function (doc) {

            if (!doc.exists) {
                alert('El signo seleccionado no existe.');
                document.location.href = 'lista.html';
                return;
            }

            const datos = doc.data();

            txtPosic.value = datos.posic;
            txtSigno.value = datos.signo;
            txtRango.value = datos.rango;
            txtElemento.value = datos.elemento || '';
            txtAstro.value = datos.astro || '';
            txtPiedra.value = datos.piedra || '';
            txtUrl.value = datos.url;

            btnActualizar.disabled = false;

        })
        .catch(function (error) {
            console.error('Error al cargar signo:', error);
            alert('Error al recuperar los datos: ' + error.message);
        });
}

// Actualizar signo
btnActualizar.addEventListener('click', async function () {

    const posicion = Number(txtPosic.value);
    const signo = txtSigno.value.trim();
    const rango = txtRango.value.trim();
    const elemento = txtElemento.value;
    const astro = txtAstro.value.trim();
    const piedra = txtPiedra.value.trim();

    if (
        txtPosic.value.trim() === '' ||
        !Number.isInteger(posicion) ||
        posicion < 1 ||
        signo === '' ||
        rango === '' ||
        elemento === '' ||
        astro === '' ||
        piedra === ''
    ) {
        alert('Complete todos los campos.');
        return;
    }

    btnActualizar.disabled = true;

    try {

        await db.collection('datosZodiaco').doc(idSigno).update({
            posic: posicion,
            signo: signo,
            rango: rango,
            elemento: elemento,
            astro: astro,
            piedra: piedra
        });

        alert('Signo actualizado correctamente.');
        document.location.href = 'lista.html';

    } catch (error) {

        console.error('Error al actualizar signo:', error);
        alert('Error al actualizar: ' + error.message);

        btnActualizar.disabled = false;
    }
});
