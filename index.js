require('dotenv').config();
const admin = require("firebase-admin");
const fs = require("fs");
const { parse } = require("csv-parse");

const {
    FIREBASE_PRIVATE_KEY_PATH,
    CITY_CSV_PATH,
} = process.env;

const serviceAccount = require(FIREBASE_PRIVATE_KEY_PATH);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const countriesCollection = db.collection('countries');
const citiesCollection = db.collection('cities');

const countryNames = new Set();

function createCsvParser() {
    const columns = ['name', 'country', 'subcountry', 'geonameid'];
    const parserOptions = {
        columns,
        delimiter: ',',
        autoParse: true,
        from_line: 2,
    };
    return parse(parserOptions);
}

function onStart() {
    console.log(`Uploading data from ${CITY_CSV_PATH} to Firestore`);
    console.log(`Firebase Project ID: ${serviceAccount.project_id}`);
    console.time('Execution time');
}

function onCityRow(city) {
    countryNames.add(city.country);
    citiesCollection.add(city);
}

function onEndReadFile() {
    for (const name of countryNames) {
        countriesCollection.add({ name });
    }
    console.timeEnd('Execution time')
}

function onError(err) {
    console.error(err);
}

fs.createReadStream(CITY_CSV_PATH)
    .pipe(createCsvParser())
    .once('data', onStart)
    .on('data', onCityRow)
    .on('end', onEndReadFile)
    .on('error', onError);
