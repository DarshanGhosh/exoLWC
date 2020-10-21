import { LightningElement, api, wire, track } from 'lwc';
import getDuplicateRecords from "@salesforce/apex/exoDuplicateRecords.getDuplicateRecords";
export default class ExoDuplicateRecords extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api fields;
    @track items = [];
    @track data = [];
    @track error;
    @track page = 1;
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track pageSize = 5;
    @track totalRecountCount = 0;
    @track msgTotalRecordCount = '';
    @track totalPage = 0;
    @track isModalOpen = false;
    @track columns = [];

    connectedCallback() {
        this.fields = this.fields.split(',');
        this.createColumns();
    }

    @wire(getDuplicateRecords, { recordId: '$recordId', objType: '$objectApiName', fields: '$fields' })
    deWired({ error, data }) {
        if (data) {
            data = data.map((item) =>
                Object.assign({}, item, { linkName: '/' + item.Id })
            );
            this.items = data;
            this.totalRecountCount = data.length;
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
            this.data = this.items.slice(0, this.pageSize);
            this.endingRecord = this.pageSize;
            this.error = undefined;
            this.msgTotalRecordCount = this.totalRecountCount != 0 ? 'We found ' + this.totalRecountCount + ' potential duplicate records' : 'We found no potential duplicates for this record';
        } else if (error) {
            this.error = error;
        }
    }

    displayTable() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1;
            this.displayRecordPerPage(this.page);
        }
    }

    nextHandler() {
        if ((this.page < this.totalPage) && this.page !== this.totalPage) {
            this.page = this.page + 1;
            this.displayRecordPerPage(this.page);
        }
    }

    displayRecordPerPage(page) {
        this.startingRecord = ((page - 1) * this.pageSize);
        this.endingRecord = (this.pageSize * page);
        this.endingRecord = (this.endingRecord > this.totalRecountCount)
            ? this.totalRecountCount : this.endingRecord;
        this.data = this.items.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
    }

    createColumns() {
        var count = 0;
        this.fields.forEach(element => {
            if (count == 0) {
                var item = {
                    label: element, fieldName: "linkName", type: "url",
                    typeAttributes: { label: { fieldName: element }, target: "blank" }
                }
            } else {
                var item = {
                    label: element,
                    fieldName: element,
                    type: "text",
                    sortable: true
                };
            }
            this.columns.push(item);
            count++;
        });
    }
}