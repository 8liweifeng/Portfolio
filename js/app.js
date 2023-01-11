//alert("Hello!");

const header = document.querySelector("header");
const first_skill = document.querySelector(".skill:first-child")
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skill svg circle");

window.addEventListener("scroll", ()=> {
    if (!skillsPlayed) skillsCounter();
})


function stickyNavbar() {
    
    header.classList.toggle("scrolled", window.pageYOffset>0);

}
stickyNavbar();
window.addEventListener("scroll",stickyNavbar);

/* --------- Reveal Animation --------- */ // I do not know why it can not work
let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay:600});
sr.reveal(".showcase-image", {origin: "top", delay: 700});
// I have solved this unshown problem, by setting <script src="app.js"><> after all the element
// reason : because if the script is loaded before the element is rendered, we will get null

/* ------------------ Skills Progress Bar Animation --------------------- */
function hasReached(el) {
    if (!el) return
    let topPosition = el.getBoundingClientRect().top;
    //getBoundingClientRect() method returns a DOMRect object 
    //providing information about the size of an element and its position 
    //relative to the viewport.
    //DOMRect the size and position of a rectangle.
    //Returns a reference to the topmost window in the window hierarchy.
    if (window.innerHeight>=topPosition+el.offsetHeight) {
        return true;
    } 
    return false;
    
}


function updateCount(num, maxNum) {
    let currentNum = +num.innerText;

    if (currentNum<maxNum) {
        num.innerText=currentNum+1;
        setTimeout(()=> {
            updateCount(num,maxNum);
        }, 12);
    }
}

let skillsPlayed = false;
function skillsCounter() {
     if (!hasReached(first_skill)) return;
     skillsPlayed = true;
    sk_counters.forEach((counter,i)=> {
        
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427*(target /100);
        progress_bars[i].style.setProperty("--target",strokeValue);

        setTimeout(() => {
            updateCount(counter,target);
        },400);
    })
    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
        );

       
}
