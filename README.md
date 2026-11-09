\# Laboratorio Firebase – Signos del Zodiaco



\## Descripción del proyecto



Aplicación web desarrollada como parte de un laboratorio académico. Permite registrar usuarios, iniciar sesión y administrar información de los doce signos del zodiaco mediante los servicios de Firebase.



\## Tecnologías utilizadas



\- HTML5

\- CSS3

\- JavaScript

\- Firebase Authentication

\- Cloud Firestore

\- Firebase Hosting



\## Funcionalidades implementadas



1\. \*\*Registro de usuarios:\*\* permite crear cuentas y almacenar automáticamente la fecha de creación y la fecha de último acceso.

2\. \*\*Inicio de sesión:\*\* autenticación mediante correo electrónico y contraseña.

3\. \*\*Gestión de signos zodiacales:\*\* registro de signos con nombre, rango de fechas, imagen, elemento, astro y piedra.

4\. \*\*Visualización de signos:\*\* presentación de los datos mediante tarjetas.

5\. \*\*Edición de signos:\*\* permite seleccionar una tarjeta y modificar la información del signo.

6\. \*\*Cierre automático de sesión:\*\* después de tres minutos de inactividad en las páginas zodiacales.



\## Base de datos



La aplicación utiliza Cloud Firestore con dos colecciones principales:



\- `datosUsuarios`: almacena la información de los usuarios registrados, incluyendo las fechas de creación y último acceso.

\- `datosZodiaco`: almacena la información correspondiente a los doce signos zodiacales.



\## Uso de Firebase Storage y alternativa implementada



Durante el desarrollo del laboratorio se contempló utilizar \*\*Firebase Storage\*\* para almacenar las imágenes de los signos zodiacales.



Sin embargo, al intentar habilitar este servicio, Firebase solicitó actualizar el proyecto al \*\*plan Blaze\*\*, que requiere configurar una cuenta de facturación.



Debido a que el proyecto se desarrolla con fines académicos, se decidió mantener el \*\*plan Spark (gratuito)\*\*, evitando activar servicios que requirieran configurar facturación.



Como alternativa, se utilizó \*\*Firebase Hosting\*\* para alojar las imágenes directamente dentro de la carpeta `public/imagenes/`.



Las imágenes se publican junto con la aplicación y sus direcciones URL se almacenan en Cloud Firestore para mostrarlas en las tarjetas de los signos zodiacales.



Esta solución permitió cumplir con la visualización de imágenes sin utilizar Firebase Storage y sin cambiar el plan gratuito del proyecto.



\## Seguridad



Se implementaron reglas de seguridad en Cloud Firestore para controlar las operaciones sobre los datos.



Firebase Authentication permite identificar a los usuarios que acceden a la aplicación.



También se implementó un mecanismo de cierre automático de sesión después de tres minutos de inactividad.



\## Publicación del proyecto



La aplicación está publicada mediante Firebase Hosting.



\*\*Enlace:\*\* https://test01-ca4cb.web.app



\## Propósito académico



Aplicar conocimientos de desarrollo web, autenticación, almacenamiento de información en la nube, reglas de seguridad y despliegue de aplicaciones utilizando Firebase.

