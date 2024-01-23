import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'
import Cookies from 'js-cookie';

const UserProfile = ({ handleDropdownClick, hideProfile, handleLogout}) => {
    const role = Cookies.get('role');  

    UserProfile.propTypes = {
        handleDropdownClick: Proptypes.func.isRequired,
        hideProfile: Proptypes.func.isRequired,
        userId: Proptypes.string.isRequired,
        handleLogout: Proptypes.func.isRequired,
    }
    
  return (
    <div 
    onClick={handleDropdownClick}
    onMouseLeave={hideProfile}
    className="bg-white dark:bg-[#075985] rounded-sm border h-[120px] w-[150px] absolute bottom-[-100px] z-20 right-5 pt-[15px] space-y-[10px]">
    <ul className="w-full">
      <li>
        <Link
        to={`${role === 'user' ? '/profile' : '/admin/profile'}`}
        className="block dark:text-white dark:hover:text-[#075985] p-2  font-semibold cursor-pointer hover-bg-sky-100 dark:hover-bg-gray-200
        hover:bg-[#aed3ec] border-b-2 border-transparent dark:hover:bg-gray-20 "
      >
        Profile
      </Link>
      </li>
      <li>
        <button
        onClick={handleLogout}
        className="w-full text-left block dark:text-white dark:hover:text-[#075985] p-2 font-semibold cursor-pointer hover-bg-sky-100 dark:hover-bg-gray-200
        hover:bg-[#aed3ec] border-b-2 border-transparent dark:hover:bg-gray-20 "
      > 
        Log out
      </button>
      </li>
    </ul>  
    </div>
  )
}

export default UserProfile