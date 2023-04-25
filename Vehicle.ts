export class Car {
    protected readonly _value: number;
    protected readonly _capacity: number;
    protected readonly _power: number;
    protected readonly _Id: number;
    protected readonly _color: string;


    constructor(value: number, capacity: number, power: number, Id: number, color: string) {
        this._value = value;
        this._capacity = capacity;
        this._power = power;
        this._Id = Id;
        this._color = color;
    }

    public toString(): string {
        return `\nvalue: ${this._value}$\t` +
            `capacity: ${this._capacity}\t` +
            `power: ${this._power}PS\t` +
            `Id: ${this._Id}\t` +
            `color: ${this._color}`;
    }

    public vehicleRegistrationNumber () {
        return this._Id;
    }

}

export class RaceCar extends Car {
    private readonly _topSpeed;
 constructor(value: number, capacity: number, power: number, Id: number, color: string, topSpeed: number) {
     super(value, capacity, power, Id, color);
     this._topSpeed = topSpeed
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
