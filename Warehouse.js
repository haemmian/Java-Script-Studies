export class Warehouse {
    constructor(capacity) {
        this._parkingSlot = [];
        this._capacity = capacity;
    }
    /**
     * @brief gets the lowest free parking spot
     * @return index
     */
    lowestParkingIndex() {
        //@ts-ignore
        return this._parkingSlot.includes(undefined) ? this._parkingSlot.indexOf(undefined) :
            this._parkingSlot.length;
    }
    /**
     * @brief parks a car in the warehouse
     * @param car to park
     */
    // your method
    parkCar(car) {
        // Check if there are any free parking slots
        // @ts-ignore
        this._parkingSlot.includes(undefined) ? this._parkingSlot.splice(
        // @ts-ignore
        this._parkingSlot.indexOf(undefined), 0, car) : this._parkingSlot.push(car);
        console.log("Car Parked!");
    }
    /**
     * @brief gets the parked car at index
     * @param index of the parked car
     * @return the car at specified index
     */
    // your method
    getCar(index) {
        if (!this._parkingSlot.length) {
            console.log("No cars are in the warehouse");
            return undefined;
        }
        if (this._parkingSlot[index] == undefined) {
            console.log(`There is no Car at parking slot ${index}`);
            return undefined;
        }
        console.log(`Get car at parking slot ${index + 1}`);
        const tmpCar = this._parkingSlot[index];
        // By adding undefined to this index, the parking slots will not be shifted.
        // @ts-ignore
        this._parkingSlot[index] = undefined;
        return tmpCar;
    }
    /**
     * @brief gets the number of cars in the warehouse
     * @return number of cars in the warehouse
     */
    // your method
    currentAmountOfCars() {
        return this._parkingSlot.filter(index => index !== undefined).length;
    }
    /**
     * @brief gets the warehouse's capacity
     * @return warehouse's capacity
     */
    // your method
    capacity() {
        return this._capacity;
    }
    /**
     * @brief get all cars
     * @return all cars
     */
    // your method
    getAllCars() {
        const tmpCarData = this._parkingSlot.filter(index => index !== undefined);
        this._parkingSlot = [];
        return tmpCarData;
    }
    /**
     * @brief get all cars but sorted by registration number
     * @return all cars
     */
    // your method
    getAllCarsSorted() {
        const tmpCarData = this._parkingSlot.filter(index => index !== undefined);
        this._parkingSlot = [];
        return tmpCarData.sort((a, b) => a.getRegistrationNumber() - b.getRegistrationNumber());
    }
}
