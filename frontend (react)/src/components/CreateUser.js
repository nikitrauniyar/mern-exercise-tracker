import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [user, setUser] = useState({ username: "" });
  const [responseMessage, setResponseMessage] = useState("");

  function CreateAsterisk() {
    return <span style={{ color: "red" }}>*</span>;
  }

  function onChange(e) {
    setUser({ username: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: user.username,
    };

    console.log(newUser);

    axios
      .post("http://localhost:5000/users/add", newUser)
      .then((res) => setResponseMessage(res.data))
      .catch((err) => setResponseMessage(err.message));

    setUser({ username: "" });
  }
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>
            Username: <CreateAsterisk />
          </label>
          <input
            type="text"
            required
            className="form-control"
            value={user.username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
      {responseMessage}
    </div>
  );
}

export default CreateUser;
