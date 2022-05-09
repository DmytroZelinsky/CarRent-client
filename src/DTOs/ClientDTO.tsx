export default class ClientDTO {
    firstName : string;
    lastName : string;
    phoneNumber : string;
    dateOfBirth : Date
    constructor() {
        this.firstName = ''
        this.lastName = ''
        this.phoneNumber = ''
        this.dateOfBirth = new Date()
    }
}