import { Warehouse } from "./Warehouse.js";
import { Car, RaceCar } from "./Vehicle.js";
const warehouse = new Warehouse(Number(prompt("Capacity of this Warehouse: ")));
//UI Version of this Project
const parkhouse = document.querySelector(".parking-house");
const normalCarBtn = document.querySelector(".normal-car-btn");
const raceCarBtn = document.querySelector(".race-car-btn");
const submitBtn = document.getElementById("submit-btn");
const topspeedArea = document.getElementById("topspeed-field");
const form = document.querySelector('form');
const inputs = form === null || form === void 0 ? void 0 : form.querySelectorAll('input');
function parkCar(vehicleColor, index) {
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];
    const vehicle = document.createElement("div");
    vehicle.classList.add("vehicle");
    vehicle.style.backgroundColor = vehicleColor;
    parkingSlot.appendChild(vehicle);
}
function emptyInputs() {
    inputs === null || inputs === void 0 ? void 0 : inputs.forEach(input => {
        input.value = " ";
    });
}
for (let i = 1; i < warehouse.capacity() + 1; i++) {
    const parkingSlot = document.createElement('div');
    parkingSlot.classList.add('parking-slot');
    const number = document.createElement('div');
    number.classList.add('number');
    number.textContent = String(i);
    parkingSlot.appendChild(number);
    parkhouse.appendChild(parkingSlot);
}
normalCarBtn === null || normalCarBtn === void 0 ? void 0 : normalCarBtn.addEventListener("click", function () {
    normalCarBtn.style.backgroundColor = "salmon";
    raceCarBtn.style.backgroundColor = "white";
    topspeedArea.style.display = "none";
});
raceCarBtn === null || raceCarBtn === void 0 ? void 0 : raceCarBtn.addEventListener("click", function () {
    raceCarBtn.style.backgroundColor = "salmon";
    normalCarBtn.style.backgroundColor = "white";
    topspeedArea.style.display = "block";
});
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", function () {
    const value = Number(document.getElementById("value").value);
    const capacity = Number(document.getElementById("capacity").value);
    const power = Number(document.getElementById("power").value);
    const id = Number(document.getElementById("Id").value);
    const color = document.getElementById("color").value;
    if (value && capacity && power && id && color != null) {
        // code to be executed if all variables have a value
        if (normalCarBtn.style.backgroundColor === "salmon") { //Normal Car
            warehouse.parkCar(new Car(value, capacity, power, id, color));
            parkCar(color, warehouse.currentAmountOfCars() - 1);
            emptyInputs();
        }
        else if (raceCarBtn.style.backgroundColor === "salmon") { //Race Car
            const topspeed = Number(document.getElementById("topspeed").value);
            if (topspeed != 0) {
                warehouse.parkCar(new RaceCar(value, capacity, power, id, color, topspeed));
                parkCar(color, warehouse.currentAmountOfCars() - 1);
                emptyInputs();
            }
            else {
                console.error("Missing Data!");
            }
        }
        else {
            console.warn("Nothing chosen");
        }
    }
    else {
        console.error("Missing Data!");
    }
});
parkCar("blue", 10);
//
// // console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);
// // const car4 = warehouse.getCar(1);
// // console.log(`current amount of cars: ${warehouse.currentAmountOfCars()}`);
// //
// // console.log(`Capacity: ${warehouse.capacity()} `)
//
//
//
// //** TASK 7 **
// //In the main file, mock the warehouse usage by adding three cars:
// const BMW: Car = new Car(50000, 5, 200, 445445, "black");
// const Audi: Car = new Car(45000, 5, 180, 987654, "turquoise");
// const Ferrari: RaceCar = new RaceCar(200000, 2, 400, 111777, "red", 300);
//
// warehouse.parkCar(BMW);
// warehouse.parkCar(Audi);
// warehouse.parkCar(Ferrari);
//
// /**
//  * After storing those three cars, retrieve them again by calling the method, that returns the cars
//  * sorted by registration number. To verify the order, log the cars to the console.
//  */
// console.log(`List of all returned car (sorted): ${warehouse.getAllCarsSorted()}`)
//
// /**
//  * Then, retrieve the car "Audi" from the warehouse, by calling the method, that returns the car at a given index.
//  * To verify that you really retrieved the Audi, log its properties to the console.
//  */
//
// warehouse.parkCar(BMW);
// warehouse.parkCar(Audi);
// warehouse.parkCar(Ferrari);
//
// console.log(`Retrieved Audi: ${warehouse.getCar(1)}`)
