/*
Cars, Motorcycle, Truck - vehicles

*/

class Vehicle {
    constructor(licensePlate) {
        if (this.constructor === Vehicle) throw new Error('cannot initialize Vehicle');

        this.licensePlate = licensePlate;
    }

    assignTicket() {
        throw new Error('cannot assign ticket to a generic vehicle');
    }
}

class Car extends Vehicle {
    constructor(licensePlate) {
        super(licensePlate);
    }

    assignTicket() {
        return 'car ticket';
    }
}

class Motorcycle extends Vehicle {
    constructor(licensePlate) {
        super(licensePlate);
    }

    assignTicket() {
        return 'motorcycle ticket';
    }
}

class Truck extends Vehicle {
    constructor(licensePlate) {
        super(licensePlate);
    }

    assignTicket() {
        return 'truck ticket';
    }
}

const myCar = new Car('999ABC');
console.log(myCar.assignTicket());

const myVehicle = new Vehicle('123PLM');
