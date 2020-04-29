document.querySelector('#read-more').addEventListener('click', event => {
  document.querySelector('#about').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
})

const text = document.querySelector('#text')
top = text.style.top

document.addEventListener('scroll', event => {
  if (window.scrollY > 10) {
    document.querySelector('header').style.opacity = 1
  } else {
    document.querySelector('header').style.opacity = 0
  }

  document.querySelector('#text').style.top = 0
})