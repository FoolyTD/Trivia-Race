import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useInterval from "../utils/useInterval";
import ValidateString from "./validateStrings";

export default function Questions({ questions, restartQuiz, correctAnswer }) {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [skip, setSkip] = useState(1);
  const [fiftyFifty, setFiftyFifty] = useState(null);
  const [fiftyFiftyCount, setFiftyFiftyCount] = useState(1);

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
      }
      setTimer(0);
      setCount((currentCount) => currentCount+1); 
    }
  }
	, 1000);


  const history = useHistory();

  const handleClick = ({ target }) => {
    setFiftyFifty(false);
    if (count < 9) {
      if (target.value === questions[count].correct_answer && timer < 15) {
        correctAnswer();
      }
      setCount((currentCount) => currentCount + 1);
      setTimer(0);
    } else {
      history.push("/leaderboard");
    }
  };

  const handleSkip = () => {
    setSkip((currentSkip)=>currentSkip-1);
    correctAnswer();
    setTimer(0);
    setCount((currentCount)=>currentCount+1)
  }

  const handleReport = () => {
    window.alert("We have flagged this question. Thank you for your feedback! Enjoy a free 50/50 on us.");
    setFiftyFiftyCount((currentCount) => currentCount+1);
  }

  const displayFiftyFifty = () => {
    setFiftyFiftyCount((currentCount)=>currentCount-1);
    setFiftyFifty(!fiftyFifty);
  }
  const handleFiftyFifty = () => {
    answers.sort((a, b) => a.localeCompare(b));
    let numberOfAnswers = 0;
    return answers.map((answer, index) => {
      if (answer === questions[count].correct_answer) {
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
      } else if(numberOfAnswers === 0) {
        numberOfAnswers++;
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
      }
      return null;
    })
  }

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
        <ul className="button-group">{answers && fiftyFifty !== true ? listAnswers() : handleFiftyFifty()}</ul>
        <progress id="file" value={timer} max="15">Timer
        </progress>
      </div>
      <div className="special-buttons">
{skip > 0 ? <button className="active" onClick={handleSkip}>Free One</button> : null}
{fiftyFiftyCount > 0 ? <button className="active" onClick={displayFiftyFifty}>50/50</button> : null}
      </div>
      <button className="danger" onClick={handleReport}>Report Question</button>
    </div>
  );
}
