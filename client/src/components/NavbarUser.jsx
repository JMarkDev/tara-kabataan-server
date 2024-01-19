import { useState } from 'react';
import logo from '../assets/images/logo.jpg';
import { Link, useLocation } from 'react-router-dom';
import HamburgerButton from './HamburgerMenuButton/HamburgerButton';


const NavbarUser = () => {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  const handleMobileLinkClick = () => {
    closeMobileMenu(); // Close the mobile menu when a link is clicked
  };


  return (
    <header className='h-[100px] w-full m-auto px-5 fixed z-10 bg-[#efeff5] shadow-lg'>
      <div className="hidden md:block">
      <div className='flex justify-between items-center'>
        <img src={logo} alt="logo" className='w-[100px] h-[100px]' />
        <ul className='flex gap-10'>
          <li>
            <Link
              to="/home"
              className={`flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                location.pathname.includes("/home")
                  ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                  : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
              }`}
            >
            Home
          </Link>
          </li>
          <li>
            <Link 
              to='/events'
              className={`flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                location.pathname.includes("/events")
                  ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                  : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
              }`}
              >
              Events
            </Link>
          </li>
          <li>
            <Link 
              to='/about'
              className={`flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                location.pathname.includes("/about")
                  ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                  : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
              }`}
              >
              About
            </Link>
          </li>
          <li>
            <Link 
              to='/contact-us'
              className={`flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                location.pathname.includes("/contact-us")
                  ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                  : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
              }`}
              >
              Contact Us
            </Link>
          </li>
        </ul>
        <div className='flex gap-10'>
          <Link 
              to='/login'
              className={` flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                location.pathname.includes("/login")
                  ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                  : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
              }`}
              >
              Login
            </Link>
            <Link 
              to='/register'
              className="flex items-center text-base font-semibold cursor-pointer bg-[#6415ff] text-white px-8 py-2 rounded-full"
              >
              Register
            </Link>
        </div>
      </div>
      </div>

      <div className="md:hidden flex w-full justify-between items-center">
        <img src={logo} alt="logo" className="w-24 h-24" />
        <HamburgerButton setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
      </div>

      <div className="lg:hidden">
        <div className="">
          <div
            className={`${mobileMenu ? "flex" : "hidden"} w-[90%] text-center absolute z-50 flex-col self-end py-8 mt-10 bg-gray-50 dark:bg-slate-800 drop-shadow rounded-xl`}
          >
            <ul className='px-5'>
            <li>
              <Link
                onClick={handleMobileLinkClick}
                to="/home"
                className={`flex p-2 items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
              >
                <span
                  className={`
                    ${
                      location.pathname.includes("/home")
                        ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                    }
                  `}
                >
                  Home
                </span>
              </Link>
            </li>

            <li>
              <Link
                onClick={handleMobileLinkClick}
                to="/events"
                className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
              >
                <span
                  className={`
                    ${
                      location.pathname.includes("/events")
                        ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                    }
                  `}
                >
                  Events
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleMobileLinkClick}
                to="/about"
                className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
              >
                <span
                  className={`
                    ${
                      location.pathname.includes("/about")
                        ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                    }
                  `}
                >
                  About
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleMobileLinkClick}
                to="/contact-us"
                className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
              >
                <span
                  className={`
                    ${
                      location.pathname.includes("/contact-us")
                        ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                    }
                  `}
                >
                  Contact Us
                </span>
              </Link>
            </li>

            <li>
              <Link
                onClick={handleMobileLinkClick}
                to="/login"
                className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
              >
                <span
                  className={`
                    ${
                      location.pathname.includes("/login")
                        ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                    }
                  `}
                >
                  Login
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleMobileLinkClick}
                to="/register"
                className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
              >
                <span
                  className={`
                    ${
                      location.pathname.includes("/register")
                        ? "border-b-2 border-[#6415ff] "
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300 bg-[#6415ff] text-white px-8 py-2 rounded-full "
                    }
                  `}
                >
                  Register
                </span> 
              </Link>
            </li>


            </ul>
          </div>
        </div>
      </div>

    </header>
  )
}

export default NavbarUser