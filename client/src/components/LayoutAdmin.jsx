import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';

const LayoutAdmin = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className='flex flex-auto h-full w-auto'>
        {isSmallScreen ? null : <Sidebar open={open} setOpen={setOpen} />}
        {isSmallScreen && open && <Sidebar open={open} setOpen={setOpen} />}
        <div className='grow bg-[#f2f2f2]'>
          <NavbarDashboard setOpen={setOpen} />
          <div className='m-4 mt-5'>{children}</div>
        </div>
      </div>
    </>
  );
};

LayoutAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutAdmin;
