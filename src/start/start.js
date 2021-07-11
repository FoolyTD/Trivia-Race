import {Link} from "react-router-dom";

export default function StartScreen() {
    return (
        <div>
            <h1>Are you ready?</h1>
            <Link to="/home">Start</Link>
        </div>
    )
}