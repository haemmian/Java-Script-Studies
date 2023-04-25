"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warehouse = void 0;
var Warehouse = /** @class */ (function () {
    function Warehouse(capacity) {
        this._parkingSlot = [];
        this._capacity = capacity;
    }
    /**
     * @brief parks a car in the warehouse
     * @param car to park
     */
    // your method
    Warehouse.prototype.parkCar = function (car) {
        this._parkingSlot.push(car);
        console.log("Car Parked!");
    };
    /**
     * @brief gets the parked car at index
     * @param index of the parked car
     * @return the car at specified index
     */
    // your method
    Warehouse.prototype.getCar = function (index) {
        if (!this._parkingSlot.length) {
            console.log("No cars are in the warehouse");
            return undefined;
        }
        if (this._parkingSlot[index] == undefined) {
            console.log("There is no Car at parking slot ".concat(index));
            return undefined;
        }
        console.log("Get car at parking slot ".concat(index));
        var tmpCar = this._parkingSlot[index];
        // By adding undefined to this index, the parking slots will not be shifted.
        this._parkingSlot[index] = undefined;
        return tmpCar;
    };
    /**
     * @brief gets the number of cars in the warehouse
     * @return number of cars in the warehouse
     */
    // your method
    Warehouse.prototype.currentAmountOfCars = function () {
        return this._parkingSlot.filter(function (index) { return index !== undefined; }).length;
    };
    /**
     * @brief gets the warehouse's capacity
     * @return warehouse's capacity
     */
    // your method
    Warehouse.prototype.capacity = function () {
        return this._capacity;
    };
    return Warehouse;
}());
exports.Warehouse = Warehouse;
