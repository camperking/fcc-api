import { db } from '../../../../server.js';

export async function get (req, res) {
    const users = db.getCollection('users');
    const allUsers = await users.find();

    const allUsersResponse = allUsers.map(user => {
        return {username: user.username, _id: user['$loki']};
    });

    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    res.end(JSON.stringify(allUsersResponse));
}