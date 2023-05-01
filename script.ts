import { Warehouse } from "./Warehouse";
import { Car, RaceCar } from "./Vehicle"

const warehouse: Warehouse = new Warehouse(Number(prompt("Capacity of this Warehouse: ")));

//UI Version of this Project
const parkhouse: Element | null = document.querySelector(".parking-house");
const normalCarBtn: Element | null = document.querySelector(".normal-car-btn");
const raceCarBtn: Element | null = document.querySelector(".race-car-btn");
const submitBtn: Element | null = document.getElementById("submit-btn");
const getCarBtn: Element | null = document.getElementById("index-btn");
const topspeedArea: Element | null = document.getElementById("topspeed-field");

function parkCar (vehicleColor: string, index: number) {
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];

    const vehicle =document.createElement("div");
    vehicle.classList.add("vehicle");
    vehicle.style.backgroundColor = vehicleColor;

    (<HTMLInputElement>parkingSlot).appendChild(vehicle);
}
function getCar (index: number) {
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];
    (<HTMLInputElement>parkingSlot).querySelector(".vehicle")?.remove();
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
        // code-block executed if all variables have a value

        if ((<HTMLInputElement>normalCarBtn).style.backgroundColor === "salmon") {    //Normal Car
            warehouse.parkCar(new Car(value, capacity, power, id, color));
            parkCar(color, warehouse.currentAmountOfCars()-1);
            document.querySelector("form")?.reset();

        } else if ((<HTMLInputElement>raceCarBtn).style.backgroundColor === "salmon") {      //Race Car
            const topspeed: number = Number((<HTMLInputElement>document.getElementById("topspeed")).value);
            if (topspeed != 0) {
                warehouse.parkCar(new RaceCar(value, capacity, power, id, color, topspeed));
                parkCar(color, warehouse.currentAmountOfCars()-1);
                document.querySelector("form")?.reset();
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

//get Car
getCarBtn?.addEventListener("click", function () {
    const index: number = Number((<HTMLInputElement>document.getElementById("index")).value) < 0 ? 0 :
        Number((<HTMLInputElement>document.getElementById("index")).value) - 1;

    const receivedVehicle: Car | RaceCar  | undefined = warehouse.getCar(index);
    getCar(index);

    (<HTMLInputElement>document.querySelector(".vehicle-value")).textContent = String(receivedVehicle?.getValue());
    (<HTMLInputElement>document.querySelector(".vehicle-capacity")).textContent = String(receivedVehicle?.getCapacity());
    (<HTMLInputElement>document.querySelector(".vehicle-power")).textContent = String(receivedVehicle?.getPower());
    (<HTMLInputElement>document.querySelector(".vehicle-id")).textContent = String(receivedVehicle?.getRegistrationNumber());
    (<HTMLInputElement>document.querySelector(".vehicle-color")).textContent = String(receivedVehicle?.getColor());

    if(receivedVehicle instanceof  RaceCar) {
        (<HTMLInputElement>document.querySelector(".vehicle-topspeed")).style.display = "block";
        (<HTMLInputElement>document.querySelector(".vehicle-topspeed")).value = String(receivedVehicle?.getTopspeed());
    }
    else{
        (<HTMLInputElement>document.querySelector(".vehicle-topspeed")).style.display = "none";
    }

});