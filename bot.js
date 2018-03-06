'use strict';

const { Account } = require('@wireapp/core');
const fetch = require('node-fetch');
const app = require('express')();
const fs = require('fs');
const dotenv = require('dotenv');

let account = new Account();

if (process.env.NODE_ENV !== 'production') {
    dotenv.load();
}

const port = process.env.PORT || 3000;

let url = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//To read the json file of city list that was created from the openweathermap's OW-city.list.json
let citylist = JSON.parse(fs.readFileSync('json_list/citylist.json', 'utf8'));

//Filter the city list and find the match one in the json file to the incoming message
let checkCity = city => citylist.filter(el => el.city.toLowerCase() === city.toLowerCase())

/*to check the recieved message and sending back 
  the api data if it's accurate and exist*/
async function cityName(content) {

    const city = content.substring(9);
    const weather = content.substring(0, 8).toLowerCase();
    const space = content.indexOf(' ');
    console.log(space);
    let existCity = await checkCity(city);

    if (weather === '/weather' && existCity.length > 0 && city && space > -1) {
        return fetchData(city);
    } else {
        return;
    }
};

//To fetch the weather APi from openweathermap.org 
let fetchData = (city) => {
    return fetch(`${url}${city}&APPID=${process.env.API_KEY}`)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
};

//Account incomming message callback to check the erecieved message and sending a proper response  
async function weatherForecast({
    conversation,
    content
}) {

    let data = await cityName(content);
    let bot;

    if (data) {
        let temp = Math.round(data.main.temp);
        bot = `The temperature in ${data.name} is ${temp}°C.`;
    } else {
        bot = "Weather forecast BOT, send a city name like: /weather [city]";
    };
    return account.service.conversation.sendTextMessage(conversation, `${bot}`);
};

account.on(Account.INCOMING.TEXT_MESSAGE, weatherForecast);

account.listen({
    email: process.env.BOT_EMAIL,
    password: process.env.BOT_PASSWORD,
    persist: false,
});

/*Express server added to this BOT for the aim of deploying 
  the Weather BOT on Heroku, although it works localy serverless.
  you can find the app on heroku in this address https://wire-weatherbot.herokuapp.com
  If you are intrested to check the online app please first open
  the heroku link above then add my cat's wire account "malos",
  it'd be a nice impression. 
*/

app.get('/', (req, res) => res.send('Weather Bot is ready...Now add bot account "malos" to your wire'));

app.listen(port, () => console.log('App is running on port...', port));