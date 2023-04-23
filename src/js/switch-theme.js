function switchTheme(isDark) {
    const imageElement = document.querySelector('.example__image');
    const bgUrl = isDark ? './assets/images/employers/candidates-ex-dark.png' : './assets/images/employers/candidates-ex.png';
    imageElement.style.backgroundImage = `url(${bgUrl})`;
}
