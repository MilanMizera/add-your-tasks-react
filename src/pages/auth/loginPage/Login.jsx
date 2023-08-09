import "./login.css"
//react
import { useState } from "react"
import { Link } from "react-router-dom";
//databáze
import { auth } from "../../../data/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import AuthDetails from "../AuthDetails"




export const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const signIn = (e) => {


    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      }).catch((error) => {

        console.log(error)

      })


  }


  return (

    <div className="sign-in-section">

      <AuthDetails></AuthDetails>

      <div className="sign-in-form-wrapper">
        <form className="sign-in-form" onSubmit={signIn}>
          <h1 className="sign-in-title">Přihlášení</h1>
          <input className="sign-in-input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="zde zadejte váš email" value={email}></input>
          <input className="sign-in-input" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="zde zadejte vaše heslo" value={password}></input>
          <input className="sign-in-button" type="submit" value="Přihlásit se" ></input>
          <Link to="/registrace" className="register-text">Nemáte vytvořený účet ? Klikněte zde.</Link>
        </form>
      </div>




    </div>
  )
}

export default Login