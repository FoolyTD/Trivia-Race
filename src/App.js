import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Questions from "./questions/questions";
import HomePage from "./homepage/homepage";
import StartScreen from "./start/start";
import Leaderboard from "./leaderboard/leaderboard";
import NotFound from "./errors/notFound";
import NewUser from "./users/newUser";
// import $ from 'jquery';
import LogIn from "./users/logIn";

function App() {

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
  },[reset])

  async function handleSelect(number) {
  await fetch(`https://opentdb.com/api.php?amount=10&category=${number}&difficulty=easy`)
  .then(response => response.json())
  .then(data => setQuestions(data.results))
  .then(setLoading(number))
  .catch(console.log);

  setLoading(null);

  setActive(number);
  }

  const handleDeselect = () => {
    setActive(null);
  }

  const logIn = () => {
    setLoggedIn(true);
  }
  
  const restartQuiz = () => {
    setReset(!reset);
  }

  const correctAnswer = () => {
    setScore((currentScore)=> currentScore + 1);
  }

  const loadUser = (data) => {
    setUser(data[data.length - 1]);
  }

  const logInUser = (user) => {
    setUser(user);
  }

  return (
    <Router>
      <Switch>
      <Route exact={true} path="/">
        <StartScreen />
      </Route>
      <Route exact={true} path="/home">
        <HomePage questions={questions} handleSelect={handleSelect} handleDeselect={handleDeselect} active={active} loading={loading} restartQuiz={restartQuiz} user={user} />
      </Route>
    <Route exact={true} path="/questions">
      <Questions questions={questions} restartQuiz={restartQuiz} correctAnswer={correctAnswer}/>
    </Route>
    <Route exact={true} path="/leaderboard">
      <Leaderboard score={score} user={user} category={questions && questions[0].category} loggedIn={loggedIn}/>
    </Route>
    <Route exact={true} path="/users/new">
      <NewUser logIn={logIn} loadUser={loadUser} loggedIn={loggedIn} />
    </Route>
    <Route exact={true} path="/users/login">
      <LogIn logIn={logIn} logInUser={logInUser} loggedIn={loggedIn} />
    </Route>
      <Route path="/">
      <NotFound />
    </Route>
    </Switch>
    </Router>
  );
}

export default App;
