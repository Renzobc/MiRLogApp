"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var register_data_1 = require("./logdata/register_data");
var API_1 = require("./RobotApi/API");
var roslib = require("roslib");
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var server = require('http').Server(app);
//const io = require('socket.io')(server);
var cors = require('cors');
//const {Darknet}  = require('darknet');
//const mysql = require('mysql');
//server.globalAgent.maxSockets = 20;
//server.maxConnections = 20;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./dist/")));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
//app.use(cors(corsOptions));
//Here Starts the coding 
app.route('*').get(function (req, res) {
    console.log('Back end in this App is Up.');
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
app.route('/RobotApi').post(function (req, res) {
    //console.log('robot APi',req.body)
    try {
        var Api = new API_1.API(req);
        Api.APIRequest().then(function (answer) {
            //console.log('Answer : '+answer);
            res.send(answer);
        }).catch(function (err) { res.send(err); console.log('Error Robot API', err); });
    }
    catch (e) {
        console.log(e);
    }
    ;
});
app.route('/RosMsg').post(function (req, res) {
    console.log(req);
    var roscn = new roslib.Ros({
        url: 'ws://' + req.body.ip + ':' + '9090' //'ws://192.168.0.20:9090'
    });
    roscn.on('connection', function () {
        console.log('Correctly connected to robot');
    });
    roscn.on('error', function () {
        console.log('Error in RosBridge');
        //res.send('Closing Connection With this end point...');
    });
    var options = {
        host: req.body.ip,
        rostopic: req.body.topic,
        msg: req.body.msg
    };
    //Fetch the message from the RosTopic variable
    var topic_listener = new roslib.Topic({
        ros: roscn,
        name: options.rostopic,
        messageType: options.msg['messagetype'] //logger.message_type
    });
    topic_listener.subscribe(function (mes) {
        //console.log(mes)
        res.send(mes);
    });
    req.on('close', function () {
        //res.send('Closing Connection With this end point...');
        console.log('The user has closed connection, unsubscribing...');
        topic_listener.unsubscribe();
    });
    req.on('aborted', function () {
        console.log('The user has aborted connection');
        //res.send('Closing Connection With this end point...');
        topic_listener.unsubscribe();
    });
});
app.route('/logdata').post(function (req, res) {
    //Make the RosBridge connection
    //console.log('logdata api',req.body);
    var roscn = new roslib.Ros({
        url: 'ws://' + req.body.list[0].ip + ':' + '9090' //'ws://192.168.0.20:9090'
    });
    roscn.on('connection', function () {
        console.log('Correctly connected to robot');
    });
    roscn.on('error', function () {
        console.log('Error in RosBridge');
        res.send('Closing Connection With this end point...');
    });
    req.body.list.forEach(function (element) {
        //validate the data sent to log from a rostopic
        var options = {
            host: element.ip,
            rostopic: element.topic,
            freq: element.freq,
            msg: element.msg,
            calibration: element.calibration,
            mission: element.mission_name,
            logTime: element.logTime
        };
        try {
            //Make a logger foreach element on the list
            //Create the logfile object
            var logger_1 = new register_data_1.logfile(JSON.parse(JSON.stringify(options)));
            //Compose the Rostopic on a Rosbridge variable.
            var topic_listener = new roslib.Topic({
                ros: roscn,
                name: options.rostopic,
                messageType: options.msg['messagetype'] //logger.message_type
            });
            //Fetch the message from the RosTopic variable
            topic_listener.subscribe(function (mes) {
                logger_1.logdata(JSON.parse(JSON.stringify(mes)));
            });
            //Set the criteria for the logging to stop --> This is set in the front end (Uses Unsubscribe
            req.on('close', function () {
                //res.send('Closing Connection With this end point...');
                console.log('The user has closed connection, unsubscribing...');
                topic_listener.unsubscribe();
            });
            req.on('aborted', function () {
                console.log('The user has aborted connection');
                //res.send('Closing Connection With this end point...');
                topic_listener.unsubscribe();
            });
        }
        catch (Error) {
            console.log('Error Connecting to RosBridge', Error);
        }
    });
});
server.listen('3000', function () {
    console.log('Server started on port 3000');
});
