import { LightningElement, api, wire, track } from 'lwc';
import getDuplicateRecords from "@salesforce/apex/exoDuplicateRecords.getDuplicateRecords";
export default class ExoDuplicateRecords extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track data;
    @track error;
    @track columns = [
        {
            label: 'Name',
            fieldName: 'nameUrl',
            type: 'url',
            typeAttributes: {
                label: { fieldName: 'name' },
                target: '_blank'
            },
            sortable: true
        }
    ];

    @wire(getDuplicateRecords, { recordId: '$recordId', objType: '$objectApiName' })
    deWired({ error, data }) {
        if (data) {
            this.data = data
            this.error = null;
        } else if (error) {
            this.error = error;
        }
    }
}