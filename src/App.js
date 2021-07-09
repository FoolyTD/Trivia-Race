import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Questions from "./questions/questions";
import HomePage from "./homepage/homepage";

function App() {

  const [questions, setQuestions] = useState(null);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setQuestions(null);
  },[reset])

  const handleSelect = (number) => {
  fetch(`https://opentdb.com/api.php?amount=10&category=${number}&difficulty=easy`)
  .then(response => response.json())
  .then(data => setQuestions(data.results));
  }
  
  const restartQuiz = () => {
    setReset(!reset);
  }

  return (
    <Router>
      <Route exact={true} path="/">
        <HomePage questions={questions} handleSelect={handleSelect} />
      </Route>
    <Route exact={true} path="/questions">
      <Questions questions={questions} restartQuiz={restartQuiz}/>
    </Route>
    </Router>
    
  );
}

export default App;
