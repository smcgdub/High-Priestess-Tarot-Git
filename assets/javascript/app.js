// *Attach an event handler to the window's scroll event
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

// *Initialize the Animate On Scroll library
AOS.init();

// *Cards from JSON page JS code start
// Function to adjust card image height
function adjustCardImageHeight() {
  // Select all images with the classes 'img-fluid' and 'rounded-start'
  const cardImages = document.querySelectorAll('.img-fluid.rounded-start');
  // Iterate over each selected image
  cardImages.forEach(cardImage => {
    // Check if the viewport is at least 768px wide
    if (window.matchMedia("(min-width: 768px)").matches) {
      // If it is, set the height of the image to 200px
      cardImage.style.height = "200px";
    } else {
      // If it's not, set the height of the image to auto
      cardImage.style.height = "auto";
    }
  });
}

// Define a function to center the text on a card
function centerTextOnCard() {
  // Select all elements with the class 'card-title' and 'card-text' that are inside an element with the class 'card-body'
  const cardTexts = document.querySelectorAll('.card-body .card-title, .card-body .card-text');
  // Iterate over each selected element
  cardTexts.forEach(cardText => {
    // Check if the viewport is at least 768px wide
    if (window.matchMedia("(min-width: 768px)").matches) {
      // If it is, add the class 'text-start' to the element and remove the class 'text-center'
      cardText.classList.add('text-start');
      cardText.classList.remove('text-center');
    } else {
      // If it's not, add the class 'text-center' to the element and remove the class 'text-start'
      cardText.classList.add('text-center');
      cardText.classList.remove('text-start');
    }
  });
}

// Add an event listener to the window object that triggers when the page finishes loading
window.onload = function () {

  // Declare a variable 'cards' and initialize it as an empty array
  let cards = [];

  // Declare a variable 'cardsContainer' and assign it the element with the id 'cardsContainer'
  let cardsContainer = document.getElementById('cardsContainer');

  // Fetch the JSON data from the file 'tarot-card-meanings-2021.json'
  fetch('tarot-card-meanings-2021.json')
    // When the response is received, convert it to JSON
    .then(response => response.json())
    // When the JSON data is available, execute this function
    .then(data => {
      // Assign the JSON data to the variable 'cards'
      cards = data;

      // Call the function 'updateDisplayedCards' with 'cards' as the argument to display all the cards initially
      updateDisplayedCards(cards);
      // Call the function 'adjustCardImageHeight' to adjust the height of the card images after displaying the cards
      adjustCardImageHeight();
      // Call the function 'centerTextOnCard' to center the text on the cards

      // Get the input element with the id 'tarot-card-search' and assign it to the variable 'input'
      let input = document.getElementById('tarot-card-search');

      // Add an event listener to the 'input' element that triggers when the user types in it
      input.addEventListener('input', function () {
        // Get the current value of the 'input' field, sanitize it, convert it to lower case, and assign it to the variable 'searchValue'
        let searchValue = sanitizeInput(this.value.toLowerCase());

        // Filter the 'cards' array to only include cards whose 'Tarot_card' property includes the 'searchValue', and assign the result to the variable 'filteredCards'
        let filteredCards = cards.filter(card =>
          card.Tarot_card.toLowerCase().includes(searchValue)
        );

        // Call the function 'updateDisplayedCards' with 'filteredCards' as the argument to update the displayed cards
        updateDisplayedCards(filteredCards);
      });
    })
    // If an error occurs during the fetch, execute this function
    .catch(error => {
      // Log the error to the console
      console.error('Error:', error);
      // Set the text content of the 'cardsContainer' to an error message
      cardsContainer.textContent = 'An error occurred while loading the cards. Please try again later.';
    });

  // Function to update the displayed cards
  function updateDisplayedCards(cards) {
    // Clear the cardsContainer
    cardsContainer.innerHTML = '';

    // Iterate over each card in the cards array
    cards.forEach(function (card) {
      // Create a new div element for the card
      let cardElement = document.createElement('div');
      // Add the class 'card mb-3' to the card element
      cardElement.className = "card mb-3";

      // Create a new div element for the row
      let row = document.createElement('div');
      // Add the class 'row g-0' to the row element
      row.className = "row g-0";

      // Create a new div element for the image column
      let imgCol = document.createElement('div');
      // Add the class 'col-md-2' to the image column element
      imgCol.className = "col-md-2";

      // Create a new img element for the card image
      let cardImage = document.createElement('img');
      // Set the source of the card image to the image property of the card
      cardImage.src = card.image;
      // Add the class 'img-fluid rounded-start' to the card image element
      cardImage.className = "img-fluid rounded-start";
      // Set the alt attribute of the card image to the Tarot_card property of the card
      cardImage.alt = card.Tarot_card;

      // Append the card image to the image column
      imgCol.appendChild(cardImage);

      // Create a new div element for the text column
      let textCol = document.createElement('div');
      // Add the class 'col-md-9 d-flex align-items-center' to the text column element
      textCol.className = "col-md-9 d-flex align-items-center";

      // Create a new div element for the card body
      let cardBody = document.createElement('div');
      // Add the class 'card-body' to the card body element
      cardBody.className = "card-body";

      // Create a new h5 element for the card title
      let cardTitle = document.createElement('h5');
      // Add the class 'card-title' to the card title element
      cardTitle.className = "card-title";
      // Set the text content of the card title to the Tarot_card property of the card
      cardTitle.textContent = card.Tarot_card;

      // Create a new p element for the card description
      let cardDescription = document.createElement('p');
      // Add the class 'card-text' to the card description element
      cardDescription.className = "card-text";
      // Set the text content of the card description to the Message property of the card
      cardDescription.textContent = card.Message;

      // Create a new p element for the card text
      let cardText = document.createElement('p');
      // Add the class 'card-text' to the card text element
      cardText.className = "card-text";
      // Create a new small element for the small text
      let smallText = document.createElement('small');
      // Add the class 'text-body-secondary' to the small text element
      smallText.className = "text-body-secondary";
      // Append the small text to the card text
      cardText.appendChild(smallText);

      // Append the card title, card description, and card text to the card body
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardDescription);
      cardBody.appendChild(cardText);

      // Append the card body to the text column
      textCol.appendChild(cardBody);

      // Append the image column and text column to the row
      row.appendChild(imgCol);
      row.appendChild(textCol);

      // Append the row to the card element
      cardElement.appendChild(row);

      // Append the card element to the cardsContainer
      cardsContainer.appendChild(cardElement);
    });

    // After adding all the cards to the container, adjust their image height
    adjustCardImageHeight();
    centerTextOnCard();
  }

  // Define a function to sanitize the input
  function sanitizeInput(input) {
    // Replace any character that is not a word character (a-z, A-Z, 0-9, _) or a whitespace character (space, tab, line break) with nothing
    // The 'g' flag is for global search, which means find all matches rather than stopping after the first match
    // The 'i' flag is for case insensitive search
    return input.replace(/[^\w\s]/gi, '');
  }
};

// Call adjustCardImageHeight and centerTextOnCard functions every time the window is resized
window.addEventListener('resize', function () {
  adjustCardImageHeight();
  centerTextOnCard(); // Call the function here
});
// *Cards from JSON page JS code end