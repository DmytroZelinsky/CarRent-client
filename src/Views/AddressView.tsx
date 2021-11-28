export default class AddressView {
    addressId : number;
    city : string;
    addressName : string;
    addressNumber : number;
    postCode : number;

    constructor() {
        this.addressId = 0;
        this.city = '';
        this.addressName = '';
        this.addressNumber = 0;
        this.postCode = 0;
    }
}