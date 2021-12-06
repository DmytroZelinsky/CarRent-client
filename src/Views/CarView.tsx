import Class from "../Enums/Class";
import CarServiceView from "./CarServiceView";

export default class CarView {
    carId : number;
    type : string;
    engineVolume: number;
    geerbox: string;
    fuelType: string;
    driveType: string;
    brand: string;
    carService: CarServiceView;
    vin: string;
    model: string;
    class: Class;

    constructor() {
        this.carId = 0;
        this.type = '';
        this.engineVolume = 0;
        this.geerbox = '';
        this.fuelType = '';
        this.driveType = '';
        this.brand = '';
        this.carService = new CarServiceView();
        this.vin= '';
        this.model = '';
        this.class = 0;
    }
}
