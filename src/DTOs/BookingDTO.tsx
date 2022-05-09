import BillingDTO from "./BillingDTO";
import ClientDTO from "./ClientDTO";

export default class BookingDTO {
    startDate : Date;
    endDate : Date;
    receivingAddressId: number;
    returnAddressId: number;
    carId : number;
    client: ClientDTO;
    billing : BillingDTO
    clientOptionIds: Array<number>;

    constructor() {
        this.startDate = new Date();
        this.endDate = new Date();
        this.carId = 0;
        this.client = new ClientDTO();
        this.receivingAddressId = 0;
        this.returnAddressId = 0;
        this.billing = new BillingDTO();
        this.clientOptionIds = [];
    }
}
