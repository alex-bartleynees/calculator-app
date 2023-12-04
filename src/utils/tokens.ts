import { state } from "../state/calculator-state";
import { processOperation } from "./process-operation";
import { processOperator } from "./process-operator";

export const TOKENS = {
    "+": (token: string, input: string) => processOperator(input)(token),
    "-": (token: string, input: string) => processOperator(input)(token),
    "*": (token: string, input: string) => processOperator(input)(token),
    "/": (token: string, input: string) => processOperator(input)(token),
    "=": (_token: string, input: string) => processOperation(input),
    "1": (token: string) => state.input += token,
    "2": (token: string) => state.input += token,
    "3": (token: string) => state.input += token,
    "4": (token: string) => state.input += token,
    "5": (token: string) => state.input += token,
    "6": (token: string) => state.input += token,
    "7": (token: string) => state.input += token,
    "8": (token: string) => state.input += token,
    "9": (token: string) => state.input += token,
    ".": (token: string) => {
        if (!state.input.includes('.')) {
            state.input += token;
        }
    },
    "del": (_token: string) => {
        const input = state.input.slice(0, -1);
        state.input = input;
    },
    "reset": (_token: string) => {
        state.reset();
    }
} as const;