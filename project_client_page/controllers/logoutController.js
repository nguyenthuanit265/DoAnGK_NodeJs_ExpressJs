
exports.logout = (req,res,next) => {
    // delete session in server
   
    req.session.destroy();
    res.redirect('/login')
}