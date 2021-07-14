import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listScores } from "./api.js";

export default function Leaderboard({ score }) {
  const [leaders, setLeaders] = useState(null);

  //When the page mounts, load the leaders
  useEffect(() => {
    listScores().then((response) => setLeaders(response));
  }, []);

  const listLeaders = () => {
    leaders.sort((a, b) => b.score - a.score);
    return leaders.map((leader, index) => {
      return (
        <tr className={index === 0 ? "leader" : "mentioned"}>
          <td>{leader.player_name}</td>
          <td>{leader.score}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      {leaders && score > leaders[3].score ? (
        <p>
          You scored {score} out of 10! Want to add your name to the
          leaderboard? <button>Yes</button>
        </p>
      ) : (
        <p>You scored {score} out of 10. Better luck next time!</p>
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
      <Link to="/home">Go Home</Link>
    </div>
  );
}
