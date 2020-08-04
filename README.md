# Fasterize API

This API is a Demo for faterize technical test.

## INSTALL
_____

To start project you need to install dependencies by invoke `npm install` inside the project folder.
```
npm install
```

## Configuration
_____
You can configure the project inside :
- `config/config.dev.json` for developpement environnement
- `config/config.prod.json` for production environnement
- `config/config.test.json` for test environnement


## Start server
_____
To start API in `dev mode` run :
```
npm start
```

Now, you can go to `localhost:4242/version` to check if API is Up.

## Testing server
_____
⚠️ Require an internet connection wherease tests will fail.
To run API testing :
```
npm test
```

To run API lint :
```
npm run lint
```

## Precommit
_____
call `git commit`  will run `npm run lint` and `npm test`. 
If something fail, commit will be not composed.
