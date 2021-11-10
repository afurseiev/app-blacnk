
const config            = require('./b-config-from-env');
const onshapeApiUrl     = require('./b-config-from-env');
const fetch             = require('node-fetch');
const refresh           = require('passport-oauth2-refresh');

let RedirectAddress = `https://oauth.onshape.com/oauth/authorize?response_type=code&client_id=${config.oauthClientId}`;

module.exports = 
{
  /**
 * Send a request to the Onshape API, and proxy the response back to the caller.
 * @param {string} apiPath The API path to be called. This can be absolute or a path fragment.
 * @param {Request} req The request being proxied.
 * @param {Response} res The response being proxied.
 */
    forwardRequestToOnshape: async (apiPath, req, res) => {
        const normalizedUrl = apiPath.indexOf(onshapeApiUrl) === 0 ? apiPath : `${onshapeApiUrl}/${apiPath}`;
        const onshapeResponse = await fetch(normalizedUrl, { headers: { Authorization: `Bearer ${req.user.accessToken}` }});
        const status = await onshapeResponse.status;
        if (onshapeResponse.ok)
        {  
            const data = await onshapeResponse.text();
            const contentType = onshapeResponse.headers.get('Content-Type');
            res.status(onshapeResponse.status).contentType(contentType).send(data);
        }
        else
        {
            if (status == '401')
            {
                let OldRrefreshToken = req.user.refreshToken;
        
                refresh.requestNewAccessToken('onshape', OldRrefreshToken, function(err, accessToken, refreshToken) {
                req.user.accessToken = accessToken;
                req.user.refreshToken = refreshToken;
           
                if (accessToken)
                {
                    console.log("Restarting forwarder...");
                    forwardRequestToOnshape (req, res);
                }
                else
                {
                    console.log(JSON.stringify(err));
                    console.log (RedirectAddress);
                    res.status(401).send(RedirectAddress);
                }       
                });
            }
            console.log ("FAIL status = " + onshapeResponse.status);
            console.log ("FAIL text = " + onshapeResponse.statusText);
            res.status(onshapeResponse.status).send(onshapeResponse.statusText);  
        }
    }  
}
