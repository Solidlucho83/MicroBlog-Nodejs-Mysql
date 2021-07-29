const express = require('express');
const morgan = require('morgan');
const expresshbs = require('express-handlebars');
const path = require('path');


//mensajes entre vistas
const session = require('express-session');
const flash = require('connect-flash');
//login
const passport = require('passport');


const app = express();
require('./lib/passport'); // le paso los datos antes de inicializarlo;

//middleware por consola lo que llega al server
app.use(morgan('dev'));
app.use(session({
    secret: 'solidlucho',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//inicia passport
app.use(passport.initialize());
app.use(passport.session()); // le decimos donde guarda los datos;

//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});



//routes
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use('/links',require('./routes/links'));
app.use(express.static(path.join(__dirname, 'public')));

//settings


app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
//llamo a hbs y configuro las carp a part de set views
app.engine('.hbs', expresshbs({
    defaultLayout : 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}) )
//utilizo el seting previo
app.set('view engine', '.hbs');






app.listen(app.get('port'), () => { 
    console.log('Express corriendo en el port', app.get('port'));
});
