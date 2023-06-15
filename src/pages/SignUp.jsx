import {useState} from "react"
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link } from 'react-router-dom';
import OAuth from "../components/OAuth";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db} from "../firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";
import {toast} from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {name, email, password} = formData;
  const navigate = useNavigate();
  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); 
      //promise function, so we have to use async and await
      //because it takes time to receive the response from the API
      //unless it waits, then userCredential var will be undefined object
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName : name
      });
      //Below code is to store user data into db collection as document 
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successful!");
      navigate("/");

    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 mx-auto">
        <div className="md:w-[67%] lg:w[50%] mb-12 md:mb-6">
          <img src="https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60" 
          alt="key img" className="w-full rounded-2xl"></img>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
          <input 
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300
              rounded transition ease-in-out" 
              type="text" 
              id="name" 
              value={name} 
              onChange={onChange}
              placeholder="Full Name" 
            />
            <input 
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300
              rounded transition ease-in-out" 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Email-address" 
            />
            <div className="relative mb-6">
              <input 
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300
                rounded transition ease-in-out" 
                type={showPassword ? "text" : "password"}
                id="password" 
                value={password} 
                onChange={onChange}
                placeholder="Password" 
              />
              {showPassword ? (
                <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}/>
                ) : (
                <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}/>
                )
              }
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Have an account? <Link to="/sign-up" className="text-red-600 
                hover:text-red-700 transition duration-200 ease-in-out ml-1">Sign In</Link></p>
              <p><Link to="/forgot-password" className="text-blue-600 
                hover:text-blue-700 transition duration-200 ease-in-out">Forgot password?</Link></p>
            </div>
            <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase
              rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg
              active:bg-blue-800" type="submit">Sign Up
            </button>
            <div className="my-4 flex items-center 
              before:border-t before:flex-1
            before:border-gray-300 after:border-t after:flex-1
            after:border-gray-300">
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}