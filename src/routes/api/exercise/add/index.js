import { db } from '../../../../server.js';
import moment from 'moment';



export async function post (req, res) {
    
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

    const exercise = { ...req.body };
    
    if (exercise.date === 'undefined' || exercise.date === undefined) {
        const now = moment().format('YYYY-MM-DD');
        exercise.date = now;
    }

    const users = db.getCollection('users');

    const user = users.findOne({"$loki": Number(exercise.userId)});

    if (user) {


        const response = {};

        response._id = exercise.userId;
        response.username = user.username;
        response.date = new Date(exercise.date).toDateString();
        response.duration = Number(exercise.duration);
        response.description = exercise.description;

        const exercises = db.getCollection('exercises');
        const dbInsert = {...response};
        dbInsert.date = new Date(response.date).toISOString().slice(0, 10);

        exercises.insert(dbInsert);

        res.end(JSON.stringify(response));

        
        
    } else {
        res.end('{"error": "no user"}');
    }

}