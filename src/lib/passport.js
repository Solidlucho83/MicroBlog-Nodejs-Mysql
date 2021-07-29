const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const pool = require('../dabatabase');


passport.use('local.singin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      const user = rows[0];
      //const validPassword = await helpers.matchPassword(password, user.password)
    //  if (validPassword) {
       done(null, user);
     } else {
       done(null, false, req.flash('success', 'Usuario o Password Incorrecto'));
     }
 //  } else {
 //    return done(null, false, req.flash('message', 'The Username does not exists.'));
  //  }
}));

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

},
// luego defino un callback queva a hacer luego de autenticarse, done sirve para guardar
// desp de autenticarse
     async (req, username, password, done) => {
      const { fullname } = req.body;
      const newUser ={
          username,
          password,
          fullname
      };
      
      const result = await pool.query('INSERT INTO users SET ?', [newUser]);
      newUser.id = result.insertId; // esto se extrae del Packet 
      return done(null, newUser);
    
    
    

}));
//guardo el userid en session
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});