import { LightningElement, track } from 'lwc';

export default class ExoComp4 extends LightningElement {
    selectCount = 0;
    @track message;

    connectedCallback() {
        this.setMessage();
    }

    hanldeChildChange(event) {
        this.selectCount += event.detail;
        this.setMessage();
    }

    handleReset() {
        this.selectCount = 0;
        this.setMessage();
        this.template.querySelector('c-exo-comp3').reset();
    }

    setMessage() {
        if (this.selectCount == 0) {
            this.message = 'No children selected';
        } else if (this.selectCount == 1) {
            this.message = '1 child selected';
        } else {
            this.message = this.selectCount + ' children selected';
        }
    }
}