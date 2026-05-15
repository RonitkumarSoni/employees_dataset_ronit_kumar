/**
 * Role-based access control middleware
 * Restricts access to specific user roles
 * @param  {...String} roles - Allowed roles (e.g., 'admin', 'employee')
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'fail',
        message: 'You must be logged in to access this resource',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action',
      });
    }

    next();
  };
};

module.exports = { restrictTo };
