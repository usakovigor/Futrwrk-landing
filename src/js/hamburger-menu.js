const hamburgerElement = document.getElementById('hamburger');

hamburgerElement.addEventListener('click', () => {
    hamburgerElement.classList.toggle('hamburger--active');
})
