import CarView from "../Views/CarView";
import ClientServiceDTO from "./ClientServiceDTO";

export default class BookingDTO {
    startDate : Date;
    endDate : Date;
    carId : number;
    clientID : number;
    receivingAddressId: number;
    returnAddressId: number;
    receivingAddress: string;
    returnAddress: string;
    car: CarView
    clientService: ClientServiceDTO;

    constructor() {
        this.startDate = new Date();
        this.endDate = new Date();
        this.carId = 0;
        this.clientID = 0;
        this.receivingAddressId = 0;
        this.returnAddressId = 0;
        this.receivingAddress = ''
        this.returnAddress = ''
        this.car = new CarView()
        this.clientService = new ClientServiceDTO();
    }
}
