import { state } from "../state/calculator-state";

export const processMinusSign = (input: string) => {
    if (input) {
        state.operandStack.push(+input)
        state.resetInput();
    }

    return (token: string) => {
        if (state.operatorStack.length === 0 && state.operandStack.length === 1) {
            state.operatorStack.push(token)
            return;
        }

        if (state.operatorStack.length === 0 || state.operandStack.length === 1) {
            state.input += token;
            return;
        }
    }
}