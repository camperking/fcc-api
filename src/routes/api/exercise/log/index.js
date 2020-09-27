import { db } from '../../../../server.js';

export async function get (req, res) {

    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

    const { userId, from, to, limit } = req.query;

    const users = db.getCollection('users');

    const user = users.findOne({'$loki': Number(userId)});
    
    if (user) {

        const exercises = db.getCollection('exercises');

        const exerciseLog = exercises.chain().find({"_id": userId, "date": { $between: [from, to] }}).limit(limit).data();

        const log = {};

        log._id = userId;
        log.username = user.username;
        log.count = exerciseLog.length;

        log.log = exerciseLog.map(exercise => {
            const { description, duration, date } = exercise;
            return { description, duration, date };
        });
        console.log(logs);
        res.end(JSON.stringify(log));

    } else {

        res.end('{"error": "no user"}');

    }

    
}