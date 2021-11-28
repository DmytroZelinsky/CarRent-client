import AddressView from './AddressView'

export default class AutoParkView {
    autoParkId : number;
    currentCarCount : number;
    address : AddressView;

    constructor() {
        this.autoParkId = 0;
        this.currentCarCount = 0;
        this.address = new AddressView();
    }
}