import "./authDetails.css"
import { useEffect, useState } from "react"
//database
import { auth } from "../../data/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";


export const AuthDetails = () => {


    const [authUser, setAuthUser] = useState(null)


    useEffect(() => {

        const listen = onAuthStateChanged(auth, (user) => {


            if (user) {

                setAuthUser(user)

            } else {

               setAuthUser(null)

            }
        })

        return ()=> {

            listen()
        }
    }, [])

    const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("sign out successful");
          })
          .catch((error) => console.log(error));
      };


    return ( 
    
    <div className="sign-out-section">{authUser ? <><p className="auth-user">{"Přihlášen jako " + authUser.email}</p><button className="sign-out-button" onClick={userSignOut}>Odhlásit se</button></> : <p className="auth-user">Nejte přihlášený</p>}</div>

    )
}

export default AuthDetails