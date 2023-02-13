

const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child")
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skill svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".numbers span");


const prt_section = document.querySelector('.portfolio');
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".image img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");

window.addEventListener("scroll", ()=> {
    activeLink();
    if (!skillsPlayed) skillsCounter();
    if (!mlPlayed) mlCounter();
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
        }, 25);
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

/* ------------------ Services Animation --------------------- */
let mlPlayed = false;

function mlCounter() {
    let mlPlayed = true;
    if (!hasReached(ml_section)) return;
   
    ml_counters.forEach((counter,i)=> { 
      let target = counter.dataset.target;
      setTimeout(() => {
        updateCount(counter,target);
    },400);
      
});

}


/* ------------------ portfolio filter Animation --------------------- */
var mixer = mixitup('.portfolio-gallery',{
    selectors: {
        target: '.prt-card'
    },
    animation: {
        duration: 1500
    }
});

/* ------------------ modal pop up Animation --------------------- */
let currentIndex = 0;

zoom_icons.forEach((icn,i) => icn.addEventListener("click",()=> {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
}));

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
})

prev_btn.addEventListener("click", ()=> {
    if (currentIndex===0) {
        currentIndex=5;
    } else{
    currentIndex--;}
    changeImage(currentIndex);
});


next_btn.addEventListener("click", ()=> {
    if (currentIndex===5) {
        currentIndex=0;
    } else{
    currentIndex++;}
    
    changeImage(currentIndex);
});

function changeImage(index) {
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");

}

/* ------------------ testinomial Animation --------------------- */

const swiper = new Swiper('.swiper', {
    // Optional parameters
    //direction: 'vertical',
    loop: true,
    speed: 500,
    autoplay: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

  });

/* ------------------ change active link Animation --------------------- */

function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    //after adding [id], we could only select sections with id
    let passedSections = Array.from(sections).map((scr,i) => {
        return {y:scr.getBoundingClientRect().top - header.offsetHeight,
            id:i
        }
    }).filter((scr)=> scr.y<=0);

    let currSectionID = passedSections.at(-1).id;
    links.forEach(l => l.classList.remove("active"));
    links[currSectionID].classList.add("active");

}



/* ------------------ change the color of the link --------------------- */
let firstTheme = localStorage.getItem("dark");
changeTheme(+firstTheme);

function changeTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon","uil-sun");
        localStorage.setItem("dark", 1);
    } else {
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun","uil-moon");
        localStorage.setItem("dark", 0);
    }
}

toggle_btn.addEventListener(("click"), ()=> {
    changeTheme(!document.body.classList.contains("dark"));
})


/* ------------------ open & close navbar menu --------------------- */

hamburger.addEventListener(("click"), ()=> {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
})

links.forEach(link => link.addEventListener(("click"), ()=> {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
}))

