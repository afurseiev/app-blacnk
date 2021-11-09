
// external dependencies 
const path              = require('path');
const uuid              = require('uuid');
const express           = require('express');
const session           = require('express-session');
const bodyParser        = require('body-parser');
const RedisStore        = require('connect-redis')(session);
const passport          = require('passport');
const OnshapeStrategy   = require('passport-onshape');

// internal dependencies
const config            = require('./b-config-from-env');
const redisClient       = require('./c-redis-client');

let RedirectAddress = `https://oauth.onshape.com/oauth/authorize?response_type=code&client_id=${config.oauthClientId}`;


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.set('trust proxy', 1); // To allow to run correctly behind Heroku

app.use(session({
    store: new RedisStore({
        client: redisClient
    }),
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        name: 'app-blanc',
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new OnshapeStrategy({
        clientID: config.oauthClientId,
        clientSecret: config.oauthClientSecret,
        callbackURL: config.oauthCallbackUrl,
        authorizationURL: `${config.oauthUrl}/oauth/authorize`,
        tokenURL: `${config.oauthUrl}/oauth/token`,
        userProfileURL: `${config.oauthUrl}/api/users/sessioninfo`
    },
    (accessToken, refreshToken, profile, done) => {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        return done(null, profile);
    }
));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use('/oauthSignin', (req, res) => {
    const state = {
        docId: req.query.documentId,
        workId: req.query.workspaceId,
        elId: req.query.elementId
    };
    req.session.state = state;
    return passport.authenticate('onshape', { state: uuid.v4(state) })(req, res);
}, (req, res) => { /* redirected to Onshape for authentication */ });

app.use('/oauthRedirect', passport.authenticate('onshape', { failureRedirect: '/grantDenied' }), (req, res) => {
    res.redirect(`/?documentId=${req.session.state.docId}&workspaceId=${req.session.state.workId}&elementId=${req.session.state.elId}`);
});

app.get('/grantDenied', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client', 'html', 'grantDenied.html'));
})

// providing Front end web page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client', 'html', 'index.html'));
});

// checking the Open Autorization 
app.get ('/doesAutorized',  (req, res) => {
    if (req.user == undefined) {
        console.log ("Redirecting to autorization");
        console.log (RedirectAddress);
        res.status(401).send(RedirectAddress);
    }
    else if  (req.user.accessToken == undefined) {
        console.log ("Redirecting to autorization");
        console.log (RedirectAddress);
        res.status(401).send(RedirectAddress);
    }
    else {
        res.status(200).send();
    }
});


// Redirecting API queries
app.use('/api', require('./e-onshape-api')); 

module.exports = app;
