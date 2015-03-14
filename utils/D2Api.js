/* global Buffer */
let request = require('request');

class D2Api {
    constructor(server, credentials) {
        this.server = server;
        this.username = credentials.username;
        this.password = credentials.password;
    }

    get(url) {
        let requestOptions = {
            url: this.getUrl(url),
            headers: this.getDefaultHeaders()
        };

        return new Promise(function (resolve, reject) {
            request(requestOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        resolve({
                            code: response.statusCode,
                            data: JSON.parse(body)
                        });
                    } catch (e) {
                        reject({
                            code: response.statusCode,
                            data: undefined,
                            message: 'Unable to parse response text as JSON'
                        });
                    }
                } else {
                    reject({
                        code: response.statusCode,
                        data: undefined,
                        message: body
                    });
                }
            });
        });
    }

    getUrl(url) {
        return [this.server.replace(/\/$/, ''), url.replace(/^\//, '')].join('/');
    }

    getDefaultHeaders() {
        let headers = {
            accepts: 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.username && this.password) {
            headers.Authorization = this.getBasicAuthorizationString();
        }

        return headers;
    }

    getBasicAuthorizationString () {
        return [
            'Basic',
            new Buffer([this.username, this.password].join(':')).toString('base64')
        ].join(' ');
    }
}

export default D2Api;
