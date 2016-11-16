# NOTES

Simple note taking app built with node.js for the module Web Design and Engineering 2 at the University of Applied Sciences HSR in Rapperswil.

## Setup

Make sure you have node.js installed (LTS version v6.9.0 prefered). This project also uses facebook's node package manager [yarn](https://yarnpkg.com/).

Install all necessary dependencies with:

```
$ yarn install
```

You're also able to install all dependencies with `npm`. Just replace `yarn` with `npm` in the example above.

## Start the server

To start the server execute the command:

```
$ yarn start
```

## Compile the stylesheets

If you're not able to see any CSS you have to compile them first with gulp. If gulp is not globally available install it with:

```
$ yarn global add gulp
```

Then just run:

```
$ gulp sass
```

## Serve with Browsersync

Browsersync is part of the local development environment. To start the static server simply run:

```
$ gulp serve
```

This task automatically works as a proxy to your node app and detects changes in your stylesheets. If you use this task, make sure your local node.js server is running.
