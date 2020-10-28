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
        if (this.isSelectedChild1) {
            this.statusChild1 = 'Selected';
            const selectedEvent = new CustomEvent("childchange", {
                detail: 1
            });
            this.dispatchEvent(selectedEvent);
        } else {
            this.statusChild1 = 'Deselected';
            const selectedEvent = new CustomEvent("childchange", {
                detail: -1
            });
            this.dispatchEvent(selectedEvent);
        }
    }
    hanldeOnchild2Change(event) {
        this.isSelectedChild2 = event.detail;
        if (this.isSelectedChild2) {
            this.statusChild2 = 'Selected';
            const selectedEvent = new CustomEvent("childchange", {
                detail: 1
            });
            this.dispatchEvent(selectedEvent);
        } else {
            this.statusChild2 = 'Deselected';
            const selectedEvent = new CustomEvent("childchange", {
                detail: -1
            });
            this.dispatchEvent(selectedEvent);
        }
    }
}