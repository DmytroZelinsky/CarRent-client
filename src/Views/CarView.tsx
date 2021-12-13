import Class from "../Enums/Class";
import CarRentInfoView from "./CarServiceView";

export default class CarView {
    carId : number;
    type : string;
    engineVolume: number;
    geerbox: number;
    fuelType: number;
    driveType: number;
    brand: string;
    carRentInfo: CarRentInfoView;
    vin: string;
    model: string;
    class: Class;

    constructor() {
        this.carId = 0;
        this.type = '';
        this.engineVolume = 0;
        this.geerbox = 0;
        this.fuelType = 0;
        this.driveType = 0;
        this.brand = '';
        this.carRentInfo = new CarRentInfoView();
        this.vin= '';
        this.model = '';
        this.class = 0;
    }
}
