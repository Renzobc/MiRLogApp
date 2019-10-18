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
var Imu_data = /** @class */ (function (_super) {
    __extends(Imu_data, _super);
    function Imu_data(type, directory) {
        var _this = _super.call(this, type, directory) || this;
        _this.orientation = JSON.parse(JSON.stringify({}));
        _this.orientation_covariance = 0;
        _this.angular_velocity = JSON.parse(JSON.stringify({}));
        _this.angular_velocity_covariance = 0;
        _this.linear_acceleration = JSON.parse(JSON.stringify({}));
        _this.linear_acceleration_covariance = 0;
        _this.messagetype = 'sensor_msgs/Imu';
        return _this;
    }
    Imu_data.prototype.SelectData = function () {
        var _this = this;
        var str = '';
        Object.keys(this.filter_Msg['FieldsPublished']).forEach(function (field) {
            if (_this.filter_Msg['FieldsPublished'][field].checked === true) {
                switch (_this.filter_Msg['FieldsPublished'][field].name) {
                    case 'orientation': {
                        _this.orientation = _this.dataStream['orientation'];
                        str = str + ',' + JSON.stringify(_this.orientation);
                        _this.fields.push('orientation');
                        break;
                    }
                    case 'orientation_covariance': {
                        _this.orientation_covariance = _this.dataStream['orientation_covariance'];
                        str = str + ',' + JSON.stringify(_this.orientation_covariance);
                        _this.fields.push('orientation_covariance');
                        break;
                    }
                    case 'angular_velocity': {
                        _this.angular_velocity = _this.dataStream['angular_velocity'];
                        str = str + ',' + JSON.stringify(_this.angular_velocity);
                        _this.fields.push('angular_velocity');
                        break;
                    }
                    case 'angular_velocity_covariance': {
                        _this.angular_velocity_covariance = _this.dataStream['angular_velocity_covariance'];
                        str = str + ',' + JSON.stringify(_this.angular_velocity_covariance);
                        _this.fields.push('angular_velocity_covariance');
                        break;
                    }
                    case 'linear_acceleration': {
                        _this.linear_acceleration = _this.dataStream['linear_acceleration'];
                        str = str + ',' + JSON.stringify(_this.linear_acceleration);
                        _this.fields.push('linear_acceleration');
                        break;
                    }
                    case 'linear_acceleration_covariance': {
                        _this.linear_acceleration_covariance = _this.dataStream['linear_acceleration_covariance'];
                        str = str + ',' + JSON.stringify(_this.linear_acceleration_covariance);
                        _this.fields.push('linear_acceleration_covariance');
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
    return Imu_data;
}(Rosmsgs_1.RosMsgs));
exports.Imu_data = Imu_data;
/*
std_msgs/Header header
geometry_msgs/Quaternion orientation
    float64 x
    float64 y
    float64 z
    float64 w
float64[9] orientation_covariance
geometry_msgs/Vector3 angular_velocity
    float64 x
    float64 y
    float64 z
float64[9] angular_velocity_covariance
geometry_msgs/Vector3 linear_acceleration
    float64 x
    float64 y
    float64 z
float64[9] linear_acceleration_covariance
*/ 
