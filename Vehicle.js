'use strict';
export class Car {
    constructor(carData) {
        // value: number, capacity: number, power: number, Id: string, color: string
        this._value = carData.value;
        this._capacity = carData.capacity;
        this._power = carData.power;
        this._Id = carData.id;
        this._color = carData.color;
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
    constructor(raceCar) {
        super(raceCar);
        this._topSpeed = raceCar.topSpeed;
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
