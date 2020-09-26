import loki from 'lokijs';

let lokidb;

export default function dbInit() {

    return new Promise(resolve => {
        lokidb = new loki('./api.db', {
            autoload: true,
            autoloadCallback : () => {resolve(lokidb)},
            autosave: true, 
            autosaveInterval: 4000
        });
    });
};

