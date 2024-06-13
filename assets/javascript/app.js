// Attach an event handler to the window's scroll event
window.onscroll = function () {
  // Call the scrollFunction whenever a scroll event occurs
  scrollFunction()
};

// Define the scrollFunction
function scrollFunction() {
  // Get the scrollToTopButton element from the DOM
  var scrollToTopButton = document.getElementById("scrollToTopButton");
  // Check if the scroll position of the body or the documentElement (html) is more than 20
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // If it is, display the scrollToTopButton
    scrollToTopButton.style.display = "block";
  } else {
    // If it's not, hide the scrollToTopButton
    scrollToTopButton.style.display = "none";
  }
}

// Define the scrollToTop function
function scrollToTop() {
  // Scroll to the top of the window smoothly
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Initialize the Animate On Scroll library
AOS.init();