'use strict';

export class Car {
    protected readonly _value: number;
    protected readonly _capacity: number;
    protected readonly _power: number;
    protected readonly _Id: string;
    protected readonly _color: string;


    constructor(carData: {
        value: number,
        capacity: number,
        power: number,
        id: string,
        color: string,
    }) {
        // value: number, capacity: number, power: number, Id: string, color: string
        this._value = carData.value;
        this._capacity = carData.capacity;
        this._power = carData.power;
        this._Id = carData.id;
        this._color = carData.color;
    }


    public toString(): string {
        return `\nvalue: ${this._value}$\t` +
            `capacity: ${this._capacity}\t` +
            `power: ${this._power}PS\t` +
            `Id: ${this._Id}\t` +
            `color: ${this._color}`;
    }

    public getValue(): number {
        return this._value;
    }

    public getCapacity(): number {
        return this._capacity;
    }

    public getPower(): number {
        return this._power;
    }

    public getRegistrationNumber(): string {
        return this._Id;
    }

    public getColor(): string {
        return this._color;
    }
}

export class RaceCar extends Car {
    private readonly _topSpeed;


    constructor(raceCar: {
        value: number,
        capacity: number,
        power: number,
        id: string,
        color: string,
        topSpeed: number
    }) {
        super(raceCar)
        this._topSpeed = raceCar.topSpeed;
    }


    public getTopspeed(): number {
        return this._topSpeed;
    }

    public toString(): string {
        return `\nvalue: ${this._value}$\t` +
            `capacity: ${this._capacity}\t` +
            `power: ${this._power}PS\t` +
            `Id: ${this._Id}\t` +
            `color: ${this._color}\t` +
            `topspeed: ${this._topSpeed}km/h`;
    }
}
