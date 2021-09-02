const express =require ('express');
const app = express();
const configViewEngine =require ('./config/viewEngine');
const initWebRoutes =require ('./routes/web');
const bodyParser = require ('body-parser');
const connectFlash = require ('connect-flash');
const cookieParser = require ('cookie-parser');
const passport = require('passport');
const configSession = require ('./config/session');
const initApiRoutes = require('./routes/api');


// config express cookie-parser
app.use(cookieParser('secret'));
//show flash messages
app.use(connectFlash())
// config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// config view engine
configViewEngine(app);
//config app session
configSession(app);
//config passport middleware
app.use(passport.initialize());
app.use(passport.session());
//init all web routes
initWebRoutes(app);
initApiRoutes(app);




module.exports = app;
