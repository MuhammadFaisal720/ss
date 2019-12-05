var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var fs = require('fs')
var finalObj = require('./file.json');
// Running Server Details.
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at %s:%s Port", host, port)
});

app.use(express.static(__dirname+'/Views/'));
app.get('/StudentProfile', function (req, res) {
    res.sendFile(path.join(__dirname+'/Views/Profile.html'));
	
});

app.post('/post', urlencodedParser, function (req, res) {
    var reply = 'Query submitted successfully';
    let obj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        DOB: req.body.DOB,
        SSID: req.body.SSID,
		Degree: req.body.Degree,
		University: req.body.University
		
    }
    finalObj.push(obj)
    fs.writeFile('./file.json', JSON.stringify(finalObj), function (err) {
        res.send(reply);
		res.sendFile(path.join(__dirname+'/Views/Profile.html'));
	
    });
});

app.get('/DisplayProfiles', urlencodedParser, function (req, res) {
    let rawdata = fs.readFileSync('./file.json');
    let data = JSON.parse(rawdata);
    res.send(data)
   
});