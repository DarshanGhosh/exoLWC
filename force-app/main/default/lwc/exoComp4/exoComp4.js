import { LightningElement, track } from 'lwc';

export default class ExoComp4 extends LightningElement {
    @track selectCount = 0;
    hanldeChildChange(event) {
        this.selectCount += event.detail;
    }

    handleReset() {
        this.selectCount = 0;
        this.template.querySelector('c-exo-comp3').reset();
    }
}