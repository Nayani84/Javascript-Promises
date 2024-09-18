const baseURL = "https://deckofcardsapi.com/api/deck";

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
let singleCardResponse = axios.get(`${baseURL}/new/draw/?json`);
singleCardResponse.then(res => {
    console.log(res);
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
})
singleCardResponse.catch(err => {
    console.log("rejected promise!!!!", err)
})



// 2.Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
let firstCard = null;
axios.get(`${baseURL}/new/draw/?json`)
    .then(resCard1 => {
        firstCard = resCard1.data.cards[0];
        let deckId = resCard1.data.deck_id;

        return axios.get(`${baseURL}/${deckId}/draw/?count=1`)
    })
    .then(resCard2 => {
        let secondCard = resCard2.data.cards[0];
        [firstCard, secondCard].forEach((card) => {
            console.log(`${card.value} of ${card.suit}`);
        })
    })
    .catch(err => {
        console.log("rejected promise!!!!", err)
    })



// 3.Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
let deckId = null;
let $btn = $('#button');
let $cardArea = $('#card-area');

axios.get(`${baseURL}/new/shuffle/?json`)
    .then(newDeck => {
        deckId = newDeck.data.deck_id
    })
    .catch(err => {
        console.log("rejected promise!!!! Unable to get new deck", err)
    })


function drawCard() {
    axios.get(`${baseURL}/${deckId}/draw/`)
        .then(resp => {
            let cardImg = resp.data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let newX = Math.random() * 40 - 20;
            let newY = Math.random() * 40 - 20;

            let newImg = document.createElement('img');
            newImg.setAttribute('src', cardImg);
            newImg.setAttribute('style', `transform: translate(${newX}px, ${newY}px) rotate(${angle}deg)`);
            $cardArea.append(newImg);

            if (resp.data.remaining === 0) {
                $btn.remove();
            }
        })
}