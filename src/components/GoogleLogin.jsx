// import {getAuth,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
// import { app } from "../../server/firebase-config";
// const provider = new GoogleAuthProvider();
// const auth = getAuth(app)
import { useEffect } from "react";
import { signInWithPopup,authAndProvider, signOut, auth } from "../../server/firebase-config"
const GoogleLogin = (props) => {
    useEffect(() => {
        console.log(props.loggedIn);
    },[])
    const handleLogin = () => {
        signInWithPopup(authAndProvider.auth,authAndProvider.provider).then(res => {
            console.log(res)
        }).catch(err => console.log(err));
    }
    
    const handleLogout = () => {
        signOut(auth).then(res => {console.log(res);localStorage.setItem("loggedIn", false)}).catch(err => console.log(err));
    }
        return (
            <div>
                {props.loggedIn && JSON.parse(localStorage.getItem("loggedIn")) ? 
                <div>
                <button onClick={() => {handleLogout()}}>LOGOUT</button>
            </div> :
             <div>
             <button onClick={() => {handleLogin()}} className=" tw-bg-green-300 tw-text-center">LOGIN TO GOOGLE</button>
         </div>}
            </div>
        )
}

export  {GoogleLogin};