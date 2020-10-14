import { LightningElement, track } from 'lwc';
import getData from "@salesforce/apex/ExoDynamicTable.getData";
export default class ExoDynamicTable extends LightningElement {
    fields;
    objName;
    @track data;
    @track errorMsg
    @track columns = [];
    @track showTable = false;

    handleFieldChange(event) {
        this.fields = event.detail.value.split(',');
    }

    handleObjectChange(event) {
        this.objName = event.detail.value;
    }

    generateTable() {
        this.columns = [];
        this.showTable = false;
        this.createColumns();
        this.showTable = true;
        getData({
            objName: this.objName,
            fields: this.fields
        })
            .then((result) => {
                this.data = result;
            })
            .catch((error) => {
                this.errorMsg = error;
            });
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