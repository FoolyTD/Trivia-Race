import { Link } from "react-router-dom";

export default function StartScreen() {

    return (
        <div>
            <h1>Trivia Race</h1>
            <h3>Are you ready?</h3>
            <button className="category-buttons disabled">Log In</button>
            <Link to="/home"><p>Continue as Guest</p></Link>
        </div>
    )
}