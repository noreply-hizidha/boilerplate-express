let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');

require('dotenv').config();

const assetsPath = path.join(__dirname, 'public');
const paths = path.join(__dirname, 'views', 'index.html');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use('/public', express.static(assetsPath));
app.get('/', (req, res) => {
    res.sendFile(paths);
});

app.get('/json', function(req, res){
    data = {"message": "Hello json"};
    if (process.env.MESSAGE_STYLE === 'uppercase1') {
        res.json({ "message":"HELLO JSON" })
    }
    else{
        res.json(data);
    }
});

app.get('/now', function(req, rest, next){
    req.time = new Date().toString();
    next(); // Call next to move to the final handler
}, function(req, res){
    res.json({time: req.time});
})

app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    
    res.json({ echo: word });
});

app.route('/name')
    .get((req, res) => {
        const firstName = req.query.first;
        const lastName = req.query.last;
        res.json({ name: `${firstName} ${lastName}` });
    })
    .post((req, res) => {
        const firstName = req.body.first;
        const lastName = req.body.last;
        res.json({ name: `${firstName} ${lastName}` });
    });


// let indexPath = path.join(__dirname, '/views/index.html');
// app.get('/', function(req, res){
//     res.sendFile(indexPath);
// });

//console.log("Hello World");
// app.get('/', function(req, res){
//     res.send('Hello Express');
//     res.sendFile(path)
// });

































 module.exports = app;
