'use strict';
import { Warehouse } from "./Warehouse.js";
import { Car, RaceCar } from "./Vehicle.js";
let capacity;
if (storageCheck()) {
    // in case a non-number value is typed in.
    while (1) {
        capacity = prompt("Capacity of this Warehouse: ");
        // @ts-ignore
        if (/^$|[^0-9]/.test(capacity)) { // a Regex checker for non-Numeric Characters and empty strings
            alert("non-numeric value detected, please try again");
        }
        else {
            capacity = Number(capacity) > 550000 ? 550000 : Number(capacity);
            localStorage.setItem("capacity", capacity);
            break;
        }
    }
}
const warehouse = new Warehouse(capacity);
//UI Version of this Project
const parkingSlotGroup = document.querySelector(".parking-house");
const carType = document.querySelector(".checker");
const parkhouse = document.querySelector(".parking-house");
const submitBtn = document.getElementById("submit-btn");
const getCarBtn = document.getElementById("index-btn");
const topspeedArea = document.getElementById("topspeed-field");
const resetBtn = document.getElementById("reset Button");
// Creates the parking slots
for (let i = 1; i < warehouse.getCapacity() + 1; i++) {
    const parkingSlot = document.createElement('div');
    parkingSlot.classList.add('parking-slot');
    const number = document.createElement('div');
    number.classList.add('number');
    number.textContent = String(i); //The Parking slot starts with 1
    parkingSlot.appendChild(number);
    parkhouse.appendChild(parkingSlot);
    // console.log("Parking Slot N." + i + " " + localStorage.getItem(`parkingSlot N.${i}`))
    if (localStorage.getItem(`parkingSlot N.${i}`)) {
        // @ts-ignore
        const tmpCar = JSON.parse(localStorage.getItem(`parkingSlot N.${i}`));
        parkCar(tmpCar["color"], i - 1);
        console.log(tmpCar.topSpeed);
        warehouse.parkCar(tmpCar["topSpeed"] === undefined ? new Car(tmpCar) : new RaceCar(tmpCar));
    }
}
/**
 * @brief Adds a vehicle to the UI-side. Color and index are required.
 * @param vehicleColor
 * @param index
 */
function parkCar(vehicleColor, index) {
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];
    const vehicle = document.createElement("button");
    vehicle.classList.add("vehicle");
    vehicle.setAttribute("data-index", index.toString());
    vehicle.style.backgroundColor = vehicleColor;
    parkingSlot.appendChild(vehicle);
}
/**
 * @brief Removes a vehicle from the UI-side. Parking-slot-index is required.
 * @param index
 */
function getCarfromWarehouse(index) {
    var _a;
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];
    (_a = parkingSlot.querySelector(".vehicle")) === null || _a === void 0 ? void 0 : _a.remove();
}
/**
 * @brief Show vehicle-data on the Data side
 * @param vehicle
 */
function showVehicle(vehicle) {
    if (vehicle === null) {
        console.warn(`No Car at at this parking-slot}`);
        return;
    }
    document.querySelector(".vehicle-value").textContent = String(vehicle === null || vehicle === void 0 ? void 0 : vehicle.getValue());
    document.querySelector(".vehicle-capacity").textContent = String(vehicle === null || vehicle === void 0 ? void 0 : vehicle.getCapacity());
    document.querySelector(".vehicle-power").textContent = String(vehicle === null || vehicle === void 0 ? void 0 : vehicle.getPower());
    document.querySelector(".vehicle-id").textContent = String(vehicle === null || vehicle === void 0 ? void 0 : vehicle.getRegistrationNumber());
    document.querySelector(".vehicle-color").textContent = String(vehicle === null || vehicle === void 0 ? void 0 : vehicle.getColor());
    console.log(vehicle.constructor.name);
    if (vehicle instanceof RaceCar) {
        document.querySelector("#hide-Top-Speed").style.display = "block";
        document.querySelector(".vehicle-topspeed").textContent = String(vehicle === null || vehicle === void 0 ? void 0 : vehicle.getTopspeed());
    }
    else {
        document.querySelector("#hide-Top-Speed").style.display = "none";
    }
}
/**
 * @brief check whether the "user" data is stored in the web Storage and returns "true" if it is stored
 */
function storageCheck() {
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
function storeVehicleOnLocalBrowser(vehicleData) {
    console.log(`Set parkingslot to ${localStorage.length}`);
    localStorage.setItem(`parkingSlot N.${localStorage.length}`, JSON.stringify(vehicleData));
}
// Change car type
carType === null || carType === void 0 ? void 0 : carType.addEventListener("change", function (event) {
    const isRaceCar = event.target.checked;
    // isRaceCar = true -> Race Care, false -> Normal Car
    if (isRaceCar) {
        topspeedArea.style.display = "block";
    }
    else {
        topspeedArea.style.display = "none";
    }
});
// Get Car information
parkingSlotGroup === null || parkingSlotGroup === void 0 ? void 0 : parkingSlotGroup.addEventListener("click", function (event) {
    // @ts-ignore
    const parkingSlotIndex = parseInt(event.target.getAttribute("data-index"));
    if (!isNaN(parkingSlotIndex)) {
        showVehicle(warehouse.getData(parkingSlotIndex));
    }
});
// Park Car
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", function (event) {
    var _a, _b;
    event.preventDefault(); //prevents the page to reload after a submit
    if ((warehouse.getCapacity()) == warehouse.getCurrentAmountOfCars()) {
        alert("max. Capacity reached");
        return;
    }
    const vehicleData = {
        value: Number(document.getElementById("value").value),
        capacity: Number(document.getElementById("capacity").value),
        power: Number(document.getElementById("power").value),
        id: document.getElementById("Id").value.toUpperCase(),
        color: document.getElementById("color").value.toLowerCase(),
        topSpeed: 0
    };
    const regEx = /[A-Z]+\d{1,6}$/;
    if (vehicleData.value && vehicleData.capacity && vehicleData.power && vehicleData.id && vehicleData.color != null) {
        // code-block executed if all variables have a value
        if (!regEx.test(vehicleData.id)) { //Check if the Id of the Car is correct
            alert("wrong Car identification Number\n Hint: this is a numberplate -> Canton + 1-6 digits");
            return;
        }
        if (carType.checked) { //Race Car
            vehicleData.topSpeed = Number(document.getElementById("topspeed").value);
            if (vehicleData.topSpeed != 0) {
                storeVehicleOnLocalBrowser(vehicleData);
                warehouse.parkCar(new RaceCar(vehicleData));
                parkCar(vehicleData.color, warehouse.lowestParkingIndex());
                (_a = document.querySelector("form")) === null || _a === void 0 ? void 0 : _a.reset();
            }
            else {
                alert("Topspeed missing or wrong!");
            }
        }
        else { //Normal Car
            // @ts-ignore
            delete vehicleData.topSpeed;
            storeVehicleOnLocalBrowser(vehicleData);
            warehouse.parkCar(new Car(vehicleData));
            console.log(warehouse.lowestParkingIndex());
            parkCar(vehicleData.color, warehouse.lowestParkingIndex());
            (_b = document.querySelector("form")) === null || _b === void 0 ? void 0 : _b.reset();
        }
    }
    else {
        alert("Missing or wrong Data!");
    }
});
//get Car
getCarBtn === null || getCarBtn === void 0 ? void 0 : getCarBtn.addEventListener("click", function () {
    const index = Number(document.getElementById("index").value) < 0 ? 0 :
        Number(document.getElementById("index").value) - 1;
    getCarfromWarehouse(index);
    showVehicle(warehouse.getCar(index));
});
// Reset Warehouse
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
