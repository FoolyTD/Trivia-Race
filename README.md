# Welcome to Trivia Race
Trivia Race is a fast-paced trivia game that puts your knowledge to the test. Select from 7 of the most popular trivia categories and compete against other users for your place on the leaderboards. Oh, and I forgot to mention, you're racing against the clock!

To PLAY NOW, click [HERE](https://trivia-race.vercel.app/). 

# Gameplay
![Trivia Race Homepage](./src/images/trivis-race-homepage.jpg)

1. ## Getting Started
The homescreen has three options: login, create account, or how to play. If you don't have an account, you will have to create one using the sign-up form. How to play will walk you through the rules of the game.

2. ## How to Play
- Once logged in, click one of the buttons to select your category. Wait for the loading to complete, and the button will glow bright green and say "Start"! Click the button again to start your round.

- You will be given a random set of 10 questions from your selected category. The questions can be either multiple choice with 4 options, or true/false. For each question you will have 15 seconds to read and answer. Click the button with the correct answer to move to the next question. After you answer, the correct response will glow green and your answer--if incorrect--will glow red. If you take 15 seconds, you will automatically be moved to the next question.

3. ### **SPECIAL POWERS**
No one knows everything, so Trivia Race is here to help you along the way. At the start of each round, you will be given 3 special powers. Use these powers wisely because they can only be used once per round.

- **Free One**: Click the Free One button to be gifted a free answer! Use wisely because you only get one per round.
- **50/50**: Click 50/50 button to take away 2 incorrect answers from a multiple choice question.
- **❄️**: Click ❄️ button to freeze the timer, giving you unlimited time on a single question. 

4. ## Scoring
At the end of your round, you will be given your score and be offered the ability to take a look at the leaderboards. If you scored high enough in your category, you can put your name on the leaderboards for everyone to see!

I hope you enjoy my application and Good Luck!

To PLAY NOW, click [HERE](https://trivia-race.vercel.app/). 

# Technologies used
This repository holds the frontend code for a trivia application built using React, JavaScript, HTML, CSS, Bootstrap, and JSON API. The design for the application was built with Figma and resources from Unsplash, Coolors, and Subtle Patterns library. 

# Development
Fork and clone this repository to run it locally on your machine. Then, run `npm install` to install the dependencies. From there, navigate to the src folder. This is where all of my components are located. `src/index.js` is the first file you should look at. It is the origin of the code for the rest of the application. As you can see, it only returns one component `<App />`. Navigate to `src/App.js` and that's where the code I wrote begins. I did my best to comment what I was thinking at each link in the code. Also, I tried to name everything in a logical way, but I will outline what folder hold what code.

- errors: the NotFound page which will be displayed on any routes that aren't defined 
- homepage: the code for "trivia-race/home" route
- images: images used in the project
- leaderboard: the code for the "trivia-race/leaderboard" route
- questions: the code for the "trivia-race/questions" route where the questions are displayed
- start: the code for "trivia-race/" the start screen for the application
- users: the code for "trivia-race/user/:form" the login and sign-up forms
- utils: helper functions for that app

# Getting Started with Create React App
This project was created using:
```
npx create-react-app project-name
```
After the frame for your application is built, navigate to the src folder and delete all of the files. Then, create a file called index.js.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# Trivia-Race
