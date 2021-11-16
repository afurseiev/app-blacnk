const {isValidUrl}      = require('./g-config-utils');
const {isValidHttpUrl}  = require('./g-config-utils');
const {isValidString}   = require('./g-config-utils');

//Configuration data should be extracted from environment successfully, otherwise  app will not run.
//See the server console for detailed description in case of start failure

// 1 - Extracting constants from the environment variables.
const port = process.env.PORT;
const onshapeApiUrl = process.env.API_URL;
const oauthCallbackUrl = process.env.OAUTH_CALLBACK_URL;
const oauthClientId = process.env.OAUTH_CLIENT_ID;
const oauthClientSecret = process.env.OAUTH_CLIENT_SECRET;
const oauthUrl = process.env.OAUTH_URL;
const redisToGoUrl = process.env.REDISTOGO_URL;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const sessionSecret = process.env.SESSION_SECRET;
const webhookCallbackRootUrl = process.env.WEBHOOK_CALLBACK_ROOT_URL;

// 2 - Checking the entire configuration and only throw one error (if invalid).
const errors = [];

if (port && !isValidString(port))                           errors.push('PORT must have content');
if (!isValidHttpUrl(onshapeApiUrl))                         errors.push('API_URL is not a valid HTTP(S) URL');
if (!isValidHttpUrl(oauthCallbackUrl))                      errors.push('OAUTH_CALLBACK_URL is not a valid HTTP(S) URL');
if (!isValidString(oauthClientId))                          errors.push('OAUTH_CLIENT_ID must have content');
if (!isValidString(oauthClientSecret))                      errors.push('OAUTH_CLIENT_SECRET must have content');
if (!isValidHttpUrl(oauthUrl))                              errors.push('OAUTH_URL is not a valid HTTP(S) URL');
if (redisToGoUrl && !isValidUrl(redisToGoUrl, 'redis:'))    errors.push('REDISTOGO_URL is not a valid Redis URL');
if (redisHost && !isValidString(redisHost))                 errors.push('REDIS_HOST must have content');
if (redisPort && !isValidString(redisPort))                 errors.push('REDIS_PORT must have content');
if (!isValidString(sessionSecret))                          errors.push('SESSION_SECRET must have content');
if (!isValidHttpUrl(webhookCallbackRootUrl))                errors.push('WEBHOOK_CALLBACK_ROOT_URL is not a valid HTTP(S) URL');

// 3 -  Halt execution if the app isn't correctly configured.
if (errors.length !== 0) {
    throw new Error('Invalid configuration: ' + errors.join(', '));
}

module.exports = {
    //- mandatory                        
    onshapeApiUrl,          //The parent URL of the Onshape API endpoints, e.g. `https://cad.onshape.com/api`.
    oauthCallbackUrl,       //The absolute URL of the OAuth callback URL. This will be the `/oauthRedirect` endpoint on this server, e.g. `https://<machine.example.com>/oauthRedirect`.
    oauthClientId,          //The Client ID of this application as registered in the Onshape Dev Portal.
    oauthClientSecret,      //The Client Secret of this application as registered in the Onshape Dev Portal.
    oauthUrl,               //The parent URL of the Onshape OAuth endpoints, e.g. `https://oauth.onshape.com`.
    sessionSecret,          //The secret for handling session data.
    webhookCallbackRootUrl, //The URL of the webhook callback URL. This will be the `/api/event` endpoint on this server, e.g. `https://your-machine.example.com`.
    // - optional
    port,                   //The port this application should run on. This may be `undefined`.
    redisToGoUrl,           //The URL of the Redis To Go add-on (if deployed in Heroku). This may be `undefined`.
    redisHost,              //The URL of the Redis host. This may be `undefined`.
    redisPort               //The port of the Redis host. This may be `undefined`.
}





