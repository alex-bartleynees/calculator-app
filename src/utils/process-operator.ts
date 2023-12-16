import { state } from "../state/calculator-state";

export const processOperator = (input: string) => {
    if (input) {
        state.operandStack.push(+input)
        state.resetInput();
    }
    return (token: string) => {
            state.operatorStack.push(token)
    }
}
