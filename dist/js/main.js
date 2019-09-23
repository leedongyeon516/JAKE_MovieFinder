document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("go-to-btn");
  const home = document.getElementById("home");

  const timeLine1 = new TimelineMax();
  timeLine1
    .from(".title", 1.5, { y: 200, ease: Power3.easeInOut })
    .from("nav", 0.5, { y: 30, autoAlpha: 0, ease: Power3.easeInOut }, "-=1.5")
    .from(
      ".go-to-btn",
      1,
      { width: "0%", autoAlpha: 0, ease: Power3.easeInOut },
      "-=1"
    );

  nav.addEventListener("click", () => {
    let timeLine2 = new TimelineMax();
    timeLine2
      .set(".grid", { display: "grid" })
      .to(".background-top img", 2, {
        y: -450,
        scale: 1.1,
        ease: Expo.easeInOut
      })
      .to(".background-bottom", 2, { y: -600, ease: Expo.easeInOut }, "-=2")
      .to(".go-to-btn", 2, { width: "0%", ease: Expo.easeInOut }, "-=2")
      .to("nav", 2, { color: "#fff" }, "-=2")
      .to(".slider", 1, { autoAlpha: 1, ease: Expo.easeInOut }, "-=1");

    home.addEventListener("click", () => {
      timeLine2.reverse();
    });
  });
});

const slides = document.querySelectorAll(".slider");
let automatic = true;
const interval = 3000;
const slide1 = document.querySelector(".slide-1");
const slide5 = document.querySelector(".slide-5");

const prevSlide = () => {
  const active = document.querySelector(".active");

  active.classList.remove("active");

  if (active !== slide1) {
    active.previousElementSibling.classList.add("active");
  } else {
    slide5.classList.add("active");
  }

  setTimeout(() => {
    active.classList.remove("active");
  }, 200);
};

const nextSlide = () => {
  const active = document.querySelector(".active");

  active.classList.remove("active");

  if (active.nextElementSibling !== slide5) {
    active.nextElementSibling.classList.add("active");
  } else {
    slide1.classList.add("active");
  }

  setTimeout(() => {
    active.classList.remove("active");
  }, 200);
};

if (automatic) {
  slideInterval = setInterval(nextSlide, interval);
}
