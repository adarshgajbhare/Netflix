import { useState } from "react";
import Header from "./Header";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="main">
      <div className="relative  w-full h-full  ">
        <Header />
        <img
          className=" bg-image-rgb "
          src="https://assets.nflxext.com/ffe/siteui/vlv3/4da5d2b1-1b22-498d-90c0-4d86701dffcc/98a1cb1e-5a1d-4b98-a46f-995272b632dd/IN-en-20240129-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
        <div className="absolute z-20 opacity-60 inset-0 h-full w-full bg-black"></div>
        <div className={`h-${isSignInForm ? '60%' : '80%'} w-[30%] top-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%] absolute z-50`}>
          <form className=" w-[100%]  h-[100%] relative p-12  bg-black-rgba text-white">
            <h1 className="text-3xl font-bold mb-6">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input
                className="p-3 m-2  w-full  bg-black-rgba text-white border border-white rounded-md"
                type="text"
                placeholder="Full Name"
              />
            )}
            <input
              className="p-3 m-2  w-full  bg-black-rgba text-white border border-white rounded-md"
              type="text"
              placeholder="Email or phone number"
            />
            <input
              className="p-3 m-2  w-full  bg-black-rgba  text-white border  border-white rounded-md"
              type="password"
              placeholder="password"
            />
            <button className=" text-xl font-medium p-2 m-2 bg-[#c11119] w-full rounded-md">
              {isSignInForm ? " Sign In" : "Sign Up"}
            </button>
            <p className="text-center m-2 hover:underline hover:text-[#868484]  cursor-pointer">
              Forget password?
            </p>
            <div className="flex mt-10 ">
              <input type="checkbox" className="" />
              <p className="ml-2">Remember Me</p>
            </div>
            <div>
              <p className="mt-1 text-[#b5b5b5]">
                {isSignInForm ? "New to Netflix?  " : "Already a member?"}
                <span
                  onClick={toggleSignIn}
                  className="hover:cursor-pointer hover:underline text-[#ffffff]"
                >
                  {isSignInForm ? " Sign up now." : " Sign In."}
                </span>
              </p>
              <p className="text-[#8c8c8c] mt-2 text-[13px] font-normal">
                This page is protected by Google reCAPTCHA to <br />
                ensure you are not a bot.
                <span className="text-[#132cc1] hover:underline">
                  Learn more.
                </span>
              </p>
            </div>
          </form>
        </div>
        <div className="footer flex justify-center items-center absolute bottom-0  w-full h-[10%]  z-50 ">
          <h1 className="text-white font-semibold text-2xl ">
            Made with &hearts; by Adarsh Gajbhare
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
