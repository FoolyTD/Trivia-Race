import { Link } from "react-router-dom";

export default function StartScreen() {

    return (
        <div>
            <h1>Trivia Race</h1>
            <h3>Are you ready?</h3>
            <Link to="/home"><p>Yes</p></Link>
        </div>
    )
}