// In ProtectedRoute.js

import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element, allowedRoles }) => {
  ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
    allowedRoles: PropTypes.node.isRequired,
  };
  // Check if the user is logged in (you can use a token check)
  const isLoggedIn = Cookies.get('token') !== null;

  // Get the user's role from cookies storage
  const userRole = Cookies.get('role');

  // Check if the user's role is allowed for this route
  const isRoleAllowed = allowedRoles.includes(userRole);

  if (!isLoggedIn) {
    // Redirect to the login page if not logged in
    return <Navigate to="/login" />;
  }

  if (!isRoleAllowed) {
    // Redirect to an unauthorized page if the user's role is not allowed
    return <Navigate to="/unauthorized" />;
  }

  // Render the element if the user is authenticated and authorized
  return element;
};

export default ProtectedRoute;
