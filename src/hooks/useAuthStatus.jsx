import { onAuthStateChanged, getAuth } from "firebase/auth"
import { useEffect, useState } from "react"

export function useAuthStatus() { //what happend if I put "default" keyword
    const [loggedIn, setLoggedin] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(() =>{
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user){
                setLoggedin(true)
            }
            setCheckingStatus(false)
        })
    }, [])
  return {loggedIn, checkingStatus}
}
