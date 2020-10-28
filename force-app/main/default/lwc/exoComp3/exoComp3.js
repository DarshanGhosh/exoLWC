import { LightningElement, track, api } from 'lwc';

export default class ExoComp3 extends LightningElement {
    isSelectedChild1 = false;
    isSelectedChild2 = false;
    @track statusChild1 = 'Deselected';
    @track statusChild2 = 'Deselected';
    @api
    reset() {
        this.statusChild1 = 'Deselected';
        this.template.querySelector('c-exo-comp1').reset();
        this.statusChild2 = 'Deselected';
        this.template.querySelector('c-exo-comp2').reset();
    }

    hanldeOnchild1Change(event) {
        this.isSelectedChild1 = event.detail;
        this.statusChild1 = this.isSelectedChild1 == true ? 'Selected' : 'Deselected';
        var value = this.isSelectedChild1 == true ? 1 : -1;
        const selectedEvent = new CustomEvent("childchange", {
            detail: value
        });
        this.dispatchEvent(selectedEvent);

    }
    hanldeOnchild2Change(event) {
        this.isSelectedChild2 = event.detail;
        this.statusChild2 = this.isSelectedChild2 == true ? 'Selected' : 'Deselected';
        var value = this.isSelectedChild2 == true ? 1 : -1;
        const selectedEvent = new CustomEvent("childchange", {
            detail: value
        });
        this.dispatchEvent(selectedEvent);
    }
}