import {state} from '../state/calculator-state';
import {Calculator} from './calculator';
import {render} from './render-input';

export class UserInput {
    keys: HTMLDivElement = document.querySelector('.calculator__keys')!;
    inputChars = '';
    calculator = new Calculator();

    constructor() {
        this.keys.addEventListener('click', (e) => {
            if ((e.target as Element).matches('button')) {
                this.getInput(e);
            }
        });

        if (state.result) render.setInput(state.result.toString());
    }

    getInput(e: MouseEvent) {
        const value = (e.target as HTMLButtonElement).dataset.value;
        switch (value) {
            case '+':
                this.handleOperator('+');
                break;

            case '-':
                this.handleOperator('-');
                break;

            case '*':
                this.handleOperator('*');
                break;

            case '/':
                this.handleOperator('/');
                break;

            case '=':
                this.handleInput();
                this.resetSecondOperand();
                break;

            case 'del':
                if (this.inputChars) {
                    this.inputChars = this.inputChars.slice(0, -1);
                    render.setInput(this.inputChars);
                }
                break;

            case 'reset':
                state.reset();
                this.inputChars = '';
                break;

            case '.': {
                if (!this.inputChars.includes('.')) {
                    this.inputChars += value;
                    render.setInput(this.inputChars);
                }
                break;
            }

            default:
                this.inputChars += value;
                render.setInput(this.inputChars);
        }
    }

    handleOperator(operator: string) {
            this.handleInput();
            state.operator = operator;
            this.resetSecondOperand();
    }

    handleInput() {
        if (state.operator === '-' && !state.firstOperand) {
            this.handleNegativeInput();
            return;
        }

        if (!state.firstOperand) {
            state.firstOperand = this.inputChars;
            this.inputChars = '';
            return;
        }

        if (state.firstOperand) {
            state.secondOperand = this.inputChars;
        }

        if (state.result) {
            state.firstOperand = state.result.toLocaleString();
            this.renderResult();
        }

        if (state.firstOperand && state.secondOperand) {
            state.result = this.calculator.calculate(
                state.operator,
                parseFloat(state.firstOperand.replace(/,/g, '')),
                parseFloat(state.secondOperand.replace(/,/g, '')),
            );
            this.renderResult();
        }
    }

    handleNegativeInput() {
        const negativeNumber = -this.inputChars;
        this.inputChars = negativeNumber.toString();
        state.firstOperand = this.inputChars;
    }

    renderResult() {
        render.setInput(state.result.toLocaleString());
    }

    resetSecondOperand() {
        state.secondOperand = '';
        this.inputChars = '';
    }
}
