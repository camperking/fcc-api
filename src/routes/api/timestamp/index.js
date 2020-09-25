

export async function get (req, res, next) {

    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

    const date = new Date();

    res.end(JSON.stringify({ "unix": date.getTime(), "utc": date.toUTCString()}));

    // works also
    // res.end(`{ "unix": ${date.getTime()}, "utc": "${date.toUTCString()}"}`);

}