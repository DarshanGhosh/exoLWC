import { LightningElement, track } from 'lwc';

export default class ExoCalculator extends LightningElement {
    @track expression = '';
    @track result = 0;
    isFirst = true;
    operator = '';
    firstNumber = '';
    secondNumber = '';

    handleNumber(event) {
        this.expression += event.target.value;
        if (this.isFirst) {
            this.firstNumber += event.target.value;
        } else {
            this.secondNumber += event.target.value;
        }
    }

    handleOperator(event) {
        if (this.operator != '') {
            this.result = 'NaN'
        } else {
            this.expression += event.target.value;
            this.operator = event.target.value;
            this.isFirst = false;
            if (this.secondNumber != '') {
                this.calculate();
            }
        }
    }

    handleEqual() {
        this.calculate();
    }

    handleClear() {
        this.expression = '';
        this.result = 0;
        this.isFirst = true;
        this.operator = '';
        this.firstNumber = '';
        this.secondNumber = '';
    }

    calculate() {
        if (this.operator == '+') {
            this.result = parseFloat(this.firstNumber) + parseFloat(this.secondNumber)
        } else if (this.operator == '-') {
            this.result = parseFloat(this.firstNumber) - parseFloat(this.secondNumber)
        } else if (this.operator == '*') {
            this.result = parseFloat(this.firstNumber) * parseFloat(this.secondNumber)
        } else if (this.operator == '/') {
            this.result = parseFloat(this.firstNumber) / parseFloat(this.secondNumber)
        }
        if (this.operator != '') {
            this.firstNumber = this.result;
            this.secondNumber = '';
            this.operator = '';
        }
    }
}

