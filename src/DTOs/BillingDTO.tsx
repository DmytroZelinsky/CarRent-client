import InvoiceStatus from "../Enums/InvoiceStatus";
import PaymentMethod from "../Enums/PaymentMethod";

export default class BillingDTO {
    invoiceStatus : InvoiceStatus;
    paymentDate : Date;
    method : PaymentMethod;
    totalAmount : number
    constructor() {
        this.invoiceStatus = InvoiceStatus.Draft;
        this.paymentDate = new Date();
        this.method = PaymentMethod.Online;
        this.totalAmount = 0;
    }
}