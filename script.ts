import { Warehouse } from "./Warehouse";
import { Car } from "./Vehicle"

const car1: Car = new Car(1000, 4, 120);
const car2: Car = new Car(500, 3, 90);
const car3: Car = new Car(2220, 2, 400);

const warehouse: Warehouse = new Warehouse(20);

warehouse.parkCar(car1);
warehouse.parkCar(car2);
warehouse.parkCar(car3);

console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);
const car4 = warehouse.getCar(1);
console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);

console.log(`Capacity: ${warehouse.capacity()} `)
console.log(car2,  car3);