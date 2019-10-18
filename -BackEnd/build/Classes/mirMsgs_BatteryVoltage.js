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
var batteryVoltage = /** @class */ (function (_super) {
    __extends(batteryVoltage, _super);
    function batteryVoltage(type, directory) {
        var _this = _super.call(this, type, directory) || this;
        _this.data = 0;
        _this.messagetype = "std_msgs/Float64";
        return _this;
    }
    batteryVoltage.prototype.SelectData = function () {
        var _this = this;
        var str = '';
        Object.keys(this.filter_Msg['FieldsPublished']).forEach(function (field) {
            if (_this.filter_Msg['FieldsPublished'][field].checked === true) {
                switch (_this.filter_Msg['FieldsPublished'][field].name) {
                    case 'data': {
                        _this.data = _this.dataStream['data'];
                        str = str + ',' + JSON.stringify(_this.data);
                        _this.fields.push('Voltage');
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
    return batteryVoltage;
}(Rosmsgs_1.RosMsgs));
exports.batteryVoltage = batteryVoltage;
