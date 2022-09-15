# Upload CSV to Firestore

This project can be used to upload a cities csv file to a Firestore, the csv must contains the following columns:
- name
- country
- subcountry
- geonameid

In Firestore this data will be stored in two collections, *cities* (with properties with the same name of the csv columns) and *countries* (storing unique countries to improve performance in queries).

## Prerequisites
- [Firebase Project](https://cloud.google.com/firestore/docs/client/get-firebase)
- [Node v14.15+](https://nodejs.org/pt-br/download/)

## Setup
You will need a csv file with all cities data and the *Firebase Private Key JSON*, that you can generate using [this tutorial](https://firebase.google.com/docs/admin/setup#initialize-sdk).

After you download these files in your machine, create a .env file in the root of this project with the following configs, replacing <PATH_TO_PRIVATE_KEY_JSON> and <PATH_TO_CSV_FILE> to their respective path.
```
FIREBASE_PRIVATE_KEY_PATH=<PATH_TO_PRIVATE_KEY_JSON>
CITY_CSV_PATH=<PATH_TO_CSV_FILE>
```
Then you can download node dependencies using
```bash
npm i
```

And to run the script use the command below:
```bash
npm start
```