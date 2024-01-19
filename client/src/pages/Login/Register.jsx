import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Loading from "../../components/loading/otpLoader/otpLoader";

export default function Register() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "", 
    role: "user", // Set a default role
  });

  const [firstnameError, setfirstnameError] = useState("");
  const [LastnameError, setLastnameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
  
    setLoader(true);
  
    // Clear error messages when the user submits the form
    setfirstnameError("");
    setLastnameError("");
    setGenderError("");
    setemailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  
    try {
      const response = await api.post("/auth/register", values, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });

      if (response.data.status === "success") {
        navigate("/verify-otp", { state: { email: values.email } });
      } else {
        alert(response.data.message);
      }
      
    } catch (error) {
      setLoader(false);

      if (error.response && error.response.data.status === 'error') {
        setemailError(error.response.data.message);
      }
  
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((error) => {
          switch (error.path) {
            case 'firstname':
              setfirstnameError(error.msg);
              break;
            case 'lastname':
              setLastnameError(error.msg);
              break;
            case 'gender':
              setGenderError(error.msg);
              break;
            case 'email':
              setemailError(error.msg);
              break;
            case 'password':
              setPasswordError(error.msg);
              break;
            case 'confirmPassword':
              setConfirmPasswordError(error.msg);
              break;
            default:
              // Handle other errors as needed
              break;
          }
        });
      } else {
        // Handle unexpected errors
        console.error("Unexpected error:", error);
      }
    }
  };
  

  return (
    <>
    {/* <NavbarUser /> */}
    <div className="relative bg-[#efeff5] mt-[-100px]">
      <div
        className="flex flex-col items-center sm:justify-center sm:pt-0"/>
        <div
        className="flex-grow flex items-center justify-center bg-cover bg-center  "
        style={{ 
          // backgroundImage: `url('https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
        
      >
    
    {loader && 
      <div className="absolute flex items-center justify-center h-screen">
        <Loading />
      </div>
    }
          
            <div className="w-[350px] sm:mx-auto sm:w-full sm:max-w-md px-4 py-2 mt-[120px] overflow-hidden bg-[#ffffff] shadow-md sm:rounded-lg">
            <div className="p-5 m-auto flex justify-center items-center">
            <h1 className='text-center mb-5 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign up your account
            </h1>

            </div>
              <form onSubmit={handleRegister}>
                <div>
                  <label
                    htmlFor="name"
                    className=" block text-sm font-medium text-gray-700 undefined"
                  >
                    First Name
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={values.firstname}
                      onChange={(e) =>
                        setValues({ ...values, firstname: e.target.value })
                      }
                      className={`mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        firstnameError  ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                      }`}
                    />
                  </div>
                  {/* <div className="h-4">  */}
                    {firstnameError && <div className="text-red-600 text-sm">{firstnameError}</div>}
                  {/* </div> */}
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="mt-2 block text-sm font-medium text-gray-700 undefined"
                  >
                    Last Name
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={values.lastname}
                      onChange={(e) =>
                        setValues({ ...values, lastname: e.target.value })
                      }
                      className={`mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        LastnameError  ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                      }`}
                    />
                  </div>
                  {/* <div className="h-4">  */}
                    {LastnameError && <div className="text-red-600 text-sm">{LastnameError}</div>}
                  {/* </div> */}
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Email
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={values.email} // Use values.username
                      onChange={e => setValues({ ...values, email: e.target.value })} // Update values.username
                      className={`mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        emailError  ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                      }`}
                    />
                  </div>
                  {/* <div className="h-4">  */}
                    {emailError && <div className="text-red-600 text-sm">{emailError}</div>}
                  {/* </div> */}
                </div>
                <div className="mt-2">
                  <label
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Gender
                  </label>
                  <div className="flex items-start">
                    <label className="inline-flex items-center mt-2 mr-4">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={values.gender === "male"}
                        onChange={(e) =>
                          setValues({ ...values, gender: e.target.value })
                        }
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={values.gender === "female"}
                        onChange={(e) =>
                          setValues({ ...values, gender: e.target.value })
                        }
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                    <label className="inline-flex items-center mt-2 ml-3">
                      <input
                        type="radio"
                        name="gender"
                        value="non-binary"
                        checked={values.gender === "non-binary"}
                        onChange={(e) =>
                          setValues({ ...values, gender: e.target.value })
                        }
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Non-binary</span>
                    </label>
                  </div>
                  {/* <div className="h-4">  */}
                    {genderError && <div className="text-red-600 text-sm">{genderError}</div>}
                  {/* </div> */}
                </div>
         
               
                <div className="mt-2">
                  <label
                    htmlFor="password"
                    className="mt-2 block text-sm font-medium text-gray-700 undefined"
                  >
                    Password
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={e => setValues({ ...values, password: e.target.value })}
                      className={`mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        passwordError  ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                      }`}
                    />
                  </div>
                  {/* <div className="h-4">  */}
                    {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
                  {/* </div> */}
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Confirm Password
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                      className={`mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        confirmPasswordError  ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                      }`}
                    />
                  </div>
                  {/* <div className="h-4">  */}
                    {confirmPasswordError && <div className="text-red-600 text-sm">{confirmPasswordError}</div>}
                  {/* </div> */}
                </div>
                <div className="flex items-center mt-4">
                <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58] px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm transition-all duration-300 ease-in-out hover:from-[#f7426f] hover:to-[#f7426f] hover:via-[#f87a58] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
                </div>
              </form>
            
              <div className="mt-4 text-gray-600">
                Already have an account?{" "}
                <span>
                  <Link to="/login" className="text-[#6415ff] hover:underline">
                    Log in
                  </Link>
                </span>
              </div>
            </div>
{/* 
          )
        } */}
     
       
      </div>
    </div>
    </>
  );
}