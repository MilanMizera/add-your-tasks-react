//react
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

        <div>{authUser ? <><p>{"Přihlášen jako " + authUser.email}</p><button onClick={userSignOut}>Odhlásit se</button></> : <p>Byl jste úspěšně odhlášen</p>}</div>

    )
}

export default AuthDetails