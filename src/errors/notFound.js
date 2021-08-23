import {useHistory} from 'react-router-dom';

export default function NotFound() {
    const history = useHistory();

    return (
        <div className="game-container">
          <h1 className="not-found-text">Page Not Found</h1>
        <button className="start-button how-to-button" onClick={()=>history.push("/")}>Go Home</button>  
        </div>
    )
}