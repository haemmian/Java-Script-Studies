'use strict';
import {Car, RaceCar} from "./Vehicle.js";

export class Warehouse {
    private readonly _capacity: number;
    private _parkingSlot: Car[] | RaceCar[] = [];

    constructor(capacity: number) {
        this._capacity = capacity;
    }

    /**
     * @brief gets the index of the lowest free parking spot
     * @return index
     */
    public lowestParkingIndex() : number {
        //@ts-ignore
        return this._parkingSlot.includes(null) ? this._parkingSlot.indexOf(null) -1 :
            this._parkingSlot.length - 1;
    }

    /**
     * @brief parks a car in the warehouse
     * @param car to park
     */
    public parkCar (car: Car | RaceCar) {

        // Check if there are any free parking slots
        // @ts-ignore
        this._parkingSlot.includes(null) ? this._parkingSlot.splice(
            // @ts-ignore
            this._parkingSlot.indexOf(null), 0, car) : this._parkingSlot.push(car);
        console.log("Car Parked!");
    }

    /**
     * @brief gets the parked car at index
     * @param index of the parked car
     * @return the car at specified index
     */
    public getCar (index: number) : Car | RaceCar | null{
        if (!this._parkingSlot.length) {
            console.log("No cars are in the warehouse");
            return null;
        }
        if (this._parkingSlot[index] == null) {
            console.log(`There is no Car at parking slot ${index}`);
            return null;
        }

        console.log(`Get car at parking slot ${index + 1}`);
        const tmpCar = this._parkingSlot[index];

        // By adding null to this index, the parking slots will not be shifted.
        // @ts-ignore
        this._parkingSlot[index] = null;
        return tmpCar;
    }

    /**
     * @brief copies the data of a Car at the given index
     * @param index of the parked car
     * @return the copy of a car at given index
     */
    public getData (index: number) : Car | RaceCar | null {
        return this._parkingSlot[index];
    }

    /**
     * @brief gets the number of cars in the warehouse
     * @return number of cars in the warehouse
     */
    public getCurrentAmountOfCars () :number{
        // @ts-ignore
        return this._parkingSlot.reduce((count: number, value: null | number) => count + (value === null ? 1 : 0), 0);
    }

    /**
     * @brief gets the warehouse's capacity
     * @return warehouse's capacity
     */
    public getCapacity () {
        return this._capacity;
    }

    /**
     * @brief get all cars
     * @return all cars
     */
    public getAllCars () {
        const tmpCarData = this._parkingSlot.filter(index => index !== null);
        this._parkingSlot = [];
        return  tmpCarData;
    }

    /**
     * @brief get all cars but sorted by registration number
     * @return all cars
     */
    public getAllCarsSorted () {
        return this.getAllCars().sort((a: any, b: any) => a.getRegistrationNumber() - b.getRegistrationNumber());
    }
}
