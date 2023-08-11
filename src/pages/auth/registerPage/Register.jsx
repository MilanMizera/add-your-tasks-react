import AuthDetails from "../AuthDetails"
import "./register.css"
import { useState } from "react"
//database
import { auth } from "../../../data/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
//flashMessage
import { ToastContainer, toast } from 'react-toastify';
import { succesRegistrationNotify } from "../../../data/Notifications"
import 'react-toastify/dist/ReactToastify.css'



export const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [Visibility, setVisibility] = useState(false)


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

      <AuthDetails></AuthDetails>
      <div className="sign-up-form-wrapper">
        <form className="sign-up-form" onSubmit={signUp}>
          <h1 className="sign-up-title">Vytvořit účet</h1>
          <input required className="sign-up-input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="zde zadejte váš email" value={email}></input>
          {Visibility && <p className="password-must-contain"> *heslo musí obsahovat minimálně 8 znaků</p>}
          <input required className="sign-up-input" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="zde zadejte vaše heslo" value={password}></input>
          <input className="sign-up-button" type="submit" value="Registrovat se" ></input>
        </form>
      </div>




    </div>
  )
}

export default Register