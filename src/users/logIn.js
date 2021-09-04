import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listUsers } from "./api";

export default function LogIn({ logIn, logInUser }) {
  const initialFormState = {
    user_name: "",
    password: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [errors, setErrors] = useState(null);
  const [users, setUsers] = useState(null);
  const history = useHistory();

  useEffect(() => {
    listUsers().then(setUsers);
  }, []);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(null);
    const matchedUser = users.find((user) => user.email === formData.email);

    if (matchedUser === undefined) {
      setErrors({ email: "email not found" });
    } else {
      if (matchedUser.password === formData.password) {
        logIn();
        logInUser(matchedUser);
        history.push("/home");
      } else {
        setErrors({ password: "Incorrect password" });
      }
    }
  };

  return (
    <section className="login-container">
      <header>
        <div className="header-container">
          <div className="t-container">
            <h1 className="header-t">L</h1>
          </div>
          <div className="r-container">
            <h1 className="header-r">o</h1>
          </div>
          <div className="g-container">
            <h1 className="header-g">g</h1>
          </div>
          <div className="i-2-container">
            <h1 className="header-i-2">i</h1>
          </div>
          <div className="a-container">
            <h1 className="header-a">n</h1>
          </div>
        </div>
      </header>
      <form className="" onSubmit={handleSubmit}>
        <div className="form-container login-form">
          <div className="form-item">
            <label className={errors ? (errors.email ? "alert-text" : "") : ""}>
              {errors ? (errors.email ? errors.email : "Email") : "Email"}
            </label>
            <input
              className="form-input"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
          <label className={errors ? (errors.password ? "alert-text" : "") : ""}>
              {errors ? (errors.password ? errors.password : "Password") : "Password"}
            </label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-button-container">
          <button
            className="start-button create-button form-button"
            type="submit"
            name="submit"
          >
            Submit
          </button>
          <button
            className="start-button login-button form-button"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
