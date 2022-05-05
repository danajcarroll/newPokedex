'use strict';

console.log('Hey! Looks like this is working!');


// Generating 3 featured Pokemon
let featuredPokemonIDs = [];
let containerBox = document.getElementById('featPokemonContainer');
let pokemonHTML = [];

function getFeaturedIDs() {
    for (let i = 1; i <= 3; i++) {
        const randomNumber =  Math.floor(Math.random() * 898) + 1;
        featuredPokemonIDs.push(randomNumber);
    }
}

async function getFeaturedPokemon(arr) {
    arr.forEach(async id => {
        // console.log(id);
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
        }).then(pokemon => {
            console.log(pokemon);
            let containerBoxHTML = `
                <div class="featPokemon" id="">
                <div class="numberStatus">
                    <h1 class="featID">${pokemon.id}</h1>
                    <div class="heartIcon"></div>
                </div>
                <div class="imageName">
                    <img src="${pokemon.spriteLink}" alt="" class="featImage">
                    <h1 class="featName">${pokemon.name}</h1>
                </div>
                </div>
                `;
            pokemonHTML.push(containerBoxHTML);
            return pokemonHTML;
        })
        containerBox.innerHTML = pokemonHTML.join('');
    });
}

getFeaturedIDs(); // THIS FUNCTION SHOULD ONLY RUN ONCE A DAY, don't want new pokemon with every refresh
getFeaturedPokemon(featuredPokemonIDs);



