
import "./register.css"
import { useState } from "react"
//database
import { auth } from "../../../data/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
//flashMessage
import { ToastContainer, toast } from 'react-toastify';
import { succesRegistrationNotify } from "../../../data/Notifications"
import 'react-toastify/dist/ReactToastify.css'
//icons
import { FaEyeSlash, FaEye } from "react-icons/fa";



const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Visibility, setVisibility] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [inputType, setInputType] = useState("password")
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [passwordValidity, setPasswordValidity] = useState({

    minChar: null,
    number: null,
    specialChar: null,

  })

  const signUp = (e) => {

    e.preventDefault()

    if (password && email && password.length >= 8) {
      //vytvoří nového uživatele s daty z inputu které zadával
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)

        }).catch((error) => {

          console.log(error)

        })

      succesRegistrationNotify()
      setPassword("")
      setVisibility(false)

    } else {

      setVisibility(true)

    }

  }

  const passwordVisibilityOn = () => {

    setPasswordVisibility(!passwordVisibility)
    setInputType("text")

  }

  const passwordVisibilityOf = () => {

    setPasswordVisibility(!passwordVisibility)
    setInputType("password")

  }

  const onChangePassword = password => {
    setPassword(password);

    setPasswordValidity({
      minChar: password.length >= 8 ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false
    });
  };


  return (

    <div className="sign-up-section">

      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="sign-up-form-wrapper">
        <form className="sign-up-form" onSubmit={signUp}>
          <h1 className="sign-up-title">Vytvořit účet</h1>

          <input required className="sign-up-input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail" value={email}></input>
          {Visibility && <p className="password-must-contain"> *heslo musí obsahovat minimálně 8 znaků</p>}


          <div className="password-wrapper">
            <input required className="sign-up-input-password" onFocus={() => { setPasswordFocused(true) }} onChange={(e) => onChangePassword(e.target.value)} type={inputType} placeholder="Heslo" value={password}></input>
            {passwordVisibility ? <FaEyeSlash onClick={() => passwordVisibilityOf()} className="eye-icon"></FaEyeSlash> : <FaEye onClick={() => passwordVisibilityOn()} className="eye-icon"></FaEye>}
          </div>

          <div className="validation-wrapper">
            <p className="validation-title">Heslo musí obsahovat:</p>

            <ul className="validation-text-wrapper">
              <li className={passwordValidity.minChar ? "text-sucess" : "text-danger"}>Minimálně 8 znaků dlouhé</li>
              <li className={passwordValidity.number ? "text-sucess" : "text-danger"}>Jedno číslo</li>
              <li className={passwordValidity.specialChar ? "text-sucess" : "text-danger"}>Jeden specialní znak</li>
            </ul>

          </div>

          <input className="sign-up-button" type="submit" value="Registrovat se" ></input>
        </form>
      </div>

    </div>
  )
}

export default Register