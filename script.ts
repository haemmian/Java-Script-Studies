'use strict';
import {Warehouse} from "./Warehouse.js";
import {Car, RaceCar} from "./Vehicle.js"

let capacity: any;

if (storageCheck()) {
// in case a non-number value is typed in.
    while (1) {
        capacity = prompt("Capacity of this Warehouse: ");
        // @ts-ignore
        if (/^$|[^0-9]/.test(capacity)) {// a Regex checker for non-Numeric Characters and empty strings
            alert("non-numeric value detected, please try again");
        } else {
            capacity = Number(capacity) > 550000 ? 550000 : Number(capacity);
            localStorage.setItem("capacity", capacity);
            break;
        }
    }
}
const warehouse: Warehouse = new Warehouse(capacity);

//UI Version of this Project
const parkingSlotGroup: Element | null = document.querySelector(".parking-house");
const carType: Element | null = document.querySelector(".checker");
const parkhouse: Element | null = document.querySelector(".parking-house");
const submitBtn: Element | null = document.getElementById("submit-btn");
const getCarBtn: Element | null = document.getElementById("index-btn");
const topspeedArea: Element | null = document.getElementById("topspeed-field");
const resetBtn: Element | null = document.getElementById("reset Button");

// Creates the parking slots
for (let i = 1; i < warehouse.getCapacity() + 1; i++) {

    const parkingSlot = document.createElement('div');
    parkingSlot.classList.add('parking-slot');
    const number = document.createElement('div');
    number.classList.add('number');

    (<HTMLInputElement>number).textContent = String(i);   //The Parking slot starts with 1
    (<HTMLInputElement>parkingSlot).appendChild(number);
    (<HTMLInputElement>parkhouse).appendChild(parkingSlot);

    if (localStorage.getItem(`parkingSlot N.${i}`)) {
        // @ts-ignore
        const tmpCar = JSON.parse(localStorage.getItem(`parkingSlot N.${i}`));
        parkCar(tmpCar["color"], i - 1);
        warehouse.parkCar(tmpCar["topSpeed"] === undefined ? new Car(tmpCar) : new RaceCar(tmpCar), i - 1);
    }
}

/**
 * @brief Adds a vehicle to the UI-side. Color and index are required.
 * @param vehicleColor
 * @param index
 */
function parkCar(vehicleColor: string, index: number) {
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];

    const vehicle = document.createElement("button");
    vehicle.classList.add("vehicle");
    vehicle.setAttribute("data-index", index.toString());
    vehicle.style.backgroundColor = vehicleColor;

    (<HTMLInputElement>parkingSlot).appendChild(vehicle);
}

/**
 * @brief Removes a vehicle from the UI-side. Parking-slot-index is required.
 * @param index
 */
function getCarfromWarehouse(index: number) {
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];
    (<HTMLInputElement>parkingSlot).querySelector(".vehicle")?.remove();
}

/**
 * @brief Show vehicle-data on the Data side
 * @param vehicle
 */
function showVehicle(vehicle: Car | RaceCar | null) {

    if (vehicle === null) {
        console.warn(`No Car at at this parking-slot}`);
        return;
    }

    (<HTMLInputElement>document.querySelector(".vehicle-value")).textContent = String(vehicle?.getValue());
    (<HTMLInputElement>document.querySelector(".vehicle-capacity")).textContent = String(vehicle?.getCapacity());
    (<HTMLInputElement>document.querySelector(".vehicle-power")).textContent = String(vehicle?.getPower());
    (<HTMLInputElement>document.querySelector(".vehicle-id")).textContent = String(vehicle?.getRegistrationNumber());
    (<HTMLInputElement>document.querySelector(".vehicle-color")).textContent = String(vehicle?.getColor());

    if (vehicle instanceof RaceCar) {
        (<HTMLInputElement>document.querySelector("#hide-Top-Speed")).style.display = "block";
        (<HTMLInputElement>document.querySelector(".vehicle-topspeed")).textContent = String(vehicle?.getTopspeed());
    } else {
        (<HTMLInputElement>document.querySelector("#hide-Top-Speed")).style.display = "none";
    }
}

