import { db } from '../../../../server.js';
import moment from 'moment';

export async function get (req, res) {

    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

    const { userId, limit } = req.query;
    let { from, to } = req.query;

    if (from === undefined && to === undefined) {
        from = 0;
        to = moment().format('YYYY-MM-DD');
    }
    
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
            date = new Date(date).toDateString();
            return { description, duration, date };
        });
        
        res.end(JSON.stringify(log));

    } else {

        res.end('{"error": "no user"}');

    }

    
}