import { LightningElement, track, api } from 'lwc';

export default class ExoComp3 extends LightningElement {
    isSelectedChild1 = false;
    isSelectedChild2 = false;
    deselected = 'Deselected';
    selected = 'Selected';
    @track statusChild1 = this.deselected;
    @track statusChild2 = this.deselected;
    @api
    reset() {
        this.statusChild1 = this.deselected;
        this.template.querySelector('c-exo-comp1').reset();
        this.statusChild2 = this.deselected;
        this.template.querySelector('c-exo-comp2').reset();
    }

    hanldeOnchild1Change(event) {
        this.isSelectedChild1 = event.detail;
        this.statusChild1 = this.isSelectedChild1 == true ? this.selected : this.deselected;
        var value = this.isSelectedChild1 == true ? 1 : -1;
        const selectedEvent = new CustomEvent("childchange", {
            detail: value
        });
        this.dispatchEvent(selectedEvent);

    }
    hanldeOnchild2Change(event) {
        this.isSelectedChild2 = event.detail;
        this.statusChild2 = this.isSelectedChild2 == true ? this.selected : this.deselected;
        var value = this.isSelectedChild2 == true ? 1 : -1;
        const selectedEvent = new CustomEvent("childchange", {
            detail: value
        });
        this.dispatchEvent(selectedEvent);
    }
}