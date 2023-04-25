"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Warehouse_1 = require("./Warehouse");
var Vehicle_1 = require("./Vehicle");
var car1 = new Vehicle_1.Car(1000, 4, 120, 13412, "black");
var car2 = new Vehicle_1.Car(500, 3, 90, 4333, "red");
var car3 = new Vehicle_1.Car(2220, 2, 400, 1113, "blue");
var raceCar = new Vehicle_1.RaceCar(10000, 2, 400, 9992, "white", 500);
var warehouse = new Warehouse_1.Warehouse(20);
warehouse.parkCar(car1);
warehouse.parkCar(car2);
warehouse.parkCar(car3);
warehouse.parkCar(raceCar);
// console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);
// const car4 = warehouse.getCar(1);
// console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);
//
// console.log(`Capacity: ${warehouse.capacity()} `)
console.log("List of all returned car: ".concat(warehouse.getAllCarsSorted()));
