class Vehicle {
    constructor(licensePlate, maxSpeed, remainingGas) {
        if (this.constructor === Vehicle) throw new Error('cannot instantiate the Vehicle class');

        this.licensePlate = licensePlate;
        this.maxSpeed = maxSpeed;
        this.remainingGas = remainingGas;
    }

    driveToStore() {
        this.remainingGas -= 2;
    }
}

class Car extends Vehicle {
    constructor(licensePlate, maxSpeed, remainingGas) {
        super(licensePlate, maxSpeed, remainingGas);
    }
}

class Motorcycle extends Vehicle {
    constructor(licensePlate, maxSpeed, remainingGas) {
        super(licensePlate, maxSpeed, remainingGas);
    }
}

class Truck extends Vehicle {
    constructor(licensePlate, maxSpeed, remainingGas) {
        super(licensePlate, maxSpeed, remainingGas);
    }
}

const shreshthCar = new Car('111abc', 15, 10);
const otherPersonMotorcycle = new Motorcycle('123zxc', 5, 10);
const otherOtherPersonVehicle = new Vehicle('jkl090', 10, 5);
