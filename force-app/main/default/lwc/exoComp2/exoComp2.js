import { LightningElement, api } from 'lwc';

export default class ExoComp2 extends LightningElement {
    @api isSelectedChild2 = false;
    @api
    reset() {
        this.isSelectedChild2 = false;
    }

    handleClick() {
        this.isSelectedChild2 = !this.isSelectedChild2;
        const selectedEvent = new CustomEvent("child2change", {
            detail: this.isSelectedChild2
        });
        this.dispatchEvent(selectedEvent);
    }
}