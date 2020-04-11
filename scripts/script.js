/* eslint-disable */
// namespacing object

// create array of cards
let cards = [
  {
    name: 'one',
    image: './card-assets/cardOne.jpg',
  },

  {
    name: 'one',
    image: './card-assets/cardOne.jpg',
    dataSet: '',
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
// Pseudo Code

$(function() {
  
  // on click/key press of start button header scrolls up and hides
  $('.startButton').on('click', playGame);
  
  function playGame() {
    $('header').slideUp(1000, function() {
      $('.cardContainer').removeClass('hide');
      // a prompt is then given with instruction on how to play game
      Swal.fire({
        title: 'Instructions',
        text: 'Help all the cacti find their friends and return to the terraium!',
        icon: '',
        confirmButtonText: 'Cool',
      });
    });
  }

  //shuffle cards array
  let shuffleCards = (array) => {
    let newPos;
    let temp;

    for (let i = array.length - 1; i > 0; i--) {
      newPos = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[newPos];
      array[newPos] = temp;
    }
    //return new array to new variable
    return array;
  }
  //store shuffled cards array into a randomized card array
  const randomizedCards = shuffleCards(cards)

  randomizedCards.forEach((card) => {
    $(".cardContainer").append(`
  <div class="memoryCard">
    <img src="./card-assets/cardBack.jpg" alt="cactus patter" class="backFace">
    <img src="${card.image}" alt="cactus graphic" class="frontFace" data-set="${card.name}">
  </div>
  `);
  });

});

// cards are then shuffled using a for-loop assigning an index to each card, thus randomly assorting them
// cards are flipped using toggleClass and given a class of flip to the memory card div
// using if else statement cards are flipped back over by removing flip  class after second click.
// cards are matched when the data-card are the same, the event handler is removed from matched cards so they can no longer be flipped.
// when all cards are matched, prompt will appear and congratulate player, player can now choose to play again.
// cards are reset, and shuffled again.

// init function
// document.ready
// call init function
