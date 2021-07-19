import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useInterval from "../utils/useInterval";
import ValidateString from "./validateStrings";
// import $ from 'jquery';

export default function Questions({ questions, restartQuiz, correctAnswer }) {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [skip, setSkip] = useState(1);
  const [fiftyFifty, setFiftyFifty] = useState(null);
  const [fiftyFiftyCount, setFiftyFiftyCount] = useState(1);
  // const [freezeTimer, setFreezeTimer] = useState(5);
  const [freezeActive, setFreezeActive] = useState(null);
  const [freezeCount, setFreezeCount] = useState(1);
  
  
  useEffect(() => {
    setAnswers([
      ...questions[count].incorrect_answers,
      questions[count].correct_answer,
    ]);
  }, [questions, count]);
  useInterval(function () {
    if (timer < 15) {
      if(freezeActive) {
        return null;
      }
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
    setFreezeActive(false);
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
    if (count < 9) {
    setCount((currentCount)=>currentCount+1);
    } else {
      history.push('/leaderboard');
    }
  }

  const handleReport = () => {
    if (fiftyFiftyCount < freezeCount) {
      window.alert("We have flagged this question. Thank you for your feedback! Enjoy a free 50/50 on us.");
      setFiftyFiftyCount((currentCount) => currentCount+1);
    } else {
      window.alert("We have flagged this question. Thank you for your feedback! Enjoy a free freeze on us.");
      setFreezeCount((currentCount)=> currentCount + 1);
    }
  }

  const displayFiftyFifty = () => {
    if (fiftyFifty) {
      return null;
    }
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

  const handleFreeze = () => {
    setFreezeActive(true);
    setFreezeCount((currentCount) => currentCount - 1)
  }

  const handleQuit = () => {
    const confirmation = window.confirm("Are you sure you want to quit?");
    if (confirmation) {
      history.push("/home");
    }
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
      <h1 className="quiz-header">{questions[count].category}</h1>
      <p>{questions && ValidateString(questions[count].question)}</p>
      {/* <p>{questions && $(`<div>${questions[count].question}<div>`)}</p> */}
      <div>
        <ul className="button-group">{answers && fiftyFifty !== true ? listAnswers() : handleFiftyFifty()}</ul>
        <progress id="file" value={timer} max="15">Timer
        </progress>
      </div>
      <div className="special-buttons">
{skip > 0 ? <button className="active special-button" onClick={handleSkip}>Free One</button> : null}
{fiftyFiftyCount > 0 ? <button className="active special-button" onClick={displayFiftyFifty}>50/50</button> : null}
{freezeCount > 0 ? <button className="active special-button" onClick={handleFreeze}><span className="emoji">❆</span></button> : null}
      </div>
      <div className="special-buttons">
      <button className="danger" onClick={handleReport}>Report Question</button>
      <button className="warning" onClick={handleQuit}>Quit</button>
      </div>
      
    </div>
  );
}
