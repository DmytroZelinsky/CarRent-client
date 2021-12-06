export default class AddressDTO {
    city : string;
    addressName : string;
    addressNumber : number;
    postCode : number;
    

    constructor() {
        this.city = '';
        this.addressName ='';
        this.addressNumber = 0;
        this.postCode = 0;
    }
}
