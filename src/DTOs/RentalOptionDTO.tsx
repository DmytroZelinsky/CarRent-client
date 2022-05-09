export default class RentalOptionDTO {
    startDate : Date;
    endDate : Date;
    receivingAddressId: number;
    returnAddressId: number;
    constructor() {
        this.startDate = new Date();
        this.endDate = new Date();
        this.receivingAddressId = 0;
        this.returnAddressId = 0;
    }
}