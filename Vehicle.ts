export class Car {
    protected readonly _value: number;
    protected readonly _capacity: number;
    protected readonly _power: number;
    protected readonly _Id: string;
    protected readonly _color: string;


    constructor(value: number, capacity: number, power: number, Id: string, color: string) {
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

    public getValue () : number {
        return this._value;
    }
    public getCapacity () : number {
        return this._capacity;
    }
    public getPower () : number {
        return this._power;
    }
    public getRegistrationNumber () : string {
        return this._Id;
    }
    public getColor () : string {
        return this._color;
    }
}

export class RaceCar extends Car {
    private readonly _topSpeed;

    constructor(value: number, capacity: number, power: number, Id: string, color: string, topSpeed: number) {
     super(value, capacity, power, Id, color);
     this._topSpeed = topSpeed
 }

 public getTopspeed () : number {
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
