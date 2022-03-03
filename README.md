# SOS Ukraine

Submit your location and phone number and we'll try to match make you with drivers nears you who could

## Setup

### Launch postgres

`docker-compose up`

### Install dependencies
```
npm i
```

### Build the frontend
```sh
npm run build  # production
```

### Rune the API

```
npm start  # development
```

## Deploy

```
git push heroku
```

The application is currently using the `.env` file to embed the API key in the
HTML document. This is a temporary key and is not valid for production usage. It
can be replaced by following these instructions to
[get an api key](https://developers.google.com/maps/documentation/javascript/get-api-key).
