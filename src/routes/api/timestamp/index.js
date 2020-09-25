

export async function get (req, res, next) {

    const date = new Date();

    res.end(JSON.stringify({ "unix": date.getTime(), "utc": date.toUTCString()}));

    // works also
    // res.end(`{ "unix": ${date.getTime()}, "utc": "${date.toUTCString()}"}`);

}