# Responsive Spotify

---

## Introduction

##### this is a fully responsive Spotify music player with neumorphism, user-friendly UI. App will maintain its responsive feature in most cases except under a very small screen width. 

## Website

##### It has been deployed on https://responsive-spotify.netlify.app/

## Install

##### before running the project, you need to know you must have a Spotify Premium account and register an App on Spotify, they will give you client id and client serect and you need to set your callback url. then you uncomment the .env file for local running.

##### first, do

```shell
npm install
```

##### then, if you want to run it on a normal server, please go find setUpProxy.js, and uncomment everything.

##### and do:

```shell
npm run build
npm start
```

##### and go to server folder, do

```shell
node server.js
```

##### right now do not support serverless dev server, it may comes from netlify-cli bug, still investigating





