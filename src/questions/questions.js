import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useInterval from "../utils/useInterval";

export default function Questions({ questions, restartQuiz }) {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

// count = 0

  useEffect(() => {
    setAnswers([
      ...questions[count].incorrect_answers,
      questions[count].correct_answer,
    ]);
  }, [questions, count]);

  useInterval(function () {
    if (timer < 15) {
      setTimer(timer+1);
      // setCount(count+1)
    } else {
      if (count >= 9) {
        const alert = window.confirm(`You scored ${score} out of 10. Go home?`);
        if (alert) {
          history.push("/home");
        } else {
          return null;
        }
      }
      setTimer(0);
      setCount((currentCount) => currentCount+1); 
    }
  }
	, 500);


  const history = useHistory();

  const handleClick = ({ target }) => {
    if (count < 9) {
      if (target.value === questions[count].correct_answer && timer < 15) {
        setScore((currentScore) => currentScore + 1);
      }
      setCount((currentCount) => currentCount + 1);
      setTimer(0);
    } else {
      const value = window.confirm(`You scored ${score} out of 10. Play again?`);
      if (value) {
        restartQuiz();
        history.push("/home");
      }
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
            {answer}
          </button>
        </li>
      );
    });
  };

  return (
    <div className="App">
      <h1>{questions[count].category}</h1>
      {/* <h4>{count + 1}</h4> */}
      <p>{questions && questions[count].question}</p>
      <div>
        <ul className="button-group">{answers && listAnswers()}</ul>
        {/* <h3>Score: {score}</h3> */}
        <progress id="file" value={timer} max="15">Timer
        </progress>
      </div>
    </div>
  );
}
