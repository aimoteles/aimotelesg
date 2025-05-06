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
const loginButton = document.getElementById("google-signin-button");
const logoutButton = document.getElementById("logout-button");
const userNameSpan = document.getElementById("user-name");
const userInfoDiv = document.getElementById("user-info");
const infolabel = document.getElementById("info-label");
// Obtener el elemento img por su clase
const imgElement = document.querySelector(".container-img .centered-image");
const imageUrlusuarioactivo = "https://i.postimg.cc/YSbmGCBs/usuarios.png";
const imageUrlusuarioinac = "https://i.postimg.cc/cJsnL823/usuarioinac.png";

const goToHabitacionesButton = document.getElementById("go-to-habitaciones");


// Función para actualizar la UI basada en el estado de autenticación
function updateUI(user) {
    if (user) {
        loginButton.classList.add("hidden");
        logoutButton.classList.remove("hidden");
        userInfoDiv.classList.remove("hidden");
        logoutButton.style.display = 'block';
        loginButton.style.display = 'none';
        userNameSpan.textContent = user.displayName;
        infolabel.textContent = "";
        // URL de la imagen que deseas mostrar
        imgElement.src = imageUrlusuarioactivo;
        // Guardar información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));
        goToHabitacionesButton.classList.remove("hidden"); // Mostrar el botón "Habitaciones"
        goToHabitacionesButton.classList.add("displayblock");
    } else {
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
        userInfoDiv.classList.add("hidden");
        logoutButton.style.display = 'none';
        loginButton.style.display = 'block';
        infolabel.textContent = "Acceder con Google";
        // URL de la imagen que deseas mostrar
        imgElement.src = imageUrlusuarioinac;
        localStorage.removeItem('user');
        goToHabitacionesButton.classList.add("hidden"); // Ocultar el botón "Habitaciones"
        goToHabitacionesButton.classList.remove("displayblock");
    }
}

/*
loginButton.addEventListener("click", (e) => {
  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;      
      const user = result.user;
      updateUI(user);      
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
*/



//Evento para inicio de sesión con Google
loginButton.addEventListener("click", () => {
    signInWithPopup(auth, provider) // Usar signInWithPopup
        .then((result) => {
            // El usuario ha iniciado sesión correctamente.
            const user = result.user;
            updateUI(user); // Actualizar la UI con la información del usuario.

            //console.log("Usuario autenticado:", user);

            // Redirigir a la página de habitaciones después del inicio de sesión exitoso
            //window.location.href = "/public/habitaciones.html";   
        })
        .catch((error) => {
            // Ocurrió un error durante el inicio de sesión.
            console.error("Error al iniciar sesión:", error);
        });
});

// Evento para cerrar sesión
logoutButton.addEventListener("click", (e) => {
    signOut(auth)
        .then(() => {
            // El usuario ha cerrado sesión correctamente.
            updateUI(null); // Actualizar la UI para mostrar que no hay usuario.
            //console.log("Usuario cerró sesión");
            // Eliminar la información del usuario de localStorage
            localStorage.removeItem('user');
            //pagina principal
            window.location.href = "index.html";
        })
        .catch((error) => {
            // Ocurrió un error al cerrar sesión.
            console.error("Error al cerrar sesión:", error);
        });
});

// Verificar el estado de autenticación al cargar la página
onAuthStateChanged(auth, (user) => {
    if (user) {
        // El usuario ya está autenticado.
        updateUI(user); // Actualizar la UI con la información del usuario.
        //console.log("Usuario ya autenticado:", user);
        //alert("usuario autenticado");
    } else {
        // No hay ningún usuario autenticado.
        updateUI(null); // Actualizar la UI para mostrar que no hay usuario.
        //console.log("No hay usuario autenticado");
    }
});

// Manejar el clic del botón "Habitaciones"
goToHabitacionesButton.addEventListener("click", () => {
    window.location.href = "/public/habitaciones.html";
});