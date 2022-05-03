'use strict';

console.log('Hey! Looks like this is working!');


// Generating 3 featured Pokemon
let featuredPokemonIDs = [];
const featBoxNodes = document.querySelectorAll('.featPokemon');
console.log(featBoxNodes);

function getFeaturedIDs() {
    for (let i = 1; i <= 3; i++) {
        const randomNumber =  Math.floor(Math.random() * 898) + 1;
        featuredPokemonIDs.push(randomNumber);
    }
}

async function getFeaturedPokemon(arr) {
    arr.forEach(async id => {
        console.log(id);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json()
        .then(data => {
            const {name, id} = data;
            const {
                sprites: {
                    other: {
                        home: {front_default: spriteLink}
                    }
                }, 
            } = data;
            let featuredInfo = {name, id, spriteLink};
            return featuredInfo;
        }).then(data => {
            console.log(data);
            // I want to use this box to put the 3 featured pokemon in!
            featBoxNodes.forEach(box => {
                // console.log(box.childNodes);
                insertFeaturedPokemon(data);
            });
        }
        )
    });
}

function insertFeaturedPokemon(obj) {
    let pokemonID = document.getElementsByClassName('featID');
    let pokemonName = document.getElementsByClassName('featName');
    let spriteSRC = document.getElementsByClassName('featImage').src;
    pokemonID.innerHTML = obj.id;
    pokemonName.innerHTML = obj.name;
    spriteSRC = obj.spriteLink;


}

getFeaturedIDs(); // THIS FUNCTION SHOULD ONLY RUN ONCE A DAY, don't want new pokemon with every refresh
getFeaturedPokemon(featuredPokemonIDs);



