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

After that run : 
```
npm install ngrok -g && ngrok http 5000
```
on a seperate terminal window.
You will see something like this: 
```
ngrok by @inconshreveable                                                                                                  (Ctrl+C to quit)
                                                                                                                                           
Session Status                online                                                                                                       
Session Expires               7 hours, 56 minutes                                                                                          
Version                       2.3.34                                                                                                       
Region                        United States (us)                                                                                           
Web Interface                 http://127.0.0.1:4040                                                                                        
Forwarding                    http://20fc70b0.ngrok.io -> http://localhost:5000                                                            
Forwarding                    https://20fc70b0.ngrok.io -> http://localhost:5000                                                           
                                                                                                                                           
Connections                   ttl     opn     rt1     rt5     p50     p90   
```
Copy 
```
http://20fc70b0.ngrok.io
```
and paste it on src/util/config as apiUrl
Then run the server


Details
--------------
A user can register and login. After login a screen where several movies are listed appear where the user can press ny movie. Then, another screen appears
where tha user can see more details and add his comment about the movie.

Having more time I would improve the UI, add more loaders for better UX and better error handling. Also a better implementation of websockets and socket.io
is needed. For example right now a new comment is broadcasted to all users including the one writing the comment.
The app is small so global state is not needed.However for performance reasons to minimize the requests I would like to add redux.

