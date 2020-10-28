import { LightningElement, api } from 'lwc';

export default class ExoComp1 extends LightningElement {
    @api isSelectedChild1 = false;
    @api
    reset() {
        this.isSelectedChild1 = false;
    }

    handleClick() {
        this.isSelectedChild1 = !this.isSelectedChild1;
        const selectedEvent = new CustomEvent("child1change", {
            detail: this.isSelectedChild1
        });
        this.dispatchEvent(selectedEvent);
    }
}