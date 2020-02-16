var express = require('express');
var mysql = require('./dbcon.js');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')
var session = require('express-session')

app.use(cors())

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

port = 15204


app.set('port', port);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/script', function(req, res) {
    res.sendFile(__dirname + '/script.js');
});

app.get('/get_vinyls', function (req, res, next) {
    mysql.pool.query('SELECT Vinyls.*, Users.username FROM Vinyls INNER JOIN Users ON Vinyls.userID=Users.userID', function (err, rows, fields) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.send(rows)
    });
});

app.get('/get_artists', function (req, res, next) {
    mysql.pool.query('SELECT * FROM Artists ORDER BY name', function (err, rows, fields) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.send(rows)
    });
});

app.post('/add_artist', function (req, res, next){
    console.log(req.body)
    mysql.pool.query("INSERT INTO Artists (name) VALUES (?)", [req.body.name], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send(err)
            return;
        }
        res.send("Inserted Documents")
    });
});

app.post('/get_vinyl', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("SELECT Vinyls.*, Users.username FROM Vinyls INNER JOIN Users ON Vinyls.userID=Users.userID AND vinylID=?", [req.body.vinylID], function (err, rows, result) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.send(rows)
    });
});

app.post('/get_reviews', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("SELECT Reviews.reviewID, Reviews.reviewBody, Users.username FROM Reviews INNER JOIN Users ON Reviews.userID=Users.userID AND Reviews.vinylID=?", [req.body.vinylID], function (err, rows, result) {
        if (err) {
            res.status(500).send(err)
            return;
            
        }
        res.send(rows)
    });
});

app.post('/authenticate', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("SELECT EXISTS(SELECT * FROM Users WHERE username=? AND password=?) AS authenticated", [req.body.username, req.body.password], function (err, rows, result) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        else{
            data = rows[0]
            res.send(data)
        }
    });
});

app.post('/sign_up', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("INSERT INTO Users (`username`, `password`) VALUES (?, ?)", [req.body.username, req.body.password], function (err, result) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.send("Inserted Documents")
    });
});

app.post('/add_review', function (req, res, next){
    console.log(req.body)
    mysql.pool.query("INSERT INTO Reviews (`vinylID`, `reviewBody`, userID) VALUES (?, ?, (SELECT userID FROM Users WHERE username=?))", [req.body.vinylID, req.body.reviewBody, req.body.username], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send(err)
            return;
        }
        res.send("Inserted Documents")
    });
});


app.post('/sell_vinyls', function (req, res, next) {
    console.log(req.body)

    mysql.pool.query("INSERT INTO Vinyls (`name`, `genre`, `description`, `price`, `imageURL`, `userID`) VALUES (?, ?, ?, ?, ?, (SELECT userID FROM Users WHERE username=?))", [req.body.name, req.body.genre, req.body.description, req.body.price, req.body.imageURL, req.body.username], function (err, result) {
        if (err) {
            res.status(500).send(err)
            console.log(err)
            return;
        }
        res.send("Inserted Documents")
    });
});

app.post('/sell_vinyls', function (req, res, next) {
    console.log(req.body)

    mysql.pool.query("INSERT INTO Vinyls (`name`, `genre`, `description`, `price`, `imageURL`, `userID`) VALUES (?, ?, ?, ?, ?, (SELECT userID FROM Users WHERE username=?))", [req.body.name, req.body.genre, req.body.description, req.body.price, req.body.imageURL, req.body.username], function (err, result) {
        if (err) {
            res.status(500).send(err)
            console.log(err)
            return;
        }
        res.send("Inserted Documents")
    });
});

app.post('/edit_review', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("UPDATE Reviews SET reviewBody=? WHERE reviewID=?",
        [req.body.reviewBody, req.body.reviewID],
        function (err, result) {
            if (err) {
                res.status(500).send(err)
                return;
            }
            res.send("Edited Documents")
        });
});

app.post('/delete_review', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("DELETE FROM Reviews WHERE reviewID=?",
        [ req.body.reviewID],
        function (err, result) {
            if (err) {
                res.status(500).send(err)
                return;
            }
            res.send("Deleted Documents")
        });
});

app.post('/delete', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("DELETE FROM workouts WHERE id=?",
        [req.body.id],
        function (err, result) {
            if (err) {
                res.status(500).send(err)
                return;
            }
            res.send("Deleted Documents")
        });
});







app.get('/reset-table', function (req, res, next) {
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function (err) { //replace your connection pool with the your variable containing the connection pool
        var createString = "CREATE TABLE workouts(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "lbs BOOLEAN)";
        mysql.pool.query(createString, function (err) {
            res.send("Table Reset")
        })
    });
});


app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
