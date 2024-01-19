import PropTypes from 'prop-types'
import NavbarDashboard from './NavbarDashboard'
import Sidebar from './Sidebar'

const LayoutAdmin = ({ children }) => {
    return (
        <>
            <div className='flex flex-auto h-full w-auto '>
                <Sidebar />
                <div className='grow'>
                    <NavbarDashboard />
                    <div className='m-4 mt-5'>{children}</div>
                </div>  
            </div>
        </>
    )
}

LayoutAdmin.propTypes = {
    children: PropTypes.node.isRequired,
}

export default LayoutAdmin
