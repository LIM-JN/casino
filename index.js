const shuffle = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"


let draw ; 

let deckId ;

let num = 1;

fetch(shuffle, {
    method: 'GET',
    })
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    // 여기에서 데이터를 원하는 방식으로 처리합니다.
    console.log(data);
    deckId = data.deck_id;
    console.log(deckId)
    draw = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`
})
.catch(error => {
    console.error('Error:', error);
});

proceed = document.querySelector('#proceed');

reset = document.querySelector('#reset')

shared = document.querySelector('#shared');

let count = 0 ;

proceed.addEventListener('click',function() {
    
    fetch(draw,{
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if ( count < 5) {
            imgURL = data.cards[0].image
            const card = document.createElement('div');
            card.classList.add('card-box');
            card.innerHTML = `<img src=${imgURL}>`
            shared.appendChild(card)
            count++
        } else {
            return
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
})

reset.addEventListener('click',function() {
    shared.innerHTML = ""
    count = 0;
})