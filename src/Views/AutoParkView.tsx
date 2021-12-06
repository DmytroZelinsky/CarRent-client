import AddressView from './AddressView'
import CarView from './CarView';

export default class AutoParkView {
    autoParkId : number;
    currentCarCount : number;
    address : AddressView;
    cars : CarView[];

    constructor() {
        this.autoParkId = 0;
        this.currentCarCount = 0;
        this.address = new AddressView();
        this.cars = []
    }
}
