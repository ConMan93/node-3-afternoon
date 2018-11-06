const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
require('dotenv').config();

// Controllers
const checkForSession = require('./middleware/checkForSession');
const sc = require('./controllers/swagController');
const ac = require('./controllers/authController');
const cc = require('./controllers/cartController');
const searchController = require('./controllers/searchController');

let { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`))

// Swag
app.get('/api/swag', sc.read)

// Auth
app.get('/api/user', ac.getUser)
app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.signout)

// Cart
app.post('/api/cart/', cc.add)
app.post('/api/cart/checkout', cc.checkout)
app.delete('/api/cart/', cc.delete)

// Filter
app.get('/api/search', searchController.search)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})
