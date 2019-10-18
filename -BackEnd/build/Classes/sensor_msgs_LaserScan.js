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
var RAD2DEG = 180 / 3.1416;
var LaserScan = /** @class */ (function (_super) {
    __extends(LaserScan, _super);
    function LaserScan(type, directory) {
        var _this = _super.call(this, type, directory) || this;
        _this.angle_min = 0;
        _this.angle_max = 0;
        _this.angle_increment = 0;
        _this.time_increment = 0;
        _this.scan_time = 0;
        _this.range_min = 0;
        _this.range_max = 0;
        _this.ranges = [];
        _this.intensities = [];
        _this.messagetype = 'sensor_msgs/LaserScan';
        return _this;
    }
    LaserScan.prototype.SelectData = function () {
        var _this = this;
        this.angle_increment = this.dataStream['angle_increment'] * RAD2DEG;
        var str = '';
        Object.keys(this.filter_Msg['FieldsPublished']).forEach(function (field) {
            if (_this.filter_Msg['FieldsPublished'][field].checked === true) {
                switch (_this.filter_Msg['FieldsPublished'][field].name) {
                    case 'angle_min': {
                        _this.angle_min = _this.calibration['angle_min']; //(<any>this.dataStream)['angle_min'];
                        str = str + ',' + JSON.stringify(_this.angle_min);
                        _this.fields.push('angle_min');
                        break;
                    }
                    case 'angle_max': {
                        _this.angle_max = _this.calibration['angle_max']; //(<any>this.dataStream)['angle_max'];
                        str = str + ',' + JSON.stringify(_this.angle_max);
                        _this.fields.push('angle_max');
                        break;
                    }
                    case 'angle_increment': {
                        _this.angle_min = _this.dataStream['angle_increment']; //(<any>this.dataStream)['angle_min'];
                        str = str + ',' + JSON.stringify(_this.angle_increment);
                        _this.fields.push('angle_increment');
                        break;
                    }
                    case 'scan_time': {
                        _this.scan_time = _this.dataStream['scan_time'];
                        str = str + ',' + JSON.stringify(_this.scan_time);
                        _this.fields.push('scan_time');
                        break;
                    }
                    case 'range_min': {
                        _this.range_min = _this.dataStream['range_min'];
                        str = str + ',' + JSON.stringify(_this.range_min);
                        _this.fields.push('range_min');
                        break;
                    }
                    case 'range_max': {
                        _this.range_max = _this.dataStream['range_max'];
                        str = str + ',' + JSON.stringify(_this.range_max);
                        _this.fields.push('range_max');
                        break;
                    }
                    case 'ranges': {
                        _this.ranges = _this.dataStream['ranges'];
                        str = str + ',' + JSON.stringify(_this.FilterRanges()); //this.ranges);
                        _this.fields.push('ranges');
                        break;
                    }
                    case 'intensities': {
                        _this.intensities = _this.dataStream['intensities'];
                        str = str + ',' + JSON.stringify(_this.intensities);
                        _this.fields.push('intensities');
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        });
        this.loggedtxt = str;
    };
    LaserScan.prototype.FilterRanges = function () {
        var _this = this;
        var ranges = [];
        var counter = 0;
        this.dataStream['ranges'].forEach(function (element) {
            counter = counter + 1;
            console.log(counter, _this.calibration['angle_min'] / _this.angle_increment, _this.calibration['angle_max'] / _this.angle_increment, element);
            if (counter >= Number(_this.calibration['angle_min']) / _this.angle_increment && counter <= Number(_this.calibration['angle_max']) / _this.angle_increment) {
                ranges.push(Number(element));
            }
        });
        return ranges;
    };
    return LaserScan;
}(Rosmsgs_1.RosMsgs));
exports.LaserScan = LaserScan;
/*
std_msgs/Header header
float32 angle_min
float32 angle_max
float32 angle_increment
float32 time_increment
float32 scan_time
float32 range_min
float32 range_max
float32[] ranges
float32[] intensities
*/
