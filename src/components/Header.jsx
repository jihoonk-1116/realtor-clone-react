import { useState, useEffect } from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { useLocation,useNavigate } from "react-router-dom";


export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setPageState("Profile");
      }else{
        setPageState("Sign in");
      }
    })
  }, [auth])
  function pathMatchRoute(route){
    if(route === location.pathname){
      return true
    }
  }

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
      {/* stick : stick the item somewhere wanted to be , add z index to ensure it to be the top */}
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
          {/* px-3 padding 3px , max padding  */}
            <div>
                <img src="images/logo.png" alt='logo' className='h-20 cursor-pointer'
                  onClick={() => navigate("/")}
                ></img>
            </div>
            <div>
              <ul className='flex space-x-10'>
                <li 
                  className={
                    `cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                    ${pathMatchRoute("/") && "!text-black !border-b-red-500"}`
                  }
                  onClick={() => navigate("/")}
                >Home</li>
                <li
                  className={
                    `cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                    ${pathMatchRoute("/offers") && "!text-black !border-b-red-500"}`
                  }
                  onClick={() => navigate("/offers")}
                >Offers</li>
                <li
                  className={
                    `cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                    ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "!text-black !border-b-red-500"}`
                  }
                  onClick={() => navigate("/profile")}
                >{pageState}</li>
              </ul>
            </div>
        </header>
    </div>
  )
}
