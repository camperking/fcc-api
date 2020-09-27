import { db } from '../../../../server.js';

export async function post (req, res) {

    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

    const exercise = { ...req.body };

    const users = db.getCollection('users');

    const user = users.findOne({"$loki": Number(exercise._id)});

    if (user) {

        exercise.username = user.username;

        const exercises = db.getCollection('exercises');
       
        res.end(JSON.stringify(exercise));

        exercises.insert(exercise);
        
    } else {
        res.end('{"error": "no user"}');
    }

}