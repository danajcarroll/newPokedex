'use strict';

console.log('Hey! Looks like this is working!');


// Generating 3 featured Pokemon
let featuredPokemonIDs = [];

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
        const data = await response.json();
        console.log(data);
    });
}

getFeaturedIDs(); // THIS FUNCTION SHOULD ONLY RUN ONCE A DAY, don't want new pokemon with every refresh
getFeaturedPokemon(featuredPokemonIDs);



