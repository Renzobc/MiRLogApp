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
var batteryCurrents = /** @class */ (function (_super) {
    __extends(batteryCurrents, _super);
    function batteryCurrents(type, directory) {
        var _this = _super.call(this, type, directory) || this;
        _this.battery1current = 0;
        _this.battery2current = 0;
        _this.messagetype = "mirMsgs/BatteryCurrents";
        return _this;
    }
    batteryCurrents.prototype.SelectData = function () {
        var _this = this;
        var str = '';
        Object.keys(this.filter_Msg['FieldsPublished']).forEach(function (field) {
            if (_this.filter_Msg['FieldsPublished'][field].checked === true) {
                switch (_this.filter_Msg['FieldsPublished'][field].name) {
                    case 'battery1_current': {
                        _this.battery1current = _this.dataStream['battery1_current'];
                        str = str + ',' + JSON.stringify(_this.battery1current);
                        _this.fields.push('battery1_current');
                        break;
                    }
                    case 'battery2_current': {
                        _this.battery2current = _this.dataStream['battery2_current'];
                        str = str + ',' + JSON.stringify(_this.battery2current);
                        _this.fields.push('battery2_current');
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
    return batteryCurrents;
}(Rosmsgs_1.RosMsgs));
exports.batteryCurrents = batteryCurrents;
