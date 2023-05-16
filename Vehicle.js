'use strict';
export class Car {
    constructor(value, capacity, power, Id, color) {
        this._value = value;
        this._capacity = capacity;
        this._power = power;
        this._Id = Id;
        this._color = color;
    }
    toString() {
        return `\nvalue: ${this._value}$\t` +
            `capacity: ${this._capacity}\t` +
            `power: ${this._power}PS\t` +
            `Id: ${this._Id}\t` +
            `color: ${this._color}`;
    }
    getValue() {
        return this._value;
    }
    getCapacity() {
        return this._capacity;
    }
    getPower() {
        return this._power;
    }
    getRegistrationNumber() {
        return this._Id;
    }
    getColor() {
        return this._color;
    }
}
export class RaceCar extends Car {
    constructor(value, capacity, power, Id, color, topSpeed) {
        super(value, capacity, power, Id, color);
        this._topSpeed = topSpeed;
    }
    getTopspeed() {
        return this._topSpeed;
    }
    toString() {
        return `\nvalue: ${this._value}$\t` +
            `capacity: ${this._capacity}\t` +
            `power: ${this._power}PS\t` +
            `Id: ${this._Id}\t` +
            `color: ${this._color}\t` +
            `topspeed: ${this._topSpeed}km/h`;
    }
}
