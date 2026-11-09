
// JavaScript Document
// create local database firestore variable
var db = firebase.apps[0].firestore();

// Campos originales
const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtArchi = document.querySelector('#txtArchi');

// Nuevos campos solicitados por el profesor
const txtElemento = document.querySelector('#txtElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');

// Botón de registro
const btnLoad = document.querySelector('#btnLoad');

// Imágenes originales del laboratorio
const imagenesPermitidas = [
    '01_Acuario.png',
    '02_Pisis.png',
    '03_Aries.png',
    '04_Tauro.png',
    '05_Geminis.png',
    '06_Cancer.png',
    '07_Leo.png',
    '08_Virgo.png',
    '09_Libra.png',
    '10_Escorpio.png',
    '11_Sagitario.png',
    '12_Capricornio.png'
];

// Registrar signo zodiacal
btnLoad.addEventListener('click', async function () {

    const archivo = txtArchi.files[0];

    const posicion = Number(txtPosic.value);
    const signo = txtSigno.value.trim();
    const rango = txtRango.value.trim();

    const elemento = txtElemento.value;
    const astro = txtAstro.value.trim();
    const piedra = txtPiedra.value.trim();

    // Validar campos
    if (
        txtPosic.value.trim() === '' ||
        !Number.isInteger(posicion) ||
        posicion < 1 ||
        signo === '' ||
        rango === '' ||
        elemento === '' ||
        astro === '' ||
        piedra === '' ||
        !archivo
    ) {
        alert('Complete todos los campos y seleccione una imagen.');
        return;
    }

    // Validar elemento
    const elementosPermitidos = [
        'Fuego', 'Tierra', 'Aire', 'Agua'
    ];

    if (!elementosPermitidos.includes(elemento)) {
        alert('Seleccione un elemento válido.');
        return;
    }

    // Validar imagen
    if (!imagenesPermitidas.includes(archivo.name)) {
        alert('Seleccione una de las 12 imágenes originales del laboratorio.');
        return;
    }

    const url = '/imagenes/' + archivo.name;

    btnLoad.disabled = true;

    try {

        // Guardar datos en Firestore
        const documento = await db.collection('datosZodiaco').add({

            posic: posicion,
            signo: signo,
            rango: rango,
            url: url,

            // Nuevos datos
            elemento: elemento,
            astro: astro,
            piedra: piedra

        });

        alert('Signo registrado correctamente. ID: ' + documento.id);

        // Limpiar formulario
        txtPosic.value = '';
        txtSigno.value = '';
        txtRango.value = '';
        txtElemento.value = '';
        txtAstro.value = '';
        txtPiedra.value = '';
        txtArchi.value = '';

        txtPosic.focus();

    } catch (error) {

        console.error('Error al registrar signo:', error);
        alert('Error al guardar: ' + error.message);

    } finally {

        btnLoad.disabled = false;

    }

});
