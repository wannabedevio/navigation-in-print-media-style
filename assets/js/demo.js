/**
 * demo.js
 *
 * Licensed under the MIT license.
 * https://opensource.org/license/mit/
 * 
 * Copyright 2023, WANNABEDEV
 * https://wannabedev.io
 */

// Initialize GSAP timelines and elements
const tl = gsap.timeline({ paused: true, reversed: true });
const tlContent = gsap.timeline();
const hamburger = document.getElementById('hamburger');
const link = document.querySelector('h2 a');
const product = document.querySelectorAll('.product');
const body = document.body;

// FadeIn body content on load
tlContent.to(body, { duration: 1, opacity: 1, visibility: 'visible' });

// Navigation animation for '.product' elements
tl.to(product, {
  duration: 0.75,
  ease: 'power4.out',
  stagger: -0.125,
  transformOrigin: 'right top',
  x: (index, target) => target.dataset.index * 64,
  y: (index, target) => target.dataset.index * 6,
  rotation: (index, target) => target.dataset.index * -2
});

// Play content animation on DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => tlContent.play());

// Toggle navigation menu on hamburger click
hamburger.addEventListener('click', () => {
  tl.reversed() ? tl.play() : tl.reverse();
  hamburger.classList.toggle('active');
});

// Link click event for page transition animation
link.addEventListener('click', function linkClicked(event) {
  // Prevent default click event across multiple browsers
  event.preventDefault();

  // Get the target href
  const thisHref = this.getAttribute('href');

  // Reverse the main timeline and fade out body
  tl.reverse().timeScale(2);
  gsap.to(body, { duration: 1, opacity: 0, onComplete: () => window.location = thisHref, onCompleteParams: [thisHref], delay: 2.5 });
});
