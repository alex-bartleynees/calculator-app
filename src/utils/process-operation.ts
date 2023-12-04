import { Calculator } from "../components/calculator";
import { state } from "../state/calculator-state";

export const processOperation = (input: string) => {
    const calculator = new Calculator();
    state.operandStack.push(+input)
    calculator.processOperation();
}