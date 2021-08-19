import { Link } from "react-router-dom";

export default function StartScreen() {
  return (
    <section className="start-container">
      <header>
        <div className="header-container">
          <div className="t-container">
            <h1 className="header-t">T</h1>
          </div>
          <div className="r-container">
            <h1 className="header-r">r</h1>
          </div>
          <div className="i-container">
            <h1 className="header-i">i</h1>
          </div>
          <div className="v-container">
            <h1 className="header-v">v</h1>
          </div>
          <div className="i-2-container">
            <h1 className="header-i-2">i</h1>
          </div>
          <div className="a-container">
            <h1 className="header-a">a</h1>
          </div>
        </div>
        <h1 className="header-race">Race</h1>
      </header>
      <div className="start-buttons">
        <Link to="/users/login">
          <button className="start-button login-button">login</button>
        </Link>
        <Link to="/users/new">
          <button className="start-button create-button">create account</button>
        </Link>
        <Link to="/how-to-play">
          <button className="start-button how-to-button">how to play</button>
        </Link>
      </div>
    </section>
  );
}
