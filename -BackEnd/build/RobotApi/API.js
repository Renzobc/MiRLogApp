"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
http.globalAgent.maxSockets = 20;
var API = /** @class */ (function () {
    function API(req) {
        //console.log(req.body);
        this.req = req;
    }
    API.prototype.APIRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var str, fields;
            var _this = this;
            return __generator(this, function (_a) {
                str = '';
                fields = {
                    host: this.req.body.ip,
                    port: 8080,
                    timeout: 3000,
                    //body:JSON.stringify((<any>this.req.body).body),
                    path: this.req.body.end_point,
                    method: this.req.body.method,
                    headers: {
                        "Accept": "application/json",
                        "Accept-language": "en_US",
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Content-Length": Buffer.byteLength(JSON.stringify(this.req.body.body)),
                        "Authorization": "Basic c2VydmljZTplOTkzZGNkNzY1ZTMyNDBkYmUwZmIzODY0ZjBlZmRlZDIzMDM4ODQ4OWUxMjkxZTkwZmE2MmE4NzVjZGQ4ODg4"
                    }
                };
                //console.log(JSON.stringify((<any>this.req.body).body));
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var request = http.request(fields, function (response) {
                            //another chunk of data has been recieved, so append it to `str`
                            response.on('data', function (chunk) {
                                str += chunk;
                            });
                            //the whole response has been recieved, so we just print it out here
                            response.on('end', function () {
                                if (str != '') {
                                    //console.log(str);
                                    resolve(JSON.parse(JSON.stringify(str)));
                                }
                                {
                                    resolve(JSON.parse('{"completed":"ok"}'));
                                }
                            });
                        });
                        request.write(JSON.stringify(_this.req.body.body));
                        request.on('timeout', function (err) {
                            console.log(err);
                            reject(err);
                            request.abort();
                        });
                        request.on('error', function (err) { console.log('Error with the Request to Robot API ', err); reject(err); });
                        request.end;
                    })];
            });
        });
    };
    return API;
}());
exports.API = API;
