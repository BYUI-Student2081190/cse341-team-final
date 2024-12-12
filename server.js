/** Required Variables **/
const express = require('express');
const mongoose = require('mongoose');
const dbConnection = require('./mongodb/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
// On the dev side set the port to 2024
const PORT = process.env.PORT || 2024;
const app = express();


/** Middleware **/
// This allows json to be used in the res actions
app.use(express.json());
// Create a session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Set up cors
app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({origin: '*'}));
// Hook to index route
app.use('/', require('./routes/indexRoute'));
// Set up Passport
passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['username']
},
function (accessToken, refreshToken, profile, done) {
    // Access only the username of the account
    const username = profile.username;
    return done(null, username);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// OAuth Routes
app.get('/', (req, res) => {res.json(req.session.user !== undefined ? {welcome: 'Welcome to Entertainment Central', loggedin: `Logged in as ${req.session.user}`} : {welcome: "Welcome to Entertainment Central", loggedin: "Logged Out"})});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);
app.get("/loginError", (res) => {
    res.send('There was a problem logging in.');
});
app.get('/login', passport.authenticate('github'));
app.get('/logout', function(req, res, next) {
    req.logout(function(error) {
        if (error) { return next(error); }
        res.redirect('/');
    });
});

/** Database Connection **/
dbConnection();


/** Run on PORT **/
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
});