import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes  from 'prop-types';
import { RxHamburgerMenu } from 'react-icons/rx'
import api from '../api/api';
import Cookies from 'js-cookie';
import userIcon from '../assets/images/user.png';
import UserProfile from './UserProfile';

function NavbarDashboard({ setOpen }) {
  const [name, setName] = useState('');
  const [open, setOpenProfile] = useState(false); 
  const navigate = useNavigate();
  const userId = Cookies.get('userId');

  const handleBurgerClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userId) {
          const response = await api.get(`/user/id/${userId}`);
          setName(response.data.firstname);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [userId]);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('userId');
    navigate('/login');
  } 

  const showProfile = () => {
    setOpenProfile(!open);
  };

  const hideProfile = () => {
    setOpenProfile(false);
  }

  const handleDropdownClick = (event) => {
    // Prevent closing the dropdown when clicking inside it
    event.stopPropagation();
    setOpenProfile(false)
  };


  return (
    <div className="h-[70px] shadow-md">
      <div className="flex justify-between p-4">
        <div className="flex items-center text-center">
          <RxHamburgerMenu onClick={handleBurgerClick} className="text-3xl mr-5" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className='relative'>
          <div className="flex gap-10">
            <h1 className="text-lg font-semibold text-center m-auto">{name}</h1>
            <img onClick={showProfile}
                onMouseEnter={showProfile}
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                src={userIcon}
                alt=""
              />
            {open && (
              <div className="absolute top-[60px] right-0 mr-[-10px]">
                <UserProfile
                  handleDropdownClick={handleDropdownClick}
                  hideProfile={hideProfile}
                  userId={userId}
                  handleLogout={handleLogout}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

NavbarDashboard.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default NavbarDashboard;