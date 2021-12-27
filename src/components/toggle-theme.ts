export class ToggleTheme {
    toggleSwitch: HTMLButtonElement = document.querySelector('.toggle__btn')!;
    toggleDiv: HTMLDivElement = document.querySelector('.toggle__background')!;

    constructor() {
        this.toggleSwitch.addEventListener(
            'click',
            this.switchTheme.bind(this),
        );
    }

    switchTheme(): void {
        if (this.toggleDiv.classList.contains('toggle__btn--2')) {
            this.toggleDiv.classList.remove('toggle__btn--2');
            document.documentElement.setAttribute('data-theme', 'dark');
            this.toggleSwitch.classList.add('toggle__btn--3');
            return;
        }

        if (this.toggleSwitch.classList.contains('toggle__btn--3')) {
            document.documentElement.removeAttribute('data-theme');
            this.toggleSwitch.classList.remove('toggle__btn--3');
            return;
        }

        this.toggleDiv.classList.add('toggle__btn--2');
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
