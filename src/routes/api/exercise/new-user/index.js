import { db } from '../../../../server.js';


export async function post (req, res) {
    
    const username = req.body.username;
    
    const users = db.getCollection('users');

    let user = users.findOne({username});
    
    if (user) {

        res.end('{"error": "user exists"}');

    } else {

        user = users.insert({ username });

        res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
        res.end(JSON.stringify({username, _id: user['$loki']}));

    }
}
