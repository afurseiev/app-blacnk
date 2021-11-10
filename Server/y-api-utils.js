
const { onshapeApiUrl } = require('./b-config-from-env');
const fetch             = require('node-fetch');

module.exports = 
{
  /**
 * Send a request to the Onshape API, and proxy the response back to the caller.
 * @param {string} apiPath The API path to be called. This can be absolute or a path fragment.
 * @param {Request} req The request being proxied.
 * @param {Response} res The response being proxied.
 */
    forwardRequestToOnshape: async (apiPath, req, res) => {
        try {
            console.log ("Api path in forwarder = " + onshapeApiUrl);
            const normalizedUrl = apiPath.indexOf(onshapeApiUrl) === 0 ? apiPath : `${onshapeApiUrl}/${apiPath}`;
            console.log ( "normalizedUrl = " + normalizedUrl);
            const resp = await fetch(normalizedUrl, { headers: { Authorization: `Bearer ${req.user.accessToken}` }});
            const data = await resp.text();
            const contentType = resp.headers.get('Content-Type');
            res.status(resp.status).contentType(contentType).send(data);
            
        } catch (err) {
            res.status(500).json({ "msg" : err.message });
            console.log (err.message);
        }
    }  
}
