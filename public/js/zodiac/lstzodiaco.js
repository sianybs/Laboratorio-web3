
// JavaScript Document
// create local database firestore variable
var db = firebase.apps[0].firestore();

const tabla = document.querySelector("#tabla");

// Recuperar signos zodiacales
db.collection("datosZodiaco")
    .orderBy("posic", "asc")
    .get()
    .then(function (querySnapshot) {

        tabla.innerHTML = "";

        if (querySnapshot.empty) {
            tabla.textContent = "Todavía no hay signos registrados.";
            return;
        }

        querySnapshot.forEach(function (doc) {

            const datos = doc.data();

            // Crear tarjeta
            const tarjeta = document.createElement("div");
            tarjeta.className = "divAnuncio m-3";

            // Permitir seleccionar la tarjeta
            tarjeta.style.cursor = "pointer";
            tarjeta.setAttribute("role", "link");
            tarjeta.setAttribute("tabindex", "0");

            function abrirEdicion() {
                document.location.href =
                    "editar.html?id=" + encodeURIComponent(doc.id);
            }

            tarjeta.addEventListener("click", abrirEdicion);

            tarjeta.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    abrirEdicion();
                }
            });

            // Imagen
            const imagen = document.createElement("img");
            imagen.src = datos.url;
            imagen.alt = datos.signo;
            imagen.style.width = "100%";

            // Nombre y rango
            const descripcion = document.createElement("div");
            descripcion.textContent =
                datos.signo + " - " + datos.rango;

            // Elemento
            const elemento = document.createElement("div");
            elemento.textContent =
                "Elemento: " + (datos.elemento || "Pendiente");

            // Astro celeste
            const astro = document.createElement("div");
            astro.textContent =
                "Astro celeste: " + (datos.astro || "Pendiente");

            // Piedra preciosa
            const piedra = document.createElement("div");
            piedra.textContent =
                "Piedra preciosa: " + (datos.piedra || "Pendiente");

            // Agregar elementos a la tarjeta
            tarjeta.appendChild(imagen);
            tarjeta.appendChild(descripcion);
            tarjeta.appendChild(elemento);
            tarjeta.appendChild(astro);
            tarjeta.appendChild(piedra);

            // Mostrar tarjeta
            tabla.appendChild(tarjeta);
        });

    })
    .catch(function (error) {

        console.error("Error al cargar signos:", error);
        tabla.textContent = "Error al recuperar los signos.";

    });
