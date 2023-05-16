'use strict';
import { Warehouse } from "./Warehouse";
import { Car, RaceCar } from "./Vehicle";
let capacity;
// in case a non-number value is typed in.
while (1) {
    capacity = prompt("Capacity of this Warehouse: ");
    // @ts-ignore
    if (/^$|[^0-9]/.test(capacity)) { // a Regex checker for non-Numeric Characters and empty strings
        alert("non-numeric value detected, please try again");
    }
    else {
        capacity = Number(capacity) > 550000 ? 550000 : Number(capacity);
        break;
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
// Creates the parking slots
for (let i = 1; i < warehouse.getCapacity() + 1; i++) {
    const parkingSlot = document.createElement('div');
    parkingSlot.classList.add('parking-slot');
    const number = document.createElement('div');
    number.classList.add('number');
    number.textContent = String(i);
    parkingSlot.appendChild(number);
    parkhouse.appendChild(parkingSlot);
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
    if (vehicle instanceof RaceCar) {
        document.querySelector(".vehicle-topspeed").style.display = "block";
        document.querySelector(".vehicle-topspeed").textContent = String(vehicle === null || vehicle === void 0 ? void 0 : vehicle.getTopspeed());
    }
    else {
        document.querySelector(".vehicle-topspeed").style.display = "none";
    }
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
    const value = Number(document.getElementById("value").value);
    const capacity = Number(document.getElementById("capacity").value);
    const power = Number(document.getElementById("power").value);
    const id = document.getElementById("Id").value.toUpperCase();
    const color = document.getElementById("color").value.toLowerCase();
    const regEx = /[A-Z]+\d{1,6}$/;
    if (value && capacity && power && id && color != null) {
        // code-block executed if all variables have a value
        if (!regEx.test(id)) { //Check if the Id of the Car is correct
            alert("wrong Car identification Number\n Hint: this is a numberplate -> Canton + 1-6 digits");
            return;
        }
        if (carType.checked) { //Race Car
            const topspeed = Number(document.getElementById("topspeed").value);
            if (topspeed != 0) {
                warehouse.parkCar(new RaceCar(value, capacity, power, id, color, topspeed));
                parkCar(color, warehouse.lowestParkingIndex());
                (_a = document.querySelector("form")) === null || _a === void 0 ? void 0 : _a.reset();
            }
            else {
                alert("Topspeed missing or wrong!");
            }
        }
        else { //Normal Car
            warehouse.parkCar(new Car(value, capacity, power, id, color));
            parkCar(color, warehouse.lowestParkingIndex());
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
