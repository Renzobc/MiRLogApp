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
var MotorCurrents = /** @class */ (function (_super) {
    __extends(MotorCurrents, _super);
    function MotorCurrents(type, directory) {
        var _this = _super.call(this, type, directory) || this;
        _this.left_motor = 0;
        _this.right_motor = 0;
        _this.messagetype = "sdc21x0/MotorCurrents";
        _this.fields = [];
        return _this;
    }
    MotorCurrents.prototype.SelectData = function () {
        var _this = this;
        var str = '';
        Object.keys(this.filter_Msg['FieldsPublished']).forEach(function (field) {
            if (_this.filter_Msg['FieldsPublished'][field].checked === true) {
                switch (_this.filter_Msg['FieldsPublished'][field].name) {
                    case 'left_motor': {
                        _this.left_motor = _this.dataStream['left_motor'];
                        str = str + ',' + JSON.stringify(_this.left_motor);
                        _this.fields.push('left_motor');
                        break;
                    }
                    case 'right_motor': {
                        _this.right_motor = _this.dataStream['right_motor'];
                        str = str + ',' + JSON.stringify(_this.right_motor);
                        _this.fields.push('right_motor');
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
    return MotorCurrents;
}(Rosmsgs_1.RosMsgs));
exports.MotorCurrents = MotorCurrents;
