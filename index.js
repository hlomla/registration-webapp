let express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// const connectFlash = require('connect-flash');
const flash = require('express-flash');
const session = require('express-session');
const registration = require('./registration-FF')
const routes = require('./regRoutes')
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
} 

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:1238/db_registration';

const pool = new Pool({
    connectionString,
    ssl:{ rejectUnauthorized: false}    
  });


const RegNumbers = registration(pool)
const regRoutes = routes(RegNumbers)



let app = express()

app.engine('handlebars', exphbs({ 
partialsDir: "./views/partials", 
viewPath: './views', 
layoutsDir: './views/layouts' 
}));

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(express.static('public'));

app.get('/', regRoutes.home)

app.post('/', regRoutes.home)

let PORT = process.env.PORT || 3775;

app.listen(PORT, function () {
    console.log("App started at PORT: ", PORT);
});


