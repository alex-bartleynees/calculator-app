import { state } from '../state/calculator-state';
import { TOKENS } from '../utils/tokens';

export class UserInput {
    keys: HTMLDivElement = document.querySelector('.calculator__keys')!;

    constructor() {
        this.keys.addEventListener('click', (e) => {
            if ((e.target as Element).matches('button')) {
                this.parseInput(e);
            }
        });
    }

    parseInput(e: MouseEvent) {
        const value = (e.target as HTMLButtonElement).dataset.value;
        if (value) {
            TOKENS[value as keyof typeof TOKENS](value, state.input);
        }
    }
}
