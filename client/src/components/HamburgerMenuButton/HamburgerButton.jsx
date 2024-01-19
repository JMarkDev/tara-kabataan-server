import './HamburgerButton.css'
import PropTypes from 'prop-types'

const HamburgerButton = ({ mobileMenu, setMobileMenu }) => {
    return (
        <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className={`${mobileMenu && 'open'} block hamburger sm:hidden focus:outline-none`}
        >
            <span className='hamburger-top dark:bg-slate-50'></span>
            <span className='hamburger-middle dark:bg-slate-50'></span>
            <span className='hamburger-bottom dark:bg-slate-50'></span>
        </button>
    )
}

HamburgerButton.propTypes = {
    mobileMenu: PropTypes.bool.isRequired,
    setMobileMenu: PropTypes.func.isRequired,
}


export default HamburgerButton