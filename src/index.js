/* eslint-disable @typescript-eslint/no-non-null-assertion */
var ToggleTheme = /** @class */ (function () {
    function ToggleTheme() {
        this.toggleSwitch = document.querySelector('.toggle__btn');
        this.toggleDiv = document.querySelector('.toggle__background');
        this.toggleSwitch.addEventListener('click', this.switchTheme.bind(this));
    }
    ToggleTheme.prototype.switchTheme = function () {
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
    };
    return ToggleTheme;
}());
var CalculatorState = /** @class */ (function () {
    function CalculatorState() {
        this.operator = '';
        this.firstOperand = '';
        this.secondOperand = '';
        this.result = 0;
    }
    CalculatorState.prototype.reset = function () {
        this.operator = '';
        this.firstOperand = '';
        this.secondOperand = '';
        this.result = 0;
        render.setInput(this.result.toString());
    };
    return CalculatorState;
}());
var state = new CalculatorState();
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.add = function (a, b) {
        return a + b;
    };
    Calculator.prototype.subtract = function (a, b) {
        return a - b;
    };
    Calculator.prototype.multiply = function (a, b) {
        return a * b;
    };
    Calculator.prototype.divide = function (a, b) {
        return a / b;
    };
    Calculator.prototype.calculate = function (operator, firstOperand, secondOperand) {
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
    };
    return Calculator;
}());
var UserInput = /** @class */ (function () {
    function UserInput() {
        var _this = this;
        this.buttons = document.querySelectorAll('.key');
        this.inputChars = '';
        this.calculator = new Calculator();
        this.inputChars = '';
        this.buttons.forEach(function (button) {
            return button.addEventListener('click', _this.getInput.bind(_this));
        });
        if (state.result)
            render.setInput(state.result.toString());
    }
    UserInput.prototype.getInput = function (e) {
        var value = e.target.dataset.value;
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
    };
    UserInput.prototype.handleOperator = function (operator) {
        if (operator === '=' && state.secondOperand) {
            this.handleInput();
            state.result = this.calculateInput();
            this.renderResult();
            this.resetSecondOperand();
        }
        else {
            this.handleInput();
            state.operator = operator;
            if (state.result)
                this.renderResult();
            this.resetSecondOperand();
        }
    };
    UserInput.prototype.handleInput = function () {
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
    };
    UserInput.prototype.handleNegativeInput = function () {
        var negativeNumber = -this.inputChars;
        this.inputChars = negativeNumber.toString();
        state.firstOperand = this.inputChars;
    };
    UserInput.prototype.renderResult = function () {
        render.setInput(state.result.toLocaleString());
    };
    UserInput.prototype.resetSecondOperand = function () {
        state.secondOperand = '';
        this.inputChars = '';
    };
    UserInput.prototype.calculateInput = function () {
        return this.calculator.calculate(state.operator, parseFloat(state.firstOperand.replace(/,/g, '')), parseFloat(state.secondOperand.replace(/,/g, '')));
    };
    return UserInput;
}());
var RenderInput = /** @class */ (function () {
    function RenderInput() {
        this.input = document.querySelector('input');
    }
    RenderInput.prototype.setInput = function (input) {
        var inputCommas = input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.input.value = inputCommas;
    };
    return RenderInput;
}());
var render = new RenderInput();
new ToggleTheme();
new UserInput();
