import { Warehouse } from "./Warehouse";
import { Car, RaceCar } from "./Vehicle"


const warehouse: Warehouse = new Warehouse(20);



// console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);
// const car4 = warehouse.getCar(1);
// console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);
//
// console.log(`Capacity: ${warehouse.capacity()} `)



//** TASK 7 **
//In the main file, mock the warehouse usage by adding three cars:
const BMW: Car = new Car(50000, 5, 200, 445445, "black");
const Audi: Car = new Car(45000, 5, 180, 987654, "turquoise");
const Ferrari: RaceCar = new RaceCar(200000, 2, 400, 111777, "red", 300);

warehouse.parkCar(BMW);
warehouse.parkCar(Audi);
warehouse.parkCar(Ferrari);

/**
 * After storing those three cars, retrieve them again by calling the method, that returns the cars
 * sorted by registration number. To verify the order, log the cars to the console.
 */
console.log(`List of all returned car (sorted): ${warehouse.getAllCarsSorted()}`)

/**
 * Then, retrieve the car "Audi" from the warehouse, by calling the method, that returns the car at a given index.
 * To verify that you really retrieved the Audi, log its properties to the console.
 */

warehouse.parkCar(BMW);
warehouse.parkCar(Audi);
warehouse.parkCar(Ferrari);

console.log(`Retrieved Audi: ${warehouse.getCar(1)}`)