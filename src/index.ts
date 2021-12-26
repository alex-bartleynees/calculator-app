/* eslint-disable @typescript-eslint/no-non-null-assertion */
class ToggleTheme {
    toggleSwitch: HTMLButtonElement = document.querySelector('.toggle__btn')!;
    toggleDiv: HTMLDivElement = document.querySelector('.toggle__background')!;

    constructor() {
        this.toggleSwitch.addEventListener(
            'click',
            this.switchTheme.bind(this),
        );
    }

    switchTheme(): void {
        if (this.toggleDiv.classList.contains('toggle__btn--2')) {
            this.toggleDiv.classList.remove('toggle__btn--2');
            document.documentElement.setAttribute('data-theme', 'dark');
            this.toggleSwitch.classList.add('toggle__btn--3');
            return;
        }

        if (this.toggleSwitch.classList.contains('toggle__btn--3')) {
            document.documentElement.removeAttribute('data-theme');
            this.toggleSwitch.classList.remove('toggle__btn--3');
            return;
        }

        this.toggleDiv.classList.add('toggle__btn--2');
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

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

const state = new CalculatorState();

class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        return a / b;
    }

    calculate(
        operator: string,
        firstOperand: number,
        secondOperand: number,
    ): number | string {
        switch (operator) {
            case '+':
                return this.add(firstOperand, secondOperand);

            case '-':
                return this.subtract(firstOperand, secondOperand);

            case '/':
                return this.divide(firstOperand, secondOperand);

            case '*':
                return this.multiply(firstOperand, secondOperand);

            default:
                return 'Error';
        }
    }
}

class UserInput {
    buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.key')!;
    inputChars = '';
    calculator = new Calculator();

    constructor() {
        this.inputChars = '';
        this.buttons.forEach((button) =>
            button.addEventListener('click', this.getInput.bind(this)),
        );
        if (state.result) render.setInput(state.result.toString());
    }

    getInput(e) {
        const value = e.target.dataset.value;
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
                this.handleOperator('=');
                break;

            case 'del':
                break;

            case 'reset':
                state.reset();
                this.inputChars = '';
                break;

            case '.': {
                if (!this.inputChars.includes('.')) {
                    this.inputChars += e.target.dataset.value;
                    render.setInput(this.inputChars);
                }
                break;
            }

            default:
                this.inputChars += e.target.dataset.value;
                render.setInput(this.inputChars);
        }
    }

    handleOperator(operator: string) {
        if (operator === '=' && state.secondOperand) {
            this.handleInput();
            state.result = this.calculateInput();
            this.renderResult();
            this.resetSecondOperand();
        } else {
            this.handleInput();
            state.operator = operator;
            if (state.result) this.renderResult();
            this.resetSecondOperand();
        }
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
            state.result = this.calculateInput();
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

    calculateInput(): number | string {
        return this.calculator.calculate(
            state.operator,
            parseFloat(state.firstOperand.replace(/,/g, '')),
            parseFloat(state.secondOperand.replace(/,/g, '')),
        );
    }
}

class RenderInput {
    input: HTMLInputElement = document.querySelector('input')!;

    setInput(input: string) {
        const inputCommas = input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.input.value = inputCommas;
    }
}

const render = new RenderInput();
new ToggleTheme();
new UserInput();
