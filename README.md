# SOS Ukraine

## :warning: Looking for volunteers
I am looking for volunteers in EU timezone to support. NodeJs and JS developers and Project managers speaking Ukrainian and Russian.


## Description 
[SOS Ukraine](https://sos-ukraine.herokuapp.com/requests) allows people stranded in war areas to submit a request to pickup for relocation.
The requests are matched with a network of volunteer drivers. The group is active and performs multiple rescues a day.

## Setup

### Launch postgres

`docker-compose up`

### Install dependencies
```
npm i
```

### Run in development
Frontend files will be built and watched for changes, backend will run"
```
npm start-dev
```

## Deploy
Make sure all changes are committed"
```
git push heroku
```

The application is currently using the `.env` file to embed the API key in the
HTML document. This is a temporary key and is not valid for production usage. It
can be replaced by following these instructions to
[get an api key](https://developers.google.com/maps/documentation/javascript/get-api-key).
