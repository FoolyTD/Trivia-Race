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
import { loginUser } from "./users/api";

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
        setQuestions(data.results)
      })
      .then(setLoading(number))
      .catch(console.log);

    setLoading(null);

    setActive(number);
  }

  const handleDeselect = () => {
    setActive(null);
  };

  const restartQuiz = () => {
    setReset(!reset);
  };

  const correctAnswer = () => {
    setScore((currentScore) => currentScore + 1);
  };

  const logInUser = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
  }

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
            restartQuiz={restartQuiz}
            correctAnswer={correctAnswer}
            logOut={logOut}
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
          <NewUser logInUser={loginUser} />
        </Route>
        <Route exact={true} path="/users/login">
          <LogIn logInUser={logInUser} loggedIn={loggedIn} />
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
