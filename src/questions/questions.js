import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useInterval from "../utils/useInterval";
import ValidateString from "./validateStrings";

export default function Questions({ questions, restartQuiz, correctAnswer }) {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [answers, setAnswers] = useState([]);
  // const [score, setScore] = useState(0);

  useEffect(() => {
    setAnswers([
      ...questions[count].incorrect_answers,
      questions[count].correct_answer,
    ]);
  }, [questions, count]);

  useInterval(function () {
    if (timer < 15) {
      setTimer(timer+1);
    } else {
      if (count >= 9) {
        history.push("/leaderboard");
        // const alert = window.confirm(`You scored ${score} out of 10. Go home?`);
        // if (alert) {
        //   restartQuiz();
        //   history.push("/home");
        // } else {
        //   return null;
        // }
      }
      setTimer(0);
      setCount((currentCount) => currentCount+1); 
    }
  }
	, 1000);


  const history = useHistory();

  const handleClick = ({ target }) => {
    if (count < 9) {
      if (target.value === questions[count].correct_answer && timer < 15) {
        correctAnswer();
      }
      setCount((currentCount) => currentCount + 1);
      setTimer(0);
    } else {
      history.push("/leaderboard");
      // const value = window.confirm(`You scored ${score} out of 10. Play again?`);
      // if (value) {
      //   restartQuiz();
      //   history.push("/home");
      // }
    }
  };

  const listAnswers = () => {
    answers.sort((a, b) => a.localeCompare(b));
    return answers.map((answer, index) => {
      return (
        <li key={`answer-${index}`}>
          <button
            className="category-buttons"
            type="button"
            value={answer}
            onClick={handleClick}
          >
            {ValidateString(answer)}
          </button>
        </li>
      );
    });
  };

  return (
    <div className="App">
      <h1>{questions[count].category}</h1>
      <p>{questions && ValidateString(questions[count].question)}</p>
      <div>
        <ul className="button-group">{answers && listAnswers()}</ul>
        <progress id="file" value={timer} max="15">Timer
        </progress>
      </div>
    </div>
  );
}
