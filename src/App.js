import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Questions from "./questions/questions";
import HomePage from "./homepage/homepage";
import StartScreen from "./start/start";
import Leaderboard from "./leaderboard/leaderboard";

function App() {

  const [questions, setQuestions] = useState(null);
  const [reset, setReset] = useState(false);
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(null);
    setScore(0);
  },[reset])

  const handleSelect = (number) => {
  fetch(`https://opentdb.com/api.php?amount=10&category=${number}&difficulty=easy`)
  .then(response => response.json())
  .then(data => setQuestions(data.results))
  .then(setActive(number))
  .catch(console.log);
  }

  const handleDeselect = () => {
    setActive(null);
  }
  
  const restartQuiz = () => {
    setReset(!reset);
  }

  const correctAnswer = () => {
    setScore((currentScore)=> currentScore + 1);
  }

  return (
    <Router>
      <Route exact={true} path="/">
        <StartScreen />
      </Route>
      <Route exact={true} path="/home">
        <HomePage questions={questions} handleSelect={handleSelect} handleDeselect={handleDeselect} active={active} restartQuiz={restartQuiz} />
      </Route>
    <Route exact={true} path="/questions">
      <Questions questions={questions} restartQuiz={restartQuiz} correctAnswer={correctAnswer}/>
    </Route>
    <Route exact={true} path="/leaderboard">
      <Leaderboard score={score} />
    </Route>
    </Router>
  );
}

export default App;
