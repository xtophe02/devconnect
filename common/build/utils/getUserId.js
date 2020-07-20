"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.getUserId = function (req) {
    try {
        if (req.headers.token) {
            var payload = jsonwebtoken_1.default.verify(req.headers.token.split("=")[1], process.env.JWT_KEY);
            return __assign({}, payload);
        }
    }
    catch (error) {
        console.log(error);
    }
    return null;
};
