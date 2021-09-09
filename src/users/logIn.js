import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "./api";

export default function LogIn({ logInUser }) {
  const initialFormState = {
    user_name: "",
    password: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  useEffect(() => {
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

    loginUser(formData).then(data=>logInUser(data))
    .then(history.push("/home"))
    .catch(setErrors)
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
            <label className={errors ? (!errors.message.includes("password") ? "alert-text" : "") : ""}>
              {errors ? (!errors.message.includes("password") ? errors.message : "User Name") : "User Name"}
            </label>
            <input
              className="form-input"
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
          <label className={errors ? (errors.message.includes("password") ? "alert-text" : "") : ""}>
              {errors ? (errors.message.includes("password") ? errors.message : "Password") : "Password"}
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
