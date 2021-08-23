import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useInterval from "../utils/useInterval";
import ValidateString from "./validateStrings";

export default function Questions({ questions, restartQuiz, correctAnswer }) {
  //measures what question in the 10 question API response will be displayed on the screen
  const [count, setCount] = useState(0);
  // measures amount of time each question will have
  const [timer, setTimer] = useState(0);
  // this will hold only the answers to the questions current question being rendered on screen during the quiz
  const [answers, setAnswers] = useState([]);
  // this will measure the amount of free passes given to the user per quiz run
  const [skip, setSkip] = useState(1);
  // this is a boolean value, displaying true only when rendering answer choices in 50/50 effect
  const [fiftyFifty, setFiftyFifty] = useState(null);
  // this will count the amount of 50/50 special powers are available for use
  const [fiftyFiftyCount, setFiftyFiftyCount] = useState(1);
  // boolean displaying true when time freeze is activated
  const [freezeActive, setFreezeActive] = useState(null);
  // amount of freeze specials remaining
  const [freezeCount, setFreezeCount] = useState(1);
  // boolean that will be set to true once player has answered a question
  const [decided, setDecided] = useState(false);
  // this value stores the button that the user selected
  const [selected, setSelected] = useState(null);
  // history useHistory will be used to navigate pages from the questions component
  const history = useHistory();

  // when the /questions page mounts, the answers for the question will be set and re-render after each answer selected
  useEffect(() => {
    // set the answer state to hold the three incorrect answers and the correct answer (the API return different key/value pair)
    //    for the correct and incorrect answers so we use the spread operator to join them in the same array
    setAnswers([
      ...questions[count].incorrect_answers,
      questions[count].correct_answer,
    ]);
  }, [questions, count]);

  /* this is a helper function imported from utils, it's a custom hook that works like setInterval()
     for some reason setInterval does not work correctly in React
  For this function, every second we are going to increase the timer by 1 unless freeze is active,
     an answer was decided, or the timer is at 15 */
  useInterval(function () {
    if (timer < 15) {
      if (freezeActive || decided) {
        return null;
      }
      setTimer(timer + 1);
    } else {
      if (count >= 9) {
        history.push("/leaderboard");
      }
      setTimer(0);
      setCount((currentCount) => currentCount + 1);
    }
  }, 1000);

  /* this function is run when an answer is selected: 
     -if decided is true, deactivate button use
     -set the selected answer to the clicked button
     -deactivate 50/50 and freeze
     -set decided to true
     -score answer
     -move to the next question unless we are at the end of our quiz */
  const handleSelect = ({ target }) => {
    if (decided) {
      return null;
    }

    setSelected(target.name);
    setFreezeActive(false);
    setFiftyFifty(false);
    setDecided(true);

    if (target.value === questions[count].correct_answer && timer < 15) {
      correctAnswer();
    }
  };

  // This function will run once any button is clicked after the user has
  // decided on an answer
  //    it set decided to false (reactivating all buttons)
  //    and move to the next question of leaderboard
  const handleNext = () => {
    setDecided(false);
    setTimer(0);
    if (count < 9) {
      setCount((currentCount) => currentCount + 1);
      setTimer(0);
    } else {
      history.push("/leaderboard");
    }
  };

  // this function will execute once the free one button is pressed,
  // it resets all powers, restarts timer, removes one free skip
  // and moves to the next question or leaderboard screen
  const handleSkip = () => {
    if (decided) return null;
    setFreezeActive(false);
    setFiftyFifty(false);
    setSkip((currentSkip) => currentSkip - 1);
    correctAnswer();
    setTimer(0);
    if (count < 9) {
      setCount((currentCount) => currentCount + 1);
    } else {
      history.push("/leaderboard");
    }
  };

  // this function wil run when the report button is clicked
  const handleReport = () => {
    if (decided) return null;
    if (fiftyFiftyCount < freezeCount) {
      window.alert(
        "We are working to remove this issue. Thank you for helping us improve our app! Enjoy a free 50/50 on us."
      );
      setFiftyFiftyCount((currentCount) => currentCount + 1);
    } else {
      window.alert(
        "We have flagged this question. Thank you for your feedback! Enjoy a free freeze on us."
      );
      setFreezeCount((currentCount) => currentCount + 1);
    }
  };

  // this function will run when the 50/50 button is clicked, it will display
  //    set FiftyFifty to active and take away one use of 50/50
  const handleFiftyFifty = () => {
    if (fiftyFifty || decided) {
      return null;
    }
    setFiftyFiftyCount((currentCount) => currentCount - 1);
    setFiftyFifty(true);
  };

  /* this function will display only two answer choices when the 50/50 button is pressed
   first I sort the answers in alphabetical order
   then i initialize a variable called number of answers and set it to zero
   if the answer is the correct answer, it will be rendered
   otherwise, the number of answers variable will be incremented by one, only leaving the
   correct answer and one other option */
  const displayFiftyFifty = () => {
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
              onClick={handleSelect}
            >
              {ValidateString(answer)}
            </button>
          </li>
        );
      } else if (numberOfAnswers === 0) {
        numberOfAnswers++;
        return (
          <li key={`answer-${index}`}>
            <button
              className="category-buttons"
              type="button"
              value={answer}
              onClick={handleSelect}
            >
              {ValidateString(answer)}
            </button>
          </li>
        );
      }
      return null;
    });
  };

  // handler for the freeze special power, setting freeze active to true will stop the timer
  //    and then i take away one freeze ability
  const handleFreeze = () => {
    if (decided) return null;
    setFreezeActive(true);
    setFreezeCount((currentCount) => currentCount - 1);
  };

  // handler for the Quit button, we run a window confirm into a push home using the
  //    useHistory hook
  const handleQuit = () => {
    const confirmation = window.confirm("Are you sure you want to quit?");
    if (confirmation) {
      history.push("/home");
    }
  };

  // this function will display the answer buttons, I list the answers in alphabetical order to
  //    switch position of the correct answer, before sort it is always the last choice
  const listAnswers = () => {
    answers.sort((a, b) => a.localeCompare(b));
    return answers.map((answer, index) => {
      return (
        <li key={`answer-${index}`}>
          <button
            /* once an answer is decided, correct answer will be green, incorrect will be red and the rest will be disabled
             if no answer is decided, the button will be uniform
          Because selected is passed in as a string, we must convert it to a number */
            className={
              decided
                ? index === Number(selected)
                  ? answer === questions[count].correct_answer
                    ? "active"
                    : "danger"
                  : answer === questions[count].correct_answer
                  ? "active"
                  : "disabled"
                : "category-buttons"
            }
            type="button"
            name={index}
            value={answer}
            onClick={handleSelect}
          >
            {/* ValidateString function is trying to correct poorly formatted strings */}
            {ValidateString(answer)}
          </button>
        </li>
      );
    });
  };

  return (
    // I put the next handler on the entire page so clicking anyywhere will go to next screen
    <div className="App" onClick={decided ? handleNext : () => {}}>
      <h1 className="quiz-header">{questions && questions[count].category}</h1>
      <p>{questions && ValidateString(questions[count].question)}</p>
      <div>
        <ul className="button-group">
          {answers && fiftyFifty !== true ? listAnswers() : displayFiftyFifty()}
        </ul>
        <progress id="file" value={timer} max="15">
          Timer
        </progress>
      </div>
      <div className="special-buttons">
        {skip > 0 ? (
          <button
            className={
              decided ? " special-button disabled" : "active special-button"
            }
            onClick={handleSkip}
          >
            Free One
          </button>
        ) : null}
        {fiftyFiftyCount > 0 ? (
          <button
            className={
              decided ? " special-button disabled" : "active special-button"
            }
            onClick={handleFiftyFifty}
          >
            50/50
          </button>
        ) : null}
        {freezeCount > 0 ? (
          <button
            className={
              decided ? " special-button disabled" : "active special-button"
            }
            onClick={handleFreeze}
          >
            <span className="emoji">❆</span>
          </button>
        ) : null}
      </div>
      <div className="special-buttons">
        <button
          className={decided ? "disabled" : "danger"}
          onClick={handleReport}
        >
          Report Question
        </button>
        <button className={"warning"} onClick={handleQuit}>
          Quit
        </button>
      </div>
    </div>
  );
}
