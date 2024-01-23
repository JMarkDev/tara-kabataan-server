import { useState  } from 'react';
import PropTypes  from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { RiDashboardLine  } from 'react-icons/ri';
// import { SiFuturelearn } from 'react-icons/si';
import { CgProfile } from 'react-icons/cg';
import { FaUserShield } from 'react-icons/fa'; 
// import { ThemeContext } from "./ThemeContext";
import logo from "../assets/images/logo.jpg";
import { BsFillJournalBookmarkFill } from 'react-icons/bs';

const Sidebar = ({ open }) => {
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const location = useLocation();

  const Menus = [
    { title: 'Dashboard', path: '/dashboard', src: <RiDashboardLine  /> },
    { title: 'Events', path: '/dashboard-events', src: <BsFillJournalBookmarkFill/> },
    // { title: 'Courses', path: '/courses', src: <SiFuturelearn />},
    { title: 'Users', path: '/users', src: <CgProfile /> },
    { title: 'Admin', path: '/admin', src: <FaUserShield /> },
  ];

  const toggleCoursesDropdown = () => {
    setShowCoursesDropdown(!showCoursesDropdown);
  };
  

  Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
  };


  return (
    <>
     <div className={`w-[${open ? '80px' : '250px'}] h-[100vh] bg-[#40189d] p-2 text-[#f2f2f2] transition-all ease-in-out duration-300`}>
         <div className=" lg:flex justify-center items-center gap-3">
          <img src={logo} alt="logo" className={`hidden sm:block md:block lg:block w-[50px]`} />
        
      </div>
        <ul className={`pt-6 ${open ? 'items-center flex flex-col': ''}`}>
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`relative ${
                showCoursesDropdown && menu.title === 'Courses'
                  ? 'z-10'
                  : ''
              }`}
            >
              {menu.dropdown ? (
                <>
                  <div
                    onClick={toggleCoursesDropdown}
                    className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer text-white hover:bg-orange-400  ${
                      location.pathname === menu.path &&
                      'bg-[orange-400] '
                    }`}
                  >
                    <span className="text-2xl">{menu.src}</span>
                    <span className={`${!open && 'hidden'} origin-left duration-300 hover:block`}>
                      {menu.title}
                    </span>
                    {/* <IoMdArrowDropright className={`ml-2 text-xl ${showCoursesDropdown ? 'transform rotate-90' : ''}`} /> */}
                  </div>
                </>
              ) : (
                <Link to={menu.path}>
                  <div
                    className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer  hover:bg-[#607D8B] ${
                      location.pathname === menu.path && 'bg-[#607D8B] '
                    }`}
                  >
                    <span className="text-2xl">{menu.src}</span>
                    {
                      !open && (
                        <span className="origin-left duration-300 hover:block">
                          {menu.title}
                        </span>
                      )
                    }
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;