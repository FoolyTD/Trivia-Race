import { useState, useEffect } from "react";
import { listScores } from "./utils/api";

export default function Leaderboard({ score }) {
  const [leaders, setLeaders] = useState([]);

  //When the page mounts, load the leaders
  useEffect(() => {
    listScores().then((response) => setLeaders(response));
  }, []);

  const listLeaders = () => {
    leaders.sort((a, b) => b.score - a.score);
    return leaders.map((leader) => {
      return (
        <tr>
          <td>{leader.player_name}</td>
          <td>{leader.score}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      <p>You scored {score} out of 10!</p>
      <div className="leaderboard">
    <table>
        <tr>
          <th>Player Name</th>
          <th>Score</th>
        </tr>
        {leaders && listLeaders()}
      </table>
      </div>
      
    </div>
  );
}
