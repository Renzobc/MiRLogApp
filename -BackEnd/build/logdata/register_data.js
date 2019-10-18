"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rosmsgs_1 = require("../Classes/Rosmsgs");
var sensor_msgs_LaserScan_1 = require("../Classes/sensor_msgs_LaserScan");
var nav_msgs_Odometry_1 = require("../Classes/nav_msgs_Odometry");
var sensor_msgs_Imu_1 = require("../Classes/sensor_msgs_Imu");
var mirMsgs_BatteryVoltage_1 = require("../Classes/mirMsgs_BatteryVoltage");
var mirMsgs_BatteryCurrents_1 = require("../Classes/mirMsgs_BatteryCurrents");
var geometry_msgs_Twist_1 = require("../Classes/geometry_msgs_Twist");
var sdc21x0_MotorCurrents_1 = require("../Classes/sdc21x0_MotorCurrents");
var diagnostic_msgs_DiagnosticArray_1 = require("../Classes/diagnostic_msgs_DiagnosticArray");
var fs = require("fs");
var logfile = /** @class */ (function () {
    //options.rostopic, options.freq, options.msg, options.calibration, options.mission, options.logTime
    //rostopic:string, freq:number, msg:JSON, calibration:JSON,mission:string, logTime:number
    function logfile(options) {
        //var time =new Date;
        this.freq = options['freq'];
        if (options['mission'] === '') {
            this.directory = './logs';
        }
        else {
            this.directory = './' + options['mission'];
        }
        ; //logs';
        console.log(this.directory);
        this.rostopic = options['rostopic'].replace("/", "").replace("/", "").replace("/", "");
        this.lastTime = new Date;
        this.rosmsg = this.GetClassType(options['rostopic']);
        this.rosmsg.filter_Msg = options['msg'];
        this.rosmsg.calibration = options['calibration'];
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory);
        }
    }
    logfile.prototype.logdata = function (data) {
        var time = new Date;
        console.log(time.getHours(), this.lastTime);
        if (this.filter(this.freq, time)) {
            this.rosmsg.dataStream = JSON.parse(JSON.stringify(data));
            this.rosmsg.logTopic();
            this.lastTime = time;
        }
    };
    logfile.prototype.filter = function (frequency, time) {
        var CurrentMiliseconds = time.getHours() * 60 * 60 * 1000 + time.getMinutes() * 60 * 1000 + time.getSeconds() * 1000 + time.getMilliseconds();
        var LastMiliseconds = this.lastTime.getHours() * 60 * 60 * 1000 + this.lastTime.getMinutes() * 60 * 1000 + this.lastTime.getSeconds() * 1000 + this.lastTime.getMilliseconds();
        if (LastMiliseconds + (1000 / frequency) >= CurrentMiliseconds) {
            return false;
        }
        {
            return true;
        }
    };
    logfile.prototype.GetClassType = function (type) {
        var msg;
        switch (type) {
            case 'cmd_vel': {
                msg = new geometry_msgs_Twist_1.twist(type, this.directory);
                break;
            }
            case 'MC/battery_currents': {
                msg = new mirMsgs_BatteryCurrents_1.batteryCurrents(type, this.directory);
                break;
            }
            case 'MC/battery_voltage': {
                msg = new mirMsgs_BatteryVoltage_1.batteryVoltage(type, this.directory);
                break;
            }
            case 'MC/currents': {
                msg = new sdc21x0_MotorCurrents_1.MotorCurrents(type, this.directory);
                break;
            }
            case 'imu_data': {
                msg = new sensor_msgs_Imu_1.Imu_data(type, this.directory);
                break;
            }
            case 'odom': {
                msg = new nav_msgs_Odometry_1.odom(type, this.directory);
                break;
            }
            case 'b_scan': {
                msg = new sensor_msgs_LaserScan_1.LaserScan(type, this.directory);
                break;
            }
            case 'f_scan': {
                msg = new sensor_msgs_LaserScan_1.LaserScan(type, this.directory);
                break;
            }
            case 'diagnostics': {
                msg = new diagnostic_msgs_DiagnosticArray_1.DiagnosticsMsg(type, this.directory);
                break;
            }
            default: {
                msg = new Rosmsgs_1.RosMsgs(type, this.directory);
                break;
            }
        }
        return msg;
    };
    return logfile;
}());
exports.logfile = logfile;
