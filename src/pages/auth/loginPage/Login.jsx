import "./login.css"
//react
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
//databáze
import { auth, googleProvider } from "../../../data/firebase"
import { signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider } from "firebase/auth"
import AuthDetails from "../AuthDetails"
//ikonky
import { FcGoogle} from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";




export const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  //přihlášení pomocí googlu
  const [googleValue, setGoogleValue] = useState("")
  const [facebookValue, setFacebookValue] = useState("")


  const signIn = (e) => {


    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      }).catch((error) => {

        console.log(error)

      })
  }

//přihlášení pomocí googlu
  const signInWithGoogle = () => {


    signInWithPopup(auth, googleProvider).then((data)=>{

    setGoogleValue(data.user.email)
    localStorage.setItem("googlEmail",data.user.email)

    })
  }

  useEffect(()=> {

setGoogleValue(localStorage.getItem("googleEmail"))


  })

  //přihlášení pomocí facebooku
   const signInWithFacebook = ()=> {

const facebookProvider = new FacebookAuthProvider()
    signInWithPopup(auth, facebookProvider ).then((data)=>{

      setFacebookValue(data.user.email)
      localStorage.setItem("facebookEmail",data.user.email)
  
      })

   }

   useEffect(()=> {

    setFacebookValue(localStorage.getItem("facebookEmail"))
    
    
      })



  return (

    <div className="sign-in-section">

      <AuthDetails></AuthDetails>

      <div className="sign-in-form-wrapper">
        <form className="sign-in-form" onSubmit={signIn}>
          <h1 className="sign-in-title">Přihlášení</h1>
          <input className="sign-in-input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="zde zadejte váš email" value={email}></input>
          <input className="sign-in-input" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="zde zadejte vaše heslo" value={password}></input>
          <input className="sign-in-button" type="submit" value="Přihlásit se" ></input>
          <div className="three-side-sign-in-wrapper">
          <p className="sign-in-icons-text">Přihlásit se pomocí:</p>
          <div className="sign-in-icons-wrapper">
          <FcGoogle className="fb-sign-in-icon" onClick={signInWithGoogle}></FcGoogle>
         <BsFacebook className="go-sign-in-icon" onClick={signInWithFacebook}></BsFacebook>
         </div>
          <Link to="/registrace" className="register-text">Nemáte vytvořený účet ? Klikněte zde.</Link>
          </div>
        </form>
      </div>




    </div>
  )
}

export default Login