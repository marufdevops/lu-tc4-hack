// --------------------------------Hadeling Firebase----------------------------------//
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider } from 'firebase/auth';


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
// console.log(recaptchaResponse);
// const appVerifier = window.recaptchaVerifier;
// console.log(appVerifier);

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


    var T = document.getElementById("OTP-div"),
        displayValue = "";
    if (T.style.display == "")
        displayValue = "none";

    T.style.display = displayValue;

    T = document.getElementById("verify-btn"),
        displayValue = "";
    if (T.style.display == "")
        displayValue = "none";

    T.style.display = displayValue;

    document.getElementById("register-btn").style.display = "";




    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    console.log(name);


    const phoneNumber = email;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            // const sentCodeId = confirmationResult.verificationId;
            // let verify = document.querySelector("#verify-btn");
            // verify.addEventListener('click', () => signInWithPhone(sentCodeId));
        });

    const signInWithPhone = sentCodeId => {
        const code = document.querySelector("#OTP-input").value;
        var credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);
        // const credential = PhoneAuthProvider.credential(sentCodeId, code);
        signInWithCredential(auth, credential)
            .then((cred) => {
                console.log(cred.user);
                // window.location.assign('./profile');
            })
            .catch(error => {
                console.error(error);
            })
    }

    document.location.href = "./OTP.html";

})


// const OTPform = document.querySelector("#OTP-form");
// OTPform.addEventListener('submit', e => {
//     e.preventDefault();
//     console.log(document.querySelector("#form3Example4").value);
// });



// -----------------------------------------------------------------------------------------------------------//
// Manupulating DOM