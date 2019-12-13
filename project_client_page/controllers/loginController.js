
exports.login = (req,res,next) => {
    res.render('login', { title: 'Best Store',message: req.flash('message')  });
}
