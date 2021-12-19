const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e: Event) {
    const isChecked = (<HTMLInputElement>e.target).checked;
    if (isChecked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

toggleSwitch?.addEventListener('change', switchTheme, false);
