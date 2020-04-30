import './concert-entry.js'

const about = document.querySelector('#about')
const header = document.querySelector('header')
const text = document.querySelector('#text')
const information = document.querySelector('#nextInformation')
const toTop = document.querySelector('#toTop')
const intro = document.querySelector('#intro')

document.querySelector('#read-more').addEventListener('click', event => {
  about.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
})

document.addEventListener('scroll', event => {
  // Reveal header.
/*   if (window.scrollY > 10) {
    header.style.opacity = 1
  } else {
    header.style.opacity = 0
  } */

  // Reveal toTop button.
  if (window.scrollY > 67) {
    toTop.style.opacity = 1;
  } else {
    toTop.style.opacity = 0;
  }

  if (information.getBoundingClientRect().top < 0) {
    text.style.opacity = 0;
  } else {
    text.style.opacity = 1;
  }
})

toTop.addEventListener('click', event => {
  intro.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
})