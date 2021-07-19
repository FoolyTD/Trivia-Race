import { Link } from "react-router-dom";

export default function StartScreen() {

    return (
        <div>
            <h1>Trivia Race</h1>
            <h3>Are you ready?</h3>
            <ul className="button-group">
                <Link to="/users/new"><li key={"Create"}><button className="active">Create Account</button></li></Link>
                <li key={"Log In"}><button className="category-buttons disabled">Log In</button></li>
            </ul>
            <Link to="/home"><p>Continue as Guest</p></Link>
        </div>
    )
}