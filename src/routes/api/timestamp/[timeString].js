export function get(req, res, next) {

    const { timeString } = req.params;
    
    let timeStamp = new Date(timeString);   // try string

    if (timeStamp == 'Invalid Date') {
        // invalid string

        timeStamp = new Date(Number(timeString));      // try int

        if (timeStamp == 'Invalid Date') {
            // invalid int
            res.end('{ "error": "Invalid Date" }');
        } else {

            res.end(JSON.stringify({
                "unix": timeStamp.getTime(),
                "utc": timeStamp.toUTCString()
               }));

        }

    } else {

        res.end(JSON.stringify({
             "unix": timeStamp.getTime(),
             "utc": timeStamp.toUTCString()
            }));

    }

}