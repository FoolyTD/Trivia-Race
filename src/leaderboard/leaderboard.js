import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listScores, postScore } from "./api.js";

export default function Leaderboard({ score, user, category, loggedIn }) {
  const [leaders, setLeaders] = useState(null);
  const history = useHistory();

  //When the page mounts, load the leaders
  useEffect(() => {
    listScores().then((response) => setLeaders(response))
  }, []);

  const listLeaders = () => {
    let maximum = 0;
    const filtered = leaders.filter((entry)=> entry.category === category);
    filtered.sort((a, b) => b.score - a.score);
    return filtered.map((leader, index) => {
      maximum++;
      if (maximum >= 6) {
        return null;
      }
      return (
        <tr className={index === 0 ? "leader" : "mentioned"}>
          <td>{leader.user_name}</td>
          <td>{leader.score}</td>
        </tr>
      );
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    await postScore({user_id:user.user_id, score, category});
    history.push("/home");
  }

  const scoreToBeat = () => {
    if (leaders) {
    const sorted = leaders.filter((leader) => {
    return leader.category === category;
    });
    if (sorted.length > 4) {
      return sorted[4].score
    }
    }
    return 0;
  }

  if (!loggedIn) {
    return (
      <div>
        <h2>You need an account to see leaderboards</h2>
        {!loggedIn && <Link to="users/new"><button>Create Account</button></Link>}
      </div>
    )
  }

  return (
    <div>
      <h1>Leaderboard: {category}</h1>
      {leaders && (score >= scoreToBeat() && loggedIn) ? (
        <p>
          You scored {score} out of 10! Want to add your score to the
          leaderboard? <button onClick={handleSubmit} className="">Yes</button>
        </p>
      ) : (
        <p>You scored {score} out of 10. You needed a score of {scoreToBeat()} or higher. Better luck next time!</p>
      )}
      
      <div className="leaderboard">
        <table>
          <tr className="table-title">
            <th>Player Name</th>
            <th>Score</th>
          </tr>
          {leaders && listLeaders()}
        </table>
      </div>
      <button className="warning" onClick={()=>history.push("/home")}>Go Home</button>
    </div>
  );
}
