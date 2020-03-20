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



app.post('/get_reviews', function (req, res, next) {
    mysql.pool.query('SELECT Reviews.reviewID, Reviews.reviewBody, Users.username FROM Reviews INNER JOIN Users ON Reviews.userID=Users.userID AND Reviews.vinylID=?;', [req.body.vinylID], function (err, rows, fields) {
        console.log(req.body)
        console.log('\'%' + req.body.query + '%\'')
        if (err) {
            res.status(500).send(err)
            return;
        }
        console.log(rows)
        res.send(rows)
    });
});

app.post('/search_vinyls', function (req, res, next) {
    mysql.pool.query('SELECT Vinyls.*, Users.username FROM Vinyls INNER JOIN Users ON Vinyls.userID=Users.userID WHERE Vinyls.name LIKE '+ mysql.pool.escape('%'+req.body.query+'%'), [req.body.query], function (err, rows, fields) {
        console.log(req.body)
        console.log('\'%' + req.body.query + '%\'')
        if (err) {
            res.status(500).send(err)
            return;
        }
        console.log(rows)
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

app.post('/get_artist', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("SELECT * FROM Artists WHERE artistID=?", [req.body.artistID], function (err, rows, result) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.send(rows)
    });
});

app.post('/get_artist_vinyls', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("SELECT Vinyls.* FROM Vinyls_Artists INNER JOIN Vinyls ON Vinyls_Artists.vinylID=Vinyls.vinylID AND artistID=?", [req.body.artistID], function (err, rows, result) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.send(rows)
    });
});

app.post('/get_artist_vinyls_search', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query('SELECT Vinyls.* FROM Vinyls_Artists INNER JOIN Vinyls ON Vinyls_Artists.vinylID=Vinyls.vinylID AND artistID=? WHERE Vinyls.name LIKE '+ mysql.pool.escape('%'+req.body.query+'%'), [req.body.artistID], function (err, rows, result) {
        if (err) {
            res.status(500).send(err)
            return;
        }
        res.send(rows)
    });
});

app.post('/get_vinyl_artists', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("SELECT Artists.name FROM Vinyls_Artists INNER JOIN Artists ON Vinyls_Artists.artistID=Artists.artistID AND vinylID=?", [req.body.vinylID], function (err, rows, result) {
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

app.post('/delete_vinyl', function (req, res, next) {
    console.log(req.body)
    mysql.pool.query("DELETE FROM Vinyls_Artists WHERE vinylID=?; DELETE FROM Vinyls WHERE vinylID=?",
        [req.body.vinylID, req.body.vinylID],
        function (err, result) {
            if (err) {
                res.status(500).send(err)
                console.log(err)
                return;

            }
            res.send("Deleted Documents")
        });
});


generate_queries = (vinylName, vinylGenre, vinylDescription, vinylPrice, vinylURL, userName, artist_names) => {
    query = ""
    for (artist in artist_names) {
        query += `INSERT IGNORE INTO Vinyls (name, genre, description, price, imageURL, userID) VALUES ('${vinylName}', '${vinylGenre}', '${vinylDescription}', '${vinylPrice}', '${vinylURL}', (SELECT userID FROM Users WHERE username='${userName}'));\n`
        query += `INSERT IGNORE INTO Artists (name) VALUES ('${artist_names[artist]}');\n`
        query += `INSERT IGNORE INTO Vinyls_Artists (vinylID, artistID) VALUES ((SELECT vinylID from Vinyls WHERE name='${vinylName}'), (SELECT artistID from Artists WHERE name='${artist_names[artist]}'));\n`
    }
    return(query)
}

console.log(generate_queries("After Hours", "Rock", "Gold", "20", "https://www.spectrumcentercharlotte.com/assets/img/200220_icon_weeknd-afca4e580e.jpg", "john", ["The Weeknd", "Illangelo"]))

app.post('/add_artists_vinyl', function (req, res, next) {

    "INSERT INTO IGNORE Artists (name) VALUES (?)"
    "INSERT INTO Vinyls_Artists (vinylID, artistID) (?, (SELECT artistID from Artists WHERE name=?))"
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
    queries = generate_queries(req.body.name, req.body.genre, req.body.description, req.body.price, req.body.imageURL, req.body.username, req.body.artists)
    console.log(queries)
    mysql.pool.query(queries, [req.body.name, req.body.genre, req.body.description, req.body.price, req.body.imageURL, req.body.username], function (err, result) {
        if (err) {
            res.status(500).send(err)
            console.log(err)
            return;
        }
        res.send("Inserted Documents")
    });

});

// app.post('/sell_vinyls', function (req, res, next) {
//     console.log(req.body)
//     mysql.pool.query("INSERT INTO Vinyls (`name`, `genre`, `description`, `price`, `imageURL`, `userID`) VALUES (?, ?, ?, ?, ?, (SELECT userID FROM Users WHERE username=?))", [req.body.name, req.body.genre, req.body.description, req.body.price, req.body.imageURL, req.body.username], function (err, result) {
//         if (err) {
//             res.status(500).send(err)
//             console.log(err)
//             return;
//         }
//         res.send("Inserted Documents")
//     });

// });


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








app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
