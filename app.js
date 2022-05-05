const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('public'));

const nodeCron = require('node-cron');
// const job = nodeCron.schedule("30 0 23 * *", function() {
//     for (let i = 1; i <= 3; i++) {
//         const randomNumber =  Math.floor(Math.random() * 898) + 1;
//         featuredPokemonIDs.push(randomNumber);
//     }
// })