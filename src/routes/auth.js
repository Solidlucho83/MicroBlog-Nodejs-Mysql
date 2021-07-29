const express = require('express');
const router = express.Router();
const passport = require('passport');
 require('../lib/passport'); // le paso los datos antes de inicializarlo;
 const { isLoggedIn, isNotLoggedIn } = require('../lib/auth'); // aporto proteccion a las rutas

 router.get('/singin', isNotLoggedIn, (req, res) => {
  res.render('auth/singin');
});

router.post('/singin', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local.singin', {
    successRedirect: '/links',
    failureRedirect: '/singin',
    failureFlash: true
  })(req, res, next);
});
  


router.get('/singup', isLoggedIn, (req, res) => {
    res.render('auth/singup');
  });




router.post('/singup', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  }));

  router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/links');
  });



module.exports = router;