/**
 * @brief check whether the "user" data is stored in the web Storage and returns "true" if it is stored
 */
function storageCheck(): boolean {
    if (localStorage.getItem("capacity")) {
        // @ts-ignore
        capacity = parseInt(localStorage.getItem("capacity"), 10);
        return false;
    }
    return true;
}

/**
 * @brief creates a Vehicle object and passes it to the localStorage
 * @params parkingSlot, value, capacity, power, id, color, topSpeed
 */
function storeVehicleOnLocalBrowser(vehicleData:
    {
        value: number,
        capacity: number,
        power: number,
        id: string,
        color: string
    }) {

    localStorage.setItem(`parkingSlot N.${warehouse.lowestParkingIndex() + 1}`, JSON.stringify(vehicleData));
}

// Change car type
carType?.addEventListener("change", function (event) {
    const isRaceCar: boolean = (<HTMLInputElement>event.target).checked;

    // isRaceCar = true -> Race Care, false -> Normal Car
    if (isRaceCar) {
        (<HTMLInputElement>topspeedArea).style.display = "block";
    } else {
        (<HTMLInputElement>topspeedArea).style.display = "none";
    }
});

// Get Car information
parkingSlotGroup?.addEventListener("click", function (event) {

    // @ts-ignore
    const parkingSlotIndex = parseInt((<HTMLInputElement>event.target).getAttribute("data-index"));
    if (!isNaN(parkingSlotIndex)) {
        showVehicle(warehouse.getData(parkingSlotIndex));
    }
});

// Park Car
submitBtn?.addEventListener("click", function (event) {
    event.preventDefault(); //prevents the page to reload after a submit
    if ((warehouse.getCapacity()) == warehouse.getCurrentAmountOfCars()) {
        alert("max. Capacity reached");
        return;
    }

    const vehicleData = {
        value: Number((<HTMLInputElement>document.getElementById("value")).value),
        capacity: Number((<HTMLInputElement>document.getElementById("capacity")).value),
        power: Number((<HTMLInputElement>document.getElementById("power")).value),
        id: (<HTMLInputElement>document.getElementById("Id")).value.toUpperCase(),
        color: (<HTMLInputElement>document.getElementById("color")).value.toLowerCase(),
        topSpeed: 0
    }

    const regEx: RegExp = /[A-Z]+\d{1,6}$/;

    if (vehicleData.value && vehicleData.capacity && vehicleData.power && vehicleData.id && vehicleData.color != null) {
        // code-block executed if all variables have a value

        if (!regEx.test(vehicleData.id)) { //Check if the Id of the Car is correct
            alert("wrong Car identification Number\n Hint: this is a numberplate -> Canton + 1-6 digits");
            return;
        }

        if ((<HTMLInputElement>carType).checked) {    //Race Car
            vehicleData.topSpeed = Number((<HTMLInputElement>document.getElementById("topspeed")).value);
            if (vehicleData.topSpeed != 0) {

                storeVehicleOnLocalBrowser(vehicleData);
                parkCar(vehicleData.color, warehouse.lowestParkingIndex());
                warehouse.parkCar(new RaceCar(vehicleData));
                document.querySelector("form")?.reset();
            } else {
                alert("Topspeed missing or wrong!");
            }

        } else {      //Normal Car
            // @ts-ignore
            delete vehicleData.topSpeed;
            storeVehicleOnLocalBrowser(vehicleData);
            parkCar(vehicleData.color, warehouse.lowestParkingIndex());
            warehouse.parkCar(new Car(vehicleData));
            document.querySelector("form")?.reset();
        }
    } else {
        alert("Missing or wrong Data!");
    }


});

//get Car
getCarBtn?.addEventListener("click", function () {
    const parkingSlot: number = Number((<HTMLInputElement>document.getElementById("index")).value);
    const index: number = parkingSlot < 0 ? 0 : parkingSlot - 1;

    localStorage.removeItem(`parkingSlot N.${parkingSlot}`);
    getCarfromWarehouse(index);
    showVehicle(warehouse.getCar(index));
});

// Reset Warehouse
resetBtn?.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})
