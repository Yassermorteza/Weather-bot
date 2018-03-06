'use strict';

const fs = require('fs');

let rawData = JSON.parse(fs.readFileSync('json_list/OW-city.list.json', 'utf8'));

let dataWrite = data => new Promise(res => res(data.map(el => ({
    city: el.name,
    country: el.country
}))));

dataWrite(rawData).then(data =>
    fs.writeFile("json_list/citylist.json", JSON.stringify(data), err => {
        if (err) console.log(err);
        console.log('File is created...');
    }));