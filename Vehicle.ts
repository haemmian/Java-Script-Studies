export class Car {
    protected readonly _value: Number;
    protected readonly _capacity: Number;
    protected readonly _topSpeed: Number;


    constructor(value: Number, capacity: Number, topSpeed: Number) {
        this._value = value;
        this._capacity = capacity;
        this._topSpeed = topSpeed;
    }

}