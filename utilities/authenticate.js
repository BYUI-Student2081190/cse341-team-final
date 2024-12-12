/** Is Authenticated Function **/
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json("You do not have access");
    };
    next();
};


/** Exports **/
module.exports = isAuthenticated;