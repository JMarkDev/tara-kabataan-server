import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Cookies from 'js-cookie';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    // role: '', 
  });
  
  const [errorMessage, setErrorMessage] = useState(''); 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();
  
    // Clear error messages when the user submits the form
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');
  
    try {
      const response = await api.post('/auth/login', values, {
        headers: { 'Content-Type': 'application/json' },
        // withCredentials: true,
      });

      Cookies.set('token', response.data.token, { expires: 1 });
      Cookies.set('role', response.data.role, { expires: 1 });
  
      if (response.data.status === 'success') {

        const userRole = response.data.role
        const dashboardURL = userRole === 'admin' ? '/dashboard' : '/home';
        
        navigate(dashboardURL)
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      console.log(err.response); 
  
      if (err.response.data.errors) {
        err.response.data.errors.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.msg);
          } else if (error.path === 'password') {
            setPasswordError(error.msg);
          }
        });
      }
      setErrorMessage(err.response.data.message);
    }
  };
  
  
  return (
    <> 
    {/* <NavbarUser /> */}
    <div
      className="flex bg-[#efeff5] flex-col items-center sm:justify-center sm:pt-0 h-[100vh]"
      style={{
        backgroundImage: `url('https://unsplash.com/photos/selective-focus-photography-of-people-sitting-on-chairs-while-writing-on-notebooks-Hb6uWq0i4MI')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    > 

        <div className="w-[350px] sm:mx-auto sm:w-full sm:max-w-md px-4 py-10 mt-6 overflow-hidden bg-[#ffffff] p-4 rounded-lg shadow-md">
            <h2 className="text-center mb-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in your account
            </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="text"
                  placeholder='Email'
                  autoComplete="off"
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    emailError || errorMessage ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                  }`}
                />
              </div>
              {/* <div className="h-4"> error message */}
                {emailError && <div className="text-red-600 text-sm">{emailError}</div>}
              {/* </div> */}
            </div>

            <div>
              <div className="mt-[-10px] flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
              <input
                name="password"
                type="password"
                placeholder='Password'
                autoComplete="current-password"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  passwordError || errorMessage ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                }`}
              />
              {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
              {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
              <div className="text-sm text-right mt-2">
                  <Link to="/change-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>

              </div>
            </div>

            <div>
            <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58] px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm transition-all duration-300 ease-in-out hover:from-[#f7426f] hover:to-[#f7426f] hover:via-[#f87a58] hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log in
          </button>


            </div>
          </form>
          

          <div className="mt-4 text-gray-600">
               Don&apos;t have an account?{" "}
                <span>
                  <Link to="/register" className="text-[#6415ff] hover:underline">
                    Register
                  </Link>
                </span>
          </div>
        </div>
    </div>
    </>
  );
}

export default Login;