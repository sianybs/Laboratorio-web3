
// JavaScript Document
// Cerrar sesión después de 3 minutos sin actividad

const authInactividad = firebase.apps[0].auth();

const tiempoLimite = 3 * 60 * 1000;
const claveActividad = "ultimaActividadZodiaco";

let temporizadorInactividad;
let ultimaInteraccion = 0;

// Cerrar sesión por inactividad
async function cerrarPorInactividad() {
    clearTimeout(temporizadorInactividad);

    try {
        await authInactividad.signOut();
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }

    sessionStorage.removeItem(claveActividad);

    alert("Tu sesión se cerró por 3 minutos de inactividad.");
    window.location.replace("login.html");
}

// Comprobar tiempo transcurrido
function verificarInactividad() {
    const ultimaActividad = Number(
        sessionStorage.getItem(claveActividad)
    );

    if (
        ultimaActividad &&
        Date.now() - ultimaActividad >= tiempoLimite
    ) {
        cerrarPorInactividad();
        return;
    }

    clearTimeout(temporizadorInactividad);

    const tiempoRestante = ultimaActividad
        ? tiempoLimite - (Date.now() - ultimaActividad)
        : tiempoLimite;

    temporizadorInactividad = setTimeout(
        verificarInactividad,
        Math.max(0, tiempoRestante)
    );
}

// Registrar actividad del usuario
function registrarActividad() {
    const ahora = Date.now();

    // Evitar demasiadas escrituras
    if (ahora - ultimaInteraccion < 1000) {
        return;
    }

    ultimaInteraccion = ahora;
    sessionStorage.setItem(claveActividad, String(ahora));

    verificarInactividad();
}

// Escuchar movimientos e interacciones
[
    "mousemove",
    "mousedown",
    "keydown",
    "scroll",
    "touchstart"
].forEach(function (evento) {
    document.addEventListener(
        evento,
        registrarActividad,
        { passive: true }
    );
});

// Comprobar inactividad al volver a la pestaña
document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
        verificarInactividad();
    }
});

// Iniciar control de inactividad
if (!sessionStorage.getItem(claveActividad)) {
    sessionStorage.setItem(
        claveActividad,
        String(Date.now())
    );
}

verificarInactividad();
