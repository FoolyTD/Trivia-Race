import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postUser, listUsers } from "./api";

export default function NewEntry({ logIn, loadUser, loggedIn }) {
  
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
    const error = [];
    if (formData.user_name.length < 3) {
      error.push("Name must be longer than 2 characters");
    }
    if (formData.password.length < 3) {
      error.push("Password must be longer than 2 characters");
    }
    if (!formData.email.includes("@")) {
      error.push("Email must have @");
    }
    if (error.length > 0) {
      setErrors(error);
      return null;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateSubmission()) {
      await postUser(formData);
      await listUsers().then(loadUser);
      logIn();
      history.push("/home");
    }
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const displayErrors = () => {
    return errors.map((error, index) => {
      return <li key={`error-${index}`}>{error}</li>;
    });
  };

  if (!loggedIn) {
    return (
      <div>
        <h1>New User</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="form-item">
              <label>Name:</label>
                <input
                  className=""
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                />
                {/* <i className="fas fa-check-circle">✔️</i> */}
                {/* <i>✔️</i> */}
                {/* <i className="fas fa-exclamation-circle"></i> */}
                {/* <i>❌</i> */}
            </div>
            <div className="form-item">
              <label className="">Password:</label>
                <input
                  className=""
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {/* <i>✔️</i>
                <i>❌</i>               */}
            </div>
            <div className="form-item">
              <label className="">Email:</label>
                <input
                  className=""
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              {/* <i>✔️</i>
              <i>❌</i>    */}
            </div>
          </div>
              <button className="submit-button" type="submit" name="submit">
                Submit
              </button>
              <button className="warning" onClick={() => history.push("/")}>
                Cancel
              </button>
        </form>
        {errors && <ul>{displayErrors()}</ul>}
      </div>
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