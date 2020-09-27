import { db } from '../../../../server.js';
import moment from 'moment';



export async function post (req, res) {
    
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

    const exercise = { ...req.body };
    
    if (exercise.date === undefined) {
        const now = moment().format('YYYY-MM-DD');
        exercise.date = now;
    }

    const users = db.getCollection('users');

    const user = users.findOne({"$loki": Number(exercise.userId)});

    if (user) {

        exercise.username = user.username;

        const exercises = db.getCollection('exercises');
       
        exercise._id = exercise.userId;
        delete exercise.userId;

        res.end(JSON.stringify(exercise));

        exercises.insert(exercise);
        
    } else {
        res.end('{"error": "no user"}');
    }

}