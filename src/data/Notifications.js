// automatické zprávy (flashmessage)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


// tasks messages
export const errorTaskNotify = () => toast.error('Nezadali jste žádný úkol', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",

});

export const succesTaskNotify = () => {

    toast.success('Úspěšně jste přidali Váš úkol', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

}

// registration messages

export const succesRegistrationNotify = () => {

    toast.success('Úspěšně jste se zaregistrovali', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

}