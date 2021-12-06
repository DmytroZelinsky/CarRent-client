export default class CarServiceView {
    carServiceId : number;
    distanceLimit : number;
    isOccupied: boolean;
    pricePerDay: number;
    deposit: number;

    constructor() {
        this.carServiceId = 0;
        this.distanceLimit = 0;
        this.isOccupied = false;
        this.pricePerDay = 0;
        this.deposit = 0;
    }
}
