import { LightningElement, track, api } from 'lwc';
import getData from "@salesforce/apex/ExoDynamicTable.getData";
import FORM_FACTOR from '@salesforce/client/formFactor';
export default class ExoDynamicTable extends LightningElement {
    @api fields;
    @api objName;
    @api filter;
    @track items = [];
    @track data = [];
    @track error;
    @track columns = [];
    @track page = 1;
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track pageSize;
    pageSizeDesktop = 5;
    pageSizeMobile = 3;
    @track totalRecountCount = 0;
    @track totalPage = 0;
    @track isDesktop;


    connectedCallback() {
        this.isDesktop = FORM_FACTOR != 'Large' ? false : true;
        this.pageSize = FORM_FACTOR != 'Large' ? this.pageSizeMobile : this.pageSizeDesktop;
        this.fields = this.fields.split(',');
        this.columns = [];
        this.data = null;
        this.createColumns();
        getData({
            objName: this.objName,
            fields: this.fields,
            filter: this.filter
        })
            .then((result) => {
                this.items = result;
                this.totalRecountCount = result.length;
                this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
                this.data = this.items.slice(0, this.pageSize);
                this.endingRecord = this.pageSize;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.data = undefined;
            });
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
        this.fields.forEach(element => {
            var item = {
                label: element,
                fieldName: element,
                type: "text",
                sortable: true
            };
            this.columns.push(item);
        });
    }
}