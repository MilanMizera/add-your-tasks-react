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

        return () => {

            listen()
        }
    }, [])

    // odhlásí uživatele
    const userSignOut = () => {
        signOut(auth)

    }


    return (<>

        {authUser ? <div className="sign-out-section-sign-in"><p className="auth-user-sign-in">{"Přihlášen jako " + authUser.email}</p><button className="sign-out-button" onClick={userSignOut}>Odhlásit se</button></div> : <div className="sign-out-section-not-sign-in"> <p className="auth-user-not-sign-in">Nejste přihlášený</p></div>}

    </>
    )
}

export default AuthDetails