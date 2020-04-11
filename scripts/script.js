/* eslint-disable */

// nameSpacing Object
const memoryApp = {};

memoryApp.cards = [
  {
    name: 'one',
    image: './card-assets/cardOne.jpg',
  },

  {
    name: 'one',
    image: './card-assets/cardOne.jpg',
  },

  {
    name: 'two',
    image: './card-assets/cardTwo.jpg',
  },

  {
    name: 'two',
    image: './card-assets/cardTwo.jpg',
  },

  {
    name: 'three',
    image: './card-assets/cardThree.jpg',
  },

  {
    name: 'three',
    image: './card-assets/cardThree.jpg',
  },

  {
    name: 'four',
    image: './card-assets/cardFour.jpg',
  },

  {
    name: 'four',
    image: './card-assets/cardFour.jpg',
  },

  {
    name: 'five',
    image: './card-assets/cardFive.jpg',
  },

  {
    name: 'five',
    image: './card-assets/cardFive.jpg',
  },

  {
    name: 'six',
    image: './card-assets/cardSix.jpg',
  },

  {
    name: 'six',
    image: './card-assets/cardSix.jpg',
  },

  {
    name: 'seven',
    image: './card-assets/cardSeven.jpg',
  },

  {
    name: 'seven',
    image: './card-assets/cardSeven.jpg',
  },

  {
    name: 'eight',
    image: './card-assets/cardEight.jpg',
  },

  {
    name: 'eight',
    image: './card-assets/cardEight.jpg',
  },
];

// Global Variables

memoryApp.startButton = $('.startButton'); // header start button
memoryApp.cardContainer = $('.cardContainer'); // div that holds memory cards
memoryApp.memoryCard = $('.memoryCard'); //memory cards
memoryApp.firstCard = null;
memoryApp.secondCard = null;
memoryApp.hasFlippedCard= null;


// init function

memoryApp.init = () => {
  // lets play button
  $(memoryApp.startButton).on('click', memoryApp.playGame);
  // deals cards to gameboard / card container
  memoryApp.dealCards();
  // flips memory cards on user click
  $('.memoryCard').on('click', memoryApp.flipCard)
    .keypress('enter', memoryApp.flipCard)
  
};

// 1. start game with click of button, slide header up and show gameBoard, and instructions

memoryApp.playGame = () => {

  $('header').slideUp(1000);
  $('.gameBoard').toggleClass('hide');
  setTimeout(() => {
    Swal.fire({
      title: 'Instructions',
      text: 'Help all the cacti find their friends and return to the terraium!',
      icon: '',
      confirmButtonText: 'Cool',
    });
  }, 1000);
  // call dealCards / deals cards
};

// 2. shuffle cards and append them to the dom in the cardsContainer using a for loop, using Fisher–Yates shuffle algorithm.

memoryApp.shuffleCards = (array) => {
  let newPos;
  let temp;

  for (let i = array.length - 1; i > 0; i--) {
    newPos = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[newPos];
    array[newPos] = temp
  }
  return array;
};

// 3. create a new array of random cards from the for loop, and store them into a new variable of randomizedCards, use that new array to append the array/ object information into the DOM, into a div of card container, when user clicks lets play.
memoryApp.randomizedCards = memoryApp.shuffleCards(memoryApp.cards);

memoryApp.dealCards = () => {

  memoryApp.randomizedCards.forEach((card) => {
    $(memoryApp.cardContainer).append(`
    <div class="memoryCard" data-card="${card.name}" tabindex="0">
      <img src="./card-assets/cardBack.jpg" alt="cactus pattern" class="backFace">
      <img src="${card.image}" alt="cactus graphic" class="frontFace" >
    </div>`
    )
  })
};

// 4. When player clicks on card, the div of memoryCard adds a class of flip. The function will count the number of click, allowing only two cards to be chosen at a time.

memoryApp.flipCard = function() {
  $(this).toggleClass('flip');

  if(!memoryApp.hasFlippedCard) {
    //first click
    memoryApp.hasFlippedCard = true;
    memoryApp.firstCard = this;
  } else {
    // second click
    memoryApp.hasFlippedCard = false;
    memoryApp.secondCard = this;

    // check for match
    if (memoryApp.firstCard.dataset.card === memoryApp.secondCard.dataset.card) {
      // if cards match, remove event listeners 
      $(memoryApp.firstCard).off('click keypress', memoryApp.flipCard)
      $(memoryApp.secondCard).off('click keypress', memoryApp.flipCard)
    } else {
      // if not matched, remove class of flip
      setTimeout(() => {
        $(memoryApp.firstCard).toggleClass('flip')
        $(memoryApp.secondCard).toggleClass('flip')
      },800);
    }
  }
};

memoryApp.isFlipped = function() {

};

// document ready
$(function() {
  console.log('here');
  memoryApp.init();
});
