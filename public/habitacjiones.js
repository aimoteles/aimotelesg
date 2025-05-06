/**
 * Autor: jl_
 * ADSI - SENA
 * email: devluisluzardo@gmail.com
 * Fecha creacion : 21 - Sept- 2023
 *
 * desscripcion:
 *
 **/

//Firebase: Authentication
//Google Firebase : Google Popu up
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged,
    signOut,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

//Firebase: RealTime Database
import {
    getDatabase,
    ref,
    set,
    onValue,
    query,
    orderByKey,
    get,
    limitToLast,
    equalTo,
    child,
    update
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

//Firebase: Initialize service
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDuMHRwhqSABNe6BKVsCLw21YCTeFlNM9Q",
  authDomain: "authspark-2v8ln.firebaseapp.com",
  databaseURL: "https://authspark-2v8ln-default-rtdb.firebaseio.com",
  projectId: "authspark-2v8ln",
  storageBucket: "authspark-2v8ln.firebasestorage.app",
  messagingSenderId: "797686408929",
  appId: "1:797686408929:web:a0647f8dca379800ddb9a0"
});
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);

//+++++++ !!!! fin config registro firebase

// Variables para manejar elementos de la UI (asegúrate de que estos IDs existan en tu HTML)
const userInfoSpan = document.getElementById('user-email');
const loginButton = document.getElementById('login-button');

// Función para verificar el estado de autenticación y mostrar el correo electrónico
function verificarAutenticacion() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // El usuario está autenticado, mostrar su correo electrónico
            userInfoSpan.textContent = user.email;
        } else {
            // El usuario no está autenticado, mostrar "Desconocido"
            userInfoSpan.textContent = "Desconocido";
        }
    });
}

// Función para redirigir a la página de inicio de sesión (index.html)
function irAInicioSesion() {
    // Aquí debes colocar la ruta correcta a tu página de inicio de sesión
    window.location.href = "/index.html";
}

// Event listener para el botón de inicio de sesión
loginButton.addEventListener('click', irAInicioSesion);

// Verificar el estado de autenticación al cargar la página
verificarAutenticacion();
