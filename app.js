//This is a DOM Events detector.
//In this piece of code will happen all the action in this game
document.addEventListener('DOMContentLoaded', () => {
    //Objects array for card options
    const cardArray =[
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        }
    ];

    //Making a unorder array for random options in the cardArray
    cardArray.sort(() => 0.5 - Math.random());

    //Declaration
    const grid = document.querySelector('.grid'); //Call the element from HTML
    const resultDisplay = document.querySelector("#result"); //Call the span element for results
    let cardChosen = []; //Empty array for the card chosen by the player
    let cardChosenId = []; //Empty array for the second card chosen.
    let cardsWon = []; //Empty array for cards with match

    //Creating the dashboard
    function Board(){
        //Using For loop it is created a image for every element into the array
        for(let i=0; i<cardArray.length; i++){
            const card = document.createElement('img'); //It is created the element
            card.setAttribute('src','images/blank.png'); //Set the image 'blank.png' as attribute
            card.setAttribute('data-id', i); //Set a index to every image.
            card.addEventListener('click', Flip); //Every click in any card will made a callback to flipcard() function
            grid.appendChild(card); //Made every card image a child from 'grid' element
        }
    }

    //Creating the card flip function
    function Flip(){
        let cardId = this.getAttribute('data-id'); //Get the index attribute of the chosen card
        cardChosen.push(cardArray[cardId].name); //Add the card name of the chosen card to the empty array
        cardChosenId.push(cardId); //Add the index of the chosen card to the empty array
        this.setAttribute('src',cardArray[cardId].img); //When Flip() is call that means that we already have one card chosen

        //When two cards have been chosen, the function comes to an if conditional
        if(cardChosen.length == 2){ //If the length is equal to '2', a setTimeout calls the checkCardMatch() function.
            setTimeout(checkCardMatch, 500);
        }
    }

    //Creating the function that will made the evaluation between both cards
    function checkCardMatch(){
        const cards = document.querySelectorAll('img');
        const CardOne = cardChosenId[0]; //First card selected
        const CardTwo = cardChosenId[1]; //Second card selected
        if(CardOne == CardTwo){
            cards[CardOne].setAttribute('src', 'images/blank.png'); //Changing the style of the matched cards
            cards[CardTwo].setAttribute('src', 'images/blank.png');
            cardsWon.push(cardChosen); //Pushing the cards chosen into the empty array
            alert("OH NO! You clicked the same image. Try again.");
        }else if(cardChosen[0] == cardChosen[1]){
            alert('Nice job! Keep going');
            cards[CardOne].setAttribute('src', 'images/white.png');
            cards[CardTwo].setAttribute('src', 'images/white.png');
            cards[CardOne].removeEventListener('click', Flip);
            cards[CardTwo].removeEventListener('click', Flip);
            cardsWon.push(cardChosen);
        } else {
            cards[CardOne].setAttribute('src', 'images/blank.png');
            cards[CardTwo].setAttribute('src', 'images/blank.png');
            alert('Sorry, try again')
        }
        cardChosen = [];
        cardChosenId = [];
        resultDisplay.textContent = cardsWon.length; //This shows the actual pair of matched card in the score section
        if(cardsWon.length == cardArray.length/2){ //If the length in the array cardsWon is equal at the half of the length in the cardArray, that means that the user has finished the game
            resultDisplay.textContent = 'CONGRATULATIONS!! You found all the matches.'
        }
    }

    //Calling Board() function to create the board game
    Board();
});