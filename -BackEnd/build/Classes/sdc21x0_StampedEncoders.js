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
var encoders = /** @class */ (function (_super) {
    __extends(encoders, _super);
    function encoders(type) {
        var _this = _super.call(this, type) || this;
        _this.messagetype = "sdc21x0/StampedEncoders";
        return _this;
    }
    encoders.prototype.SelectData = function () { };
    encoders.prototype.Data_log = function () {
        this.SelectData();
        return '';
    };
    encoders.prototype.logTopic = function (directory) {
        fs.appendFile(path.join(directory, this.time.toDateString() + ',' + this.topic + '.txt'), this.Data_log(), function (err) { });
        fs.close;
    };
    return encoders;
}(Rosmsgs_1.RosMsgs));
exports.encoders = encoders;
