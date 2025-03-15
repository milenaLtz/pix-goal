const fetch = require("node-fetch");

exports.handler = async function (event) {
    const response = await fetch("http://80.90.189.80:8080" + event.path, {
        method: event.httpMethod,
        headers: { ...event.headers }
    });
    const body = await response.text();

    return {
        statusCode: response.status,
        body: body
    };
};
