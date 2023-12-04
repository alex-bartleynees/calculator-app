import {render} from '../components/render-input';
import { Stack } from '../components/stack';

class CalculatorState {
    result: number | string = 0;
    operatorStack = new Stack<string>();
    operandStack = new Stack<number>();
    #userInput = '';
    #displayInput = '';
    get input(): string {
        return this.#userInput;
    }
    set input(value: string) {
        this.#userInput = value;

        if (value) {
            this.displayInput = value;
        }
    }
    get displayInput(): string {
        return this.#displayInput;
    }
    set displayInput(value: string) {
        this.#displayInput = value;
        render.setInput(value);
    }

    reset() {
        this.operatorStack = new Stack();
        this.operandStack = new Stack();
        this.result = 0;
        this.resetInput();
        render.setInput(this.result.toString());
    }

    resetInput() {
        this.#userInput = '';
        this.#displayInput = '';
    }
}

export const state = new CalculatorState();
