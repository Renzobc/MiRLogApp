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
var odom = /** @class */ (function (_super) {
    __extends(odom, _super);
    function odom(type, directory) {
        var _this = _super.call(this, type, directory) || this;
        _this.pose = JSON.parse(JSON.stringify({}));
        _this.twist = JSON.parse(JSON.stringify({}));
        _this.messagetype = "nav_msgs/Odometry";
        return _this;
    }
    odom.prototype.SelectData = function () {
        var _this = this;
        var str = '';
        Object.keys(this.filter_Msg['FieldsPublished']).forEach(function (field) {
            if (_this.filter_Msg['FieldsPublished'][field].checked === true) {
                switch (_this.filter_Msg['FieldsPublished'][field].name) {
                    case 'pose': {
                        _this.pose = _this.dataStream['pose']['pose'];
                        str = str + ',' + JSON.stringify(_this.pose['position']);
                        _this.fields.push('pose.pose.position');
                        str = str + ',' + JSON.stringify(_this.pose['orientation']);
                        _this.fields.push('pose.pose.orientation');
                        break;
                    }
                    case 'twist': {
                        _this.twist = _this.dataStream['twist']['twist'];
                        str = str + ',' + JSON.stringify(_this.twist['linear']);
                        _this.fields.push('twist.twist.linear');
                        str = str + ',' + JSON.stringify(_this.twist['angular']);
                        _this.fields.push('twist.twist.angular');
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
    return odom;
}(Rosmsgs_1.RosMsgs));
exports.odom = odom;
/*
std_msgs/Header header
    uint32 seq
    time stamp
    string frame_id
string child_frame_id
geometry_msgs/PoseWithCovariance pose
    geometry_msgs/Pose pose
        Point position
            float64 x
            float64 y
            float64 z
        Quaternion orientation
            float64 x
            float64 y
            float64 z
            float64 w
    float64[36] covariance
geometry_msgs/TwistWithCovariance twist
    geometry_msgs/Twist twist
        geometry_msgs/Vector3 linear
            float64 x
            float64 y
            float64 z
        geometry_msgs/Vector3 angular
            float64 x
            float64 y
            float64 z
    float64[36] covariance


*/ 
