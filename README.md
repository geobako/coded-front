Movies App
==============

```
├── android
├── app.json
├── babel.config.js
├── index.js
├── ios
├── metro.config.js
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── navigation.js
│   ├── screens
│   │   ├── Login.js
│   │   ├── MoviesListing.js
│   │   ├── Register.js
│   │   ├── screens.js
│   │   ├── SingleMovie.js
│   │   └── SplashScreen.js
│   └── util
│       ├── config.js
│       └── moviesList.js
├── __tests__
└── yarn.lock
```

Description
--------------

A  movie app where yu can login and select a movie from a list of movies 
and add comments to it. Comments are in real time using websockets

Usage
--------------
Clone and run :
```
npm i && npm start
```
then: 
```
react-native run-android
```
Details
--------------
A user can register and login. After login a screen where several movies are listed appear where the user can press ny movie. Then, another screen appears
where tha user can see more details and add his comment about the movie.

Having more time I would improve the UI, add more loaders for better UX and better error handling. Also a better implementation of websockets and socket.io
is needed. For example right now a new comment is broadcasted to all users including the one writing the comment.
The app is small so global state is not needed.However for performance reasons to minimize the requests I would like to add redux.

