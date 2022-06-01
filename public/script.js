'use strict';

console.log('Hey! Looks like this is working!');

let featuredPokemonIDs = [];
let containerBox = document.getElementById('featPokemonContainer');
let pokemonHTML = [];
let featuredColors = [];
let featuredPokemon = [];
// Featured Elements
let featIDs = document.getElementsByClassName('featID');
let featIDList = [...featIDs];
let featNames = document.getElementsByClassName('featName');
let featNameList = [...featNames];
let featImages = document.getElementsByClassName('featImage');
let featImageList = [...featImages];

const windowHeight = window.innerHeight;

// Menu bar
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const main = document.querySelector('main');
const header = document.querySelector('header');

main.style.height = `${windowHeight - header.clientHeight}px`;

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('activeSidebar');
    main.classList.toggle('activeMenu');
    header.classList.toggle('activeMenu');
})
window.addEventListener('click', (event) => {
    if (sidebar.classList.contains('activeSidebar')) {
        console.log(event.target);
        if (event.target == header || main.contains(event.target)) {
            sidebar.classList.toggle('activeSidebar');
            main.classList.toggle('activeMenu');
            header.classList.toggle('activeMenu');
        }
    }
})


let featuredSlide = new Splide('.splide', {
    perPage: 1,
    gap: '1em',
    pagination: true,
    width: '100%'
})

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
            let pokemonColor = pokemon.color;
            featuredColors.push(pokemonColor);
            featuredPokemon.push(pokemon);
        });
        let featBKList = document.getElementsByClassName('featPokemon');
        let featBKs = [...featBKList];
        featBKs.forEach((element, index) => {
            element.style.backgroundColor = `var(--${featuredColors[index]}Main)`;
        });
        if (featuredPokemon.length == 3) {
            featIDList.forEach((element, index) => {
                element.innerHTML = featuredPokemon[index].id;
            });
            featNameList.forEach((name, index) => {
                name.innerHTML = capitalizeFirst(featuredPokemon[index].name);
            });
            featImageList.forEach((image, index) => {
                image.src = featuredPokemon[index].spriteLink;
                
            });
        }
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    getFeaturedIDs(); // THIS FUNCTION SHOULD ONLY RUN ONCE A DAY, don't want new pokemon with every refresh
    getFeaturedPokemon(featuredPokemonIDs);
    featuredSlide.mount();
});

import Swup from 'swup';
const swup = new Swup(); 
let mainBox = document.getElementById('swup');



