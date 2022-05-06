'use strict';

console.log('Hey! Looks like this is working!');



let featuredPokemonIDs = [];
let containerBox = document.getElementById('featPokemonContainer');
let pokemonHTML = [];
let featuredColors = [];

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
    featuredColors.splice(0, featuredColors.length);
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
        }).then(async pokemon => {
            const colorResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
            const colorData = await colorResponse.json();
            pokemon.color = `${colorData.color.name}`
            return pokemon;
        }).then(pokemon => {
            console.log(pokemon);
            let containerBoxHTML = `
                <div class="featPokemon ${pokemon.color}Main">
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
            return {pokemonHTML, pokemon};
        }).then(obj => {
            containerBox.innerHTML = pokemonHTML.join('');
            let pokemonColor = obj.pokemon.color;
            featuredColors.push(pokemonColor);
            console.log(featuredColors);
        })
        let featHTMLList = document.getElementsByClassName('featPokemon');
        let featArray = [...featHTMLList];
        featArray.forEach((element, index) => {
            element.style.backgroundColor = `var(--${featuredColors[index]}Main)`;
        });
    });

}

getFeaturedIDs(); // THIS FUNCTION SHOULD ONLY RUN ONCE A DAY, don't want new pokemon with every refresh
getFeaturedPokemon(featuredPokemonIDs);



