import { Calculator } from "../components/calculator";
import { state } from "../state/calculator-state";
const calculator = new Calculator();

export const processOperator = (input: string) => {
    if (input) {
        state.operandStack.push(+input)
        state.resetInput();
    }
    return (token: string) => {
            state.operatorStack.push(token)
    }
}