/* eslint-disable react/no-unescaped-entities */
import Header from "./Header";
import { NETFLIX_BACKGROUND, USER_ICON } from "../utils/constant";
import { useRef, useState } from "react";
import { validateDate } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);

  const handleValidation = () => {
    const message = !isSignInForm
      ? validateDate(
          email.current.value,
          password.current.value,
          username.current.value
        )
      : validateDate(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
        username.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: username.current.value,
            photoURL: USER_ICON,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error);
         
            });
   
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
        
          setErrorMessage(
            "We’re sorry. This login email already exists. Please try a different email address to register."
          );
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user;
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          setErrorMessage(
            "Sorry, we can't find an account with this email or password. Please try again or create a new account."
          );
        });
    }
  };
  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="w-full relative overflow-hidden bg-black min-h-[100vh] p-4 flex flex-col justify-between xl:bg-black-rgba xl:p-0">
      <img
        className="hidden -z-10 w-max-full object-cover object-center xl:block xl:h-full xl:absolute"
        src={NETFLIX_BACKGROUND}
      />

      <Header />

      <div className="w-full min-h-[70vh] rounded-md mx-auto md:w-[50%] xl:w-[45%] bg-black-rgba xl:p-12">
        <p className="text-white font-bold text-3xl my-4">
          {isSignInForm ? "Sign in" : "Sign up"}
        </p>
        <div className="input-container flex flex-col gap-4">
          {!isSignInForm && (
            <input
              className=" w-full p-5 rounded-md   text-white bg-[#252525] transition ease-in-out delay-1500 "
              type="username"
              name="username"
              id="username"
              ref={username}
              placeholder="username"
            />
          )}
          <input
            className="w-full p-5 rounded-md  text-white bg-[#252525] "
            type="email"
            name="email"
            id="email"
            ref={email}
            placeholder="email"
          />
          <input
            className="w-full p-5 rounded-md text-white bg-[#252525] "
            type="password"
            name="password"
            id="password"
            ref={password}
            placeholder="password"
          />
          {errorMessage == null ? (
            ""
          ) : (
            <p className="font-mono text-red-600 text-center">{errorMessage}</p>
          )}
          <button
            onClick={handleValidation}
            className="p-4 w-full bg-[#E50914] text-white text-sm font-semibold rounded-md"
          >
            {isSignInForm ? " Sign in" : "Sign up"}
          </button>
          <p className="p-1 w-full text-center text-white text-sm">
            Forget Password?
          </p>
          <p>
            <input
              className="mr-2 inline-block"
              type="checkbox"
              name=""
              id=""
            />
            <span className="inline-block text-white">Remember Me</span>
          </p>
          <p className="p-1 w-full text-left text-white text-sm ">
            {isSignInForm ? "New to Netflix?  " : "Already a member?"}{" "}
            <span
              onClick={toggleSignIn}
              className="font-semibold hover:cursor-pointer hover:underline "
            >
              {" "}
              {isSignInForm ? " Sign up now." : " Sign in."}
            </span>
          </p>
          <span className="inline-block text-xs w-full  text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <span className="text-blue-700"> Learn more. </span>
          </span>
        </div>
      </div>
      <div className="footer bg-black-rgba mt-20 border-t-2 py-4 border-[#ffffff28f] flex flex-col gap-4 w-full text-gray-400  min-h-[20vh] xl:border-none h-full overflow-hidden xl:gap-8">
        <div className="w-[100%] flex-col flex h-full xl:mx-auto xl:w-[70%]  ">
          <p className="w-full">Questions? Call 000-800-100-8343</p>
          <div className="flex items-center w-full justify-between ">
            <ul className="leading-8 ">
              <li>FAQ</li>
              <li>Teams of Use</li>
              <li>Cookie Preferences</li>
            </ul>
            <ul className="leading-8">
              <li>Help Centre</li>
              <li>Privacy</li>
              <li>Corporate Information</li>
            </ul>
          </div>
          <button className="text-start">English</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
