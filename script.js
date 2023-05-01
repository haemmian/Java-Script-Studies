import { Warehouse } from "./Warehouse.js";
import { Car, RaceCar } from "./Vehicle.js";
const warehouse = new Warehouse(Number(prompt("Capacity of this Warehouse: ")));
//UI Version of this Project
const parkhouse = document.querySelector(".parking-house");
const normalCarBtn = document.querySelector(".normal-car-btn");
const raceCarBtn = document.querySelector(".race-car-btn");
const submitBtn = document.getElementById("submit-btn");
const getCarBtn = document.getElementById("index-btn");
const topspeedArea = document.getElementById("topspeed-field");
function parkCar(vehicleColor, index) {
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];
    const vehicle = document.createElement("div");
    vehicle.classList.add("vehicle");
    vehicle.style.backgroundColor = vehicleColor;
    parkingSlot.appendChild(vehicle);
}
function getCar(index) {
    var _a;
    const parkingSlot = document.querySelectorAll('.parking-slot')[index];
    (_a = parkingSlot.querySelector(".vehicle")) === null || _a === void 0 ? void 0 : _a.remove();
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
    var _a, _b;
    const value = Number(document.getElementById("value").value);
    const capacity = Number(document.getElementById("capacity").value);
    const power = Number(document.getElementById("power").value);
    const id = Number(document.getElementById("Id").value);
    const color = document.getElementById("color").value;
    if (value && capacity && power && id && color != null) {
        // code-block executed if all variables have a value
        if (normalCarBtn.style.backgroundColor === "salmon") { //Normal Car
            warehouse.parkCar(new Car(value, capacity, power, id, color));
            parkCar(color, warehouse.currentAmountOfCars() - 1);
            (_a = document.querySelector("form")) === null || _a === void 0 ? void 0 : _a.reset();
        }
        else if (raceCarBtn.style.backgroundColor === "salmon") { //Race Car
            const topspeed = Number(document.getElementById("topspeed").value);
            if (topspeed != 0) {
                warehouse.parkCar(new RaceCar(value, capacity, power, id, color, topspeed));
                parkCar(color, warehouse.currentAmountOfCars() - 1);
                (_b = document.querySelector("form")) === null || _b === void 0 ? void 0 : _b.reset();
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
//get Car
getCarBtn === null || getCarBtn === void 0 ? void 0 : getCarBtn.addEventListener("click", function () {
    const index = Number(document.getElementById("index").value) < 0 ? 0 :
        Number(document.getElementById("index").value) - 1;
    const receivedVehicle = warehouse.getCar(index);
    getCar(index);
    document.querySelector(".vehicle-value").textContent = String(receivedVehicle === null || receivedVehicle === void 0 ? void 0 : receivedVehicle.getValue());
    document.querySelector(".vehicle-capacity").textContent = String(receivedVehicle === null || receivedVehicle === void 0 ? void 0 : receivedVehicle.getCapacity());
    document.querySelector(".vehicle-power").textContent = String(receivedVehicle === null || receivedVehicle === void 0 ? void 0 : receivedVehicle.getPower());
    document.querySelector(".vehicle-id").textContent = String(receivedVehicle === null || receivedVehicle === void 0 ? void 0 : receivedVehicle.getRegistrationNumber());
    document.querySelector(".vehicle-color").textContent = String(receivedVehicle === null || receivedVehicle === void 0 ? void 0 : receivedVehicle.getColor());
    if (receivedVehicle instanceof RaceCar) {
        document.querySelector(".vehicle-topspeed").style.display = "block";
        document.querySelector(".vehicle-topspeed").value = String(receivedVehicle === null || receivedVehicle === void 0 ? void 0 : receivedVehicle.getTopspeed());
    }
    else {
        document.querySelector(".vehicle-topspeed").style.display = "none";
    }
});
