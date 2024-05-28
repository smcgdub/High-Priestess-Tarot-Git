// Scroll to top button JS code
window.onscroll = function () {
  scrollFunction()
};

// Scroll to top button
function scrollFunction() {
  var scrollToTopButton = document.getElementById("scrollToTopButton");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Animate on scroll JS
AOS.init();