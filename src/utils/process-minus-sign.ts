import { state } from "../state/calculator-state";

export const processMinusSign = (token: string) => {

        const { operandStack, operatorStack, input: currentInput } = state;
        if (isEmptyInput(operatorStack.length, operandStack.length)) {
            state.input += token;
        } else if (isNotFirstOperator(currentInput, operatorStack.length) && !currentInput) {
            operatorStack.push(token);
        } else if (isSingleOperand(operatorStack.length, operandStack.length)) {
            state.input += token;
        } else {
            operatorStack.push(token);
        }
    
}

const isEmptyInput = (operatorLength: number, operandLength: number) => {
    return operatorLength === 0 && operandLength === 0;
}

const isNotFirstOperator = (currentInput: string, operatorLength: number) => {
    return !currentInput && operatorLength !== 1;
}

const isSingleOperand = (operatorLength: number, operandLength: number) => {
    return operandLength === 1 && operatorLength !== 0;
}

const isNoOperator = (operatorLength: number) => {
    return operatorLength === 0;
}