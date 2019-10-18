"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var RosMsgs = /** @class */ (function () {
    function RosMsgs(type, directory) {
        this.dataStream = JSON.parse(JSON.stringify({}));
        this.filter_Msg = JSON.parse(JSON.stringify({}));
        this.calibration = JSON.parse(JSON.stringify({}));
        this.fields = [];
        this.loggedtxt = '';
        this.filename = path.join('', '');
        var time = new Date;
        this.topic = type;
        this.directory = directory;
        this.filename = path.join(directory, this.topic.replace("/", "").replace("/", "") + '.csv');
    }
    RosMsgs.prototype.SelectData = function () { };
    ;
    RosMsgs.prototype.MakeHeader = function () {
        var str = 'Date,Time,';
        this.fields.forEach(function (field) {
            str = str + field + ',';
        });
        if (fs.existsSync(this.filename)) { }
        else {
            fs.appendFileSync(this.filename, str);
            fs.close;
        }
    };
    RosMsgs.prototype.Data_log = function () {
        var time = new Date;
        var str = '\n' + time.toDateString() + ',' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        str = str + this.loggedtxt;
        return str;
    };
    RosMsgs.prototype.logTopic = function () {
        this.SelectData();
        this.MakeHeader();
        fs.appendFileSync(this.filename, this.Data_log());
        fs.close;
    };
    return RosMsgs;
}());
exports.RosMsgs = RosMsgs;
