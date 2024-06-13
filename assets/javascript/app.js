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


// * 3x card reading JS code start 
document.addEventListener('DOMContentLoaded', (event) => {

  // variables
  let deck = [];
  let drawCount = 0;

  // Function to adjust card image height
  function adjustCardImageHeight() {
    const cardImages = document.querySelectorAll('.img-fluid.rounded-start');
    cardImages.forEach(cardImage => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        cardImage.style.height = "200px";
      } else {
        cardImage.style.height = "auto";
      }
    });
  }

  // function adjustCardImageHeight() {
  //   const cardImages = document.querySelectorAll('.img-fluid.rounded-start');
  //   const cardTexts = document.querySelectorAll('.card-text.text-sm-center.text-md-start');

  //   cardImages.forEach(cardImage => {
  //     if (window.matchMedia("(min-width: 768px)").matches) {
  //       cardImage.style.height = "200px";
  //     } else {
  //       cardImage.style.height = "auto";
  //     }
  //   });

  //   cardTexts.forEach(cardText => {
  //     if (window.matchMedia("(min-width: 768px)").matches) {
  //       cardText.classList.remove('text-md-start');
  //       cardText.classList.add('text-sm-center');
  //     } else {
  //       cardText.classList.add('text-sm-center');
  //     }
  //   });

  // }

  // Add event listener for window resize
  window.addEventListener('resize', adjustCardImageHeight);

  // Fetch the tarot card meanings from the JSON file
  fetch('tarot-card-meanings-2021.json')
    .then(response => {
      // If the response is not ok (status is not in the range 200-299), throw an error
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // If the response is ok, parse the response body as JSON
      return response.json();
    })
    .then(data => {
      // Assign the fetched data to the deck variable
      deck = data;
      // Shuffle the deck
      shuffleDeck();
    })
    .catch(error => {
      // If there is an error (either in the fetch or in the then blocks), log it to the console
      console.error('There has been a problem with your fetch operation:', error);
    });

  // Reset the reading function
  function resetReading() {
    // Reset the draw count
    drawCount = 0;

    // Clear the drawn cards
    document.getElementById('cardContainer').innerHTML = '';

    // Hide the contact message
    document.getElementById('contact-message').style.display = 'none';

    // Fetch the deck again
    fetch('tarot-card-meanings-2021.json')

      // Parse the JSON data
      .then(response => response.json())

      // Assign the fetched data to the deck variable
      .then(data => {
        deck = data; // Assign the fetched data to the deck variable

        // Shuffle the deck
        shuffleDeck();
      });

    // Enable the draw button
    document.getElementById('drawButton').disabled = false;

    // Reset the button text
    document.getElementById('drawButton').textContent = 'Draw Card';
  }

  // Shuffle the deck function
  function shuffleDeck() {

    // Shuffle the deck
    for (let i = deck.length - 1; i > 0; i--) {

      // Generate a random number between 0 and i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap the cards at positions i and j
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  // Draw a card function
  function drawCard() {
    // If the deck is empty or the draw count is 3, disable the draw button
    if (deck.length === 0 || drawCount >= 3) {
      // Disable the draw button
      document.getElementById('drawButton').disabled = true;
      // Return from the function
      return;
    }

    // Pop a card from the deck
    const card = deck.pop();

    // Create new card structure
    // Create a new div element for the card
    const cardElement = document.createElement('div');

    // Add Bootstrap classes to the card element for styling
    cardElement.className = "card mb-3";

    // Set the maximum width of the card to 80% of its parent element
    cardElement.style.maxWidth = "80%";

    // Center the card horizontally within its parent element
    cardElement.style.margin = "auto";

    // Create a new div element for the row within the card
    const row = document.createElement('div');

    // Add Bootstrap classes to the row element for styling
    row.className = "row g-0";

    // Append the row element to the card element
    cardElement.appendChild(row);

    // Create a new div element for the image column within the row
    const imgCol = document.createElement('div');

    // Add Bootstrap classes to the image column element for styling
    imgCol.className = "col-md-3";

    // Append the image column element to the row element
    row.appendChild(imgCol);

    // Create a new img element for the card image
    const cardImage = document.createElement('img');

    // Add Bootstrap classes to the card image for styling
    cardImage.className = "img-fluid rounded-start";

    // Set the height of the card image to 200px
    cardImage.style.height = "200px";

    adjustCardImageHeight();

    // Set the source of the card image to the image URL from the card data
    cardImage.src = card.image;

    // Append the card image to the image column
    imgCol.appendChild(cardImage);

    // Create a new div element for the text column within the row
    const textCol = document.createElement('div');

    // Add Bootstrap classes to the text column for styling and alignment
    textCol.className = "col-md-9 d-flex align-items-center";

    // Append the text column to the row
    row.appendChild(textCol);

    // Create a new div element for the card body within the text column
    const cardBody = document.createElement('div');

    // Add Bootstrap class to the card body for styling
    cardBody.className = "card-body";

    // Append the card body to the text column
    textCol.appendChild(cardBody);

    // Create a new h5 element for the card title within the card body
    const cardTitle = document.createElement('h5');

    // Add Bootstrap class to the card title for styling
    cardTitle.className = "card-title";

    // Add the titles for each card
    // Initialize an array of card titles
    const titles = ['The Past', 'The Present', 'The Future'];

    // Set the text content of the card title to the corresponding title from the titles array and the Tarot card name
    cardTitle.textContent = titles[drawCount] + ":  " + card.Tarot_card;

    // Append the card title to the card body
    cardBody.appendChild(cardTitle);

    // Create a new paragraph element for the card description
    const cardDescription = document.createElement('p');

    // Add Bootstrap class to the card description for styling
    cardDescription.className = "card-text";

    // Set the text content of the card description to the message from the card data
    cardDescription.textContent = card.Message;

    // Append the card description to the card body
    cardBody.appendChild(cardDescription);

    // Create a new paragraph element for additional card text
    const cardText = document.createElement('p');

    // Add Bootstrap class to the additional card text for styling
    cardText.className = "card-text";

    // Append the additional card text to the card body
    cardBody.appendChild(cardText);

    // Append the card element to the card container
    document.getElementById('cardContainer').appendChild(cardElement);

    // Increment the draw count
    drawCount++;

    // Update the text content of the draw button to reflect the current draw count
    document.getElementById('drawButton').textContent = `Draw Card (x${drawCount})`;

    // If the draw count is 3, display the contact message
    if (drawCount === 3) {
      document.getElementById('contact-message').style.display = 'block';
    }
  }

  // Add event listeners to the draw and reset buttons
  shuffleDeck();
  document.getElementById('drawButton').addEventListener('click', drawCard);
  document.getElementById('resetButton').addEventListener('click', resetReading);
});
// * 3x card reading JS code end