// Importing CSS
import "./App.css";
// Rerender will trigger once state is updated, and UseEffect will trigger once page mounts
import { useState, useEffect } from "react";
// BrowserRouter lets us add routes to different url paths, route lets us define those paths, and Switch ats as an if statement, only displaying one component at a time
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Questions component contains the logic for the trivia-race/questions route
import Questions from "./questions/questions";
// HomePage contains logic for the trivia-race/home route
import HomePage from "./homepage/homepage";
import StartScreen from "./start/start";
import Leaderboard from "./leaderboard/leaderboard";
import NotFound from "./errors/notFound";
import NewUser from "./users/newUser";
import LogIn from "./users/logIn";
import HowToPlay from "./instructions/howToPlay";

function App() {
  // An array that will hold that response from the API,
  const [questions, setQuestions] = useState(null);
  const [reset, setReset] = useState(false);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setQuestions(null);
    setScore(0);
  }, [reset]);

  async function handleSelect(number) {
    await fetch(
      `https://opentdb.com/api.php?amount=10&category=${number}&difficulty=easy`
    )
      .then((response) => response.json())
      .then((data) => {
        // const results = data.json();
        console.log(data.results)
        setQuestions(data.results)
        // localStorage.setItem(questions, JSON.stringify(data.results));
        // (() => {
          // const localStorageQuestions = localStorage.getItem(JSON.parse(questions));
          // const localStorageQuestions = localStorage.getItem(questions);
          // console.log(localStorageQuestions);
        // })();
        // console.log(JSON.parse(data.results));
        // console.log(data.results);
      })
      .then(setLoading(number))
      .catch(console.log);

    setLoading(null);

    setActive(number);
  }

  const handleDeselect = () => {
    setActive(null);
  };

  const logIn = () => {
    setLoggedIn(true);
  };

  const restartQuiz = () => {
    setReset(!reset);
  };

  const correctAnswer = () => {
    setScore((currentScore) => currentScore + 1);
  };

  const loadUser = (data) => {
    setUser(data[data.length - 1]);
  };

  const logInUser = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <StartScreen />
        </Route>
        <Route exact={true} path="/home">
          <HomePage
            questions={questions}
            handleSelect={handleSelect}
            handleDeselect={handleDeselect}
            active={active}
            loading={loading}
            restartQuiz={restartQuiz}
            user={user}
          />
        </Route>
        <Route exact={true} path="/questions">
          <Questions
            questions={questions}
            // questions={window.localStorage.getItem(questions)}
            restartQuiz={restartQuiz}
            correctAnswer={correctAnswer}
          />
        </Route>
        <Route exact={true} path="/leaderboard">
          <Leaderboard
            score={score}
            user={user}
            category={questions && questions[0].category}
            loggedIn={loggedIn}
          />
        </Route>
        <Route exact={true} path="/users/new">
          <NewUser logIn={logIn} loadUser={loadUser} loggedIn={loggedIn} />
        </Route>
        <Route exact={true} path="/users/login">
          <LogIn logIn={logIn} logInUser={logInUser} loggedIn={loggedIn} />
        </Route>
        <Route exact={true} path="/how-to-play">
          <HowToPlay />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
