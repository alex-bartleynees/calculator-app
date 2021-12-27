import {render} from '../components/render-input';

class CalculatorState {
    operator = '';
    firstOperand = '';
    secondOperand = '';
    result: number | string = 0;

    reset() {
        this.operator = '';
        this.firstOperand = '';
        this.secondOperand = '';
        this.result = 0;
        render.setInput(this.result.toString());
    }
}

export const state = new CalculatorState();
