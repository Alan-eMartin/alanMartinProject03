/* eslint-disable */
// nameSpacing Object
const memoryApp = {};

memoryApp.cards = [
  {
    name: 'one',
    image: './card-assets/cardOne.jpg',
    alt: 'Cartoon Aloe Vera',
  },

  {
    name: 'one',
    image: './card-assets/cardOne.jpg',
    alt: 'Cartoon Aloe Vera',
  },

  {
    name: 'two',
    image: './card-assets/cardTwo.jpg',
    alt: 'Cartoon Echeveria elegans - aka Mexican Snowball',
  },

  {
    name: 'two',
    image: './card-assets/cardTwo.jpg',
    alt: 'Cartoon Echeveria elegans - aka Mexican Snowball',
  },

  {
    name: 'three',
    image: './card-assets/cardThree.jpg',
    alt: 'Cartoon Parodia cactus',
  },

  {
    name: 'three',
    image: './card-assets/cardThree.jpg',
    alt: 'Cartoon Parodia cactus',
  },

  {
    name: 'four',
    image: './card-assets/cardFour.jpg',
    alt: 'Cartoon Saguaro Cactus',
  },

  {
    name: 'four',
    image: './card-assets/cardFour.jpg',
    alt: 'Cartoon Saguaro Cactus',
  },

  {
    name: 'five',
    image: './card-assets/cardFive.jpg',
    alt: 'Cartoon Snake Plant',
  },

  {
    name: 'five',
    image: './card-assets/cardFive.jpg',
    alt: 'Cartoon Snake Plant',
  },

  {
    name: 'six',
    image: './card-assets/cardSix.jpg',
    alt: 'Cartoon Barbary Fig',
  },

  {
    name: 'six',
    image: './card-assets/cardSix.jpg',
    alt: 'Cartoon Barbary Fig',
  },

  {
    name: 'seven',
    image: './card-assets/cardSeven.jpg',
    alt: 'Cartoon Pilosocereus Cactus',
  },

  {
    name: 'seven',
    image: './card-assets/cardSeven.jpg',
    alt: 'Cartoon Pilosocereus Cactus',
  },

  {
    name: 'eight',
    image: './card-assets/cardEight.jpg',
    alt: 'Cartoon Prickly Pear Cactus',
  },

  {
    name: 'eight',
    image: './card-assets/cardEight.jpg',
    alt: 'Cartoon Prickly Pear Cactus',
  },
];

// Global Variables

memoryApp.startButton = $('.startButton'); // header start button
memoryApp.cardContainer = $('.cardContainer'); // memory card container
memoryApp.memoryCard = $('.memoryCard'); // memory cards
memoryApp.firstCard = null; // first selected card variable
memoryApp.secondCard = null; // second selected card variable
memoryApp.hasFlippedCard = false; // has card flipped boolean
memoryApp.lockBoard = false; // lock board for preventing multiclicks boolean
memoryApp.matchCount = 0; // variable for counting matches

// init function
memoryApp.init = function() {
  // let's play button event listener
  $(memoryApp.startButton).on('click', memoryApp.playGame);
  // deals cards to gameboard / card container
  memoryApp.dealCards();
  // flips memory cards on user click
  $('.memoryCard')
    .on('click', memoryApp.flipCard)
    .keypress('enter', memoryApp.flipCard);
};

// 1. start game with click of button, slide header up and show gameBoard, and instructions

memoryApp.playGame = function() {
  memoryApp.disableStartButton();
  $('header').slideUp(1000);
  $('.gameBoard').toggleClass('hide');
  setTimeout(() => {
    Swal.fire({
      title: 'Instructions',
      text: 'Help all the cacti find their friends and return to the terrarium!',
      icon: '',
      confirmButtonText: 'Play Game ',
    });
  }, 1000);
};

// disables multi-clicking of start button, to prevent over-population of cards
memoryApp.disableStartButton = function() {
  $(memoryApp.startButton).off('click');
};

// 2. shuffles cards and creates a randomized card array loop (Fisher–Yates shuffle algorithm)

memoryApp.shuffleCards = function(array) {
  let newPos;
  let temp;

  for (let i = array.length - 1; i > 0; i--) {
    newPos = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[newPos];
    array[newPos] = temp;
  }
  return array;
};

// 3. create a new array of random cards from the "for" loop, and store them into a new variable of randomizedCards, use that new array to append the array / object information into the DOM, into a div of card container, when user clicks lets play.
memoryApp.randomizedCards = memoryApp.shuffleCards(memoryApp.cards);

memoryApp.dealCards = () => {
  memoryApp.randomizedCards.forEach(card => {
    $(memoryApp.cardContainer).append(`
    <div class="memoryCard" data-card="${card.name}" tabindex="0">
      <img src="./card-assets/cardBack.jpg" alt="cactus pattern" class="backFace" aria-label="You may select  this memory card">
      <img src="${card.image}" alt="${card.alt}" class="frontFace">
    </div>`);
  });
};

// 4. When player clicks on card, the div of memoryCard adds a class of flip. The function will count the number of click, allowing only two cards to be chosen at a time.

memoryApp.flipCard = function() {
  if (memoryApp.lockBoard) return;
  // prevent double click
  if (this === memoryApp.firstCard) return;

  $(this).toggleClass('flip');

  if (!memoryApp.hasFlippedCard) {
    // first click
    memoryApp.hasFlippedCard = true;
    memoryApp.firstCard = this;
  } else {
    // second click
    memoryApp.hasFlippedCard = false;
    memoryApp.secondCard = this;
    // check for match
    memoryApp.isMatched();
  }
};

// 5. function checks for match using an if statement, the if statement checks to see if cards have matching data values
memoryApp.isMatched = function() {
  if (memoryApp.firstCard.dataset.card === memoryApp.secondCard.dataset.card) {
    // if cards match, remove event listeners
    memoryApp.disableCards();
    memoryApp.matchCount++;
    // if all eight matches found show you one alert
    if (memoryApp.matchCount === 8) {
      memoryApp.gameOver();
    }
  } else {
    // if not matched, remove class of flip
    memoryApp.unflipCards();
  }
};

// 6. disables cards from being clicked when they are matched.
memoryApp.disableCards = function() {
  $(memoryApp.firstCard).off('click keypress', memoryApp.flipCard);
  $(memoryApp.secondCard).off('click keypress', memoryApp.flipCard);
};

// 7. flip cards back over if no match is found
memoryApp.unflipCards = function() {
  memoryApp.lockBoard = true;
  // timeout allows cards to be flipped fully before event listener is removed
  setTimeout(() => {
    $(memoryApp.firstCard).toggleClass('flip');
    $(memoryApp.secondCard).toggleClass('flip');

    memoryApp.lockBoard = false;
  }, 800);
};

// 8. when all cards are matched, message comes up and asks player if they would like to try again. On click the page is reloaded.
memoryApp.gameOver = function() {
  Swal.fire({
    title: 'You did it!!',
    text: 'All the cacti have returned safely to the terrarium!',
    icon: '',
    confirmButtonText: 'Try Again?', 
  });
  // make-shift idea to prevent page reload from firing- note I tried ".this" and that did not work, this was the only thing I could do, will come back and edit for portfolio.
  setTimeout(() => {
    $(document).click(function () {
      location.reload();
    });
  })
};

// document ready
$(function() {
  memoryApp.init();
});
