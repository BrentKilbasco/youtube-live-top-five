
[1.1]: http://i.imgur.com/tXSoThF.png (twitter icon with padding)
[2.1]: http://i.imgur.com/P3YfQoD.png (facebook icon with padding)
[3.1]: http://i.imgur.com/0o48UoR.png (github icon with padding)


[1.2]: http://i.imgur.com/wWzX9uB.png (twitter icon without padding)
[2.2]: http://i.imgur.com/fep1WsG.png (facebook icon without padding)
[3.2]: http://i.imgur.com/9I6NRUm.png (github icon without padding)


[1]: http://www.twitter.com/BrentKilbasco
[2]: http://www.facebook.com/bkilbasco
[3]: http://www.github.com/BrentKilbasco



# YouTube Live Top Five


👋 Heyo! Thanks for the look-see 😁

The goal of this project/app is to allow users to browse through and view the top five live streams currently broadcasting on YouTube. Users are able to log in with their Google account, browse the list of live video streams, play a video from the list, and can also refresh the top five list. Live chat messages for the selected video are displayed to the user in the chat window, and are updated in real time. If the selected video's live chat is disabled (by the channel owner) however, text will be displayed at the top of the chat window letting users know the live chat is disabled. 

I decided to build my own cookie-based OAuth 2.0 flow for this project, so both a front end client app and back end server were built to support this login flow. 

The focus was a bit more on the technical side of things rather than styling and animations. 


## 🧠 Motivation
Ok, so a quick little backstory on this little project. This was originally a React Native app done as a prototype demo a while back and I thought it’d be fun to redo it from scratch in React, because I like React and YouTube. So I made this little app 😁 This time around I decided to drop Firebase though and roll my own server-side auth flow. 

Some features I plan on adding in the future include posting chat messages to the live chat, filtering the chat so users can have one-on-one conversations without the noise of other users, and the ability to filter the top five list a bit. Also to make use of the access and refresh tokens from Google that we are encrypting and storing in the DB.

## 📷 Screenshots

Chat Enabled:

![Alt text](screenshots/ScreenShot_1[600].jpg?raw=false "Screen Shot 1")


Chat Disabled:

![Alt text](screenshots/ScreenShot_2[600].jpg?raw=true "Screen Shot 2")



## 💻 Technologies used

Built with [MongoDB](https://www.mongodb.com/), [Express](https://www.npmjs.com/package/express), [React](https://reactjs.org/), and [NodeJS](https://nodejs.org). Cookie-based user authentication is being used for security and ease of authentication. On the back-end, JSON web tokens are used to store users' Google OAuth access token and refresh token within the database. Currently those access/refresh tokens aren't being made use of, but the intention is to utilize them within a chat posting feature, which will be implemented in a future iteration.

Combining [Concurrently](https://www.npmjs.com/package/concurrently), [Nodemon](https://www.npmjs.com/package/nodemon), and some custom package script commands to run them in parallel and set some proxies, not only do we get auto refresh for both server and client app at the same time, but also any proxies pointing to the localhost will be automatically ignored when uploaded to Heroku, or whichever hosting service used. In other words the endpoints will work the same if running on the development server or production - no need to change URLs between environments, which makes for a very efficient and pleasant workflow.

Some of the libraries/frameworks used in the front-end:
- [Router](https://www.npmjs.com/package/router)
- [Redux](https://www.npmjs.com/package/redux)
- [Redux Thunk](https://www.npmjs.com/package/redux-thunk)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Semantic UI](https://semantic-ui.com/)
- [ESLint](https://www.npmjs.com/package/eslint)


Some of the libraries/frameworks used in the back-end:

- [Express](https://www.npmjs.com/package/express)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Passport](https://www.npmjs.com/package/passport)


## 🚀 Installation - getting it up and running

There are a few steps in this process, so let's get to it! 😃

#### 1. Clone and Install
```
# Clone the repo
git clone https://github.com/BrentKilbasco/youtube-live-top-five

# Install dependencies for the back-end (after navigating into repo root)
npm install

# Install dependencies for the front-end
npm install --prefix client

```

#### 2. Set up MongoDB Deployment
Set up a MongoDB database deployment for our dev environment.

#### 3. Set up new GoogleAPI project deployment
Create a new project within the GoogleAPI dashboard. First we'll **enable both Google+ API and YouTube Data API v3**. Next, withinin the credentials section, be sure to set the application name within the OAuth Consent tab. Then back over in the credentials tab, **create both an API key and OAuth 2.0 client IDs**. When creating the OAuth credentials, both the authorized javascript origins and the authorized redirect URLs must match the following screen shot exactly:


![Alt text](screenshots/OAuth_Redirects.jpg?raw=true "OAuth Redirects")

#### 4. Create a dev config file for the back-end

Create a new file in the config folder: 'dev.js'. This will be our config settings for the server side app. We'll point it to the deployment we created in step #2, and enter the google client ID and secret keys. 

The cookieKey can be any unique string, and is used for the cookie-based authentication. The jwtPrivateKey property can also be any unique string, and is used for JSON web token signing and verifying. 

Finally, we set the redirectDomain to the local host at port 3000, since that will be the port the React dev server will use, and port 5000 is the one the Node back-end server will use.

```bash
module.exports = {

  mongoURI: 'mongodb://<username>:<password><mongoDB-dev-address>',
  googleClientID: 'client-id-received-from-google-api-dashboard',
  googleClientSecret: 'client-secret-received-from-google-api-dashboard',
  cookieKey: 'a.totally-random/string(of]chars',
  jwtPrivateKey: 'another=unique.string',
  redirectDomain: 'http://localhost:3000',

};
```

#### 5. Create a dev config file for the front-end

In the client folder, create a new '.env.development' file and add the following line:
```
REACT_APP_YOUTUBE_KEY=your-api-key
```

This is where we'll use the API key we got from step #3, replacing 'your-api-key' with whatever your key string is.

It's important to remember not to wrap the API key string in any quotes. Also, it might be good to note that when creating/storing environment variables this way, React requires us to prefix any variable name with 'REACT\_APP\_', otherwise they will be ignored. 

This step will be omitted in future iterations. 

#### 6. Run the app!
In a terminal or command prompt window, navigate to the root folder and run:
```
npm run dev
```

Ok! Hopefully after a few seconds it boots up without an issue! 


## 👊 Further Help?

Need further help? No worries! Just [get in touch with me directly](http://portfolio.bkilbasco.com) 😄

Or one of these places:   [![alt text][1.2]][1] [![alt text][2.2]][2]

---

_If there are any other ideas about, or related to, this project, that you think worth mentioning - feel free to give me a shout_ 😄  

#### _Cheers!!_ 🍻 


