import BillingDTO from "./BillingDTO";

export default class BookingDTO {
    startDate : Date;
    endDate : Date;
    receivingAddressId: number;
    returnAddressId: number;
    carId : number;
    clientId : number;
    billing : BillingDTO
    clientOptionIds: Array<number>;

    constructor() {
        this.startDate = new Date();
        this.endDate = new Date();
        this.carId = 0;
        this.clientId = 0;
        this.receivingAddressId = 0;
        this.returnAddressId = 0;
        this.billing = new BillingDTO();
        this.clientOptionIds = [];
    }
}
