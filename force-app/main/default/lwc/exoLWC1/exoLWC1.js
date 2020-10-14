import { LightningElement, wire, track } from "lwc";
import getContactList from "@salesforce/apex/ExoLWC1.getContactList";
export default class ExoLWC1 extends LightningElement {
  @track contacts;
  @track errorMsg;
  searchTerm = "";

  handleChange(event) {
    this.searchTerm = event.target.value;
  }

  searchContact() {
    getContactList({ searchTerm: this.searchTerm })
      .then((result) => {
        this.contacts = result;
      })
      .catch((error) => {
        this.errorMsg = error;
      });
  }
}
