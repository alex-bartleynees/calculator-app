export class RenderInput {
    input: HTMLInputElement = document.querySelector('input')!;

    setInput(input: string) {
        const inputCommas = input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (this.input) {
        this.input.value = inputCommas;
        }
    }
}

export const render = new RenderInput();
