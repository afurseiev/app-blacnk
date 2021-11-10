
const fetch             = require('node-fetch');
const { onshapeApiUrl } = require('./b-config-from-env');


/**
 * Checks if the given string is a URL. A string considered a URL if it can be parsed
 * as a URL (based on the WHATWG definition).
 * If `protocols` is provided, this will be taken into account in the validation.
 * 
 * For example:
 * `isValidUrl('https://example.com', [ 'http:', 'https:' ])` would evaluate to `true`
 * `isValidUrl('http://sub.example.com', [ 'redis:' ])` would evaluate to `false`
 * `isValidUrl('example.com')` would evaluate to `false`
 * 
 * @param {string} stringToTest The string to check for validity.
 * @param {string|string[]} protocols The protocol(s) to include in the validity
 *      check. May be excluded, in which case it will not be considered in the check.
 * 
 * @returns {boolean} `true` if the given string is a valid URL, and has one of the
 *      given protocols (if provided); or `false` otherwise.
 */
const  isValidUrl = function (stringToTest, protocols)
    {
    try {
        const url = new URL(stringToTest);
        if (!protocols) {
            return true;
        }
        if (typeof protocols === 'string' || protocols instanceof String) {
            protocols = [ protocols ];
        }
        return !protocols || protocols.includes(url.protocol);
    } catch {
        return false;
    }
}
    
    
    module.exports = 
    {

        isValidUrl: isValidUrl,

        /**
         * Checks if the given string is an HTTP or HTTPS URL. A string is considered if it can
         * be parsed as a URL (based on the WHATWG definition).
         * 
         * For example:
         * `isValidHttpUrl('http://example.com')` would evaluate to `true`
         * `isValidHttpUrl('ftp://user:pass@ftp.example.com/public/doc.txt)` would evaluate
         * to `false`
         * `isValidHttpUrl('example.com')` would evaluate to `false`
         * 
         * @param {string} stringToTest The string to check for validity.
         */
        isValidHttpUrl : (stringToTest) => {
            return isValidUrl(stringToTest, [ 'http:', 'https:' ]);
        },

        /**
         * Checks if the given string has content, i.e. is not null and does not contain solely  whitespace characters.
         * @param {string} stringToTest The string to check for validity.
         */
        isValidString : (stringToTest) => {
            if (!stringToTest) return false;
            if (!(stringToTest.trim())) return false;
            return true;
        },

        /**
         * Send a request to the Onshape API, and proxy the response back to the caller.
         * @param {string} apiPath The API path to be called. This can be absolute or a path fragment.
         * @param {Request} req The request being proxied.
         * @param {Response} res The response being proxied.
         */
        forwardRequestToOnshape: async (apiPath, req, res) => {
            try {
                const normalizedUrl = apiPath.indexOf(onshapeApiUrl) === 0 ? apiPath : `${onshapeApiUrl}/${apiPath}`;
                const resp = await fetch(normalizedUrl, { headers: { Authorization: `Bearer ${req.user.accessToken}` }});
                const data = await resp.text();
                const contentType = resp.headers.get('Content-Type');
                res.status(resp.status).contentType(contentType).send(data);
                
            } catch (err) {
                res.status(500).json({ "msg" : err.message });
                console.log (err.message);
            }
        }

};