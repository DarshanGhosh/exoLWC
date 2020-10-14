import { LightningElement, wire, track, api } from "lwc";
import getAccountList from "@salesforce/apex/ExoLWC2.getAccountList";
export default class ExoLWC2 extends LightningElement {
    @track columns = [{
        type: 'button-icon',
        fixedWidth: 40,
        typeAttributes: {
            iconName: 'utility:preview',
            name: 'preview_record',
            title: 'Preview',
            variant: 'bare',
            disabled: false
        }
    },
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: true
    },
    {
        label: 'Type',
        fieldName: 'Type',
        type: 'text',
        sortable: true
    }
    ];
    @track error;
    @track accList;
    @track showModal = false;
    @api accountId;
    @wire(getAccountList)
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.accList = data;
        } else if (error) {
            this.error = error;
        }
    }

    handleRowAction(event) {
        this.accountId = event.detail.row.Id
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }
}