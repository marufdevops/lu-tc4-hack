import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAi4oAauzCH0nJGBCfvK3NuqumM5_gnMLA",
  authDomain: "bargain-otp.firebaseapp.com",
  projectId: "bargain-otp",
  storageBucket: "bargain-otp.appspot.com",
  messagingSenderId: "138054163415",
  appId: "1:138054163415:web:e1d93d184c6d70e1634992"
}
firebase.initializeApp(config);

export default firebase