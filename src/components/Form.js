import { useState } from "react"
import "./form.css"
//ikonky
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
// automaticky psaný text
import Typewriter from 'typewriter-effect';

// automatické zprávy (flashmessage)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { succesNotify, errorNotify } from "./Notifications";




const App = () => {

    const [userValue, setUserValue] = useState("")
    const [tasksArray, setTasksArray] = useState([])
    const [countTasks, setCountTasks] = useState(0)


    const formSubmit = (event) => {
        // preventDefault vypne refrešování formuláře, aby tam zůstala hodnota od uživatele, ale pozor musí být definováná parametr s názvem event
        event.preventDefault()


        if (userValue && userValue.length < 27) {

            const newTask = { taskName: userValue, id: crypto.randomUUID() }

            setTasksArray((tasksArray) => {
                //přidání hodnoty z formuláře do pole 
                return [...tasksArray, newTask]

            })

            setUserValue("")
            setCountTasks(countTasks + 1)
            succesNotify()

        } else {

            errorNotify()

        }



    }

    const deleteTask = (localId) => {

        const filtredTasks = tasksArray.filter((oneTask) => {


            return oneTask.id !== localId


        })

        setCountTasks(countTasks - 1)
        setTasksArray(filtredTasks)

    }


    return (<ul className="background">

        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>

        <div className="form-wrapper">



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


            <div className="typed-text-section">
                <Typewriter className="Typewriter__wrapper"
                    options={{
                        strings: ['Přidávejte si své úkoly', 'Editujte si své úkoly'],
                        cursor: "...",
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>

            <form onSubmit={formSubmit} className="my-form">
                <input onChange={(event) => setUserValue(event.target.value)}
                    className="my-input" type="text" value={userValue} placeholder="Zde zadejte Váš úkol" />
                <input className="my-button" type="submit" value="Přidat úkol" />

            </form>
            <p className="count-tasks">Počet úkolů: {countTasks}</p>

            <div className="user-data-wrapper">
                {
                    //funkce map slouží vždy k vypsání pole, podobná je funkce filter,
                    // která vyfiltruje obsah pole a map pak může vykreslit jen nekteré prvky a v poli a né celé pole

                    tasksArray.map((oneTask) => {

                        return (

                            <div key={oneTask.id} className="user-data-section">

                                <p className="user-data-paragraf">{oneTask.taskName.toLowerCase()}</p>
                                <AiOutlineEdit className="edit-icon"></AiOutlineEdit> <GoTrash onClick={() => deleteTask(oneTask.id)} className="trash-icon"></GoTrash>

                            </div>
                        )

                    })}
            </div>



        </div>
    </ul>)
}


export default App
