import AuthDetails from "../AuthDetails"
import "./register.css"
import { useState } from "react"
//database
import {auth} from "../../../data/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"



export const Register = () => {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


 const signUp = (e)=> {

e.preventDefault()
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential)=> {
console.log(userCredential)
}).catch((error)=> {

console.log(error)

})


 }


  return (

    <div className="sign-in-section">

<AuthDetails></AuthDetails>

      <form onSubmit={signUp}>
        <h1>Vytvořit účet</h1>
        <input onChange={(e)=>setEmail( e.target.value)} type="email" placeholder="zde zadejte váš email" value={email}></input>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="zde zadejte vaše heslo" value={password}></input>
        <input type="submit" value="Registrovat se" ></input>
      </form>





    </div>
  )
}

export default Register