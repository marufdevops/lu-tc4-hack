// --------------------------------Hadeling Firebase----------------------------------//
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, RecaptchaVerifier } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAxzX4sBmzREWTUizcb5p6DAibIi2djfWU",
    authDomain: "net-ninja-firebase-7e164.firebaseapp.com",
    projectId: "net-ninja-firebase-7e164",
    storageBucket: "net-ninja-firebase-7e164.appspot.com",
    messagingSenderId: "559767507773",
    appId: "1:559767507773:web:9b8cb4a842fd1a4d6eeb54",
    measurementId: "G-QC7Z205B2K"
};


//   init app
initializeApp(firebaseConfig);

// init service
const auth = getAuth();


//Recaptcha
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

recaptchaVerifier.render().then(widgetId => {
    window.recaptchaWidgetId = widgetId;
})

// const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
const appVerifier = window.recaptchaVerifier;

//sign-up
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("Submit button pressed");
    // get user info

    let name = {
        first: document.querySelector("#firstName").value,
        last: document.querySelector("#lastName").value,
    };

    let email = document.querySelector("#signup-email").value;
    let password = document.querySelector("#signup-password").value;
    let confirmPassword = document.querySelector('#confirm-password').value;

    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    console.log(name);

    document.location.href = "index.html";

})





// -----------------------------------------------------------------------------------------------------------//
// Manupulating DOM