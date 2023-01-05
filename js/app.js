//alert("Hello!");

const header = document.querySelector("header");

function stickyNavbar() {
    console.log(window.pageYOffset)
    header.classList.toggle("scrolled", window.pageYOffset>100);

}
stickyNavbar();
window.addEventListener("scroll",stickyNavbar);