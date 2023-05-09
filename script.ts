import {Warehouse} from "./Warehouse";
import {Car, RaceCar} from "./Vehicle"

let capacity;

// in case a non-number value is typed in.
while (1) {
    capacity = prompt("Capacity of this Warehouse: ");
    // @ts-ignore
    if (/^$|[^0-9]/.test(capacity)) {// a Regex checker for non-Numeric Characters and empty strings
        alert("non-numeric value detected, please try again");
    } else {
        break;
    }
}
const warehouse: Warehouse = new Warehouse(Number(capacity));

//UI Version of this Project
const parkingSlotGroup: Element | null = document.querySelector(".parking-house");
const carType: Element | null = document.querySelector(".checker");
const parkhouse: Element | null = document.querySelector(".parking-house");
const submitBtn: Element | null = document.getElementById("submit-btn");
const getCarBtn: Element | null = document.getElementById("index-btn");
const topspeedArea: Element | null = document.getElementById("topspeed-field");


// Creates the parking slots
for (let i = 1; i < warehouse.capacity() + 1; i++) {

    const parkingSlot = document.createElement('div');
    parkingSlot.classList.add('parking-slot');
    const number = document.createElement('div');
    number.classList.add('number');

    (<HTMLInputElement>number).textContent = String(i);
    (<HTMLInputElement>parkingSlot).appendChild(number);
    (<HTMLInputElement>parkhouse).appendChild(parkingSlot);
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
function showVehicle(vehicle: Car | RaceCar | undefined) {

    (<HTMLInputElement>document.querySelector(".vehicle-value")).textContent = String(vehicle?.getValue());
    (<HTMLInputElement>document.querySelector(".vehicle-capacity")).textContent = String(vehicle?.getCapacity());
    (<HTMLInputElement>document.querySelector(".vehicle-power")).textContent = String(vehicle?.getPower());
    (<HTMLInputElement>document.querySelector(".vehicle-id")).textContent = String(vehicle?.getRegistrationNumber());
    (<HTMLInputElement>document.querySelector(".vehicle-color")).textContent = String(vehicle?.getColor());

    if (vehicle instanceof RaceCar) {
        (<HTMLInputElement>document.querySelector(".vehicle-topspeed")).style.display = "block";
        (<HTMLInputElement>document.querySelector(".vehicle-topspeed")).textContent = String(vehicle?.getTopspeed());
    } else {
        (<HTMLInputElement>document.querySelector(".vehicle-topspeed")).style.display = "none";
    }
}


// Change car type
carType?.addEventListener("change", function (event) {
    // @ts-ignore
    const isRaceCar: boolean = event.target?.checked;

    // isRaceCar = true -> Race Care, false -> Normal Car

    if (isRaceCar) {
        (<HTMLInputElement>topspeedArea).style.display = "block";
    } else {
        (<HTMLInputElement>topspeedArea).style.display = "none";
    }
})

// Get Car information
parkingSlotGroup?.addEventListener("click", function (event) {

    // @ts-ignore
    const parkingSlotIndex = parseInt((<HTMLInputElement>event.target).getAttribute("data-index"));
    if (!isNaN(parkingSlotIndex)) {
        showVehicle(warehouse.getData(parkingSlotIndex));
    }
});

// Park Car
submitBtn?.addEventListener("click", function () {
    if((warehouse.capacity()) == warehouse.currentAmountOfCars()) {
        alert("max. Capacity reached");
        return;
    }
    const value: number = Number((<HTMLInputElement>document.getElementById("value")).value);
    const capacity: number = Number((<HTMLInputElement>document.getElementById("capacity")).value);
    const power: number = Number((<HTMLInputElement>document.getElementById("power")).value);
    const id: string = (<HTMLInputElement>document.getElementById("Id")).value;
    const color: string = (<HTMLInputElement>document.getElementById("color")).value.toLowerCase();
    const regEx: RegExp = /[A-Z]+\d{1,6}$/;

    if(!regEx.test(id)) { //Check if the Id of the Car is correct
        alert("wrong Car identification Number");
        return;
    }

    if (value && capacity && power && id && color != null) {
        // code-block executed if all variables have a value

        if ((<HTMLInputElement>carType).checked) {    //Race Car
            const topspeed: number = Number((<HTMLInputElement>document.getElementById("topspeed")).value);
            if (topspeed != 0) {
                warehouse.parkCar(new RaceCar(value, capacity, power, id, color, topspeed));
                parkCar(color, warehouse.lowestParkingIndex() - 1);
                document.querySelector("form")?.reset();
            } else {
                alert("Missing or wrong Data!");
            }

        } else {      //Normal Car
            warehouse.parkCar(new Car(value, capacity, power, id, color));
            parkCar(color, warehouse.lowestParkingIndex() - 1);
            document.querySelector("form")?.reset();
        }
    } else {
        alert("Missing or wrong Data!");
    }
});

//get Car
getCarBtn?.addEventListener("click", function () {
    const index: number = Number((<HTMLInputElement>document.getElementById("index")).value) < 0 ? 0 :
        Number((<HTMLInputElement>document.getElementById("index")).value) - 1;

    getCarfromWarehouse(index);
    showVehicle(warehouse.getCar(index));
});