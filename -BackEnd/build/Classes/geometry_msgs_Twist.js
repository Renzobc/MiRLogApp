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
var AsyncParser = require('json2csv').AsyncParser;
var parseAsync = require('json2csv').parseAsync;
var twist = /** @class */ (function (_super) {
    __extends(twist, _super);
    function twist(type, directory) {
        var _this = _super.call(this, type, directory) || this;
        _this.linear = JSON.parse(JSON.stringify(''));
        _this.angular = JSON.parse(JSON.stringify(''));
        _this.messagetype = "geometry_msgs/Twist";
        return _this;
    }
    twist.prototype.SelectData = function () {
        var _this = this;
        var str = '';
        Object.keys(this.filter_Msg['FieldsPublished']).forEach(function (field) {
            if (_this.filter_Msg['FieldsPublished'][field].checked === true) {
                switch (_this.filter_Msg['FieldsPublished'][field].name) {
                    case 'linear': {
                        _this.linear = _this.dataStream['linear'];
                        str = str + ',' + JSON.stringify(_this.linear);
                        _this.fields.push('linear');
                        break;
                    }
                    case 'angular': {
                        _this.angular = _this.dataStream['angular'];
                        str = str + ',' + JSON.stringify(_this.angular);
                        _this.fields.push('angular');
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
    return twist;
}(Rosmsgs_1.RosMsgs));
exports.twist = twist;
/*
geometry_msgs/Vector3 linear
geometry_msgs/Vector3 angular

float64 x
float64 y
float64 z


linear:
  x: 0.701298697656
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 0.0311688310069


*/ 
