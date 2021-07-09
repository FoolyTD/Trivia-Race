import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


export default function Questions({questions,restartQuiz}) {
    
    const [count, setCount] = useState(0);

    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    
    useEffect(() => {
        setAnswers([...questions[count].incorrect_answers, questions[count].correct_answer]);
    }, [questions,count]);   
    
    const history = useHistory();
    
    const handleClick = ({target}) => {
        if(count < 9) {
            if(target.value === questions[count].correct_answer) {
                setScore((currentScore) => currentScore + 1);
            }
            setCount((currentCount) => currentCount + 1);
        } else {
            const value = window.confirm("Go home?");
            if (value) {
                restartQuiz();
                history.push('/');
            }
        }
    }
    
    const listAnswers = () => {
        answers.sort((a,b) => a.localeCompare(b));
        return answers.map((answer, index) => {
            return (
             <li key={`answer-${index}`}><button type="button" value={answer} onClick={handleClick}>{answer}</button></li>
            )
        });
    }

    return (
        <div>
          <h1>{questions[count].category}</h1>
          {/* <h4>{count + 1}</h4> */}
      <p>{questions && questions[count].question}</p>  
      <ul>{answers && listAnswers()}</ul>
          <h3>Score: {score}</h3>
        </div>
        
    )
}