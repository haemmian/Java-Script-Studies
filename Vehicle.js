"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceCar = exports.Car = void 0;
var Car = /** @class */ (function () {
    function Car(value, capacity, power, Id, color) {
        this._value = value;
        this._capacity = capacity;
        this._power = power;
        this._Id = Id;
        this._color = color;
    }
    Car.prototype.toString = function () {
        return "\nvalue: ".concat(this._value, "$\t") +
            "capacity: ".concat(this._capacity, "\t") +
            "power: ".concat(this._power, "PS\t") +
            "Id: ".concat(this._Id, "\t") +
            "color: ".concat(this._color);
    };
    Car.prototype.vehicleRegistrationNumber = function () {
        return this._Id;
    };
    return Car;
}());
exports.Car = Car;
var RaceCar = /** @class */ (function (_super) {
    __extends(RaceCar, _super);
    function RaceCar(value, capacity, power, Id, color, topSpeed) {
        var _this = _super.call(this, value, capacity, power, Id, color) || this;
        _this._topSpeed = topSpeed;
        return _this;
    }
    RaceCar.prototype.toString = function () {
        return "\nvalue: ".concat(this._value, "$\t") +
            "capacity: ".concat(this._capacity, "\t") +
            "power: ".concat(this._power, "PS\t") +
            "Id: ".concat(this._Id, "\t") +
            "color: ".concat(this._color, "\t") +
            "topspeed: ".concat(this._topSpeed, "km/h");
    };
    return RaceCar;
}(Car));
exports.RaceCar = RaceCar;
