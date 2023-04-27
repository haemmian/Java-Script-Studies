import { Warehouse } from "./Warehouse";
import { Car, RaceCar } from "./Vehicle"


const warehouse: Warehouse = new Warehouse(Number(prompt("Capacity of this Warehouse: ")));


//UI Version of this Project
const parkhouse: Element | null = document.querySelector(".parking-house");
const normalCarBtn: Element | null = document.querySelector(".normal-car-btn");
const raceCarBtn: Element | null = document.querySelector(".race-car-btn");
const submitBtn: Element | null = document.getElementById("submit-btn");
const topspeedArea: Element | null = document.getElementById("topspeed-field");

const form = document.querySelector('form');
const inputs = form?.querySelectorAll('input');


function parkCar (vehicleColor: string, index: number) {
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];

    const vehicle =document.createElement("div");
    vehicle.classList.add("vehicle");
    vehicle.style.backgroundColor = vehicleColor;

    (<HTMLInputElement>parkingSlot).appendChild(vehicle);
}
function emptyInputs () {
    inputs?.forEach(input => {
        input.value = " ";
    });
}

for (let i = 1; i < warehouse.capacity() + 1; i++) {

    const parkingSlot = document.createElement('div');
    parkingSlot.classList.add('parking-slot');
    const number = document.createElement('div');
    number.classList.add('number');

    (<HTMLInputElement>number).textContent = String(i);
    (<HTMLInputElement>parkingSlot).appendChild(number);
    (<HTMLInputElement>parkhouse).appendChild(parkingSlot);
}

normalCarBtn?.addEventListener("click", function () {
    (<HTMLInputElement>normalCarBtn).style.backgroundColor = "salmon";
    (<HTMLInputElement>raceCarBtn).style.backgroundColor = "white";
    (<HTMLInputElement>topspeedArea).style.display = "none";
});

raceCarBtn?.addEventListener("click", function () {
    (<HTMLInputElement>raceCarBtn).style.backgroundColor = "salmon";
    (<HTMLInputElement>normalCarBtn).style.backgroundColor = "white";
    (<HTMLInputElement>topspeedArea).style.display = "block";
});

submitBtn?.addEventListener("click", function () {
    const value: number = Number((<HTMLInputElement>document.getElementById("value")).value);
    const capacity: number = Number((<HTMLInputElement>document.getElementById("capacity")).value);
    const power: number = Number((<HTMLInputElement>document.getElementById("power")).value);
    const id: number = Number((<HTMLInputElement>document.getElementById("Id")).value);
    const color: string = (<HTMLInputElement>document.getElementById("color")).value;

    if (value && capacity && power && id && color != null) {
        // code to be executed if all variables have a value

        if ((<HTMLInputElement>normalCarBtn).style.backgroundColor === "salmon") {    //Normal Car
            warehouse.parkCar(new Car(value, capacity, power, id, color));
            parkCar(color, warehouse.currentAmountOfCars()-1);
            emptyInputs();


        } else if ((<HTMLInputElement>raceCarBtn).style.backgroundColor === "salmon") {      //Race Car
            const topspeed: number = Number((<HTMLInputElement>document.getElementById("topspeed")).value);
            if (topspeed != 0) {
                warehouse.parkCar(new RaceCar(value, capacity, power, id, color, topspeed));
                parkCar(color, warehouse.currentAmountOfCars()-1);
                emptyInputs();
            } else {
                console.error("Missing Data!");
            }

        } else {
            console.warn("Nothing chosen");
        }
    }
    else {
        console.error("Missing Data!");
    }
});

parkCar("blue", 10)

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
