import React, { useEffect } from 'react'
import firebase from 'firebase'

const Verify = () => {

  useEffect(() => {
    const config = {
      apiKey: "AIzaSyAi4oAauzCH0nJGBCfvK3NuqumM5_gnMLA",
      authDomain: "bargain-otp.firebaseapp.com",
      projectId: "bargain-otp",
      storageBucket: "bargain-otp.appspot.com",
      messagingSenderId: "138054163415",
      appId: "1:138054163415:web:e1d93d184c6d70e1634992"
    }

    firebase.initializeApp(config);
  }, [])


  const handleClick = () => {
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    let number = '+8801996388446';


    firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
      let code = prompt('enter the otp', '');
      if (code == null) return;
      e.confirm(code).then(function (result) {
        console.log(result.user, 'user');
        document.querySelector('label').textContent = result.user.phoneNumber + "Number Verified";
      }).catch((error) => {
        console.log(error)
      })
    })
  }

  return (
    <div>
      <label></label>
      <div id="recaptcha"></div>
      <button onClick={handleClick}>Click Here</button>
    </div>
  )

}
export default Verify