const sqlite3 = require('sqlite3').verbose();
let  db = new sqlite3.Database('./European_Soccer.db',sqlite3.OPEN_READONLY ,(err) => {
    if (err) {
        return console.error(err.message);
    }
        console.log('Connected to the European_Soccer database.');

    });;

function dbConnect(){
    db = new sqlite3.Database('./European_Soccer.db',sqlite3.OPEN_READONLY ,(err) => {
        if (err) {
            return console.error(err.message);
        }
            console.log('Connected to the European_Soccer database.');
    
        });
        
    }

module.exports=db;