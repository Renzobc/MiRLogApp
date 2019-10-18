"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Rosmsgs_1 = require("./Rosmsgs");
var fs = require("fs");
var path = require("path");
var DiagnosticsMsg = /** @class */ (function (_super) {
    __extends(DiagnosticsMsg, _super);
    function DiagnosticsMsg(type, directory) {
        var _this = _super.call(this, type, directory) || this;
        _this.name = '';
        _this.logvalues = JSON.parse(JSON.stringify({}));
        _this.time = new Date;
        _this.nodesPublished = ['LightCtrl', 'MC', 'PCDiagnostics: CPU Temperature', 'PCDiagnostics: CPU Load', 'battery_node: Battery Management System', 'SickPLC: Communication', 'laser_front/driver: Communication', 'laser_back/driver: Communication'];
        _this.messagetype = "diagnostic_msgs/DiagnosticArray";
        return _this;
    }
    DiagnosticsMsg.prototype.SelectData = function () {
        var _this = this;
        Object.keys(this.dataStream['status']).forEach(function (element) {
            Object.keys(_this.filter_Msg['FieldsPublished']).forEach(function (field) {
                if (_this.filter_Msg['FieldsPublished'][field].checked === true) {
                    switch (_this.dataStream['status'][element].name.includes(_this.filter_Msg['FieldsPublished'][field].name)) {
                        case true: {
                            _this.name = _this.dataStream['status'][element].name;
                            _this.logvalues = JSON.parse(JSON.stringify(_this.dataStream['status'][element]['values']));
                            _this.filename = path.join(_this.directory, _this.name.replace("/", "").replace("/", "").replace(":", "").replace(":", "").replace(":", "") + '.csv');
                            break;
                        }
                        case false: {
                            break;
                        }
                    }
                }
            });
        });
    };
    DiagnosticsMsg.prototype.Data_log = function () {
        var time = new Date;
        var str = '\n' + time.toDateString() + ',' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        str = str + ',';
        return str;
    };
    DiagnosticsMsg.prototype.logTopic = function () {
        var _this = this;
        var time = new Date;
        this.SelectData();
        this.loggedtxt = '';
        try {
            Object.keys(this.logvalues).forEach(function (element) {
                try {
                    _this.loggedtxt = _this.Data_log() + _this.logvalues[element]['key'].toString() + ',' + _this.logvalues[element]['value'].toString();
                }
                catch (err) {
                    console.log('Error: This message does not corresponds to any selected field', err);
                }
                try {
                    if (!fs.existsSync(_this.filename)) {
                        fs.appendFileSync(_this.filename, 'date, time, value, key');
                    }
                    ;
                    fs.appendFile(_this.filename, _this.loggedtxt, function (err) { console.log('AppendFile Completed'); });
                }
                catch (err) {
                    console.log('Error in making file', err);
                }
            });
        }
        catch (e) {
            console.log('No elements in log values');
        }
    };
    return DiagnosticsMsg;
}(Rosmsgs_1.RosMsgs));
exports.DiagnosticsMsg = DiagnosticsMsg;
/*
 * /LightCtrl (http://127.0.0.1:40625/)
 * /MC (http://127.0.0.1:36011/)
 * /PCDiagnostics (http://127.0.0.1:38965/)
 * /battery_node (http://127.0.0.1:39653/)
 * /SickPLC (http://127.0.0.1:38025/)
 * /laser_front/driver (http://127.0.0.1:37151/)
 * /laser_back/driver (http://127.0.0.1:43143/)




std_msgs/Header header
  uint32 seq
  time stamp
  string frame_id
diagnostic_msgs/DiagnosticStatus[] status

    byte OK=0
    byte WARN=1
    byte ERROR=2
    byte STALE=3
    byte level
    string name
    string message
    string hardware_id
    diagnostic_msgs/KeyValue[] values
        string key
        string value



header:
  seq: 1229
  stamp:
    secs: 1215
    nsecs: 780000000
  frame_id: ''
status:
  -
    level: 0
    name: "battery_node: Charging Status"
    message: "OK"
    hardware_id: "Battery"
    values:
      -
        key: "Charging relay"
        value: "Off"
      -
        key: "Charging current [A]"
        value: "0"
      -
        key: "Charging current [0-4096]"
        value: "2048"
  -
    level: 0
    name: "battery_node: Battery Management System"
    message: "No BMS communication available"
    hardware_id: "Battery"
    values: []
  -
    level: 0
    name: "battery_node: Battery"
    message: "Battery is OK"
    hardware_id: "Battery"
    values:
      -
        key: "Battery Voltage"
        value: "28.6"
      -
        key: "Remaining battery capacity [%]"
        value: "100"
      -
        key: "Remaining battery time [sec]"
        value: "136800"
      -
        key: "Remaining battery time [HH:MM:SS]"
        value: "38:00:00"
      -
        key: "Battery Amps"
        value: "0"
  -
    level: 1
    name: "battery_node: Battery Raw Data"
    message: "No new raw battery current data received"
    hardware_id: "Battery"
    values:
      -
        key: "Battery 1 current"
        value: "0"
      -
        key: "Battery 2 current"
        value: "0"
      -
        key: "Battery Voltage"
        value: "28.5987"
---

*/ 
