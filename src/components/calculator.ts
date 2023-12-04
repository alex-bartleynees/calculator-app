import { state } from "../state/calculator-state";
import { render } from "./render-input";

export class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number | string {
        if (b === 0) {
            return 'Error'
        }
        return a / b;
    }

    processOperation() {
        for (let i = 0; i < state.operandStack.length; i++) {
        const operator = state.operatorStack.pop();
        const secondOperand = state.operandStack.pop();
        const firstOperand = state.operandStack.pop();
        const result = this.calculate(operator!, firstOperand!, secondOperand!)
        state.result = result;
        state.operandStack.push(+result);
        
        this.renderResult();
        state.resetInput();
        }
    }

    renderResult() {
        render.setInput(state.result.toLocaleString());
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
