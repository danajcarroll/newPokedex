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

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getFeaturedPokemon(arr) {
    arr.forEach(async id => {
        const profileResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeProfile = await profileResponse.json()
        .then(pokeProfile => {
            const {name, id} = pokeProfile;
            const {
                sprites: {
                    other: {
                        home: {front_default: spriteLink}
                    }
                }, 
            } = pokeProfile;
            let featuredInfo = {name, id, spriteLink};
            return featuredInfo;
        }).then(pokemon => {
            console.log(pokemon);
            let containerBoxHTML = `
                <div class="featPokemon" id="">
                    <img src="images/pokeball.svg" class="pokeBk">
                    <div class="numberStatus">
                        <h1 class="featID">${pokemon.id}</h1>
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="imageName">
                        <img src="${pokemon.spriteLink}" alt="" class="featImage">
                        <h1 class="featName">${capitalizeFirst(pokemon.name)}</h1>
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



