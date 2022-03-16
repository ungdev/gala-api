# API Gala

API pour la gestion des données du gala

Avant toute chose, lisez la documentation sur [Read the Docs](https://cassiopee.rtfd.io)

## Requirements

* [Node.js](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

## Installation

```
git clone 
# or
git clone 

cd api.gala.uttnetgroup.fr
yarn
```

## Database

```
# create the databse 'gala' and user gala
CREATE DATABASE gala;
CREATE user gala@localhost IDENTIFIED BY 'gala';
grant all privileges on gala.* to gala@localhost;
flush privileges

# run migrations (before running server !!!) :
yarn migrate

# run seeds
yarn seed
```

## Configuration

```
# copy env file for all environments
cp .env .env.local
# makes your changes in .env.local, which will not be pushed
nano .env.local
# you should change DB settings for your database


# setup email : put your smtp. WARNING : UTT's Network is blocking all smtp, you can use utt's SMTP from UNG's network, but no others.
EMAIL_SMTP=
# Set sender name, appear in client's mailbox
EMAIL_FROM=Gala UTT <gala@utt.fr>
# Set destination mail, where mail should go
EMAIL_CONTACT_TO=Gala UTT <gala@utt.fr>
```


## Modify database

```
# If you want to edit the database (add/remove/update column, table, ...), you need to create a new migration. This will be like a commit for the database state, and it will be possible to roll back to a previous state of the structure (not data)

sequelize migration:generate --name name_of_your_migration

# Edit the migration generated in database/migrations/timestamp-name_of_your_migration.js
# Than, run the migration to apply changes in the database :
yarn migrate
# note : this will not change you models, you will have to change them accordingly

```

## Setup etuutt login

```
# Setup etu baseurl (in case someday etu.utt.fr change dns, or if you want to use a local version for example)
ETU_BASEURL=https://etu.utt.fr
# Setup Etu Application :
# Go to https://etu.utt.fr/api/panel and create an application
* Name is what appear when logging in
* Redirection URL MUST BE localhost:3000/api/v1/etuutt/redirect, it redirects to the API not the front ! So put this app's url (for local use it's localhost:3000 by default, but in prod it could be api.yourapp.com or whatever)
* image is optional but swag
* you only need public data
# Go to your application created, get th id and secret and set it :
ETU_CLIENT_ID=
ETU_CLIENT_SECRET=
ETU_CLIENT_ID=public
# Finally, setup the redirect url, where this app should redirect user at the end, it's the baseurl of the front : 
LOGIN_REDIRECT_URL=http://localhost:8080

```

## Commands

```
yarn dev    # development server
yarn start  # production server
yarn serve  # pm2 production server (load balancing)
yarn reload # pm2 hot reload
yarn lint   # prettier lint
```

## Structure (generated with 'tree' command)

```
arena.utt.fr-api/
├── src/                          # base directory
│   ├── api/                         # api files
│   │   ├── controllers/                # endpoints controllers
│   │   ├── middlewares/                # endpoints middlewares
│   │   ├── models/                     # database models
│   │   └── utils/                      # utils files
│   ├── main.js                       # create express server
│   ├── database.js                  # create sequelize connection
│   ├── env.js                       # convert .env and .env.local to JSON
│   ├── index.js                     # entry point
├── .editorconfig                 # define your editor options
├── .env                          # global configuration
└── .env.local                    # override global configuration (not pushed to repository)
```
