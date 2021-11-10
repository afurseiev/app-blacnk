
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
        const normalizedUrl = apiPath.indexOf(onshapeApiUrl) === 0 ? apiPath : `${onshapeApiUrl}/${apiPath}`;
        const onshapeResponse = await fetch(normalizedUrl, { headers: { Authorization: `Bearer ${req.user.accessToken}` }});
        if (onshapeResponse.ok)
        {  
            console.log ("OK status = " + onshapeResponse.status);
            const data = await onshapeResponse.text();
            const contentType = onshapeResponse.headers.get('Content-Type');
            res.status(onshapeResponse.status).contentType(contentType).send(data);
        }
        else
        {
            console.log ("FAIL status = " + onshapeResponse.status);
            console.log ("FAIL text = " + onshapeResponse.statusText);
            res.status(onshapeResponse.status).send(onshapeResponse.statusText);  
        }
    }  
}
