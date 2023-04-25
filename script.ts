import { Warehouse } from "./Warehouse";
import { Car, RaceCar } from "./Vehicle"

const car1: Car = new Car(1000, 4, 120, 13412, "black");
const car2: Car = new Car(500, 3, 90, 4333, "red");
const car3: Car = new Car(2220, 2, 400, 1113, "blue");
const raceCar: RaceCar = new RaceCar(10000, 2, 400, 9992, "white", 500);
const warehouse: Warehouse = new Warehouse(20);

warehouse.parkCar(car1);
warehouse.parkCar(car2);
warehouse.parkCar(car3);
warehouse.parkCar(raceCar)

// console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);
// const car4 = warehouse.getCar(1);
// console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);
//
// console.log(`Capacity: ${warehouse.capacity()} `)

console.log(`List of all returned car: ${warehouse.getAllCarsSorted()}`)