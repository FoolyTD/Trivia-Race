import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listUsers } from "./api";

export default function LogIn({logIn, logInUser}) {
  const initialFormState = {
    user_name: "",
    password: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [errors, setErrors] = useState(null);
  const [users, setUsers] = useState(null);
  const history = useHistory();

  useEffect(() => {
    listUsers()
    .then(setUsers)
  }, [])

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(null);
    const matchedUser = users.find((user)=>user.email === formData.email);

    if (matchedUser === undefined) {
        setErrors(["email does not exist in our records"]);
    }
    if (matchedUser.password === formData.password) {
        logIn()
        logInUser(matchedUser)
        history.push("/home")
    } else {
        setErrors(["Incorrect password"]);
    }
  };

  const displayErrors = () => {
      return errors.map((error,index)=> {
          return <p>{error}</p>
      })
  }

  return (
    <div>
      <h1>Log In</h1>
      {errors && displayErrors()}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <div className="form-item">
            <label>Email:</label>
            <input
              className=""
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
            <label className="">Password:</label>
            <input
              className=""
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button className="submit-button" type="submit" name="submit">
          Submit
        </button>
        <button className="warning" onClick={() => history.push("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
