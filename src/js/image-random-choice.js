const randomNumber = Math.floor(Math.random() * 2);

let imageElement = document.querySelector('#banner-image');

if (imageElement) {
    replaceUrl();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        imageElement = document.querySelector('#banner-image');
        replaceUrl();
    })
}

function replaceUrl() {
    imageElement.src = randomNumber === 0 ? '/assets/images/launch_website/banner-1.png' : '/assets/images/launch_website/banner-2.png';
}
