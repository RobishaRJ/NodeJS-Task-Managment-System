//?Checking authorization function 
const checkType = (requiredType) => {
    return (req, res, next) => {
        const { role } = req.auth;
        if (role !== requiredType) {
            return res.status(403).json({ error: 'Forbidden: Route Needs permissions' });
        }
        next();
    };
};
module.exports = checkType