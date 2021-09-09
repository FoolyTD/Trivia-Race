import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postUser, loginUser } from "./api";

export default function NewEntry({ loggedIn }) {
  const initialFormState = {
    user_name: "",
    password: "",
    email: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  const validateSubmission = () => {
    setErrors(null);
    const error = {};
    if (formData.user_name.length < 3) {
      error.name = "name too short";
    }
    if (formData.password.length < 3) {
      error.password = "password too short";
    }
    if (error.password || error.name) {
      setErrors({ ...error });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateSubmission()) {
      await postUser(formData)
        .then(() => {
          loginUser({
            user_name: formData.user_name,
            password: formData.password,
          });
        })
        .then(() => history.push("/users/login"))
        .catch(setErrors);
    }
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  if (!loggedIn) {
    return (
      <section className="login-container">
        <header>
          <div className="header-container">
            <div className="t-container">
              <h1 className="header-t">C</h1>
            </div>
            <div className="r-container">
              <h1 className="header-r">r</h1>
            </div>
            <div className="i-container">
              <h1 className="header-i">e</h1>
            </div>
            <div className="v-container">
              <h1 className="header-v">a</h1>
            </div>
            <div className="i-2-container">
              <h1 className="header-i-2">t</h1>
            </div>
            <div className="a-container">
              <h1 className="header-a">e</h1>
            </div>
          </div>
        </header>
        <form className="" onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-item">
              <label
                className={
                  errors
                    ? errors.name || errors.message
                      ? "alert-text"
                      : ""
                    : ""
                }
              >
                {errors
                  ? errors.message
                    ? "name already taken"
                    : errors.name
                    ? errors.name
                    : "Name"
                  : "Name"}
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
              <label
                className={errors ? (errors.password ? "alert-text" : "") : ""}
              >
                {errors
                  ? errors.password
                    ? errors.password
                    : "Password"
                  : "Password"}
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
            <div className="form-item">
              <label
                className={errors ? (errors.email ? "alert-text" : "") : ""}
              >
                {errors ? (errors.email ? errors.email : "Email") : "Email"}
              </label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={formData.email}
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
  } else {
    return (
      <div>
        <h1>Already Logged In</h1>
        <button onClick={() => history.push("/home")}>Go Home</button>
      </div>
    );
  }
}
