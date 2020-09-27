import { db } from '../../../../server.js';



export async function post (req, res) {
    
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

    const exercise = { ...req.body };
    console.log(exercise);
    if (exercise.date === 'undefined') {
        const now = new Date();
        exercise.date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
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