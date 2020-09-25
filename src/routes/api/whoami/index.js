export async function get(req, res) {

    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

    const whoami = {};

    whoami.ipaddress = req.headers['x-forwarded-for'];
    whoami.language = req.headers['accept-language'];
    whoami.software = req.headers['user-agent'];
    
    res.end(JSON.stringify(whoami));

}