var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
function switchTheme(e) {
    var isChecked = e.target.checked;
    if (isChecked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
toggleSwitch === null || toggleSwitch === void 0 ? void 0 : toggleSwitch.addEventListener('change', switchTheme, false);
