const accordionItems = document.getElementsByClassName("accordion__item");

for (let i = 0; i < accordionItems.length; i++) {
    accordionItems[i].addEventListener("click", function () {
        this.classList.toggle("accordion__item--active");
    });
}
