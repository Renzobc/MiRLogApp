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
var cv = require('opencv4nodejs');
var image = /** @class */ (function (_super) {
    __extends(image, _super);
    function image(type, directory) {
        var _this = _super.call(this, type, directory) || this;
        _this.messagetype = "sensor_msgs/CompressedImage";
        _this.format = '';
        _this.data = [];
        return _this;
    }
    image.prototype.SelectData = function () {
        var _this = this;
        var str = '';
        Object.keys(this.filter_Msg['FieldsPublished']).forEach(function (field) {
            if (_this.filter_Msg['FieldsPublished'][field].checked === true) {
                switch (_this.filter_Msg['FieldsPublished'][field].name) {
                    case 'format': {
                        _this.format = _this.dataStream['format'];
                        str = str + ',' + JSON.stringify(_this.format);
                        _this.fields.push('format');
                        break;
                    }
                    case 'data': {
                        _this.data = _this.dataStream['data'];
                        str = str + ',' + JSON.stringify(_this.CropImage());
                        _this.fields.push('data');
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
    image.prototype.CropImage = function () {
        var img = Buffer.from(this.dataStream['data'], 'base64');
        var frame = cv.imdecode(img);
        var croppedImg = frame.crop(this.calibration['rx'], this.calibration['ry'], this.calibration['width'], this.calibration['height']);
        return cv.imencode('.jpg', img).toString('base64');
        //return Buffer.from(croppedImg, 'base64').toString();
    };
    return image;
}(Rosmsgs_1.RosMsgs));
exports.image = image;
