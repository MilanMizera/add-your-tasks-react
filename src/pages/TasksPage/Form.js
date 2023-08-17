import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import "./form.css"
import AuthDetails from "../auth/AuthDetails";

//ikonky
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import { AiOutlineCloseCircle } from "react-icons/ai";

// automaticky psaný text
import Typewriter from 'typewriter-effect';

// automatické zprávy (flashmessage)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { succesTaskNotify, errorTaskNotify } from "../../data/Notifications";
//  samotný toogler stážený z npm
import ReactSwitch from "react-switch";
// nahrání dat jako objekt(obj.props), který můžu globálně použít
import { ThemeContext } from "../../App";


const getArrayTasks = () => {

    let list = localStorage.getItem("tasks")

    if (list) {

        return JSON.parse(localStorage.getItem("tasks"))

    } else {

        return []
    }
}

const getCountTasks = () => {


    let list = localStorage.getItem("countTasks")


    if (list) {

        return JSON.parse(localStorage.getItem("countTasks"))


    } else {

        return 0

    }

}

const App = () => {

    const [userValue, setUserValue] = useState("")
    const [tasksArray, setTasksArray] = useState(getArrayTasks)
    const [countTasks, setCountTasks] = useState(getCountTasks)
    const [deleteAllTasks, setDeleteAllTasks] = useState(false)
    const [editId, setEditId] = useState(0)
    const [warningVisibility, setWarningVisibility] = useState(true)

    // uložení režimu šablony na localstorage
    const themeMode = useContext(ThemeContext)
    console.log(themeMode.theme)


    useEffect(() => {

        localStorage.setItem("tasks", JSON.stringify(tasksArray))

    }, [tasksArray])

    useEffect(() => {

        localStorage.setItem("countTasks", JSON.stringify(countTasks))

    }, [countTasks])




    // !POZOR! První vždy musí jít metoda getitem a až po ní setItem jinak to hodí error

    useEffect(() => {

        const data = localStorage.getItem("deleteAllTasks")
        setDeleteAllTasks(JSON.parse(data))



    }, [])


    useEffect(() => {

        localStorage.setItem("deleteAllTasks", JSON.stringify(deleteAllTasks))


    }, [deleteAllTasks])



    const formSubmit = (event) => {
        // preventDefault vypne refrešování formuláře, aby tam zůstala hodnota od uživatele, ale pozor musí být definováná parametr s názvem event
        event.preventDefault()

        if (editId) {
            const editTodo = tasksArray.find((oneTask) => oneTask.id === editId);

            const updatedTodos = tasksArray.map((oneTask) =>
                oneTask.id === editTodo.id
                    ? (oneTask = { id: oneTask.id, userValue })
                    : { id: oneTask.id, todo: oneTask.userValue }

            )
            setTasksArray(updatedTodos)
            setEditId(0)
            setUserValue("")
            return
        }


        if (userValue && userValue.length < 27) {

            const newTask = { taskName: userValue, id: crypto.randomUUID() }

            setTasksArray((tasksArray) => {
                //přidání hodnoty z formuláře do pole 
                return [...tasksArray, newTask]

            })

            setUserValue("")
            setCountTasks(countTasks + 1)
            succesTaskNotify()


            const localStorageCountTasks = localStorage.getItem("countTasks")
            console.log(localStorageCountTasks)

            if (localStorageCountTasks >= 2) {

                setDeleteAllTasks(true)
            } else {

                setDeleteAllTasks(false)

            }


        } else {

            errorTaskNotify()

        }
    }

    const deleteTask = (localId) => {

        const filtredTasks = tasksArray.filter((oneTask) => {

            return oneTask.id !== localId

        })

        setCountTasks(countTasks - 1)
        setTasksArray(filtredTasks)

    }

    const handleEdit = (localId) => {

        const editTask = tasksArray.find((oneTask) => {

            return oneTask.id === localId

        })

        setUserValue(editTask.taskName)
        setEditId(localId)

    }

    const CleareAllLocalStorage = () => {

        localStorage.clear();
        setCountTasks(0)
        setTasksArray([])
        setDeleteAllTasks(false)

    }

    const dontShowWarningVisibility = () => {

        setWarningVisibility(false)

    }


    return (<div>

        <ul className="background">

            <li></li> <li></li> <li></li> <li></li> <li></li>
            <li></li> <li></li> <li></li> <li></li> <li></li>
        </ul>


        {warningVisibility && <div className="warning-wrapper">
            <p className="warning-text">!Pozor! Bez přihlášení můžete přijít o své uložené úkoly.</p>
            <AiOutlineCloseCircle onClick={dontShowWarningVisibility} className="warning-close-icon"></AiOutlineCloseCircle>
        </div>}

        <div className="login-section">
            <div className="switch">
                <label> {themeMode.theme === "light" ? "Světlý režim" : "Tmavý režim"}</label>
                <ReactSwitch onChange={themeMode.toggleTheme} checked={themeMode.theme === "dark"} />
            </div>
            <AuthDetails></AuthDetails>
            <Link to="/prihlaseni" className="login-text">Přihlásit se
                <CiLogin className="login-icon"></CiLogin>
            </Link>
        </div>


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

                                <p className="user-data-paragraf">{oneTask.taskName}</p>
                                <AiOutlineEdit onClick={() => handleEdit(oneTask.id)} className="edit-icon"></AiOutlineEdit> <GoTrash onClick={() => deleteTask(oneTask.id)} className="trash-icon"></GoTrash>

                            </div>
                        )

                    })}

                {deleteAllTasks && <button className="delete-all-tasks" onClick={CleareAllLocalStorage} >Vymazat všechny úkoly</button>}
            </div>

        </div>
    </div>)
}

export default App
