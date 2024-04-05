import { Calculator } from "../components/calculator";
import { state } from "../state/calculator-state";

export const processOperation = (input?: string) => {
    const calculator = new Calculator();
    if (input) {
    state.operandStack.push(+input)
    state.resetInput();
    }
    if (state.operandStack.length > 1) {
    calculator.processOperation();
    }
}